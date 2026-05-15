"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("antonio.macuacua@enautica.ac.mz");
  const [password, setPassword] = React.useState("nauskill2026");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // protótipo: simula login e redirige
    setTimeout(() => {
      router.push("/painel");
    }, 600);
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Painel lateral visual */}
      <div className="hidden lg:flex flex-1 relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="inline-flex">
            <Logo className="text-white [&_*]:!text-white" />
          </Link>

          <div className="max-w-md space-y-6">
            <Anchor className="h-12 w-12 opacity-90" />
            <h2 className="text-3xl font-bold leading-tight">
              Formação contínua para o profissional marítimo moderno
            </h2>
            <p className="text-primary-foreground/80 leading-relaxed">
              Aceda aos seus cursos, acompanhe o progresso e obtenha
              certificações verificáveis — em qualquer lugar, mesmo offline.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
              <div>
                <p className="text-2xl font-bold">200+</p>
                <p className="text-xs text-primary-foreground/70">Alunos</p>
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-primary-foreground/70">Cursos</p>
              </div>
              <div>
                <p className="text-2xl font-bold">340</p>
                <p className="text-xs text-primary-foreground/70">
                  Certificados
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-primary-foreground/60">
            Incubado na Escola Superior de Ciências Náuticas
          </p>
        </div>
      </div>

      {/* Formulário */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 sm:p-6 lg:hidden">
          <Link href="/">
            <Logo />
          </Link>
          <ThemeToggle />
        </div>
        <div className="hidden lg:flex justify-end p-6">
          <ThemeToggle />
        </div>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">Bem-vindo</h1>
              <p className="text-sm text-muted-foreground">
                Entre na sua conta para continuar a sua formação.
              </p>
            </div>

            <Card>
              <CardContent className="p-5 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="o.seu.email@exemplo.mz"
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Palavra-passe</Label>
                      <Link
                        href="#"
                        className="text-xs text-primary hover:underline"
                      >
                        Esqueci-me
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-9 pr-9"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={
                          showPassword ? "Esconder palavra-passe" : "Mostrar palavra-passe"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "A entrar…" : "Entrar"}
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </Button>

                  <div className="rounded-md bg-secondary/50 border border-primary/20 p-3 text-xs text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">
                      Modo demonstração
                    </p>
                    <p>
                      Use as credenciais já preenchidas ou clique directamente em
                      &quot;Entrar&quot;.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground">
              Ainda não tem conta?{" "}
              <Link href="/registo" className="text-primary font-medium hover:underline">
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
