"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Trophy,
  BarChart3,
  User,
  LogOut,
  Anchor,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

export const appNavItems = [
  { href: "/painel", label: "Painel", icon: LayoutDashboard },
  { href: "/painel/cursos", label: "Os meus cursos", icon: BookOpen },
  { href: "/painel/certificados", label: "Certificados", icon: Award },
  { href: "/painel/ranking", label: "Ranking", icon: Trophy },
  { href: "/painel/estatisticas", label: "Estatísticas", icon: BarChart3 },
  { href: "/painel/perfil", label: "Perfil", icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r bg-card">
      <div className="h-16 border-b flex items-center px-6">
        <Link href="/painel">
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {appNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/painel" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4 space-y-3">
        <div className="rounded-lg bg-primary/5 p-3 text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-primary font-medium">
            <Anchor className="h-3 w-3" />
            <span>Próxima revalidação</span>
          </div>
          <p className="text-muted-foreground">
            Segurança Básica STCW
          </p>
          <p className="text-foreground font-medium">Abril 2031</p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Terminar sessão
        </Link>
      </div>
    </aside>
  );
}
