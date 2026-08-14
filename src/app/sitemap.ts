import type { MetadataRoute } from "next";

const base = "https://joschaschmidt.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/projekte",
    "/webentwicklung",
    "/shop",
    "/blog",
    "/news",
    "/newsletter",
    "/ueber-mich",
    "/kontakt",
    "/buchung",
    "/rechtlicher-hinweis",
    "/impressum",
    "/datenschutz",
    "/blog/osint-webanalyse",
    "/blog/essential-linux-commands-cybersecurity",
    "/blog/burp-suite-nuclei-websecurity",
    "/blog/hardware-geldmacherei-it-einsteiger",
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path.startsWith("/blog/") || path === "/news" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/webentwicklung" || path === "/projekte" ? 0.9 : 0.7,
  }));
}
