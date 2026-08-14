"use client";

import { Github, Instagram, Music2, ArrowRight, Mail } from "lucide-react";
import { FormEvent, useState } from "react";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 15000);
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
        signal: controller.signal,
        cache: "no-store",
      });
      window.clearTimeout(timeout);

      let data: { ok?: boolean; message?: string } = {};
      try {
        data = await response.json();
      } catch {
        // Ignore invalid JSON and use the HTTP status below.
      }

      if (!response.ok) {
        setMessage(data.message || `Die Newsletter-Anmeldung konnte nicht verarbeitet werden (HTTP ${response.status}).`);
        return;
      }

      setMessage(data.message || "Bitte prüfe dein Postfach.");
      if (data.ok) setEmail("");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setMessage("Die Anmeldung hat zu lange gedauert. Bitte versuche es erneut.");
      } else {
        setMessage("Der Newsletter-Server ist momentan nicht erreichbar. Bitte versuche es später erneut.");
      }
    } finally {
      setBusy(false);
    }
  }

  const openPrivacyNotice = () => {
    try {
      window.localStorage.removeItem("cookie-consent-v2");
    } catch {
      // Ignore storage errors and reload the page.
    }
    window.location.reload();
  };

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)]">
      <div className="container relative z-20 py-10">
        <div className="mb-8 rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface)] p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <Mail size={16} />
            <p className="font-mono text-xs tracking-[0.18em]">WEBENTWICKLUNG</p>
          </div>
          <h2 className="mt-2 text-lg font-semibold text-[var(--text)]">Professionelle Website ohne unnötigen Agenturkosten.</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">Individuelle Landingpages und Business Websites mit responsive Design, Performance, SEO Grundlagen und sicherem Deployment. Faire Festpreise und klare Leistungsumfänge.</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a href="/webentwicklung" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-black hover:brightness-110">Webentwicklung ansehen <ArrowRight size={15} /></a>
            <a href="/buchung" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--border)] px-5 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)]">Projekt anfragen</a>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface)] p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <Mail size={16} />
            <p className="font-mono text-xs tracking-[0.18em]">DIREKTER KONTAKT</p>
          </div>
          <h2 className="mt-2 text-lg font-semibold text-[var(--text)]">Projekt besprechen oder unverbindlich anfragen.</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Für Webentwicklung, IT, Cybersecurity, OSINT oder Kooperationen erreichst du mich direkt per E Mail.</p>
          <a href="mailto:joschaschmidt@mail.de" className="mt-4 inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline">joschaschmidt@mail.de <ArrowRight size={15} /></a>
        </div>

        <div className="mb-8 rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface)] p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <Mail size={16} />
            <p className="font-mono text-xs tracking-[0.18em]">LINUX AARON BRIEFING</p>
          </div>
          <h2 className="mt-2 text-lg font-semibold text-[var(--text)]">Linux, Security &amp; OSINT direkt in dein Postfach.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">Neue Artikel, technische Praxis und Hinweise auf neue Security Ressourcen. Anmeldung per Anmeldung mit Bestätigung.</p>
          <form onSubmit={subscribe} className="mt-4 flex flex-col gap-2 sm:flex-row sm:max-w-xl">
            <label htmlFor="footer-newsletter-email" className="sr-only">E Mail Adresse</label>
            <input id="footer-newsletter-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="deine@email.de" className="min-h-11 flex-1 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 text-sm outline-none focus:border-[var(--accent)]" />
            <button type="submit" disabled={busy} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-black disabled:opacity-60">{busy ? "Wird verarbeitet …" : "Anmelden"}<ArrowRight size={15} /></button>
          </form>
          {message && <p aria-live="polite" className="mt-3 max-w-xl text-xs leading-5 text-[var(--muted)]">{message}</p>}
          <p className="mt-3 max-w-xl text-[11px] leading-5 text-[var(--muted)]">Nur Newsletter Versand · Anmeldung mit Bestätigung · jederzeit abmeldbar · <a href="/datenschutz" className="underline underline-offset-2">Datenschutz</a></p>
        </div>

        <div className="grid gap-8 border-t border-[var(--border)] pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-semibold">Linux Aaron</p>
            <p className="mt-2 text-sm text-[var(--muted)]">IT, Linux, Cybersecurity, OSINT und Webentwicklung.</p>
          </div>
          <div>
            <p className="font-semibold">Navigation</p>
            <div className="mt-2 grid gap-2 text-sm text-[var(--muted)]">
              <a href="/">Startseite</a>
              <a href="/blog">Blog</a>
              <a href="/webentwicklung">Webentwicklung</a>
              <a href="/buchung">Projekt anfragen</a>
              <a href="/kontakt">Kontakt</a>
            </div>
          </div>
          <div>
            <p className="font-semibold">Rechtliches</p>
            <div className="mt-2 grid gap-2 text-sm text-[var(--muted)]">
              <a href="/impressum">Impressum</a>
              <a href="/datenschutz">Datenschutz</a>
              <button type="button" onClick={openPrivacyNotice} className="text-left">Cookie Einstellungen</button>
            </div>
          </div>
          <div>
            <p className="font-semibold">Social</p>
            <div className="mt-2 flex gap-3">
              <a aria-label="GitHub" href="https://github.com/linuxaaron" target="_blank" rel="noopener noreferrer"><Github size={18} /></a>
              <a aria-label="Instagram" href="https://instagram.com/linuxaaron" target="_blank" rel="noopener noreferrer"><Instagram size={18} /></a>
              <a aria-label="Music" href="/musik"><Music2 size={18} /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Linux Aaron. Alle Rechte vorbehalten.</p>
          <div className="flex flex-wrap gap-3"><span>Made with Linux</span><span>•</span><span>Security first</span></div>
        </div>
      </div>
    </footer>
  );
}
