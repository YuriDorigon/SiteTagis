// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, MessageSquare } from 'lucide-react';
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
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-primary text-primary-foreground shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-3 group" aria-label="Página inicial da Clinica Tagis">
          <AppLogo className="h-10 w-auto transition-transform group-hover:scale-105" />
          <div className="flex flex-col items-start">
            <span className="font-headline font-bold text-xl leading-tight">TAGIS</span>
            <span className="font-body text-xs leading-tight opacity-90">MEDICINA E DIAGNÓSTICO</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-base lg:text-lg font-medium transition-colors", 
                pathname === link.href ? "text-sky-300 font-semibold" : "text-primary-foreground/80 hover:text-primary-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <WhatsAppButton 
            phoneNumber="5548991936045" 
            message="Olá! Vim através do site e gostaria de agendar uma consulta." 
            size="default"
            variant="default"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <MessageSquare className="mr-2 h-5 w-5" /> Agendar WhatsApp
          </WhatsAppButton>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10 focus:bg-primary-foreground/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-6 bg-primary text-primary-foreground">
               <SheetHeader>
                  <SheetTitle className="sr-only">Menu Principal</SheetTitle>
               </SheetHeader>
              <div className="flex flex-col space-y-6 mt-4">
                <Link href="/" className="flex items-center space-x-2 mb-4" onClick={closeMobileMenu} aria-label="Página inicial da Clinica Tagis">
                  <AppLogo className="h-9 w-auto" />
                  <div className="flex flex-col items-start">
                    <span className="font-headline font-bold text-lg leading-tight">TAGIS</span>
                    <span className="font-body text-xs leading-tight opacity-90">MEDICINA E DIAGNÓSTICO</span>
                  </div>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      "text-xl font-medium transition-colors", 
                      pathname === link.href ? "text-sky-300 font-semibold" : "text-primary-foreground/80 hover:text-primary-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6 flex flex-col space-y-3">
                   <WhatsAppButton 
                    phoneNumber="5548991936045" 
                    message="Olá! Vim através do site e gostaria de agendar uma consulta." 
                    size="lg" 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" /> Agendar WhatsApp
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
