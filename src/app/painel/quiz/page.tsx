import Link from "next/link";
import {
  BrainCircuit,
  Sparkles,
  Clock,
  ChevronRight,
  CheckCircle2,
  Anchor,
  Zap,
  Target,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COURSES, CATEGORY_LABELS } from "@/data/courses";
import { QUIZZES } from "@/data/quizzes";

const CATEGORY_META: Record<string, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  "stcw-basic":    { color: "text-cyan-700 dark:text-cyan-400",    bg: "bg-cyan-500/10",    border: "border-cyan-500/30",    icon: ShieldCheck },
  "stcw-advanced": { color: "text-blue-700 dark:text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/30",    icon: Zap },
  "stcw-officer":  { color: "text-indigo-700 dark:text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30", icon: Anchor },
  tanker:          { color: "text-amber-700 dark:text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/30",   icon: Target },
  passenger:       { color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: Target },
  polar:           { color: "text-sky-700 dark:text-sky-400",       bg: "bg-sky-500/10",     border: "border-sky-500/30",     icon: Target },
  emerging:        { color: "text-violet-700 dark:text-violet-400", bg: "bg-violet-500/10",  border: "border-violet-500/30",  icon: BrainCircuit },
  leadership:      { color: "text-rose-700 dark:text-rose-400",     bg: "bg-rose-500/10",    border: "border-rose-500/30",    icon: Target },
};

const FALLBACK_META = { color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", icon: BrainCircuit };

// Agrupar cursos por categoria
const grouped = COURSES.reduce<Record<string, typeof COURSES>>((acc, c) => {
  if (!acc[c.category]) acc[c.category] = [];
  acc[c.category].push(c);
  return acc;
}, {});

const CATEGORY_ORDER = ["stcw-basic", "stcw-advanced", "stcw-officer", "tanker", "passenger", "polar", "emerging", "leadership"];

export default function QuizHubPage() {
  const totalCourses = COURSES.length;
  const staticCount = Object.keys(QUIZZES).length;
  const aiCount = totalCourses - staticCount;

  return (
    <div className="space-y-8 max-w-6xl">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-cyan-600 to-blue-700 p-6 text-white sm:p-10">
        {/* Decoração de fundo */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute right-24 bottom-4 h-24 w-24 rounded-full bg-white/5" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Quiz gerado por Inteligência Artificial
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Teste os seus conhecimentos
            </h1>
            <p className="max-w-lg text-white/80 leading-relaxed">
              Avaliações técnicas alinhadas com a Convenção STCW, geradas em tempo real por IA para cada curso. Prepare-se para revalidações e exames com perguntas reais de nível profissional.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-2 shrink-0">
            <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm lg:text-left lg:flex lg:items-center lg:gap-3">
              <p className="text-2xl font-bold lg:text-xl">{totalCourses}</p>
              <p className="text-xs text-white/70 lg:text-xs">quizzes disponíveis</p>
            </div>
            <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm lg:text-left lg:flex lg:items-center lg:gap-3">
              <p className="text-2xl font-bold text-yellow-300 lg:text-xl">{aiCount}</p>
              <p className="text-xs text-white/70">gerados por IA</p>
            </div>
            <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm lg:text-left lg:flex lg:items-center lg:gap-3">
              <p className="text-2xl font-bold text-green-300 lg:text-xl">6</p>
              <p className="text-xs text-white/70">perguntas por quiz</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Como funciona ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: BrainCircuit, title: "IA Especializada", desc: "Modelo de linguagem treinado com conhecimento marítimo STCW e IMO gera perguntas de nível profissional." },
          { icon: Target, title: "Feedback Imediato", desc: "Cada resposta inclui uma explicação técnica detalhada para reforçar a aprendizagem." },
          { icon: CheckCircle2, title: "Prepare a Revalidação", desc: "Perguntas alinhadas com as tabelas de competência do Código STCW e regulamentos IMO." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex gap-3 rounded-xl border bg-card p-4">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">{title}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Quizzes por categoria ── */}
      <div className="space-y-8">
        {CATEGORY_ORDER.filter((cat) => grouped[cat]).map((cat) => {
          const courses = grouped[cat];
          const meta = CATEGORY_META[cat] ?? FALLBACK_META;
          const CatIcon = meta.icon;

          return (
            <section key={cat}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`h-7 w-7 rounded-md flex items-center justify-center ${meta.bg}`}>
                  <CatIcon className={`h-4 w-4 ${meta.color}`} />
                </div>
                <h2 className="font-semibold text-lg">{CATEGORY_LABELS[cat] ?? cat}</h2>
                <Badge variant="secondary" className="ml-auto">{courses.length} quizzes</Badge>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {courses.map((course) => {
                  const hasStatic = !!QUIZZES[course.id];
                  return (
                    <div
                      key={course.id}
                      className={`group relative flex flex-col rounded-xl border ${meta.border} bg-card overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5`}
                    >
                      {/* Barra de cor no topo */}
                      <div className={`h-1 w-full ${meta.bg.replace("/10", "/60")}`}
                        style={{ background: `hsl(${course.thumbnailHue})`, opacity: 0.7 }}
                      />

                      <div className="flex flex-col gap-3 p-4 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1 min-w-0">
                            {course.stcwReference && (
                              <p className={`text-[10px] font-bold uppercase tracking-wider ${meta.color}`}>
                                {course.stcwReference}
                              </p>
                            )}
                            <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                              {course.title}
                            </h3>
                          </div>
                          {hasStatic ? (
                            <Badge variant="outline" className="shrink-0 text-[10px]">Fixo</Badge>
                          ) : (
                            <Badge variant="secondary" className="shrink-0 text-[10px] gap-1">
                              <Sparkles className="h-2.5 w-2.5" />IA
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                          {course.shortDescription}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BrainCircuit className="h-3 w-3" />
                            6 perguntas
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            ~10 min
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            70% mín.
                          </span>
                        </div>

                        <Button asChild size="sm" className="w-full mt-auto" variant="outline">
                          <Link href={`/painel/cursos/${course.slug}/quiz`}>
                            Iniciar quiz
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* ── Nota sobre IA ── */}
      <div className="flex gap-3 rounded-xl border border-dashed bg-muted/30 p-4 text-sm text-muted-foreground">
        <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <p>
          Os quizzes marcados com <span className="font-medium text-foreground">IA</span> são gerados em tempo real pelo modelo <span className="font-medium text-foreground">Gemini 2.0 Flash</span> com base no conteúdo técnico de cada curso. As perguntas estão alinhadas com os regulamentos STCW, IMO e SOLAS mais recentes.
        </p>
      </div>
    </div>
  );
}
