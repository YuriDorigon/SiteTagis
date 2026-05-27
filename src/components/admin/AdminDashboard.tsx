'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, Stethoscope, ClipboardList, Quote as QuoteIcon, ArrowRight, Loader2 } from 'lucide-react';
import { useFirestore, useUser, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';

interface Stats {
  conveniosCount: number;
  doctorsCount: number;
  specialtiesCount: number;
  examsCount: number;
  testimonialsCount: number;
}

const sections = [
  {
    key: 'conveniosCount' as const,
    label: 'Convênios',
    icon: ShieldCheck,
    href: '/adm/dashboard/convenios',
    collection: 'convenios',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    key: 'doctorsCount' as const,
    label: 'Corpo Clínico',
    icon: Users,
    href: '/adm/dashboard/corpo-clinico',
    collection: 'doctors',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    key: 'specialtiesCount' as const,
    label: 'Especialidades',
    icon: Stethoscope,
    href: '/adm/dashboard/especialidades',
    collection: 'specialties',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    key: 'examsCount' as const,
    label: 'Exames',
    icon: ClipboardList,
    href: '/adm/dashboard/exames',
    collection: 'exams',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    key: 'testimonialsCount' as const,
    label: 'Depoimentos',
    icon: QuoteIcon,
    href: '/adm/dashboard/depoimentos',
    collection: 'testimonials',
    color: 'bg-rose-50 text-rose-600',
  },
];

export default function AdminDashboard() {
  const firestore = useFirestore();
  const { user } = useUser();
  const [stats, setStats] = useState<Stats>({
    conveniosCount: 0,
    doctorsCount: 0,
    specialtiesCount: 0,
    examsCount: 0,
    testimonialsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!firestore) return;
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const counts = await Promise.all(
          sections.map(s =>
            getCountFromServer(collection(firestore, s.collection)).catch(() => {
              errorEmitter.emit('permission-error', new FirestorePermissionError({ operation: 'list', path: s.collection }));
              return null;
            })
          )
        );
        const newStats = { ...stats };
        counts.forEach((snapshot, i) => {
          if (snapshot) newStats[sections[i].key] = snapshot.data().count;
        });
        setStats(newStats);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [firestore]);

  const firstName = user?.email?.split('@')[0] ?? 'Admin';

  return (
    <div className="max-w-4xl">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs text-foreground/40 font-medium tracking-widest uppercase mb-1">
          Bem-vindo de volta
        </p>
        <h1 className="text-2xl font-semibold text-primary font-headline">
          {firstName}
        </h1>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link
            key={section.key}
            href={section.href}
            className="group bg-white rounded-2xl border border-primary/8 p-6 hover:border-accent/30 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${section.color}`}>
                <section.icon className="h-4 w-4" />
              </div>
              <ArrowRight className="h-4 w-4 text-foreground/20 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-300" />
            </div>

            {isLoading ? (
              <div className="h-7 w-12 bg-gray-100 rounded-lg animate-pulse mb-1" />
            ) : (
              <p className="text-3xl font-semibold text-primary font-headline mb-1">
                {stats[section.key]}
              </p>
            )}

            <p className="text-sm text-foreground/45 font-light">
              {section.label}
            </p>
          </Link>
        ))}

        {/* Quick actions placeholder card */}
        <div className="bg-primary/[0.03] border border-primary/8 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2">
          <p className="text-xs font-medium text-foreground/35 tracking-wide">
            Use a barra lateral para gerenciar cada seção
          </p>
        </div>
      </div>
    </div>
  );
}
