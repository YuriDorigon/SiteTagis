// src/app/not-found.tsx
import Link from 'next/link';
import { Home, Search, Phone } from 'lucide-react';

const links = [
  { href: '/especialidades', label: 'Especialidades' },
  { href: '/exames', label: 'Exames' },
  { href: '/convenios', label: 'Convênios' },
  { href: '/corpo-clinico', label: 'Corpo Clínico' },
  { href: '/contato', label: 'Contato' },
];

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full text-center space-y-8">

        {/* Código */}
        <div className="space-y-2">
          <p className="text-8xl font-extrabold font-headline text-primary/10 select-none leading-none">
            404
          </p>
          <div className="-mt-6">
            <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-sm font-medium px-3 py-1 rounded-full">
              <Search className="w-3.5 h-3.5" />
              Página não encontrada
            </span>
          </div>
        </div>

        {/* Mensagem */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold font-headline text-foreground">
            Ops, essa página não existe
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            O endereço que você digitou pode estar incorreto ou a página foi removida.
            Use os links abaixo para encontrar o que você procura.
          </p>
        </div>

        {/* Botão principal */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Home className="w-4 h-4" />
          Voltar para o início
        </Link>

        {/* Links rápidos */}
        <div className="pt-2">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
            Ou acesse diretamente
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/70 hover:text-primary border border-border hover:border-primary/40 px-4 py-1.5 rounded-full transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contato */}
        <p className="text-sm text-muted-foreground pt-2 flex items-center justify-center gap-1.5">
          <Phone className="w-3.5 h-3.5" />
          Precisa de ajuda?{' '}
          <a
            href="tel:+554830353377"
            className="text-primary hover:underline font-medium"
          >
            (48) 3035-3377
          </a>
        </p>

      </div>
    </section>
  );
}
