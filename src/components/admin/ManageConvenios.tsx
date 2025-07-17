// src/components/admin/ManageConvenios.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlusCircle, Edit3, Trash2, Scissors, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import type { Convenio } from '@/lib/types';
import { getCroppedImg } from '@/lib/imageUtils'; // Import the utility function

type ConvenioFormData = Omit<Convenio, 'id'>;

const CROP_ASPECT = 2 / 1; // For convenios: 300x150
const OUTPUT_WIDTH = 300;
const OUTPUT_HEIGHT = 150;

export default function ManageConvenios() {
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentConvenio, setCurrentConvenio] = useState<Partial<ConvenioFormData & { id?: string }>>({ name: '', logoUrl: '' });
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchConvenios = async () => {
    setIsLoading(true);
    try {
      const conveniosCol = collection(db, 'convenios');
      const q = query(conveniosCol, orderBy('name'));
      const convenioSnapshot = await getDocs(q);
      const conveniosList = convenioSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Convenio));
      setConvenios(conveniosList);
    } catch (error) {
      console.error("Error fetching convenios:", error);
      toast({ title: 'Erro ao Carregar', description: 'Não foi possível buscar os convênios.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConvenios();
  }, []);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    imgRef.current = e.currentTarget;
    const { naturalWidth, naturalHeight } = e.currentTarget;

    if (naturalWidth && naturalHeight) {
        const newCrop = centerCrop(
          makeAspectCrop({ unit: '%', width: 90 }, CROP_ASPECT, naturalWidth, naturalHeight),
          naturalWidth,
          naturalHeight
        );
        setCrop(newCrop);
    }
    setCompletedCrop(null);
  }

  const handleApplyCrop = async () => {
    if (completedCrop && imgRef.current && completedCrop.width > 0 && completedCrop.height > 0) {
      try {
        const croppedDataUrl = await getCroppedImg(imgRef.current, completedCrop, OUTPUT_WIDTH, OUTPUT_HEIGHT);
        if (croppedDataUrl) {
          setCurrentConvenio(prev => ({ ...prev, logoUrl: croppedDataUrl }));
          toast({ title: 'Recorte Aplicado', description: 'Pré-visualização do logo atualizada.' });
        } else {
          toast({ title: 'Aviso', description: 'Não foi possível gerar a pré-visualização do recorte.', variant: 'default' });
        }
      } catch (e) {
        console.error("Error cropping image", e);
        toast({ title: 'Erro ao Recortar', description: 'Não foi possível aplicar o recorte.', variant: 'destructive' });
      }
    } else {
      toast({ title: 'Aviso', description: 'Carregue uma imagem e selecione uma área válida para recortar.', variant: 'default' });
    }
  };

  const handleRemoveImage = () => {
    setImgSrc(null);
    setCurrentConvenio(prev => ({ ...prev, logoUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast({ title: 'Logo Removido', description: 'O logo foi marcado para remoção. Salve para confirmar.' });
  };

  const resetDialogState = () => {
    setImgSrc(null);
    setCrop(undefined);
    setCompletedCrop(null);
    setCurrentConvenio({ name: '', logoUrl: '' });
    if(imgRef.current) imgRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const openDialogForNew = () => {
    resetDialogState();
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const openDialogForEdit = (convenio: Convenio) => {
    resetDialogState();
    setCurrentConvenio({ ...convenio });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este convênio?')) {
      setIsSaving(true);
      try {
        await deleteDoc(doc(db, 'convenios', id));
        toast({ title: 'Convênio Excluído', description: 'O convênio foi removido com sucesso.' });
        fetchConvenios();
      } catch (error) {
        console.error("Error deleting convenio:", error);
        toast({ title: 'Erro ao Excluir', description: 'Não foi possível remover o convênio.', variant: 'destructive' });
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleSave = async () => {
    if (!currentConvenio || !currentConvenio.name) {
      toast({ title: 'Erro', description: 'Nome do convênio é obrigatório.', variant: 'destructive' });
      return;
    }

    if (imgSrc && !completedCrop) {
      toast({ title: 'Aviso', description: 'Você selecionou um novo arquivo de imagem, mas não aplicou o recorte. Salve após aplicar o recorte.', variant: 'default' });
      return;
    }

    if (!isEditing && !currentConvenio.logoUrl) {
       toast({ title: 'Erro', description: 'O logo do convênio é obrigatório.', variant: 'destructive' });
       return;
    }

    setIsSaving(true);

    const dataToSave: ConvenioFormData = {
      name: currentConvenio.name,
      logoUrl: currentConvenio.logoUrl || '',
    };

    try {
      if (isEditing && currentConvenio.id) {
        const convenioDocRef = doc(db, 'convenios', currentConvenio.id);
        await updateDoc(convenioDocRef, dataToSave);
        toast({ title: 'Convênio Atualizado', description: `${currentConvenio.name} foi atualizado com sucesso.` });
      } else {
        await addDoc(collection(db, 'convenios'), dataToSave);
        toast({ title: 'Convênio Adicionado', description: `${currentConvenio.name} foi adicionado com sucesso.` });
      }
      setIsDialogOpen(false);
      resetDialogState();
      fetchConvenios();
    } catch (error) {
      console.error("Error saving convenio:", error);
      toast({ title: 'Erro ao Salvar', description: 'Não foi possível salvar o convênio.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || '')
      );
      reader.readAsDataURL(event.target.files[0]);
    }
  };


  if (isLoading) {
    return <div className="flex justify-center items-center h-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Carregando convênios...</span></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary font-headline">Gerenciar Convênios</h2>
        <Button onClick={openDialogForNew} size="lg" disabled={isSaving}>
          <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Convênio
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Logo</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="text-right w-[200px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {convenios.length > 0 ? convenios.map((convenio) => (
            <TableRow key={convenio.id}>
              <TableCell>
                {convenio.logoUrl ? (
                  <div className="w-24 h-12 relative bg-slate-100 rounded-sm flex items-center justify-center">
                    <Image
                      src={convenio.logoUrl}
                      alt={`Logo ${convenio.name}`}
                      fill
                      className="object-contain rounded-sm"
                      sizes="(max-width: 768px) 100vw, 96px"
                      onError={(e) => e.currentTarget.src = 'https://placehold.co/96x48.png?text=Erro'}
                      data-ai-hint="logo company"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-12 flex items-center justify-center bg-muted rounded-sm">
                    <span className="text-xs text-muted-foreground">Sem Logo</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium text-lg">{convenio.name}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => openDialogForEdit(convenio)} disabled={isSaving}>
                  <Edit3 className="h-4 w-4 mr-1" /> Editar
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(convenio.id)} disabled={isSaving}>
                  <Trash2 className="h-4 w-4 mr-1" /> Excluir
                </Button>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">Nenhum convênio cadastrado.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
        if (!isSaving) {
          setIsDialogOpen(isOpen);
          if (!isOpen) resetDialogState();
        }
      }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline">{isEditing ? 'Editar Convênio' : 'Adicionar Novo Convênio'}</DialogTitle>
            <DialogDescription>
              Preencha os dados do convênio. Para o logo, envie a imagem e ajuste o recorte. O logo final terá {OUTPUT_WIDTH}x{OUTPUT_HEIGHT} pixels.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4 max-h-[65vh] overflow-y-auto pr-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg">Nome do Convênio*</Label>
              <Input
                id="name"
                value={currentConvenio?.name || ''}
                onChange={(e) => setCurrentConvenio({ ...currentConvenio, name: e.target.value })}
                className="h-11 text-lg"
                disabled={isSaving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logoFile" className="text-lg">Logo do Convênio*</Label>
              <Input
                id="logoFile"
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 h-11 text-lg"
                disabled={isSaving}
              />
            </div>

            {imgSrc && (
              <div className="space-y-2">
                <Label className="text-lg">Recortar Imagem</Label>
                <div className='w-full flex justify-center items-center p-2 border rounded-md bg-slate-50 max-h-[200px] overflow-auto relative'>
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={CROP_ASPECT}
                    minWidth={50}
                  >
                    <img
                      ref={imgRef}
                      alt="Recorte aqui"
                      src={imgSrc}
                      onLoad={onImageLoad}
                      style={{ maxHeight: '180px' }}
                    />
                  </ReactCrop>
                </div>
                <Button onClick={handleApplyCrop} variant="outline" size="sm" className="mt-2" disabled={isSaving || !completedCrop}>
                  <Scissors className="mr-2 h-4 w-4" /> Aplicar Recorte para Preview
                </Button>
              </div>
            )}

            {currentConvenio.logoUrl ? (
              <div className="space-y-2">
                <Label className="text-lg">Pré-visualização</Label>
                <div className="w-full h-24 relative border rounded-md p-2 flex items-center justify-center bg-slate-50">
                  <Image
                    src={currentConvenio.logoUrl}
                    alt="Preview do logo"
                    fill
                    className="object-contain"
                    sizes="200px"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">A imagem final será {OUTPUT_WIDTH}x{OUTPUT_HEIGHT} pixels.</p>
                  <Button variant="destructive" size="sm" onClick={handleRemoveImage} disabled={isSaving}>
                      <Trash2 className="h-4 w-4 mr-1" /> Remover Logo
                  </Button>
                </div>
              </div>
            ) : (
                 <div className="space-y-2">
                    <Label className="text-lg">Pré-visualização</Label>
                    <div className="w-full h-24 flex items-center justify-center bg-muted rounded-md border">
                        <span className="text-sm text-muted-foreground">Sem Logo</span>
                    </div>
                 </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} size="lg" disabled={isSaving}>Cancelar</Button>
            <Button onClick={handleSave} size="lg" disabled={isSaving}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isSaving ? (isEditing ? 'Salvando...' : 'Adicionando...') : (isEditing ? 'Salvar Alterações' : 'Adicionar Convênio')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
