"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogIn, Menu } from "lucide-react";

const marketingNavItems = [
  { href: "/#funcionalidades", label: "Funcionalidades" },
  { href: "/cursos", label: "Cursos" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/verificar", label: "Verificar certificado" },
];

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-2 px-3 sm:px-6 lg:px-8 max-w-7xl">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {marketingNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/login">
              <LogIn className="h-4 w-4" />
              Entrar
            </Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/registo">Criar conta</Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="left-auto right-0 top-0 h-dvh w-[min(20rem,calc(100vw-2rem))] max-w-none translate-x-0 translate-y-0 gap-0 rounded-none border-y-0 border-r-0 p-0 sm:rounded-none">
              <DialogTitle className="sr-only">Menu principal</DialogTitle>
              <DialogDescription className="sr-only">
                Navegação pública da plataforma NAUSKILL.
              </DialogDescription>

              <div className="flex h-16 items-center border-b px-5">
                <Link href="/">
                  <Logo />
                </Link>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {marketingNavItems.map((item) => (
                  <DialogClose key={item.href} asChild>
                    <Link
                      href={item.href}
                      className="flex rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </DialogClose>
                ))}
              </nav>

              <div className="border-t p-4 space-y-2">
                <DialogClose asChild>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/login">
                      <LogIn className="h-4 w-4" />
                      Entrar
                    </Link>
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button asChild className="w-full">
                    <Link href="/registo">Criar conta</Link>
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
