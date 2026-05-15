import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  Anchor,
} from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CertificateView } from "@/components/shared/certificate-view";
import { CERTIFICATES } from "@/data/certificates";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ codigo: string }>;
}

export function generateStaticParams() {
  return CERTIFICATES.map((c) => ({ codigo: c.verificationCode }));
}

export default async function VerificarCodigoPage({ params }: PageProps) {
  const { codigo } = await params;
  const cert = CERTIFICATES.find(
    (c) => c.verificationCode.toUpperCase() === codigo.toUpperCase()
  );

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />

      <main className="flex-1 py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-6">
          <Link
            href="/verificar"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Nova verificação
          </Link>

          {!cert ? (
            <Card className="border-destructive/40 bg-destructive/5">
              <CardContent className="p-5 text-center space-y-4 sm:p-8">
                <div className="h-16 w-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
                  <ShieldAlert className="h-8 w-8" />
                </div>
                <Badge variant="danger">Certificado não encontrado</Badge>
                <h1 className="text-2xl font-bold">
                  Código de verificação inválido
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                  O código{" "}
                  <span className="font-mono font-semibold">{codigo}</span> não
                  corresponde a nenhum certificado emitido pela plataforma
                  NAUSKILL. Verifique se o código está correcto e tente
                  novamente.
                </p>
                <Button asChild>
                  <Link href="/verificar">Nova verificação</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="border-green-500/40 bg-green-500/5">
                <CardContent className="p-5 flex flex-col items-start gap-4 sm:flex-row sm:p-6">
                  <div className="h-12 w-12 rounded-full bg-green-500/15 text-green-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <Badge variant="success">Certificado autêntico</Badge>
                      <Badge variant="success">
                        <CheckCircle2 className="h-3 w-3" />
                        Válido
                      </Badge>
                      {cert.stcwReference && (
                        <Badge variant="outline">
                          <Anchor className="h-3 w-3" />
                          {cert.stcwReference}
                        </Badge>
                      )}
                    </div>
                    <h1 className="text-xl font-bold mb-1">
                      Certificado verificado com sucesso
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Emitido a{" "}
                      <span className="font-semibold text-foreground">
                        {cert.holderName}
                      </span>{" "}
                      em {formatDate(cert.issuedAt)} e válido até{" "}
                      {cert.expiresAt && formatDate(cert.expiresAt)}.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="min-w-0 lg:col-span-2">
                  <CertificateView certificate={cert} />
                </div>

                <aside className="space-y-4">
                  <Card>
                    <CardContent className="p-5 space-y-4">
                      <h3 className="font-semibold">Dados verificados</h3>
                      <div className="space-y-3 text-sm">
                        <Row label="Titular" value={cert.holderName} />
                        <Row label="Curso" value={cert.courseTitle} />
                        <Row label="Serial" value={cert.serial} mono />
                        <Row
                          label="Nota final"
                          value={`${cert.finalScore}/100`}
                        />
                        <Row
                          label="Horas"
                          value={`${cert.hoursCompleted}h`}
                        />
                        {cert.stcwReference && (
                          <Row label="STCW" value={cert.stcwReference} />
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold text-sm">Validade</h3>
                      </div>
                      <Row label="Emissão" value={formatDate(cert.issuedAt)} />
                      {cert.expiresAt && (
                        <Row
                          label="Expira"
                          value={formatDate(cert.expiresAt)}
                        />
                      )}
                      <div className="rounded-md bg-green-500/10 p-3 text-xs">
                        <div className="flex items-center gap-1.5 font-medium text-green-700 dark:text-green-400">
                          <CheckCircle2 className="h-3 w-3" />
                          Dentro do prazo
                        </div>
                        <p className="text-muted-foreground mt-1">
                          Certificação STCW válida por 5 anos a partir da
                          emissão.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </aside>
              </div>
            </>
          )}
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <p
        className={`font-medium mt-0.5 ${mono ? "font-mono text-sm" : "text-sm"}`}
      >
        {value}
      </p>
    </div>
  );
}
