"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { Testimonial } from '@/lib/types';
import { Star } from 'lucide-react';

interface TestimonialsCarouselProps {
  initialTestimonials: Testimonial[];
}

function TestimonialsCarouselComponent({ initialTestimonials }: TestimonialsCarouselProps) {
  if (!initialTestimonials || initialTestimonials.length === 0) {
    return null;
  }

  const shouldLoop = initialTestimonials.length > 3;

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
              Avaliações
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-primary leading-[1.05]">
              O que nossos{' '}
              <em className="italic font-normal text-accent">pacientes dizem</em>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-4 w-4 text-accent fill-accent" />
            ))}
          </div>
        </div>

        <Carousel
          opts={{ align: 'start', loop: shouldLoop }}
          className="w-full"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <CarouselContent className="-ml-6">
            {initialTestimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full border border-primary/8 shadow-none hover:shadow-[0_8px_30px_-12px_rgba(0,59,79,0.12)] transition-shadow duration-500 rounded-3xl bg-white">
                  <CardContent className="flex flex-col p-8 lg:p-10 h-full">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-3.5 w-3.5 text-accent fill-accent" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-foreground/65 text-base font-light leading-relaxed flex-grow mb-8 italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-6 border-t border-primary/8">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center font-display text-lg text-accent flex-shrink-0">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary">{testimonial.name}</p>
                        <p className="text-[10px] text-foreground/40 font-medium uppercase tracking-widest">
                          Paciente Tagis
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center gap-3 mt-10">
            <CarouselPrevious className="relative translate-y-0 left-0 h-10 w-10 rounded-full border border-primary/15 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" />
            <CarouselNext className="relative translate-y-0 right-0 h-10 w-10 rounded-full border border-primary/15 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default TestimonialsCarouselComponent;
