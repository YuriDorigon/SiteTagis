// src/app/corpo-clinico/page.tsx
import type { Metadata } from 'next';
import DoctorsList from '@/components/doutores/DoctorsList';

export const metadata: Metadata = {
  title: 'Corpo Clínico | Tagis Medicina e Diagnóstico – São José SC',
  description: 'Conheça nossos médicos especialistas em São José, SC. Profissionais dedicados ao seu atendimento humanizado com tecnologia de ponta.',
};
import SectionTitle from '@/components/shared/SectionTitle';
import { getDoctors, getSpecialties, getExams } from '@/lib/server/firestoreData';

export const revalidate = 60;

export default async function CorpoClinicoPage() {
  const [doctors, specialties, exams] = await Promise.all([
    getDoctors(),
    getSpecialties(),
    getExams(),
  ]);

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
