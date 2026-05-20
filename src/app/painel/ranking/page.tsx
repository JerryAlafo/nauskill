"use client";

import { useSession } from "next-auth/react";
import {
  Trophy,
  Medal,
  TrendingUp,
  Award,
  Crown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RANKING } from "@/data/user";

export default function RankingPage() {
  const { data: session } = useSession();
  const realName = session?.user?.name ?? "";
  const realInitials = realName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  // Substitui nome e iniciais do utilizador actual pelo dado real da sessão
  const ranking = RANKING.map((r) =>
    r.isCurrentUser && realName
      ? { ...r, name: realName, initials: realInitials || r.initials }
      : r
  );

  const podium = ranking.slice(0, 3);
  const me = ranking.find((r) => r.isCurrentUser);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ranking</h1>
        <p className="text-muted-foreground mt-1">
          Top profissionais da plataforma esta semana.
        </p>
      </div>

      {/* A minha posição */}
      {me && (
        <Card className="border-primary/40 bg-primary/5">
          <CardContent className="p-5 flex flex-col items-start gap-4 min-[420px]:flex-row min-[420px]:items-center">
            <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
              #{me.rank}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">A sua posição</p>
              <p className="font-semibold">{me.name}</p>
            </div>
            <div className="text-left min-[420px]:text-right">
              <p className="text-2xl font-bold text-primary">
                {me.pointsTotal.toLocaleString("pt-PT")}
              </p>
              <p className="text-xs text-muted-foreground">pontos</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pódio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-gold" />
            Pódio
          </CardTitle>
          <CardDescription>Top 3 alunos da semana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 items-end sm:gap-4">
            <PodiumCard entry={podium[1]} place={2} height="h-32" />
            <PodiumCard entry={podium[0]} place={1} height="h-40" />
            <PodiumCard entry={podium[2]} place={3} height="h-28" />
          </div>
        </CardContent>
      </Card>

      {/* Tabela completa */}
      <Card>
        <CardHeader>
          <CardTitle>Classificação completa</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {ranking.map((r) => (
              <div
                key={r.userId}
                className={`flex items-center gap-3 p-3 hover:bg-muted/40 transition-colors sm:gap-4 sm:p-4 ${
                  r.isCurrentUser ? "bg-primary/5" : ""
                }`}
              >
                <div className="w-8 text-center">
                  {r.rank <= 3 ? (
                    <Medal
                      className={`h-5 w-5 mx-auto ${
                        r.rank === 1
                          ? "text-gold"
                          : r.rank === 2
                          ? "text-slate-400"
                          : "text-amber-600"
                      }`}
                    />
                  ) : (
                    <span className="font-semibold text-muted-foreground">
                      #{r.rank}
                    </span>
                  )}
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{r.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p
                    className={`truncate ${
                      r.isCurrentUser ? "font-semibold text-primary" : "font-medium"
                    }`}
                  >
                    {r.name}
                    {r.isCurrentUser && (
                      <Badge variant="secondary" className="ml-1 text-[10px] sm:ml-2">
                        Você
                      </Badge>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {r.coursesCompleted} cursos
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {r.pointsTotal.toLocaleString("pt-PT")}
                  </p>
                  <p className="text-xs text-muted-foreground">pts</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/40 border-dashed">
        <CardContent className="p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:p-6">
          <TrendingUp className="h-8 w-8 text-primary shrink-0" />
          <div>
            <p className="font-semibold">Como ganhar pontos?</p>
            <p className="text-sm text-muted-foreground mt-1">
              Conclua módulos (+50 pts), termine cursos (+200 pts), passe quizzes
              à primeira (+100 pts) e mantenha sequências diárias (+10 pts/dia).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PodiumCard({
  entry,
  place,
  height,
}: {
  entry: (typeof RANKING)[0] & { name: string; initials: string };
  place: 1 | 2 | 3;
  height: string;
}) {
  const colors = {
    1: "bg-gold/15 border-gold/40 text-gold-dark dark:text-gold-light",
    2: "bg-muted border-muted-foreground/30 text-foreground",
    3: "bg-amber-600/10 border-amber-600/30 text-amber-700 dark:text-amber-400",
  };
  return (
    <div className="flex flex-col items-center">
      <Avatar className="h-14 w-14 mb-2 ring-2 ring-background">
        <AvatarFallback className="text-sm">{entry.initials}</AvatarFallback>
      </Avatar>
      <p className="text-xs font-medium text-center truncate max-w-full px-1">
        {entry.name.split(" ").slice(0, 2).join(" ")}
      </p>
      <p className="text-xs text-muted-foreground mb-2">
        {entry.pointsTotal.toLocaleString("pt-PT")} pts
      </p>
      <div
        className={`w-full ${height} rounded-t-lg border-2 border-b-0 flex items-start justify-center pt-2 ${colors[place]}`}
      >
        {place === 1 ? (
          <Crown className="h-5 w-5" />
        ) : (
          <span className="font-bold text-xl">#{place}</span>
        )}
      </div>
    </div>
  );
}
