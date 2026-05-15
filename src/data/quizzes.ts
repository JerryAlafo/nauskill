import type { Quiz } from "@/types";

export const QUIZZES: Record<string, Quiz> = {
  "c-stcw-basic-safety": {
    id: "q-stcw-basic",
    courseId: "c-stcw-basic-safety",
    title: "Avaliação Final — Segurança Básica STCW",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question:
          "De acordo com a Convenção STCW, com que periodicidade deve ser revalidada a formação em Segurança Básica?",
        options: [
          "Anualmente",
          "A cada 3 anos",
          "A cada 5 anos",
          "Apenas quando solicitado pelo armador",
        ],
        correctIndex: 2,
        explanation:
          "A Convenção STCW (capítulo I/14 e secção A-VI/1) exige revalidação a cada cinco anos para manter a competência em segurança básica.",
      },
      {
        id: "q2",
        question:
          "Qual é o primeiro passo no procedimento de combate a um incêndio classe B (líquidos inflamáveis) a bordo?",
        options: [
          "Aplicar água directamente sobre as chamas",
          "Cortar a fonte de oxigénio e isolar o combustível",
          "Aguardar a chegada da equipa de bombeiros",
          "Ventilar o compartimento para libertar fumo",
        ],
        correctIndex: 1,
        explanation:
          "Em incêndios classe B, a água é contraindicada. A prioridade é cortar a fonte de oxigénio com agentes adequados (espuma, CO₂, pó químico) e isolar o combustível.",
      },
      {
        id: "q3",
        question:
          "Qual é a temperatura corporal abaixo da qual se considera que uma vítima de imersão em água fria entrou em hipotermia severa?",
        options: ["36 °C", "35 °C", "32 °C", "28 °C"],
        correctIndex: 3,
        explanation:
          "A hipotermia severa é caracterizada por temperatura corporal central abaixo de 28 °C. Entre 32–28 °C é considerada moderada, e abaixo de 28 °C exige reaquecimento activo cuidadoso.",
      },
      {
        id: "q4",
        question:
          "Numa situação de abandono do navio, qual é o sinal sonoro de alarme geral conforme o SOLAS?",
        options: [
          "Sete ou mais toques curtos seguidos de um toque longo",
          "Três toques longos",
          "Um toque longo contínuo",
          "Dois toques curtos repetidos",
        ],
        correctIndex: 0,
        explanation:
          "O sinal de alarme geral é constituído por sete ou mais toques curtos seguidos de um toque longo, conforme estabelecido pela SOLAS.",
      },
      {
        id: "q5",
        question:
          "Em primeiros socorros, qual é a sequência correcta de avaliação inicial de uma vítima?",
        options: [
          "Pulso, temperatura, ferimentos",
          "ABC — Vias aéreas, Respiração, Circulação",
          "Imobilização, hidratação, transporte",
          "Verificar consciência, dar de beber, chamar ajuda",
        ],
        correctIndex: 1,
        explanation:
          "A sequência ABC (Airway, Breathing, Circulation) é o protocolo internacional padrão de avaliação primária de vítimas.",
      },
    ],
  },
};

export function getQuizForCourse(courseId: string): Quiz | undefined {
  return QUIZZES[courseId];
}
