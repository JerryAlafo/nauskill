# NAUSKILL — Plataforma Africana de Formação Marítima

Protótipo funcional da plataforma NAUSKILL, com dados mockados, para fins de apresentação no concurso RIAL 2026.

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS** (cores institucionais ESCN: branco + ciano, dourado discreto)
- **shadcn/ui** (componentes base) + **MUI / Material UI** (para tabelas complexas)
- **lucide-react** (ícones — sem emojis)
- **next-themes** (modo claro / modo escuro)
- **qrcode.react** (QR Code dos certificados)

## Como executar localmente

### Pré-requisitos

- **Node.js 18.18+** ou **20+** (recomendado 20 LTS)
- **npm** (ou pnpm/yarn)

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Arrancar em modo de desenvolvimento
npm run dev

# 3. Abrir no navegador
# http://localhost:3000
```

> **Nota Windows / PowerShell:** se aparecer erro de execução de scripts, abra o PowerShell como administrador e execute: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

### Build de produção

```bash
npm run build
npm run start
```

## Estrutura do projecto

```
src/
├── app/                      # App Router (Next.js 15)
│   ├── page.tsx              # Landing page pública
│   ├── login/                # /login
│   ├── registo/              # /registo
│   ├── cursos/               # Catálogo público
│   │   └── [slug]/           # Detalhe de curso (público)
│   ├── verificar/            # Verificação pública de certificados
│   │   └── [codigo]/         # Resultado da verificação
│   └── painel/               # Área autenticada
│       ├── page.tsx          # Dashboard
│       ├── cursos/           # Meus cursos
│       │   ├── explorar/     # Explorar catálogo (autenticado)
│       │   └── [slug]/       # Player do curso
│       │       └── quiz/     # Quiz interactivo
│       ├── certificados/     # Lista + detalhe com QR Code
│       ├── ranking/          # Top alunos
│       ├── estatisticas/     # Gráficos de progresso
│       └── perfil/           # Edição de perfil
├── components/
│   ├── ui/                   # shadcn/ui (Button, Card, Input, …)
│   ├── layout/               # Headers, sidebar, footer
│   ├── shared/               # Logo, CourseCard, CertificateView, …
│   ├── theme-provider.tsx    # next-themes
│   ├── mui-provider.tsx      # MUI sincronizado com next-themes
│   └── mui-theme.ts          # Light/dark themes do MUI
├── data/                     # Mocks (cursos, utilizador, certificados, quizzes)
├── lib/                      # Helpers (cn, formatDate)
└── types/                    # Tipos TypeScript do domínio
```

## Fluxo de demonstração sugerido

1. **Página inicial** (`/`) — Apresentação da plataforma, estatísticas do problema, comparação com concorrência
2. **Catálogo público** (`/cursos`) — Filtros por categoria, pesquisa
3. **Detalhe de curso** (`/cursos/seguranca-basica-stcw`) — Hero, módulos, preço, instrutor
4. **Login** (`/login`) — Credenciais já preenchidas, clicar em "Entrar"
5. **Dashboard** (`/painel`) — Visão geral: cursos em progresso, certificados, ranking, recomendações
6. **Player de curso** (`/painel/cursos/combate-avancado-incendios`) — Lista de módulos com progresso
7. **Quiz interactivo** (`/painel/cursos/seguranca-basica-stcw/quiz`) — 5 perguntas STCW com feedback imediato
8. **Certificado digital** (`/painel/certificados/cert-001`) — QR Code, código de verificação, acções
9. **Verificação pública** (`/verificar`) — Demonstrar como armadores/autoridades validam certificados
10. **Estatísticas, ranking, perfil** — Demonstrar a profundidade da plataforma

## Cores institucionais

- **Branco** (background principal)
- **Ciano ESCN** `#0891B2` (primário, modo claro) / `#22D3EE` (modo escuro)
- **Dourado** `#C9A227` (uso muito pontual — badges premium, pódio, destaque)

O esquema de cores está implementado via CSS variables em `src/app/globals.css` e propagado tanto a Tailwind como ao MUI.

## Dados mockados

Todos os dados são estáticos (em memória), em `src/data/`. O protótipo não tem backend nem persistência — login, registo e quizzes são simulados.

**Conteúdo STCW incluído (alinhado com a Convenção):**

- Segurança Básica STCW (A-VI/1)
- Combate Avançado a Incêndios (A-VI/3)
- Primeiros Socorros Médicos (A-VI/4-1)
- Embarcações Salva-Vidas (A-VI/2-1)
- Consciencialização de Segurança Marítima (A-VI/6-1, ISPS)
- Liderança e Trabalho em Equipa na Ponte (A-II/1, BRM)

**Competências emergentes:**

- Ciber-Segurança Marítima (IMO MSC.428(98))
- Gestão de Emissões e MARPOL Anexo VI

## Licença

Protótipo desenvolvido no contexto do Concurso de Empreendedorismo e Inovação RIAL 2026.
