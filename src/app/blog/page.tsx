import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Blog" };

const posts = [
  { slug: "osint-webanalyse", title: "OSINT bei der technischen Webanalyse", date: "2026-08-08", category: "OSINT", excerpt: "Welche öffentlich zugänglichen Signale sich bei einer technischen Webanalyse sinnvoll kombinieren lassen." },
  { slug: "essential-linux-commands-cybersecurity", title: "Essential Linux Commands for Cybersecurity Specialists", date: "2026-08-08", category: "Linux · Cybersecurity", excerpt: "Ein praxisorientierter Überblick über Linux-Kommandos für Netzwerk-, Prozess-, Datei-, Log- und Forensikanalyse sowie System-Hardening." },
];

export default function Blog() { return <main className="container py-20 sm:py-28"><Reveal><p className="font-mono text-xs text-[var(--accent)]">02 / BLOG</p><h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">Blog</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">Notizen zu OSINT, Web Security, Linux und technischen Workflows.</p></Reveal><div className="mt-14 space-y-4">{posts.map((post,i)=><Reveal key={post.slug} delay={i*.06}><a href={`/blog/${post.slug}`} className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 transition hover:border-[var(--accent)]"><div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--muted)]"><span>{post.date}</span><span>·</span><span className="text-[var(--accent)]">{post.category}</span></div><h2 className="mt-4 text-2xl font-semibold">{post.title}</h2><p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">{post.excerpt}</p></a></Reveal>)}</div></main>; }
