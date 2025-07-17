// src/app/contato/page.tsx
import SectionTitle from '@/components/shared/SectionTitle';
import MapEmbed from '@/components/contact/MapEmbed';
import { Phone, MessageSquare, Mail, MapPin, Clock } from 'lucide-react';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
// Card related imports removed as the card itself is removed
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button'; 

export default function ContatoPage() {
  const clinicAddress = "Av. Ver. Walter Borges, 157 - Campinas, São José - SC, 88101-030";
  const encodedAddress = encodeURIComponent(clinicAddress);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const googleMapsLink = `https://maps.google.com/?q=${encodedAddress}`;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <SectionTitle
        title="Entre em Contato"
        subtitle="Estamos à disposição para esclarecer suas dúvidas, agendar consultas ou fornecer informações."
      />

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h3 className="text-2xl font-semibold text-primary mb-6 font-headline">Nossas Informações</h3>
          <div className="space-y-6 text-lg">
            <div className="flex items-start">
              <MapPin className="h-7 w-7 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <strong className="block">Endereço:</strong>
                {clinicAddress}
                <a 
                  href={googleMapsLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-sm text-primary hover:underline mt-1"
                >
                  Ver no Google Maps
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-7 w-7 text-primary mr-4 flex-shrink-0" />
              <div>
                <strong className="block">Telefone Fixo:</strong>
                <a href="tel:+554830353377" className="hover:text-primary">(48) 3035-3377</a>
              </div>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-7 w-7 text-primary mr-4 flex-shrink-0" />
              <div>
                <strong className="block">WhatsApp:</strong>
                <a href={`https://wa.me/5548991936045?text=${encodeURIComponent('Olá! Vim através do site e gostaria de mais informações.')}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">(48) 99193-6045</a>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="h-7 w-7 text-primary mr-4 flex-shrink-0" />
              <div>
                <strong className="block">E-mail:</strong>
                <a href="mailto:contato@tagisclinic.com.br" className="hover:text-primary">contato@tagisclinic.com.br</a>
              </div>
            </div>
             <div className="flex items-start">
              <Clock className="h-7 w-7 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <strong className="block">Horário de Atendimento:</strong>
                Segunda a Sexta: 07:30 - 18:00 <br />
                Sábado: 07:30 - 12:00
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <WhatsAppButton 
              phoneNumber="5548991936045" 
              size="lg" 
              message="Olá! Vim através do site e gostaria de agendar uma consulta."
              className="text-lg px-8 py-6 w-full sm:w-auto"
            >
              <MessageSquare className="mr-2 h-6 w-6" /> Agendar Consulta
            </WhatsAppButton>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-primary mb-6 font-headline">Nossa Localização</h3>
          <MapEmbed embedUrl={mapEmbedUrl} />
        </div>
      </div>

      {/* 
        A Card contendo o formulário de contato foi removida daqui.
      */}

    </div>
  );
}
