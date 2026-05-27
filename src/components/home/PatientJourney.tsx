"use client";

import { useState } from 'react';
import Link from 'next/link';
import LucideIconRenderer from '@/components/shared/LucideIconRenderer';
import { staticPatientJourneySteps } from '@/lib/types';
import type { PatientJourneyStep } from '@/lib/types';
import ExamResultsModal from '@/components/shared/ExamResultsModal';
import { ArrowRight } from 'lucide-react';

export default function PatientJourney() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<PatientJourneyStep | null>(null);

  if (!staticPatientJourneySteps || staticPatientJourneySteps.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">

          {/* Header */}
          <div
            className="max-w-2xl mb-16 lg:mb-20"
            data-aos="fade-up"
          >
            <span className="text-accent text-[11px] font-medium tracking-[0.25em] uppercase mb-5 block">
              Como funciona
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-primary leading-[1.05] mb-5">
              Sua jornada{' '}
              <em className="italic font-normal text-accent">conosco</em>
            </h2>
            <p className="text-foreground/55 text-base font-light leading-relaxed">
              Do agendamento ao resultado, cuidamos de cada etapa com atenção e simplicidade.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-3">
            {staticPatientJourneySteps.map((step, index) => (
              <div
                key={step.id}
                className="group relative py-8 lg:px-6"
                data-aos="fade-up"
                data-aos-delay={80 * index}
              >
                {/* Step number */}
                <div className="font-display text-5xl font-light text-accent/35 mb-6 leading-none">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div className="mb-5">
                  <LucideIconRenderer
                    name={step.iconName}
                    className="h-6 w-6 text-primary/60 group-hover:text-accent transition-colors duration-500"
                  />
                </div>

                {/* Content */}
                <h3 className="text-lg font-medium text-primary mb-3 font-headline">
                  {step.title}
                </h3>
                <p className="text-foreground/55 text-sm font-light leading-relaxed mb-6 max-w-xs">
                  {step.description}
                </p>

                {step.buttonText && step.buttonLink && (
                  <div>
                    {step.id === 'resultados' && step.buttonLink === '#' ? (
                      <button
                        onClick={() => { setSelectedStep(step); setIsModalOpen(true); }}
                        className="inline-flex items-center gap-1.5 text-accent hover:gap-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300"
                      >
                        {step.buttonText} <ArrowRight className="h-3 w-3" />
                      </button>
                    ) : step.buttonLink.startsWith('http') ? (
                      <a
                        href={step.buttonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-accent hover:gap-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300"
                      >
                        {step.buttonText} <ArrowRight className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        href={step.buttonLink}
                        className="inline-flex items-center gap-1.5 text-accent hover:gap-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300"
                      >
                        {step.buttonText} <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedStep && (
        <ExamResultsModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setSelectedStep(null); }}
        />
      )}
    </>
  );
}
