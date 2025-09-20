// src/components/doutores/DoctorsList.tsx
"use client";

import { useState, useMemo } from 'react';
import type { Doctor, Specialty, Exam } from '@/lib/types';
import DoctorCard from './DoctorCard';
import DoctorFilter from './DoctorFilter';

interface DoctorsListProps {
  initialDoctors: Doctor[];
  initialSpecialties: Specialty[];
  initialExams: Exam[];
}

export default function DoctorsList({ initialDoctors, initialSpecialties, initialExams }: DoctorsListProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [selectedExam, setSelectedExam] = useState<string>("all");

  const { activeSpecialties, activeExams } = useMemo(() => {
    const doctorSpecialtyIds = new Set(initialDoctors.flatMap(d => d.specialtyIds || []));
    const doctorExamIds = new Set(initialDoctors.flatMap(d => d.examIds || []));
    
    const activeSpecs = initialSpecialties.filter(s => doctorSpecialtyIds.has(s.id));
    const activeExs = initialExams.filter(e => doctorExamIds.has(e.id));
    
    return { activeSpecialties: activeSpecs, activeExams: activeExs };
  }, [initialDoctors, initialSpecialties, initialExams]);


  const augmentedAndFilteredDoctors = useMemo(() => {
    const specialtiesMap = new Map(initialSpecialties.map(s => [s.id, s.name]));
    const examsMap = new Map(initialExams.map(e => [e.id, e.name]));
    
    const augmented = initialDoctors.map(doctor => ({
      ...doctor,
      specialtyNames: (doctor.specialtyIds || []).map(id => specialtiesMap.get(id) || 'N/A').filter(name => name !== 'N/A').sort((a, b) => a.localeCompare(b)),
      examNames: (doctor.examIds || []).map(id => examsMap.get(id) || 'N/A').filter(name => name !== 'N/A').sort((a, b) => a.localeCompare(b)),
    }));

    if (selectedSpecialty !== "all") {
      return augmented.filter(doctor => (doctor.specialtyIds || []).includes(selectedSpecialty));
    }

    if (selectedExam !== "all") {
      return augmented.filter(doctor => (doctor.examIds || []).includes(selectedExam));
    }
    
    return augmented;
  }, [selectedSpecialty, selectedExam, initialDoctors, initialSpecialties, initialExams]);
  
  const handleSpecialtyChange = (specialtyId: string) => {
    setSelectedSpecialty(specialtyId);
    setSelectedExam("all"); // Reset other filter
  };

  const handleExamChange = (examId: string) => {
    setSelectedExam(examId);
    setSelectedSpecialty("all"); // Reset other filter
  };

  if (!initialDoctors || initialDoctors.length === 0) {
    return <p className="text-center text-lg text-muted-foreground">Nenhum membro do corpo clínico cadastrado no momento.</p>;
  }

  return (
    <>
      <DoctorFilter
        specialties={activeSpecialties}
        exams={activeExams}
        selectedSpecialty={selectedSpecialty}
        selectedExam={selectedExam}
        onSpecialtyChange={handleSpecialtyChange}
        onExamChange={handleExamChange}
      />
      {augmentedAndFilteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {augmentedAndFilteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-muted-foreground py-10">
          Nenhum membro do corpo clínico encontrado para o filtro selecionado.
        </p>
      )}
    </>
  );
}
