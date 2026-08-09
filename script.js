// ---------- Theme (Light/Dark) ----------
(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const initial = stored || "dark";
  root.setAttribute("data-theme", initial);

  window.toggleTheme = function () {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeIcon(next);
  };

  function updateThemeIcon(theme) {
    const btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;
    btn.innerHTML =
      theme === "dark"
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l1.41-1.41"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  document.addEventListener("DOMContentLoaded", () => updateThemeIcon(initial));
})();

// ---------- Netzwerk-Hintergrundanimation ----------
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("net-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const nodeCount = Math.min(42, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 32000));
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.4 + 0.6,
    }));

    const maxDist = 150;
    let raf;

    function draw() {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.offsetWidth) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.offsetHeight) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxDist) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - d / maxDist)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = "rgba(99, 102, 241, 0.45)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!prefersReducedMotion) raf = requestAnimationFrame(draw);
    }
    draw();
  });
})();

// ---------- Bitcoin-Preis-Banner ----------
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const hero = document.querySelector(".hero");
    const heroInner = document.querySelector(".hero-inner");
    if (!hero || !heroInner) return;

    const banner = document.createElement("div");
    banner.className = "btc-banner";
    banner.setAttribute("aria-live", "polite");
    banner.innerHTML = '<span class="btc-icon">₿</span><span class="btc-label">Bitcoin</span><strong class="btc-price">Lade Preis …</strong><span class="btc-change"></span><span class="btc-updated">live</span>';

    hero.insertBefore(banner, heroInner);

    const style = document.createElement("style");
    style.textContent = `
      .btc-banner {
        position: relative;
        z-index: 3;
        width: fit-content;
        max-width: calc(100% - 40px);
        margin: 24px auto -52px;
        padding: 9px 14px;
        display: flex;
        align-items: center;
        gap: 9px;
        border: 1px solid var(--border-strong);
        border-radius: 999px;
        background: color-mix(in srgb, var(--bg-panel) 88%, transparent);
        box-shadow: 0 8px 30px -18px var(--accent-glow);
        backdrop-filter: blur(10px);
        font-family: var(--mono);
        font-size: 12px;
        color: var(--text-dim);
      }
      .btc-icon {
        width: 22px;
        height: 22px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--accent);
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        box-shadow: 0 0 14px var(--accent-glow);
      }
      .btc-label { color: var(--text); }
      .btc-price { color: var(--accent-soft); font-size: 13px; white-space: nowrap; }
      .btc-change { font-size: 11px; white-space: nowrap; }
      .btc-change.positive { color: #4ade80; }
      .btc-change.negative { color: #fb7185; }
      .btc-updated { color: var(--text-faint); font-size: 10px; }
      @media (max-width: 600px) {
        .btc-banner { margin: 16px auto -32px; padding: 8px 11px; gap: 7px; font-size: 11px; }
        .btc-icon { width: 20px; height: 20px; font-size: 13px; }
        .btc-price { font-size: 12px; }
        .btc-updated { display: none; }
      }
    `;
    document.head.appendChild(style);

    const priceEl = banner.querySelector(".btc-price");
    const changeEl = banner.querySelector(".btc-change");
    const updatedEl = banner.querySelector(".btc-updated");
    const formatter = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

    async function updateBitcoinPrice() {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur&include_24hr_change=true", {
          headers: { Accept: "application/json" },
          cache: "no-store"
        });
        if (!response.ok) throw new Error("Bitcoin API unavailable");

        const data = await response.json();
        const price = data?.bitcoin?.eur;
        const change = data?.bitcoin?.eur_24h_change;
        if (typeof price !== "number") throw new Error("Invalid Bitcoin price");

        priceEl.textContent = formatter.format(price);
        if (typeof change === "number") {
          const sign = change >= 0 ? "+" : "";
          changeEl.textContent = `${sign}${change.toFixed(2).replace(".", ",")} % / 24h`;
          changeEl.className = `btc-change ${change >= 0 ? "positive" : "negative"}`;
        } else {
          changeEl.textContent = "";
        }
        updatedEl.textContent = "aktuell";
      } catch (error) {
        priceEl.textContent = "Preis nicht verfügbar";
        changeEl.textContent = "";
        updatedEl.textContent = "API nicht erreichbar";
      }
    }

    updateBitcoinPrice();
    window.setInterval(updateBitcoinPrice, 60000);
  });
})();

// ---------- Hintergrundmusik ----------
// WICHTIG: Lege deine Audiodatei selbst unter audio/ambient.mp3 ab.
// Aus Lizenzgründen kann hier kein konkreter Musiktitel eingebettet werden —
// bitte nur Tracks verwenden, für die du die Rechte hast.
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bg-audio");
    const btn = document.getElementById("music-btn");
    if (!audio || !btn) return;

    let started = false;

    function updateIcon(playing) {
      btn.innerHTML = playing
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
    }
    updateIcon(false);

    btn.addEventListener("click", function () {
      if (!started) {
        audio.volume = 0.35;
        audio.play().catch(() => {});
        started = true;
        updateIcon(true);
        return;
      }
      if (audio.paused) {
        audio.play().catch(() => {});
        updateIcon(true);
      } else {
        audio.pause();
        updateIcon(false);
      }
    });
  });
})();

// ---------- Krypto-Adresse kopieren ----------
window.copyAddress = function (el, text) {
  navigator.clipboard.writeText(text).then(() => {
    const original = el.textContent;
    el.textContent = "Kopiert ✓";
    setTimeout(() => { el.textContent = original; }, 1500);
  });
};
