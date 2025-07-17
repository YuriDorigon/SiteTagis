// src/components/home/HeroSection.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ExamResultsModal from '@/components/shared/ExamResultsModal';

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section
        className="relative py-24 md:py-32 min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-center items-center text-center text-primary-foreground bg-no-repeat"
        style={{
          backgroundImage: "url('/BGSITE.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="absolute inset-0 bg-primary opacity-30 z-0"></div> {/* Overlay opacity reduzida para 30% */}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-headline !leading-tight drop-shadow-sm">
              Saúde e Bem-Estar ao Seu Alcance
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-10 drop-shadow-sm">
              Descubra uma nova experiência em cuidados médicos na Clinica Tagis. Agendamentos fáceis, especialistas dedicados e exames precisos.
            </p>
            <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center gap-4">
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="default"
                className="text-base px-6 py-3 sm:text-lg sm:px-8 sm:py-4 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
              >
                <FileText className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Resultados de Exames
              </Button>
            </div>
            <div className="mt-12">
              <Button asChild variant="link" className="text-primary-foreground/90 hover:text-primary-foreground text-lg">
                <Link href="/especialidades">
                  Nossas Especialidades <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <ExamResultsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
