// src/components/doutores/DoctorsList.tsx
"use client";

import { useState, useMemo } from 'react';
import type { Doctor, Specialty } from '@/lib/types';
import DoctorCard from './DoctorCard';
import DoctorFilter from './DoctorFilter';

interface DoctorsListProps {
  initialDoctors: Doctor[];
  initialSpecialties: Specialty[];
}

export default function DoctorsList({ initialDoctors, initialSpecialties }: DoctorsListProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");

  const specialtyOptions = useMemo(() =>
    initialSpecialties.map(s => ({ id: s.id, name: s.name })),
  [initialSpecialties]);

  const augmentedAndFilteredDoctors = useMemo(() => {
    const specialtiesMap = new Map(initialSpecialties.map(s => [s.id, s.name]));
    
    const augmented = initialDoctors.map(doctor => ({
      ...doctor,
      specialtyNames: (doctor.specialtyIds || []).map(id => specialtiesMap.get(id) || 'N/A').filter(name => name !== 'N/A'),
    }));

    if (selectedSpecialty === "all") {
      return augmented;
    }
    
    return augmented.filter(doctor => (doctor.specialtyIds || []).includes(selectedSpecialty));
  }, [selectedSpecialty, initialDoctors, initialSpecialties]);

  if (!initialDoctors || initialDoctors.length === 0) {
    return <p className="text-center text-lg text-muted-foreground">Nenhum doutor cadastrado no momento.</p>;
  }

  return (
    <>
      <DoctorFilter
        specialties={specialtyOptions}
        selectedSpecialty={selectedSpecialty}
        onSpecialtyChange={setSelectedSpecialty}
      />
      {augmentedAndFilteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {augmentedAndFilteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-muted-foreground py-10">
          Nenhum doutor encontrado para a especialidade selecionada.
        </p>
      )}
    </>
  );
}
