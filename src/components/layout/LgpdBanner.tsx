// src/components/layout/LgpdBanner.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, X } from 'lucide-react';

const LGPD_COOKIE_KEY = 'lgpd_accepted';

export default function LgpdBanner() {
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
    <div className="fixed bottom-0 left-0 right-0 w-full bg-secondary text-secondary-foreground p-4 shadow-lg z-50 border-t border-border">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
            <ShieldCheck className="h-8 w-8 text-primary mr-3 flex-shrink-0" />
            <p className="flex-grow text-sm text-foreground/80">
            Requisições relacionadas à Lei Geral de Proteção de Dados (LGPD)? Entre em contato com o Encarregado de Dados da Tagis Medicina & Diagnóstico pelo e-mail: <a href="mailto:privacidade@tagismd.com.br" className="font-medium text-primary hover:underline">privacidade@tagismd.com.br</a> - veja nossa política ao{' '}
            <a href="/lgpd.pdf" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                clicar aqui!
            </a>
            </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
            <Button onClick={handleAccept} size="sm">
                Estou ciente e aceito!
            </Button>
            <Button onClick={handleAccept} size="icon" variant="ghost">
                <X className="h-5 w-5" />
                <span className="sr-only">Fechar aviso de LGPD</span>
            </Button>
        </div>
      </div>
    </div>
  );
}
