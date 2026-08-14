import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Rechtlicher Hinweis",
  description:
    "Rechtlicher Hinweis zu Security Research, Penetrationstests und technischen Inhalten.",
};

export default function LegalNotice() {
  return (
    <main className="container py-20 sm:py-28">
      <Reveal>
        <p className="font-mono text-xs text-[var(--accent)]">LEGAL / SECURITY RESEARCH</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
          Rechtlicher Hinweis
        </h1>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-10 max-w-3xl space-y-6 text-base leading-7 text-[var(--muted)]">
          <p>
            Die auf dieser Website veröffentlichten technischen Inhalte, Tools,
            Beispiele und Demonstrationen dienen ausschließlich zu Lern-,
            Forschungs- und Testzwecken.
          </p>

          <p>
            Sicherheitsprüfungen, Penetrationstests, OSINT Untersuchungen oder
            sonstige Zugriffe auf Systeme und Daten dürfen ausschließlich mit
            ausdrücklicher Genehmigung des jeweiligen Eigentümers und innerhalb
            eines klar definierten und vereinbarten Scopes durchgeführt werden.
          </p>

          <p>
            Das unbefugte Eindringen in fremde Systeme, die Umgehung von
            Zugriffskontrollen, das Auslesen nicht freigegebener Daten oder eine
            sonstige missbräuchliche Nutzung der hier beschriebenen Techniken ist
            ausdrücklich nicht gestattet.
          </p>

          <p>
            Wer technische Inhalte oder bereitgestellte Software verwendet, ist
            selbst dafür verantwortlich, die jeweils geltenden Gesetze,
            Nutzungsbedingungen und Genehmigungen einzuhalten.
          </p>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">
              RESPONSIBLE SECURITY
            </p>
            <p className="mt-3">
              Security Research ist nur dann verantwortungsvoll, wenn Systeme
              geschützt, Eigentumsrechte respektiert und Tests innerhalb einer
              ausdrücklichen Erlaubnis durchgeführt werden.
            </p>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
