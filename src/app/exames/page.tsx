// src/app/exames/page.tsx
"use client";

import { useState, useEffect } from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LucideIconRenderer from '@/components/shared/LucideIconRenderer';
import ExamResultsButton from '@/components/exames/ExamResultsButton';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import type { Exam } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function ExamesPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getExamsFromFirestore = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const examsCol = collection(db, 'exams');
        const q = query(examsCol, orderBy('name'));
        const examSnapshot = await getDocs(q);
        const examList = examSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Nome Indisponível',
            iconName: data.iconName || 'ClipboardList',
            description: data.description || 'Descrição indisponível.',
          } as Exam;
        });
        setExams(examList);
      } catch (error) {
        console.error("Error fetching exams from Firestore:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getExamsFromFirestore();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <SectionTitle
          title="Exames Realizados"
          subtitle="Conte com nossa estrutura moderna e tecnologia de ponta para diagnósticos precisos e confiáveis."
        />
        <div className="mb-12 text-center">
          <ExamResultsButton />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Carregando exames...</span>
          </div>
        ) : exams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {exams.map((exam) => (
              <Card key={exam.id} className="flex flex-col text-center items-center shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <LucideIconRenderer name={exam.iconName} className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-semibold font-headline">{exam.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-lg text-foreground/80">
                    {exam.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
           <p className="text-center text-lg text-muted-foreground">Nenhum exame encontrado. Por favor, tente novamente mais tarde.</p>
        )}
      </div>
    </>
  );
}
