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
      className="fixed bottom-0 left-0 right-0 bg-primary/95 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50 border-t border-white/10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <ShieldCheck className="h-4 w-4 text-white/70 flex-shrink-0" />
          <p className="text-xs text-white/80 leading-snug">
            Usamos cookies.{' '}
            <a href="/lgpd.pdf" target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline underline-offset-2">
              Política de privacidade
            </a>
            <span className="hidden sm:inline">
              {' '}— dúvidas:{' '}
              <a href={`mailto:${privacyEmail}`} className="font-semibold text-white underline underline-offset-2">
                {privacyEmail}
              </a>
            </span>
          </p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button
            onClick={handleAccept}
            size="sm"
            className="h-7 px-3 text-xs bg-white text-primary hover:bg-white/90 font-bold border-none"
          >
            Aceitar
          </Button>
          <Button onClick={handleAccept} size="icon" variant="ghost" className="h-7 w-7">
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
