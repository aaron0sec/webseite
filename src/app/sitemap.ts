import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base = "https://joscha-sec.vercel.app"; return ["/", "/projekte", "/blog", "/ueber-mich", "/kontakt", "/impressum", "/datenschutz", "/blog/osint-webanalyse"].map((path) => ({ url: `${base}${path}`, lastModified: new Date() })); }
