// src/app/adm/page.tsx
import { redirect } from 'next/navigation';

export default function AdminRedirectPage() {
  redirect('/adm/dashboard');
  // Este retorno é necessário para satisfazer o tipo da função, mas o redirect interromperá a execução.
  return null;
}
