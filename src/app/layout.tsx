// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import AppContent from '@/components/layout/AppContent'; // Importar o novo componente

// Agora podemos definir os metadados corretamente em um Server Component
export const metadata: Metadata = {
  title: 'Tagis Clinic Hub - Consultas e Exames',
  description: 'Consultas e Exames em um Só Lugar! +30 Especialidades | +50 Tipos de Exames | +20 Convênios. Agende fácil pelo WhatsApp.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      {/* O novo AppContent envolve os filhos, cuidando da lógica do lado do cliente */}
      <AppContent>{children}</AppContent>
    </html>
  );
}
