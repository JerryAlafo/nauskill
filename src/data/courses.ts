import type { Course } from "@/types";

export const COURSES: Course[] = [
  {
    id: "c-stcw-basic-safety",
    slug: "seguranca-basica-stcw",
    title: "Segurança Básica STCW",
    shortDescription:
      "Sobrevivência pessoal, prevenção de incêndios, primeiros socorros e segurança pessoal a bordo.",
    description:
      "Curso de revalidação obrigatório segundo a Convenção STCW (Capítulo VI, Tabela A-VI/1). Cobre técnicas de sobrevivência pessoal, prevenção e combate básico a incêndios, primeiros socorros elementares e segurança pessoal e responsabilidades sociais a bordo. Inclui simulações interactivas e avaliação final.",
    category: "stcw-basic",
    level: "Básico",
    durationHours: 18,
    moduleCount: 4,
    stcwReference: "STCW A-VI/1",
    isPremium: false,
    isOfflineAvailable: true,
    instructor: "Cap. Jordão Massamba",
    rating: 4.8,
    enrolledCount: 184,
    thumbnailHue: "192 91% 35%",
    tags: ["Obrigatório", "Revalidação", "STCW"],
  },
  {
    id: "c-fire-fighting-advanced",
    slug: "combate-avancado-incendios",
    title: "Combate Avançado a Incêndios",
    shortDescription:
      "Comando de operações de combate a incêndios, organização de equipas e investigação pós-incêndio.",
    description:
      "Formação avançada conforme STCW A-VI/3, dirigida a oficiais com responsabilidades de comando. Inclui controlo de operações de combate a incêndios, estratégias de evacuação, organização de equipas, comunicações de emergência e investigação de causas.",
    category: "stcw-advanced",
    level: "Avançado",
    durationHours: 24,
    moduleCount: 5,
    stcwReference: "STCW A-VI/3",
    isPremium: true,
    isOfflineAvailable: true,
    instructor: "Eng. Lucas Lima",
    rating: 4.9,
    enrolledCount: 96,
    thumbnailHue: "204 82% 42%",
    tags: ["Avançado", "STCW", "Comando"],
  },
  {
    id: "c-first-aid",
    slug: "primeiros-socorros-medicos",
    title: "Primeiros Socorros Médicos a Bordo",
    shortDescription:
      "Avaliação de vítimas, RCP, ferimentos, queimaduras e administração de medicamentos sob supervisão.",
    description:
      "Curso STCW A-VI/4-1 para tripulantes designados para prestar primeiros socorros médicos a bordo. Aborda avaliação inicial, RCP, controlo de hemorragias, queimaduras, fracturas, choque, intoxicações e protocolos de comunicação com tele-medicina.",
    category: "stcw-basic",
    level: "Intermédio",
    durationHours: 21,
    moduleCount: 6,
    stcwReference: "STCW A-VI/4-1",
    isPremium: true,
    isOfflineAvailable: true,
    instructor: "Dra. Alice Zefanias",
    rating: 4.7,
    enrolledCount: 128,
    thumbnailHue: "214 72% 46%",
    tags: ["Saúde", "STCW", "Obrigatório"],
  },
  {
    id: "c-survival-craft",
    slug: "embarcacoes-salvavidas",
    title: "Embarcações Salva-Vidas e Botes de Salvamento",
    shortDescription:
      "Operação e manutenção de embarcações salva-vidas, excluindo botes de salvamento rápidos.",
    description:
      "Curso de proficiência conforme STCW A-VI/2-1. Capacita o formando para assumir responsabilidades em embarcações salva-vidas e botes de salvamento em situações de emergência.",
    category: "stcw-basic",
    level: "Intermédio",
    durationHours: 28,
    moduleCount: 5,
    stcwReference: "STCW A-VI/2-1",
    isPremium: true,
    isOfflineAvailable: true,
    instructor: "Cap. Jordão Massamba",
    rating: 4.6,
    enrolledCount: 72,
    thumbnailHue: "210 70% 45%",
    tags: ["STCW", "Emergência"],
  },
  {
    id: "c-security-awareness",
    slug: "consciencializacao-seguranca",
    title: "Consciencialização de Segurança Marítima",
    shortDescription:
      "Ameaças, planos de protecção do navio e procedimentos contra a pirataria e actos ilícitos.",
    description:
      "Curso STCW A-VI/6-1 sobre consciencialização em protecção marítima. Cobre ameaças à segurança, código ISPS, planos de protecção do navio, procedimentos contra pirataria e relato de incidentes.",
    category: "stcw-basic",
    level: "Básico",
    durationHours: 8,
    moduleCount: 3,
    stcwReference: "STCW A-VI/6-1",
    isPremium: false,
    isOfflineAvailable: true,
    instructor: "Eng. Lucas Lima",
    rating: 4.5,
    enrolledCount: 156,
    thumbnailHue: "188 78% 36%",
    tags: ["ISPS", "STCW", "Segurança"],
  },
  {
    id: "c-cyber-maritime",
    slug: "ciberseguranca-maritima",
    title: "Ciber-Segurança Marítima",
    shortDescription:
      "Protecção de sistemas OT/IT a bordo, gestão de risco cibernético e conformidade IMO MSC.428(98).",
    description:
      "Competência emergente alinhada com a Resolução IMO MSC.428(98). Aborda riscos cibernéticos em sistemas de navegação (ECDIS, AIS, GMDSS), VSAT, controlo de carga e gestão integrada de pontes. Inclui estudos de caso de incidentes reais.",
    category: "emerging",
    level: "Intermédio",
    durationHours: 12,
    moduleCount: 4,
    isPremium: true,
    isOfflineAvailable: true,
    instructor: "Jerry Alafo",
    rating: 4.9,
    enrolledCount: 64,
    thumbnailHue: "226 64% 45%",
    tags: ["Cyber", "Emergente", "IMO"],
  },
  {
    id: "c-emissions",
    slug: "gestao-emissoes-marpol",
    title: "Gestão de Emissões e MARPOL Anexo VI",
    shortDescription:
      "Combustíveis de baixo enxofre, EEXI, CII e práticas operacionais de redução de emissões.",
    description:
      "Curso sobre as exigências actuais de redução de emissões: MARPOL Anexo VI, EEXI, CII, combustíveis alternativos (LNG, metanol, amoníaco) e práticas operacionais para conformidade com metas IMO 2030/2050.",
    category: "emerging",
    level: "Avançado",
    durationHours: 16,
    moduleCount: 5,
    isPremium: true,
    isOfflineAvailable: true,
    instructor: "Eng. Lucas Lima",
    rating: 4.7,
    enrolledCount: 48,
    thumbnailHue: "198 62% 38%",
    tags: ["MARPOL", "Emergente", "Sustentabilidade"],
  },
  {
    id: "c-bridge-leadership",
    slug: "lideranca-ponte",
    title: "Liderança e Trabalho em Equipa na Ponte",
    shortDescription:
      "BRM, comunicação, gestão de fadiga e tomada de decisão em situações críticas.",
    description:
      "Curso STCW A-II/1, A-II/2 e A-III/1 sobre liderança e gestão de recursos na ponte (BRM). Inclui módulos de comunicação intercultural, gestão de fadiga, tomada de decisão sob pressão e resolução de conflitos.",
    category: "leadership",
    level: "Intermédio",
    durationHours: 20,
    moduleCount: 5,
    stcwReference: "STCW A-II/1",
    isPremium: true,
    isOfflineAvailable: true,
    instructor: "Cap. Jordão Massamba",
    rating: 4.8,
    enrolledCount: 88,
    thumbnailHue: "192 50% 40%",
    tags: ["Liderança", "BRM", "STCW"],
  },
];

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export const CATEGORY_LABELS: Record<string, string> = {
  "stcw-basic": "STCW Básico",
  "stcw-advanced": "STCW Avançado",
  emerging: "Competências Emergentes",
  leadership: "Liderança",
};
