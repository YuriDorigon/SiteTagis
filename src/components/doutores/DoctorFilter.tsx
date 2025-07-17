// src/components/doutores/DoctorFilter.tsx
"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Specialty } from "@/lib/types";

interface DoctorFilterProps {
  specialties: Pick<Specialty, 'id' | 'name'>[];
  selectedSpecialty: string;
  onSpecialtyChange: (specialtyId: string) => void;
}

export default function DoctorFilter({ specialties, selectedSpecialty, onSpecialtyChange }: DoctorFilterProps) {
  return (
    <div className="mb-8 flex justify-center md:justify-start">
      <Select value={selectedSpecialty} onValueChange={onSpecialtyChange}>
        <SelectTrigger className="w-full md:w-[280px] h-12 text-lg">
          <SelectValue placeholder="Filtrar por Especialidade" />
        </SelectTrigger>
        <SelectContent side="bottom" sideOffset={5}>
          <SelectItem value="all" className="text-lg">Todas as Especialidades</SelectItem>
          {specialties.map((specialty) => (
            <SelectItem key={specialty.id} value={specialty.id} className="text-lg">
              {specialty.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
