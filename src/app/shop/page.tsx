import type { Metadata } from "next";
import { ArrowRight, Check, FileText, Globe, ShieldCheck, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Shop – Linux Aaron Security & Web Services",
  description: "Digitale Security-Ressourcen sowie professionelle Webentwicklung und Hosting von Linux Aaron.",
};

const fieldManualCheckoutUrl = "https://schmidt.lemonsqueezy.com/checkout/buy/d5b413c9-1901-4189-b4c9-108fd68e2dce";
const cyberSecurityStartCheckoutUrl = "https://schmidt.lemonsqueezy.com/checkout/buy/ea9ac7d5-beba-447c-aa36-adc255671a0d";

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

const websitePackages = [
  {
    label: "LANDINGPAGE",
    name: "Onepage",
    price: "299 €",
    description: "Eine moderne, schnelle und responsive Landingpage für Selbstständige, Projekte, Dienstleistungen oder kleine Unternehmen.",
    items: [
      "Individuelles modernes Design",
      "Responsive für Smartphone, Tablet und Desktop",
      "Hero-, Leistungs-, Über-uns- und Kontaktbereiche",
      "Basis-SEO und saubere technische Struktur",
      "SSL und Deployment",
      "1 Korrekturrunde",
    ],
  },
  {
    label: "BELIEBT",
    name: "Business Website",
    price: "499 €",
    description: "Landingpage plus mehrere Unterseiten für Unternehmen, Vereine und Selbstständige, die mehr als eine einzelne Seite benötigen.",
    items: [
      "Alles aus Onepage",
      "Bis zu 5 Unterseiten",
      "Individuelle Navigation und Seitenstruktur",
      "Kontaktformular nach vereinbartem Umfang",
      "Basis-SEO für die wichtigsten Seiten",
      "2 Korrekturrunden",
    ],
  },
  {
    label: "INDIVIDUELL",
    name: "Business Plus",
    price: "799 €",
    description: "Umfangreichere Websites mit bis zu 10 Seiten und individuellen Anforderungen. Komplexere Funktionen werden separat kalkuliert.",
    items: [
      "Alles aus Business Website",
      "Bis zu 10 Seiten",
      "Individuelle Funktionen nach Absprache",
      "Technische Optimierung",
      "Erweiterte SEO-Basis",
      "3 Korrekturrunden",
    ],
  },
];

export default function ShopPage() {
  return (
    <main>
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-20 sm:py-28">
        <div className="container max-w-6xl">
          <p className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">DIGITAL PRODUCTS · WEBENTWICKLUNG · CYBERSECURITY</p>
          <div className="mt-5 max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Technische Lösungen ohne Agentur-Aufschlag.</h1>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">Digitale Security-Ressourcen und moderne Websites zu transparenten Preisen. Professionell umgesetzt, responsive und auf Wunsch direkt für dich gehostet.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-16 sm:py-20">
        <div className="container max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">WEBENTWICKLUNG</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Deine Website. Modern, schnell und fair kalkuliert.</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">Du brauchst eine professionelle Website, möchtest aber kein großes Agenturbudget ausgeben? Ich entwickle individuelle Websites für Selbstständige, kleine Unternehmen, Vereine und Projekte.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {websitePackages.map((pkg, index) => (
              <article key={pkg.name} className={`flex flex-col rounded-3xl border p-7 sm:p-8 ${index === 1 ? "border-[var(--accent)]/60 bg-[var(--accent)]/5" : "border-[var(--border)] bg-[var(--surface)]"}`}>
                <div>
                  <p className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">{pkg.label}</p>
                  <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                    <h3 className="text-2xl font-semibold">{pkg.name}</h3>
                    <p className="text-3xl font-bold tracking-tight">{pkg.price}</p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{pkg.description}</p>
                </div>
                <ul className="mt-7 grid gap-3">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6">
                      <Check className="mt-0.5 shrink-0 text-[var(--accent)]" size={17} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <a href="/kontakt" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-base font-bold text-black transition hover:brightness-110">
                    Website anfragen <ArrowRight size={17} />
                  </a>
                  <p className="mt-3 text-center text-xs text-[var(--muted)]">Individuelles Angebot vor Projektstart · keine versteckten Paketkosten</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-[var(--accent)]/40 bg-[var(--surface)] p-7 sm:p-8">
              <div className="flex items-start gap-4">
                <Globe className="mt-1 shrink-0 text-[var(--accent)]" size={25} />
                <div>
                  <h3 className="text-xl font-semibold">Hosting für 25 € / Monat</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Auf Wunsch übernehme ich den laufenden Betrieb deiner Website für einen festen monatlichen Preis.</p>
                </div>
              </div>
              <ul className="mt-6 grid gap-3 text-sm leading-6">
                <li className="flex gap-3"><Check className="mt-0.5 shrink-0 text-[var(--accent)]" size={17} /><span>Deployment und technischer Betrieb</span></li>
                <li className="flex gap-3"><Check className="mt-0.5 shrink-0 text-[var(--accent)]" size={17} /><span>HTTPS/SSL</span></li>
                <li className="flex gap-3"><Check className="mt-0.5 shrink-0 text-[var(--accent)]" size={17} /><span>Technische Basiswartung im vereinbarten Umfang</span></li>
                <li className="flex gap-3"><Check className="mt-0.5 shrink-0 text-[var(--accent)]" size={17} /><span>Kein eigenes Hosting-Setup beim Kunden erforderlich</span></li>
              </ul>
              <p className="mt-5 text-xs leading-5 text-[var(--muted)]">Domainregistrierung, kostenpflichtige Drittanbieter-Dienste und umfangreiche Änderungen sind nicht automatisch enthalten und werden vorab abgesprochen.</p>
            </article>

            <article className="rounded-3xl border border-[var(--border)] bg-[var(--surface-2)] p-7 sm:p-8">
              <p className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">ABLAUF</p>
              <h3 className="mt-3 text-xl font-semibold">Von der Idee bis zur fertigen Website</h3>
              <ol className="mt-6 grid gap-4 text-sm leading-6">
                <li><strong>01 · Anfrage:</strong> Du beschreibst kurz dein Projekt und den gewünschten Umfang.</li>
                <li><strong>02 · Angebot:</strong> Du erhältst einen klaren Preis und einen definierten Leistungsumfang.</li>
                <li><strong>03 · Umsetzung:</strong> Ich entwickle die Website und stelle eine Vorschau bereit.</li>
                <li><strong>04 · Abnahme:</strong> Änderungsrunde(n) werden nach dem gewählten Paket umgesetzt.</li>
                <li><strong>05 · Veröffentlichung:</strong> Die fertige Website geht auf deine Domain oder in das gebuchte Hosting.</li>
              </ol>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface-2)] py-16 sm:py-20">
        <div className="container max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">DIGITALE PRODUKTE</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Security-Wissen, das du benutzen kannst.</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">Vom verständlichen Einstieg bis zur technischen Arbeitsunterlage: Wähle den passenden Einstieg in die Security-Welt von Linux Aaron.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="flex flex-col rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-8">
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">EINSTIEG</p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                  <h3 className="text-2xl font-semibold sm:text-3xl">Cybersecurity Start</h3>
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
                <a href={cyberSecurityStartCheckoutUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-base font-bold text-black transition hover:brightness-110">
                  Jetzt kaufen <ArrowRight size={17} />
                </a>
                <p className="mt-3 text-center text-xs text-[var(--muted)]">Einmalig · digitales Produkt · Zahlungsabwicklung über Lemon Squeezy</p>
              </div>
            </article>

            <article className="flex flex-col rounded-3xl border border-[var(--accent)]/50 bg-[var(--accent)]/5 p-7 sm:p-8">
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">PRAXIS</p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                  <h3 className="text-2xl font-semibold sm:text-3xl">Linux Security Field Manual</h3>
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
                <a href={fieldManualCheckoutUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-base font-bold text-black transition hover:brightness-110">
                  Jetzt kaufen <ArrowRight size={17} />
                </a>
                <p className="mt-3 text-center text-xs text-[var(--muted)]">Einmalig · digitales Produkt · Zahlungsabwicklung über Lemon Squeezy</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-16 sm:py-20">
        <div className="container max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"><Terminal className="text-[var(--accent)]" size={22} /><h2 className="mt-6 text-xl font-semibold">Praxis statt Buzzwords</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Konkrete Inhalte und nachvollziehbare Arbeitsweisen statt leerer Security-Begriffe.</p></article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"><ShieldCheck className="text-[var(--accent)]" size={22} /><h2 className="mt-6 text-xl font-semibold">Defensiv und nachvollziehbar</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Die Inhalte legen Wert auf Scope, Einordnung, Dokumentation und sichere Praxis.</p></article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"><FileText className="text-[var(--accent)]" size={22} /><h2 className="mt-6 text-xl font-semibold">Digitale Arbeitsunterlagen</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Für Lernen, Nachschlagen und die praktische Arbeit am eigenen System.</p></article>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-16"><div className="container max-w-3xl"><h2 className="text-2xl font-semibold">Kauf und Zahlungsabwicklung</h2><p className="mt-4 leading-7 text-[var(--muted)]">Der Kauf und die Bereitstellung der digitalen Produkte erfolgen über Lemon Squeezy. Lemon Squeezy tritt bei den Verkäufen als Merchant of Record auf und übernimmt die Zahlungsabwicklung sowie die Abwicklung von Umsatzsteuer/VAT im Rahmen seines Dienstes.</p><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Weitere Informationen zur Verarbeitung personenbezogener Daten findest du in der <a className="text-[var(--accent)] underline" href="/datenschutz">Datenschutzerklärung</a>.</p></div></section>

      <section className="py-20 sm:py-24"><div className="container max-w-3xl text-center"><p className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">LINUX AARON</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Technische Lösungen, die du benutzen kannst.</h2><p className="mx-auto mt-5 max-w-2xl leading-7 text-[var(--muted)]">Weitere Security-Ressourcen, Bundles und Webservices können später ergänzt werden.</p><a href="/newsletter" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">Über neue Produkte informiert werden <ArrowRight size={15} /></a></div></section>
    </main>
  );
}
