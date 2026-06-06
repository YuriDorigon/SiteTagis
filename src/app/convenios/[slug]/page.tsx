// src/app/convenios/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getConvenios, getClinicConfig } from '@/lib/server/firestoreData';
import { slugify } from '@/lib/utils/slug';

export const revalidate = 86400;

export async function generateStaticParams() {
  const convenios = await getConvenios();
  return convenios.map((c) => ({ slug: slugify(c.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const convenios = await getConvenios();
  const convenio = convenios.find((c) => slugify(c.name) === slug);
  if (!convenio) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tagismedicina.com.br';
  return {
    title: `${convenio.name} em São José SC | Tagis Medicina e Diagnóstico`,
    description: `A Tagis Medicina e Diagnóstico aceita ${convenio.name} em São José, SC. Consultas com mais de 30 especialistas e exames completos. Agende pelo WhatsApp: (48) 99193-6045.`,
    alternates: { canonical: `${siteUrl}/convenios/${slug}` },
    openGraph: {
      title: `${convenio.name} | Tagis Medicina – São José SC`,
      description: `Atendemos ${convenio.name} na Tagis. Consultas e exames em São José, SC.`,
      images: convenio.logoUrl ? [{ url: convenio.logoUrl }] : [],
    },
  };
}

export default async function ConvenioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [convenios, cfg] = await Promise.all([getConvenios(), getClinicConfig()]);
  const convenio = convenios.find((c) => slugify(c.name) === slug);
  if (!convenio) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tagismedicina.com.br';

  const clinicLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Tagis Medicina e Diagnóstico',
    url: siteUrl,
    telephone: `+55${cfg.phone1.replace(/\D/g, '')}`,
    paymentAccepted: convenio.name,
    description: `A Tagis Medicina e Diagnóstico aceita ${convenio.name} em São José, SC.`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: cfg.addressStreet,
      addressLocality: 'São José',
      addressRegion: 'SC',
      postalCode: cfg.addressCep,
      addressCountry: 'BR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: -27.5969, longitude: -48.6277 },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Convênios', item: `${siteUrl}/convenios` },
      { '@type': 'ListItem', position: 3, name: convenio.name, item: `${siteUrl}/convenios/${slug}` },
    ],
  };

  const waMessage = encodeURIComponent(`Olá! Sou paciente do ${convenio.name} e gostaria de agendar uma consulta na Tagis.`);

  const benefits = [
    'Mais de 30 especialidades médicas',
    'Exames de imagem e laboratoriais',
    'Atendimento de segunda a sexta das 07:30 às 18h',
    'Atendimento aos sábados das 07:30 às 12h',
    `Agendamento rápido pelo WhatsApp ${cfg.whatsappDisplay}`,
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-4xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-foreground/40 mb-10" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">Início</Link>
          <span>/</span>
          <Link href="/convenios" className="hover:text-primary transition-colors">Convênios</Link>
          <span>/</span>
          <span className="text-foreground/70">{convenio.name}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12">
          {convenio.logoUrl && (
            <div className="relative w-40 h-24 flex-shrink-0 bg-white rounded-2xl border border-primary/10 p-4">
              <Image
                src={convenio.logoUrl}
                alt={`Logo ${convenio.name}`}
                fill
                className="object-contain p-2"
              />
            </div>
          )}
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">Convênio aceito</p>
            <h1 className="text-2xl md:text-3xl font-bold text-primary font-headline mb-3">
              {convenio.name} na Tagis
            </h1>
            <p className="text-foreground/60 leading-relaxed">
              A Tagis Medicina e Diagnóstico, em São José, SC, atende pacientes do{' '}
              <strong>{convenio.name}</strong>. Consultas com especialistas, exames completos e atendimento humanizado em um único lugar.
            </p>
          </div>
        </div>

        {/* O que está incluso */}
        <div className="bg-primary/4 border border-primary/10 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-primary font-headline mb-5">
            O que você tem acesso na Tagis com {convenio.name}
          </h2>
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-foreground/70">
                <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Dúvida sobre cobertura */}
        <div className="bg-muted/50 border border-border rounded-2xl p-6 mb-10">
          <h3 className="text-sm font-semibold text-primary mb-2">Dúvidas sobre cobertura?</h3>
          <p className="text-sm text-foreground/60 font-light">
            A cobertura pode variar conforme o plano contratado. Entre em contato antes de agendar para confirmar sua cobertura específica.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 items-center border-t border-border pt-8">
          <a
            href={`https://wa.me/${cfg.whatsapp}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 w-full sm:w-auto"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Agendar com {convenio.name}
          </a>
          <a
            href={`tel:${cfg.phone1.replace(/\D/g, '')}`}
            className="inline-flex items-center justify-center gap-2 border border-primary/20 text-primary font-semibold px-6 py-3 rounded-full transition-all duration-300 w-full sm:w-auto hover:bg-primary/5"
          >
            Ligar: {cfg.phone1}
          </a>
          <Link href="/convenios" className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Ver todos os convênios
          </Link>
        </div>
      </div>
    </>
  );
}
