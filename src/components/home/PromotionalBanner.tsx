import { Clock, Phone, MessageSquare, MapPin } from 'lucide-react';
import Link from 'next/link';

const items = [
  {
    icon: Clock,
    label: 'Horário',
    line1: 'Seg – Sex: 07:30 – 18:00',
    line2: 'Sábado: 07:30 – 12:00',
  },
  {
    icon: Phone,
    label: 'Telefone',
    line1: '(48) 3035-3377',
    line2: '(48) 3241-1122',
    href: 'tel:+554830353377',
  },
  {
    icon: MessageSquare,
    label: 'WhatsApp',
    line1: '(48) 99193-6045',
    line2: 'Resposta em minutos',
    href: 'https://wa.me/5548991936045',
    external: true,
  },
  {
    icon: MapPin,
    label: 'Localização',
    line1: 'Av. Ver. Walter Borges, 157',
    line2: 'São José – SC',
    href: '/contato',
  },
];

export default function PromotionalBanner() {
  return (
    <section className="bg-white border-y border-primary/8">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-primary/8">
          {items.map((item, i) => {
            const Content = (
              <div className="flex items-center gap-4 py-6 px-4 lg:px-6 group transition-colors duration-300 hover:bg-[#fafbfc]">
                <div className="p-2.5 rounded-xl bg-accent/8 group-hover:bg-accent/15 transition-colors duration-300 flex-shrink-0">
                  <item.icon className="h-4 w-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-widest text-foreground/35 uppercase mb-1">
                    {item.label}
                  </p>
                  <p className="text-primary text-sm font-medium truncate">{item.line1}</p>
                  <p className="text-foreground/45 text-xs truncate">{item.line2}</p>
                </div>
              </div>
            );

            return item.href ? (
              <Link
                key={i}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="block"
              >
                {Content}
              </Link>
            ) : (
              <div key={i}>{Content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
