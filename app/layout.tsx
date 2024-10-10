/* app/layout.tsx */
import "./globals.css";
import type { Metadata } from "next";
import { ReduxProvider } from "./redux-provider";
import Head from "next/head";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dashboard Interativo",
  description:
    "Dashboard interativo com dados de clima, criptomoedas e notícias",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${outfit.variable}`} lang="pt-BR">
      <link rel="icon" href="/OficinaBrasil-icon.png" />

      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
