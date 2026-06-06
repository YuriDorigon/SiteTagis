// src/app/contato/page.tsx
import type { Metadata } from 'next';
import MapEmbed from '@/components/contact/MapEmbed';

export const metadata: Metadata = {
  title: 'Contato | Tagis Medicina e Diagnóstico – São José SC',
  description: 'Entre em contato com a Tagis: (48) 3035-3377 | (48) 99193-6045. Av. Ver. Walter Borges, 157 – Campinas, São José SC. Seg–Sex 07:30–18h, Sáb 07:30–12h.',
};
import { Phone, MessageSquare, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { getClinicConfig } from '@/lib/server/firestoreData';

export const revalidate = 86400;

export default async function ContatoPage() {
  const cfg = await getClinicConfig();
  const WHATSAPP = cfg.whatsapp;
  const WHATSAPP_MSG = encodeURIComponent('Olá! Vim através do site e gostaria de agendar uma consulta.');
  const mapEmbedUrl = cfg.googleMapsEmbed;
  const googleMapsLink = cfg.googleMapsLink;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tagismedicina.com.br';

  const localBusinessLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Tagis Medicina e Diagnóstico',
    url: siteUrl,
    telephone: `+55${cfg.phone1.replace(/\D/g, '')}`,
    image: `${siteUrl}/og-image.png`,
    logo: `${siteUrl}/favicon.svg`,
    description: 'Clínica médica com mais de 30 especialidades, 50 tipos de exames e convênios em São José, SC.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: cfg.addressStreet,
      addressLocality: 'São José',
      addressRegion: 'SC',
      postalCode: cfg.addressCep,
      addressCountry: 'BR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: -27.5969, longitude: -48.6277 },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:30', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '07:30', closes: '12:00' },
    ],
    sameAs: [cfg.instagram, cfg.facebook, googleMapsLink].filter(Boolean),
    priceRange: '$$',
  };

  if (cfg.googleRating && cfg.googleReviewCount) {
    localBusinessLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: cfg.googleRating,
      reviewCount: cfg.googleReviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Contato', item: `${siteUrl}/contato` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    <div className="bg-[#f8fafb] min-h-screen">

      {/* Hero */}
      <div className="bg-primary py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <span className="text-accent text-[11px] font-medium tracking-[0.25em] uppercase mb-4 block">
            Fale conosco
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-light text-white leading-tight">
            Entre em{' '}
            <em className="italic font-normal text-accent">contato</em>
          </h1>
          <p className="text-white/50 text-base font-light mt-3 max-w-md">
            Estamos à disposição para esclarecer dúvidas, agendar consultas ou fornecer informações.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-10 lg:px-20 py-12 lg:py-16">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Info panel */}
          <div className="lg:col-span-2 space-y-4">

            {/* Horários */}
            <div className="bg-white rounded-2xl border border-primary/8 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-xs font-semibold tracking-widest uppercase text-foreground/40">Horários</span>
              </div>
              <ul className="space-y-2.5">
                {[
                  { day: 'Segunda a Sexta', time: cfg.hoursWeekdays, open: true },
                  { day: 'Sábado', time: cfg.hoursSaturday, open: true },
                  { day: 'Domingo', time: cfg.hoursSunday, open: false },
                ].map((h, i) => (
                  <li key={i} className="flex justify-between items-center text-sm">
                    <span className="text-foreground/55 font-light">{h.day}</span>
                    <span className={h.open ? 'text-primary font-medium' : 'text-foreground/30 font-light'}>
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contatos */}
            <div className="bg-white rounded-2xl border border-primary/8 p-6 space-y-5">
              <div className="flex items-center gap-3 mb-1">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-xs font-semibold tracking-widest uppercase text-foreground/40">Contato</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-foreground/35 uppercase mb-1">WhatsApp</p>
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium text-sm hover:text-accent transition-colors"
                >
                  {cfg.whatsappDisplay}
                </a>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-foreground/35 uppercase mb-1">Telefone</p>
                <a href={`tel:${cfg.phone1.replace(/\D/g,'')}`} className="text-primary font-medium text-sm hover:text-accent transition-colors">
                  {cfg.phone1}
                </a>
              </div>
              <div className="flex gap-2 pt-1">
                <a
                  href={cfg.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary/5 text-primary/50 hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={cfg.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary/5 text-primary/50 hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Endereço */}
            <div className="bg-white rounded-2xl border border-primary/8 p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-xs font-semibold tracking-widest uppercase text-foreground/40">Endereço</span>
              </div>
              <address className="not-italic text-sm text-primary font-medium leading-relaxed mb-4">
                {cfg.addressStreet}<br />
                {cfg.addressCity}<br />
                <span className="text-foreground/45 font-light">CEP: {cfg.addressCep}</span>
              </address>
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent text-xs font-semibold tracking-widest uppercase hover:gap-2.5 transition-all duration-300"
              >
                Como chegar →
              </a>
            </div>

            {/* CTA */}
            <WhatsAppButton
              phoneNumber={WHATSAPP}
              message="Olá! Vim através do site e gostaria de agendar uma consulta."
              className="w-full inline-flex items-center justify-center gap-2.5 bg-primary text-white font-medium py-4 px-8 rounded-2xl text-sm hover:bg-primary/90 transition-all duration-300 hover:scale-[1.01]"
            >
              <MessageSquare className="h-4 w-4" />
              Agendar pelo WhatsApp
            </WhatsAppButton>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <MapEmbed embedUrl={mapEmbedUrl} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
