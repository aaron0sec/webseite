"use client";

import { useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  ["Projekte", "/projekte"],
  ["Blog", "/blog"],
  ["Über mich", "/ueber-mich"],
  ["Kontakt", "/kontakt"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-6">
        <a href="/" className="font-semibold tracking-tight">joscha<span className="text-[var(--accent)]">.</span>sec</a>
        <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
          {links.map(([label, href]) => <a key={href} href={href} className="transition hover:text-[var(--text)]">{label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <a href="https://github.com/aaron0sec" target="_blank" rel="noreferrer" aria-label="GitHub" className="hidden rounded-full border border-[var(--border)] p-2 text-[var(--muted)] hover:text-[var(--text)] sm:block"><Github size={16}/></a>
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="rounded-full border border-[var(--border)] p-2 md:hidden" aria-label="Navigation öffnen">{open ? <X size={16}/> : <Menu size={16}/>}</button>
        </div>
      </div>
      {open && <nav className="border-t border-[var(--border)] px-4 py-4 md:hidden"><div className="container flex flex-col gap-4 text-sm text-[var(--muted)]">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</div></nav>}
    </header>
  );
}
