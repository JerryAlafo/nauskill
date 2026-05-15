"use client";

import * as React from "react";
import {
  User,
  Mail,
  Briefcase,
  Building,
  Ship,
  Calendar,
  Save,
  Camera,
  Shield,
  Bell,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CURRENT_USER } from "@/data/user";
import { formatDate } from "@/lib/utils";

export default function PerfilPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Perfil</h1>
        <p className="text-muted-foreground mt-1">
          Gira a sua informação profissional e preferências.
        </p>
      </div>

      {/* Cabeçalho do perfil */}
      <Card>
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl">
                {CURRENT_USER.avatarInitials}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2 className="text-xl font-bold">{CURRENT_USER.name}</h2>
              <Badge variant="success">Verificado</Badge>
            </div>
            <p className="text-muted-foreground">{CURRENT_USER.role}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex min-w-0 items-center gap-1 break-all">
                <Mail className="h-3 w-3" />
                {CURRENT_USER.email}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Desde {formatDate(CURRENT_USER.joinedAt)}
              </span>
            </div>
          </div>

          <Button className="w-full sm:w-auto">
            <Save className="h-4 w-4" />
            Guardar
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Informação</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="preferences">Preferências</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informação pessoal</CardTitle>
              <CardDescription>
                Os dados que aparecem nos seus certificados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="nome"
                      defaultValue={CURRENT_USER.name}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue={CURRENT_USER.email}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo / Função</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cargo"
                      defaultValue={CURRENT_USER.role}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="navio">Tipo de navio</Label>
                  <div className="relative">
                    <Ship className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="navio"
                      defaultValue={CURRENT_USER.vesselType}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="empregador">Empregador</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="empregador"
                    defaultValue={CURRENT_USER.employer}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Palavra-passe</CardTitle>
              <CardDescription>
                Mantenha a sua conta segura com uma palavra-passe forte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="atual">Palavra-passe actual</Label>
                <Input id="atual" type="password" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nova">Nova palavra-passe</Label>
                  <Input id="nova" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmar">Confirmar</Label>
                  <Input id="confirmar" type="password" />
                </div>
              </div>
              <Button>Actualizar palavra-passe</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Shield className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <p className="font-medium">Autenticação em dois passos</p>
                <p className="text-sm text-muted-foreground">
                  Adicione uma camada extra de segurança à sua conta
                </p>
              </div>
              <Button variant="outline" className="w-full sm:w-auto">Activar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <PreferenceRow
                icon={Bell}
                title="Lembretes de revalidação"
                description="Alertas 6, 3 e 1 mês antes da expiração de certificados"
                enabled
              />
              <Separator />
              <PreferenceRow
                icon={Bell}
                title="Novos cursos"
                description="Quando forem publicados cursos novos na sua área"
                enabled
              />
              <Separator />
              <PreferenceRow
                icon={Bell}
                title="Resumo semanal"
                description="Email semanal com o seu progresso"
                enabled={false}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Idioma e região</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Idioma</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input defaultValue="Português (Moçambique)" className="pl-9" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PreferenceRow({
  icon: Icon,
  title,
  description,
  enabled,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  enabled: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <div className="flex-1">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Badge variant={enabled ? "success" : "outline"}>
        {enabled ? "Activo" : "Inactivo"}
      </Badge>
    </div>
  );
}
