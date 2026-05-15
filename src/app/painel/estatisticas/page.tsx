import {
  Clock,
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  Target,
  Flame,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { COURSE_PROGRESS } from "@/data/user";
import { COURSES, getCourseById, CATEGORY_LABELS } from "@/data/courses";

// Dados mockados de actividade semanal (horas/dia, segunda → domingo)
const WEEKLY_ACTIVITY = [
  { day: "Seg", hours: 1.5 },
  { day: "Ter", hours: 2.2 },
  { day: "Qua", hours: 0.8 },
  { day: "Qui", hours: 3.1 },
  { day: "Sex", hours: 1.8 },
  { day: "Sáb", hours: 2.6 },
  { day: "Dom", hours: 0.4 },
];

const MONTHLY_PROGRESS = [
  { month: "Jan", completed: 1 },
  { month: "Fev", completed: 2 },
  { month: "Mar", completed: 2 },
  { month: "Abr", completed: 3 },
  { month: "Mai", completed: 5 },
];

export default function EstatisticasPage() {
  const completed = COURSE_PROGRESS.filter((p) => p.status === "completed");
  const inProgress = COURSE_PROGRESS.filter((p) => p.status === "in-progress");
  const totalHours = completed.reduce((acc, p) => {
    const c = getCourseById(p.courseId);
    return acc + (c?.durationHours ?? 0);
  }, 0);

  // Cálculo de distribuição por categoria
  const categoryDist = COURSE_PROGRESS.reduce<Record<string, number>>(
    (acc, p) => {
      const c = getCourseById(p.courseId);
      if (c) {
        acc[c.category] = (acc[c.category] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  const totalEnrolled = COURSE_PROGRESS.length;

  const maxHours = Math.max(...WEEKLY_ACTIVITY.map((d) => d.hours));
  const maxMonthly = Math.max(...MONTHLY_PROGRESS.map((m) => m.completed));

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Estatísticas</h1>
        <p className="text-muted-foreground mt-1">
          A sua actividade e progresso na plataforma.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Horas totais
              </p>
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">{totalHours}h</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.4h este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Cursos concluídos
              </p>
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">{completed.length}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {inProgress.length} em progresso
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Certificados
              </p>
              <Award className="h-4 w-4 text-gold" />
            </div>
            <p className="text-2xl font-bold">2</p>
            <p className="text-xs text-muted-foreground mt-1">
              Todos válidos · STCW
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Sequência
              </p>
              <Flame className="h-4 w-4 text-amber-500" />
            </div>
            <p className="text-2xl font-bold">14</p>
            <p className="text-xs text-muted-foreground mt-1">dias seguidos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Actividade semanal — gráfico de barras */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Actividade semanal</CardTitle>
            <CardDescription>
              Horas de estudo nos últimos 7 dias · Total{" "}
              <span className="font-semibold text-foreground">
                {WEEKLY_ACTIVITY.reduce((a, d) => a + d.hours, 0).toFixed(1)}h
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-48">
              {WEEKLY_ACTIVITY.map((d) => {
                const heightPct = (d.hours / maxHours) * 100;
                return (
                  <div
                    key={d.day}
                    className="flex-1 flex flex-col items-center gap-2 group"
                  >
                    <div className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {d.hours}h
                    </div>
                    <div className="w-full flex-1 flex items-end">
                      <div
                        className="w-full bg-primary/20 group-hover:bg-primary/40 rounded-t-md transition-colors relative overflow-hidden"
                        style={{ height: `${heightPct}%` }}
                      >
                        <div className="absolute inset-x-0 bottom-0 bg-primary h-1" />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Distribuição por categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Por categoria</CardTitle>
            <CardDescription>Cursos inscritos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(categoryDist).map(([cat, count]) => {
              const pct = (count / totalEnrolled) * 100;
              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                      {CATEGORY_LABELS[cat] ?? cat}
                    </span>
                    <span className="text-muted-foreground">
                      {count} · {Math.round(pct)}%
                    </span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Progresso mensal */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso ao longo do tempo</CardTitle>
          <CardDescription>
            Cursos concluídos por mês nos últimos 5 meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <svg
            viewBox="0 0 500 200"
            className="w-full h-48"
            preserveAspectRatio="none"
          >
            {/* Linha de base */}
            <line
              x1="40"
              y1="170"
              x2="490"
              y2="170"
              stroke="currentColor"
              strokeOpacity="0.2"
            />
            {/* Pontos e linha */}
            {(() => {
              const points = MONTHLY_PROGRESS.map((m, i) => {
                const x = 60 + (i * 420) / (MONTHLY_PROGRESS.length - 1);
                const y = 170 - (m.completed / maxMonthly) * 130;
                return { x, y, ...m };
              });
              const pathD = points
                .map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
                .join(" ");
              return (
                <>
                  {/* Área sombreada */}
                  <path
                    d={`${pathD} L${points[points.length - 1].x},170 L${points[0].x},170 Z`}
                    fill="hsl(192 91% 35%)"
                    fillOpacity="0.1"
                  />
                  <path
                    d={pathD}
                    fill="none"
                    stroke="hsl(192 91% 35%)"
                    strokeWidth="2.5"
                  />
                  {points.map((p, i) => (
                    <g key={i}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="5"
                        fill="hsl(192 91% 35%)"
                      />
                      <circle cx={p.x} cy={p.y} r="2" fill="white" />
                      <text
                        x={p.x}
                        y={p.y - 12}
                        textAnchor="middle"
                        className="text-xs font-medium fill-current"
                      >
                        {p.completed}
                      </text>
                      <text
                        x={p.x}
                        y={188}
                        textAnchor="middle"
                        className="text-xs fill-muted-foreground"
                      >
                        {p.month}
                      </text>
                    </g>
                  ))}
                </>
              );
            })()}
          </svg>
        </CardContent>
      </Card>

      {/* Metas + próximos passos */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Meta do trimestre
            </CardTitle>
            <CardDescription>
              Concluir 6 cursos até ao fim de Junho
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col gap-2 min-[420px]:flex-row min-[420px]:items-end min-[420px]:justify-between">
              <p className="text-3xl font-bold">{completed.length} / 6</p>
              <Badge variant="secondary">
                {Math.round((completed.length / 6) * 100)}%
              </Badge>
            </div>
            <Progress value={(completed.length / 6) * 100} />
            <p className="text-xs text-muted-foreground">
              Faltam {6 - completed.length} cursos. Continue assim!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Datas importantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex flex-col gap-2 border-b pb-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">Revalidação STCW A-VI/3</p>
                <p className="text-xs text-muted-foreground">
                  Combate avançado a incêndios
                </p>
              </div>
              <Badge variant="warning">Em 8 meses</Badge>
            </div>
            <div className="flex flex-col gap-2 border-b pb-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">Quiz Ciber-segurança</p>
                <p className="text-xs text-muted-foreground">Avaliação final</p>
              </div>
              <Badge variant="secondary">Esta semana</Badge>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">Revalidação STCW A-VI/1</p>
                <p className="text-xs text-muted-foreground">Segurança Básica</p>
              </div>
              <Badge variant="secondary">Abril 2031</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
