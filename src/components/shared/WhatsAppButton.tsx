// src/components/shared/WhatsAppButton.tsx
import { Button, type ButtonProps } from '@/components/ui/button';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface WhatsAppButtonProps extends ButtonProps {
  phoneNumber: string;
  message?: string;
  children: React.ReactNode;
}

export default function WhatsAppButton({ phoneNumber, message = "Olá! Vim através do site e gostaria de agendar uma consulta.", children, ...props }: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Button asChild {...props}>
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    </Button>
  );
}
