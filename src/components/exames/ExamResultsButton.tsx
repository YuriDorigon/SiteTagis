"use client";

import { useState } from 'react';
import { FileText } from 'lucide-react';
import ExamResultsModal from '@/components/shared/ExamResultsModal';

export default function ExamResultsButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-medium py-4 px-8 rounded-full text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95"
      >
        <FileText className="h-4 w-4" />
        Resultado de exames
      </button>
      <ExamResultsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
