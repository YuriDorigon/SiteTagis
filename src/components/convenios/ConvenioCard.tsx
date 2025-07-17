// src/components/convenios/ConvenioCard.tsx
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Convenio } from '@/lib/types';

interface ConvenioCardProps {
  convenio: Convenio;
}

export default function ConvenioCard({ convenio }: ConvenioCardProps) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
        <div className="relative w-full h-24 mb-4">
          <Image
            src={convenio.logoUrl}
            alt={`Logo ${convenio.name}`}
            fill
            className="object-contain"
            data-ai-hint="logo company"
          />
        </div>
        <h3 className="text-lg font-semibold text-center text-primary font-headline">{convenio.name}</h3>
      </CardContent>
    </Card>
  );
}
