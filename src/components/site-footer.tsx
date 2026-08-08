import { Github, Instagram, Music2 } from "lucide-react";

export function SiteFooter() {
  return <footer className="border-t border-[var(--border)]"><div className="container flex flex-col gap-4 py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Joscha Aaron Schmidt</span><div className="flex items-center gap-5"><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="https://github.com/aaron0sec" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16}/></a><a href="https://www.instagram.com/linux_aaron/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16}/></a><a href="https://www.tiktok.com/@linux_aaron" target="_blank" rel="noreferrer" aria-label="TikTok"><Music2 size={16}/></a></div></div></footer>;
}
