// src/app/convenios/page.tsx
import ConveniosList from '@/components/convenios/ConveniosList';
import SectionTitle from '@/components/shared/SectionTitle';
import type { Convenio } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';

// Fetch data from the local JSON file
async function getConveniosData(): Promise<Convenio[]> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'convenios.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading convenios.json:", error);
    return []; // Return an empty array on error
  }
}

export default async function ConveniosPage() {
  const convenios = await getConveniosData();

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <SectionTitle
        title="Convênios Atendidos"
        subtitle="Confira a lista de convênios que aceitamos em nossa clínica. Estamos sempre buscando expandir nossa rede para melhor atendê-lo."
      />
      
      <ConveniosList conveniosData={convenios} />
      
       <div className="mt-12 p-6 bg-secondary rounded-lg shadow">
        <h3 className="text-xl font-semibold text-primary mb-3 font-headline">Não encontrou seu convênio?</h3>
        <p className="text-foreground/80 mb-4">
          Entre em contato conosco para verificar a possibilidade de atendimento ou para mais informações sobre cobertura.
        </p>
        <p className="text-foreground/80">
          WhatsApp: <a href={`https://wa.me/5548991936045?text=${encodeURIComponent('Olá! Vim através do site e gostaria de informações sobre convênios.')}`} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">(48) 99193-6045</a> | Telefone: <a href="tel:+554830353377" className="font-medium text-primary hover:underline">(48) 3035-3377</a>
        </p>
      </div>
    </div>
  );
}
