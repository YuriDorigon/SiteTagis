// src/components/admin/ManageDoctors.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlusCircle, Edit3, Trash2, Loader2, Scissors, X, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import type { Doctor, Specialty } from '@/lib/types';
import { getCroppedImg } from '@/lib/imageUtils';

type DoctorFormData = Omit<Doctor, 'id' | 'specialtyNames'>;

const DOCTOR_CROP_ASPECT = 1 / 1;
const DOCTOR_OUTPUT_WIDTH = 300;
const DOCTOR_OUTPUT_HEIGHT = 300;

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [allSpecialties, setAllSpecialties] = useState<Specialty[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState<Partial<DoctorFormData & { id?: string }>>({ name: '', crm: '', bio: '', imageUrl: '', specialtyIds: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);

  const fetchDoctorsAndSpecialties = async () => {
    setIsLoading(true);
    try {
      const doctorsCol = collection(db, 'doctors');
      const doctorsQuery = query(doctorsCol, orderBy('name'));
      const doctorsSnapshot = await getDocs(doctorsQuery);
      const doctorsList = doctorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Doctor));
      
      const specialtiesCol = collection(db, 'specialties');
      const specialtiesQuery = query(specialtiesCol, orderBy('name'));
      const specialtiesSnapshot = await getDocs(specialtiesQuery);
      const specialtiesList = specialtiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Specialty));
      
      setAllSpecialties(specialtiesList);

      const specialtiesMap = new Map(specialtiesList.map(s => [s.id, s.name]));
      const augmentedDoctors = doctorsList.map(d => ({
        ...d,
        specialtyNames: (d.specialtyIds || []).map(id => specialtiesMap.get(id) || 'N/A'),
      }));
      setDoctors(augmentedDoctors);

    } catch (error) {
      console.error("Error fetching data:", error);
      toast({ title: 'Erro ao Carregar Dados', description: 'Não foi possível buscar os dados do corpo clínico ou especialidades.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorsAndSpecialties();
  }, []);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    imgRef.current = e.currentTarget;
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth && naturalHeight) {
      const newCrop = centerCrop(
        makeAspectCrop({ unit: '%', width: 90 }, DOCTOR_CROP_ASPECT, naturalWidth, naturalHeight),
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
        const croppedDataUrl = await getCroppedImg(imgRef.current, completedCrop, DOCTOR_OUTPUT_WIDTH, DOCTOR_OUTPUT_HEIGHT);
        if (croppedDataUrl) {
          setCurrentDoctor(prev => ({ ...prev, imageUrl: croppedDataUrl }));
          toast({ title: 'Recorte Aplicado', description: 'Pré-visualização da foto atualizada.' });
        } else {
            toast({ title: 'Erro ao Recortar', description: 'Não foi possível gerar a imagem recortada.', variant: 'destructive' });
        }
      } catch (e) {
        console.error("Error cropping image", e);
        toast({ title: 'Erro ao Recortar', variant: 'destructive' });
      }
    }
  };

  const handleRemoveImage = () => {
    setImgSrc(null);
    setCurrentDoctor(prev => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast({ title: 'Foto Removida', description: 'A foto foi marcada para remoção. Salve para confirmar.' });
  };

  const resetDialogState = () => {
    setImgSrc(null);
    setCrop(undefined);
    setCompletedCrop(null);
    setCurrentDoctor({ name: '', crm: '', bio: '', imageUrl: '', specialtyIds: [] });
    if(imgRef.current) imgRef.current = null;
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  const openDialogForNew = () => {
    resetDialogState();
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const openDialogForEdit = (doctor: Doctor) => {
    resetDialogState();
    const { specialtyNames, ...editableDoctor } = doctor;
    setCurrentDoctor({ ...editableDoctor, specialtyIds: editableDoctor.specialtyIds || [] });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este membro do corpo clínico?')) {
      setIsSaving(true);
      try {
        await deleteDoc(doc(db, 'doctors', id));
        toast({ title: 'Membro Excluído', description: 'O membro do corpo clínico foi removido com sucesso.' });
        fetchDoctorsAndSpecialties();
      } catch (error) {
        console.error("Error deleting member:", error);
        toast({ title: 'Erro ao Excluir', variant: 'destructive' });
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleSave = async () => {
    if (!currentDoctor || !currentDoctor.name || !(currentDoctor.specialtyIds && currentDoctor.specialtyIds.length > 0) || !currentDoctor.crm) {
      toast({ title: 'Erro de Validação', description: 'Nome, CRM e ao menos uma Especialidade são obrigatórios.', variant: 'destructive' });
      return;
    }
    
    if (imgSrc && !completedCrop) {
      toast({ title: 'Aviso', description: 'Você selecionou um novo arquivo de imagem, mas não aplicou o recorte. Salve após aplicar o recorte.', variant: 'default' });
      return;
    }

    setIsSaving(true);

    const dataToSave: DoctorFormData = {
      name: currentDoctor.name,
      specialtyIds: currentDoctor.specialtyIds || [],
      crm: currentDoctor.crm,
      bio: currentDoctor.bio || '',
      imageUrl: currentDoctor.imageUrl || '',
    };

    try {
      if (isEditing && currentDoctor.id) {
        const doctorDocRef = doc(db, 'doctors', currentDoctor.id);
        await updateDoc(doctorDocRef, dataToSave);
        toast({ title: 'Membro Atualizado', description: `${currentDoctor.name} foi atualizado com sucesso.` });
      } else {
        await addDoc(collection(db, 'doctors'), dataToSave);
        toast({ title: 'Membro Adicionado', description: `${currentDoctor.name} foi adicionado com sucesso.` });
      }
      setIsDialogOpen(false);
      resetDialogState();
      fetchDoctorsAndSpecialties();
    } catch (error) {
      console.error("Error saving member:", error);
      toast({ title: 'Erro ao Salvar', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || '')
      );
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Carregando corpo clínico...</span></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary font-headline">Gerenciar Corpo Clínico</h2>
        <Button onClick={openDialogForNew} size="lg" disabled={isSaving}>
          <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Membro
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Foto</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Especialidades</TableHead>
            <TableHead>CRM</TableHead>
            <TableHead className="text-right w-[200px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.length > 0 ? doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>
                 <div className="w-[50px] h-[50px] rounded-full border bg-muted flex items-center justify-center">
                  {doctor.imageUrl ? (
                    <Image src={doctor.imageUrl} alt={`Foto de ${doctor.name}`} width={50} height={50} className="object-cover rounded-full" data-ai-hint="doctor portrait professional" />
                  ) : (
                    <User className="h-6 w-6 text-muted-foreground" />
                  )}
                 </div>
              </TableCell>
              <TableCell className="font-medium text-lg">{doctor.name}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {(doctor.specialtyNames || []).map(name => (
                    <Badge key={name} variant="outline">{name}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{doctor.crm}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => openDialogForEdit(doctor)} disabled={isSaving}>
                  <Edit3 className="h-4 w-4 mr-1" /> Editar
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(doctor.id)} disabled={isSaving}>
                  <Trash2 className="h-4 w-4 mr-1" /> Excluir
                </Button>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">Nenhum membro do corpo clínico cadastrado.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { if (!isSaving) { setIsDialogOpen(isOpen); if(!isOpen) resetDialogState(); } }}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline">{isEditing ? 'Editar Membro' : 'Adicionar Novo Membro'}</DialogTitle>
            <DialogDescription>
              Preencha os dados do membro do corpo clínico. Para a foto, envie a imagem e ajuste o recorte. A foto final terá {DOCTOR_OUTPUT_WIDTH}x{DOCTOR_OUTPUT_HEIGHT} pixels.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="docName" className="text-right text-lg col-span-1">Nome*</Label>
              <Input id="docName" value={currentDoctor?.name || ''} onChange={(e) => setCurrentDoctor(prev => ({ ...prev, name: e.target.value }))} className="col-span-3 h-11 text-lg" disabled={isSaving} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="docCrm" className="text-right text-lg col-span-1">CRM*</Label>
              <Input id="docCrm" value={currentDoctor?.crm || ''} onChange={(e) => setCurrentDoctor(prev => ({ ...prev, crm: e.target.value }))} className="col-span-3 h-11 text-lg" disabled={isSaving} />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="docBio" className="text-right text-lg col-span-1 mt-2">Mini Bio</Label>
              <Textarea id="docBio" value={currentDoctor?.bio || ''} onChange={(e) => setCurrentDoctor(prev => ({ ...prev, bio: e.target.value }))} className="col-span-3 text-lg min-h-[100px]" disabled={isSaving} />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right text-lg col-span-1 mt-2">Especialidades*</Label>
              <div className="col-span-3 space-y-4">
                  <div>
                      <p className="font-medium mb-2 text-muted-foreground">Especialidades Atuais:</p>
                      {(currentDoctor.specialtyIds || []).length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                              {(currentDoctor.specialtyIds || []).map(specId => {
                                  const spec = allSpecialties.find(s => s.id === specId);
                                  return (
                                      <Badge key={specId} variant="default" className="text-base py-1 pl-3 pr-2">
                                          {spec?.name}
                                          <button
                                              type="button"
                                              className="ml-2 rounded-full hover:bg-black/20 p-0.5"
                                              onClick={() => {
                                                  setCurrentDoctor(prev => ({
                                                      ...prev,
                                                      specialtyIds: (prev?.specialtyIds || []).filter(id => id !== specId)
                                                  }));
                                              }}
                                              disabled={isSaving}
                                          >
                                              <X className="h-3 w-3" />
                                          </button>
                                      </Badge>
                                  );
                              })}
                          </div>
                      ) : <p className="text-sm text-muted-foreground">Nenhuma especialidade selecionada.</p>}
                  </div>
                  <div>
                      <p className="font-medium mb-2 text-muted-foreground">Adicionar Especialidade:</p>
                      <div className="flex flex-wrap gap-2">
                          {allSpecialties
                              .filter(spec => !(currentDoctor.specialtyIds || []).includes(spec.id))
                              .map(spec => (
                                  <Button
                                      key={spec.id}
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                          setCurrentDoctor(prev => ({
                                              ...prev,
                                              specialtyIds: [...(prev?.specialtyIds || []), spec.id]
                                          }));
                                      }}
                                      disabled={isSaving}
                                  >
                                      <PlusCircle className="mr-2 h-4 w-4" />
                                      {spec.name}
                                  </Button>
                              ))}
                      </div>
                  </div>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="docImageFile" className="text-right text-lg col-span-1">Foto</Label>
              <Input
                id="docImageFile"
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="col-span-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 h-11 text-lg"
                disabled={isSaving}
              />
            </div>

            {imgSrc && (
              <div className="grid grid-cols-4 items-start gap-4">
                 <Label className="text-right text-lg col-span-1 mt-2">Recortar</Label>
                 <div className="col-span-3 space-y-2">
                    <div className='w-full flex justify-center items-center p-2 border rounded-md bg-slate-50 max-h-[250px] overflow-auto relative'>
                      <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={DOCTOR_CROP_ASPECT}
                        minWidth={50}
                      >
                        <img
                          ref={imgRef}
                          alt="Recorte aqui"
                          src={imgSrc}
                          onLoad={onImageLoad}
                          style={{ maxHeight: '220px' }}
                        />
                      </ReactCrop>
                    </div>
                    <Button onClick={handleApplyCrop} variant="outline" size="sm" disabled={isSaving || !completedCrop}>
                      <Scissors className="mr-2 h-4 w-4" /> Aplicar Recorte
                    </Button>
                 </div>
              </div>
            )}
            
            <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right text-lg col-span-1">Preview</Label>
                <div className="col-span-3 flex items-center gap-4">
                    <div className="w-[100px] h-[100px] rounded-full border-2 border-primary/20 bg-muted flex items-center justify-center overflow-hidden">
                        {currentDoctor.imageUrl ? (
                            <Image 
                                src={currentDoctor.imageUrl} 
                                alt="Preview da foto" 
                                width={100} 
                                height={100} 
                                className="object-cover"
                                data-ai-hint="doctor portrait professional"
                            />
                        ) : (
                            <User className="h-12 w-12 text-muted-foreground" />
                        )}
                    </div>
                    {currentDoctor.imageUrl && (
                         <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleRemoveImage}
                            disabled={isSaving}
                         >
                            <Trash2 className="mr-2 h-4 w-4" /> Remover Foto
                         </Button>
                    )}
                </div>
            </div>

          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} size="lg" disabled={isSaving}>Cancelar</Button>
            <Button onClick={handleSave} size="lg" disabled={isSaving}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isSaving ? (isEditing ? 'Salvando...' : 'Adicionando...') : (isEditing ? 'Salvar Alterações' : 'Adicionar Membro')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
