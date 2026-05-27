"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FileText, Calendar, ArrowRight } from 'lucide-react';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import ExamResultsModal from '@/components/shared/ExamResultsModal';
import type { ClinicConfig } from '@/lib/types';

interface HeroSectionProps {
  cfg: ClinicConfig;
}

export default function HeroSection({ cfg }: HeroSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">

        {/* Background image full-width */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/BGSITE.avif"
            alt="Clínica Tagis"
            fill
            priority
            sizes="100vw"
            unoptimized
            className="object-cover object-right"
          />
          {/* Gradient overlay: mais escuro na esquerda (onde está o texto) */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 md:px-10 lg:px-20 relative z-10 py-24 lg:py-32">
          <div className="max-w-2xl">

            <div
              className="flex items-center gap-3 mb-8"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <div className="h-px w-10 bg-accent" />
              <span className="text-accent text-[11px] font-medium tracking-[0.25em] uppercase">
                Medicina &amp; Diagnóstico
              </span>
            </div>

            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-light text-white leading-[1.02] mb-8"
              data-aos="fade-up"
              data-aos-delay="80"
              data-aos-duration="900"
            >
              {cfg.heroHeadline}
            </h1>

            <p
              className="text-white/65 text-base md:text-lg font-light mb-10 max-w-md leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="160"
              data-aos-duration="900"
            >
              {cfg.heroSubtext}
            </p>

            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
              data-aos="fade-up"
              data-aos-delay="240"
              data-aos-duration="900"
            >
              <WhatsAppButton
                phoneNumber="5548991936045"
                message="Olá! Gostaria de agendar uma consulta."
                className="inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-accent/90 text-white font-semibold py-4 px-8 rounded-full text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-accent/25"
              >
                <Calendar className="h-4 w-4" />
                Agendar consulta
              </WhatsAppButton>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 text-white/65 hover:text-white font-medium text-sm transition-colors duration-300 group"
              >
                <FileText className="h-4 w-4" />
                Resultados de exames
                <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </button>
            </div>

            {/* Stats */}
            <div
              className="mt-16 pt-10 border-t border-white/15 grid grid-cols-3 gap-4 max-w-md"
              data-aos="fade-up"
              data-aos-delay="320"
            >
              {[
                { num: cfg.statSpecialties, label: 'Especialidades' },
                { num: cfg.statExams, label: 'Tipos de exames' },
                { num: cfg.statInsurance, label: 'Convênios' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-display text-3xl text-white font-normal leading-none mb-1.5">
                    {s.num}
                  </div>
                  <div className="text-[10px] text-white/40 font-medium tracking-widest uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating hours card — bottom right, hidden on very small screens */}
        <div
          className="hidden sm:block absolute bottom-8 right-8 md:right-16 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl z-10"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-foreground/40 uppercase">
                Hoje atendemos
              </p>
              <p className="text-primary text-sm font-semibold">
                Seg – Sex · 07:30 às 18h · Sáb · 07:30 às 12h
              </p>
            </div>
          </div>
        </div>

      </section>

      <ExamResultsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
