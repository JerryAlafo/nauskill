import { NextRequest, NextResponse } from "next/server";
import type { QuizQuestion } from "@/types";

interface GenerateBody {
  courseId: string;
  title: string;
  description: string;
  stcwReference?: string;
}

const SYSTEM_PROMPT = `És um especialista em formação marítima STCW e crias perguntas de avaliação rigorosas para marítimos profissionais. Respondes SEMPRE em JSON válido, sem texto adicional fora do JSON.`;

function buildUserPrompt({ title, description, stcwReference }: GenerateBody) {
  return `Cria exactamente 6 perguntas de escolha múltipla para o quiz de avaliação final do curso "${title}"${stcwReference ? ` (${stcwReference})` : ""}.

Contexto do curso: ${description}

Regras:
- Cada pergunta tem exactamente 4 opções
- Apenas uma opção é correcta
- As perguntas devem cobrir conceitos técnicos reais e relevantes para marítimos
- As explicações devem ser detalhadas e educativas (2-3 frases)
- Escreve tudo em português europeu
- Varia a dificuldade: 2 fáceis, 3 médias, 1 difícil

Responde APENAS com este JSON (sem markdown, sem backticks):
{
  "questions": [
    {
      "id": "q1",
      "question": "Texto da pergunta?",
      "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
      "correctIndex": 0,
      "explanation": "Explicação detalhada da resposta correcta."
    }
  ]
}`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENROUTER_API_KEY não configurada." }, { status: 500 });
  }

  const body: GenerateBody = await req.json();
  const { courseId, title } = body;

  if (!courseId || !title) {
    return NextResponse.json({ error: "courseId e title são obrigatórios." }, { status: 400 });
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://nauskill.mz",
      "X-Title": "NAUSKILL Quiz Generator",
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-001",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(body) },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("OpenRouter error:", err);
    return NextResponse.json({ error: "Falha ao contactar o modelo de IA." }, { status: 502 });
  }

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content ?? "";

  let questions: QuizQuestion[];
  try {
    // Remove possíveis backticks de markdown
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    questions = parsed.questions;
    if (!Array.isArray(questions) || questions.length === 0) throw new Error("Sem perguntas");
  } catch {
    console.error("Falha ao fazer parse do JSON:", raw);
    return NextResponse.json({ error: "Resposta da IA inválida." }, { status: 502 });
  }

  return NextResponse.json({
    id: `q-ai-${courseId}`,
    courseId,
    title: `Avaliação Final — ${title}`,
    passingScore: 70,
    questions,
  });
}
