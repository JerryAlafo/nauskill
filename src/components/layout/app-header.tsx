"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search, Menu, LogOut, Anchor } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Logo } from "@/components/shared/logo";
import { appNavItems } from "@/components/layout/app-sidebar";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import { ComingSoonButton } from "@/components/shared/coming-soon";

export function AppHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const name = session?.user?.name ?? "Utilizador";
  const role = session?.user?.role ?? "";
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="left-0 top-0 h-dvh w-[min(20rem,calc(100vw-2rem))] max-w-none translate-x-0 translate-y-0 gap-0 rounded-none border-y-0 border-l-0 p-0 sm:rounded-none">
              <DialogTitle className="sr-only">Menu principal</DialogTitle>
              <DialogDescription className="sr-only">
                Navegação da área do aluno NAUSKILL.
              </DialogDescription>

              <div className="flex h-16 items-center border-b px-5">
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
                    <DialogClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </Link>
                    </DialogClose>
                  );
                })}
              </nav>

              <div className="border-t p-4 space-y-3">
                <div className="rounded-lg bg-primary/5 p-3 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-primary font-medium">
                    <Anchor className="h-3 w-3" />
                    <span>Próxima revalidação</span>
                  </div>
                  <p className="text-muted-foreground">Segurança Básica STCW</p>
                  <p className="text-foreground font-medium">Abril 2031</p>
                </div>

                <DialogClose asChild>
                  <Link
                    href="/"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                    Terminar sessão
                  </Link>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          <Logo showText={false} size={28} />
        </div>

        <div className="hidden lg:flex relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Pesquisar cursos, módulos, certificados…"
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <ComingSoonButton variant="ghost" size="icon" aria-label="Notificações" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
          </ComingSoonButton>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 rounded-full hover:bg-accent px-1 py-1 transition-colors"
                aria-label="Menu do utilizador"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium leading-none">{name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>A minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/painel/perfil">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/painel/certificados">Certificados</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/painel/estatisticas">Estatísticas</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                Terminar sessão
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
