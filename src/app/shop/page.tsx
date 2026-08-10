import type { Metadata } from "next";
import { ArrowRight, Check, FileText, ShieldCheck, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Shop – Linux Security Field Manual",
  description: "Praxisnahe digitale Security-Ressourcen von Linux Aaron für Linux, OSINT und Cybersecurity.",
};

const checkoutUrl = "https://schmidt.lemonsqueezy.com/checkout/buy/d5b413c9-1901-4189-b4c9-108fd68e2dce";

const contents = [
  "Linux Security Grundlagen und Hardening",
  "Netzwerk-, Prozess- und Log-Analyse",
  "OSINT-Workflows und digitale Recherche",
  "Web-Security-Checks und Angriffsflächen",
  "Incident-Response-Kurzcheck",
  "Praxisnahe Checklisten und Command Reference",
];

export default function ShopPage() {
  return (
    <main>
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-20 sm:py-28">
        <div className="container max-w-5xl">
          <p className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">DIGITAL PRODUCTS · LINUX · SECURITY</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Linux Security Field Manual</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">Ein praxisorientierter Leitfaden für Linux, OSINT und Cybersecurity. Keine Theorie-Sammlung, sondern ein Arbeitsbuch für die tägliche technische Analyse.</p>
            </div>
            <div className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--accent)]/8 p-6">
              <p className="font-mono text-xs text-[var(--accent)]">LAUNCHPREIS</p>
              <p className="mt-2 text-4xl font-semibold">29 €</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Einmalig · digital · sofort verfügbar nach dem Kauf</p>
              <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110">Jetzt kaufen <ArrowRight size={16} /></a>
              <p className="mt-3 text-center text-xs text-[var(--muted)]">Sicherer Checkout über Lemon Squeezy</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-20 sm:py-24">
        <div className="container max-w-5xl">
          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"><Terminal className="text-[var(--accent)]" size={22} /><h2 className="mt-6 text-xl font-semibold">Praxis statt Buzzwords</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Konkrete Befehle, Prüfungen und Workflows, die du direkt auf einem Linux-System nachvollziehen kannst.</p></article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"><ShieldCheck className="text-[var(--accent)]" size={22} /><h2 className="mt-6 text-xl font-semibold">Security-Fokus</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Von Hardening über Angriffsflächen bis zur ersten Incident-Response-Triage – mit sauberem Scope.</p></article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"><FileText className="text-[var(--accent)]" size={22} /><h2 className="mt-6 text-xl font-semibold">Als Arbeitsunterlage gedacht</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Checklisten und Referenzen zum Nachschlagen, nicht nur zum einmaligen Durchlesen.</p></article>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface-2)] py-20 sm:py-24">
        <div className="container max-w-5xl grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">IM PAKET</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Was du bekommst</h2><p className="mt-4 leading-7 text-[var(--muted)]">Ein digitales Paket mit dem Field Manual und praktischen Unterlagen zum Nachschlagen.</p></div><ul className="grid gap-3 sm:grid-cols-2">{contents.map((item) => <li key={item} className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm leading-6"><Check className="mt-0.5 shrink-0 text-[var(--accent)]" size={17} /><span>{item}</span></li>)}</ul></div>
      </section>

      <section className="py-20 sm:py-24"><div className="container max-w-3xl text-center"><p className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">LINUX AARON</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Technisches Wissen, das du benutzen kannst.</h2><p className="mx-auto mt-5 max-w-2xl leading-7 text-[var(--muted)]">Der Field Manual ist der erste Schritt. Weitere Security-Ressourcen und Bundles folgen.</p><a href="/newsletter" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">Über neue Produkte informiert werden <ArrowRight size={15} /></a></div></section>
    </main>
  );
}
