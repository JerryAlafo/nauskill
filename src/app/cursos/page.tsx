import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { CourseList } from "@/components/shared/course-list";
import { COURSES } from "@/data/courses";
import { Badge } from "@/components/ui/badge";

export default function CatalogoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 sm:py-12">
            <Badge variant="outline" className="mb-3">
              Catálogo
            </Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Cursos para profissionais marítimos
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Conteúdos alinhados com a Convenção STCW e competências
              emergentes. Em português, com suporte offline e certificação
              verificável.
            </p>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <CourseList courses={COURSES} basePath="/cursos" />
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
