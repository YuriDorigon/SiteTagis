import Image from 'next/image';
import Link from 'next/link';
import type { Convenio } from '@/lib/types';
import { slugify } from '@/lib/utils/slug';

interface ConvenioCardProps {
  convenio: Convenio;
}

export default function ConvenioCard({ convenio }: ConvenioCardProps) {
  return (
    <Link
      href={`/convenios/${slugify(convenio.name)}`}
      title={`Ver informações sobre ${convenio.name}`}
      className="group bg-white border border-primary/8 rounded-2xl p-6 h-32 flex items-center justify-center hover:border-accent/30 transition-colors duration-500"
    >
      <div className="relative w-full h-full transition-all duration-500 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100">
        <Image
          src={convenio.logoUrl}
          alt={`Logo ${convenio.name}`}
          fill
          className="object-contain"
        />
      </div>
    </Link>
  );
}
