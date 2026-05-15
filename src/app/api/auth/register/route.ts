import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password, fullName, role } = body

  if (!email || !password || !fullName) {
    return NextResponse.json(
      { error: "Campos obrigatórios em falta" },
      { status: 400 }
    )
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "A palavra-passe deve ter pelo menos 6 caracteres" },
      { status: 400 }
    )
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      role: role ?? "",
    },
  })

  if (error) {
    const alreadyExists =
      error.message.toLowerCase().includes("already") ||
      error.message.toLowerCase().includes("duplicate")
    return NextResponse.json(
      { error: alreadyExists ? "Este email já está registado" : error.message },
      { status: alreadyExists ? 409 : 400 }
    )
  }

  return NextResponse.json(
    { user: { id: data.user.id, email: data.user.email } },
    { status: 201 }
  )
}
