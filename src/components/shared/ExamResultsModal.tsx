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
import { FileText, Image as ImageIcon, Droplets, FlaskConical, Phone, MessageCircle } from "lucide-react";

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

          {/* Exames de imagem */}
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

          {/* ECG / Holter / Mapa */}
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

          {/* Exames de Sangue — Lab. Menino Deus */}
          <div className="w-full p-4 border border-border rounded-md bg-muted/30">
            <div className="flex items-center space-x-3 mb-3">
              <Droplets className="h-7 w-7 text-primary flex-shrink-0" />
              <span className="text-lg font-medium text-foreground">
                🩸 Exames de Sangue <span className="text-sm font-normal text-foreground/60">(Lab. Menino Deus)</span>
              </span>
            </div>
            <p className="text-sm text-foreground/60 mb-3">
              Disponível na recepção com protocolo ou diretamente com o laboratório.
            </p>
            <div className="flex flex-col gap-1.5">
              <a
                href="tel:4832048679"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/70 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                (48) 3204-8679
              </a>
              <a
                href="https://wa.me/5548996976569"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/70 transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                (48) 99697-6569
              </a>
            </div>
          </div>

          {/* Biópsia — IDAP */}
          <div className="w-full p-4 border border-border rounded-md bg-muted/30">
            <div className="flex items-center space-x-3 mb-3">
              <FlaskConical className="h-7 w-7 text-primary flex-shrink-0" />
              <span className="text-lg font-medium text-foreground">
                🧪 Biópsia <span className="text-sm font-normal text-foreground/60">(IDAP — Anatomopatológico)</span>
              </span>
            </div>
            <p className="text-sm text-foreground/60">
              Resultado disponível na recepção, por e-mail ou diretamente com o IDAP.
            </p>
          </div>

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
