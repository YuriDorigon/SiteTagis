// src/components/home/ConveniosCarousel.tsx
"use client";

import * as React from 'react';
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SectionTitle from '@/components/shared/SectionTitle';
import ConvenioCard from '@/components/convenios/ConvenioCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import type { Convenio } from '@/lib/types';

interface ConveniosCarouselProps {
  initialConvenios: Convenio[];
}

export default function ConveniosCarousel({ initialConvenios }: ConveniosCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  if (!initialConvenios || initialConvenios.length === 0) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionTitle
            title="Convênios Atendidos"
            subtitle="Aceitamos uma ampla variedade de convênios para sua comodidade."
          />
          <p className="text-lg text-muted-foreground glass p-10 rounded-3xl">Nenhum convênio para exibir no momento.</p>
        </div>
      </section>
    );
  }

  const itemsPerViewLg = 4; 
  const shouldShowNavButtons = initialConvenios.length > itemsPerViewLg;
  const shouldLoop = initialConvenios.length > itemsPerViewLg; 

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Side Accents */}
      <div className="absolute top-1/2 left-0 w-32 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2"></div>
      <div className="absolute top-1/2 right-0 w-32 h-64 bg-secondary/5 rounded-full blur-3xl translate-x-1/2"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center mb-16" data-aos="fade-up">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 text-xs font-bold tracking-widest uppercase">
            Parceiros de Saúde
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Convênios <span className="text-gradient">Atendidos</span>
          </h2>
          <p className="text-foreground/60 text-center max-w-2xl text-lg font-medium">
            Trabalhamos com os principais planos de saúde para garantir o seu acesso ao melhor cuidado.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: shouldLoop,
          }}
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <CarouselContent className="-ml-6">
            {initialConvenios.map((convenio) => (
              <CarouselItem key={convenio.id} className="pl-6 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-2 h-full">
                  <ConvenioCard convenio={convenio} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-center gap-4 mt-12">
            <CarouselPrevious className="relative translate-y-0 left-0 hover:bg-primary hover:text-white border-2 border-primary/10" />
            <CarouselNext className="relative translate-y-0 right-0 hover:bg-primary hover:text-white border-2 border-primary/10" />
          </div>
        </Carousel>

        <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="300">
          <Button asChild className="btn-premium-outline">
            <Link href="/convenios">
              Consultar Todos <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
