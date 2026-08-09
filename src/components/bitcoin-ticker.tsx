"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

type PriceData = {
  bitcoin?: {
    eur?: number;
    eur_24h_change?: number;
  };
};

export function BitcoinTicker() {
  const [price, setPrice] = useState<number | null>(null);
  const [change, setChange] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadPrice() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur&include_24hr_change=true",
          { cache: "no-store" },
        );
        if (!response.ok) throw new Error("Bitcoin API unavailable");

        const data = (await response.json()) as PriceData;
        const nextPrice = data.bitcoin?.eur;
        const nextChange = data.bitcoin?.eur_24h_change;
        if (typeof nextPrice !== "number") throw new Error("Invalid Bitcoin price");

        if (active) {
          setPrice(nextPrice);
          setChange(typeof nextChange === "number" ? nextChange : null);
          setError(false);
        }
      } catch {
        if (active) setError(true);
      }
    }

    loadPrice();
    const interval = window.setInterval(loadPrice, 60_000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const positive = typeof change === "number" && change >= 0;

  return (
    <div
      className="mb-7 inline-flex w-fit max-w-full flex-wrap items-center gap-2 rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] px-3 py-2 font-mono text-xs text-[var(--muted)] shadow-lg shadow-black/10 backdrop-blur-md"
      aria-live="polite"
      title="Bitcoin-Kurs in Euro, aktualisiert jede Minute"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] font-sans text-sm font-bold text-black shadow-[0_0_14px_var(--accent)]">
        ₿
      </span>
      <span className="text-[var(--text)]">Bitcoin</span>
      <span className="font-semibold text-[var(--accent)]">
        {price !== null ? formatter.format(price) : error ? "Preis nicht verfügbar" : "Lade Preis …"}
      </span>
      {change !== null && (
        <span className={positive ? "text-emerald-400" : "text-rose-400"}>
          {positive ? "+" : ""}{change.toFixed(2).replace(".", ",")} % / 24h
        </span>
      )}
      <span className="text-[10px] text-[var(--muted)]">live</span>
    </div>
  );
}
