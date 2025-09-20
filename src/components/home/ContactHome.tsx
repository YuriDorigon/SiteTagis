// src/components/home/ContactHome.tsx
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import Link from 'next/link';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

export default function ContactHome() {
  const clinicAddressShort = "Av. Ver. Walter Borges, 157 - Campinas, São José - SC";
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <SectionTitle
          title="Entre em Contato Conosco"
          subtitle="Estamos prontos para atender você. Agende sua consulta ou tire suas dúvidas."
          className="mb-12"
          titleClassName="text-primary-foreground"
          subtitleClassName="text-primary-foreground/80"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center">
            <MessageSquare className="h-12 w-12 mb-3 text-accent" />
            <h3 className="text-xl font-semibold mb-1 font-headline">WhatsApp</h3>
            <a href={`https://wa.me/5548991936045?text=${encodeURIComponent('Olá! Vim através do site e gostaria de mais informações.')}`} target="_blank" rel="noopener noreferrer" className="text-lg hover:underline">(48) 99193-6045</a>
          </div>
           <div className="flex flex-col items-center">
            <Phone className="h-12 w-12 mb-3 text-accent" />
            <h3 className="text-xl font-semibold mb-1 font-headline">Telefone Fixo</h3>
            <a href="tel:+554830353377" className="text-lg hover:underline">(48) 3035-3377</a>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="h-12 w-12 mb-3 text-accent" />
            <h3 className="text-xl font-semibold mb-1 font-headline">Endereço</h3>
            <p className="text-lg">{clinicAddressShort}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <WhatsAppButton
            phoneNumber="5548991936045"
            message="Olá! Vim através do site e gostaria de agendar uma consulta."
            variant="default"
            className="text-base px-6 py-3 sm:text-lg sm:px-8 sm:py-4 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <MessageSquare className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Agendar Consulta
          </WhatsAppButton>
        </div>
         <div className="mt-12">
            <Button asChild variant="link" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Link href="/contato">Ver Página de Contato Completa</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
