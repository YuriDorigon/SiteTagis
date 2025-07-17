// src/app/especialidades/page.tsx
"use client";

import { useState, useEffect } from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LucideIconRenderer from '@/components/shared/LucideIconRenderer';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import type { Specialty } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function EspecialidadesPage() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSpecialtiesFromFirestore = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const specialtiesCol = collection(db, 'specialties');
        const q = query(specialtiesCol, orderBy('name'));
        const specialtySnapshot = await getDocs(q);
        const specialtyList = specialtySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Nome Indisponível',
            iconName: data.iconName || 'HelpCircle',
            description: data.description || 'Descrição indisponível.',
          } as Specialty;
        });
        setSpecialties(specialtyList);
      } catch (error) {
        console.error("Error fetching specialties from Firestore:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getSpecialtiesFromFirestore();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <SectionTitle
        title="Nossas Especialidades"
        subtitle="Oferecemos uma ampla gama de especialidades médicas para cuidar de todas as suas necessidades de saúde."
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Carregando especialidades...</span>
        </div>
      ) : specialties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {specialties.map((specialty) => (
            <Card key={specialty.id} className="flex flex-col text-center items-center shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <CardHeader className="items-center">
                <div className="p-4 bg-accent/10 rounded-full mb-4">
                  <LucideIconRenderer name={specialty.iconName} className="h-12 w-12 text-accent" />
                </div>
                <CardTitle className="text-2xl font-semibold font-headline">{specialty.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-lg text-foreground/80">
                  {specialty.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-muted-foreground">Nenhuma especialidade encontrada. Por favor, tente novamente mais tarde.</p>
      )}
    </div>
  );
}
