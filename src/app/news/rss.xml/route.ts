import { getCyberNews } from "@/lib/cyber-news";

export const revalidate = 900;

const escapeXml = (value: string) => value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");

export async function GET() {
  const items = await getCyberNews(30);
  const body = items.map(item => `<item><title>${escapeXml(`[${item.source}] ${item.title}`)}</title><link>${escapeXml(item.link)}</link><guid isPermaLink="true">${escapeXml(item.link)}</guid><pubDate>${new Date(item.date || Date.now()).toUTCString()}</pubDate><description>${escapeXml(item.description || "Aktuelle Cybersecurity-Meldung")}</description></item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>LinuxAaron Cyber News</title><link>https://linuxaaron.dpdns.org/news</link><description>Aggregierter Cybersecurity-Newsfeed</description><language>de-DE</language>${body}</channel></rss>`;
  return new Response(xml,{headers:{"content-type":"application/rss+xml; charset=utf-8","cache-control":"public, s-maxage=900, stale-while-revalidate=3600"}});
}
