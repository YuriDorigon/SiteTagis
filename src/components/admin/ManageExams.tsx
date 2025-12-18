
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
import LucideIconRenderer from '@/components/shared/LucideIconRenderer';
import { useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import type { Exam } from '@/lib/types';

type ExamFormData = Omit<Exam, 'id'>;

export default function ManageExams() {
  const firestore = useFirestore();
  const [exams, setExams] = useState<Exam[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentExam, setCurrentExam] = useState<Partial<ExamFormData & { id?: string }>>({ name: '', iconName: 'ClipboardList', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchExams = async () => {
    if (!firestore) return;
    setIsLoading(true);
    try {
      const examsCol = collection(firestore, 'exams');
      const q = query(examsCol, orderBy('name'));
      const examSnapshot = await getDocs(q);
      const examList = examSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exam));
      setExams(examList);
    } catch (error: any) {
      const contextualError = new FirestorePermissionError({ operation: 'list', path: 'exams' });
      errorEmitter.emit('permission-error', contextualError);
      toast({ title: 'Erro ao Carregar', description: 'Você não tem permissão para listar os exames.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, [firestore]);

  const openDialogForNew = () => {
    setCurrentExam({ name: '', iconName: 'ClipboardList', description: '' });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const openDialogForEdit = (exam: Exam) => {
    setCurrentExam({ ...exam });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (confirm('Tem certeza que deseja excluir este exame? Esta ação não pode ser desfeita.')) {
      setIsSaving(true);
      const examDocRef = doc(firestore, 'exams', id);
      deleteDoc(examDocRef)
        .then(() => {
          toast({ title: 'Exame Excluído', description: 'O exame foi removido com sucesso.' });
          fetchExams();
        })
        .catch((error) => {
          const contextualError = new FirestorePermissionError({ operation: 'delete', path: examDocRef.path });
          errorEmitter.emit('permission-error', contextualError);
          toast({ title: 'Erro ao Excluir', description: 'Você não tem permissão para excluir este exame.', variant: 'destructive' });
        })
        .finally(() => setIsSaving(false));
    }
  };

  const handleSave = async () => {
    if (!firestore) return;
    if (!currentExam || !currentExam.name || !currentExam.iconName || !currentExam.description) {
      toast({ title: 'Erro de Validação', description: 'Nome, Nome do Ícone e Descrição são obrigatórios.', variant: 'destructive' });
      return;
    }
    setIsSaving(true);

    const dataToSave: ExamFormData = {
      name: currentExam.name,
      iconName: currentExam.iconName,
      description: currentExam.description,
    };

    if (isEditing && currentExam.id) {
      const examDocRef = doc(firestore, 'exams', currentExam.id);
      updateDoc(examDocRef, dataToSave)
        .then(() => {
          toast({ title: 'Exame Atualizado', description: `${currentExam.name} foi atualizado com sucesso.` });
          setIsDialogOpen(false);
          setCurrentExam({ name: '', iconName: 'ClipboardList', description: '' });
          fetchExams();
        })
        .catch((error) => {
          const contextualError = new FirestorePermissionError({ operation: 'update', path: examDocRef.path, requestResourceData: dataToSave });
          errorEmitter.emit('permission-error', contextualError);
          toast({ title: 'Erro ao Salvar', description: 'Você não tem permissão para atualizar este exame.', variant: 'destructive' });
        })
        .finally(() => setIsSaving(false));
    } else {
      const examsColRef = collection(firestore, 'exams');
      addDoc(examsColRef, dataToSave)
        .then(() => {
          toast({ title: 'Exame Adicionado', description: `${currentExam.name} foi adicionado com sucesso.` });
          setIsDialogOpen(false);
          setCurrentExam({ name: '', iconName: 'ClipboardList', description: '' });
          fetchExams();
        })
        .catch((error) => {
          const contextualError = new FirestorePermissionError({ operation: 'create', path: examsColRef.path, requestResourceData: dataToSave });
          errorEmitter.emit('permission-error', contextualError);
          toast({ title: 'Erro ao Adicionar', description: 'Você não tem permissão para adicionar este exame.', variant: 'destructive' });
        })
        .finally(() => setIsSaving(false));
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Carregando exames...</span></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary font-headline">Gerenciar Exames</h2>
        <Button onClick={openDialogForNew} size="lg" disabled={isSaving}>
          <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Exame
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">Ícone</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right w-[200px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.length > 0 ? exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell>
                <LucideIconRenderer name={exam.iconName} className="h-6 w-6 text-primary" />
              </TableCell>
              <TableCell className="font-medium text-lg">{exam.name}</TableCell>
              <TableCell className="text-sm text-foreground/80 truncate max-w-xs">{exam.description}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => openDialogForEdit(exam)} disabled={isSaving}>
                  <Edit3 className="h-4 w-4 mr-1" /> Editar
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(exam.id)} disabled={isSaving}>
                  <Trash2 className="h-4 w-4 mr-1" /> Excluir
                </Button>
              </TableCell>
            </TableRow>
          )) : (
             <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">Nenhum exame cadastrado.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { if (!isSaving) setIsDialogOpen(isOpen); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline">{isEditing ? 'Editar Exame' : 'Adicionar Novo Exame'}</DialogTitle>
            <DialogDescription>
              Preencha os dados do exame. Campos com * são obrigatórios.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="examName" className="text-lg">Nome*</Label>
              <Input
                id="examName"
                value={currentExam?.name || ''}
                onChange={(e) => setCurrentExam({ ...currentExam, name: e.target.value })}
                className="h-11 text-lg"
                disabled={isSaving}
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="examIconName" className="text-lg">Nome do Ícone (Lucide)*</Label>
              <Input
                id="examIconName"
                value={currentExam?.iconName || 'ClipboardList'}
                onChange={(e) => setCurrentExam({ ...currentExam, iconName: e.target.value })}
                className="h-11 text-lg"
                placeholder="Ex: Activity, Waves, Scan"
                disabled={isSaving}
              />
              <p className="text-xs text-muted-foreground">
                Use nomes de ícones da biblioteca <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline">Lucide Icons</a>. Ex: 'Activity', 'Waves'.
              </p>
            </div>
             {currentExam?.iconName && (
                <div className="space-y-1">
                    <Label className="text-sm">Preview do Ícone:</Label>
                    <div className="p-2 border rounded-md inline-block">
                        <LucideIconRenderer name={currentExam.iconName} className="h-8 w-8 text-primary" />
                    </div>
                </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="examDescription" className="text-lg">Descrição*</Label>
              <Textarea
                id="examDescription"
                value={currentExam?.description || ''}
                onChange={(e) => setCurrentExam({ ...currentExam, description: e.target.value })}
                className="text-lg min-h-[100px]"
                disabled={isSaving}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} size="lg" disabled={isSaving}>Cancelar</Button>
            <Button onClick={handleSave} size="lg" disabled={isSaving}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isSaving ? (isEditing ? 'Salvando...' : 'Adicionando...') : (isEditing ? 'Salvar Alterações' : 'Adicionar Exame')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
