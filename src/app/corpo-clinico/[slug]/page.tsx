// src/app/corpo-clinico/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Stethoscope, Microscope } from 'lucide-react';
import { getDoctors, getSpecialties, getExams } from '@/lib/server/firestoreData';
import { slugify } from '@/lib/utils/slug';

export const revalidate = 86400;

export async function generateStaticParams() {
  const doctors = await getDoctors();
  return doctors.map((d) => ({ slug: slugify(d.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doctors = await getDoctors();
  const doctor = doctors.find((d) => slugify(d.name) === slug);
  if (!doctor) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tagismedicina.com.br';
  return {
    title: `${doctor.name} | Tagis Medicina e Diagnóstico – São José SC`,
    description: `${doctor.name}, CRM/SC ${doctor.crm}. ${doctor.bio ? doctor.bio.slice(0, 150) + '...' : 'Médico especialista na Tagis Medicina e Diagnóstico em São José, SC.'}`,
    alternates: { canonical: `${siteUrl}/corpo-clinico/${slug}` },
    openGraph: {
      title: `${doctor.name} | Tagis`,
      description: doctor.bio?.slice(0, 150),
      images: doctor.imageUrl ? [{ url: doctor.imageUrl }] : [],
    },
  };
}

function getInitials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [doctors, specialties, exams] = await Promise.all([getDoctors(), getSpecialties(), getExams()]);
  const doctor = doctors.find((d) => slugify(d.name) === slug);
  if (!doctor) notFound();

  const doctorSpecialties = specialties.filter((s) => doctor.specialtyIds?.includes(s.id));
  const doctorExams = exams.filter((e) => doctor.examIds?.includes(e.id));
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tagismedicina.com.br';

  const physicianLd = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    identifier: `CRM/SC ${doctor.crm}`,
    description: doctor.bio,
    image: doctor.imageUrl || undefined,
    url: `${siteUrl}/corpo-clinico/${slug}`,
    medicalSpecialty: doctorSpecialties.map((s) => s.name),
    worksFor: {
      '@type': 'MedicalClinic',
      name: 'Tagis Medicina e Diagnóstico',
      url: siteUrl,
      address: { '@type': 'PostalAddress', streetAddress: 'Av. Ver. Walter Borges, 157', addressLocality: 'São José', addressRegion: 'SC', addressCountry: 'BR' },
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Corpo Clínico', item: `${siteUrl}/corpo-clinico` },
      { '@type': 'ListItem', position: 3, name: doctor.name, item: `${siteUrl}/corpo-clinico/${slug}` },
    ],
  };

  const waMessage = encodeURIComponent(`Olá! Gostaria de agendar uma consulta com ${doctor.name}.`);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-4xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-foreground/40 mb-10" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">Início</Link>
          <span>/</span>
          <Link href="/corpo-clinico" className="hover:text-primary transition-colors">Corpo Clínico</Link>
          <span>/</span>
          <span className="text-foreground/70">{doctor.name}</span>
        </nav>

        {/* Card principal */}
        <div className="flex flex-col sm:flex-row gap-8 items-start mb-12">
          {/* Foto */}
          <div className="relative w-36 h-36 rounded-2xl border border-primary/10 overflow-hidden bg-muted flex-shrink-0 mx-auto sm:mx-0">
            {doctor.imageUrl ? (
              <Image src={doctor.imageUrl} alt={`Foto de ${doctor.name}`} fill sizes="144px" className="object-cover" />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl font-semibold text-primary font-headline">{getInitials(doctor.name)}</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-grow text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-primary font-headline uppercase mb-1">{doctor.name}</h1>
            <p className="text-sm text-foreground/40 font-medium tracking-wide mb-4">CRM/SC: {doctor.crm}</p>

            {doctorSpecialties.length > 0 && (
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3">
                <Stethoscope className="h-4 w-4 text-primary/50 mt-0.5 flex-shrink-0" />
                {doctorSpecialties.map((s) => (
                  <Link key={s.id} href={`/especialidades/${slugify(s.name)}`} className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/8 text-primary hover:bg-primary/15 transition-colors">
                    {s.name}
                  </Link>
                ))}
              </div>
            )}

            {doctorExams.length > 0 && (
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <Microscope className="h-4 w-4 text-accent/60 mt-0.5 flex-shrink-0" />
                {doctorExams.map((e) => (
                  <span key={e.id} className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-accent/8 text-accent">
                    {e.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        {doctor.bio && (
          <div className="prose prose-sm md:prose-base max-w-none text-foreground/70 leading-relaxed mb-12 border-t border-border pt-8">
            <p>{doctor.bio}</p>
          </div>
        )}

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
            Agendar com {doctor.name.split(' ').slice(0, 2).join(' ')}
          </a>
          <Link href="/corpo-clinico" className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Ver todos os médicos
          </Link>
        </div>
      </div>
    </>
  );
}
