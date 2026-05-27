import { Calendar, ArrowRight } from 'lucide-react';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import Link from 'next/link';

export default function AppointmentCTA() {
  return (
    <section className="bg-primary py-20 lg:py-24 relative overflow-hidden">
      {/* Subtle decorative shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/[0.03] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-20 w-56 h-56 rounded-full bg-accent/10 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 lg:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

          <div data-aos="fade-right">
            <span className="text-accent text-[11px] font-medium tracking-[0.25em] uppercase mb-5 block">
              Agendamento
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-[1.05] mb-4">
              Cuide da sua saúde{' '}
              <em className="italic font-normal text-accent">hoje.</em>
            </h2>
            <p className="text-white/55 text-base font-light max-w-md leading-relaxed">
              Agende sua consulta pelo WhatsApp e seja atendido pelos melhores especialistas de São José, SC.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start lg:items-center gap-4" data-aos="fade-left">
            <WhatsAppButton
              phoneNumber="5548991936045"
              message="Olá! Gostaria de agendar uma consulta."
              className="inline-flex items-center gap-2.5 bg-white text-primary hover:bg-white/90 font-semibold py-4 px-8 rounded-full text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg"
            >
              <Calendar className="h-4 w-4" />
              Agendar pelo WhatsApp
            </WhatsAppButton>

            <Link
              href="/corpo-clinico"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium text-sm transition-colors duration-300 group"
            >
              Ver nossos médicos
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
