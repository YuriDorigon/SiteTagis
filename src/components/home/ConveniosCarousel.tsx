"use client";

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ConvenioCard from '@/components/convenios/ConvenioCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Convenio } from '@/lib/types';

interface ConveniosCarouselProps {
  initialConvenios: Convenio[];
}

export default function ConveniosCarousel({ initialConvenios }: ConveniosCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  if (!initialConvenios || initialConvenios.length === 0) {
    return null;
  }

  const shouldLoop = initialConvenios.length > 4;

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
              Parceiros
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-primary leading-[1.05]">
              Convênios{' '}
              <em className="italic font-normal text-accent">atendidos</em>
            </h2>
          </div>
          <p className="text-foreground/55 text-base font-light leading-relaxed md:text-right max-w-xs">
            Trabalhamos com os principais planos de saúde da região.
          </p>
        </div>

        <Carousel
          opts={{ align: 'start', loop: shouldLoop }}
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <CarouselContent className="-ml-5">
            {initialConvenios.map((convenio) => (
              <CarouselItem
                key={convenio.id}
                className="pl-5 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <ConvenioCard convenio={convenio} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center gap-3 mt-10">
            <CarouselPrevious className="relative translate-y-0 left-0 h-10 w-10 rounded-full border border-primary/15 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" />
            <CarouselNext className="relative translate-y-0 right-0 h-10 w-10 rounded-full border border-primary/15 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" />
          </div>
        </Carousel>

        <div className="mt-14 flex justify-center" data-aos="fade-up" data-aos-delay="200">
          <Link
            href="/convenios"
            className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-widest uppercase hover:gap-3 transition-all duration-300 border-b border-primary/20 hover:border-primary/40 pb-1"
          >
            Ver todos os convênios <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
