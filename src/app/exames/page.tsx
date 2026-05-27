// src/app/exames/page.tsx
import type { Metadata } from 'next';
import SectionTitle from '@/components/shared/SectionTitle';

export const metadata: Metadata = {
  title: 'Exames Realizados | Tagis Medicina e Diagnóstico – São José SC',
  description: 'Mais de 50 tipos de exames laboratoriais, cardiológicos e de imagem em São José, SC. Resultados online. Agende pelo WhatsApp.',
};
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LucideIconRenderer from '@/components/shared/LucideIconRenderer';
import ExamResultsButton from '@/components/exames/ExamResultsButton';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { slugify } from '@/lib/utils/slug';
import { getExams } from '@/lib/server/firestoreData';

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tagismedicina.com.br';
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Exames', item: `${siteUrl}/exames` },
  ],
};

export default async function ExamesPage() {
  const exams = await getExams();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <SectionTitle
          title="Exames Realizados"
          subtitle="Conte com nossa estrutura moderna e tecnologia de ponta para diagnósticos precisos e confiáveis."
        />
        <div className="mb-12 text-center">
          <ExamResultsButton />
        </div>
        {exams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {exams.map((exam) => (
              <Link key={exam.id} href={`/exames/${slugify(exam.name)}`}>
              <Card className="flex flex-col text-center items-center shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 h-full">
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <LucideIconRenderer name={exam.iconName} className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-semibold font-headline">{exam.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col items-center">
                  <CardDescription className="text-lg text-foreground/80 mb-4">
                    {exam.description}
                  </CardDescription>
                  <a
                    href={`https://wa.me/5548991936045?text=${encodeURIComponent(`Olá! Gostaria de agendar o exame de ${exam.name}.`)}`}
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
          <p className="text-center text-lg text-muted-foreground">Nenhum exame encontrado. Por favor, tente novamente mais tarde.</p>
        )}
      </div>
    </>
  );
}
