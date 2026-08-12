import type { Metadata } from "next";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsent } from "@/components/cookie-consent";
import { BitcoinTicker } from "@/components/bitcoin-ticker";

const siteUrl = "https://linuxaaron.dpdns.org";
const siteName = "Linux Aaron | Joscha Aaron Schmidt";
const siteDescription = "Webentwicklung, IT, OSINT, Linux und Cybersecurity von Joscha Aaron Schmidt. Professionelle Websites, technische Projekte und Security-Ressourcen.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | Linux Aaron",
  },
  description: siteDescription,
  applicationName: "Linux Aaron",
  authors: [{ name: "Joscha Aaron Schmidt", url: siteUrl }],
  creator: "Joscha Aaron Schmidt",
  publisher: "Joscha Aaron Schmidt",
  keywords: [
    "Webentwicklung",
    "Website erstellen",
    "Webdesign",
    "Cybersecurity",
    "IT Security",
    "OSINT",
    "Linux",
    "Web Security",
    "Joscha Aaron Schmidt",
    "Linux Aaron",
  ],
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    type: "website",
    url: siteUrl,
    siteName,
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Joscha Aaron Schmidt",
  alternateName: "Linux Aaron",
  url: siteUrl,
  email: "mailto:aaronfree00@proton.me",
  sameAs: ["https://github.com/linuxaaron"],
  knowsAbout: ["Webentwicklung", "Cybersecurity", "OSINT", "Linux", "Web Security", "IT"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  inLanguage: "de-DE",
  publisher: { "@type": "Person", name: "Joscha Aaron Schmidt", url: siteUrl },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className="dark">
      <head>
        <meta name="google-site-verification" content="SjcxIb0LYpV5eAe7mZOXWJgi7nXtGW8fSQIGP2A9erY" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <style>{`body > div[aria-live="polite"] { width: 100% !important; max-width: none !important; padding-left: 0 !important; padding-right: 0 !important; margin-left: 0 !important; margin-right: 0 !important; } body > div[aria-live="polite"] > div { margin-left: 0 !important; } .hero-glow .mb-7.inline-flex { display: none !important; }`}</style>
      </head>
      <body>
        <SiteHeader />
        <BitcoinTicker />
        {children}
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
