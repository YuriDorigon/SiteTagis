'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { LogOut, Clock } from 'lucide-react';

const INACTIVITY_TIMEOUT = 60 * 60 * 1000;  // 60 min sem atividade → aviso
const WARNING_DURATION   = 2  * 60 * 1000;  // 2 min de aviso → desconecta

const EVENTS = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

export function InactivityGuard({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(120); // segundos

  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimer  = useRef<ReturnType<typeof setInterval> | null>(null);

  const doSignOut = useCallback(async () => {
    clearAll();
    await signOut(auth);
    router.replace('/adm/login');
  }, [auth, router]);

  const clearAll = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (warningTimer.current)    clearTimeout(warningTimer.current);
    if (countdownTimer.current)  clearInterval(countdownTimer.current);
  };

  const startWarning = useCallback(() => {
    setShowWarning(true);
    setCountdown(WARNING_DURATION / 1000);

    countdownTimer.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimer.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    warningTimer.current = setTimeout(() => {
      doSignOut();
    }, WARNING_DURATION);
  }, [doSignOut]);

  const resetTimer = useCallback(() => {
    if (showWarning) return; // não reseta durante o aviso
    clearAll();
    inactivityTimer.current = setTimeout(startWarning, INACTIVITY_TIMEOUT);
  }, [showWarning, startWarning]);

  const stayConnected = () => {
    clearAll();
    setShowWarning(false);
    setCountdown(WARNING_DURATION / 1000);
    inactivityTimer.current = setTimeout(startWarning, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    inactivityTimer.current = setTimeout(startWarning, INACTIVITY_TIMEOUT);
    EVENTS.forEach(e => window.addEventListener(e, resetTimer, { passive: true }));
    return () => {
      clearAll();
      EVENTS.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [resetTimer, startWarning]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <>
      {children}

      {showWarning && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-primary/10 p-8 max-w-sm w-full mx-4 text-center">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <Clock className="h-7 w-7 text-amber-500" />
            </div>

            <h2 className="text-lg font-semibold text-primary font-headline mb-2">
              Sessão prestes a expirar
            </h2>
            <p className="text-sm text-foreground/55 font-light mb-6">
              Nenhuma atividade detectada. Você será desconectado automaticamente em:
            </p>

            <div className="text-4xl font-semibold text-primary font-headline mb-8 tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={stayConnected}
                className="w-full bg-primary text-white font-medium py-3 rounded-xl text-sm hover:bg-primary/90 transition-all"
              >
                Continuar conectado
              </button>
              <button
                onClick={doSignOut}
                className="w-full inline-flex items-center justify-center gap-2 border border-primary/15 text-foreground/50 font-medium py-3 rounded-xl text-sm hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
              >
                <LogOut className="h-4 w-4" />
                Sair agora
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
