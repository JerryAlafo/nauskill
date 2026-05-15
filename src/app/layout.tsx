import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MuiProvider } from "@/components/mui-provider";

export const metadata: Metadata = {
  title: "NAUSKILL — Plataforma Africana de Formação Marítima",
  description:
    "Upskilling, revalidação STCW e desenvolvimento profissional para marítimos. Em português, com suporte offline.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MuiProvider>{children}</MuiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
