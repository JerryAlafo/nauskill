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
import { getCourseById, CATEGORY_LABELS } from "@/data/courses";
import {
  WeeklyActivityChart,
  MonthlyProgressChart,
  CategoryRadialChart,
} from "@/components/shared/stats-charts";

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

const CATEGORY_COLORS: Record<string, string> = {
  "stcw-basic":    "hsl(192 91% 35%)",
  "stcw-advanced": "hsl(210 80% 45%)",
  "stcw-officer":  "hsl(225 70% 50%)",
  tanker:          "hsl(38 92% 50%)",
  passenger:       "hsl(160 60% 40%)",
  polar:           "hsl(200 70% 55%)",
  emerging:        "hsl(270 60% 55%)",
  leadership:      "hsl(340 70% 50%)",
};

export default function EstatisticasPage() {
  const completed = COURSE_PROGRESS.filter((p) => p.status === "completed");
  const inProgress = COURSE_PROGRESS.filter((p) => p.status === "in-progress");
  const totalHours = completed.reduce((acc, p) => {
    const c = getCourseById(p.courseId);
    return acc + (c?.durationHours ?? 0);
  }, 0);

  const categoryDist = COURSE_PROGRESS.reduce<Record<string, number>>(
    (acc, p) => {
      const c = getCourseById(p.courseId);
      if (c) acc[c.category] = (acc[c.category] || 0) + 1;
      return acc;
    },
    {}
  );

  const categoryRadialData = Object.entries(categoryDist).map(([cat, count]) => ({
    name: CATEGORY_LABELS[cat] ?? cat,
    value: count,
    fill: CATEGORY_COLORS[cat] ?? "hsl(192 91% 35%)",
  }));

  const weeklyTotal = WEEKLY_ACTIVITY.reduce((a, d) => a + d.hours, 0).toFixed(1);

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
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Horas totais</p>
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
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Cursos concluídos</p>
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">{completed.length}</p>
            <p className="text-xs text-muted-foreground mt-1">{inProgress.length} em progresso</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Certificados</p>
              <Award className="h-4 w-4 text-gold" />
            </div>
            <p className="text-2xl font-bold">2</p>
            <p className="text-xs text-muted-foreground mt-1">Todos válidos · STCW</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Sequência</p>
              <Flame className="h-4 w-4 text-amber-500" />
            </div>
            <p className="text-2xl font-bold">14</p>
            <p className="text-xs text-muted-foreground mt-1">dias seguidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos principais */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Actividade semanal</CardTitle>
            <CardDescription>
              Horas de estudo nos últimos 7 dias · Total{" "}
              <span className="font-semibold text-foreground">{weeklyTotal}h</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <WeeklyActivityChart data={WEEKLY_ACTIVITY} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Por categoria</CardTitle>
            <CardDescription>Distribuição de cursos inscritos</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <CategoryRadialChart data={categoryRadialData} />
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
        <CardContent className="pt-0">
          <MonthlyProgressChart data={MONTHLY_PROGRESS} />
        </CardContent>
      </Card>

      {/* Metas + datas */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Meta do trimestre
            </CardTitle>
            <CardDescription>Concluir 6 cursos até ao fim de Junho</CardDescription>
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
                <p className="text-xs text-muted-foreground">Combate avançado a incêndios</p>
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
