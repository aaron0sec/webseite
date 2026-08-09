import type { Metadata } from "next";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsent } from "@/components/cookie-consent";

export const metadata: Metadata = {
  metadataBase: new URL("https://linuxaaron.dpdns.org"),
  title: { default: "Joscha Aaron Schmidt — OSINT & Web Security", template: "%s | Joscha Aaron Schmidt" },
  description: "OSINT Specialist und IT-Security-orientierter Entwickler mit Fokus auf Web Security, Linux und technische Analyse.",
  openGraph: { title: "Joscha Aaron Schmidt — OSINT & Web Security", description: "OSINT, Web Security, Linux und technische Projekte.", type: "website", url: "https://linuxaaron.dpdns.org" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de" className="dark"><head><meta name="google-site-verification" content="SjcxIb0LYpV5eAe7mZOXWJgi7nXtGW8fSQIGP2A9erY" /></head><body><SiteHeader />{children}<SiteFooter /><CookieConsent /></body></html>;
}
