import Link from "next/link";
import { Clock, BookOpen, WifiOff, Star, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/types";
import { CATEGORY_LABELS } from "@/data/courses";

interface CourseCardProps {
  course: Course;
  href: string;
  progressPercent?: number;
}

export function CourseCard({ course, href, progressPercent }: CourseCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="overflow-hidden h-full hover:border-primary/40 transition-all hover:shadow-md">
        {/* Thumbnail */}
        <div
          className="h-32 relative flex items-center justify-center text-white"
          style={{ backgroundColor: `hsl(${course.thumbnailHue})` }}
        >
          <BookOpen className="h-12 w-12 opacity-80" />
          <div className="absolute top-3 right-3 flex gap-1.5">
            {course.isOfflineAvailable && (
              <span
                className="bg-black/30 backdrop-blur rounded-full p-1.5"
                title="Disponível offline"
              >
                <WifiOff className="h-3 w-3" />
              </span>
            )}
            {course.isPremium && (
              <Badge variant="gold" className="text-[10px]">
                <Lock className="h-2.5 w-2.5" />
                Premium
              </Badge>
            )}
          </div>
          {progressPercent !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
              <div
                className="h-full bg-white transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>

        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-[10px]">
              {CATEGORY_LABELS[course.category]}
            </Badge>
            {course.stcwReference && (
              <Badge variant="secondary" className="text-[10px]">
                {course.stcwReference}
              </Badge>
            )}
          </div>

          <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>

          <div className="flex items-center justify-between gap-3 pt-3 border-t text-xs text-muted-foreground">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {course.durationHours}h
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {course.moduleCount}
              </span>
            </div>
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <Star className="h-3 w-3 fill-current" />
              {course.rating.toFixed(1)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
