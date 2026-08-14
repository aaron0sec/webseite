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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let lastPointerAt = 0;
    let idleTarget = { x: 0, y: 0 };
    const catWidth = 150;
    const catHeight = 125;
    const padding = 12;

    const getBounds = () => {
      const rect = footer.getBoundingClientRect();
      return {
        rect,
        maxX: Math.max(padding, rect.width - catWidth - padding),
        maxY: Math.max(padding, rect.height - catHeight - padding),
      };
    };

    const moveToPoint = (clientX: number, clientY: number) => {
      const { rect, maxX, maxY } = getBounds();
      target.current.x = Math.max(padding, Math.min(maxX, clientX - rect.left - catWidth / 2));
      target.current.y = Math.max(padding, Math.min(maxY, clientY - rect.top - catHeight / 2));
      lastPointerAt = performance.now();
    };

    const onPointerMove = (event: PointerEvent) => {
      const { rect } = getBounds();
      if (
        event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom
      ) return;

      // Works for mouse, pen and touch. On phones this fires while the finger moves.
      moveToPoint(event.clientX, event.clientY);
    };

    const onPointerDown = (event: PointerEvent) => {
      const { rect } = getBounds();
      if (
        event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom
      ) {
        moveToPoint(event.clientX, event.clientY);
      }
    };

    const chooseIdleTarget = () => {
      const { maxX, maxY } = getBounds();
      idleTarget = {
        x: padding + Math.random() * Math.max(1, maxX - padding),
        y: padding + Math.random() * Math.max(1, maxY - padding),
      };
    };

    const animate = () => {
      const now = performance.now();

      // On touch devices there is no cursor to follow. After a short pause,
      // let the cat wander slowly through the footer by itself.
      if (now - lastPointerAt > 1800) {
        const dx = idleTarget.x - target.current.x;
        const dy = idleTarget.y - target.current.y;
        if (Math.abs(dx) < 10 && Math.abs(dy) < 10) chooseIdleTarget();
        target.current.x += (idleTarget.x - target.current.x) * 0.008;
        target.current.y += (idleTarget.y - target.current.y) * 0.008;
      }

      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      velocity.current.x = (velocity.current.x + dx * 0.09) * 0.76;
      velocity.current.y = (velocity.current.y + dy * 0.09) * 0.76;
      current.current.x += velocity.current.x;
      current.current.y += velocity.current.y;

      const { maxX, maxY } = getBounds();
      current.current.x = Math.max(padding, Math.min(maxX, current.current.x));
      current.current.y = Math.max(padding, Math.min(maxY, current.current.y));

      const speed = Math.hypot(velocity.current.x, velocity.current.y);
      const tilt = Math.max(-10, Math.min(10, velocity.current.x * 0.65));
      const scale = 0.98 + Math.min(speed / 100, 0.02);
      cat.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) rotate(${tilt}deg) scale(${scale})`;

      frame = requestAnimationFrame(animate);
    };

    const rect = footer.getBoundingClientRect();
    current.current.x = Math.max(padding, Math.min(rect.width - catWidth - padding, 20));
    current.current.y = Math.max(padding, rect.height - catHeight - padding);
    target.current.x = current.current.x;
    target.current.y = current.current.y;
    lastPointerAt = performance.now();
    chooseIdleTarget();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
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
      try { data = await response.json(); } catch { /* ignore invalid JSON */ }
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
      <div ref={catRef} aria-hidden="true" className="footer-cat-live pointer-events-none absolute left-0 top-0 z-40 block will-change-transform">
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

        <div className="grid gap-8 border-t border-[var(--border)] pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div><p className="font-semibold">Linux Aaron</p><p className="mt-2 text-sm text-[var(--muted)]">IT, Linux, Cybersecurity, OSINT und Webentwicklung.</p></div>
          <div><p className="font-semibold">Navigation</p><div className="mt-2 grid gap-1 text-sm text-[var(--muted)]"><a href="/">Startseite</a><a href="/ueber-mich">Über mich</a><a href="/projekte">Projekte</a><a href="/blog">Blog</a><a href="/news">Cyber News</a></div></div>
          <div><p className="font-semibold">Angebot</p><div className="mt-2 grid gap-1 text-sm text-[var(--muted)]"><a href="/webentwicklung">Webentwicklung</a><a href="/buchung">Projekt anfragen</a><a href="/shop">Shop</a><a href="/kontakt">Kontakt</a></div></div>
          <div><p className="font-semibold">Rechtliches</p><div className="mt-2 grid gap-1 text-sm text-[var(--muted)]"><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/rechtlicher-hinweis">Rechtlicher Hinweis</a><button type="button" onClick={openPrivacyNotice} className="text-left">Cookie-Einstellungen</button></div></div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--muted)]">© {new Date().getFullYear()} Linux Aaron. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-3 text-[var(--muted)]"><a href="https://github.com/linuxaaron" aria-label="GitHub"><Github size={18}/></a><a href="https://www.instagram.com/linux_aaron/" aria-label="Instagram"><Instagram size={18}/></a><a href="https://open.spotify.com/" aria-label="Spotify"><Music2 size={18}/></a><a href="/kontakt" aria-label="Kontakt"><ExternalLink size={18}/></a></div>
        </div>
      </div>
    </footer>
  );
}
