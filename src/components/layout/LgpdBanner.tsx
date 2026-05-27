// src/components/layout/LgpdBanner.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

const LGPD_CONSENT_KEY = 'tagisClinicLgpdConsentAccepted';

export default function LgpdBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consentAccepted = localStorage.getItem(LGPD_CONSENT_KEY);
      if (consentAccepted !== 'true') {
        setIsVisible(true);
      }
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LGPD_CONSENT_KEY, 'true');
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-primary/95 backdrop-blur-sm text-white shadow-[0_-4px_24px_rgba(0,0,0,0.15)] z-50 border-t border-white/10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-4">
        <div className="flex items-start gap-3 min-w-0">
          <ShieldCheck className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white mb-0.5">LGPD — Sua Privacidade</p>
            <p className="text-xs text-white/75 leading-relaxed">
              Requisições relacionadas à LGPD? Fale com o Encarregado de Dados pelo e-mail{' '}
              <a href="mailto:privacidade@tagismd.com.br" className="text-accent hover:text-accent/80 underline underline-offset-2 font-medium">
                privacidade@tagismd.com.br
              </a>
              {' '}— veja nossa{' '}
              <Link href="/politica-de-privacidade" className="text-accent hover:text-accent/80 underline underline-offset-2 font-medium" onClick={() => setIsVisible(false)}>
                política de privacidade
              </Link>
              .
            </p>
          </div>
        </div>
        <Button
          onClick={handleAccept}
          size="sm"
          className="flex-shrink-0 bg-white text-primary hover:bg-white/90 font-semibold px-5 w-full sm:w-auto"
        >
          Estou ciente e aceito
        </Button>
      </div>
    </div>
  );
}
