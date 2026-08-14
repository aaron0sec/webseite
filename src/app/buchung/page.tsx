import type { Metadata } from "next";
import { ClipboardCheck, GraduationCap, Mail, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Security Audit & Fachvorträge buchen | Joscha Schmidt",
  description: "Technische Security Audits, Web Security Reviews und Fachvorträge zu OSINT, Linux und Cybersecurity anfragen.",
  alternates: { canonical: "/buchung" },
  openGraph: {
    title: "Security Audit & Fachvorträge | Joscha Aaron Schmidt",
    description: "Technische Security Audits, Web Security Reviews und Fachvorträge zu OSINT, Linux und Cybersecurity.",
    url: "https://www.joschaschmidt.com/buchung",
    type: "website",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const email = "joschaschmidt@mail.de";

export default function BookingPage() {
  return (
    <main className="container py-20 sm:py-28">
      <section className="max-w-4xl">
        <p className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">05 / BOOKINGS</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">Audit oder Vortrag anfragen</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
          Du kannst mich für technische Audits, Security Reviews oder Vorträge und Schulungen rund um OSINT, Web Security, Linux und Cybersecurity anfragen.
        </p>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-8">
          <ClipboardCheck className="text-[var(--accent)]" size={24} />
          <h2 className="mt-7 text-2xl font-semibold">Security Audit</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">Strukturierte Prüfung von Webanwendungen, öffentlich sichtbaren Angriffsflächen, Konfigurationen oder technischen Security Fragestellungen.</p>
          <ul className="mt-6 space-y-3 text-sm text-[var(--muted)]"><li>• Web- und Infrastruktur Reviews</li><li>• OSINT- und Angriffsflächenanalyse</li><li>• Technische Dokumentation und Handlungsempfehlungen</li><li>• Tests ausschließlich innerhalb eines vereinbarten Scopes</li></ul>
          <a href={`mailto:${email}?subject=Anfrage%20%E2%80%93%20Security%20Audit`} className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium !text-black transition hover:-translate-y-0.5 hover:bg-zinc-200"><Mail size={16}/> Audit anfragen</a>
        </article>

        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-8">
          <GraduationCap className="text-[var(--accent)]" size={24} />
          <h2 className="mt-7 text-2xl font-semibold">Fachvortrag</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">Technische Vorträge und Schulungen für Bildungseinrichtungen, Communities, Unternehmen oder IT Teams.</p>
          <ul className="mt-6 space-y-3 text-sm text-[var(--muted)]"><li>• OSINT und digitale Recherche</li><li>• Grundlagen und Praxis der Web Security</li><li>• Linux für Security und Administration</li><li>• Cybersecurity, Threat Awareness und Incident Response</li></ul>
          <a href={`mailto:${email}?subject=Anfrage%20%E2%80%93%20Fachvortrag`} className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--accent)]/60 px-5 py-3 text-sm font-medium text-[var(--accent)] transition hover:bg-[var(--accent)]/10"><Mail size={16}/> Vortrag anfragen</a>
        </article>
      </section>

      <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-7 sm:p-8">
        <div className="flex gap-4"><ShieldCheck className="mt-1 shrink-0 text-[var(--accent)]" size={22}/><div><h2 className="text-lg font-semibold">So läuft die Anfrage ab</h2><p className="mt-2 leading-7 text-[var(--muted)]">Schreibe kurz, worum es geht, für wen die Leistung gedacht ist, welchen Umfang du erwartest und welchen Zeitraum du bevorzugst. Danach klären wir Scope, Termin, Format und Konditionen individuell. Eine Buchung ist erst nach meiner Bestätigung verbindlich.</p><p className="mt-4 text-sm text-[var(--muted)]">Direkter Kontakt: <a className="text-[var(--accent)] hover:underline" href={`mailto:${email}`}>{email}</a></p></div></div>
      </section>
    </main>
  );
}
