"use client";

import * as React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/shared/course-card";
import type { Course } from "@/types";
import { CATEGORY_LABELS } from "@/data/courses";

interface CourseListProps {
  courses: Course[];
  basePath: string;
  progressMap?: Record<string, number>;
}

const CATEGORIES = [
  { value: "all", label: "Todos" },
  { value: "stcw-basic", label: "STCW Básico" },
  { value: "stcw-advanced", label: "STCW Avançado" },
  { value: "emerging", label: "Competências emergentes" },
  { value: "leadership", label: "Liderança" },
];

export function CourseList({
  courses,
  basePath,
  progressMap = {},
}: CourseListProps) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("all");

  const filtered = courses.filter((c) => {
    const matchesQuery =
      !query ||
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = category === "all" || c.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar cursos…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = category === c.value;
          return (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors sm:text-sm ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "curso" : "cursos"}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">
            Nenhum curso encontrado para os filtros aplicados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              href={`${basePath}/${course.slug}`}
              progressPercent={progressMap[course.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
