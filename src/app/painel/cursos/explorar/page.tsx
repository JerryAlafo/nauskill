import { CourseList } from "@/components/shared/course-list";
import { COURSES } from "@/data/courses";
import { COURSE_PROGRESS } from "@/data/user";

export default function ExplorarPage() {
  const progressMap = Object.fromEntries(
    COURSE_PROGRESS.map((p) => [p.courseId, p.progressPercent])
  );

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Explorar cursos</h1>
        <p className="text-muted-foreground mt-1">
          Todos os cursos disponíveis na plataforma.
        </p>
      </div>
      <CourseList
        courses={COURSES}
        basePath="/painel/cursos"
        progressMap={progressMap}
      />
    </div>
  );
}
