import { ArrowUpRight, ShieldCheck, Terminal, Search, Code2, Activity, Globe2, LockKeyhole, Cpu } from "lucide-react";
import { Reveal } from "@/components/reveal";

const skills = [
  { icon: Search, title: "OSINT", text: "Strukturierte Recherche, Quellenbewertung und technische Webanalyse." },
  { icon: ShieldCheck, title: "Web Security", text: "Security-orientierte Analyse von Webanwendungen, APIs und Infrastruktur." },
  { icon: Terminal, title: "Linux", text: "Linux-first Workflows, Automatisierung, Netzwerk- und Systemanalyse." },
  { icon: Code2, title: "Development", text: "TypeScript, Next.js und eigene Tools für Security- und Analyse-Workflows." },
];

const projects = [
  { name: "web-osint", text: "Technische Webanalyse und OSINT-Workflows.", href: "https://github.com/aaron0sec/web-osint" },
  { name: "malware-analyzer", text: "Strukturierte Analyse verdächtiger Dateien.", href: "https://github.com/aaron0sec/malware-analyzer" },
];

export default function Home() {
  const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: "Joscha Aaron Schmidt", jobTitle: "OSINT Specialist | Web Security | Cybersecurity | Linux", url: "https://digitalplat.org", sameAs: ["https://www.instagram.com/linux_aaron/", "https://www.tiktok.com/@linux_aaron"] };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

    <section className="grid-bg hero-glow relative overflow-hidden border-b border-[var(--border)]">
      <div className="container grid min-h-[calc(100vh-64px)] items-center gap-14 py-20 lg:grid-cols-[1.25fr_.75fr] lg:py-28">
        <div className="max-w-4xl">
          <Reveal><div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] px-3 py-1.5 font-mono text-xs text-[var(--muted)]"><span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]"/> verfügbar für technische Projekte</div></Reveal>
          <Reveal><p className="mb-5 font-mono text-xs tracking-[0.22em] text-[var(--accent)]">OSINT · WEB SECURITY · CYBERSECURITY · LINUX</p></Reveal>
          <Reveal delay={.05}><h1 className="text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-8xl">Technische<br/><span className="text-[var(--muted)]">Analyse.</span></h1></Reveal>
          <Reveal delay={.1}><p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)]">Ich untersuche Systeme, recherchiere digitale Spuren und entwickle praktische Security-Tools — mit Fokus auf nachvollziehbare Ergebnisse.</p></Reveal>
          <Reveal delay={.15}><div className="mt-9 flex flex-wrap gap-3"><a href="/projekte" className="inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-5 py-3 text-sm font-medium text-[var(--bg)] transition hover:-translate-y-0.5">Projekte ansehen <ArrowUpRight size={16}/></a><a href="/ueber-mich" className="rounded-full border border-[var(--border)] px-5 py-3 text-sm font-medium transition hover:border-[var(--accent)]">Über mich</a></div></Reveal>
          <Reveal delay={.2}><div className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-[var(--border)] pt-6"><div><p className="font-mono text-2xl font-semibold">OSINT</p><p className="mt-1 text-xs text-[var(--muted)]">Research</p></div><div><p className="font-mono text-2xl font-semibold">Web</p><p className="mt-1 text-xs text-[var(--muted)]">Security</p></div><div><p className="font-mono text-2xl font-semibold">Linux</p><p className="mt-1 text-xs text-[var(--muted)]">Systems</p></div></div></Reveal>
        </div>

        <Reveal delay={.12} className="hidden lg:block"><div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl shadow-black/20"><div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3"><span className="h-2 w-2 rounded-full bg-red-400/70"/><span className="h-2 w-2 rounded-full bg-yellow-400/70"/><span className="h-2 w-2 rounded-full bg-green-400/70"/><span className="ml-auto font-mono text-[10px] text-[var(--muted)]">analysis://local</span></div><div className="p-5 font-mono text-xs leading-7"><p className="text-[var(--muted)]">$ whoami</p><p className="text-[var(--accent)]">joscha@linux:~$ OSINT / SECURITY</p><p className="mt-3 text-[var(--muted)]">$ scan --target web</p><div className="mt-2 space-y-1"><p><span className="text-[var(--accent)]">[OK]</span> surface mapped</p><p><span className="text-[var(--accent)]">[OK]</span> technologies identified</p><p><span className="text-[var(--accent)]">[OK]</span> public sources correlated</p><p><span className="text-[var(--accent)]">[INFO]</span> report generated</p></div><p className="mt-3 text-[var(--muted)]">$ _</p></div></div></Reveal>
      </div>
    </section>

    <section className="border-b border-[var(--border)] py-24"><div className="container"><Reveal><div className="mb-10"><p className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">01 / CAPABILITIES</p><h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Werkzeuge statt Buzzwords.</h2><p className="mt-4 max-w-2xl text-[var(--muted)]">Mein Fokus liegt auf reproduzierbaren Methoden, technischen Details und Ergebnissen, die sich nachvollziehen lassen.</p></div></Reveal><div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-2">{skills.map(({icon: Icon,title,text},i)=><Reveal key={title} delay={i*.05}><article className="group h-full bg-[var(--surface)] p-7 transition hover:bg-[var(--surface-2)]"><Icon size={20} className="text-[var(--accent)] transition group-hover:scale-110"/><h3 className="mt-8 text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-[var(--muted)]">{text}</p></article></Reveal>)}</div></div></section>

    <section className="border-b border-[var(--border)] py-24"><div className="container"><Reveal><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">02 / SELECTED WORK</p><h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Aktuelle Projekte</h2></div><a href="/projekte" className="inline-flex items-center gap-2 text-sm font-medium">Alle Projekte <ArrowUpRight size={15}/></a></div></Reveal><div className="mt-10 grid gap-4 lg:grid-cols-2">{projects.map((p,i)=><Reveal key={p.name} delay={i*.06}><a href={p.href} target="_blank" rel="noreferrer" className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]"><div className="mb-10 flex items-center justify-between"><span className="font-mono text-xs text-[var(--muted)]">0{i+1}</span><ArrowUpRight size={17} className="text-[var(--muted)] transition group-hover:text-[var(--accent)]"/></div><h3 className="text-xl font-semibold">{p.name}</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{p.text}</p></a></Reveal>)}</div></div></section>

    <section className="py-24"><div className="container"><Reveal><div className="grid gap-4 sm:grid-cols-4"><div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"><Activity className="text-[var(--accent)]" size={19}/><p className="mt-8 font-semibold">Research</p><p className="mt-1 text-xs text-[var(--muted)]">Quellen & Korrelation</p></div><div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"><Globe2 className="text-[var(--accent)]" size={19}/><p className="mt-8 font-semibold">Web Analysis</p><p className="mt-1 text-xs text-[var(--muted)]">Surface & Stack</p></div><div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"><LockKeyhole className="text-[var(--accent)]" size={19}/><p className="mt-8 font-semibold">Security</p><p className="mt-1 text-xs text-[var(--muted)]">Defensive mindset</p></div><div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"><Cpu className="text-[var(--accent)]" size={19}/><p className="mt-8 font-semibold">Tooling</p><p className="mt-1 text-xs text-[var(--muted)]">Open Source</p></div></div></Reveal></div></section>
  </main>;
}
