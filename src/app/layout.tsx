import type { Metadata } from "next";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsent } from "@/components/cookie-consent";
import { BitcoinTicker } from "@/components/bitcoin-ticker";
import { CursorLiquid } from "@/components/cursor-liquid";

const siteUrl = "https://joschaschmidt.com";
const siteName = "Joscha Aaron Schmidt | Full Stack Developer, IT, OSINT & Cybersecurity";
const siteDescription = "Full Stack Development, Webentwicklung, IT, OSINT, Linux, Cybersecurity und Cloud Computing von Joscha Aaron Schmidt. Technische Projekte, Recherche und Security Ressourcen.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), title: { default: siteName, template: "%s | Joscha Aaron Schmidt" }, description: siteDescription, applicationName: "Joscha Aaron Schmidt", authors: [{ name: "Joscha Aaron Schmidt", url: siteUrl }], creator: "Joscha Aaron Schmidt", publisher: "Joscha Aaron Schmidt",
  keywords: ["Full Stack Developer", "Full Stack Development", "Webentwicklung", "Website erstellen", "Webdesign", "Cybersecurity", "IT Security", "OSINT", "Linux", "Web Security", "Cloud Computing", "Vercel", "Cloudflare", "Joscha Aaron Schmidt", "Linux Aaron"],
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], shortcut: ["/icon.svg"] }, alternates: { canonical: siteUrl }, robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { title: siteName, description: siteDescription, type: "website", url: siteUrl, siteName, locale: "de_DE" }, twitter: { card: "summary_large_image", title: siteName, description: siteDescription },
};

const personSchema = { "@context": "https://schema.org", "@type": "Person", name: "Joscha Aaron Schmidt", alternateName: "Linux Aaron", url: siteUrl, email: "mailto:joschaschmidt@mail.de", sameAs: ["https://github.com/linuxaaron"], jobTitle: "Full Stack Developer", knowsAbout: ["Full Stack Development", "Webentwicklung", "Cybersecurity", "OSINT", "Linux", "Web Security", "Cloud Computing", "IT"] };
const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", name: siteName, url: siteUrl, description: siteDescription, inLanguage: "de-DE", publisher: { "@type": "Person", name: "Joscha Aaron Schmidt", url: siteUrl } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className="dark">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/icon.svg" type="image/svg+xml" />
        <meta name="google-site-verification" content="SjcxIb0LYpV5eAe7mZOXWJgi7nXtGW8fSQIGP2A9erY" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <style>{`body > div[aria-live="polite"] { width: 100% !important; max-width: none !important; padding-left: 0 !important; padding-right: 0 !important; margin-left: 0 !important; margin-right: 0 !important; } body > div[aria-live="polite"] > div { margin-left: 0 !important; } .hero-glow .mb-7.inline-flex { display: none !important; }`}</style>
      </head>
      <body>
        <CursorLiquid />
        <SiteHeader />
        <BitcoinTicker />
        {children}
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
