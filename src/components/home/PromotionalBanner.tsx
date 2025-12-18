// src/components/home/PromotionalBanner.tsx
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { ArrowRight } from 'lucide-react';

export default function PromotionalBanner() {
  return (
    <section
      className="relative py-16 md:py-20 bg-secondary"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <Badge
            variant="destructive"
            className="mb-4 text-base font-semibold py-1 px-4 shadow-lg"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Preço Especial
          </Badge>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary drop-shadow-md"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Consultas com valores que cabem no seu bolso
          </h2>
          <div 
            className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto drop-shadow-sm"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Atendimento de alta qualidade, com a confiança e o cuidado que você merece, por um valor que você não espera.
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <WhatsAppButton
              phoneNumber="5548991936045"
              message="Olá! Vi a promoção no site e gostaria de agendar uma consulta."
              variant="destructive"
              size="lg"
              className="text-base px-8 py-6 sm:text-lg sm:px-10 sm:py-7 shadow-xl transform hover:scale-105 transition-transform duration-300"
            >
              Agendar Consulta Agora <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
