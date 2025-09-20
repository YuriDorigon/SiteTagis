// src/components/home/TestimonialsCarousel.tsx
"use client"; 

import React, { useState, useEffect } from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { db } from '@/lib/firebase'; 
import { collection, query, orderBy, onSnapshot, Unsubscribe } from 'firebase/firestore'; 
import type { Testimonial } from '@/lib/types';
import { Loader2, Quote as QuoteIcon } from 'lucide-react';

// Renomeado para uma função nomeada e exportado como padrão no final.
function TestimonialsCarouselComponent() {
  const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const testimonialsCol = collection(db, 'testimonials');
    const q = query(testimonialsCol, orderBy('name'));

    const unsubscribe: Unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTestimonials = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || 'Nome Indisponível',
          quote: data.quote || 'Depoimento indisponível.',
        } as Testimonial;
      });
      setTestimonialsData(fetchedTestimonials);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching testimonials with onSnapshot:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionTitle
            title="O Que Nossos Pacientes Dizem"
            subtitle="A satisfação de quem confia na Clinica Tagis."
          />
           <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Carregando depoimentos...</span>
          </div>
        </div>
      </section>
    );
  }
  
  if (!testimonialsData.length && !isLoading) {
    return (
       <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionTitle
            title="O Que Nossos Pacientes Dizem"
            subtitle="A satisfação de quem confia na Clinica Tagis."
          />
          <p className="text-lg text-muted-foreground">Nenhum depoimento encontrado no momento.</p>
        </div>
      </section>
    )
  }

  const itemsPerViewLg = 3; 
  const shouldLoop = testimonialsData.length > itemsPerViewLg;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title="O Que Nossos Pacientes Dizem"
          subtitle="A satisfação de quem confia na Clinica Tagis."
        />
        <Carousel
          opts={{
            align: "start",
            loop: shouldLoop,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonialsData.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col justify-between shadow-md p-6 bg-secondary/50">
                    <CardContent className="flex flex-col items-center text-center p-0 flex-grow">
                      <div className="text-accent mb-4">
                        <QuoteIcon className="h-10 w-10" />
                      </div>
                      <blockquote className="text-lg italic text-foreground/90 mb-4 flex-grow">
                        "{testimonial.quote}"
                      </blockquote>
                      <p className="font-semibold text-primary font-headline mt-auto">{testimonial.name}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {shouldLoop && ( 
            <>
              <CarouselPrevious className="absolute left-[-20px] md:left-[-50px] top-1/2 -translate-y-1/2 hidden sm:inline-flex" />
              <CarouselNext className="absolute right-[-20px] md:right-[-50px] top-1/2 -translate-y-1/2 hidden sm:inline-flex" />
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
}

// Exportação padrão explícita
export default TestimonialsCarouselComponent;
