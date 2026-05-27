'use client';

import { useState, useEffect } from 'react';
import { initializeFirebase } from '@/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, Auth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { auth } = initializeFirebase();
    setAuth(auth);
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/adm/dashboard');
      } else {
        setChecking(false);
      }
    });
    return () => unsub();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/adm/dashboard');
    } catch {
      setError('E-mail ou senha incorretos. Verifique e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafb]">
        <Loader2 className="h-6 w-6 animate-spin text-primary/40" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f5] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-primary/8">
            <Image src="/logo.svg" alt="Tagis" width={120} height={40} className="h-8 w-auto" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-primary/8 p-8">
          <h1 className="text-xl font-semibold text-primary font-headline mb-1">
            Acesso restrito
          </h1>
          <p className="text-sm text-foreground/45 font-light mb-8">
            Painel administrativo da Tagis.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-foreground/60 tracking-wide uppercase block mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@tagismd.com.br"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-primary/15 bg-[#fafbfc] text-sm text-primary placeholder:text-foreground/25 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground/60 tracking-wide uppercase block mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-primary/15 bg-[#fafbfc] text-sm text-primary placeholder:text-foreground/25 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-medium py-3 rounded-xl text-sm hover:bg-primary/90 transition-all duration-300 hover:scale-[1.01] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-foreground/30 mt-6">
          Tagis Medicina e Diagnóstico &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
