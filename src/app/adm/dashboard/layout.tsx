// src/app/adm/dashboard/layout.tsx
import AdminSidebar from '@/components/admin/AdminSidebar';
import { FirebaseClientProvider } from '@/firebase';
import { AuthGuard } from '@/components/admin/AuthGuard';
import { InactivityGuard } from '@/components/admin/InactivityGuard';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dashboard Admin - Tagis',
  description: 'Painel de Controle Administrativo da Tagis',
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
      <AuthGuard>
        <InactivityGuard>
          <div className="flex min-h-screen bg-[#f8fafb]">
            <AdminSidebar />
            <main className="flex-1 p-6 lg:p-8 md:ml-60 min-w-0">
              {children}
            </main>
          </div>
        </InactivityGuard>
      </AuthGuard>
    </FirebaseClientProvider>
  );
}
