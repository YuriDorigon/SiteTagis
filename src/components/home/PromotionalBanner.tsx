// src/components/home/PromotionalBanner.tsx
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { ArrowRight } from 'lucide-react';

export default function PromotionalBanner() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Artistic Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-[3rem] border border-primary/5 text-center shadow-2xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-8 text-xs font-bold tracking-widest uppercase" data-aos="fade-up">
            Oportunidade de Saúde
          </div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-8 text-primary"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Sua saúde com valores que <span className="text-gradient">cabem no seu bolso</span>
          </h2>
          
          <p 
            className="text-xl md:text-2xl text-foreground/60 mb-12 max-w-3xl mx-auto font-medium leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Oferecemos atendimento de alta qualidade e tecnologia de ponta por um valor acessível. Porque cuidar de você não deve esperar.
          </p>
          
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex justify-center"
          >
            <WhatsAppButton
              phoneNumber="5548991936045"
              message="Olá! Vi a promoção no site e gostaria de agendar uma consulta."
              className="btn-premium-primary text-lg px-12 py-8"
            >
              Agendar Agora e Garantir Valor <ArrowRight className="ml-2 h-6 w-6" />
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
