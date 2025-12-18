// src/components/home/HeroSection.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FileText, ArrowDown } from 'lucide-react';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import ExamResultsModal from '@/components/shared/ExamResultsModal';

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section
        className="relative flex flex-col items-center text-center text-primary-foreground"
        style={{
          minHeight: '100vh', 
        }}
      >
        <Image
            src="/BGSITE.avif"
            alt="Fundo da Clinica Tagis com médicos"
            fill
            priority // Important for LCP
            sizes="100vw"
            className="object-cover"
            style={{
                objectPosition: 'right top', // Prioritizes the top right corner
            }}
            data-ai-hint="background clinic doctors"
        />
        <div className="absolute inset-0 bg-primary opacity-60 z-0"></div> {/* Overlay */}
        <div 
          className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col justify-center flex-grow" 
        >
          <div
            className="max-w-3xl mx-auto"
          >
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-headline !leading-tight drop-shadow-lg"
              data-aos="fade-up"
            >
              Saúde e Bem-Estar ao Seu Alcance
            </h1>
            <div
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-10 drop-shadow-md">
                Descubra uma nova experiência em cuidados médicos na Clinica Tagis. Agendamentos fáceis, especialistas dedicados e exames precisos.
              </p>
              <div className="flex flex-col items-center sm:flex-wrap sm:justify-center gap-4">
                <WhatsAppButton
                  phoneNumber="5548991936045"
                  message="Olá! Vim através do site e gostaria de agendar uma consulta."
                  variant="destructive"
                  size="lg"
                  className="text-base px-8 py-6 sm:text-lg sm:px-10 sm:py-7 shadow-xl transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
                >
                  Agendar Consulta
                </WhatsAppButton>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="outline"
                  size="lg"
                  className="text-base px-8 py-6 sm:text-lg sm:px-10 sm:py-7 bg-background/20 backdrop-blur-sm border-white/50 text-white hover:bg-white/30 hover:text-white shadow-lg transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
                >
                  <FileText className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Resultados de Exames
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <div 
                className="w-16 h-16 flex items-center justify-center rounded-full animate-bounce"
                aria-hidden="true"
            >
                <ArrowDown className="h-10 w-10 text-white/70" />
            </div>
        </div>
      </section>
      <ExamResultsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
