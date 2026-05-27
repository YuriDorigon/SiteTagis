/**
 * Converte texto para slug URL-friendly.
 * Ex: "Dr. João da Silva" → "dr-joao-da-silva"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // remove acentos
    .replace(/[^a-z0-9\s-]/g, '')   // remove caracteres especiais
    .trim()
    .replace(/\s+/g, '-');           // espaços para hífens
}
