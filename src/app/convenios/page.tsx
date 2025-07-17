// src/app/convenios/page.tsx
"use client";

import { useState, useEffect } from 'react';
import ConveniosList from '@/components/convenios/ConveniosList';
import SectionTitle from '@/components/shared/SectionTitle';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import type { Convenio } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function ConveniosPage() {
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getConveniosFromFirestore = async () => {
      setIsLoading(true);
      try {
        const conveniosCol = collection(db, 'convenios');
        const q = query(conveniosCol, orderBy('name'));
        const convenioSnapshot = await getDocs(q);
        const convenioList = convenioSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Nome Indisponível',
            logoUrl: data.logoUrl || 'https://placehold.co/150x80.png?text=Logo',
          } as Convenio;
        });
        setConvenios(convenioList);
      } catch (error) {
        console.error("Error fetching convenios from Firestore:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getConveniosFromFirestore();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <SectionTitle
        title="Convênios Atendidos"
        subtitle="Confira a lista de convênios que aceitamos em nossa clínica. Estamos sempre buscando expandir nossa rede para melhor atendê-lo."
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Carregando convênios...</span>
        </div>
      ) : (
        <ConveniosList conveniosData={convenios} />
      )}
       <div className="mt-12 p-6 bg-secondary rounded-lg shadow">
        <h3 className="text-xl font-semibold text-primary mb-3 font-headline">Não encontrou seu convênio?</h3>
        <p className="text-foreground/80 mb-4">
          Entre em contato conosco para verificar a possibilidade de atendimento ou para mais informações sobre cobertura.
        </p>
        <p className="text-foreground/80">
          Telefone: <a href="tel:+554830353377" className="font-medium text-primary hover:underline">(48) 3035-3377</a> | WhatsApp: <a href={`https://wa.me/5548991936045?text=${encodeURIComponent('Olá! Vim através do site e gostaria de informações sobre convênios.')}`} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">(48) 99193-6045</a>
        </p>
      </div>
    </div>
  );
}
