import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  BookOpen,
  WifiOff,
  Star,
  Users,
  CheckCircle2,
  ArrowRight,
  Award,
  Anchor,
} from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COURSES, getCourseBySlug, CATEGORY_LABELS } from "@/data/courses";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export default async function CursoDetalhePage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  // mock de módulos
  const modules = Array.from({ length: course.moduleCount }, (_, i) => ({
    title: `Módulo ${i + 1} — ${
      ["Introdução", "Fundamentos", "Aplicação prática", "Casos reais", "Avaliação", "Síntese"][i] ?? "Tópico"
    }`,
    duration: Math.round(course.durationHours / course.moduleCount),
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />

      <main className="flex-1">
        {/* Hero */}
        <section
          className="text-white"
          style={{ backgroundColor: `hsl(${course.thumbnailHue})` }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 sm:py-12 lg:py-16">
            <Link
              href="/cursos"
              className="text-sm text-white/80 hover:text-white inline-flex items-center gap-1 mb-4"
            >
              ← Voltar ao catálogo
            </Link>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-white/20 text-white border-white/30">
                    {CATEGORY_LABELS[course.category]}
                  </Badge>
                  {course.stcwReference && (
                    <Badge className="bg-white/20 text-white border-white/30">
                      <Anchor className="h-3 w-3" />
                      {course.stcwReference}
                    </Badge>
                  )}
                  <Badge className="bg-white/20 text-white border-white/30">
                    {course.level}
                  </Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  {course.title}
                </h1>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                  {course.description}
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 text-sm sm:gap-x-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{course.durationHours} horas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.moduleCount} módulos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{course.enrolledCount} inscritos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{course.rating.toFixed(1)}/5</span>
                  </div>
                  {course.isOfflineAvailable && (
                    <div className="flex items-center gap-2">
                      <WifiOff className="h-4 w-4" />
                      <span>Offline</span>
                    </div>
                  )}
                </div>
              </div>

              <Card className="bg-white text-foreground shadow-xl">
                    <CardContent className="p-5 space-y-4 sm:p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Preço</p>
                    {course.isPremium ? (
                    <p className="text-2xl font-bold sm:text-3xl">
                        1.000{" "}
                        <span className="text-lg font-normal text-muted-foreground">
                          MZN/mês
                        </span>
                      </p>
                    ) : (
                      <p className="text-2xl font-bold text-primary sm:text-3xl">Gratuito</p>
                    )}
                  </div>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/registo">
                      {course.isPremium ? "Subscrever Premium" : "Começar agora"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/login">Já tenho conta</Link>
                  </Button>

                  <div className="pt-4 border-t space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Acesso completo a todos os módulos</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Certificado digital verificável</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Suporte offline</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Conteúdo do curso</h2>
                  <Card>
                    <CardContent className="p-0 divide-y">
                      {modules.map((m, i) => (
                        <div
                          key={i}
                          className="p-4 flex flex-col gap-3 hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                              {i + 1}
                            </div>
                            <p className="font-medium">{m.title}</p>
                          </div>
                          <span className="text-sm text-muted-foreground flex items-center gap-1 sm:shrink-0">
                            <Clock className="h-3 w-3" />
                            {m.duration}h
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">O que vai aprender</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {course.tags.map((tag) => (
                      <div key={tag} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm">{tag}</span>
                      </div>
                    ))}
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm">
                        Aplicação prática a contextos reais a bordo
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm">
                        Avaliação final com emissão de certificado
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold">Instrutor</h3>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                        {course.instructor.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium">{course.instructor}</p>
                        <p className="text-xs text-muted-foreground">
                          Escola Superior de Ciências Náuticas
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {course.stcwReference && (
                  <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-primary">
                        <Award className="h-5 w-5" />
                        <h3 className="font-semibold">Certificação STCW</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Este curso emite certificação alinhada com{" "}
                        <span className="font-medium text-foreground">
                          {course.stcwReference}
                        </span>
                        , válida por 5 anos a partir da data de emissão.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </aside>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
