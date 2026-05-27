"use client";

import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ClinicConfig } from '@/lib/types';

interface FAQSectionProps {
  cfg?: ClinicConfig;
  conveniosCount?: number;
}

export default function FAQSection({ cfg, conveniosCount }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null);

  const whatsapp = cfg?.whatsappDisplay ?? '(48) 99193-6045';
  const phone = cfg?.phone1 ?? '(48) 3035-3377';
  const hoursWeek = cfg?.hoursWeekdays ?? '07:30 – 18:00';
  const hoursSat = cfg?.hoursSaturday ?? '07:30 – 12:00';
  const numConvenios = conveniosCount && conveniosCount > 0 ? conveniosCount : 20;

  const faqs = [
    {
      q: 'Como faço para agendar uma consulta?',
      a: `Pelo WhatsApp ${whatsapp} ou telefone ${phone}. Atendemos de segunda a sexta das ${hoursWeek} e sábados das ${hoursSat}.`,
    },
    {
      q: 'Quais convênios a Tagis aceita?',
      a: `Trabalhamos com mais de ${numConvenios} convênios, incluindo os principais planos de saúde da região. Acesse a aba "Convênios" ou entre em contato para confirmar se o seu plano é aceito.`,
    },
    {
      q: 'Preciso de pedido médico para realizar exames?',
      a: 'Para a maioria dos exames laboratoriais e de imagem é necessário pedido médico. Consulte nossa equipe para verificar quais exames podem ser realizados sem encaminhamento.',
    },
    {
      q: 'Quanto tempo leva para os resultados ficarem prontos?',
      a: 'Os prazos variam conforme o tipo de exame: exames de imagem ficam prontos em 1 a 3 dias úteis; exames laboratoriais em 3 a 5 dias úteis. Você será informado no momento da solicitação.',
    },
    {
      q: 'Como posso acessar os resultados dos meus exames?',
      a: 'Exames de imagem ficam disponíveis online pelo portal de resultados (link na página de exames). Exames de sangue (Lab. Menino Deus) podem ser retirados na recepção ou pelo laboratório. Biópsias (IDAP) ficam disponíveis na recepção, por e-mail ou diretamente com o IDAP.',
    },
    {
      q: 'A clínica atende urgências ou apenas consultas agendadas?',
      a: 'O atendimento é preferencialmente por agendamento para garantir qualidade e agilidade. Para urgências, entre em contato pelo WhatsApp ou telefone para verificar disponibilidade imediata.',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#fafbfc]">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left */}
          <div className="lg:col-span-5 xl:col-span-4" data-aos="fade-right">
            <span className="text-accent text-[11px] font-medium tracking-[0.25em] uppercase mb-5 block">
              Dúvidas frequentes
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-primary leading-[1.05] mb-6">
              Perguntas{' '}
              <em className="italic font-normal text-accent">frequentes</em>
            </h2>
            <p className="text-foreground/55 text-base font-light leading-relaxed mb-8 max-w-sm">
              Respondemos as principais dúvidas dos nossos pacientes. Não encontrou o que procurava?
            </p>
            <a
              href="https://wa.me/5548991936045?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20a%20Tagis."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-primary text-sm font-medium hover:text-accent transition-colors duration-300"
            >
              <MessageCircle className="h-4 w-4 text-accent" />
              Fale conosco pelo WhatsApp
            </a>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-7 xl:col-span-8" data-aos="fade-left">
            <div className="divide-y divide-primary/8 border-y border-primary/8">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    className="w-full text-left flex items-center justify-between gap-6 py-6 group"
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    <span className={cn(
                      "font-medium text-base font-headline leading-snug transition-colors duration-300",
                      open === i ? "text-primary" : "text-primary/75 group-hover:text-primary"
                    )}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 flex-shrink-0 transition-all duration-300',
                        open === i ? 'rotate-180 text-accent' : 'text-primary/40'
                      )}
                    />
                  </button>

                  <div className={cn(
                    'overflow-hidden transition-all duration-500',
                    open === i ? 'max-h-60 pb-6' : 'max-h-0'
                  )}>
                    <p className="text-foreground/60 text-sm font-light leading-relaxed max-w-2xl">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
