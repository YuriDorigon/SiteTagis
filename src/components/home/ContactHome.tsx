import { Phone, MessageSquare, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { getClinicConfig } from '@/lib/server/firestoreData';

export default async function ContactHome() {
  const cfg = await getClinicConfig();
  const hours = [
    { day: 'Segunda a Sexta', time: cfg.hoursWeekdays, open: true },
    { day: 'Sábado', time: cfg.hoursSaturday, open: true },
    { day: 'Domingo', time: cfg.hoursSunday, open: false },
  ];
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">

        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-14 lg:mb-16"
          data-aos="fade-up"
        >
          <div className="max-w-xl">
            <span className="text-accent text-[11px] font-medium tracking-[0.25em] uppercase mb-5 block">
              Atendimento
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-primary leading-[1.05]">
              Estamos aqui{' '}
              <em className="italic font-normal text-accent">por você</em>
            </h2>
          </div>
          <WhatsAppButton
            phoneNumber={cfg.whatsapp}
            message="Olá! Vim através do site e gostaria de agendar uma consulta."
            className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-medium py-4 px-8 rounded-full text-sm transition-all duration-300 hover:scale-[1.02] self-start md:self-end flex-shrink-0"
          >
            <MessageSquare className="h-4 w-4" />
            Agendar pelo WhatsApp
          </WhatsAppButton>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/8 border border-primary/8 rounded-3xl overflow-hidden">

          {/* Horários */}
          <div className="bg-white p-8 lg:p-10" data-aos="fade-up" data-aos-delay="100">
            <Clock className="h-5 w-5 text-accent mb-6" />
            <h3 className="text-primary font-medium text-base mb-5 font-headline">Horários</h3>
            <ul className="space-y-3">
              {hours.map((h, i) => (
                <li key={i} className="flex justify-between items-center text-sm">
                  <span className="text-foreground/50 font-light">{h.day}</span>
                  <span className={h.open ? 'text-primary font-medium' : 'text-foreground/30 font-light'}>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="bg-white p-8 lg:p-10" data-aos="fade-up" data-aos-delay="180">
            <Phone className="h-5 w-5 text-accent mb-6" />
            <h3 className="text-primary font-medium text-base mb-5 font-headline">Contato</h3>
            <ul className="space-y-4">
              <li>
                <p className="text-foreground/55 text-[10px] font-medium tracking-widest uppercase mb-1">
                  Telefone
                </p>
                <a
                  href={`tel:${cfg.phone1.replace(/\D/g,'')}`}
                  className="text-primary font-medium hover:text-accent transition-colors text-sm"
                >
                  {cfg.phone1}
                </a>
              </li>
              <li>
                <p className="text-foreground/55 text-[10px] font-medium tracking-widest uppercase mb-1">
                  WhatsApp
                </p>
                <a
                  href={`https://wa.me/${cfg.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:text-accent transition-colors text-sm"
                >
                  {cfg.whatsappDisplay}
                </a>
              </li>
              <li className="flex gap-2 pt-2">
                <a
                  href={cfg.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook da Tagis Medicina e Diagnóstico"
                  className="p-2 rounded-lg bg-primary/5 text-primary/60 hover:bg-accent/10 hover:text-accent transition-colors duration-300"
                >
                  <Facebook className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={cfg.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da Tagis Medicina e Diagnóstico"
                  className="p-2 rounded-lg bg-primary/5 text-primary/60 hover:bg-accent/10 hover:text-accent transition-colors duration-300"
                >
                  <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Endereço */}
          <div className="bg-white p-8 lg:p-10" data-aos="fade-up" data-aos-delay="260">
            <MapPin className="h-5 w-5 text-accent mb-6" />
            <h3 className="text-primary font-medium text-base mb-5 font-headline">Endereço</h3>
            <address className="not-italic space-y-1 mb-5">
              <p className="text-primary font-medium text-sm">{cfg.addressStreet}</p>
              <p className="text-foreground/55 text-sm font-light">{cfg.addressCity}</p>
              <p className="text-foreground/55 text-sm font-light">CEP: {cfg.addressCep}</p>
            </address>
            <Link
              href="/contato"
              className="inline-flex items-center gap-1.5 text-accent text-xs font-semibold tracking-widest uppercase hover:gap-2.5 transition-all duration-300"
            >
              Ver no mapa →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
