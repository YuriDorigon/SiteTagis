// src/components/shared/AOSInitializer.tsx
"use client";

import { useEffect } from 'react';

export default function AOSInitializer() {
  useEffect(() => {
    // Carrega o CSS do AOS de forma assíncrona (não bloqueia a renderização)
    if (!document.getElementById('aos-styles')) {
      const link = document.createElement('link');
      link.id = 'aos-styles';
      link.rel = 'stylesheet';
      link.href = '/aos.css';
      document.head.appendChild(link);
    }

    // Importa e inicializa o AOS dinamicamente
    import('aos').then((mod) => {
      mod.default.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });
    });
  }, []);

  return null;
}
