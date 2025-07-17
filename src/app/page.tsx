
// src/app/page.tsx
import HeroSection from '@/components/home/HeroSection';
import PatientJourney from '@/components/home/PatientJourney';
import AboutClinic from '@/components/home/AboutClinic';
import SpecialtiesGrid from '@/components/home/SpecialtiesGrid';
import ExamsSection from '@/components/home/ExamsSection';
import ConveniosCarousel from '@/components/home/ConveniosCarousel';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import ContactHome from '@/components/home/ContactHome';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PatientJourney />
      <AboutClinic />
      <SpecialtiesGrid />
      <ExamsSection />
      <ConveniosCarousel />
      <TestimonialsCarousel />
      <ContactHome />
    </>
  );
}
