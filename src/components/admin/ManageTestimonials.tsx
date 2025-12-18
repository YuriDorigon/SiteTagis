
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlusCircle, Edit3, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import type { Testimonial, TestimonialFormData } from '@/lib/types';

export default function ManageTestimonials() {
  const firestore = useFirestore();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<TestimonialFormData & { id?: string }>>({ name: '', quote: '' });
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchTestimonials = async () => {
    if (!firestore) return;
    setIsLoading(true);
    try {
      const testimonialsCol = collection(firestore, 'testimonials');
      const q = query(testimonialsCol, orderBy('name'));
      const testimonialSnapshot = await getDocs(q);
      const testimonialsList = testimonialSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
      setTestimonials(testimonialsList);
    } catch (error: any) {
      const contextualError = new FirestorePermissionError({ operation: 'list', path: 'testimonials' });
      errorEmitter.emit('permission-error', contextualError);
      toast({ title: 'Erro ao Carregar', description: 'Você não tem permissão para listar os depoimentos.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [firestore]);

  const resetForm = () => {
    setCurrentTestimonial({ name: '', quote: '' });
  };

  const openDialogForNew = () => {
    resetForm();
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const openDialogForEdit = (testimonial: Testimonial) => {
    setCurrentTestimonial({ ...testimonial });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (confirm('Tem certeza que deseja excluir este depoimento?')) {
      setIsSaving(true);
      const testimonialDocRef = doc(firestore, 'testimonials', id);
      deleteDoc(testimonialDocRef)
        .then(() => {
          toast({ title: 'Depoimento Excluído', description: 'O depoimento foi removido com sucesso.' });
          fetchTestimonials();
        })
        .catch((error) => {
          const contextualError = new FirestorePermissionError({ operation: 'delete', path: testimonialDocRef.path });
          errorEmitter.emit('permission-error', contextualError);
          toast({ title: 'Erro ao Excluir', description: 'Você não tem permissão para excluir este depoimento.', variant: 'destructive' });
        })
        .finally(() => {
          setIsSaving(false);
        });
    }
  };

  const handleSave = async () => {
    if (!firestore) return;
    if (!currentTestimonial || !currentTestimonial.name || !currentTestimonial.quote) {
      toast({ title: 'Erro de Validação', description: 'Nome e Depoimento são obrigatórios.', variant: 'destructive' });
      return;
    }
    setIsSaving(true);

    const dataToSave: TestimonialFormData = {
      name: currentTestimonial.name,
      quote: currentTestimonial.quote,
    };

    if (isEditing && currentTestimonial.id) {
      const testimonialDocRef = doc(firestore, 'testimonials', currentTestimonial.id);
      updateDoc(testimonialDocRef, dataToSave)
        .then(() => {
          toast({ title: 'Depoimento Atualizado', description: `O depoimento de ${currentTestimonial.name} foi atualizado.` });
          setIsDialogOpen(false);
          resetForm();
          fetchTestimonials();
        })
        .catch((error) => {
          const contextualError = new FirestorePermissionError({ operation: 'update', path: testimonialDocRef.path, requestResourceData: dataToSave });
          errorEmitter.emit('permission-error', contextualError);
          toast({ title: 'Erro ao Salvar', description: 'Você não tem permissão para atualizar este depoimento.', variant: 'destructive' });
        })
        .finally(() => {
          setIsSaving(false);
        });
    } else {
      const testimonialsColRef = collection(firestore, 'testimonials');
      addDoc(testimonialsColRef, dataToSave)
        .then(() => {
          toast({ title: 'Depoimento Adicionado', description: `O depoimento de ${currentTestimonial.name} foi adicionado.` });
          setIsDialogOpen(false);
          resetForm();
          fetchTestimonials();
        })
        .catch((error) => {
          const contextualError = new FirestorePermissionError({ operation: 'create', path: testimonialsColRef.path, requestResourceData: dataToSave });
          errorEmitter.emit('permission-error', contextualError);
          toast({ title: 'Erro ao Adicionar', description: 'Você não tem permissão para adicionar um depoimento.', variant: 'destructive' });
        })
        .finally(() => {
          setIsSaving(false);
        });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Carregando depoimentos...</span></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary font-headline">Gerenciar Depoimentos</h2>
        <Button onClick={openDialogForNew} size="lg" disabled={isSaving}>
          <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Depoimento
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Depoimento</TableHead>
            <TableHead className="text-right w-[200px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testimonials.length > 0 ? testimonials.map((testimonial) => (
            <TableRow key={testimonial.id}>
              <TableCell className="font-medium text-lg">{testimonial.name}</TableCell>
              <TableCell className="text-sm text-foreground/80 truncate max-w-md">{testimonial.quote}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => openDialogForEdit(testimonial)} disabled={isSaving}>
                  <Edit3 className="h-4 w-4 mr-1" /> Editar
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(testimonial.id)} disabled={isSaving}>
                  <Trash2 className="h-4 w-4 mr-1" /> Excluir
                </Button>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">Nenhum depoimento cadastrado.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { if (!isSaving) { setIsDialogOpen(isOpen); if(!isOpen) resetForm(); } }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline">{isEditing ? 'Editar Depoimento' : 'Adicionar Novo Depoimento'}</DialogTitle>
            <DialogDescription>
              Preencha os dados do depoimento.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4 max-h-[65vh] overflow-y-auto pr-2">
            <div className="space-y-2">
              <Label htmlFor="testName" className="text-lg">Nome do Autor*</Label>
              <Input id="testName" value={currentTestimonial?.name || ''} onChange={(e) => setCurrentTestimonial(prev => ({ ...prev, name: e.target.value }))} className="h-11 text-lg" disabled={isSaving} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testQuote" className="text-lg">Depoimento*</Label>
              <Textarea id="testQuote" value={currentTestimonial?.quote || ''} onChange={(e) => setCurrentTestimonial(prev => ({ ...prev, quote: e.target.value }))} className="text-lg min-h-[120px]" disabled={isSaving} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {setIsDialogOpen(false); resetForm();}} size="lg" disabled={isSaving}>Cancelar</Button>
            <Button onClick={handleSave} size="lg" disabled={isSaving || !currentTestimonial?.name || !currentTestimonial?.quote }>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isSaving ? (isEditing ? 'Salvando...' : 'Adicionando...') : (isEditing ? 'Salvar Alterações' : 'Adicionar Depoimento')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
