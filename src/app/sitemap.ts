import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://linuxaaron.dpdns.org";
  return [
    "/",
    "/projekte",
    "/blog",
    "/ueber-mich",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/blog/osint-webanalyse",
    "/blog/essential-linux-commands-cybersecurity",
    "/blog/burp-suite-nuclei-websecurity",
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
