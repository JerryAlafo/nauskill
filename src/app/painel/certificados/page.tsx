import Link from "next/link";
import { ComingSoonButton } from "@/components/shared/coming-soon";
import {
  Award,
  Download,
  Eye,
  Calendar,
  CheckCircle2,
  Anchor,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CERTIFICATES } from "@/data/certificates";
import { formatDate } from "@/lib/utils";
import { auth } from "@/auth";

export default async function CertificadosPage() {
  const session = await auth();
  const realName = session?.user?.name ?? "";
  const certificates = realName
    ? CERTIFICATES.map((c) => ({ ...c, holderName: realName }))
    : CERTIFICATES;

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Os meus certificados</h1>
        <p className="text-muted-foreground mt-1">
          Certificados digitais verificáveis por QR Code, alinhados com a
          Convenção STCW.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryCard
          icon={Award}
          label="Total emitidos"
          value={certificates.length.toString()}
        />
        <SummaryCard
          icon={CheckCircle2}
          label="Válidos"
          value={certificates.length.toString()}
        />
        <SummaryCard
          icon={Calendar}
          label="A expirar em 12 meses"
          value="0"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <Card key={cert.id} className="overflow-hidden">
            <div className="h-2 bg-primary" />
            <CardContent className="p-5 space-y-4 sm:p-6">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:gap-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                  <Award className="h-4 w-4 text-primary" />
                  Certificado digital
                </div>
                {cert.stcwReference && (
                  <Badge variant="gold" className="text-[10px]">
                    <Anchor className="h-2.5 w-2.5" />
                    {cert.stcwReference}
                  </Badge>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-lg leading-tight">
                  {cert.courseTitle}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Emitido a {cert.holderName}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 text-xs min-[420px]:grid-cols-2">
                <div>
                  <p className="text-muted-foreground">Serial</p>
                  <p className="font-mono font-medium mt-0.5">{cert.serial}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Nota final</p>
                  <p className="font-medium mt-0.5">{cert.finalScore}/100</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Emitido</p>
                  <p className="font-medium mt-0.5">{formatDate(cert.issuedAt)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Válido até</p>
                  <p className="font-medium mt-0.5">
                    {cert.expiresAt ? formatDate(cert.expiresAt) : "—"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t min-[420px]:flex-row">
                <Button asChild className="flex-1" size="sm">
                  <Link href={`/painel/certificados/${cert.id}`}>
                    <Eye className="h-4 w-4" />
                    Ver certificado
                  </Link>
                </Button>
                <ComingSoonButton variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                  PDF
                </ComingSoonButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {label}
          </p>
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
