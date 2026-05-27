// src/components/layout/AppLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsAppButton from '@/components/layout/FloatingWhatsAppButton';
import AOSInitializer from '@/components/shared/AOSInitializer';
import LgpdBanner from '@/components/layout/LgpdBanner';
import type { ClinicConfig } from '@/lib/types';

interface AppLayoutProps {
  children: React.ReactNode;
  config: ClinicConfig;
}

export default function AppLayout({ children, config }: AppLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/adm');

  return (
    <>
      <AOSInitializer />
      {!isAdminRoute && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAdminRoute && <Footer cfg={config} />}
      {!isAdminRoute && <FloatingWhatsAppButton phoneNumber={config.whatsapp} />}
      {!isAdminRoute && <LgpdBanner privacyEmail={config.privacyEmail} />}
    </>
  );
}
