// src/components/layout/AppLayout.tsx
'use client'; // Este é agora o componente de cliente

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsAppButton from '@/components/layout/FloatingWhatsAppButton';
import AOSInitializer from '@/components/shared/AOSInitializer';
import LgpdBanner from '@/components/layout/LgpdBanner';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/adm');

  return (
    <>
      <AOSInitializer />
      {!isAdminRoute && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingWhatsAppButton phoneNumber="5548991936045" />}
      <LgpdBanner />
    </>
  );
}
