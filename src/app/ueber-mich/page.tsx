import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Über mich",
  description:
    "Joscha Aaron Schmidt: Full Stack Development, Webdesign, Cloud, Linux, OSINT, Cybersecurity, Programmierung, Netzwerktechnik und technische Recherche.",
};

const skills = [
  "Full Stack Development",
  "Webdesign & Webentwicklung",
  "Vercel & Cloudflare",
  "Oracle Cloud / Cloud Computing",
  "Python, Rust, JavaScript, TypeScript, Go",
  "HTML, CSS & PHP",
  "SQL & Datenverarbeitung",
  "OSINT & Web Research",
  "Netzwerktechnik",
  "Browser Einrichtung & Systemkonfiguration",
  "Social Media & digitale Projekte",
  "Linux / BSD / Windows / macOS",
  "Git & GitHub",
];

export default function About() {
  return (
    <main className="container py-20 sm:py-28">
      <Reveal>
        <p className="font-mono text-xs text-[var(--accent)]">03 / ABOUT</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">Über mich</h1>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_.6fr]">
        <Reveal>
          <div className="space-y-6 text-lg leading-8 text-[var(--muted)]">
            <p>
              Technik begleitet mich seit meiner Kindheit. Aus meiner frühen
              Begeisterung für Computer und Betriebssysteme hat sich über Jahre
              ein breites, praktisch orientiertes technisches Profil entwickelt.
              Ich arbeite mich gerne tief in Systeme ein, verstehe Zusammenhänge
              und suche nicht nur nach einem schnellen Fix, sondern nach einer
              nachvollziehbaren und robusten Lösung.
            </p>

            <p>
              Mein Schwerpunkt liegt heute auf <strong className="font-medium text-[var(--text)]">Full Stack Development,
              Webdesign, Webentwicklung, Linux, Cybersecurity und OSINT</strong>. Dazu gehören
              moderne Websites, Webanwendungen sowie Deployment und Hosting mit <strong className="font-medium text-[var(--text)]">Vercel
              und Cloudflare</strong> und praktische Erfahrungen mit
              <strong className="font-medium text-[var(--text)]"> Cloud Computing und Oracle Cloud</strong>.
            </p>

            <p>
              Programmierung gehört ebenfalls zu meinem technischen Werkzeugkasten.
              Ich arbeite unter anderem mit <strong className="font-medium text-[var(--text)]">Python, Rust,
              JavaScript, TypeScript, Go, HTML, CSS und PHP</strong> und nutze <strong className="font-medium text-[var(--text)]">SQL</strong>
              für strukturierte Daten und Datenbanklösungen. Git und GitHub nutze
              ich für Versionskontrolle, Projektorganisation und die Veröffentlichung
              eigener Projekte.
            </p>

            <p>
              Eine meiner größten Stärken ist die <strong className="font-medium text-[var(--text)]">Recherche und
              Analyse komplexer Themen</strong>. Besonders im Bereich <strong className="font-medium text-[var(--text)]">OSINT</strong>
              verbinde ich systematische Recherche mit kreativem Denken. Ich kann
              Informationen aus unterschiedlichen Quellen zusammenführen, technische
              Zusammenhänge erkennen und daraus konkrete, praktikable Lösungsansätze
              entwickeln.
            </p>

            <p>
              Darüber hinaus beschäftige ich mich mit <strong className="font-medium text-[var(--text)]">Netzwerktechnik,
              Browser Einrichtung und Systemkonfiguration</strong> sowie mit digitalen
              Projekten und Social Media. Auch die praktische Seite von Hardware und
              Kryptowährungen gehört zu meinen Interessen: Ich habe bereits
              <strong className="font-medium text-[var(--text)]"> Mininganlagen aufgebaut, konfiguriert und in Betrieb genommen</strong>
              und beschäftige mich mit den technischen Hintergründen von Crypto,
              Mining Hardware und Infrastruktur.
            </p>

            <p>
              Mein Arbeitsstil ist technisch, analytisch und lösungsorientiert:
              Problem verstehen, Informationen prüfen, Zusammenhänge erkennen,
              Lösung entwickeln und das Ergebnis sauber umsetzen.
            </p>

            <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-sm leading-6">
              <p className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">RECHTLICHER HINWEIS</p>
              <p className="mt-3 text-[var(--muted)]">
                Die auf dieser Website veröffentlichten technischen Inhalte, Tools und Beispiele dienen ausschließlich zu Lern, Forschungs und Testzwecken. Sicherheitsprüfungen, Penetrationstests oder sonstige Zugriffe auf fremde Systeme dürfen ausschließlich mit ausdrücklicher Genehmigung des jeweiligen Eigentümers und innerhalb eines klar definierten Scopes durchgeführt werden. Eine unbefugte Nutzung ist nicht gestattet.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="font-mono text-xs text-[var(--accent)]">TECHNISCHE SCHWERPUNKTE</p>
            <ul className="mt-5 space-y-3 text-sm text-[var(--muted)]">
              {skills.map((skill) => (
                <li key={skill}>• {skill}</li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </main>
  );
}
