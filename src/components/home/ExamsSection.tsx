// src/components/home/ExamsSection.tsx
"use client";

import React, { useState, useEffect } from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import LucideIconRenderer from '@/components/shared/LucideIconRenderer';
import ExamResultsButton from '@/components/exames/ExamResultsButton';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'; // Import getDocs instead of onSnapshot
import type { Exam } from '@/lib/types';

export default function ExamsSection() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const examsCol = collection(db, 'exams');
        const q = query(examsCol, orderBy('name'), limit(3));
        const snapshot = await getDocs(q);
        const fetchedExams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exam));
        setExams(fetchedExams);
      } catch (error) {
        console.error("Error fetching homepage exams:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExams();
  }, []);

  return (
    <>
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Exames Realizados"
            subtitle="Tecnologia e precisão para diagnósticos completos."
          />
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2 text-lg text-muted-foreground">Carregando exames...</p>
            </div>
          ) : exams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              {exams.map((exam) => (
                <Card key={exam.id} className="text-center shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                  <CardHeader className="items-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-3">
                      <LucideIconRenderer name={exam.iconName} className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-semibold font-headline">{exam.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/70">{exam.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-muted-foreground mb-12">Nenhum exame encontrado.</p>
          )}
          <div className="mt-10 flex flex-col items-center gap-4">
            <ExamResultsButton />
            <Button asChild variant="outline" className="text-base px-6 py-3 sm:text-lg sm:px-8 sm:py-4 w-full sm:w-auto">
              <Link href="/exames">
                Ver Todos os Exames <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
