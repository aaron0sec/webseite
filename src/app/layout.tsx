import type { Metadata } from "next";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://joscha-sec.vercel.app"),
  title: { default: "Joscha Aaron Schmidt — OSINT & Web Security", template: "%s | Joscha Aaron Schmidt" },
  description: "OSINT Specialist und IT-Security-orientierter Entwickler mit Fokus auf Web Security, Linux und technische Analyse.",
  openGraph: { title: "Joscha Aaron Schmidt — OSINT & Web Security", description: "OSINT, Web Security, Linux und technische Projekte.", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="de" className="dark"><body><SiteHeader />{children}<SiteFooter /></body></html>; }
