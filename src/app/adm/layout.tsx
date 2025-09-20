// src/app/adm/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Clinica Tagis',
  description: 'Painel Administrativo da Clinica Tagis',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Este layout envolve todas as rotas /adm/*
  // Ele não tem elementos visuais próprios, apenas define metadados.
  // O layout visual (com sidebar, etc.) está em /adm/dashboard/layout.tsx
  return (
    <div className="bg-slate-100">
      {children}
    </div>
  );
}
