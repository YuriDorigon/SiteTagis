// src/components/admin/AdminDashboard.tsx
"use client"; 

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, PlusCircle, Briefcase, ClipboardList, Loader2, Quote as QuoteIcon } from "lucide-react";
import Link from "next/link";
import { db } from '@/lib/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';

interface Stats {
  conveniosCount: number;
  doctorsCount: number;
  specialtiesCount: number;
  examsCount: number;
  testimonialsCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    conveniosCount: 0,
    doctorsCount: 0,
    specialtiesCount: 0,
    examsCount: 0,
    testimonialsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const conveniosCol = collection(db, 'convenios');
        const doctorsCol = collection(db, 'doctors');
        const specialtiesCol = collection(db, 'specialties');
        const examsCol = collection(db, 'exams');
        const testimonialsCol = collection(db, 'testimonials');

        const [conveniosSnap, doctorsSnap, specialtiesSnap, examsSnap, testimonialsSnap] = await Promise.all([
          getCountFromServer(conveniosCol),
          getCountFromServer(doctorsCol),
          getCountFromServer(specialtiesCol),
          getCountFromServer(examsCol),
          getCountFromServer(testimonialsCol),
        ]);
        
        setStats({
          conveniosCount: conveniosSnap.data().count,
          doctorsCount: doctorsSnap.data().count,
          specialtiesCount: specialtiesSnap.data().count,
          examsCount: examsSnap.data().count,
          testimonialsCount: testimonialsSnap.data().count,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const dashboardCards = [
    { title: "Total de Convênios", count: stats.conveniosCount, icon: ShieldCheck, link: "/adm/dashboard/convenios", description: "Convênios ativos cadastrados" },
    { title: "Total do Corpo Clínico", count: stats.doctorsCount, icon: Users, link: "/adm/dashboard/corpo-clinico", description: "Membros cadastrados" },
    { title: "Total de Especialidades", count: stats.specialtiesCount, icon: Briefcase, link: "/adm/dashboard/especialidades", description: "Especialidades oferecidas" },
    { title: "Total de Exames", count: stats.examsCount, icon: ClipboardList, link: "/adm/dashboard/exames", description: "Tipos de exames realizados" },
    { title: "Total de Depoimentos", count: stats.testimonialsCount, icon: QuoteIcon, link: "/adm/dashboard/depoimentos", description: "Depoimentos de pacientes" },
  ];

  const managementButtons = [
    { label: "Gerenciar Convênios", href: "/adm/dashboard/convenios" },
    { label: "Gerenciar Corpo Clínico", href: "/adm/dashboard/corpo-clinico" },
    { label: "Gerenciar Especialidades", href: "/adm/dashboard/especialidades" },
    { label: "Gerenciar Exames", href: "/adm/dashboard/exames" },
    { label: "Gerenciar Depoimentos", href: "/adm/dashboard/depoimentos" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary font-headline">Painel Administrativo</h1>

      <div className="flex flex-wrap gap-4">
        {managementButtons.map(btn => (
          <Button asChild size="lg" key={btn.href}>
            <Link href={btn.href}>
              <PlusCircle className="mr-2 h-5 w-5" /> {btn.label}
            </Link>
          </Button>
        ))}
      </div>
      
      {isLoading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
                <Card key={i} className="shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium h-6 bg-gray-200 rounded w-3/4 animate-pulse"></CardTitle>
                        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold h-8 bg-gray-200 rounded w-1/4 animate-pulse mb-2"></div>
                        <p className="text-xs text-muted-foreground h-4 bg-gray-200 rounded w-full animate-pulse"></p>
                        <div className="mt-4 h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    </CardContent>
                </Card>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {dashboardCards.map(card => (
            <Card className="shadow-md" key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{card.title}</CardTitle>
                <card.icon className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{card.count}</div>
                <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                <Button asChild size="sm" className="mt-4">
                  <Link href={card.link}>Ver Todos & Gerenciar</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
    </div>
  );
}
