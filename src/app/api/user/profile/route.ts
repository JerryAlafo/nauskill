import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { supabaseAdmin } from "@/lib/supabase"

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  const { role } = await req.json()
  if (!role || typeof role !== "string") {
    return NextResponse.json({ error: "Campo role obrigatório" }, { status: 400 })
  }

  // Resolve o UUID do Supabase pelo email — funciona para Google OAuth e credentials
  const { data: listData } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
  const supabaseUser = listData?.users?.find((u) => u.email === session.user.email)

  if (!supabaseUser) {
    return NextResponse.json({ error: "Utilizador não encontrado no Supabase" }, { status: 404 })
  }

  const { error } = await supabaseAdmin.auth.admin.updateUserById(supabaseUser.id, {
    user_metadata: { role: role.trim() },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  // Actualiza o token.id para o UUID correcto do Supabase (para requests futuros)
  return NextResponse.json({ ok: true, supabaseId: supabaseUser.id })
}
