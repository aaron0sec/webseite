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
    .replace(/&#x27;/gi, "'")
    .replace(/&#x2F;/gi, "/")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const get = (body: string, name: string) => {
  const match = body.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return match ? clean(match[1]) : "";
};

const getLink = (body: string) => {
  const rssLink = get(body, "link");
  if (rssLink) return rssLink;

  const atomLinks = [...body.matchAll(/<link\b([^>]*)\/?\s*>/gi)];
  for (const match of atomLinks) {
    const attributes = match[1];
    const rel = attributes.match(/\brel=["']([^"']+)["']/i)?.[1];
    const href = attributes.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (href && (!rel || rel === "alternate")) return clean(href);
  }

  return get(body, "guid") || get(body, "id");
};

function parse(xml: string, source: string): CyberNewsItem[] {
  return [...xml.matchAll(/<(item|entry)\b[^>]*>([\s\S]*?)<\/\1>/gi)].flatMap((match) => {
    const body = match[2];
    const title = get(body, "title");
    const date = get(body, "pubDate") || get(body, "published") || get(body, "updated") || get(body, "date");
    const link = getLink(body);
    const description = (get(body, "description") || get(body, "summary") || get(body, "content") || get(body, "content:encoded")).slice(0, 220);

    return title && link ? [{ title, link, date, source, description }] : [];
  });
}

function decodeFeed(buffer: ArrayBuffer, contentType: string | null): string {
  const bytes = new Uint8Array(buffer);
  const headerCharset = contentType?.match(/charset\s*=\s*["']?([^;"'\s]+)/i)?.[1];
  const xmlPrefix = new TextDecoder("ascii").decode(bytes.slice(0, 256));
  const xmlCharset = xmlPrefix.match(/encoding=["']([^"']+)["']/i)?.[1];
  const charset = headerCharset || xmlCharset || "utf-8";

  try {
    return new TextDecoder(charset).decode(bytes);
  } catch {
    return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
  }
}

async function fetchFeed(feed: (typeof FEEDS)[number]): Promise<CyberNewsItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    // Do not cache upstream RSS responses. The page/feed route controls its
    // own caching, while every refresh gets the current source data.
    const response = await fetch(feed.url, {
      cache: "no-store",
      headers: {
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
        "User-Agent": "LinuxAaron-CyberNews/3.1 (+https://joschaschmidt.com/news)",
      },
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const xml = decodeFeed(await response.arrayBuffer(), response.headers.get("content-type"));
    if (!xml.trim()) throw new Error("Leerer Feed");

    const items = parse(xml, feed.source);
    if (!items.length) throw new Error("Keine RSS/Atom-Einträge erkannt");

    return items;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getCyberNews(limit = 24): Promise<CyberNewsItem[]> {
  const results = await Promise.allSettled(FEEDS.map(fetchFeed));
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
