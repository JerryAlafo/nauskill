"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/shared/course-card";
import { COURSE_PROGRESS } from "@/data/user";
import { COURSES, getCourseById } from "@/data/courses";

export default function MeusCursosPage() {
  const [query, setQuery] = React.useState("");

  const enrolledIds = COURSE_PROGRESS.map((p) => p.courseId);
  const progressMap = Object.fromEntries(
    COURSE_PROGRESS.map((p) => [p.courseId, p.progressPercent])
  );

  function filterByStatus(status: "all" | "in-progress" | "completed" | "not-started") {
    return COURSE_PROGRESS.filter((p) => status === "all" || p.status === status)
      .map((p) => getCourseById(p.courseId)!)
      .filter(Boolean)
      .filter(
        (c) =>
          !query || c.title.toLowerCase().includes(query.toLowerCase())
      );
  }

  const inProgress = filterByStatus("in-progress");
  const completed = filterByStatus("completed");
  const notStarted = filterByStatus("not-started");

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Os meus cursos</h1>
          <p className="text-muted-foreground mt-1">
            {enrolledIds.length} cursos · {completed.length} concluídos
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/painel/cursos/explorar">
            <BookOpen className="h-4 w-4" />
            Explorar catálogo
          </Link>
        </Button>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar nos meus cursos…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <Tabs defaultValue="in-progress">
        <TabsList>
          <TabsTrigger value="in-progress">
            Em progresso ({inProgress.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Concluídos ({completed.length})
          </TabsTrigger>
          <TabsTrigger value="not-started">
            Por iniciar ({notStarted.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="in-progress" className="mt-6">
          <CourseGrid courses={inProgress} progressMap={progressMap} />
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <CourseGrid courses={completed} progressMap={progressMap} />
        </TabsContent>
        <TabsContent value="not-started" className="mt-6">
          <CourseGrid courses={notStarted} progressMap={progressMap} />
        </TabsContent>
      </Tabs>

      {/* Sugestões — outros cursos do catálogo */}
      <Card>
        <CardHeader>
          <CardTitle>Sugestões para si</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COURSES.filter((c) => !enrolledIds.includes(c.id))
              .slice(0, 3)
              .map((c) => (
                <CourseCard
                  key={c.id}
                  course={c}
                  href={`/painel/cursos/${c.slug}`}
                />
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CourseGrid({
  courses,
  progressMap,
}: {
  courses: ReturnType<typeof getCourseById>[];
  progressMap: Record<string, number>;
}) {
  if (courses.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground sm:p-12">
        Nenhum curso nesta categoria.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {courses.map(
        (c) =>
          c && (
            <CourseCard
              key={c.id}
              course={c}
              href={`/painel/cursos/${c.slug}`}
              progressPercent={progressMap[c.id]}
            />
          )
      )}
    </div>
  );
}
