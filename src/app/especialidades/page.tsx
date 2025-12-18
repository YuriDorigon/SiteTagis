// src/app/especialidades/page.tsx
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LucideIconRenderer from '@/components/shared/LucideIconRenderer';
import type { Specialty } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';

// Fetch data from the local JSON file
async function getSpecialtiesData(): Promise<Specialty[]> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'specialties.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading specialties.json:", error);
    return []; // Return empty array on error
  }
}

export default async function EspecialidadesPage() {
  const specialties = await getSpecialtiesData();

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <SectionTitle
        title="Nossas Especialidades"
        subtitle="Oferecemos uma ampla gama de especialidades médicas para cuidar de todas as suas necessidades de saúde."
      />
      {specialties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {specialties.map((specialty) => (
            <Card key={specialty.id} className="flex flex-col text-center items-center shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <CardHeader className="items-center">
                <div className="p-4 bg-accent/10 rounded-full mb-4">
                  <LucideIconRenderer name={specialty.iconName} className="h-12 w-12 text-accent" />
                </div>
                <CardTitle className="text-2xl font-semibold font-headline">{specialty.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-lg text-foreground/80">
                  {specialty.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-muted-foreground">Nenhuma especialidade encontrada. Por favor, tente novamente mais tarde.</p>
      )}
    </div>
  );
}
