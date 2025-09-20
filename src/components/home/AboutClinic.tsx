
// src/components/home/AboutClinic.tsx
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import SectionTitle from '@/components/shared/SectionTitle';

const highlights = [
  "Localizada em Campinas, São José (SC)",
  "Mais de 10 mil pacientes atendidos com excelência",
  "Atendimento completo para você e sua família",
  "Estrutura moderna com diversas especialidades e exames no mesmo lugar"
];

export default function AboutClinic() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-[450px] rounded-lg overflow-hidden shadow-lg group">
            <Image
              src="/sobre.avif"
              alt="Interior da Clinica Tagis"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint="clinic interior"
            />
          </div>
          <div>
            <SectionTitle
              title="Sobre a Clinica Tagis"
              subtitle="Cuidando da sua saúde com dedicação e tecnologia."
              className="text-left mb-8"
              titleClassName="text-3xl md:text-4xl"
              subtitleClassName="max-w-full text-left mx-0"
            />
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
              Na Clinica Tagis, nossa missão é oferecer um atendimento médico de alta qualidade,
              combinando experiência profissional, tecnologia avançada e um cuidado humanizado.
              Acreditamos que a saúde é o bem mais precioso e, por isso, nos dedicamos
              a proporcionar a melhor experiência para nossos pacientes.
            </p>
            <ul className="space-y-3">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-center text-lg text-foreground">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
