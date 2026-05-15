import Link from "next/link";
import { Anchor, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="text-center space-y-6 max-w-md">
        <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <Anchor className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="text-xl font-semibold">Página perdida no mar</p>
          <p className="text-muted-foreground">
            A página que procura não existe ou foi movida.
          </p>
        </div>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Voltar à página inicial
          </Link>
        </Button>
      </div>
    </div>
  );
}
