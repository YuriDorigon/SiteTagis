// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-primary/5 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-3 group transition-all duration-300" aria-label="Página inicial da Clinica Tagis">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-xl blur-lg group-hover:bg-primary/20 transition-all duration-500"></div>
            <AppLogo className="h-10 w-auto relative z-10 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-bold text-2xl tracking-tight text-primary font-headline group-hover:text-secondary transition-colors duration-300">TAGIS</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary/60 uppercase leading-none">Medicina e Diagnóstico</span>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-bold tracking-wide uppercase transition-all duration-300 relative group py-2", 
                pathname === link.href ? "text-primary" : "text-primary/60 hover:text-primary"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full",
                pathname === link.href && "w-full"
              )}></span>
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <WhatsAppButton 
            phoneNumber="5548991936045" 
            message="Olá! Vim através do site e gostaria de agendar uma consulta." 
            className="btn-premium-primary"
          >
            <MessageSquare className="mr-2 h-4 w-4" /> Agendar Agora
          </WhatsAppButton>
        </div>

        <div className="xl:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/5 rounded-2xl">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm p-8 bg-white/95 backdrop-blur-xl border-l border-primary/5 shadow-2xl">
               <SheetHeader className="mb-12">
                  <SheetTitle className="text-left flex items-center gap-3">
                    <AppLogo className="h-8 w-auto" />
                    <span className="font-bold text-2xl tracking-tighter text-primary font-headline">TAGIS</span>
                  </SheetTitle>
               </SheetHeader>
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      "text-2xl font-bold tracking-tight transition-all duration-300 flex items-center justify-between group", 
                      pathname === link.href ? "text-primary translate-x-2" : "text-primary/40 hover:text-primary hover:translate-x-2"
                    )}
                  >
                    {link.label}
                    <ArrowRight className={cn(
                        "h-6 w-6 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0",
                        pathname === link.href && "opacity-100 translate-x-0"
                    )} />
                  </Link>
                ))}
                <div className="pt-12 mt-auto">
                   <WhatsAppButton 
                    phoneNumber="5548991936045" 
                    message="Olá! Vim através do site e gostaria de agendar uma consulta." 
                    className="w-full btn-premium-primary py-8 text-lg"
                  >
                    <MessageSquare className="mr-2 h-6 w-6" /> Agendar WhatsApp
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
