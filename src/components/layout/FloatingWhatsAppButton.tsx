// src/components/layout/FloatingWhatsAppButton.tsx
"use client";

import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface FloatingWhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export default function FloatingWhatsAppButton({ phoneNumber, message = "Olá! Vim através do site e gostaria de mais informações." }: FloatingWhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" passHref aria-label="Contatar pelo WhatsApp">
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg z-50 flex items-center justify-center"
      >
        <MessageSquare className="h-8 w-8" />
      </Button>
    </Link>
  );
}
