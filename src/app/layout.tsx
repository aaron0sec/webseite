import type { Metadata } from "next";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsent } from "@/components/cookie-consent";
import { BitcoinTicker } from "@/components/bitcoin-ticker";
import { CursorLiquid } from "@/components/cursor-liquid";
import { CuteFooterCat } from "@/components/cute-footer-cat";

const siteUrl = "https://www.joschaschmidt.com";
const siteName = "Joscha Schmidt | Webentwicklung & Cybersecurity";
const siteDescription = "Joscha Schmidt, auch Joscha Aaron Schmidt, entwickelt professionelle Websites und Webanwendungen und arbeitet mit Linux, OSINT, Web Security und Cybersecurity.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: "%s | Joscha Schmidt" },
  description: siteDescription,
  applicationName: "Joscha Schmidt",
  authors: [{ name: "Joscha Schmidt", url: siteUrl }],
  creator: "Joscha Schmidt",
  publisher: "Joscha Schmidt",
  keywords: [
    "Joscha Schmidt", "Joscha Aaron Schmidt", "Webentwicklung", "Website erstellen", "Webdesign",
    "Full Stack Development", "Cybersecurity", "Web Security", "IT Security",
    "OSINT", "Linux", "Cloud Computing", "Security Audit", "IT Beratung", "Linux Aaron"
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"]
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 }
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    type: "website",
    url: siteUrl,
    siteName,
    locale: "de_DE"
  },
  twitter: { card: "summary_large_image", title: siteName, description: siteDescription },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Joscha Aaron Schmidt",
  alternateName: ["Joscha Schmidt", "Linux Aaron"],
  url: siteUrl,
  email: "mailto:joschaschmidt@mail.de",
  sameAs: ["https://github.com/linuxaaron", "https://www.instagram.com/linux_aaron/", "https://www.tiktok.com/@linux_aaron/"],
  jobTitle: "Full Stack Developer",
  knowsAbout: ["Webentwicklung", "Full Stack Development", "Cybersecurity", "Web Security", "OSINT", "Linux", "Cloud Computing", "IT"],
  mainEntityOfPage: siteUrl
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "Joscha Schmidt",
  alternateName: ["Joscha Aaron Schmidt", "Linux Aaron"],
  url: siteUrl,
  description: siteDescription,
  inLanguage: "de-DE",
  publisher: { "@id": `${siteUrl}/#person` },
  about: { "@id": `${siteUrl}/#person` }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="google-site-verification" content="SjcxIb0LYpV5eAe7mZOXWJgi7nXtGW8fSQIGP2A9erY" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body>
        <CursorLiquid />
        <SiteHeader />
        <BitcoinTicker />
        {children}
        <SiteFooter />
        <CuteFooterCat />
        <CookieConsent />
      </body>
    </html>
  );
}
