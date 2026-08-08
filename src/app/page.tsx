import { ArrowUpRight, Github, ShieldCheck, Terminal, Search, Code2 } from "lucide-react";
import { Reveal } from "@/components/reveal";

const skills = [
  { icon: Search, title: "OSINT", text: "Strukturierte Recherche, Quellenbewertung und technische Webanalyse." },
  { icon: ShieldCheck, title: "Web Security", text: "Security-orientierte Analyse von Webanwendungen und Infrastruktur." },
  { icon: Terminal, title: "Linux", text: "Linux-first Workflows, Automatisierung, Netzwerk- und Systemanalyse." },
  { icon: Code2, title: "Development", text: "TypeScript, Next.js und kleine Tools für Security- und Analyse-Workflows." },
];

export default function Home() {
  const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: "Joscha Aaron Schmidt", jobTitle: "OSINT Specialist | Web Security | Cybersecurity | Linux", url: "https://joscha-sec.vercel.app", sameAs: ["https://github.com/aaron0sec"] };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <section className="grid-bg hero-glow border-b border-[var(--border)]">
      <div className="container flex min-h-[calc(100vh-64px)] items-center py-24">
        <div className="max-w-4xl">
          <Reveal><p className="mb-5 font-mono text-sm text-[var(--accent)]">OSINT · WEB SECURITY · CYBERSECURITY · LINUX</p></Reveal>
          <Reveal delay={.05}><h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">Technische Analyse.<br/><span className="text-[var(--muted)]">Saubere Lösungen.</span></h1></Reveal>
          <Reveal delay={.1}><p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)]">Ich entwickle und untersuche technische Systeme mit Fokus auf Open-Source Intelligence, Web Security, Linux und praxisnahe Cybersecurity-Workflows.</p></Reveal>
          <Reveal delay={.15}><div className="mt-9 flex flex-wrap gap-3"><a href="/projekte" className="inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-5 py-3 text-sm font-medium text-[var(--bg)]">Projekte ansehen <ArrowUpRight size={16}/></a><a href="/kontakt" className="rounded-full border border-[var(--border)] px-5 py-3 text-sm font-medium">Kontakt</a><a href="https://github.com/aaron0sec" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm font-medium"><Github size={16}/> GitHub</a></div></Reveal>
        </div>
      </div>
    </section>

    <section className="border-b border-[var(--border)] py-24"><div className="container"><Reveal><div className="mb-10 flex items-end justify-between gap-6"><div><p className="font-mono text-xs text-[var(--accent)]">01 / FOCUS</p><h2 className="mt-2 text-3xl font-semibold">Schwerpunkte</h2></div></div></Reveal><div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-2">{skills.map(({icon: Icon,title,text},i)=><Reveal key={title} delay={i*.05}><article className="h-full bg-[var(--surface)] p-7"><Icon size={20} className="text-[var(--accent)]"/><h3 className="mt-8 text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-[var(--muted)]">{text}</p></article></Reveal>)}</div></div></section>

    <section className="py-24"><div className="container"><Reveal><div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-12"><p className="font-mono text-xs text-[var(--accent)]">02 / NOW</p><h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Ich baue eigene Tools, dokumentiere Erkenntnisse und veröffentliche ausgewählte Projekte als Open Source.</h2><a href="/projekte" className="mt-8 inline-flex items-center gap-2 text-sm font-medium">Zu den Projekten <ArrowUpRight size={16}/></a></div></Reveal></div></section>
  </main>;
}
