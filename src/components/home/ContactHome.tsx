// src/components/home/ContactHome.tsx
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

export default function ContactHome() {
  const clinicAddressShort = "Av. Ver. Walter Borges, 157 - Campinas, São José - SC";
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center mb-16" data-aos="fade-up">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 text-xs font-bold tracking-widest uppercase">
            Atendimento Humanizado
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Estamos <span className="text-gradient">aqui por você</span>
          </h2>
          <p className="text-foreground/60 text-center max-w-2xl text-lg font-medium">
            Tire suas dúvidas ou agende sua consulta através de nossos canais oficiais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="group flex flex-col items-center p-10 rounded-[2.5rem] bg-white border border-primary/5 hover:border-secondary/20 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" data-aos="fade-up" data-aos-delay="100">
            <div className="p-5 rounded-3xl bg-secondary/10 text-secondary mb-6 transition-transform duration-500 group-hover:scale-110">
              <MessageSquare className="h-10 w-10 fill-secondary/10" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-primary">WhatsApp</h3>
            <a href={`https://wa.me/5548991936045?text=${encodeURIComponent('Olá! Vim através do site e gostaria de mais informações.')}`} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-secondary hover:underline transition-all">(48) 99193-6045</a>
          </div>

          <div className="group flex flex-col items-center p-10 rounded-[2.5rem] bg-white border border-primary/5 hover:border-secondary/20 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" data-aos="fade-up" data-aos-delay="200">
            <div className="p-5 rounded-3xl bg-secondary/10 text-secondary mb-6 transition-transform duration-500 group-hover:scale-110">
              <Phone className="h-10 w-10 fill-secondary/10" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-primary">Telefone</h3>
            <a href="tel:+554830353377" className="text-lg font-bold text-secondary hover:underline transition-all">(48) 3035-3377</a>
          </div>

          <div className="group flex flex-col items-center p-10 rounded-[2.5rem] bg-white border border-primary/5 hover:border-secondary/20 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" data-aos="fade-up" data-aos-delay="300">
            <div className="p-5 rounded-3xl bg-secondary/10 text-secondary mb-6 transition-transform duration-500 group-hover:scale-110">
              <MapPin className="h-10 w-10 fill-secondary/10" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-primary">Onde Estamos</h3>
            <p className="text-lg font-medium text-foreground/70 text-center">{clinicAddressShort}</p>
          </div>
        </div>

        <div 
          className="flex flex-col items-center"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <WhatsAppButton
            phoneNumber="5548991936045"
            message="Olá! Vim através do site e gostaria de agendar uma consulta."
            className="btn-premium-primary text-lg px-10 py-7 mb-8"
          >
            <MessageSquare className="mr-2 h-6 w-6" /> Agendar Consulta Agora
          </WhatsAppButton>

          <Button asChild variant="link" className="text-primary/60 hover:text-primary font-bold tracking-widest uppercase text-xs">
            <Link href="/contato" className="flex items-center gap-2">
              Ver Localização Completa <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
