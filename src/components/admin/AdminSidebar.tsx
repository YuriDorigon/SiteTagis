// src/components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShieldCheck, Users, Briefcase, ClipboardList, Quote as QuoteIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/adm/dashboard", label: "Painel Principal", icon: Home },
  { href: "/adm/dashboard/convenios", label: "Gerenciar Convênios", icon: ShieldCheck },
  { href: "/adm/dashboard/corpo-clinico", label: "Gerenciar Corpo Clínico", icon: Users },
  { href: "/adm/dashboard/especialidades", label: "Gerenciar Especialidades", icon: Briefcase },
  { href: "/adm/dashboard/exames", label: "Gerenciar Exames", icon: ClipboardList },
  { href: "/adm/dashboard/depoimentos", label: "Gerenciar Depoimentos", icon: QuoteIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground p-6 flex-col min-h-screen fixed hidden md:flex">
      <div className="mb-8">
        <Link href="/adm/dashboard" className="text-2xl font-bold font-headline">
          Admin Tagis
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-md text-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                  pathname === item.href ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" : ""
                )}
              >
                <item.icon className="h-6 w-6" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <p className="text-xs text-sidebar-foreground/50 mt-4 text-center">
          Clinica Tagis &copy; {new Date().getFullYear()}
        </p>
      </div>
    </aside>
  );
}
