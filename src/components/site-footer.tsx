import { Github, Instagram, Music2 } from "lucide-react";

const donations = [
  { name: "Bitcoin (BTC)", address: "bc1qmqdka29u7e6n5ypyfq6rldl429kcgpha792yzp", scheme: "bitcoin" },
  { name: "Zcash (ZEC)", address: "t1gp5ffT9KTcoeRsdZaA4Sq3se3NWJ3acPt", scheme: "zcash" },
  { name: "Ethereum (ETH)", address: "0x6aCB5b9165952fAE8D88d4c776dF9e47Bd0CB194", scheme: "ethereum" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="container py-10">
        <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <p className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">VOLUNTÄR · OPEN SOURCE</p>
          <h2 className="mt-2 text-lg font-semibold text-[var(--text)]">Meine Arbeit unterstützen</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">Wenn dir meine Open-Source-Projekte, Security-Artikel oder Tools gefallen, kannst du meine Arbeit freiwillig per Kryptowährung unterstützen.</p>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {donations.map((donation) => (
              <div key={donation.name} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <p className="text-sm font-medium text-[var(--text)]">{donation.name}</p>
                <button type="button" onClick={() => navigator.clipboard?.writeText(donation.address)} className="mt-2 block w-full break-all text-left font-mono text-[11px] leading-5 text-[var(--muted)] hover:text-[var(--accent)]" title="Adresse kopieren">{donation.address}</button>
                <a href={`${donation.scheme}:${donation.address}`} className="mt-3 inline-flex min-h-9 items-center rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text)] hover:border-[var(--accent)]">Wallet öffnen →</a>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Joscha Aaron Schmidt</span>
          <div className="flex items-center gap-5">
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
            <a href="https://github.com/aaron0sec" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16}/></a>
            <a href="https://www.instagram.com/linux_aaron/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16}/></a>
            <a href="https://www.tiktok.com/@linux_aaron" target="_blank" rel="noreferrer" aria-label="TikTok"><Music2 size={16}/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
