// src/app/page.tsx
import HeroSection from '@/components/home/HeroSection';
import QuickAccessCards from '@/components/home/QuickAccessCards';
import PatientJourney from '@/components/home/PatientJourney';
import AboutClinic from '@/components/home/AboutClinic';
import SpecialtiesGrid from '@/components/home/SpecialtiesGrid';
import ExamsSection from '@/components/home/ExamsSection';
import AppointmentCTA from '@/components/home/AppointmentCTA';
import ConveniosCarousel from '@/components/home/ConveniosCarousel';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import FAQSection from '@/components/home/FAQSection';
import ContactHome from '@/components/home/ContactHome';
import { getSpecialties, getExams, getConvenios, getTestimonials, getClinicConfig } from '@/lib/server/firestoreData';

export const revalidate = 60;

async function getData() {
  const [specialties, exams, convenios, testimonials, cfg] = await Promise.all([
    getSpecialties(),
    getExams(),
    getConvenios(),
    getTestimonials(),
    getClinicConfig(),
  ]);
  return {
    specialties: specialties.slice(0, 4),
    exams: exams.slice(0, 3),
    convenios: convenios.slice(0, 10),
    testimonials,
    cfg,
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: 'Tagis Medicina e Diagnóstico',
  url: 'https://www.tagismd.com.br',
  logo: 'https://www.tagismd.com.br/favicon.png',
  image: 'https://www.tagismd.com.br/og-image.png',
  description: 'Clínica médica com mais de 30 especialidades, 50 tipos de exames e 20 convênios em São José, SC.',
  telephone: '+554830353377',
  email: 'contato@tagis.com.br',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Ver. Walter Borges, 157',
    addressLocality: 'São José',
    addressRegion: 'SC',
    postalCode: '88101-030',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -27.5969,
    longitude: -48.6277,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:30', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '07:30', closes: '12:00' },
  ],
  priceRange: '$$',
  medicalSpecialty: ['Cardiology','Orthopedics','Gynecology','Dermatology','Ophthalmology'],
};

export default async function HomePage() {
  const { specialties, exams, convenios, testimonials, cfg } = await getData();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroSection cfg={cfg} />
      <QuickAccessCards />
      <PatientJourney />
      <AboutClinic />
      <SpecialtiesGrid initialSpecialties={specialties} />
      <ExamsSection initialExams={exams} />
      <AppointmentCTA />
      <ConveniosCarousel initialConvenios={convenios} />
      <TestimonialsCarousel initialTestimonials={testimonials} />
      <FAQSection cfg={cfg} conveniosCount={convenios.length} />
      <ContactHome />
    </>
  );
}
