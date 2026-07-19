import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "peelsannaw's space",
  description:
    "Study in UCAS · Anthropic × Linear × Vercel — a minimal line-art personal space by @Peelsannaw.",
  openGraph: {
    title: "peelsannaw's space",
    description:
      "Study in UCAS · Anthropic × Linear × Vercel — a minimal line-art personal space.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LenisProvider>
            <Navbar />
            {children}
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
