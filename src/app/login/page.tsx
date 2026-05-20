"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

// useSearchParams exige Suspense no Next.js 15 — isolado neste componente filho
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/painel";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [turnstileToken, setTurnstileToken] = React.useState("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", { email, password, turnstileToken, redirect: false });
    if (result?.error) {
      setError("Email ou palavra-passe incorretos.");
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    setError("");
    await signIn("google", { callbackUrl });
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Bem-vindo</h1>
        <p className="text-sm text-muted-foreground">
          Entre na sua conta para continuar a sua formação.
        </p>
      </div>

      <Button type="button" variant="outline" className="w-full gap-2" onClick={handleGoogle} disabled={googleLoading || loading}>
        <GoogleIcon />
        {googleLoading ? "A redirecionar…" : "Continuar com Google"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">ou com email</span>
        </div>
      </div>

      <Card>
        <CardContent className="p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2">{error}</p>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="o.seu.email@exemplo.mz" className="pl-9" required autoComplete="email" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Palavra-passe</Label>
                <Link href="#" className="text-xs text-primary hover:underline">Esqueci-me</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-9 pr-9" required autoComplete="current-password" />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={showPassword ? "Esconder" : "Mostrar"}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {siteKey && (
              <Turnstile
                siteKey={siteKey}
                onSuccess={setTurnstileToken}
                onExpire={() => setTurnstileToken("")}
                options={{ theme: "auto", size: "flexible" }}
              />
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading || googleLoading || (!!siteKey && !turnstileToken)}
            >
              {loading ? "A entrar…" : "Entrar"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Ainda não tem conta?{" "}
        <Link href="/registo" className="text-primary font-medium hover:underline">Criar conta</Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Painel lateral */}
      <div className="hidden lg:flex flex-1 relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-white/5" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="inline-flex"><Logo className="text-white [&_*]:!text-white" /></Link>
          <div className="max-w-md space-y-6">
            <Anchor className="h-12 w-12 opacity-90" />
            <h2 className="text-3xl font-bold leading-tight">
              Formação contínua para o profissional marítimo moderno
            </h2>
            <p className="text-primary-foreground/80 leading-relaxed">
              Aceda aos seus cursos, acompanhe o progresso e obtenha certificações verificáveis — em qualquer lugar, mesmo offline.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
              <div><p className="text-2xl font-bold">200+</p><p className="text-xs text-primary-foreground/70">Alunos</p></div>
              <div><p className="text-2xl font-bold">12</p><p className="text-xs text-primary-foreground/70">Cursos</p></div>
              <div><p className="text-2xl font-bold">340</p><p className="text-xs text-primary-foreground/70">Certificados</p></div>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/60">Incubado na Escola Superior de Ciências Náuticas</p>
        </div>
      </div>

      {/* Formulário */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 sm:p-6 lg:hidden">
          <Link href="/"><Logo /></Link>
          <ThemeToggle />
        </div>
        <div className="hidden lg:flex justify-end p-6"><ThemeToggle /></div>
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
          <React.Suspense fallback={null}>
            <LoginForm />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}
