import type { Metadata } from "next";
import { ArrowUpRight, Shield, Search } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Projekte | Open Source, OSINT & Cybersecurity",
  description: "Ausgewählte Open-Source-Projekte von Joscha Aaron Schmidt: OSINT, Webanalyse, Malware-Analyse und Cybersecurity.",
  alternates: { canonical: "/projekte" },
};

const projects = [
  { name: "web-osint", description: "Werkzeuge für technische Webanalyse und OSINT-Workflows.", href: "https://github.com/linuxaaron/web-osint", icon: Search, tags: ["OSINT", "Web", "Analysis"] },
  { name: "malware-analyzer", description: "Open-Source-Projekt für die strukturierte Analyse verdächtiger Dateien.", href: "https://github.com/linuxaaron/malware-analyzer", icon: Shield, tags: ["Security", "Analysis"] },
];

export default function Projects() {
  return <main className="container py-20 sm:py-28"><Reveal><p className="font-mono text-xs text-[var(--accent)]">01 / PROJECTS</p><h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">Projekte</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">Ausgewählte Open-Source- und Security-Projekte. Fokus auf nachvollziehbare Technik statt Buzzwords.</p></Reveal><div className="mt-14 grid gap-5 md:grid-cols-2">{projects.map((p,i)=><Reveal key={p.name} delay={i*.06}><a href={p.href} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:-translate-y-1 hover:border-[var(--accent)]"><p.icon size={20} className="text-[var(--accent)]"/><h2 className="mt-8 text-xl font-semibold">{p.name}</h2><p className="mt-3 min-h-20 text-sm leading-6 text-[var(--muted)]">{p.description}</p><div className="mt-6 flex flex-wrap gap-2">{p.tags.map(t=><span key={t} className="rounded-full bg-[var(--surface-2)] px-2.5 py-1 font-mono text-[11px] text-[var(--muted)]">{t}</span>)}</div><span className="mt-7 inline-flex items-center gap-2 text-sm">Repository <ArrowUpRight size={15}/></span></a></Reveal>)}</div></main>;
}
