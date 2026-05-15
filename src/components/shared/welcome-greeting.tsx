"use client"

import { useSession } from "next-auth/react"

export function WelcomeGreeting() {
  const { data: session } = useSession()
  return <>{session?.user?.name?.split(" ")[0] ?? "utilizador"}</>
}
