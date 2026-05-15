import Link from "next/link";
import {
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  ArrowRight,
  PlayCircle,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Flame,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CURRENT_USER, COURSE_PROGRESS, RANKING } from "@/data/user";
import { COURSES, getCourseById } from "@/data/courses";
import { CERTIFICATES } from "@/data/certificates";
import { formatDate } from "@/lib/utils";

export default function PainelPage() {
  const inProgress = COURSE_PROGRESS.filter(
    (p) => p.status === "in-progress"
  ).slice(0, 3);
  const completed = COURSE_PROGRESS.filter((p) => p.status === "completed");
  const totalHours = completed.reduce((acc, p) => {
    const c = getCourseById(p.courseId);
    return acc + (c?.durationHours ?? 0);
  }, 0);

  const currentUserRank = RANKING.find((r) => r.isCurrentUser);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Olá, {CURRENT_USER.name.split(" ")[0]}
          </h1>
          <p className="text-muted-foreground mt-1">
            Continue de onde parou — tem 3 cursos em progresso.
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/painel/cursos">
            Ver todos os cursos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={BookOpen}
          label="Cursos concluídos"
          value={completed.length.toString()}
          accent="text-primary"
        />
        <StatCard
          icon={Award}
          label="Certificados"
          value={CERTIFICATES.length.toString()}
          accent="text-gold"
        />
        <StatCard
          icon={Clock}
          label="Horas de formação"
          value={`${totalHours}h`}
          accent="text-primary"
        />
        <StatCard
          icon={TrendingUp}
          label="Pontos"
          value={currentUserRank?.pointsTotal.toLocaleString("pt-PT") ?? "0"}
          accent="text-primary"
          extra={`#${currentUserRank?.rank ?? "-"} no ranking`}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Continuar a aprender — 2 colunas */}
        <Card className="min-w-0 overflow-hidden lg:col-span-2">
          <CardHeader className="px-4 sm:px-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <CardTitle>Continuar a aprender</CardTitle>
                <CardDescription className="break-words">
                  Cursos em progresso, ordenados por última actividade
                </CardDescription>
              </div>
              <Flame className="h-5 w-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-4 pb-4 sm:space-y-4 sm:px-6 sm:pb-6">
            {inProgress.map((p) => {
              const course = getCourseById(p.courseId);
              if (!course) return null;
              return (
                <div
                  key={p.courseId}
                  className="min-w-0 rounded-lg border p-3 hover:border-primary/40 transition-colors sm:flex sm:items-center sm:gap-4 sm:p-4"
                >
                  <div
                    className="h-12 w-12 rounded-md shrink-0 flex items-center justify-center text-white font-semibold sm:h-14 sm:w-14"
                    style={{ backgroundColor: `hsl(${course.thumbnailHue})` }}
                  >
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="mt-3 min-w-0 sm:mt-0 sm:flex-1">
                    <div className="flex min-w-0 flex-col gap-1 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between min-[420px]:gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-medium leading-tight">
                          {course.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Módulo {p.completedModules} de {p.totalModules}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-primary shrink-0">
                        {p.progressPercent}%
                      </span>
                    </div>
                    <Progress value={p.progressPercent} className="mt-2 h-1.5" />
                  </div>
                  <Button asChild size="sm" variant="outline" className="mt-3 w-full max-w-full shrink-0 sm:mt-0 sm:w-auto">
                    <Link href={`/painel/cursos/${course.slug}`}>
                      <PlayCircle className="h-4 w-4" />
                      Continuar
                    </Link>
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Próxima revalidação STCW */}
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Revalidação STCW
            </CardTitle>
            <CardDescription>Próxima data crítica</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-primary/5 p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Combate avançado a incêndios
              </p>
              <p className="text-xl font-bold mt-1">STCW A-VI/3</p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-3 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">Em 8 meses</span>
                <span className="text-muted-foreground">· Janeiro 2027</span>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t">
              <p className="text-xs font-medium text-muted-foreground">
                CERTIFICADOS VÁLIDOS
              </p>
              {CERTIFICATES.map((c) => (
                <div key={c.id} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span className="truncate flex-1">{c.courseTitle}</span>
                  <span className="text-xs text-muted-foreground">
                    {c.expiresAt ? new Date(c.expiresAt).getFullYear() : "—"}
                  </span>
                </div>
              ))}
            </div>

            <Button asChild variant="outline" className="w-full">
              <Link href="/painel/certificados">
                Ver todos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Cursos recomendados + Ranking */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recomendados para si</CardTitle>
            <CardDescription>
              Com base no seu perfil de Oficial Chefe e cursos concluídos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {COURSES.slice(5, 7).map((course) => (
                <Link
                  key={course.id}
                  href={`/painel/cursos/${course.slug}`}
                  className="group rounded-lg border p-4 hover:border-primary/40 transition-colors"
                >
                  <div
                    className="h-20 rounded-md mb-3 flex items-center justify-center text-white"
                    style={{ backgroundColor: `hsl(${course.thumbnailHue})` }}
                  >
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {course.stcwReference && (
                      <Badge variant="outline" className="text-[10px]">
                        {course.stcwReference}
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-[10px]">
                      {course.level}
                    </Badge>
                  </div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">
                    {course.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {course.shortDescription}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.durationHours}h
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.moduleCount} módulos
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ranking semanal</CardTitle>
            <CardDescription>Top 5 da semana</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {RANKING.slice(0, 5).map((r) => (
              <div
                key={r.userId}
                className={`flex items-center gap-3 rounded-md p-2 ${
                  r.isCurrentUser ? "bg-primary/5 ring-1 ring-primary/20" : ""
                }`}
              >
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    r.rank === 1
                      ? "bg-gold text-white"
                      : r.rank === 2
                      ? "bg-muted-foreground/30 text-foreground"
                      : r.rank === 3
                      ? "bg-amber-600/20 text-amber-700 dark:text-amber-400"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {r.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm truncate ${
                      r.isCurrentUser ? "font-semibold text-primary" : "font-medium"
                    }`}
                  >
                    {r.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {r.pointsTotal.toLocaleString("pt-PT")} pts
                  </p>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full" size="sm">
              <Link href="/painel/ranking">
                Ver ranking completo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
  extra,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent: string;
  extra?: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {label}
          </p>
          <Icon className={`h-4 w-4 ${accent}`} />
        </div>
        <p className="text-2xl font-bold">{value}</p>
        {extra && (
          <p className="text-xs text-muted-foreground mt-1">{extra}</p>
        )}
      </CardContent>
    </Card>
  );
}

export const dynamic = "force-static";
