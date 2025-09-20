// src/app/page.tsx
"use client";

import HeroSection from '@/components/home/HeroSection';
import PromotionalBanner from '@/components/home/PromotionalBanner';
import PatientJourney from '@/components/home/PatientJourney';
import AboutClinic from '@/components/home/AboutClinic';
import SpecialtiesGrid from '@/components/home/SpecialtiesGrid';
import ExamsSection from '@/components/home/ExamsSection';
import ConveniosCarousel from '@/components/home/ConveniosCarousel';
import ContactHome from '@/components/home/ContactHome';
import dynamic from 'next/dynamic';

// A importação dinâmica foi simplificada para a sintaxe mais comum e estável,
// garantindo que funcione corretamente com a exportação estática (next export).
const TestimonialsCarousel = dynamic(
  () => import('@/components/home/TestimonialsCarousel'),
  { 
    loading: () => <div className="py-16 md:py-24 bg-background min-h-[300px]" />,
    ssr: false 
  }
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PromotionalBanner />
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
