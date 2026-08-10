"use client";

import { Github, Instagram, Music2, ExternalLink, ArrowRight, Mail } from "lucide-react";
import { FormEvent, useState } from "react";

const donations = [
  { name: "Bitcoin (BTC)", address: "bc1qmqdka29u7e6n5ypyfq6rldl429kcgpha792yzp", scheme: "bitcoin" },
  { name: "Zcash (ZEC)", address: "t1gp5ffT9KTcoeRsdZaA4Sq3se3NWJ3acPt", scheme: "zcash" },
  { name: "Ethereum (ETH)", address: "0x6aCB5b9165952fAE8D88d4c776dF9e47Bd0CB194", scheme: "ethereum" },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/newsletter/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await response.json();
      setMessage(data.message || "Bitte prüfe deine E-Mail-Adresse.");
      if (data.ok) setEmail("");
    } catch {
      setMessage("Die Anmeldung konnte gerade nicht verarbeitet werden.");
    } finally {
      setBusy(false);
    }
  }

  const openPrivacyNotice = () => {
    try { window.localStorage.removeItem("cookie-consent-v2"); } catch { /* ignore */ }
    window.location.reload();
  };

  return (
    <footer className="border-t border-[var(--border)]">
      <div className="container py-10">
        <div className="mb-8 rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface)] p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[var(--accent)]"><Mail size={16}/><p className="font-mono text-xs tracking-[0.18em]">LINUX AARON BRIEFING</p></div>
          <h2 className="mt-2 text-lg font-semibold text-[var(--text)]">Linux, Security & OSINT direkt in dein Postfach.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">Neue Artikel, technische Praxis und Hinweise auf neue Security-Ressourcen. Anmeldung per Double-Opt-in.</p>
          <form onSubmit={subscribe} className="mt-4 flex flex-col gap-2 sm:flex-row sm:max-w-xl">
            <label htmlFor="footer-newsletter-email" className="sr-only">E-Mail-Adresse</label>
            <input id="footer-newsletter-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="deine@email.de" className="min-h-11 flex-1 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 text-sm outline-none focus:border-[var(--accent)]" />
            <button disabled={busy} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-black disabled:opacity-60">{busy ? "Wird verarbeitet …" : "Anmelden"}<ArrowRight size={15}/></button>
          </form>
          {message && <p aria-live="polite" className="mt-3 max-w-xl text-xs leading-5 text-[var(--muted)]">{message}</p>}
          <p className="mt-3 max-w-xl text-[11px] leading-5 text-[var(--muted)]">Nur Newsletter-Versand · Double-Opt-in · jederzeit abmeldbar · <a href="/datenschutz" className="underline underline-offset-2">Datenschutz</a></p>
        </div>

        <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <p className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">PRIVACY · FREIES INTERNET</p>
          <h2 className="mt-2 text-lg font-semibold text-[var(--text)]">Ich unterstütze das Tor Project</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">Für ein freies Internet und digitale Privatsphäre. Das Tor Project entwickelt freie und quelloffene Technologien, die Menschen helfen, ihre Privatsphäre zu schützen, Überwachung zu erschweren und Zensur zu umgehen.</p>
          <a href="https://www.torproject.org/de/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline">Zum Tor Project <ExternalLink size={15}/></a>
        </div>
        <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <p className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">VOLUNTÄR · OPEN SOURCE</p>
          <h2 className="mt-2 text-lg font-semibold text-[var(--text)]">Meine Arbeit unterstützen</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">Wenn dir meine Open-Source-Projekte, Security-Artikel oder Tools gefallen, kannst du meine Arbeit freiwillig per Kryptowährung unterstützen.</p>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">{donations.map((donation) => <div key={donation.name} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4"><p className="text-sm font-medium text-[var(--text)]">{donation.name}</p><button type="button" onClick={() => navigator.clipboard?.writeText(donation.address)} className="mt-2 block w-full break-all text-left font-mono text-[11px] leading-5 text-[var(--muted)] hover:text-[var(--accent)]" title="Adresse kopieren" aria-label={`${donation.name} Adresse kopieren`}>{donation.address}</button><a href={`${donation.scheme}:${donation.address}`} className="mt-3 inline-flex min-h-9 items-center rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text)] hover:border-[var(--accent)]">Wallet öffnen →</a></div>)}</div>
        </div>
        <div className="flex flex-col gap-4 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Joscha Aaron Schmidt</span><div className="flex flex-wrap items-center gap-5"><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/newsletter">Newsletter</a><button type="button" onClick={openPrivacyNotice} className="transition hover:text-[var(--text)]">Cookie-Hinweis</button><a href="https://github.com/aaron0sec" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16}/></a><a href="https://www.instagram.com/linux_aaron/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16}/></a><a href="https://www.tiktok.com/@linux_aaron" target="_blank" rel="noreferrer" aria-label="TikTok"><Music2 size={16}/></a></div></div>
      </div>
    </footer>
  );
}
