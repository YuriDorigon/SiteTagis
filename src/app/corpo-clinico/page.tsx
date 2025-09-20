// src/app/corpo-clinico/page.tsx
"use client";

import { useState, useEffect } from 'react';
import DoctorsList from '@/components/doutores/DoctorsList';
import SectionTitle from '@/components/shared/SectionTitle';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import type { Doctor, Specialty, Exam } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function CorpoClinicoPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const doctorsCol = collection(db, 'doctors');
        const doctorsQuery = query(doctorsCol, orderBy('name'));
        const doctorSnapshot = await getDocs(doctorsQuery);
        const doctorsList = doctorSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Doctor));
        
        const specialtiesCol = collection(db, 'specialties');
        const specialtiesQuery = query(specialtiesCol, orderBy('name'));
        const specialtySnapshot = await getDocs(specialtiesQuery);
        const specialtiesList = specialtySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Specialty));

        const examsCol = collection(db, 'exams');
        const examsQuery = query(examsCol, orderBy('name'));
        const examSnapshot = await getDocs(examsQuery);
        const examsList = examSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exam));
        
        setDoctors(doctorsList);
        setSpecialties(specialtiesList);
        setExams(examsList);

      } catch (error) {
        console.error("Error fetching data for doctors page:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <SectionTitle
        title="Corpo Clínico"
        subtitle="Conheça nossos profissionais especialistas, dedicados a oferecer o melhor atendimento para sua saúde."
      />
      {isLoading ? (
         <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Carregando corpo clínico...</span>
        </div>
      ) : (
        <DoctorsList 
          initialDoctors={doctors} 
          initialSpecialties={specialties}
          initialExams={exams}
        />
      )}
    </div>
  );
}
