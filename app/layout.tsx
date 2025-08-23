import type React from "react";
import Header from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import "@/app/globals.css";
import Script from "next/script";

export const metadata = {
  title: "Jean-Philippe DAS | Psychothérapeute à Châtelaillon-Plage",
  description:
    "Psychothérapies centrées sur Traumatisme et l'Attachement : TIFT, ICV-LI, EMDR, Schémas & Modes. Cabinet à Châtelaillon-Plage (La Rochelle Sud).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans antialiased">
        <Script
          defer
          src="https://umami.local.thimothe-das.fr/script.js"
          data-website-id="037aeef6-ef0d-4940-8288-1ab3da5f5a22"
        />

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
