// src/components/home/ExamsSection.tsx
import React from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LucideIconRenderer from '@/components/shared/LucideIconRenderer';
import ExamResultsButton from '@/components/exames/ExamResultsButton';
import type { Exam } from '@/lib/types';

interface ExamsSectionProps {
  initialExams: Exam[];
}

export default function ExamsSection({ initialExams }: ExamsSectionProps) {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center mb-16" data-aos="fade-up">
            <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-4 text-xs font-bold tracking-widest uppercase">
              Tecnologia em Diagnóstico
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
              Exames <span className="text-gradient">Realizados</span>
            </h2>
            <p className="text-foreground/60 text-center max-w-2xl text-lg font-medium">
              Equipamentos de última geração e precisão absoluta para o seu diagnóstico completo.
            </p>
          </div>

          {initialExams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {initialExams.map((exam, index) => (
                <div
                  key={exam.id}
                  data-aos="fade-up"
                  data-aos-delay={100 * index}
                >
                  <Card className="group relative overflow-hidden h-full border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2rem] bg-white hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center gap-5 pt-10 pb-4 px-8">
                      <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <LucideIconRenderer name={exam.iconName} className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-500" />
                      </div>
                      <CardTitle className="text-xl font-bold text-primary">{exam.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-10">
                      <p className="text-foreground/60 leading-relaxed font-medium">
                        {exam.description}
                      </p>
                    </CardContent>
                    {/* Subtle accent border on hover */}
                    <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-primary via-secondary to-accent group-hover:w-full transition-all duration-700"></div>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-muted-foreground mb-12 glass p-10 rounded-3xl">Nenhum exame encontrado no momento.</p>
          )}

          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="w-full sm:w-auto transform hover:scale-105 transition-transform duration-300">
              <ExamResultsButton />
            </div>
            
            <Button asChild variant="outline" className="btn-premium-outline bg-transparent">
              <Link href="/exames">
                Todos os Exames <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
  );
}
