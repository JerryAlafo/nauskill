import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MuiProvider } from "@/components/mui-provider";
import { SessionProvider } from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: "NAUSKILL — Plataforma Africana de Formação Marítima",
  description:
    "Upskilling, revalidação STCW e desenvolvimento profissional para marítimos. Em português, com suporte offline.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased font-sans">
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <MuiProvider>{children}</MuiProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
