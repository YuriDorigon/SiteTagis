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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://site-tagis.vercel.app';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: 'Tagis Medicina e Diagnóstico',
  url: siteUrl,
  logo: `${siteUrl}/favicon.png`,
  image: `${siteUrl}/og-image.png`,
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

  const whatsapp = cfg.whatsappDisplay ?? '(48) 99193-6045';
  const phone = cfg.phone1 ?? '(48) 3035-3377';
  const hoursWeek = cfg.hoursWeekdays ?? '07:30 – 18:00';
  const hoursSat = cfg.hoursSaturday ?? '07:30 – 12:00';
  const numConvenios = convenios.length > 0 ? convenios.length : 20;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Como faço para agendar uma consulta?', acceptedAnswer: { '@type': 'Answer', text: `Pelo WhatsApp ${whatsapp} ou telefone ${phone}. Atendemos de segunda a sexta das ${hoursWeek} e sábados das ${hoursSat}.` } },
      { '@type': 'Question', name: 'Quais convênios a Tagis aceita?', acceptedAnswer: { '@type': 'Answer', text: `Trabalhamos com mais de ${numConvenios} convênios, incluindo os principais planos de saúde da região.` } },
      { '@type': 'Question', name: 'Preciso de pedido médico para realizar exames?', acceptedAnswer: { '@type': 'Answer', text: 'Para a maioria dos exames laboratoriais e de imagem é necessário pedido médico. Consulte nossa equipe para verificar quais exames podem ser realizados sem encaminhamento.' } },
      { '@type': 'Question', name: 'Quanto tempo leva para os resultados ficarem prontos?', acceptedAnswer: { '@type': 'Answer', text: 'Exames de imagem ficam prontos em 1 a 3 dias úteis; exames laboratoriais em 3 a 5 dias úteis.' } },
      { '@type': 'Question', name: 'Como posso acessar os resultados dos meus exames?', acceptedAnswer: { '@type': 'Answer', text: 'Exames de imagem ficam disponíveis online pelo portal de resultados. Exames de sangue (Lab. Menino Deus) podem ser retirados na recepção ou pelo laboratório.' } },
      { '@type': 'Question', name: 'A clínica atende urgências ou apenas consultas agendadas?', acceptedAnswer: { '@type': 'Answer', text: 'O atendimento é preferencialmente por agendamento. Para urgências, entre em contato pelo WhatsApp ou telefone para verificar disponibilidade imediata.' } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
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
