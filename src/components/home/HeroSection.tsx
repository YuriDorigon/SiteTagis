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
        className="relative flex flex-col items-center justify-center text-primary-foreground min-h-[90vh] md:min-h-screen overflow-hidden"
      >
        <Image
            src="/BGSITE.avif"
            alt="Interior premium da Clinica Tagis"
            fill
            priority
            sizes="100vw"
            unoptimized
            className="object-cover"
            style={{
                objectPosition: 'center',
            }}
        />
        {/* Artistic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/40 z-0"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
          <div className="max-w-4xl mx-auto">
            <div 
              className="glass p-8 md:p-12 rounded-[2rem] text-center md:text-left flex flex-col md:flex-row items-center gap-10"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent border border-accent/20 mb-6 text-sm font-bold tracking-wider uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  Excelência em Saúde
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary !leading-[1.1]">
                  Sua Saúde em <br />
                  <span className="text-gradient">Primeiro Lugar</span>
                </h1>
                
                <p className="text-lg md:text-xl text-foreground/80 mb-10 leading-relaxed font-medium">
                  Atendimento humanizado, tecnologia de ponta e especialistas dedicados para cuidar de você e sua família em São José, SC.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <WhatsAppButton
                    phoneNumber="5548991936045"
                    message="Olá! Vim através do site e gostaria de agendar uma consulta."
                    className="btn-premium-primary w-full sm:w-auto"
                  >
                    Agendar Agora
                  </WhatsAppButton>
                  
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="outline"
                    className="btn-premium-outline w-full sm:w-auto bg-white/50 backdrop-blur-sm"
                  >
                    <FileText className="mr-2 h-5 w-5" /> Resultados
                  </Button>
                </div>
              </div>
              
              {/* Stats / Quick Info */}
              <div className="hidden lg:flex flex-col gap-4 w-48">
                <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-white/40 shadow-sm">
                  <div className="text-3xl font-extrabold text-primary">+30</div>
                  <div className="text-xs font-bold text-foreground/60 uppercase tracking-tighter">Especialidades</div>
                </div>
                <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-white/40 shadow-sm">
                  <div className="text-3xl font-extrabold text-primary">+50</div>
                  <div className="text-xs font-bold text-foreground/60 uppercase tracking-tighter">Tipos de Exames</div>
                </div>
                <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-white/40 shadow-sm">
                  <div className="text-3xl font-extrabold text-primary">+20</div>
                  <div className="text-xs font-bold text-foreground/60 uppercase tracking-tighter">Convênios</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block">
            <div className="flex flex-col items-center gap-2 text-white/60">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Descobrir</span>
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
      </section>
      <ExamResultsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
