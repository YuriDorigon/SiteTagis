// src/app/adm/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Tagis Clinic Hub',
  description: 'Painel Administrativo da Tagis Clinic Hub',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // IMPORTANT: This layout is a placeholder.
  // In a real application, you would implement authentication checks here.
  // For example, redirect unauthenticated users to the login page ('/adm').
  // Or, if this layout is for '/adm/dashboard/*', check for session here.
  return (
    <>
      {children}
    </>
  );
}
