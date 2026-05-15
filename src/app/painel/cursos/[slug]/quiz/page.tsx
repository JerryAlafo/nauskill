"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Award,
  RefreshCcw,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getCourseBySlug } from "@/data/courses";
import { getQuizForCourse } from "@/data/quizzes";

export default function QuizPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const course = getCourseBySlug(params.slug);
  const quiz = course ? getQuizForCourse(course.id) : undefined;

  const [stage, setStage] = React.useState<"intro" | "running" | "result">(
    "intro"
  );
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [showFeedback, setShowFeedback] = React.useState(false);

  if (!course || !quiz) {
    return (
      <div className="max-w-3xl">
        <p>Quiz não disponível.</p>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentIdx];
  const totalQuestions = quiz.questions.length;
  const selectedAnswer = answers[currentQuestion?.id];
  const isCorrect = selectedAnswer === currentQuestion?.correctIndex;

  const correctCount = quiz.questions.reduce(
    (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
    0
  );
  const score = Math.round((correctCount / totalQuestions) * 100);
  const passed = score >= quiz.passingScore;

  function handleSelect(value: string) {
    setAnswers({ ...answers, [currentQuestion.id]: parseInt(value, 10) });
  }

  function handleNext() {
    if (!showFeedback) {
      setShowFeedback(true);
      return;
    }
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowFeedback(false);
    } else {
      setStage("result");
    }
  }

  function handleRestart() {
    setStage("intro");
    setCurrentIdx(0);
    setAnswers({});
    setShowFeedback(false);
  }

  // === INTRO ===
  if (stage === "intro") {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          href={`/painel/cursos/${course.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao curso
        </Link>

        <Card>
          <CardContent className="p-5 text-center space-y-6 sm:p-8">
            <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Award className="h-8 w-8" />
            </div>
            <div>
              <Badge variant="outline" className="mb-3">
                Avaliação final
              </Badge>
              <h1 className="text-2xl font-bold">{quiz.title}</h1>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Conclua com sucesso para receber o certificado digital.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-4 max-w-md mx-auto min-[420px]:grid-cols-3 min-[420px]:gap-4">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Perguntas</p>
                <p className="text-xl font-bold mt-1">{totalQuestions}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Nota mínima</p>
                <p className="text-xl font-bold mt-1">{quiz.passingScore}%</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Duração</p>
                <p className="text-xl font-bold mt-1">15min</p>
              </div>
            </div>

            <div className="text-left max-w-md mx-auto space-y-2 text-sm text-muted-foreground border-t pt-6">
              <p className="font-medium text-foreground">Antes de começar:</p>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>Cada pergunta tem uma única resposta correcta.</li>
                <li>Receberá feedback imediato após cada resposta.</li>
                <li>Pode refazer o quiz tantas vezes quanto necessário.</li>
              </ul>
            </div>

            <Button size="lg" onClick={() => setStage("running")} className="w-full sm:w-auto">
              Começar avaliação
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // === RUNNING ===
  if (stage === "running") {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/painel/cursos/${course.slug}`}
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Sair do quiz
          </Link>
          <Badge variant="secondary">
            <Clock className="h-3 w-3" />
            14:32
          </Badge>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-muted-foreground">
              Pergunta {currentIdx + 1} de {totalQuestions}
            </span>
            <span className="font-medium text-primary">
              {Math.round(((currentIdx + 1) / totalQuestions) * 100)}%
            </span>
          </div>
          <Progress value={((currentIdx + 1) / totalQuestions) * 100} />
        </div>

        <Card>
          <CardContent className="p-5 space-y-6 sm:p-8">
            <h2 className="text-xl font-semibold leading-tight">
              {currentQuestion.question}
            </h2>

            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={handleSelect}
              disabled={showFeedback}
              className="space-y-2"
            >
              {currentQuestion.options.map((option, idx) => {
                const isThisCorrect = idx === currentQuestion.correctIndex;
                const isThisSelected = selectedAnswer === idx;
                const showCorrect = showFeedback && isThisCorrect;
                const showWrong =
                  showFeedback && isThisSelected && !isThisCorrect;

                return (
                  <Label
                    key={idx}
                    htmlFor={`opt-${idx}`}
                    className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                      showCorrect
                        ? "border-green-500 bg-green-500/5"
                        : showWrong
                        ? "border-destructive bg-destructive/5"
                        : isThisSelected
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/40"
                    }`}
                  >
                    <RadioGroupItem
                      value={idx.toString()}
                      id={`opt-${idx}`}
                      className="mt-0.5"
                    />
                    <span className="flex-1 text-sm font-normal">{option}</span>
                    {showCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                    )}
                    {showWrong && (
                      <XCircle className="h-5 w-5 text-destructive shrink-0" />
                    )}
                  </Label>
                );
              })}
            </RadioGroup>

            {showFeedback && (
              <div
                className={`rounded-lg border p-4 ${
                  isCorrect
                    ? "border-green-500/30 bg-green-500/5"
                    : "border-amber-500/30 bg-amber-500/5"
                }`}
              >
                <p
                  className={`font-medium text-sm mb-1 ${
                    isCorrect
                      ? "text-green-700 dark:text-green-400"
                      : "text-amber-700 dark:text-amber-400"
                  }`}
                >
                  {isCorrect ? "Resposta correcta!" : "Resposta incorrecta"}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3 pt-4 border-t sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                {Object.keys(answers).length} de {totalQuestions} respondidas
              </p>
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === undefined}
                className="w-full sm:w-auto"
              >
                {!showFeedback
                  ? "Confirmar resposta"
                  : currentIdx < totalQuestions - 1
                  ? "Próxima pergunta"
                  : "Ver resultado"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // === RESULT ===
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-5 text-center space-y-6 sm:p-8">
          <div
            className={`h-20 w-20 rounded-full flex items-center justify-center mx-auto ${
              passed
                ? "bg-green-500/15 text-green-600"
                : "bg-amber-500/15 text-amber-600"
            }`}
          >
            {passed ? (
              <Award className="h-10 w-10" />
            ) : (
              <RefreshCcw className="h-10 w-10" />
            )}
          </div>

          <div>
            <Badge variant={passed ? "success" : "warning"} className="mb-2">
              {passed ? "Aprovado" : "Não aprovado"}
            </Badge>
            <h1 className="text-3xl font-bold">{score}%</h1>
            <p className="text-muted-foreground mt-2">
              {correctCount} de {totalQuestions} respostas correctas · nota
              mínima {quiz.passingScore}%
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 max-w-md mx-auto min-[420px]:grid-cols-3">
            <div className="rounded-lg bg-green-500/10 p-3">
              <p className="text-xs text-muted-foreground">Correctas</p>
              <p className="text-xl font-bold text-green-700 dark:text-green-400">
                {correctCount}
              </p>
            </div>
            <div className="rounded-lg bg-destructive/10 p-3">
              <p className="text-xs text-muted-foreground">Erradas</p>
              <p className="text-xl font-bold text-destructive">
                {totalQuestions - correctCount}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs text-muted-foreground">Pontos</p>
              <p className="text-xl font-bold">{correctCount * 100}</p>
            </div>
          </div>

          {passed ? (
            <div className="bg-primary/5 border border-primary/30 rounded-lg p-4 text-left max-w-md mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-primary" />
                <p className="font-medium">Certificado disponível</p>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                O seu certificado digital de conclusão foi emitido e está
                disponível na sua área pessoal.
              </p>
              <Button asChild size="sm" className="w-full">
                <Link href="/painel/certificados/cert-001">
                  Ver certificado
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Reveja os módulos do curso e tente novamente. Pode refazer o quiz
              quantas vezes precisar.
            </p>
          )}

          <div className="flex flex-col gap-3 justify-center pt-4 sm:flex-row sm:flex-wrap">
            <Button variant="outline" onClick={handleRestart} className="w-full sm:w-auto">
              <RefreshCcw className="h-4 w-4" />
              Refazer quiz
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href={`/painel/cursos/${course.slug}`}>
                Voltar ao curso
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
