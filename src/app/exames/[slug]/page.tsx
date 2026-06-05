// src/app/exames/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, UserRound } from 'lucide-react';
import { getExams, getDoctors, getClinicConfig } from '@/lib/server/firestoreData';
import { slugify } from '@/lib/utils/slug';
import LucideIconRenderer from '@/components/shared/LucideIconRenderer';

export const revalidate = 3600;

export async function generateStaticParams() {
  const exams = await getExams();
  return exams.map((e) => ({ slug: slugify(e.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [exams, cfg] = await Promise.all([getExams(), getClinicConfig()]);
  const exam = exams.find((e) => slugify(e.name) === slug);
  if (!exam) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tagismedicina.com.br';
  const phone = cfg.whatsappDisplay ?? '(48) 99193-6045';
  const desc = `Realize ${exam.name} em São José, SC — Tagis Medicina e Diagnóstico. ${exam.description} Atendemos convênios. Agende: ${phone} ou ${cfg.phone1}.`;
  return {
    title: `${exam.name} em São José SC | Tagis Medicina e Diagnóstico`,
    description: desc.slice(0, 160),
    alternates: { canonical: `${siteUrl}/exames/${slug}` },
    openGraph: {
      title: `${exam.name} em São José SC | Tagis`,
      description: exam.description,
      url: `${siteUrl}/exames/${slug}`,
    },
  };
}

function getInitials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
}

export default async function ExamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [exams, doctors] = await Promise.all([getExams(), getDoctors()]);
  const exam = exams.find((e) => slugify(e.name) === slug);
  if (!exam) notFound();

  const relatedDoctors = doctors.filter((d) => d.examIds?.includes(exam.id));
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tagismedicina.com.br';

  const examLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalTest',
    name: exam.name,
    description: exam.description,
    url: `${siteUrl}/exames/${slug}`,
    usedToDiagnose: exam.description,
    availableAt: {
      '@type': 'MedicalClinic',
      name: 'Tagis Medicina e Diagnóstico',
      url: siteUrl,
      telephone: '+554830353377',
      address: { '@type': 'PostalAddress', streetAddress: 'Av. Ver. Walter Borges, 157', addressLocality: 'São José', addressRegion: 'SC', postalCode: '88101-030', addressCountry: 'BR' },
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Exames', item: `${siteUrl}/exames` },
      { '@type': 'ListItem', position: 3, name: exam.name, item: `${siteUrl}/exames/${slug}` },
    ],
  };

  const waMessage = encodeURIComponent(`Olá! Gostaria de agendar o exame de ${exam.name}.`);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(examLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-4xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-foreground/40 mb-10" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">Início</Link>
          <span>/</span>
          <Link href="/exames" className="hover:text-primary transition-colors">Exames</Link>
          <span>/</span>
          <span className="text-foreground/70">{exam.name}</span>
        </nav>

        {/* Header */}
        <div className="flex items-start gap-6 mb-10">
          <div className="p-4 bg-accent/8 rounded-2xl flex-shrink-0">
            <LucideIconRenderer name={exam.iconName} className="h-10 w-10 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary font-headline mb-2">{exam.name}</h1>
            <p className="text-foreground/60 leading-relaxed">{exam.description}</p>
          </div>
        </div>

        {/* Médicos que realizam */}
        {relatedDoctors.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-primary font-headline mb-6 flex items-center gap-2">
              <UserRound className="h-5 w-5 text-accent" />
              Profissionais que realizam este exame
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedDoctors.map((doctor) => (
                <Link
                  key={doctor.id}
                  href={`/corpo-clinico/${slugify(doctor.name)}`}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-primary/8 hover:border-primary/20 hover:bg-primary/4 transition-all duration-200 group"
                >
                  <div className="relative w-14 h-14 rounded-full border border-primary/10 overflow-hidden bg-muted flex-shrink-0">
                    {doctor.imageUrl ? (
                      <Image src={doctor.imageUrl} alt={`Foto de ${doctor.name}`} fill sizes="56px" className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">{getInitials(doctor.name)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-semibold text-primary text-sm font-headline uppercase leading-snug">{doctor.name}</p>
                    <p className="text-xs text-foreground/40">CRM/SC: {doctor.crm}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-foreground/20 group-hover:text-accent transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Info card */}
        <div className="bg-primary/4 border border-primary/10 rounded-2xl p-6 mb-8">
          <h3 className="text-sm font-semibold text-primary mb-2">Precisa de pedido médico?</h3>
          <p className="text-sm text-foreground/60 font-light">Para a maioria dos exames é necessário pedido médico. Entre em contato para confirmar o que é necessário para a sua consulta.</p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 items-center border-t border-border pt-8">
          <a
            href={`https://wa.me/5548991936045?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 w-full sm:w-auto"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Agendar {exam.name}
          </a>
          <Link href="/exames" className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Ver todos os exames
          </Link>
        </div>
      </div>
    </>
  );
}
