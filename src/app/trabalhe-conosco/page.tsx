import type { Metadata } from 'next';
import TrabalheConoscoContent from '@/components/trabalhe-conosco/TrabalheConoscoContent';

export const metadata: Metadata = {
  title: 'Trabalhe Conosco | Tagis Medicina e Diagnóstico – São José SC',
  description:
    'Faça parte da equipe Tagis. Envie sua candidatura e trabalhe em um ambiente humanizado com oportunidades de crescimento profissional em São José, SC.',
};

export default function TrabalheConoscoPage() {
  return <TrabalheConoscoContent />;
}
