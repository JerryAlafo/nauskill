import Link from "next/link";
import {
  Anchor,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Globe2,
  GraduationCap,
  QrCode,
  Radio,
  Search,
  ShieldCheck,
  Ship,
  Star,
  Users,
  Waves,
  WifiOff,
} from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COURSES, CATEGORY_LABELS } from "@/data/courses";
import type { Course } from "@/types";

const popularCourses = [
  COURSES[0],
  COURSES[4],
  COURSES[1],
  COURSES[5],
].filter(Boolean);

const academies = [
  {
    title: "Tripulação mercante",
    description: "STCW essencial para oficiais, marinheiros e equipas de convés.",
    icon: Ship,
    href: "/cursos",
  },
  {
    title: "Portos e terminais",
    description: "Segurança, liderança e operação em ambiente portuário.",
    icon: Anchor,
    href: "/cursos",
  },
  {
    title: "Offshore e energia",
    description: "Competências críticas para operações remotas e equipas técnicas.",
    icon: Waves,
    href: "/cursos",
  },
  {
    title: "Passageiros e ferry",
    description: "Gestão de emergência, comunicação e resposta coordenada.",
    icon: Users,
    href: "/cursos",
  },
];

const topics = [
  "Segurança básica",
  "Proteção marítima",
  "Combate a incêndios",
  "Primeiros socorros",
  "Cibersegurança",
  "MARPOL",
  "BRM",
  "Certificados QR",
];

const steps = [
  {
    title: "Crie a conta",
    description: "Entre em poucos segundos e comece com um módulo gratuito.",
  },
  {
    title: "Estude onde estiver",
    description: "Use telemóvel, tablet ou computador, com suporte offline.",
  },
  {
    title: "Faça a avaliação",
    description: "Responda quizzes curtos com feedback e progresso visível.",
  },
  {
    title: "Receba o certificado",
    description: "Emissão digital verificável por QR Code e código público.",
  },
];

const trustItems = [
  { icon: ShieldCheck, title: "Alinhado com STCW", text: "Conteúdos pensados para revalidação e conformidade." },
  { icon: Globe2, title: "Feito para PALOP", text: "Português, contexto local e acesso em baixa conectividade." },
  { icon: WifiOff, title: "Pronto para bordo", text: "Aulas curtas, descarregáveis e fáceis de retomar." },
  { icon: QrCode, title: "Verificação pública", text: "Certificados auditáveis por empregadores e reguladores." },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <MarketingHeader />

      <main className="flex-1">
        <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-cyan-950 text-white">
          <HeroBackdrop />

          <div className="container relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-7 py-8">
              <Badge className="border-white/20 bg-white/10 text-white backdrop-blur">
                Formação marítima digital em português
              </Badge>

              <div className="space-y-5">
                <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
                  Certifique a sua carreira marítima sem sair de bordo.
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-cyan-50/90 sm:text-lg">
                  NAUSKILL reúne cursos STCW, competências emergentes e
                  certificados verificáveis para profissionais marítimos da
                  África Lusófona.
                </p>
              </div>

              <div className="flex max-w-2xl flex-col gap-3 rounded-lg border border-white/15 bg-white/10 p-2 backdrop-blur sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-100/70" />
                  <div className="flex h-11 items-center rounded-md bg-white/95 pl-9 pr-3 text-sm text-cyan-950">
                    Segurança STCW, cibersegurança, MARPOL...
                  </div>
                </div>
                <Button asChild size="lg" className="bg-white text-cyan-900 hover:bg-cyan-50">
                  <Link href="/cursos">
                    Ver cursos
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg" className="w-full bg-primary text-primary-foreground sm:w-auto">
                  <Link href="/registo">
                    Começar gratuitamente
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <Link href="/verificar">Verificar certificado</Link>
                </Button>
              </div>

              <div className="grid max-w-2xl grid-cols-2 gap-3 text-sm min-[520px]:grid-cols-4">
                <HeroStat value="4.8/5" label="avaliação média" />
                <HeroStat value="12+" label="cursos piloto" />
                <HeroStat value="Offline" label="modo de estudo" />
                <HeroStat value="QR" label="certificação" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b bg-background py-12 sm:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-3">
                  Cursos populares
                </Badge>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Comece pelo que é obrigatório a bordo
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Formação curta, prática e organizada para revalidação,
                  segurança e evolução profissional.
                </p>
              </div>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/cursos">
                  Catálogo completo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {popularCourses.map((course) => (
                <LandingCourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <Badge variant="outline" className="mb-3">
                Academias
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Percursos por área de atuação
              </h2>
              <p className="mt-2 text-muted-foreground">
                Encontre rapidamente a formação certa para o seu contexto de
                trabalho, seja navio, porto, offshore ou passageiros.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {academies.map((academy) => {
                const Icon = academy.icon;
                return (
                  <Link
                    key={academy.title}
                    href={academy.href}
                    className="group rounded-lg border bg-card p-5 transition-colors hover:border-primary/50"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">{academy.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {academy.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="funcionalidades" className="py-12 sm:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div className="space-y-5">
                <Badge variant="outline">Como funciona</Badge>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Da inscrição ao certificado em quatro passos
                </h2>
                <p className="text-muted-foreground">
                  A experiência foi desenhada para reduzir fricção: entrar,
                  estudar, avaliar e apresentar prova digital quando necessário.
                </p>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Badge key={topic} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {steps.map((step, index) => (
                  <Card key={step.title}>
                    <CardContent className="p-5">
                      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="border-y bg-muted/30 py-12 sm:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <Badge variant="outline" className="mb-3">
                Diferencial
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Uma plataforma feita para a realidade marítima lusófona
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title}>
                    <CardContent className="p-5">
                      <Icon className="mb-4 h-6 w-6 text-primary" />
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.text}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Card className="overflow-hidden border-primary/30 bg-primary text-primary-foreground">
              <CardContent className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Pronto para começar a sua próxima revalidação?
                  </h2>
                  <p className="mt-3 max-w-2xl text-primary-foreground/90">
                    Entre na plataforma, faça o primeiro módulo e veja como os
                    certificados digitais funcionam na prática.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    <Link href="/registo">
                      Criar conta
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                    <Link href="/login">Entrar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(8,51,68,0.98)_0%,rgba(14,116,144,0.86)_46%,rgba(201,162,39,0.48)_100%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-[linear-gradient(0deg,rgba(8,51,68,0.95),transparent)]" />

      <div className="absolute right-[-8rem] top-24 hidden w-[44rem] rotate-[-8deg] gap-4 lg:grid">
        <div className="rounded-lg border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <Radio className="h-4 w-4 text-cyan-200" />
              Painel de treino
            </div>
            <Badge className="border-white/20 bg-white/10 text-white">AO VIVO</Badge>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["STCW", "ISPS", "MARPOL"].map((label, index) => (
              <div key={label} className="rounded-md border border-white/10 bg-white/10 p-3">
                <p className="text-xs text-cyan-50/70">{label}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-cyan-200"
                    style={{ width: `${82 - index * 17}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ml-16 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
            <Award className="mb-8 h-7 w-7 text-gold-light" />
            <p className="text-sm font-semibold text-white">Certificado digital</p>
            <p className="mt-1 font-mono text-xs text-cyan-50/70">NSK-2026-000184</p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
            <QrCode className="mb-8 h-7 w-7 text-cyan-100" />
            <p className="text-sm font-semibold text-white">Verificação QR</p>
            <p className="mt-1 text-xs text-cyan-50/70">pública e auditável</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-md border border-white/15 bg-white/10 p-3 backdrop-blur">
      <p className="font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-cyan-50/75">{label}</p>
    </div>
  );
}

function LandingCourseCard({ course }: { course: Course }) {
  return (
    <Card className="h-full overflow-hidden transition-colors hover:border-primary/50">
      <div
        className="flex h-28 items-center justify-center text-white"
        style={{ backgroundColor: `hsl(${course.thumbnailHue})` }}
      >
        <GraduationCap className="h-10 w-10" />
      </div>
      <CardContent className="flex h-[calc(100%-7rem)] flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge variant="outline" className="text-[10px]">
            {CATEGORY_LABELS[course.category]}
          </Badge>
          {course.stcwReference && (
            <Badge variant="secondary" className="text-[10px]">
              {course.stcwReference}
            </Badge>
          )}
        </div>

        <h3 className="font-semibold leading-tight">{course.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {course.shortDescription}
        </p>

        <div className="mt-auto space-y-4 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {course.durationHours}h
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current text-amber-500" />
              {course.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {course.moduleCount} módulos
            </span>
          </div>

          <Button asChild className="w-full" variant={course.isPremium ? "outline" : "default"}>
            <Link href={`/cursos/${course.slug}`}>
              Ver detalhes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
