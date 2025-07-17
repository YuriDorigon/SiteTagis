// src/components/shared/SectionTitle.tsx
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function SectionTitle({ title, subtitle, className, titleClassName, subtitleClassName }: SectionTitleProps) {
  return (
    <div className={cn("mb-10 md:mb-16 text-center", className)}>
      <h2 className={cn("text-3xl md:text-4xl font-bold text-primary font-headline", titleClassName)}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-3 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
