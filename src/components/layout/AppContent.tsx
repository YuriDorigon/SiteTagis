// src/components/layout/AppContent.tsx
'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsAppButton from '@/components/layout/FloatingWhatsAppButton';
import LgpdBanner from '@/components/layout/LgpdBanner';
import { Toaster } from "@/components/ui/toaster";

export default function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/adm');

  // A tag <body> agora é controlada aqui, dentro de um client component.
  // O Next.js vai inserir isso corretamente dentro da tag <html> do layout.tsx
  return (
    <body className="font-body antialiased flex flex-col min-h-screen">
      {!isAdminRoute && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingWhatsAppButton phoneNumber="5548991936045" />}
      {!isAdminRoute && <LgpdBanner />}
      <Toaster />
    </body>
  );
}
