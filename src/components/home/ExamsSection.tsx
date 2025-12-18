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
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Exames Realizados"
            subtitle="Tecnologia e precisão para diagnósticos completos."
            data-aos="fade-up"
          />
          {initialExams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              {initialExams.map((exam, index) => (
                <div
                  key={exam.id}
                  data-aos="fade-up"
                  data-aos-delay={100 * index}
                >
                  <Card className="text-center shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 h-full">
                    <CardHeader className="items-center">
                      <div className="p-3 bg-primary/10 rounded-full mb-3">
                        <LucideIconRenderer name={exam.iconName} className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-semibold font-headline">{exam.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70">{exam.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-muted-foreground mb-12">Nenhum exame encontrado.</p>
          )}
          <div 
            className="mt-10 flex flex-col items-center gap-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <ExamResultsButton />
            <Button asChild variant="outline" className="text-base px-6 py-3 sm:text-lg sm:px-8 sm:py-4 w-full sm:w-auto">
              <Link href="/exames">
                Ver Todos os Exames <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
