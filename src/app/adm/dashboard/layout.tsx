// src/app/adm/dashboard/layout.tsx
import AdminSidebar from '@/components/admin/AdminSidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard Admin - Tagis Clinic Hub',
  description: 'Painel de Controle Administrativo da Tagis Clinic Hub',
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // A lógica de autenticação foi removida.
  // O acesso é direto pelo URL.
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-64"> {/* ml-64 for sidebar width */}
        {children}
      </main>
    </div>
  );
}
