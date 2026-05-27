// src/app/especialidades/page.tsx
import type { Metadata } from 'next';
import SectionTitle from '@/components/shared/SectionTitle';

export const metadata: Metadata = {
  title: 'Especialidades Médicas | Tagis Medicina e Diagnóstico – São José SC',
  description: 'Mais de 30 especialidades médicas em São José, SC: Cardiologia, Ortopedia, Ginecologia, Dermatologia e muito mais. Agende sua consulta pelo WhatsApp.',
};
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LucideIconRenderer from '@/components/shared/LucideIconRenderer';
import { ArrowRight } from 'lucide-react';
import { getSpecialties } from '@/lib/server/firestoreData';
import { slugify } from '@/lib/utils/slug';

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tagismd.com.br';

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Especialidades', item: `${siteUrl}/especialidades` },
  ],
};

export default async function EspecialidadesPage() {
  const specialties = await getSpecialties();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <SectionTitle
        title="Nossas Especialidades"
        subtitle="Oferecemos uma ampla gama de especialidades médicas para cuidar de todas as suas necessidades de saúde."
      />
      {specialties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {specialties.map((specialty) => (
            <Link key={specialty.id} href={`/especialidades/${slugify(specialty.name)}`}>
            <Card className="flex flex-col text-center items-center shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 h-full">
              <CardHeader className="items-center">
                <div className="p-4 bg-accent/10 rounded-full mb-4">
                  <LucideIconRenderer name={specialty.iconName} className="h-12 w-12 text-accent" />
                </div>
                <CardTitle className="text-2xl font-semibold font-headline">{specialty.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col items-center">
                <CardDescription className="text-lg text-foreground/80 mb-4">
                  {specialty.description}
                </CardDescription>
                <a
                  href={`https://wa.me/5548991936045?text=${encodeURIComponent(`Olá! Gostaria de agendar uma consulta de ${specialty.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent/70 transition-colors uppercase tracking-wider mt-auto"
                >
                  Agendar pelo WhatsApp <ArrowRight className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-muted-foreground">Nenhuma especialidade encontrada. Por favor, tente novamente mais tarde.</p>
      )}
    </div>
    </>
  );
}
