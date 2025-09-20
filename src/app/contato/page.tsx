// src/app/contato/page.tsx
import SectionTitle from '@/components/shared/SectionTitle';
import MapEmbed from '@/components/contact/MapEmbed';
import { Phone, MessageSquare, MapPin, Clock } from 'lucide-react';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
// Card related imports removed as the card itself is removed
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button'; 

export default function ContatoPage() {
  const clinicAddress = "Av. Ver. Walter Borges, 157 - Campinas, São José - SC, 88101-030";
  // O link do Google Maps para "Ver no mapa" continua dinâmico
  const encodedAddress = encodeURIComponent(clinicAddress);
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.7975871311696!2d-48.61270462453663!3d-27.5998043762444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95273625a2bae6b3%3A0xb22213c1823da2ba!2sTagis!5e0!3m2!1spt-BR!2sbr!4v1753309024664!5m2!1spt-BR!2sbr";
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
              <MessageSquare className="h-7 w-7 text-primary mr-4 flex-shrink-0" />
              <div>
                <strong className="block">WhatsApp (Agendamentos):</strong>
                <a href={`https://wa.me/5548991936045?text=${encodeURIComponent('Olá! Vim através do site e gostaria de mais informações.')}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">(48) 99193-6045</a>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-7 w-7 text-primary mr-4 flex-shrink-0" />
              <div>
                <strong className="block">Telefone Fixo:</strong>
                <a href="tel:+554830353377" className="hover:text-primary">(48) 3035-3377</a>
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
