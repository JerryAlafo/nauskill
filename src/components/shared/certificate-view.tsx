"use client";

import { QRCodeSVG } from "qrcode.react";
import { Award, Anchor, ShieldCheck } from "lucide-react";
import type { Certificate } from "@/types";
import { formatDate } from "@/lib/utils";

interface CertificateViewProps {
  certificate: Certificate;
  verifyBaseUrl?: string;
}

export function CertificateView({
  certificate,
  // verifyBaseUrl = "https://nauskill.mz/verificar",
  verifyBaseUrl = "https://nauskill.vercel.app/verificar",
}: CertificateViewProps) {
  const verifyUrl = `${verifyBaseUrl}/${certificate.verificationCode}`;

  return (
    <div className="relative bg-white text-slate-900 rounded-md overflow-hidden border-2 border-cyan-700 shadow-xl sm:rounded-lg print:shadow-none print:border-cyan-700">
      {/* Barras decorativas */}
      <div className="h-2 bg-cyan-700" />
      <div className="absolute top-0 left-0 right-0 h-2 bg-cyan-700" />

      {/* Conteúdo */}
      <div className="p-4 sm:p-8 lg:p-12 space-y-5 sm:space-y-6 relative">
        {/* Watermark âncora */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <Anchor className="h-64 w-64 sm:h-96 sm:w-96" />
        </div>

        {/* Header */}
        <div className="flex flex-col gap-4 relative sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-cyan-700 text-white flex items-center justify-center sm:h-12 sm:w-12">
              <Anchor className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                NAUSKILL
              </p>
              <p className="text-sm font-semibold text-cyan-800">
                Plataforma Africana de Formação Marítima
              </p>
            </div>
          </div>
          <div
            className="self-start px-3 py-1.5 rounded-md text-xs font-semibold"
            style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}
          >
            <span className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              CERTIFICADO DIGITAL
            </span>
          </div>
        </div>

        {/* Conteúdo central */}
        <div className="text-center py-6 relative sm:py-8">
          <p className="text-sm uppercase tracking-widest text-slate-500 mb-2">
            Certifica-se que
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-4">
            {certificate.holderName}
          </h1>
          <p className="text-sm text-slate-600 mb-3">
            concluiu com aproveitamento o curso
          </p>
          <h2 className="text-lg sm:text-2xl font-semibold text-cyan-800 mb-3">
            {certificate.courseTitle}
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            com a duração de{" "}
            <span className="font-semibold">{certificate.hoursCompleted} horas</span>,
            tendo obtido a nota final de{" "}
            <span className="font-semibold">{certificate.finalScore}/100</span>.
          </p>

          {certificate.stcwReference && (
            <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full border border-cyan-700/30 bg-cyan-50 text-xs">
              <ShieldCheck className="h-3 w-3 text-cyan-700" />
              <span className="text-cyan-800 font-medium">
                Alinhado com {certificate.stcwReference}
              </span>
            </div>
          )}
        </div>

        {/* Rodapé com QR + meta */}
        <div className="grid grid-cols-1 gap-5 pt-6 border-t border-slate-200 relative sm:grid-cols-3 sm:gap-6">
          <div className="space-y-3 text-xs sm:col-span-2">
            <div>
              <p className="text-slate-500 uppercase tracking-wider">Serial</p>
              <p className="font-mono font-semibold text-slate-900 text-sm mt-0.5">
                {certificate.serial}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4">
              <div>
                <p className="text-slate-500 uppercase tracking-wider">
                  Emitido em
                </p>
                <p className="font-medium text-slate-900 mt-0.5">
                  {formatDate(certificate.issuedAt)}
                </p>
              </div>
              {certificate.expiresAt && (
                <div>
                  <p className="text-slate-500 uppercase tracking-wider">
                    Válido até
                  </p>
                  <p className="font-medium text-slate-900 mt-0.5">
                    {formatDate(certificate.expiresAt)}
                  </p>
                </div>
              )}
            </div>
            <div>
              <p className="text-slate-500 uppercase tracking-wider">
                Código de verificação
              </p>
              <p className="font-mono font-semibold text-cyan-800 mt-0.5">
                {certificate.verificationCode}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-white border-2 border-slate-200 rounded-md">
              <QRCodeSVG
                value={verifyUrl}
                size={96}
                bgColor="#ffffff"
                fgColor="#155E75"
                level="M"
              />
            </div>
            <p className="text-[10px] text-slate-500 text-center max-w-[120px] leading-tight">
              Leia o código para verificar a autenticidade
            </p>
          </div>
        </div>

        {/* Assinatura */}
        <div className="grid grid-cols-1 gap-6 pt-6 relative sm:grid-cols-2">
          <div className="text-center">
            <div className="border-t border-slate-400 mb-1 pt-1 mt-8 sm:mt-12" />
            <p className="text-xs font-semibold">Cap. Jordão Massamba</p>
            <p className="text-[10px] text-slate-500">Director Académico</p>
          </div>
          <div className="text-center">
            <div className="border-t border-slate-400 mb-1 pt-1 mt-8 sm:mt-12" />
            <p className="text-xs font-semibold">
              Escola Superior de Ciências Náuticas
            </p>
            <p className="text-[10px] text-slate-500">Entidade incubadora</p>
          </div>
        </div>
      </div>

      <div className="h-2 bg-cyan-700" />
    </div>
  );
}
