// src/app/corpo-clinico/page.tsx
import DoctorsList from '@/components/doutores/DoctorsList';
import SectionTitle from '@/components/shared/SectionTitle';
import type { Doctor, Specialty, Exam } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';

async function getCorpoClinicoData() {
  try {
    const dataDir = path.join(process.cwd(), 'src', 'lib', 'data');
    const [doctorsData, specialtiesData, examsData] = await Promise.all([
      fs.readFile(path.join(dataDir, 'doctors.json'), 'utf8'),
      fs.readFile(path.join(dataDir, 'specialties.json'), 'utf8'),
      fs.readFile(path.join(dataDir, 'exams.json'), 'utf8'),
    ]);
    
    const doctors: Doctor[] = JSON.parse(doctorsData);
    const specialties: Specialty[] = JSON.parse(specialtiesData);
    const exams: Exam[] = JSON.parse(examsData);

    return { doctors, specialties, exams };
  } catch (error) {
    console.error("Error reading pre-build data for doctors page:", error);
    return { doctors: [], specialties: [], exams: [] };
  }
}


export default async function CorpoClinicoPage() {
  const { doctors, specialties, exams } = await getCorpoClinicoData();

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <SectionTitle
        title="Corpo Clínico"
        subtitle="Conheça nossos profissionais especialistas, dedicados a oferecer o melhor atendimento para sua saúde."
      />
      {doctors.length === 0 && specialties.length === 0 && exams.length === 0 ? (
         <div className="flex justify-center items-center h-40">
          <p className="text-center text-lg text-muted-foreground">Não foi possível carregar os dados do corpo clínico. Tente novamente mais tarde.</p>
        </div>
      ) : (
        <DoctorsList 
          initialDoctors={doctors} 
          initialSpecialties={specialties}
          initialExams={exams}
        />
      )}
    </div>
  );
}
