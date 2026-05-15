import type { Certificate } from "@/types";

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-001",
    serial: "NSK-2026-000184",
    courseId: "c-stcw-basic-safety",
    courseTitle: "Segurança Básica STCW",
    holderName: "Jerry Alafo",
    holderId: "u-001",
    issuedAt: "2026-04-22",
    expiresAt: "2031-04-22",
    stcwReference: "STCW A-VI/1",
    hoursCompleted: 18,
    finalScore: 92,
    verificationCode: "NSK184-A22-X9K2",
  },
  {
    id: "cert-002",
    serial: "NSK-2026-000128",
    courseId: "c-first-aid",
    courseTitle: "Primeiros Socorros Médicos a Bordo",
    holderName: "Jerry Alafo",
    holderId: "u-001",
    issuedAt: "2026-02-08",
    expiresAt: "2031-02-08",
    stcwReference: "STCW A-VI/4-1",
    hoursCompleted: 21,
    finalScore: 88,
    verificationCode: "NSK128-F08-B7M4",
  },
];

export function getCertificateById(id: string): Certificate | undefined {
  return CERTIFICATES.find((c) => c.id === id);
}
