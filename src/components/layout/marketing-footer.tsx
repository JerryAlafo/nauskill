import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Anchor, Mail, MapPin } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
              Plataforma africana de upskilling, revalidação STCW e
              desenvolvimento profissional para marítimos. Em português, com
              suporte offline, alinhada com as exigências da Convenção STCW.
            </p>
            <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <Anchor className="h-3.5 w-3.5" />
              <span>
                Incubado na Escola Superior de Ciências Náuticas — Maputo,
                Moçambique
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Plataforma</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/cursos" className="hover:text-foreground">
                  Catálogo de cursos
                </Link>
              </li>
              <li>
                <Link href="/verificar" className="hover:text-foreground">
                  Verificar certificado
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-foreground">
                  Área do aluno
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Mail className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>contacto@nauskill.mz</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>ESCN — Maputo, Moçambique</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 NAUSKILL · Todos os direitos reservados</p>
          <p>Conformidade STCW · Capítulo I/14 · Manila Amendments 2010</p>
        </div>
      </div>
    </footer>
  );
}
