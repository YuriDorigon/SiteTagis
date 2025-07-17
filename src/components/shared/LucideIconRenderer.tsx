// src/components/shared/LucideIconRenderer.tsx
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface LucideIconRendererProps extends LucideProps {
  name: string;
  fallbackIconName?: keyof typeof LucideIcons;
}

const toPascalCase = (str: string): string => {
  // Converte nomes de ícones em kebab-case (ex: "heart-pulse") 
  // para PascalCase (ex: "HeartPulse"), que é o formato esperado pela biblioteca.
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};


const LucideIconRenderer: React.FC<LucideIconRendererProps> = ({
  name,
  fallbackIconName = 'HelpCircle', // Um ícone padrão caso o nome não seja encontrado
  ...props
}) => {
  // Normaliza o nome do ícone para PascalCase, lidando com hífens.
  const normalizedName = toPascalCase(name.replace(/Icon$/, ''));
  
  // @ts-ignore Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'typeof LucideIcons'.
  const IconComponent = LucideIcons[normalizedName as keyof typeof LucideIcons] || LucideIcons[fallbackIconName];

  if (!IconComponent) {
    // Fallback se até o ícone de fallback for inválido (não deve acontecer com um padrão válido)
    // @ts-ignore
    const Fallback = LucideIcons[fallbackIconName];
    return <Fallback {...props} />;
  }

  return <IconComponent {...props} />;
};

export default LucideIconRenderer;
