import { ArrowUpRight, Radio } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { getCyberNews } from "@/lib/cyber-news";

export const revalidate = 86400;

export const metadata = {
  title: "Cyber News",
  description: "Aktuelle Cybersecurity News aus ausgewählten RSS Feeds.",
  alternates: {
    canonical: "https://joschaschmidt.com/news",
  },
  openGraph: {
    title: "Cyber News | Joscha Aaron Schmidt",
    description: "Aktuelle Cybersecurity News aus ausgewählten RSS Feeds.",
    url: "https://joschaschmidt.com/news",
    type: "website",
  },
};

function formatNewsDate(value: string) {
  if (!value) return "aktuell";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "aktuell";

  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function NewsPage() {
  const items = await getCyberNews(24);

  return (
    <main className="container py-20 sm:py-28">
      <Reveal>
        <p className="font-mono text-xs text-[var(--accent)]">03 / CYBER NEWS</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">Cyber News</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
          Aktuelle Sicherheitsmeldungen direkt aus dem RSS Feed. Die vollständigen Artikel bleiben bei der jeweiligen Quelle.
        </p>
      </Reveal>

      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)]">
        <Radio size={18} className="text-[var(--accent)]" />
        <span>Aktualisierung alle 24 Stunden.</span>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={`${item.link}-${index}`} delay={Math.min(index, 6) * 0.03}>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:-translate-y-0.5 hover:border-[var(--accent)]">
              <div className="flex justify-between gap-4 font-mono text-xs text-[var(--muted)]">
                <span className="text-[var(--accent)]">{item.source}</span>
                <span>{formatNewsDate(item.date)}</span>
              </div>
              <h2 className="mt-4 text-xl font-semibold leading-7">{item.title}</h2>
              {item.description && (
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
              )}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--accent)]"
              >
                Zum Original <ArrowUpRight size={15} />
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      {items.length === 0 && (
        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-[var(--muted)]">
          Die News Quellen sind gerade nicht erreichbar. Bitte später erneut versuchen.
        </div>
      )}
    </main>
  );
}
