import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

const highlights = [
  'Atendimento personalizado para cada paciente',
  'Equipamentos diagnósticos de última geração',
  'Ambiente seguro, acolhedor e confortável',
  'Equipe multidisciplinar qualificada',
];

export default function AboutClinic() {
  return (
    <section id="sobre" className="py-24 lg:py-32 bg-[#fafbfc]">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">

          {/* Image side */}
          <div className="lg:col-span-5 relative" data-aos="fade-right" data-aos-duration="1000">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,59,79,0.15)]">
              <Image
                src="/sobre.avif"
                alt="Interior da Clínica Tagis"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Floating stat */}
            <div className="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-lg p-5 max-w-[160px]">
              <div className="font-display text-4xl text-primary font-light leading-none mb-1">+10</div>
              <div className="text-[10px] text-foreground/45 font-medium tracking-widest uppercase leading-tight">
                Anos de<br />Excelência
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="lg:col-span-7" data-aos="fade-left" data-aos-duration="1000">
            <span className="text-accent text-[11px] font-medium tracking-[0.25em] uppercase mb-5 block">
              Sobre a Clínica
            </span>

            <h2 className="font-display text-4xl md:text-5xl font-light text-primary leading-[1.05] mb-6">
              Excelência médica<br />
              e cuidado{' '}
              <em className="italic font-normal text-accent">humanizado.</em>
            </h2>

            <div className="space-y-4 text-foreground/60 text-base font-light leading-relaxed mb-10 max-w-xl">
              <p>
                A <strong className="text-primary font-medium">Clínica Tagis</strong> nasceu com o propósito de oferecer saúde de qualidade em um ambiente acolhedor e moderno. Unimos tecnologia de ponta a um atendimento próximo e atencioso.
              </p>
              <p>
                Localizada em São José, SC, nossa estrutura foi projetada para garantir segurança e conforto em todas as etapas do seu cuidado — da recepção ao diagnóstico final.
              </p>
            </div>

            <ul className="space-y-3 mb-10">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground/65 text-sm font-light">
                  <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <WhatsAppButton
              phoneNumber="5548991936045"
              message="Olá! Gostaria de saber mais sobre a Tagis."
              className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-medium py-4 px-8 rounded-full text-sm transition-all duration-300 hover:scale-[1.02]"
            >
              Falar com a Tagis
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
