// src/app/convenios/page.tsx
import type { Metadata } from 'next';
import ConveniosList from '@/components/convenios/ConveniosList';

export const metadata: Metadata = {
  title: 'Convênios Atendidos | Tagis Medicina e Diagnóstico – São José SC',
  description: 'Confira os convênios e planos de saúde aceitos na Tagis: Unimed, Plano de Saúde SC e mais de 20 convênios. Consulte disponibilidade pelo WhatsApp.',
};
import SectionTitle from '@/components/shared/SectionTitle';
import { getConvenios, getClinicConfig } from '@/lib/server/firestoreData';

export const revalidate = 60;

export default async function ConveniosPage() {
  const [convenios, cfg] = await Promise.all([getConvenios(), getClinicConfig()]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <SectionTitle
        title="Convênios Atendidos"
        subtitle="Confira a lista de convênios que aceitamos em nossa clínica. Estamos sempre buscando expandir nossa rede para melhor atendê-lo."
      />

      <ConveniosList conveniosData={convenios} />

      <div className="mt-12 p-8 bg-[#f0f4f5] border border-primary/10 rounded-2xl">
        <h3 className="text-lg font-semibold text-primary mb-2 font-headline">Não encontrou seu convênio?</h3>
        <p className="text-foreground/60 text-sm mb-5 font-light">
          Entre em contato conosco para verificar a possibilidade de atendimento ou para mais informações sobre cobertura.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href={`https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent('Olá! Vim através do site e gostaria de informações sobre convênios.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white font-medium py-3 px-6 rounded-full text-sm hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02]"
          >
            WhatsApp: {cfg.whatsappDisplay}
          </a>
          <a
            href={`tel:${cfg.phone1.replace(/\D/g, '')}`}
            className="inline-flex items-center gap-2 border border-primary/20 text-primary font-medium py-3 px-6 rounded-full text-sm hover:bg-primary/5 transition-all duration-300"
          >
            Telefone: {cfg.phone1}
          </a>
        </div>
      </div>
    </div>
  );
}
