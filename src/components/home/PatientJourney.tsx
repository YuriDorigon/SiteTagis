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
import { cn } from '@/lib/utils';

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
       <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionTitle
            title="Sua Jornada Conosco"
            subtitle="Cuidamos de cada detalhe do seu atendimento."
          />
          <p className="text-lg text-muted-foreground p-10 glass rounded-3xl">Nenhuma etapa encontrada.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Decorative Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,109,119,0.03)_0%,transparent_70%)] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center mb-16" data-aos="fade-up">
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20 mb-4 text-xs font-bold tracking-widest uppercase">
              Atendimento Digital
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
              Sua Jornada <span className="text-gradient">conosco</span>
            </h2>
            <p className="text-foreground/60 text-center max-w-2xl text-lg font-medium">
              Acompanhe cada passo do seu atendimento de forma clara, simples e moderna.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {staticPatientJourneySteps.map((step, index) => (
                <div 
                  key={step.id}
                  className="relative group"
                  data-aos="fade-up"
                  data-aos-delay={150 * index}
                >
                  <Card 
                    className={cn(
                      "flex flex-col text-center items-center h-full border-none shadow-sm group-hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white pt-12 pb-10 px-6 overflow-hidden relative"
                    )}
                  >
                    {/* Step Number Background */}
                    <div className="absolute -top-4 -right-4 text-9xl font-black text-primary/5 select-none transition-colors duration-500 group-hover:text-secondary/10">
                      {index + 1}
                    </div>

                    <CardHeader className="items-center relative z-10">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:bg-secondary/20 transition-all duration-500 scale-150"></div>
                        <div className="relative p-6 bg-primary/5 rounded-full border border-primary/5 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <LucideIconRenderer name={step.iconName} className="h-10 w-10 text-primary group-hover:text-white transition-colors duration-500" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="flex-grow flex flex-col justify-between relative z-10">
                      <CardDescription className="text-base text-foreground/60 mb-8 leading-relaxed font-medium">
                        {step.description}
                      </CardDescription>
                      
                      {step.buttonText && step.buttonLink && (
                        <Button
                          className={cn(
                            "w-full rounded-2xl py-6 font-bold transition-all duration-300 shadow-md transform active:scale-95",
                            step.id === 'agendamento' ? "bg-primary text-white hover:bg-secondary" : "bg-white border-2 border-primary/10 text-primary hover:bg-primary/5"
                          )}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {selectedStepForModal && (
        <ExamResultsModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedStepForModal(null); }} />
      )}
    </>
  );
}
