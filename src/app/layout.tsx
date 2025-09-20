
// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsAppButton from '@/components/layout/FloatingWhatsAppButton';
import LgpdBanner from '@/components/layout/LgpdBanner';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tagismd.com.br';
const siteTitle = 'Tagis Medicina e Diagnóstico - São José - SC | Consultas e Exames';
const siteDescription = 'Consultas e Exames em um Só Lugar! +30 Especialidades | +50 Tipos de Exames | +20 Convênios. Agende fácil pelo WhatsApp. Fones: (48) 3035-3377 / (48) 99193-6045.';
const siteKeywords = "clínica médica, são josé sc, exames, consultas, ortopedia, cardiologia, ginecologia, diagnóstico por imagem, tagis";

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
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Imagem da Clinica Tagis',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-image.png'],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#003049',
  colorScheme: 'light',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-BR" className={cn('scroll-smooth')}>
      <head>
        {/* Favicon principal, priorizando o .ico */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Ícone SVG como alternativa de alta qualidade */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Ícone para dispositivos Apple */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={cn("font-sans antialiased flex flex-col min-h-screen bg-background")}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingWhatsAppButton phoneNumber="5548991936045" />
        <LgpdBanner />
        <Toaster />
      </body>
    </html>
  );
}
