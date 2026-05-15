"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Briefcase, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Logo } from "@/components/shared/logo"
import api from "@/lib/api"

export default function OnboardingPage() {
  const router = useRouter()
  const { update } = useSession()
  const [cargo, setCargo] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await api.patch("/user/profile", { role: cargo })
      await update({ role: cargo })
      router.push("/painel")
    } catch {
      setError("Erro ao guardar. Tente novamente.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <Logo />
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Falta um passo</CardTitle>
            <CardDescription>
              Diga-nos o seu cargo ou função a bordo para personalizarmos a sua experiência.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2">
                  {error}
                </p>
              )}

              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo / Função</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cargo"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    placeholder="ex: Oficial Chefe, Imediato, Maquinista…"
                    className="pl-9"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "A guardar…" : "Concluir configuração"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Pode alterar isto a qualquer momento nas definições do perfil.
        </p>
      </div>
    </div>
  )
}
