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
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionTitle
            title="Convênios Atendidos"
            subtitle="Aceitamos uma ampla variedade de convênios para sua comodidade e bem-estar."
            data-aos="fade-up"
          />
          <p className="text-lg text-muted-foreground">Nenhum convênio para exibir no momento.</p>
           <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="100">
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
              <Link href="/convenios">
                Ver Todos os Convênios <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const itemsPerViewLg = 4; 
  const shouldShowNavButtons = initialConvenios.length > itemsPerViewLg;
  const shouldLoop = initialConvenios.length > itemsPerViewLg; 

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title="Convênios Atendidos"
          subtitle="Aceitamos uma ampla variedade de convênios para sua comodidade e bem-estar."
          data-aos="fade-up"
        />
        <Carousel
          opts={{
            align: "start",
            loop: shouldLoop,
          }}
          plugins={[plugin.current]}
          className="w-full max-w-5xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <CarouselContent className="-ml-4">
            {initialConvenios.map((convenio) => (
              <CarouselItem key={convenio.id} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-1 h-full">
                  <ConvenioCard convenio={convenio} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {shouldShowNavButtons && (
            <>
              <CarouselPrevious className="absolute left-[-20px] md:left-[-50px] top-1/2 -translate-y-1/2 hidden sm:inline-flex" />
              <CarouselNext className="absolute right-[-20px] md:right-[-50px] top-1/2 -translate-y-1/2 hidden sm:inline-flex" />
            </>
          )}
        </Carousel>
        <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="300">
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
            <Link href="/convenios">
              Ver Todos os Convênios <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
