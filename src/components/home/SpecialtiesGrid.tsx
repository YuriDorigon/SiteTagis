// src/components/home/SpecialtiesGrid.tsx
"use client";

import React from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LucideIconRenderer from '@/components/shared/LucideIconRenderer';
import type { Specialty } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SpecialtiesGridProps {
  initialSpecialties: Specialty[];
}

export default function SpecialtiesGrid({ initialSpecialties }: SpecialtiesGridProps) {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title="Nossas Especialidades"
          subtitle="Ampla gama de especialidades médicas para cuidar de você e sua família."
          data-aos="fade-up"
        />
        {initialSpecialties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {initialSpecialties.map((specialty, index) => (
              <Card
                key={specialty.id}
                className={cn("flex flex-col text-center items-center shadow-md bg-background card-hover-lift h-full")}
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <LucideIconRenderer name={specialty.iconName} className="h-10 w-10 text-primary" />
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
        <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="300">
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 btn-hover-scale">
            <Link href="/especialidades">
              Ver Todas Especialidades <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
