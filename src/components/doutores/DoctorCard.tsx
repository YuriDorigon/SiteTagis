// src/components/doutores/DoctorCard.tsx
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Doctor } from '@/lib/types';
import { User, Stethoscope, Microscope } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const hasSpecialties = doctor.specialtyNames && doctor.specialtyNames.length > 0;
  const hasExams = doctor.examNames && doctor.examNames.length > 0;

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
        <p className="text-sm text-muted-foreground">CRM/SC: {doctor.crm}</p>
      </CardHeader>
      <CardContent className="p-0 flex-grow w-full">
        <div className="flex flex-col gap-3 my-3">
          {hasSpecialties && (
            <div className="flex flex-wrap justify-center items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary/70 mr-1" />
              {(doctor.specialtyNames || []).map((name) => (
                <Badge key={name} variant="secondary" className="py-1 px-2 text-sm">
                  {name}
                </Badge>
              ))}
            </div>
          )}
          {hasExams && (
            <div className="flex flex-wrap justify-center items-center gap-2">
               <Microscope className="h-5 w-5 text-primary/70 mr-1" />
              {(doctor.examNames || []).map((name) => (
                <Badge key={name} variant="outline" className="py-1 px-2 text-sm border-primary/50 text-primary bg-primary/5">
                  {name}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <CardDescription className="text-md text-foreground/80 leading-relaxed text-center mt-4">
          {doctor.bio}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
