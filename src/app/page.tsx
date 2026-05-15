import Link from "next/link";
import {
  Anchor,
  ShieldCheck,
  WifiOff,
  QrCode,
  GraduationCap,
  Globe2,
  ArrowRight,
  CheckCircle2,
  Users,
  BookOpen,
  Award,
} from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: GraduationCap,
    title: "Microlearning",
    description:
      "Sessões curtas e estruturadas, concebidas para utilização real a bordo e em terra.",
  },
  {
    icon: WifiOff,
    title: "Acesso offline",
    description:
      "Conteúdos descarregáveis para utilização em ambientes com conectividade limitada.",
  },
  {
    icon: QrCode,
    title: "Certificação digital",
    description:
      "Certificados verificáveis por QR Code, resistentes a fraude e auditáveis.",
  },
  {
    icon: ShieldCheck,
    title: "Alinhamento STCW",
    description:
      "Conteúdos alinhados com a Convenção STCW e exigências regulatórias internacionais.",
  },
  {
    icon: Globe2,
    title: "Em português",
    description:
      "Plataforma concebida para a África Lusófona — uma vantagem competitiva estrutural.",
  },
  {
    icon: Anchor,
    title: "Competências emergentes",
    description:
      "Ciber-segurança marítima, gestão de emissões, navegação electrónica avançada.",
  },
];

const stats = [
  { value: "+50.000", label: "marítimos activos nos PALOP" },
  { value: "<30%", label: "com formação STCW actualizada" },
  { value: "70%+", label: "da oferta é cara ou inacessível" },
];

const comparison = [
  { feature: "Língua de instrução", traditional: "Inglês (maioria)", nauskill: "Português" },
  { feature: "Acesso offline", traditional: "Não", nauskill: "Sim" },
  { feature: "Modelo pedagógico", traditional: "Presencial / periódico", nauskill: "Microlearning contínuo" },
  { feature: "Certificação digital verificável", traditional: "Não", nauskill: "Sim" },
  { feature: "Competências emergentes", traditional: "Raro", nauskill: "Integradas" },
  { feature: "Custo", traditional: "Elevado / presencial", nauskill: "Subscrição acessível" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-wave-light dark:bg-wave-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-14 sm:py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                  Formação marítima{" "}
                  <span className="text-primary">para o futuro</span> do
                  trabalho a bordo
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Plataforma digital de upskilling, revalidação STCW e
                  desenvolvimento profissional para marítimos da África Lusófona
                  em português, com suporte offline e certificação verificável.
                </p>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/registo">
                      Começar gratuitamente
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                    <Link href="/cursos">Ver catálogo</Link>
                  </Button>
                </div>

                <div className="flex flex-col gap-2 pt-4 text-xs text-muted-foreground min-[420px]:flex-row min-[420px]:items-center min-[420px]:gap-6">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>1 módulo gratuito</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Sem cartão de crédito</span>
                  </div>
                </div>
              </div>

              {/* Visual lateral: card empilhado mostrando certificado */}
              <div className="relative hidden lg:block">
                <div className="absolute -top-4 -right-4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative grid gap-4">
                  <Card className="overflow-hidden border-2 border-primary/20 shadow-xl">
                    <div className="h-2 bg-primary" />
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-primary" />
                          <span className="text-xs font-medium tracking-wider text-muted-foreground">
                            CERTIFICADO DIGITAL
                          </span>
                        </div>
                        <Badge variant="gold" className="text-[10px]">
                          STCW A-VI/1
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Certifica-se que
                        </p>
                        <p className="font-semibold text-lg">
                          António Macuácua
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          concluiu com aproveitamento
                        </p>
                        <p className="font-medium text-primary">
                          Segurança Básica STCW
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t text-xs">
                        <div>
                          <p className="text-muted-foreground">Serial</p>
                          <p className="font-mono font-medium">
                            NSK-2026-000184
                          </p>
                        </div>
                        <div className="h-12 w-12 bg-foreground rounded flex items-center justify-center">
                          <QrCode className="h-8 w-8 text-background" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-3 gap-3">
                    <Card className="p-3 text-center">
                      <Users className="h-4 w-4 mx-auto text-primary mb-1" />
                      <p className="text-xs text-muted-foreground">Alunos</p>
                      <p className="text-sm font-semibold">200+</p>
                    </Card>
                    <Card className="p-3 text-center">
                      <BookOpen className="h-4 w-4 mx-auto text-primary mb-1" />
                      <p className="text-xs text-muted-foreground">Cursos</p>
                      <p className="text-sm font-semibold">12</p>
                    </Card>
                    <Card className="p-3 text-center">
                      <Award className="h-4 w-4 mx-auto text-primary mb-1" />
                      <p className="text-xs text-muted-foreground">Emitidos</p>
                      <p className="text-sm font-semibold">340</p>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problema */}
        <section className="border-y bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 sm:py-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="mb-3">
                O Problema
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Uma necessidade crítica ainda por resolver
              </h2>
              <p className="text-muted-foreground mt-3">
                O sector marítimo africano enfrenta uma lacuna estrutural na
                formação contínua e revalidação de competências.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((s) => (
                <Card key={s.label} className="text-center">
                  <CardContent className="p-8">
                    <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                      {s.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Funcionalidades */}
        <section id="funcionalidades" className="py-14 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="mb-3">
                A solução
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Concebida para a realidade do{" "}
                <span className="text-primary">profissional marítimo</span>
              </h2>
              <p className="text-muted-foreground mt-3">
                Cada funcionalidade responde a uma exigência real do sector,
                desde o acesso offline até à conformidade regulatória.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <Card
                    key={f.title}
                    className="group hover:border-primary/40 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold mb-2">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {f.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Diferenciação */}
        <section id="sobre" className="bg-muted/30 border-y py-14 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="mb-3">
                Diferenciação
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Por que o NAUSKILL?
              </h2>
              <p className="text-muted-foreground mt-3">
                Comparação com a oferta formativa tradicional disponível no
                mercado.
              </p>
            </div>

            <Card className="overflow-hidden max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-6 py-4 font-medium">
                        Característica
                      </th>
                      <th className="text-left px-6 py-4 font-medium text-muted-foreground">
                        Oferta tradicional
                      </th>
                      <th className="text-left px-6 py-4 font-medium text-primary">
                        NAUSKILL
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {comparison.map((row) => (
                      <tr key={row.feature} className="hover:bg-muted/30">
                        <td className="px-6 py-4 font-medium">{row.feature}</td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {row.traditional}
                        </td>
                        <td className="px-6 py-4 text-primary font-medium">
                          {row.nauskill}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-14 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Card className="bg-primary text-primary-foreground border-0 overflow-hidden relative">
              <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10" />
              <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/5" />
              <CardContent className="p-6 sm:p-12 lg:p-16 relative">
                <div className="max-w-2xl">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                    Pronto para revalidar as suas competências?
                  </h2>
                  <p className="text-primary-foreground/90 text-base sm:text-lg mb-8">
                    Comece com um módulo gratuito. Sem compromisso, sem cartão
                    de crédito.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button
                      asChild
                      size="lg"
                      variant="secondary"
                      className="w-full bg-white text-primary hover:bg-white/90 sm:w-auto"
                    >
                      <Link href="/registo">
                        Criar conta gratuita
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
                    >
                      <Link href="/cursos">Explorar cursos</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
