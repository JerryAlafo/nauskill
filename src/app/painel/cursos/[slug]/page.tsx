import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  PlayCircle,
  FileText,
  Award,
  ChevronRight,
  Download,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  COURSES,
  getCourseBySlug,
  CATEGORY_LABELS,
} from "@/data/courses";
import { COURSE_PROGRESS } from "@/data/user";
import { getQuizForCourse } from "@/data/quizzes";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

const MODULE_TITLES = [
  "Introdução e fundamentos",
  "Conceitos centrais",
  "Aplicação prática a bordo",
  "Estudos de caso reais",
  "Avaliação prática",
  "Síntese e revisão",
];

export default async function PainelCursoPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const progress = COURSE_PROGRESS.find((p) => p.courseId === course.id);
  const completedModules = progress?.completedModules ?? 0;
  const progressPercent = progress?.progressPercent ?? 0;
  const quiz = getQuizForCourse(course.id);

  const modules = Array.from({ length: course.moduleCount }, (_, i) => ({
    index: i,
    title: MODULE_TITLES[i] ?? `Módulo ${i + 1}`,
    duration: Math.round(course.durationHours / course.moduleCount),
    isCompleted: i < completedModules,
    isCurrent: i === completedModules,
  }));

  return (
    <div className="space-y-6 max-w-7xl">
      <Link
        href="/painel/cursos"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar a Os meus cursos
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero do curso */}
          <Card className="overflow-hidden">
            <div
              className="h-32 flex items-center justify-start p-5 text-white sm:justify-end sm:p-6"
              style={{ backgroundColor: `hsl(${course.thumbnailHue})` }}
            >
              <div className="text-left sm:text-right">
                <p className="text-xs uppercase tracking-wider text-white/80">
                  {CATEGORY_LABELS[course.category]}
                </p>
                <p className="text-2xl font-bold">{course.stcwReference ?? ""}</p>
              </div>
            </div>
            <CardContent className="p-5 space-y-4 sm:p-6">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline">{course.level}</Badge>
                <Badge variant="secondary">
                  <Clock className="h-3 w-3" />
                  {course.durationHours}h
                </Badge>
                {course.isOfflineAvailable && (
                  <Badge variant="secondary">
                    <WifiOff className="h-3 w-3" />
                    Offline
                  </Badge>
                )}
              </div>
              <h1 className="text-xl font-bold sm:text-2xl">{course.title}</h1>
              <p className="text-muted-foreground leading-relaxed">
                {course.description}
              </p>

              <div className="pt-2">
                <div className="flex flex-col gap-1 text-sm mb-2 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
                  <span className="text-muted-foreground">O seu progresso</span>
                  <span className="font-semibold text-primary">
                    {progressPercent}% · {completedModules}/{course.moduleCount}{" "}
                    módulos
                  </span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Lista de módulos */}
          <Card>
            <CardContent className="p-0 divide-y">
              <div className="p-5">
                <h2 className="font-semibold">Módulos do curso</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Toque num módulo para continuar
                </p>
              </div>
              {modules.map((m) => (
                <div
                  key={m.index}
                  className={`p-4 flex flex-wrap items-center gap-3 hover:bg-muted/40 transition-colors sm:gap-4 ${
                    m.isCurrent ? "bg-primary/5" : ""
                  }`}
                >
                  {m.isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  ) : m.isCurrent ? (
                    <PlayCircle className="h-5 w-5 text-primary shrink-0 fill-primary/20" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium text-sm ${
                        m.isCompleted ? "text-muted-foreground" : ""
                      }`}
                    >
                      Módulo {m.index + 1} · {m.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {m.duration}h
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />3 lições
                      </span>
                    </div>
                  </div>
                  {m.isCurrent && (
                    <Button size="sm" variant="outline" className="w-full sm:w-auto">
                      Continuar
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                  {m.isCompleted && (
                    <Badge variant="success" className="text-[10px]">
                      Concluído
                    </Badge>
                  )}
                </div>
              ))}

              {/* Avaliação final */}
              {quiz && (
                <div className="p-4 flex flex-wrap items-center gap-3 bg-gold/5 sm:gap-4">
                  <Award className="h-5 w-5 text-gold shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">Avaliação final</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {quiz.questions.length} perguntas · nota mínima{" "}
                      {quiz.passingScore}%
                    </p>
                  </div>
                  <Button asChild size="sm" className="w-full sm:w-auto">
                    <Link href={`/painel/cursos/${course.slug}/quiz`}>
                      {progressPercent === 100 ? "Refazer" : "Tentar"}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar direita */}
        <aside className="space-y-6">
          <Card>
            <CardContent className="p-5 space-y-4">
              <h3 className="font-semibold">Acções rápidas</h3>
              <Button className="w-full" size="sm">
                <PlayCircle className="h-4 w-4" />
                Continuar módulo {completedModules + 1}
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Download className="h-4 w-4" />
                Descarregar para offline
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 space-y-3">
              <h3 className="font-semibold text-sm">Instrutor</h3>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                  {course.instructor
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {course.instructor}
                  </p>
                  <p className="text-xs text-muted-foreground">ESCN</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {course.stcwReference && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Award className="h-4 w-4" />
                  <h3 className="font-semibold text-sm">Certificação STCW</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ao concluir, recebe certificado digital alinhado com{" "}
                  <span className="font-medium text-foreground">
                    {course.stcwReference}
                  </span>
                  , válido por 5 anos.
                </p>
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
