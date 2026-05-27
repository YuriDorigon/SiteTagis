// src/components/home/TestimonialsCarousel.tsx
"use client"; 

import React from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Testimonial } from '@/lib/types';
import { Quote as QuoteIcon } from 'lucide-react';

interface TestimonialsCarouselProps {
  initialTestimonials: Testimonial[];
}

function TestimonialsCarouselComponent({ initialTestimonials }: TestimonialsCarouselProps) {
  
  if (!initialTestimonials || initialTestimonials.length === 0) {
    return (
       <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionTitle
            title="O Que Nossos Pacientes Dizem"
            subtitle="Cuidamos de você com excelência."
          />
          <p className="text-lg text-muted-foreground glass p-10 rounded-3xl">Nenhum depoimento encontrado.</p>
        </div>
      </section>
    )
  }

  const itemsPerViewLg = 3; 
  const shouldLoop = initialTestimonials.length > itemsPerViewLg;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-secondary/5 to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center mb-16" data-aos="fade-up">
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-4 text-xs font-bold tracking-widest uppercase">
            Satisfação do Paciente
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Relatos de quem <span className="text-gradient">confia</span>
          </h2>
          <p className="text-foreground/60 text-center max-w-2xl text-lg font-medium">
            Histórias reais de saúde e bem-estar proporcionadas pela equipe Clinica Tagis.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: shouldLoop,
          }}
          className="w-full max-w-6xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <CarouselContent className="-ml-6">
            {initialTestimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-6">
                <div className="h-full py-4">
                  <Card className="group relative h-full flex flex-col justify-between border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] p-10 bg-white overflow-hidden hover:-translate-y-2">
                    {/* Artistic Quote Background */}
                    <QuoteIcon className="absolute -top-6 -left-6 h-32 w-32 text-primary/5 -rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:text-secondary/5" />
                    
                    <CardContent className="flex flex-col items-center text-center p-0 flex-grow relative z-10">
                      <div className="text-secondary mb-8 transition-transform duration-500 group-hover:scale-110">
                        <QuoteIcon className="h-10 w-10 fill-secondary/20" />
                      </div>
                      <blockquote className="text-lg font-medium text-foreground/70 mb-8 flex-grow leading-relaxed italic">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="mt-auto pt-6 border-t border-primary/5 w-full">
                        <p className="text-xl font-bold text-primary mb-1">{testimonial.name}</p>
                        <p className="text-sm font-bold text-secondary/60 uppercase tracking-widest">Paciente</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-12">
            <CarouselPrevious className="relative translate-y-0 left-0 hover:bg-primary hover:text-white border-2 border-primary/10 transition-all duration-300" />
            <CarouselNext className="relative translate-y-0 right-0 hover:bg-primary hover:text-white border-2 border-primary/10 transition-all duration-300" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

// Exportação padrão explícita
export default TestimonialsCarouselComponent;
