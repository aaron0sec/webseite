import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Blog", description: "Technische Beiträge von Joscha Aaron Schmidt zu OSINT, Web Security, Linux und Incident Response." };

const posts = [
  { slug: "osint-webanalyse", title: "OSINT bei der technischen Webanalyse", date: "2026-08-08", category: "OSINT", excerpt: "Welche öffentlich zugänglichen Signale sich bei einer technischen Webanalyse sinnvoll kombinieren lassen." },
  { slug: "essential-linux-commands-cybersecurity", title: "Linux für Cybersecurity: Befehle, Analyse & Incident Response", date: "2026-08-09", category: "Linux · Cybersecurity · DFIR", excerpt: "Ein deutschsprachiger Praxisbeitrag zu Netzwerkdiagnose, Prozessanalyse, Forensik, Log-Analyse, Hardening und strukturierter Incident Response." },
];

export default function Blog() { return <main className="container py-20 sm:py-28"><Reveal><p className="font-mono text-xs text-[var(--accent)]">02 / BLOG</p><h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">Security-Blog</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">Technische Notizen und praxisnahe Beiträge zu OSINT, Web Security, Linux, DFIR und Incident Response.</p></Reveal><div className="mt-14 space-y-4">{posts.map((post,i)=><Reveal key={post.slug} delay={i*.06}><a href={`/blog/${post.slug}`} className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 transition hover:-translate-y-0.5 hover:border-[var(--accent)]"><div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--muted)]"><span>{post.date}</span><span>·</span><span className="text-[var(--accent)]">{post.category}</span></div><h2 className="mt-4 text-2xl font-semibold">{post.title}</h2><p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">{post.excerpt}</p><span className="mt-5 inline-block text-sm text-[var(--accent)]">Artikel lesen →</span></a></Reveal>)}</div></main>; }
