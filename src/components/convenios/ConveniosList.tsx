// src/components/convenios/ConveniosList.tsx
import type { Convenio } from '@/lib/types';
import ConvenioCard from './ConvenioCard';

interface ConveniosListProps {
  conveniosData: Convenio[]; // Now required and fetched from Firestore by parent
}

export default function ConveniosList({ conveniosData }: ConveniosListProps) {
  if (!conveniosData || conveniosData.length === 0) {
    return <p className="text-center text-lg text-muted-foreground">Nenhum convênio cadastrado no momento. Verifique novamente mais tarde.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
      {conveniosData.map((convenio) => (
        <ConvenioCard key={convenio.id} convenio={convenio} />
      ))}
    </div>
  );
}
