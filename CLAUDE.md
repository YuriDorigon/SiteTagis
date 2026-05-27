# CLAUDE.md — SiteTagis

## Idioma e Estilo
Sempre responda em português.
Respostas ultra concisas: frases curtas, resultado primeiro, sem enrolação.

## Visão Geral
Site institucional da Tagis Medicina e Diagnóstico (`tagismd.com.br`). Público — pacientes consultam especialidades, exames, convênios e contato. Admin em `/adm` para gestão de conteúdo. Firebase Project: `site-clinica-8a567`.

## Comandos
```bash
npm run dev    # desenvolvimento
npm run build  # build de produção
npx vercel --prod  # deploy
```

## Arquitetura
```
src/
├── app/
│   ├── page.tsx                  # Home: hero, especialidades, exames, convênios, contato
│   ├── especialidades/page.tsx   # Listagem de especialidades
│   ├── exames/page.tsx           # Listagem de exames
│   ├── convenios/page.tsx        # Convênios aceitos
│   ├── corpo-clinico/page.tsx    # Equipe médica
│   ├── contato/page.tsx          # Formulário + dados de contato
│   ├── trabalhe-conosco/page.tsx # Candidatura a vagas
│   └── adm/
│       ├── page.tsx              # Redirect para /adm/dashboard
│       ├── layout.tsx            # Layout admin (auth guard)
│       └── dashboard/page.tsx    # Dashboard admin com gestão de conteúdo
├── components/
│   ├── home/                     # Seções da Home
│   ├── shared/                   # Header, Footer, Nav
│   ├── admin/                    # Componentes do painel admin
│   ├── convenios/
│   ├── doutores/
│   ├── exames/
│   ├── contact/
│   └── ui/
├── firebase/
│   └── server.ts                 # Firebase config via env vars NEXT_PUBLIC_FIREBASE_*
└── hooks/
```

## Firebase
- Project ID: `site-clinica-8a567`
- Banco: Firestore (especialidades, exames, convênios, médicos, depoimentos)
- Storage: Firebase Storage (imagens)
- Config via env vars `NEXT_PUBLIC_FIREBASE_*`

## Dados da Clínica (hardcoded no código)
- **Endereço:** Rua Ver. Walter Borges, 157 — São José, SC
- **Fone:** (48) 3035-3377 / (48) 99193-6045
- **WhatsApp:** `https://wa.me/5548991936045`

## Admin (`/adm`)
Acesso restrito via autenticação Firebase. Permite gerenciar: convênios, corpo clínico, depoimentos, especialidades, exames.

## Dados — ISR
- `src/lib/server/firestoreData.ts` — todas as funções de fetch do Firestore (server-side)
- `export const revalidate = 60` em todas as páginas públicas — mudanças do admin aparecem em até 60s
- **Não há JSON pré-gerado** — dados vêm direto do Firestore em runtime

## Fontes
- **Outfit** + **DM Sans** via `next/font/google` (variáveis CSS `--font-headline` e `--font-sans`)
- **Cormorant Garant** via `@import` no `globals.css` (não suportado pelo next/font)
- Footer recebe `cfg: ClinicConfig` como prop — não é async (AppLayout é 'use client')

## SEO
- Metadados individuais (`export const metadata`) em todas as rotas públicas
- JSON-LD `MedicalClinic` schema na home (`src/app/page.tsx`)
- Sitemap automático em `src/app/sitemap.ts`

## Favicon
- `public/favicon.svg` — logo Tagis colorida (fundo navy, cruz branca/vermelha)
- `src/app/icon.tsx` — ícone PNG 64×64 gerado via `ImageResponse`
- `favicon.ico` e `favicon.png` removidos do `public/` (causavam conflito)

## ⚠️ Atenção
- `src/firebase/config.ts` está vazio (legado) — usar `src/firebase/server.ts`
- Variáveis obrigatórias: todas as `NEXT_PUBLIC_FIREBASE_*`
- Imagem do hero usa `unoptimized` (arquivo AVIF já otimizado externamente)
- E-mail público (`cfg.email`) removido de `/contato`, `ContactHome` e `Footer` — não recolocar
- `FAQSection` recebe `cfg` e `conveniosCount` como props do `page.tsx` — FAQs são dinâmicos
- `ExamResultsModal` tem 4 opções: imagem, ECG/Holter/Mapa, Lab. Menino Deus, IDAP
- Não mencionar CIAP Health em nenhuma parte do site

## Ao fim de cada sessão
Atualizar `vault/Sistemas/site-tagis.md` no Obsidian com o que foi feito.
