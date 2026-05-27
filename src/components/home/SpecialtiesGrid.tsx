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
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-16" data-aos="fade-up">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/10 mb-4 text-xs font-bold tracking-widest uppercase">
            Nossos Cuidados
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Especialidades <span className="text-gradient">Médicas</span>
          </h2>
          <p className="text-foreground/60 text-center max-w-2xl text-lg font-medium">
            Um corpo clínico completo e dedicado para atender todas as suas necessidades de saúde.
          </p>
        </div>

        {initialSpecialties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {initialSpecialties.slice(0, 8).map((specialty, index) => (
              <Card
                key={specialty.id}
                className={cn(
                  "group relative overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2rem] bg-background hover:-translate-y-2 hover-glow"
                )}
                data-aos="fade-up"
                data-aos-delay={50 * index}
              >
                <CardHeader className="items-center pt-10 pb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:bg-secondary/30 transition-colors duration-500"></div>
                    <div className="relative p-5 bg-white rounded-2xl shadow-sm border border-primary/5 group-hover:border-secondary/20 transition-all duration-500">
                      <LucideIconRenderer name={specialty.iconName} className="h-10 w-10 text-primary group-hover:text-secondary transition-colors duration-500" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-center pb-10">
                  <CardTitle className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                    {specialty.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/60 line-clamp-3 leading-relaxed">
                    {specialty.description}
                  </CardDescription>
                </CardContent>
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <ArrowRight className="h-5 w-5 text-secondary" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-muted-foreground p-20 glass rounded-3xl">Nenhuma especialidade encontrada.</p>
        )}
        
        <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="200">
          <Button asChild className="btn-premium-outline">
            <Link href="/especialidades">
              Explorar Todas Especialidades <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
