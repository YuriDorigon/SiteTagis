// src/components/layout/LgpdBanner.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, X } from 'lucide-react';

const LGPD_COOKIE_KEY = 'lgpd_accepted';

export default function LgpdBanner({ privacyEmail = 'privacidade@tagismd.com.br' }: { privacyEmail?: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica no localStorage se o usuário já aceitou os termos.
    const accepted = localStorage.getItem(LGPD_COOKIE_KEY);
    if (accepted !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Salva a aceitação no localStorage e esconde o banner.
    localStorage.setItem(LGPD_COOKIE_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 w-full bg-primary/95 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50 border-t border-white/10 backdrop-blur-md overflow-hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4">
        <div className="flex items-start min-w-0 w-full">
          <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8 text-white/80 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-white/80 min-w-0">
            Requisições relacionadas à Lei Geral de Proteção de Dados (LGPD)? Entre em contato com o Encarregado de Dados da Tagis pelo e-mail:{' '}
            <a href={`mailto:${privacyEmail}`} className="font-bold text-white hover:underline break-all">
              {privacyEmail}
            </a>{' '}
            — veja nossa{' '}
            <a href="/lgpd.pdf" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline">
              política de privacidade
            </a>
            .
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end sm:justify-start">
          <Button onClick={handleAccept} size="sm" className="bg-white text-primary hover:bg-white/90 font-bold border-none shadow-sm transition-all flex-1 sm:flex-none">
            Estou ciente e aceito!
          </Button>
          <Button onClick={handleAccept} size="icon" variant="ghost" className="flex-shrink-0">
            <X className="h-5 w-5" />
            <span className="sr-only">Fechar aviso de LGPD</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
