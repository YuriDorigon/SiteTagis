// src/app/exames/page.tsx
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LucideIconRenderer from '@/components/shared/LucideIconRenderer';
import ExamResultsButton from '@/components/exames/ExamResultsButton';
import type { Exam } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';


// Fetch data from the local JSON file
async function getExamsData(): Promise<Exam[]> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'exams.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading exams.json:", error);
    return []; // Return empty array on error
  }
}

export default async function ExamesPage() {
  const exams = await getExamsData();

  return (
    <>
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
              <Card key={exam.id} className="flex flex-col text-center items-center shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <LucideIconRenderer name={exam.iconName} className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-semibold font-headline">{exam.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-lg text-foreground/80">
                    {exam.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
           <p className="text-center text-lg text-muted-foreground">Nenhum exame encontrado. Por favor, tente novamente mais tarde.</p>
        )}
      </div>
    </>
  );
}
