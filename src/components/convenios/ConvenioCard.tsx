// src/components/convenios/ConvenioCard.tsx
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Convenio } from '@/lib/types';

interface ConvenioCardProps {
  convenio: Convenio;
}

export default function ConvenioCard({ convenio }: ConvenioCardProps) {
  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-3xl bg-white h-full border border-primary/5 hover:border-secondary/20">
      <CardContent className="p-8 flex flex-col items-center justify-center h-full">
        <div className="relative w-full h-24 mb-6 transition-transform duration-500 group-hover:scale-110">
          <Image
            src={convenio.logoUrl}
            alt={`Logo ${convenio.name}`}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-base font-bold text-center text-primary/70 group-hover:text-primary transition-colors duration-300">
          {convenio.name}
        </h3>
      </CardContent>
    </Card>
  );
}
