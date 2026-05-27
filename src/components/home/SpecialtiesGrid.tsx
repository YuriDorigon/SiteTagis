"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LucideIconRenderer from '@/components/shared/LucideIconRenderer';
import type { Specialty } from '@/lib/types';

interface SpecialtiesGridProps {
  initialSpecialties: Specialty[];
}

export default function SpecialtiesGrid({ initialSpecialties }: SpecialtiesGridProps) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">

        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 lg:mb-16"
          data-aos="fade-up"
        >
          <div className="max-w-xl">
            <span className="text-accent text-[11px] font-medium tracking-[0.25em] uppercase mb-5 block">
              Nossos cuidados
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-primary leading-[1.05]">
              Especialidades{' '}
              <em className="italic font-normal text-accent">médicas</em>
            </h2>
          </div>
          <p className="text-foreground/55 text-base font-light leading-relaxed md:text-right max-w-xs">
            Corpo clínico completo para atender você e toda a sua família.
          </p>
        </div>

        {initialSpecialties.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-primary/8 border border-primary/8 rounded-3xl overflow-hidden">
            {initialSpecialties.slice(0, 8).map((specialty, index) => (
              <div
                key={specialty.id}
                className="group bg-white hover:bg-[#fafbfc] p-7 lg:p-9 transition-colors duration-500 cursor-default"
                data-aos="fade-up"
                data-aos-delay={50 * index}
              >
                <div className="mb-6 inline-flex">
                  <LucideIconRenderer
                    name={specialty.iconName}
                    className="h-7 w-7 text-primary/55 group-hover:text-accent transition-colors duration-500"
                  />
                </div>

                <h3 className="text-base font-medium text-primary mb-2 font-headline leading-snug">
                  {specialty.name}
                </h3>
                <p className="text-xs text-foreground/50 font-light leading-relaxed line-clamp-2">
                  {specialty.description}
                </p>

                <div className="mt-6">
                  <a
                    href={`https://wa.me/5548991936045?text=${encodeURIComponent(`Olá! Gostaria de agendar uma consulta de ${specialty.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary/30 group-hover:text-accent transition-colors duration-500 uppercase tracking-wider"
                  >
                    Agendar <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/45 py-20">Nenhuma especialidade encontrada.</p>
        )}

        <div className="mt-14 flex justify-center" data-aos="fade-up" data-aos-delay="200">
          <Link
            href="/especialidades"
            className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-widest uppercase hover:gap-3 transition-all duration-300 border-b border-primary/20 hover:border-primary/40 pb-1"
          >
            Ver todas as especialidades <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
