// src/components/shared/ExamResultsModal.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// Link import from next/link is removed as it's not needed for direct <a> tags for external links
import { FileText, Image as ImageIcon } from "lucide-react";

interface ExamResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExamResultsModal({ isOpen, onClose }: ExamResultsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline text-primary">Resultados de Exames</DialogTitle>
          <DialogDescription>
            Selecione o tipo de resultado que deseja acessar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <a
            href="https://resultado.app/web2/#protocol_screen"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="block w-full p-4 border border-border rounded-md hover:bg-primary/10 hover:border-primary/30 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <div className="flex items-center space-x-3">
              <ImageIcon className="h-7 w-7 text-primary" />
              <span className="text-lg font-medium text-foreground">
                Resultado de exames de imagem
              </span>
            </div>
          </a>
          <a
            href="https://sinusal.com.br/meu-exame"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="block w-full p-4 border border-border rounded-md hover:bg-primary/10 hover:border-primary/30 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <div className="flex items-center space-x-3">
              <FileText className="h-7 w-7 text-primary" />
              <span className="text-lg font-medium text-foreground">
                Resultados Eletrocardiograma, Holter e Mapa
              </span>
            </div>
          </a>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="outline" onClick={onClose} size="lg">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
