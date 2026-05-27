// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import AppLayout from '@/components/layout/AppLayout';
import { getClinicConfig } from '@/lib/server/firestoreData';
import { Outfit, DM_Sans } from 'next/font/google';
import 'aos/dist/aos.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-headline',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tagismd.com.br';
const siteTitle = 'Tagis Medicina e Diagnóstico - São José - SC | Consultas e Exames';
const siteDescription =
  'Consultas e Exames em um Só Lugar! +30 Especialidades | +50 Tipos de Exames | +20 Convênios. Agende fácil pelo WhatsApp. Fones: (48) 3035-3377 / (48) 99193-6045.';
const siteKeywords =
  "clínica médica, são josé sc, exames, consultas, ortopedia, cardiologia, ginecologia, diagnóstico por imagem, tagis";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | Clinica Tagis`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'Clinica Tagis', url: siteUrl }],
  creator: 'Clinica Tagis',
  publisher: 'Clinica Tagis',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'Clinica Tagis',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Imagem da Clinica Tagis' }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#003b4f',
  colorScheme: 'light',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cfg = await getClinicConfig();
  return (
    <html lang="pt-BR" className={cn('scroll-smooth', outfit.variable, dmSans.variable)}>
      <body className={cn("font-sans antialiased flex flex-col min-h-screen bg-background overflow-x-hidden")}>
        <AppLayout config={cfg}>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
