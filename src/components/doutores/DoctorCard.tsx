// src/components/doutores/DoctorCard.tsx
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Doctor } from '@/lib/types';
import { User } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col text-center items-center p-6 h-full">
      <div className="relative w-32 h-32 mb-4 rounded-full border-4 border-secondary shadow-lg flex items-center justify-center bg-muted">
        {doctor.imageUrl ? (
          <Image
            src={doctor.imageUrl}
            alt={`Foto de ${doctor.name}`}
            fill
            sizes="128px"
            className="object-cover rounded-full"
            data-ai-hint="doctor portrait professional"
          />
        ) : (
          <User className="h-16 w-16 text-muted-foreground" />
        )}
      </div>
      <CardHeader className="p-0 items-center mb-2 w-full">
        <CardTitle className="text-2xl font-bold text-primary mb-1 font-headline">{doctor.name}</CardTitle>
        <div className="flex flex-wrap justify-center gap-1 my-2">
          {(doctor.specialtyNames || []).map((name) => (
            <Badge key={name} variant="secondary" className="py-1 px-2">
              {name}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">CRM/SC: {doctor.crm}</p>
      </CardHeader>
      <CardContent className="p-0 flex-grow w-full">
        <CardDescription className="text-md text-foreground/80 leading-relaxed text-center">
          {doctor.bio}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
