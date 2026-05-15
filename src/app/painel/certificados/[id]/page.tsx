import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Share2,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Copy,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CertificateView } from "@/components/shared/certificate-view";
import { CERTIFICATES, getCertificateById } from "@/data/certificates";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return CERTIFICATES.map((c) => ({ id: c.id }));
}

export default async function CertificadoDetalhePage({ params }: PageProps) {
  const { id } = await params;
  const cert = getCertificateById(id);
  if (!cert) notFound();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Link
        href="/painel/certificados"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar aos certificados
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Certificado */}
        <div className="min-w-0 lg:col-span-2">
          <CertificateView certificate={cert} />
        </div>

        {/* Sidebar de acções */}
        <aside className="space-y-4">
          <Card>
            <CardContent className="p-5 space-y-3">
              <h3 className="font-semibold">Acções</h3>
              <Button className="w-full justify-start">
                <Download className="h-4 w-4" />
                Descarregar PDF
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Printer className="h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="h-4 w-4" />
                Partilhar link
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Copy className="h-4 w-4" />
                Copiar código
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="font-semibold">Verificação pública</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Este certificado pode ser verificado por armadores, empregadores
                e a Autoridade Reguladora do Transporte Marítimo através do
                código QR ou do código de verificação:
              </p>
              <div className="rounded-md bg-background border p-3 font-mono text-xs text-center font-semibold text-primary">
                {cert.verificationCode}
              </div>
              <Button asChild variant="outline" className="w-full" size="sm">
                <Link href={`/verificar/${cert.verificationCode}`} target="_blank">
                  Página de verificação
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 space-y-2">
              <h3 className="font-semibold text-sm">Estado do certificado</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Válido até {cert.expiresAt && formatDate(cert.expiresAt)}</span>
                </div>
                {cert.stcwReference && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Alinhado com {cert.stcwReference}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Emissão registada na blockchain interna</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
