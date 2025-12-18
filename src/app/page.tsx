// src/app/page.tsx
import HeroSection from '@/components/home/HeroSection';
import PromotionalBanner from '@/components/home/PromotionalBanner';
import PatientJourney from '@/components/home/PatientJourney';
import AboutClinic from '@/components/home/AboutClinic';
import SpecialtiesGrid from '@/components/home/SpecialtiesGrid';
import ExamsSection from '@/components/home/ExamsSection';
import ConveniosCarousel from '@/components/home/ConveniosCarousel';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import ContactHome from '@/components/home/ContactHome';

import type { Specialty, Exam, Convenio, Testimonial } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';

// A busca de dados agora lê os ficheiros JSON gerados no pre-build
async function getData() {
  try {
    const dataDir = path.join(process.cwd(), 'src', 'lib', 'data');
    
    const [specialtiesData, examsData, conveniosData, testimonialsData] = await Promise.all([
      fs.readFile(path.join(dataDir, 'specialties.json'), 'utf8'),
      fs.readFile(path.join(dataDir, 'exams.json'), 'utf8'),
      fs.readFile(path.join(dataDir, 'convenios.json'), 'utf8'),
      fs.readFile(path.join(dataDir, 'testimonials.json'), 'utf8'),
    ]);

    const specialties: Specialty[] = JSON.parse(specialtiesData);
    const exams: Exam[] = JSON.parse(examsData);
    const convenios: Convenio[] = JSON.parse(conveniosData);
    const testimonials: Testimonial[] = JSON.parse(testimonialsData);

    // Retorna apenas os primeiros itens para a homepage, como antes
    return { 
      specialties: specialties.slice(0, 3), 
      exams: exams.slice(0, 3), 
      convenios: convenios.slice(0, 10), 
      testimonials, 
    };
  } catch (error) {
    console.error("Error reading pre-build data for homepage:", error);
    // Em caso de erro, retorne arrays vazios para não quebrar a página
    return { specialties: [], exams: [], convenios: [], testimonials: [] };
  }
}


export default async function HomePage() {
  const { specialties, exams, convenios, testimonials } = await getData();

  return (
    <>
      <HeroSection />
      <PromotionalBanner />
      <PatientJourney />
      <AboutClinic />
      <SpecialtiesGrid initialSpecialties={specialties} />
      <ExamsSection initialExams={exams} />
      <ConveniosCarousel initialConvenios={convenios} />
      <TestimonialsCarousel initialTestimonials={testimonials} />
      <ContactHome />
    </>
  );
}
