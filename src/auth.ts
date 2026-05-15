import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { supabaseAdmin } from "@/lib/supabase"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const { data, error } = await supabaseAdmin.auth.signInWithPassword({
          email: credentials.email as string,
          password: credentials.password as string,
        })

        if (error || !data.user) return null

        return {
          id: data.user.id,
          email: data.user.email ?? "",
          name: data.user.user_metadata?.full_name ?? data.user.email ?? "",
          image: data.user.user_metadata?.avatar_url ?? null,
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const { error } = await supabaseAdmin.auth.admin.createUser({
          email: user.email,
          email_confirm: true,
          user_metadata: {
            full_name: user.name ?? user.email,
            avatar_url: user.image ?? null,
            provider: "google",
          },
        })
        if (error && !error.message.toLowerCase().includes("already")) {
          return false
        }
      }
      return true
    },

    async jwt({ token, user, account, trigger, session: sessionUpdate }) {
      // Actualiza o token quando o utilizador completa o onboarding
      if (trigger === "update" && sessionUpdate?.role !== undefined) {
        token.role = sessionUpdate.role
        token.needsOnboarding = !sessionUpdate.role
        return token
      }

      if (user) token.id = user.id ?? ""

      // No primeiro sign-in, resolve o UUID real do Supabase e busca o cargo
      if (account) {
        if (account.provider === "google") {
          // user.id do Google OAuth é o sub do Google, não o UUID do Supabase
          // → busca pelo email para obter o UUID correcto
          const email = token.email as string
          if (email) {
            // Duas tentativas para lidar com eventual latência de criação no Supabase
            let supabaseUser = null
            for (let attempt = 0; attempt < 2 && !supabaseUser; attempt++) {
              if (attempt > 0) await new Promise((r) => setTimeout(r, 800))
              const { data } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
              supabaseUser = data?.users?.find((u) => u.email === email) ?? null
            }
            if (supabaseUser) {
              token.id = supabaseUser.id
              token.role = supabaseUser.user_metadata?.role ?? ""
            } else {
              token.role = ""
            }
            token.needsOnboarding = !token.role
          }
        } else if (token.id) {
          // Credentials: user.id já é o UUID do Supabase
          const { data } = await supabaseAdmin.auth.admin.getUserById(token.id as string)
          const role = data.user?.user_metadata?.role ?? ""
          token.role = role
          token.needsOnboarding = !role
        }
      }

      return token
    },

    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = (token.role as string) ?? ""
      session.user.needsOnboarding = (token.needsOnboarding as boolean) ?? false
      return session
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: { strategy: "jwt" },
})
