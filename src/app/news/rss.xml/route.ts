import { getCyberNews } from "@/lib/cyber-news";

export const revalidate = 86400;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const items = await getCyberNews(30);
  const now = new Date().toUTCString();
  const body = items
    .map(
      (item) =>
        `<item><title>${escapeXml(`[${item.source}] ${item.title}`)}</title><link>${escapeXml(item.link)}</link><guid isPermaLink="true">${escapeXml(item.link)}</guid><pubDate>${new Date(item.date || Date.now()).toUTCString()}</pubDate><description>${escapeXml(item.description || "Aktuelle Cybersecurity Meldung")}</description></item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>LinuxAaron Cyber News</title><link>https://www.joschaschmidt.com/news</link><description>Aggregierter Cybersecurity Newsfeed</description><language>de-DE</language><lastBuildDate>${now}</lastBuildDate><ttl>1440</ttl>${body}</channel></rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
