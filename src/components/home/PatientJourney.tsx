// src/components/home/PatientJourney.tsx
"use client";

import { useState } from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LucideIconRenderer from '@/components/shared/LucideIconRenderer';
import { staticPatientJourneySteps } from '@/lib/types';
import type { PatientJourneyStep } from '@/lib/types';
import ExamResultsModal from '@/components/shared/ExamResultsModal';

export default function PatientJourney() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStepForModal, setSelectedStepForModal] = useState<PatientJourneyStep | null>(null);

  const handleStepButtonClick = (step: PatientJourneyStep) => {
    if (step.id === 'resultados' && step.buttonText === 'Acessar Resultados' && step.buttonLink === '#') {
      setSelectedStepForModal(step);
      setIsModalOpen(true);
    }
  };

  if (!staticPatientJourneySteps || staticPatientJourneySteps.length === 0) {
    return (
       <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionTitle
            title="Central do Paciente: Sua Jornada Conosco"
            subtitle="Acompanhe cada passo do seu atendimento de forma clara e simples."
          />
          <p className="text-lg text-muted-foreground">Nenhuma etapa da jornada do paciente encontrada.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Central do Paciente: Sua Jornada Conosco"
            subtitle="Acompanhe cada passo do seu atendimento de forma clara e simples."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {staticPatientJourneySteps.map((step) => (
              <Card key={step.id} className="flex flex-col text-center items-center shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <LucideIconRenderer name={step.iconName} className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold font-headline">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <CardDescription className="text-md text-foreground/80 mb-6">
                    {step.description}
                  </CardDescription>
                  {step.buttonText && step.buttonLink && (
                    <Button
                      size="lg"
                      variant={step.buttonVariant || 'default'}
                      className="w-full"
                      onClick={() => {
                        if (step.id === 'resultados' && step.buttonLink === '#') {
                          handleStepButtonClick(step);
                        }
                      }}
                      asChild={!(step.id === 'resultados' && step.buttonLink === '#')}
                    >
                      {
                        (step.id === 'resultados' && step.buttonLink === '#') ? (
                          <span>{step.buttonText}</span>
                        ) :
                        step.buttonLink.startsWith('http') ? (
                          <Link href={step.buttonLink} target="_blank" rel="noopener noreferrer">
                            {step.buttonText}
                          </Link>
                        ) : (
                          <Link href={step.buttonLink}>
                            {step.buttonText}
                          </Link>
                        )
                      }
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {selectedStepForModal && (
        <ExamResultsModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedStepForModal(null); }} />
      )}
    </>
  );
}
