"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, MessageSquare, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import AppLogo from '@/components/shared/AppLogo';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/especialidades', label: 'Especialidades' },
  { href: '/exames', label: 'Exames' },
  { href: '/convenios', label: 'Convênios' },
  { href: '/corpo-clinico', label: 'Corpo Clínico' },
  { href: '/contato', label: 'Contato' },
  { href: '/trabalhe-conosco', label: 'Trabalhe Conosco' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-lg border-b border-primary/8">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-10 lg:px-20">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 group"
          aria-label="Página inicial da Clínica Tagis"
        >
          <AppLogo className="h-9 w-auto transition-transform duration-500 group-hover:scale-105" />
          <div className="flex flex-col items-start">
            <span className="font-medium text-xl tracking-tight text-primary font-headline">
              TAGIS
            </span>
            <span className="text-[9px] font-medium tracking-[0.22em] text-foreground/40 uppercase leading-none">
              Medicina e Diagnóstico
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300 relative group py-2',
                pathname === link.href
                  ? 'text-primary'
                  : 'text-foreground/55 hover:text-primary'
              )}
            >
              {link.label}
              <span
                className={cn(
                  'absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full',
                  pathname === link.href && 'w-full'
                )}
              />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center">
          <WhatsAppButton
            phoneNumber="5548991936045"
            message="Olá! Vim através do site e gostaria de agendar uma consulta."
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-xs font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.02]"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Agendar
          </WhatsAppButton>
        </div>

        {/* Mobile menu */}
        <div className="xl:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:bg-primary/5 rounded-xl"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-sm p-8 bg-white border-l border-primary/8"
            >
              <SheetHeader className="mb-10">
                <SheetTitle className="text-left flex items-center gap-3">
                  <AppLogo className="h-8 w-auto" />
                  <span className="font-medium text-xl tracking-tight text-primary font-headline">
                    TAGIS
                  </span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col space-y-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'text-lg font-medium transition-all duration-300 flex items-center justify-between group',
                      pathname === link.href
                        ? 'text-primary'
                        : 'text-foreground/45 hover:text-primary'
                    )}
                  >
                    {link.label}
                    <ArrowRight
                      className={cn(
                        'h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0',
                        pathname === link.href && 'opacity-100 translate-x-0 text-accent'
                      )}
                    />
                  </Link>
                ))}

                <div className="pt-8 mt-auto border-t border-primary/8">
                  <p className="text-[10px] text-foreground/35 font-medium tracking-widest uppercase mb-3">
                    Seg–Sex 07:30–18h · Sáb 07:30–12h
                  </p>
                  <WhatsAppButton
                    phoneNumber="5548991936045"
                    message="Olá! Vim através do site e gostaria de agendar uma consulta."
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium py-4 rounded-full transition-all duration-300"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Agendar pelo WhatsApp
                  </WhatsAppButton>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
