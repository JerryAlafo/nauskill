export type CourseCategory =
  | "stcw-basic"
  | "stcw-advanced"
  | "stcw-officer"
  | "tanker"
  | "passenger"
  | "polar"
  | "emerging"
  | "leadership";

export type CourseLevel = "Básico" | "Intermédio" | "Avançado";

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  durationHours: number;
  moduleCount: number;
  stcwReference?: string; // ex. "STCW A-VI/1"
  isPremium: boolean;
  isOfflineAvailable: boolean;
  instructor: string;
  rating: number; // 0-5
  enrolledCount: number;
  thumbnailHue: string; // valor hsl para placeholder visual
  tags: string[];
}

export interface CourseProgress {
  courseId: string;
  completedModules: number;
  totalModules: number;
  progressPercent: number;
  lastAccessedAt: string; // ISO
  status: "not-started" | "in-progress" | "completed";
}

export interface Certificate {
  id: string;
  serial: string; // ex. NSK-2026-000123
  courseId: string;
  courseTitle: string;
  holderName: string;
  holderId: string;
  issuedAt: string; // ISO
  expiresAt?: string; // ISO — STCW válido por 5 anos
  stcwReference?: string;
  hoursCompleted: number;
  finalScore: number; // 0-100
  verificationCode: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  passingScore: number; // 0-100
  questions: QuizQuestion[];
}

export interface RankingEntry {
  rank: number;
  userId: string;
  name: string;
  initials: string;
  pointsTotal: number;
  coursesCompleted: number;
  isCurrentUser?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string; // ex. "Oficial Chefe"
  vesselType?: string; // ex. "Cargueiro"
  employer?: string;
  joinedAt: string;
  avatarInitials: string;
}
