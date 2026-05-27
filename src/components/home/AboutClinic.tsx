// src/components/home/AboutClinic.tsx
import Image from 'next/image';
import { PhoneCall, MapPin, Clock } from 'lucide-react';

const highlights = [
  { icon: PhoneCall, title: "Telefone", text: "(48) 3035-3377" },
  { icon: MapPin, title: "Localização", text: "São José, SC" },
  { icon: Clock, title: "Atendimento", text: "Seg - Sex" },
];

export default function AboutClinic() {
  return (
    <section id="sobre" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Image Container with Modern Frame */}
          <div 
            className="w-full lg:w-1/2 relative group"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[2.5rem] blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src="/sobre.avif"
                alt="Interior da Clinica Tagis"
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Glass Overlay Detail */}
              <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-2xl hidden md:block translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-primary font-bold text-lg mb-1">Qualidade e Conforto</p>
                <p className="text-foreground/70 text-sm">Ambiente planejado para o melhor atendimento.</p>
              </div>
            </div>
          </div>

          <div 
            className="w-full lg:w-1/2"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-6 text-sm font-bold tracking-widest uppercase">
              Sobre a Clínica
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary !leading-tight">
              Excelência Médica e <br />
              <span className="text-gradient">Cuidado Humanizado</span>
            </h2>
            
            <div className="space-y-6 text-lg text-foreground/70 leading-relaxed font-medium mb-12">
              <p>
                A <strong>Clinica Tagis</strong> nasceu com o propósito de oferecer saúde de qualidade em um ambiente acolhedor e moderno. Unimos tecnologia de ponta a um atendimento próximo e atencioso.
              </p>
              <p>
                Localizada estrategicamente em São José, SC, nossa estrutura foi projetada para garantir segurança e conforto em todas as etapas do seu cuidado, desde a recepção até o diagnóstico final.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2 p-4 rounded-2xl bg-secondary/5 border border-secondary/10 hover:bg-secondary/10 transition-colors duration-300">
                  <item.icon className="h-6 w-6 text-secondary mb-2" />
                  <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">{item.title}</span>
                  <span className="text-sm font-bold text-primary">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
