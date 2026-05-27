'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  Stethoscope,
  ClipboardList,
  Quote as QuoteIcon,
  LogOut,
  ExternalLink,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

const navItems = [
  { href: '/adm/dashboard', label: 'Painel', icon: LayoutDashboard },
  { href: '/adm/dashboard/convenios', label: 'Convênios', icon: ShieldCheck },
  { href: '/adm/dashboard/corpo-clinico', label: 'Corpo Clínico', icon: Users },
  { href: '/adm/dashboard/especialidades', label: 'Especialidades', icon: Stethoscope },
  { href: '/adm/dashboard/exames', label: 'Exames', icon: ClipboardList },
  { href: '/adm/dashboard/depoimentos', label: 'Depoimentos', icon: QuoteIcon },
  { href: '/adm/dashboard/configuracoes', label: 'Configurações', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/adm/login');
  };

  return (
    <aside className="w-60 bg-primary text-white flex flex-col min-h-screen fixed hidden md:flex">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/adm/dashboard" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Tagis" width={90} height={30} className="h-7 w-auto brightness-0 invert" />
        </Link>
        <p className="text-[10px] text-white/40 font-medium tracking-widest uppercase mt-1.5 pl-0.5">
          Admin
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/55 hover:text-white hover:bg-white/8'
              )}
            >
              <item.icon className={cn('h-4 w-4 flex-shrink-0', isActive ? 'text-accent' : '')} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/8 transition-all duration-200"
        >
          <ExternalLink className="h-4 w-4 flex-shrink-0" />
          Ver site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          Sair
        </button>
      </div>
    </aside>
  );
}
