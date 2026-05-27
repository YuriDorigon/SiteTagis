import React from 'react';
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
    <section className="py-24 lg:py-32 bg-[#fafbfc]">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">

        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 lg:mb-16"
          data-aos="fade-up"
        >
          <div className="max-w-xl">
            <span className="text-accent text-[11px] font-medium tracking-[0.25em] uppercase mb-5 block">
              Diagnóstico
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-primary leading-[1.05]">
              Exames{' '}
              <em className="italic font-normal text-accent">realizados</em>
            </h2>
          </div>
          <p className="text-foreground/55 text-base font-light leading-relaxed md:text-right max-w-xs">
            Tecnologia e precisão para um diagnóstico completo e confiável.
          </p>
        </div>

        {initialExams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/8 border border-primary/8 rounded-3xl overflow-hidden mb-14">
            {initialExams.map((exam, index) => (
              <div
                key={exam.id}
                data-aos="fade-up"
                data-aos-delay={80 * index}
                className="group bg-white hover:bg-[#fafbfc] p-8 lg:p-10 transition-colors duration-500"
              >
                <div className="flex items-start gap-5">
                  <LucideIconRenderer
                    name={exam.iconName}
                    className="h-6 w-6 text-primary/55 group-hover:text-accent transition-colors duration-500 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <h3 className="text-base font-medium text-primary mb-3 font-headline">
                      {exam.name}
                    </h3>
                    <p className="text-foreground/65 text-sm font-light leading-relaxed mb-4">
                      {exam.description}
                    </p>
                    <a
                      href={`https://wa.me/5548991936045?text=${encodeURIComponent(`Olá! Gostaria de agendar o exame de ${exam.name}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Agendar exame de ${exam.name} pelo WhatsApp`}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary/30 group-hover:text-accent transition-colors duration-500 uppercase tracking-wider"
                    >
                      Agendar <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/45 py-12 mb-14">
            Nenhum exame encontrado no momento.
          </p>
        )}

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          data-aos="fade-up"
          data-aos-delay="240"
        >
          <ExamResultsButton />
          <Link
            href="/exames"
            className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-widest uppercase hover:gap-3 transition-all duration-300 border-b border-primary/20 hover:border-primary/40 pb-1"
          >
            Todos os exames <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
