import Link from 'next/link';
import { MessageSquare, Stethoscope, CreditCard, ArrowRight, FileText } from 'lucide-react';
import { getClinicConfig } from '@/lib/server/firestoreData';

export default async function QuickAccessCards() {
  const cfg = await getClinicConfig();

  const cards = [
    {
      icon: MessageSquare,
      tag: 'WhatsApp',
      title: 'Agendar consulta',
      description: 'Fale com a nossa equipe agora e garanta seu horário de forma rápida e simples.',
      cta: 'Agendar agora',
      href: `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de agendar uma consulta.')}`,
      external: true,
      featured: true,
    },
    {
      icon: Stethoscope,
      tag: 'Especialidades',
      title: 'Mais de 30 especialidades',
      description: 'Cardiologia, Dermatologia, Ortopedia e muito mais. Conheça todo o nosso corpo clínico.',
      cta: 'Ver especialidades',
      href: '/especialidades',
      external: false,
      featured: false,
    },
    {
      icon: CreditCard,
      tag: 'Convênios',
      title: 'Seu plano é aceito aqui',
      description: 'Trabalhamos com os principais planos de saúde. Consulte a lista completa.',
      cta: 'Ver convênios',
      href: '/convenios',
      external: false,
      featured: false,
    },
    {
      icon: FileText,
      tag: 'Resultados',
      title: 'Acesse seus exames',
      description: 'Resultados de exames laboratoriais e cardiológicos disponíveis online.',
      cta: 'Acessar resultados',
      href: '/exames',
      external: false,
      featured: false,
    },
  ];

  return (
    <section className="bg-[#f8fafb] border-b border-primary/8">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-primary/8">
          {cards.map((card, i) => {
            const Wrapper = ({ children }: { children: React.ReactNode }) =>
              card.external ? (
                <a href={card.href} target="_blank" rel="noopener noreferrer" className="block group">
                  {children}
                </a>
              ) : (
                <Link href={card.href} className="block group">
                  {children}
                </Link>
              );

            return (
              <Wrapper key={i}>
                <div
                  className={`relative h-full p-7 lg:p-8 transition-all duration-300 ${
                    card.featured
                      ? 'bg-primary text-white'
                      : 'bg-white hover:bg-[#fafbfc]'
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={60 * i}
                >
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase mb-5 ${
                      card.featured
                        ? 'bg-white/15 text-white/80'
                        : 'bg-accent/10 text-accent'
                    }`}
                  >
                    {card.tag}
                  </div>

                  <card.icon
                    className={`h-7 w-7 mb-4 transition-transform duration-300 group-hover:scale-110 ${
                      card.featured ? 'text-white/80' : 'text-primary/50 group-hover:text-accent'
                    }`}
                  />

                  <h3
                    className={`text-base font-semibold font-headline mb-2 leading-snug ${
                      card.featured ? 'text-white' : 'text-primary'
                    }`}
                  >
                    {card.title}
                  </h3>

                  <p
                    className={`text-xs font-light leading-relaxed mb-6 ${
                      card.featured ? 'text-white/65' : 'text-foreground/50'
                    }`}
                  >
                    {card.description}
                  </p>

                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 group-hover:gap-2.5 ${
                      card.featured ? 'text-white/90' : 'text-accent'
                    }`}
                  >
                    {card.cta} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
