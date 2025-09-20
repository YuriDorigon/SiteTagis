// src/components/home/SpecialtiesGrid.tsx
"use client";

import React, { useState, useEffect } from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import LucideIconRenderer from '@/components/shared/LucideIconRenderer';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'; // Import getDocs instead of onSnapshot
import type { Specialty } from '@/lib/types';

export default function SpecialtiesGrid() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialties = async () => {
      setLoading(true);
      try {
        const specialtiesCol = collection(db, 'specialties');
        const q = query(specialtiesCol, orderBy('name'), limit(3));
        const snapshot = await getDocs(q);
        const fetchedSpecialties = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Specialty));
        setSpecialties(fetchedSpecialties);
      } catch (error) {
        console.error("Error fetching homepage specialties:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSpecialties();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title="Nossas Especialidades"
          subtitle="Ampla gama de especialidades médicas para cuidar de você e sua família."
        />
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-lg text-muted-foreground">Carregando especialidades...</p>
          </div>
        ) : specialties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {specialties.map((specialty) => (
              <Card key={specialty.id} className="flex flex-col text-center items-center shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                <CardHeader className="items-center">
                  <div className="p-4 bg-accent/10 rounded-full mb-4">
                    <LucideIconRenderer name={specialty.iconName} className="h-10 w-10 text-accent" />
                  </div>
                  <CardTitle className="text-xl font-semibold font-headline">{specialty.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-md text-foreground/80">
                    {specialty.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-muted-foreground">Nenhuma especialidade encontrada.</p>
        )}
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
            <Link href="/especialidades">
              Ver Todas Especialidades <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
