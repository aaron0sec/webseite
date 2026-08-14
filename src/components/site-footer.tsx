"use client";

import { Github, Instagram, Music2, ExternalLink, ArrowRight, Mail } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

const donations = [
  { name: "Bitcoin (BTC)", address: "bc1qmqdka29u7e6n5ypyfq6rldl429kcgpha792yzp", scheme: "bitcoin" },
  { name: "Zcash (ZEC)", address: "t1gp5ffT9KTcoeRsdZaA4Sq3se3NWJ3acPt", scheme: "zcash" },
  { name: "Ethereum (ETH)", address: "0x6aCB5b9165952fAE8D88d4c776dF9e47Bd0CB194", scheme: "ethereum" },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const footer = footerRef.current;
    const cat = catRef.current;
    if (!footer || !cat) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (reduced || touch) return;

    let frame = 0;
    let active = false;
    const catWidth = 150;
    const catHeight = 125;
    const padding = 12;

    const onEnter = () => {
      active = true;
    };

    const onMove = (event: PointerEvent) => {
      const rect = footer.getBoundingClientRect();
      const maxX = Math.max(padding, rect.width - catWidth - padding);
      const maxY = Math.max(padding, rect.height - catHeight - padding);

      target.current.x = Math.max(
        padding,
        Math.min(maxX, event.clientX - rect.left - catWidth / 2),
      );
      target.current.y = Math.max(
        padding,
        Math.min(maxY, event.clientY - rect.top - catHeight / 2),
      );
    };

    const onLeave = () => {
      active = false;
      target.current.x = Math.max(padding, Math.min(260, footer.clientWidth * 0.12));
      target.current.y = Math.max(padding, footer.clientHeight - catHeight - padding);
    };

    const animate = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;

      velocity.current.x += dx * 0.075;
      velocity.current.y += dy * 0.075;
      velocity.current.x *= 0.78;
      velocity.current.y *= 0.78;

      current.current.x += velocity.current.x;
      current.current.y += velocity.current.y;

      const tilt = Math.max(-8, Math.min(8, velocity.current.x * 0.8));
      const scale = active ? 1 : 0.96;
      cat.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) rotate(${tilt}deg) scale(${scale})`;
      frame = requestAnimationFrame(animate);
    };

    const rect = footer.getBoundingClientRect();
    current.current.x = Math.max(padding, Math.min(260, rect.width * 0.12));
    current.current.y = Math.max(padding, rect.height - catHeight - padding);
    target.current.x = current.current.x;
    target.current.y = current.current.y;

    footer.addEventListener("pointerenter", onEnter, { passive: true });
    footer.addEventListener("pointermove", onMove, { passive: true });
    footer.addEventListener("pointerleave", onLeave, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      footer.removeEventListener("pointerenter", onEnter);
      footer.removeEventListener("pointermove", onMove);
      footer.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

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
        // Server returned no JSON; use the HTTP status below.
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
    try { window.localStorage.removeItem("cookie-consent-v2"); } catch { /* ignore */ }
    window.location.reload();
  };

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-[var(--border)]">
      <div ref={catRef} aria-hidden="true" className="footer-cat-live pointer-events-none absolute left-0 top-0 z-10 hidden md:block will-change-transform">
        <svg width="150" height="115" viewBox="0 0 150 115" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]">
          <ellipse cx="74" cy="103" rx="45" ry="7" fill="rgba(0,0,0,0.32)"/>
          <path d="M105 60C131 48 143 61 137 78C134 88 124 88 119 81" stroke="#fff" strokeWidth="9" strokeLinecap="round"/>
          <path d="M105 60C131 48 143 61 137 78C134 88 124 88 119 81" stroke="#111827" strokeWidth="3" strokeLinecap="round"/>
          <path d="M45 55C45 38 58 29 78 31C98 33 108 48 104 67C101 83 90 91 70 90C51 89 43 77 45 55Z" fill="#fff" stroke="#111827" strokeWidth="3"/>
          <path d="M49 42L43 16L64 32Z" fill="#fff" stroke="#111827" strokeWidth="3" strokeLinejoin="round"/>
          <path d="M82 31L104 15L98 43Z" fill="#fff" stroke="#111827" strokeWidth="3" strokeLinejoin="round"/>
          <path d="M48 76C42 81 34 84 27 82" stroke="#111827" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="63" cy="56" r="4" fill="#111827"/>
          <circle cx="87" cy="56" r="4" fill="#111827"/>
          <path d="M73 64L77 64L75 68L73 64Z" fill="#f0a6b8" stroke="#111827" strokeWidth="1.5"/>
          <path d="M75 68C71 71 69 71 67 70M75 68C79 71 81 71 83 70" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          <path d="M48 70L27 66M48 75L24 76M101 70L123 66M101 75L126 76" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
          <path d="M54 84V101M72 87V103M88 86V103M101 81V99" stroke="#111827" strokeWidth="7" strokeLinecap="round"/>
          <path d="M54 84V101M72 87V103M88 86V103M101 81V99" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
          <rect x="112" y="87" width="25" height="17" rx="3" fill="#0b0d1a" stroke="#6366f1"/>
          <path d="M117 94H123M126 94H132" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="mt-1 block text-center font-mono text-[9px] text-[var(--muted)] opacity-70">git push --follow-the-cat</span>
      </div>

      <div className="container relative z-20 py-10">
        <div className="mb-8 rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface)] p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[var(--accent)]"><Mail size={16}/><p className="font-mono text-xs tracking-[0.18em]">WEBENTWICKLUNG</p></div>
          <h2 className="mt-2 text-lg font-semibold text-[var(--text)]">Professionelle Website ohne unnötigen Agentur-Overhead.</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">Individuelle Landingpages und Business-Websites mit responsive Design, Performance, SEO-Basis und sicherem Deployment. Faire Festpreise und klare Leistungsumfänge.</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a href="/webentwicklung" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-black hover:brightness-110">Webentwicklung ansehen <ArrowRight size={15}/></a>
            <a href="/buchung" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--border)] px-5 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)]">Projekt anfragen</a>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface)] p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[var(--accent)]"><Mail size={16}/><p className="font-mono text-xs tracking-[0.18em]">DIREKTER KONTAKT</p></div>
          <h2 className="mt-2 text-lg font-semibold text-[var(--text)]">Projekt besprechen oder unverbindlich anfragen.</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Für Webentwicklung, IT, Cybersecurity, OSINT oder Kooperationen erreichst du mich direkt per E-Mail.</p>
          <a href="mailto:joschaschmidt@mail.de" className="mt-4 inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline">joschaschmidt@mail.de <ArrowRight size={15}/></a>
        </div>

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
        <div className="flex flex-col gap-4 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Joscha Aaron Schmidt</span><div className="flex flex-wrap items-center gap-5"><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/newsletter">Newsletter</a><button type="button" onClick={openPrivacyNotice} className="transition hover:text-[var(--text)]">Cookie-Hinweis</button><a href="https://github.com/linuxaaron" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profil"><Github size={16}/></a><a href="https://www.instagram.com/linux_aaron/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16}/></a><a href="https://www.tiktok.com/@linux_aaron" target="_blank" rel="noreferrer" aria-label="TikTok"><Music2 size={16}/></a></div></div>
      </div>
    </footer>
  );
}
