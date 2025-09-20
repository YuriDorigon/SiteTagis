// src/components/doutores/DoctorFilter.tsx
"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Specialty, Exam } from "@/lib/types";

interface DoctorFilterProps {
  specialties: Pick<Specialty, 'id' | 'name'>[];
  exams: Pick<Exam, 'id' | 'name'>[];
  selectedSpecialty: string;
  selectedExam: string;
  onSpecialtyChange: (specialtyId: string) => void;
  onExamChange: (examId: string) => void;
}

export default function DoctorFilter({ 
  specialties, 
  exams, 
  selectedSpecialty,
  selectedExam, 
  onSpecialtyChange,
  onExamChange
}: DoctorFilterProps) {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4 justify-start">
      <div className="flex-1 md:flex-none">
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
      <div className="flex-1 md:flex-none">
        <Select value={selectedExam} onValueChange={onExamChange}>
          <SelectTrigger className="w-full md:w-[280px] h-12 text-lg">
            <SelectValue placeholder="Filtrar por Exame" />
          </SelectTrigger>
          <SelectContent side="bottom" sideOffset={5}>
            <SelectItem value="all" className="text-lg">Todos os Exames</SelectItem>
            {exams.map((exam) => (
              <SelectItem key={exam.id} value={exam.id} className="text-lg">
                {exam.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
