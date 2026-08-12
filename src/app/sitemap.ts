import type { MetadataRoute } from "next";

const base = "https://linuxaaron.dpdns.org";

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
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
