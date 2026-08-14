import type { MetadataRoute } from "next";

const base = "https://www.joschaschmidt.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
