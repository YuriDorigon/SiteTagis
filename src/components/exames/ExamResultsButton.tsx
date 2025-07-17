// src/components/exames/ExamResultsButton.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import ExamResultsModal from '@/components/shared/ExamResultsModal';

export default function ExamResultsButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="default"
        className="text-base px-6 py-3 sm:text-lg sm:px-8 sm:py-4 w-full max-w-xs mx-auto"
      >
        <FileText className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Resultado de Exames
      </Button>
      <ExamResultsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
