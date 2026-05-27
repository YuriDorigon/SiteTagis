"use client";

// src/components/doutores/DoctorCard.tsx
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Doctor } from '@/lib/types';
import { Stethoscope, Microscope } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const [imgError, setImgError] = useState(false);

  const hasSpecialties = doctor.specialtyNames && doctor.specialtyNames.length > 0;
  const hasExams = doctor.examNames && doctor.examNames.length > 0;
  const showPlaceholder = !doctor.imageUrl || imgError;
  const initials = getInitials(doctor.name);

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col text-center items-center p-6 h-full border-primary/8">
      <div className="relative w-28 h-28 mb-4 rounded-full border-2 border-primary/15 flex items-center justify-center bg-muted overflow-hidden">
        {!showPlaceholder ? (
          <Image
            src={doctor.imageUrl!}
            alt={`Foto de ${doctor.name}`}
            fill
            sizes="112px"
            className="object-cover rounded-full"
            onError={() => setImgError(true)}
            data-ai-hint="doctor portrait professional"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-semibold text-primary font-headline select-none">
              {initials}
            </span>
          </div>
        )}
      </div>

      <CardHeader className="p-0 items-center mb-2 w-full">
        <CardTitle className="text-lg font-semibold text-primary mb-0.5 font-headline leading-snug uppercase">
          {doctor.name}
        </CardTitle>
        <p className="text-xs text-foreground/40 font-medium tracking-wide">CRM/SC: {doctor.crm}</p>
      </CardHeader>

      <CardContent className="p-0 flex-grow w-full">
        <div className="flex flex-col gap-2 my-3">
          {hasSpecialties && (
            <div className="flex flex-wrap justify-center items-center gap-1.5">
              <Stethoscope className="h-3.5 w-3.5 text-primary/50 mr-0.5 flex-shrink-0" />
              {(doctor.specialtyNames || []).map((name) => (
                <span key={name} className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/8 text-primary">
                  {name}
                </span>
              ))}
            </div>
          )}
          {hasExams && (
            <div className="flex flex-wrap justify-center items-center gap-1.5">
              <Microscope className="h-3.5 w-3.5 text-accent/60 mr-0.5 flex-shrink-0" />
              {(doctor.examNames || []).map((name) => (
                <span key={name} className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/8 text-accent">
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
        {doctor.bio && (
          <p className="text-sm text-foreground/55 font-light leading-relaxed text-center mt-3">
            {doctor.bio}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
