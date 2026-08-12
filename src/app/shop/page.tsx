import type { Metadata } from "next";
import { ArrowRight, Check, FileText, ShieldCheck, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Shop – Linux Aaron Security Resources",
  description: "Digitale Security-Ressourcen von Linux Aaron für Cybersecurity, Linux, OSINT und technische Security-Analyse.",
};

const fieldManualCheckoutUrl = "https://schmidt.lemonsqueezy.com/checkout/buy/d5b413c9-1901-4189-b4c9-108fd68e2dce";

const fieldManualContents = [
  "Linux-Systemcheck und Hardening",
  "Netzwerk-, Prozess- und Log-Analyse",
  "OSINT-Workflows und digitale Recherche",
  "Web-Security-Quickcheck",
  "Incident-Response-Kurzcheck",
  "Checklisten und Command Reference",
];

const ebookContents = [
  "Cybersecurity verständlich und praxisnah",
  "Netzwerke, Betriebssysteme und Security-Mindset",
  "Angriffe verstehen und Defensive Security",
  "Linux, Nmap, Burp Suite und Security-Labor",
  "Persönliche digitale Sicherheit",
  "90-Tage-Lernplan und Weg in die Security",
];

export default function ShopPage() {
  return (
    <main>
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-20 sm:py-28">
        <div className="container max-w-6xl">
          <p className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">DIGITAL PRODUCTS · LINUX · CYBERSECURITY</p>
          <div className="mt-5 max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Security-Wissen, das du benutzen kannst.</h1>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">Vom verständlichen Einstieg bis zur technischen Arbeitsunterlage: Wähle den passenden Einstieg in die Security-Welt von Linux Aaron.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-16 sm:py-20">
        <div className="container max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="flex flex-col rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-8">
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">EINSTIEG</p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                  <h2 className="text-2xl font-semibold sm:text-3xl">Cybersecurity Start</h2>
                  <p className="text-4xl font-bold tracking-tight sm:text-5xl">14,99 €</p>
                </div>
                <p className="mt-4 leading-7 text-[var(--muted)]">Das E-Book für alle, die Cybersecurity systematisch verstehen und sich Schritt für Schritt ein solides Fundament aufbauen möchten.</p>
              </div>
              <ul className="mt-7 grid gap-3">
                {ebookContents.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6">
                    <Check className="mt-0.5 shrink-0 text-[var(--accent)]" size={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-5">
                  <p className="text-sm font-medium">Ideal für Einsteiger</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Verstehen → üben → eigenes Security-Labor aufbauen.</p>
                </div>
                <button type="button" disabled className="mt-5 inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold opacity-70">
                  Checkout wird eingerichtet
                </button>
              </div>
            </article>

            <article className="flex flex-col rounded-3xl border border-[var(--accent)]/50 bg-[var(--accent)]/5 p-7 sm:p-8">
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">PRAXIS</p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                  <h2 className="text-2xl font-semibold sm:text-3xl">Linux Security Field Manual</h2>
                  <p className="text-4xl font-bold tracking-tight sm:text-5xl">29,00 €</p>
                </div>
                <p className="mt-4 leading-7 text-[var(--muted)]">Eine technische Arbeitsunterlage für Linux, OSINT und Security-Analyse. Nicht nur lesen – prüfen, einordnen und dokumentieren.</p>
              </div>
              <ul className="mt-7 grid gap-3">
                {fieldManualContents.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6">
                    <Check className="mt-0.5 shrink-0 text-[var(--accent)]" size={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <div className="rounded-2xl border border-[var(--accent)]/25 bg-[var(--surface)] p-5">
                  <p className="text-sm font-medium">Für die praktische Arbeit</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Konkrete Befehle, Prüfabläufe und Referenzen für technische Security-Checks.</p>
                </div>
                <a href={fieldManualCheckoutUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110">
                  Jetzt kaufen <ArrowRight size={16} />
                </a>
                <p className="mt-3 text-center text-xs text-[var(--muted)]">Einmalig · digitales Produkt · Zahlungsabwicklung über Lemon Squeezy</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface-2)] py-16 sm:py-20">
        <div className="container max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"><Terminal className="text-[var(--accent)]" size={22} /><h2 className="mt-6 text-xl font-semibold">Praxis statt Buzzwords</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Konkrete Inhalte und nachvollziehbare Arbeitsweisen statt leerer Security-Begriffe.</p></article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"><ShieldCheck className="text-[var(--accent)]" size={22} /><h2 className="mt-6 text-xl font-semibold">Defensiv und nachvollziehbar</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Die Inhalte legen Wert auf Scope, Einordnung, Dokumentation und sichere Praxis.</p></article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"><FileText className="text-[var(--accent)]" size={22} /><h2 className="mt-6 text-xl font-semibold">Digitale Arbeitsunterlagen</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Für Lernen, Nachschlagen und die praktische Arbeit am eigenen System.</p></article>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-16"><div className="container max-w-3xl"><h2 className="text-2xl font-semibold">Welches Produkt passt zu dir?</h2><div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-[var(--border)] p-5"><p className="text-2xl font-bold">14,99 € · Einstieg</p><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Du möchtest mit Cybersecurity Start die Grundlagen verstehen und einen strukturierten Lernweg beginnen.</p></div><div className="rounded-2xl border border-[var(--border)] p-5"><p className="text-2xl font-bold">29,00 € · Praxis</p><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Du willst direkt mit Linux-Kommandos, Checks, OSINT und technischer Analyse arbeiten.</p></div></div></div></section>

      <section className="border-b border-[var(--border)] py-16"><div className="container max-w-3xl"><h2 className="text-2xl font-semibold">Kauf und Zahlungsabwicklung</h2><p className="mt-4 leading-7 text-[var(--muted)]">Der Kauf und die Bereitstellung der digitalen Produkte erfolgen über Lemon Squeezy. Lemon Squeezy tritt bei den Verkäufen als Merchant of Record auf und übernimmt die Zahlungsabwicklung sowie die Abwicklung von Umsatzsteuer/VAT im Rahmen seines Dienstes.</p><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Weitere Informationen zur Verarbeitung personenbezogener Daten findest du in der <a className="text-[var(--accent)] underline" href="/datenschutz">Datenschutzerklärung</a>.</p></div></section>

      <section className="py-20 sm:py-24"><div className="container max-w-3xl text-center"><p className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">LINUX AARON</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Technisches Wissen, das du benutzen kannst.</h2><p className="mx-auto mt-5 max-w-2xl leading-7 text-[var(--muted)]">Weitere Security-Ressourcen und Bundles können später ergänzt werden.</p><a href="/newsletter" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">Über neue Produkte informiert werden <ArrowRight size={15} /></a></div></section>
    </main>
  );
}
