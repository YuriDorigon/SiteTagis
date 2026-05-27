import Link from 'next/link';
import { Clock, Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import AppLogo from '@/components/shared/AppLogo';
import type { ClinicConfig } from '@/lib/types';

export default function Footer({ cfg }: { cfg: ClinicConfig }) {
  return (
    <footer className="bg-primary text-white py-24 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-8 group" aria-label="Home">
              <AppLogo className="h-12 w-auto transition-transform group-hover:scale-105" />
              <div className="flex flex-col items-start border-l border-white/20 pl-4">
                <span className="font-bold text-2xl tracking-tight font-headline">TAGIS</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase leading-none">Medicina e Diagnóstico</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Comprometidos com a excelência em medicina diagnóstica e atendimento humanizado. Sua saúde é nossa maior prioridade.
            </p>
            <div className="flex space-x-4">
              <Link href={cfg.facebook} target="_blank" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href={cfg.instagram} target="_blank" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-8 font-headline text-white uppercase tracking-widest">Acesso Rápido</h3>
            <ul className="space-y-4">
              <li><Link href="/especialidades" className="text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block font-medium">Especialidades</Link></li>
              <li><Link href="/exames" className="text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block font-medium">Exames</Link></li>
              <li><Link href="/convenios" className="text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block font-medium">Convênios</Link></li>
              <li><Link href="/corpo-clinico" className="text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block font-medium">Corpo Clínico</Link></li>
              <li><Link href="/contato" className="text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block font-medium">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-8 font-headline text-white uppercase tracking-widest">Contato</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-white/5 text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-white/60 text-sm font-medium">{cfg.addressStreet}<br />{cfg.addressCity}</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-white/5 text-white">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-white/60 text-sm font-medium">{cfg.phone1}</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-white/5 text-white flex-shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="text-white/60 text-sm font-medium">
                  <p>Seg–Sex: 7h30–18h00</p>
                  <p>Sábado: 7h30–12h00</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-8 font-headline text-white uppercase tracking-widest">Informações</h3>
            <div className="space-y-4 text-sm text-white/50 font-medium">
              <p>CNPJ: {cfg.cnpj}</p>
              <p>{cfg.companyName}</p>
              <p className="pt-4 border-t border-white/5">Resp. Técnico:<br /><span className="text-white/70">{cfg.technicalResponsible}<br />CRM/SC {cfg.technicalResponsibleCrm}</span></p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Clinica Tagis. Todos os direitos reservados.
          </p>
          <div className="flex gap-8">
            <Link href="/privacidade" className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Termos</Link>
            <Link href="/privacidade" className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
