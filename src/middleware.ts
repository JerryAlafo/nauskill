import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl

  if (!req.auth && (pathname.startsWith("/painel") || pathname === "/onboarding")) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Utilizadores Google sem cargo/função são redirecionados para o onboarding
  if (req.auth?.user?.needsOnboarding && pathname.startsWith("/painel")) {
    return NextResponse.redirect(new URL("/onboarding", req.url))
  }
})

export const config = {
  matcher: ["/painel/:path*", "/onboarding"],
}
