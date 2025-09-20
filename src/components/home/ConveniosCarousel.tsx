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
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'; // Import getDocs instead of onSnapshot
import type { Convenio } from '@/lib/types';

export default function ConveniosCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const [convenios, setConvenios] = React.useState<Convenio[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchConvenios = async () => {
      setLoading(true);
      setError(null);
      try {
        const conveniosCol = collection(db, 'convenios');
        const q = query(conveniosCol, orderBy('name'), limit(10));
        const snapshot = await getDocs(q);

        const fetchedConvenios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Convenio));
        setConvenios(fetchedConvenios);

        if (fetchedConvenios.length === 0) {
          console.log("Nenhum convênio encontrado para o carrossel da página inicial. Verifique as regras do Firestore para leitura pública da coleção 'convenios'.");
        }
      } catch (err: any) {
        console.error("Error fetching convenios for carousel:", err);
        setError(`Não foi possível carregar os convênios (Erro: ${err.message}). Por favor, verifique suas regras de segurança do Firestore para leitura pública da coleção 'convenios'.`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchConvenios();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionTitle
            title="Convênios Atendidos"
            subtitle="Aceitamos uma ampla variedade de convênios para sua comodidade e bem-estar."
          />
          <div className="flex justify-center items-center h-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-lg text-muted-foreground">Carregando convênios...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionTitle
            title="Convênios Atendidos"
            subtitle="Aceitamos uma ampla variedade de convênios para sua comodidade e bem-estar."
          />
          <p className="text-lg text-destructive bg-destructive/10 p-4 rounded-md">{error}</p>
        </div>
      </section>
    );
  }

  if (!convenios || convenios.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionTitle
            title="Convênios Atendidos"
            subtitle="Aceitamos uma ampla variedade de convênios para sua comodidade e bem-estar."
          />
          <p className="text-lg text-muted-foreground">Nenhum convênio para exibir no momento. Verifique os logs para mais detalhes.</p>
           <div className="mt-12 text-center">
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
  const shouldShowNavButtons = convenios.length > itemsPerViewLg;
  const shouldLoop = convenios.length > itemsPerViewLg; 

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title="Convênios Atendidos"
          subtitle="Aceitamos uma ampla variedade de convênios para sua comodidade e bem-estar."
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
        >
          <CarouselContent className="-ml-4">
            {convenios.map((convenio) => (
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
        <div className="mt-12 text-center">
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
