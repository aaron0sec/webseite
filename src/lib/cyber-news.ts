export type CyberNewsItem = {
  title: string;
  link: string;
  date: string;
  source: string;
  description?: string;
};

const FEEDS = [
  { source: "heise Security", url: "https://www.heise.de/security/rss/news-atom.xml" },
  { source: "Golem Security", url: "https://rss.golem.de/rss.php?tp=sec&feed=RSS2.0" },
  { source: "LWN", url: "https://lwn.net/headlines/rss" },
  { source: "Phoronix", url: "https://www.phoronix.com/rss.php" },
];

const clean = (value: string) =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/<[^>]+>/g, "")
    .trim();

const get = (body: string, name: string) => {
  const match = body.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return match ? clean(match[1]) : "";
};

const getLink = (body: string) => {
  // RSS 2.0: <link>https://...</link>
  const rssLink = get(body, "link");
  if (rssLink) return rssLink;

  // Atom: <link href="https://..." rel="alternate" />
  const atomLinks = [...body.matchAll(/<link\b([^>]*)\/?\s*>/gi)];
  for (const match of atomLinks) {
    const attributes = match[1];
    const rel = attributes.match(/\brel=["']([^"']+)["']/i)?.[1];
    const href = attributes.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (href && (!rel || rel === "alternate")) return clean(href);
  }

  return get(body, "guid");
};

function parse(xml: string, source: string): CyberNewsItem[] {
  return [...xml.matchAll(/<(item|entry)\b[^>]*>([\s\S]*?)<\/\1>/gi)].flatMap((match) => {
    const body = match[2];
    const title = get(body, "title");
    const date = get(body, "pubDate") || get(body, "published") || get(body, "updated");
    const link = getLink(body);
    const description = (get(body, "description") || get(body, "summary") || get(body, "content")).slice(0, 220);

    return title && link ? [{ title, link, date, source, description }] : [];
  });
}

export async function getCyberNews(limit = 24): Promise<CyberNewsItem[]> {
  const results = await Promise.allSettled(
    FEEDS.map(async (feed) => {
      const response = await fetch(feed.url, {
        headers: {
          Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
          "User-Agent": "LinuxAaron-CyberNews/1.0 (+https://linuxaaron.dpdns.org/news)",
        },
        next: { revalidate: 900 },
      });

      if (!response.ok) throw new Error(`${feed.source}: HTTP ${response.status}`);

      return parse(await response.text(), feed.source);
    }),
  );

  const map = new Map<string, CyberNewsItem>();

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      result.value.forEach((item) => map.set(item.link.replace(/#.*$/, ""), item));
    }
  });

  return [...map.values()]
    .sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0))
    .slice(0, limit);
}
