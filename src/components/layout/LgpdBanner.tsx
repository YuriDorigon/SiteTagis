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
    // Check localStorage only on the client side
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
    <div className="fixed bottom-0 left-0 right-0 w-full bg-secondary text-secondary-foreground p-4 shadow-lg z-50 border-t border-border">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-grow text-sm md:text-base">
          <div className="flex items-center mb-2">
            <ShieldCheck className="h-6 w-6 mr-2 text-primary" />
            <h3 className="text-lg font-semibold font-headline text-primary">LGPD - Sua Privacidade</h3>
          </div>
          <p className="text-foreground/80">
            Requisições relacionadas à Lei Geral de Proteção de Dados (LGPD)? Entre em contato com o Encarregado de Dados da Tagis Medicina & Diagnóstico pelo e-mail: <a href="mailto:privacidade@tagismd.com.br" className="font-medium text-primary hover:underline">privacidade@tagismd.com.br</a> - veja nossa política ao{' '}
            <Link href="/politica-de-privacidade" className="font-medium text-primary hover:underline" onClick={() => setIsVisible(false)}>
              clicar aqui!
            </Link>
          </p>
        </div>
        <Button onClick={handleAccept} size="lg" className="w-full md:w-auto flex-shrink-0">
          Estou ciente e aceito!
        </Button>
      </div>
    </div>
  );
}
