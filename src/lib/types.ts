// src/lib/types.ts

export interface Specialty {
  id: string; // Firestore document ID
  name: string;
  iconName: string;
  description: string;
}

export interface Exam {
  id: string; // Firestore document ID
  name: string;
  iconName: string;
  description: string;
  active?: boolean;
}

export interface Doctor {
  id: string; // Firestore document ID
  name: string;
  crm: string;
  imageUrl: string;
  bio: string;
  active?: boolean;
  /** 
   * Array de IDs de documentos da coleção 'specialties'.
   * Exemplo: ['id_ortopedia_geral', 'id_ortopedia_joelho']
   */
  specialtyIds?: string[];
  /** 
   * Array de IDs de documentos da coleção 'exams'.
   * Exemplo: ['id_ultrassom', 'id_ecocardiograma']
   */
  examIds?: string[];

  // Campos para renderização, não armazenados no DB
  specialtyNames?: string[];
  examNames?: string[];
}


export interface Convenio {
  id: string; // Firestore document ID
  name: string;
  logoUrl: string;
}

export interface PatientJourneyStep {
  id: string; 
  title: string;
  description: string;
  iconName: string;
  buttonText?: string;
  buttonLink?: string;
  buttonVariant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive" | null | undefined;
}

export const staticPatientJourneySteps: PatientJourneyStep[] = [
  { id: 'agendamento', title: 'Agendamento Rápido', description: 'Agende sua consulta ou exame de forma simples e rápida pelo WhatsApp.', iconName: 'MessageSquare', buttonText: 'Agendar via WhatsApp', buttonLink: `https://wa.me/5548991936045?text=${encodeURIComponent('Olá! Vim através do site e gostaria de agendar uma consulta.')}`, buttonVariant: 'default'},
  { id: 'consulta', title: 'Consulta com Especialista', description: 'Nossos especialistas estão prontos para te atender com dedicação e cuidado.', iconName: 'User', buttonText: 'Nosso Corpo Clínico', buttonLink: '/corpo-clinico', buttonVariant: 'outline' },
  { id: 'exames', title: 'Exames no Mesmo Lugar', description: 'Realize seus exames com comodidade e tecnologia de ponta em nossa clínica.', iconName: 'Microscope', buttonText: 'Ver Exames', buttonLink: '/exames', buttonVariant: 'outline' },
  { id: 'resultados', title: 'Retirada de Resultados', description: 'Acesse seus resultados de exames online ou retire presencialmente.', iconName: 'FileText', buttonText: 'Acessar Resultados', buttonLink: '#', buttonVariant: 'default' },
];

export interface Testimonial {
  id: string; // Firestore document ID
  quote: string;
  name: string;
}

export type TestimonialFormData = Omit<Testimonial, 'id'>;

export interface ClinicConfig {
  // Contato
  whatsapp: string;              // somente números: "5548991936045"
  whatsappDisplay: string;       // formatado: "(48) 99193-6045"
  phone1: string;                // "(48) 3035-3377"
  phone2: string;                // "(48) 3241-1122"
  email: string;                 // "contato@tagis.com.br"
  privacyEmail: string;          // "privacidade@tagismd.com.br"
  // Endereço
  addressStreet: string;         // "Av. Ver. Walter Borges, 157"
  addressCity: string;           // "Campinas, São José – SC"
  addressCep: string;            // "88101-030"
  googleMapsEmbed: string;       // URL do iframe embed
  googleMapsLink: string;        // URL para abrir no app Maps
  // Horários
  hoursWeekdays: string;         // "07:30 – 18:00"
  hoursSaturday: string;         // "07:30 – 12:00"
  hoursSunday: string;           // "Fechado"
  // Redes sociais
  instagram: string;
  facebook: string;
  // Informações legais
  cnpj: string;
  companyName: string;
  technicalResponsible: string;
  technicalResponsibleCrm: string;
  // Hero (página inicial)
  heroHeadline: string;
  heroSubtext: string;
  statSpecialties: string;
  statExams: string;
  statInsurance: string;
  // Google Reviews — setar no Firestore settings/clinic para ativar AggregateRating no schema
  googleRating?: number;       // ex: 4.8
  googleReviewCount?: number;  // ex: 180
}
