// src/components/admin/ManageSpecialties.tsx
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
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import type { Specialty } from '@/lib/types';

// Define a type for the form data, excluding 'id' for new entries
type SpecialtyFormData = Omit<Specialty, 'id'>;

export default function ManageSpecialties() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSpecialty, setCurrentSpecialty] = useState<Partial<SpecialtyFormData & { id?: string }>>({ name: '', iconName: 'HelpCircle', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchSpecialties = async () => {
    setIsLoading(true);
    try {
      const specialtiesCol = collection(db, 'specialties');
      const q = query(specialtiesCol, orderBy('name'));
      const specialtySnapshot = await getDocs(q);
      const specialtiesList = specialtySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Specialty));
      setSpecialties(specialtiesList);
    } catch (error) {
      console.error("Error fetching specialties:", error);
      toast({ title: 'Erro ao Carregar', description: 'Não foi possível buscar as especialidades.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const openDialogForNew = () => {
    setCurrentSpecialty({ name: '', iconName: 'HelpCircle', description: '' });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const openDialogForEdit = (specialty: Specialty) => {
    setCurrentSpecialty({ ...specialty });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta especialidade? Esta ação não pode ser desfeita.')) {
      try {
        await deleteDoc(doc(db, 'specialties', id));
        toast({ title: 'Especialidade Excluída', description: 'A especialidade foi removida com sucesso.' });
        fetchSpecialties(); // Refresh list
      } catch (error) {
        console.error("Error deleting specialty:", error);
        toast({ title: 'Erro ao Excluir', description: 'Não foi possível remover a especialidade.', variant: 'destructive' });
      }
    }
  };

  const handleSave = async () => {
    if (!currentSpecialty || !currentSpecialty.name || !currentSpecialty.iconName || !currentSpecialty.description) {
      toast({ title: 'Erro de Validação', description: 'Nome, Nome do Ícone e Descrição são obrigatórios.', variant: 'destructive' });
      return;
    }
    setIsSaving(true);

    const dataToSave: SpecialtyFormData = {
      name: currentSpecialty.name,
      iconName: currentSpecialty.iconName,
      description: currentSpecialty.description,
      // Add timestamp for creation/update if needed
      // lastUpdated: serverTimestamp(),
    };

    try {
      if (isEditing && currentSpecialty.id) {
        const specialtyDocRef = doc(db, 'specialties', currentSpecialty.id);
        await updateDoc(specialtyDocRef, dataToSave);
        toast({ title: 'Especialidade Atualizada', description: `${currentSpecialty.name} foi atualizada com sucesso.` });
      } else {
        await addDoc(collection(db, 'specialties'), dataToSave);
        toast({ title: 'Especialidade Adicionada', description: `${currentSpecialty.name} foi adicionada com sucesso.` });
      }
      setIsDialogOpen(false);
      setCurrentSpecialty({ name: '', iconName: 'HelpCircle', description: '' });
      fetchSpecialties(); // Refresh list
    } catch (error) {
      console.error("Error saving specialty:", error);
      toast({ title: 'Erro ao Salvar', description: 'Não foi possível salvar a especialidade.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Carregando especialidades...</span></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary font-headline">Gerenciar Especialidades</h2>
        <Button onClick={openDialogForNew} size="lg" disabled={isSaving}>
          <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Especialidade
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
          {specialties.length > 0 ? specialties.map((specialty) => (
            <TableRow key={specialty.id}>
              <TableCell>
                <LucideIconRenderer name={specialty.iconName} className="h-6 w-6 text-primary" />
              </TableCell>
              <TableCell className="font-medium text-lg">{specialty.name}</TableCell>
              <TableCell className="text-sm text-foreground/80 truncate max-w-xs">{specialty.description}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => openDialogForEdit(specialty)} disabled={isSaving}>
                  <Edit3 className="h-4 w-4 mr-1" /> Editar
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(specialty.id)} disabled={isSaving}>
                  <Trash2 className="h-4 w-4 mr-1" /> Excluir
                </Button>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">Nenhuma especialidade cadastrada.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { if (!isSaving) setIsDialogOpen(isOpen); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline">{isEditing ? 'Editar Especialidade' : 'Adicionar Nova Especialidade'}</DialogTitle>
            <DialogDescription>
              Preencha os dados da especialidade. Campos com * são obrigatórios.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="specName" className="text-lg">Nome*</Label>
              <Input
                id="specName"
                value={currentSpecialty?.name || ''}
                onChange={(e) => setCurrentSpecialty({ ...currentSpecialty, name: e.target.value })}
                className="h-11 text-lg"
                disabled={isSaving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specIconName" className="text-lg">Nome do Ícone (Lucide)*</Label>
              <Input
                id="specIconName"
                value={currentSpecialty?.iconName || 'HelpCircle'}
                onChange={(e) => setCurrentSpecialty({ ...currentSpecialty, iconName: e.target.value })}
                className="h-11 text-lg"
                placeholder="Ex: Heart, Bone, Users"
                disabled={isSaving}
              />
              <p className="text-xs text-muted-foreground">
                Use nomes de ícones da biblioteca <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline">Lucide Icons</a>. Ex: 'Heart', 'Bone'.
              </p>
            </div>
            {currentSpecialty?.iconName && (
                <div className="space-y-1">
                    <Label className="text-sm">Preview do Ícone:</Label>
                    <div className="p-2 border rounded-md inline-block">
                        <LucideIconRenderer name={currentSpecialty.iconName} className="h-8 w-8 text-primary" />
                    </div>
                </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="specDescription" className="text-lg">Descrição*</Label>
              <Textarea
                id="specDescription"
                value={currentSpecialty?.description || ''}
                onChange={(e) => setCurrentSpecialty({ ...currentSpecialty, description: e.target.value })}
                className="text-lg min-h-[100px]"
                disabled={isSaving}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} size="lg" disabled={isSaving}>Cancelar</Button>
            <Button onClick={handleSave} size="lg" disabled={isSaving}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isSaving ? (isEditing ? 'Salvando...' : 'Adicionando...') : (isEditing ? 'Salvar Alterações' : 'Adicionar Especialidade')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
