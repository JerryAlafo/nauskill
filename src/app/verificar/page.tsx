"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  ScanLine,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { CERTIFICATES } from "@/data/certificates";

export default function VerificarPage() {
  const [code, setCode] = React.useState("");

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-10 text-center sm:py-12">
            <Badge variant="outline" className="mb-3">
              Verificação pública
            </Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Autentique um certificado NAUSKILL
            </h1>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Verifique a autenticidade e validade de qualquer certificado
              emitido pela plataforma. Aceda directamente, leia o QR Code ou
              introduza o código de verificação.
            </p>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-8">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h2 className="font-semibold text-lg">
                    Verificar por código
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Introduza o código de verificação que consta no certificado.
                  </p>
                </div>
                <form
                  action={`/verificar/${code}`}
                  onSubmit={(e) => {
                    if (!code) {
                      e.preventDefault();
                    }
                  }}
                  className="flex flex-col gap-2 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Ex.: NSK184-A22-X9K2"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      className="pl-9 font-mono"
                    />
                  </div>
                  <Button type="submit" disabled={!code} className="w-full sm:w-auto">
                    Verificar
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="relative flex items-center my-6">
              <div className="flex-1 border-t" />
              <span className="px-3 text-xs text-muted-foreground uppercase tracking-wider">
                Ou
              </span>
              <div className="flex-1 border-t" />
            </div>

            <Card className="border-dashed">
              <CardContent className="p-6 text-center space-y-3 sm:p-8">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <ScanLine className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Ler QR Code</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Aponte a câmara para o QR Code no certificado. Será
                  redireccionado para a página de verificação automaticamente.
                </p>
                <Button variant="outline">
                  <ScanLine className="h-4 w-4" />
                  Abrir leitor de QR
                </Button>
              </CardContent>
            </Card>

            {/* Exemplos demonstrativos */}
            <Card>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Códigos de demonstração</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Para testar a verificação no protótipo, experimente um destes
                  códigos:
                </p>
                <div className="space-y-2">
                  {CERTIFICATES.map((c) => (
                    <Link
                      key={c.id}
                      href={`/verificar/${c.verificationCode}`}
                      className="flex items-center justify-between gap-3 rounded-md border p-3 hover:border-primary/40 hover:bg-muted/40 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="break-all font-mono text-sm font-semibold text-primary">
                          {c.verificationCode}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {c.courseTitle}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
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
