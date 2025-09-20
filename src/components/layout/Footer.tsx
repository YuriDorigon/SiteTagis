// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 font-headline">Clinica Tagis</h3>
            <p className="text-sm">
              CNPJ: 26.393.262/0001-57 – TL PORTO CENTRO MÉDICO LTDA
            </p>
            <p className="text-sm">
              Resp. Técnico: Dr Rafael Santos Souza – CRM/SC 23051
            </p>
            <p className="text-sm mt-2">
              Endereço: Av. Ver. Walter Borges, 157 - Campinas, São José - SC, 88101-030
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 font-headline">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/especialidades" className="hover:text-primary">Especialidades</Link></li>
              <li><Link href="/exames" className="hover:text-primary">Exames</Link></li>
              <li><Link href="/convenios" className="hover:text-primary">Convênios</Link></li>
              <li><Link href="/corpo-clinico" className="hover:text-primary">Corpo Clínico</Link></li>
              <li><Link href="/contato" className="hover:text-primary">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 font-headline">Siga-nos</h3>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/tagismedicinaediagnostico/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-secondary-foreground hover:text-primary">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="https://www.instagram.com/tagismd/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-secondary-foreground hover:text-primary">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Clinica Tagis. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
