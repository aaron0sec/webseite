export type CyberNewsItem = { title: string; link: string; date: string; source: string; description?: string };
const FEEDS = [{ source: "heise Security", url: "https://www.heise.de/security/news/news-atom.xml" }];
const clean = (v: string) => v.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<[^>]+>/g, "").trim();
const get = (b: string, n: string) => { const m = b.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)</${n}>`, "i")); return m ? clean(m[1]) : ""; };
function parse(xml: string, source: string): CyberNewsItem[] { return [...xml.matchAll(/<(item|entry)[^>]*>([\s\S]*?)<\/\1>/gi)].flatMap(m => { const b=m[2], title=get(b,"title"), date=get(b,"pubDate")||get(b,"published")||get(b,"updated"), link=get(b,"link")||get(b,"guid"); return title&&link ? [{title,link,date,source,description:get(b,"description")||get(b,"summary")}] : []; }); }
export async function getCyberNews(limit=24): Promise<CyberNewsItem[]> { const r=await fetch(FEEDS[0].url,{next:{revalidate:900}}); if(!r.ok)return []; return parse(await r.text(),FEEDS[0].source).slice(0,limit); }
