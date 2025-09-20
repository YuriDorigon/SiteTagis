// src/app/adm/dashboard/layout.tsx
import AdminSidebar from '@/components/admin/AdminSidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard Admin - Clinica Tagis',
  description: 'Painel de Controle Administrativo da Clinica Tagis',
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-64"> {/* ml-64 for sidebar width */}
        {children}
      </main>
    </div>
  );
}
