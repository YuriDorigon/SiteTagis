// src/components/shared/LucideIconRenderer.tsx
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import React from 'react';

interface LucideIconRendererProps extends LucideProps {
  name: string;
  fallbackIconName?: keyof typeof LucideIcons;
}

// Converte string para PascalCase (ex: "user-check" → "UserCheck")
const toPascalCase = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+(.)(\w*)/g, (_match, p1, p2) => `${p1.toUpperCase()}${p2.toLowerCase()}`)
    .replace(/\w/, s => s.toUpperCase());
};

// Garante que o item é um componente React válido (function ou objeto com render)
const isComponent = (component: unknown): component is React.ComponentType<LucideProps> => {
  return (
    typeof component === 'function' ||
    (typeof component === 'object' && component !== null && 'render' in component)
  );
};

const LucideIconRenderer: React.FC<LucideIconRendererProps> = ({
  name,
  fallbackIconName = 'HelpCircle',
  ...props
}) => {
  const normalizedName = toPascalCase(name.replace(/Icon$/, ''));

  const IconCandidate = (LucideIcons as Record<string, unknown>)[normalizedName];
  if (isComponent(IconCandidate)) {
    const IconComponent = IconCandidate;
    return <IconComponent {...props} />;
  }

  const FallbackCandidate = LucideIcons[fallbackIconName];
  if (isComponent(FallbackCandidate)) {
    const FallbackComponent = FallbackCandidate;
    return <FallbackComponent {...props} />;
  }

  // Último recurso
  return <LucideIcons.HelpCircle {...props} />;
};

export default LucideIconRenderer;