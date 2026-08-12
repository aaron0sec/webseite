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
    "/ueber-mich",
    "/kontakt",
    "/buchung",
    "/impressum",
    "/datenschutz",
    "/blog/osint-webanalyse",
    "/blog/essential-linux-commands-cybersecurity",
    "/blog/burp-suite-nuclei-websecurity",
    "/blog/hardware-geldmacherei-it-einsteiger",
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
  }));
}
