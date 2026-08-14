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
    btn.innerHTML = theme === "dark"
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41-1.41"/></svg>'
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
      if (!prefersReducedMotion) requestAnimationFrame(draw);
    }
    draw();
  });
})();

// ---------- Footer-Katze: folgt dem Mauszeiger ----------
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const cat = document.getElementById("footer-cat");
    const footer = document.querySelector("footer");
    if (!cat || !footer) return;

    const coarsePointer = window.matchMedia("(hover: none) and (pointer: coarse)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (coarsePointer.matches || reducedMotion.matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let lastX = 0;

    function updateTarget(event) {
      const rect = footer.getBoundingClientRect();
      const pointerX = event.clientX - (rect.left + rect.width / 2);
      const pointerY = event.clientY - (rect.top + rect.height / 2);

      targetX = Math.max(-70, Math.min(70, pointerX * 0.12));
      targetY = Math.max(-20, Math.min(20, pointerY * 0.10));
    }

    function resetTarget() {
      targetX = 0;
      targetY = 0;
    }

    function animate() {
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;
      const rotate = Math.max(-8, Math.min(8, (targetX - currentX) * 0.15));

      cat.style.setProperty("--cat-x", `${currentX}px`);
      cat.style.setProperty("--cat-y", `${currentY}px`);
      cat.style.setProperty("--cat-r", `${rotate}deg`);
      requestAnimationFrame(animate);
    }

    footer.addEventListener("pointermove", updateTarget, { passive: true });
    footer.addEventListener("pointerleave", resetTarget, { passive: true });
    animate();
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
      .btc-banner { position:relative; z-index:3; width:fit-content; max-width:calc(100% - 40px); margin:24px 0 -52px 24px; padding:9px 14px; display:flex; align-items:center; gap:9px; border:1px solid var(--border-strong); border-radius:999px; background:color-mix(in srgb,var(--bg-panel) 88%,transparent); box-shadow:0 8px 30px -18px var(--accent-glow); backdrop-filter:blur(10px); font-family:var(--mono); font-size:12px; color:var(--text-dim); }
      .btc-icon { width:22px; height:22px; display:inline-flex; align-items:center; justify-content:center; border-radius:50%; background:var(--accent); color:#fff; font-size:14px; font-weight:700; box-shadow:0 0 14px var(--accent-glow); }
      .btc-label { color:var(--text); } .btc-price { color:var(--accent-soft); font-size:13px; white-space:nowrap; } .btc-change { font-size:11px; white-space:nowrap; }
      .btc-change.positive { color:#4ade80; } .btc-change.negative { color:#fb7185; } .btc-updated { color:var(--text-faint); font-size:10px; }
      @media (max-width:600px){ .btc-banner{margin:16px 0 -32px 16px;padding:8px 11px;gap:7px;font-size:11px}.btc-icon{width:20px;height:20px;font-size:13px}.btc-price{font-size:12px}.btc-updated{display:none} }
    `;
    document.head.appendChild(style);

    const priceEl = banner.querySelector(".btc-price");
    const changeEl = banner.querySelector(".btc-change");
    const updatedEl = banner.querySelector(".btc-updated");
    const formatter = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

    async function updateBitcoinPrice() {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur&include_24hr_change=true", { headers: { Accept: "application/json" }, cache: "no-store" });
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
        } else changeEl.textContent = "";
        updatedEl.textContent = "aktuell";
      } catch (error) {
        priceEl.textContent = "Preis nicht verfügbar"; changeEl.textContent = ""; updatedEl.textContent = "API nicht erreichbar";
      }
    }
    updateBitcoinPrice();
    window.setInterval(updateBitcoinPrice, 60000);
  });
})();

// ---------- Hintergrundmusik ----------
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bg-audio");
    const btn = document.getElementById("music-btn");
    if (!audio || !btn) return;
    let started = false;
    function updateIcon(playing) {
      btn.innerHTML = playing
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6l9 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
    }
    updateIcon(false);
    btn.addEventListener("click", function () {
      if (!started) { audio.volume = 0.35; audio.play().catch(() => {}); started = true; updateIcon(true); return; }
      if (audio.paused) { audio.play().catch(() => {}); updateIcon(true); } else { audio.pause(); updateIcon(false); }
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

// ---------- Wasser-Hover-Effekt für Buttons ----------
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(hover: none) and (pointer: coarse)");
    if (coarsePointer.matches) return;

    const buttons = document.querySelectorAll(".btn-primary, .btn-secondary, .nav-cta");

    buttons.forEach(function (btn) {
      if (!btn.querySelector(".liquid-fx")) {
        const fx = document.createElement("span");
        fx.className = "liquid-fx";
        fx.setAttribute("aria-hidden", "true");
        const fill = document.createElement("span");
        fill.className = "liquid-fill";
        const drop = document.createElement("span");
        drop.className = "liquid-drop";
        fx.appendChild(fill);
        fx.appendChild(drop);
        btn.prepend(fx);
      }

      const drop = btn.querySelector(".liquid-drop");

      btn.addEventListener("pointerenter", function (event) {
        if (reducedMotion.matches) return;
        const rect = btn.getBoundingClientRect();
        const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
        const clamped = Math.max(8, Math.min(92, xPercent));
        btn.style.setProperty("--drop-x", clamped + "%");
        drop.style.animation = "none";
        void drop.offsetWidth;
        drop.style.animation = "";
      }, { passive: true });
    });
  });
})();

// ---------- Premium Wasser-Buttons + blaue Tropfenspur ----------
(function () {
  const STYLE_ID = "premium-water-effects";

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      /* Alte Goo-Darstellung komplett deaktivieren. Der Effekt bleibt innerhalb des Buttons. */
      .btn-primary .liquid-fx,
      .btn-secondary .liquid-fx,
      .nav-cta .liquid-fx { display:none !important; }

      .btn-primary,
      .btn-secondary,
      .nav-cta {
        isolation:isolate;
        overflow:hidden !important;
        position:relative;
        transform:translateZ(0);
      }

      .btn-primary::before,
      .btn-secondary::before,
      .nav-cta::before {
        content:"";
        position:absolute;
        left:-2%;
        right:-2%;
        bottom:-2px;
        height:0%;
        z-index:-1;
        border-radius:50% 50% 0 0 / 16px 16px 0 0;
        background:
          radial-gradient(circle at 18% 16%, rgba(255,255,255,.42) 0 1px, transparent 2px),
          linear-gradient(180deg, rgba(91,194,255,.96), rgba(37,139,225,.98));
        box-shadow:inset 0 1px 0 rgba(255,255,255,.32), 0 -5px 18px rgba(58,170,255,.28);
        transition:height .62s cubic-bezier(.2,.78,.2,1);
      }

      .btn-primary::after,
      .btn-secondary::after,
      .nav-cta::after {
        content:"";
        position:absolute;
        left:var(--water-x,50%);
        bottom:var(--water-y,100%);
        width:10px;
        height:10px;
        border-radius:50% 50% 48% 48%;
        transform:translate(-50%,50%) rotate(45deg) scale(0);
        background:linear-gradient(135deg, rgba(255,255,255,.95), rgba(68,174,244,.96) 42%, rgba(24,118,205,1));
        box-shadow:0 2px 7px rgba(30,145,230,.45);
        opacity:0;
        pointer-events:none;
        transition:opacity .16s ease, transform .38s cubic-bezier(.2,.9,.25,1.25);
      }

      .btn-primary:hover::before,
      .btn-secondary:hover::before,
      .nav-cta:hover::before { height:100%; }

      .btn-primary:hover,
      .btn-secondary:hover,
      .nav-cta:hover { color:#fff; border-color:rgba(105,198,255,.9); }

      .water-drop-trail {
        position:fixed;
        left:0;
        top:0;
        width:9px;
        height:12px;
        border-radius:55% 55% 60% 60%;
        background:linear-gradient(145deg, rgba(255,255,255,.96), rgba(76,190,255,.92) 40%, rgba(18,115,205,.98));
        box-shadow:0 0 9px rgba(46,167,245,.34), inset 1px 1px 1px rgba(255,255,255,.65);
        pointer-events:none;
        z-index:9999;
        opacity:0;
        transform:translate(-50%,-50%) rotate(45deg) scale(.45);
        animation:water-drop-fade .72s ease-out forwards;
      }

      .water-drop-trail::after {
        content:"";
        position:absolute;
        width:3px;
        height:4px;
        left:2px;
        top:2px;
        border-radius:50%;
        background:rgba(255,255,255,.72);
      }

      @keyframes water-drop-fade {
        0% { opacity:.9; transform:translate(-50%,-50%) rotate(45deg) scale(.45); }
        25% { opacity:.82; transform:translate(-50%,-58%) rotate(45deg) scale(1); }
        100% { opacity:0; transform:translate(-50%,-115%) rotate(45deg) scale(.65); }
      }

      @media (hover:none) and (pointer:coarse) {
        .btn-primary::before,
        .btn-secondary::before,
        .nav-cta::before,
        .btn-primary::after,
        .btn-secondary::after,
        .nav-cta::after { display:none; }
        .water-drop-trail { display:none; }
      }

      @media (prefers-reduced-motion:reduce) {
        .btn-primary::before,
        .btn-secondary::before,
        .nav-cta::before { transition:none; }
        .water-drop-trail { animation:none; opacity:0; }
      }

      /* Kleine, stehende weiße Katze wie im Referenzmotiv. */
      .footer-cat {
        width:58px;
        height:52px;
        bottom:118px;
      }
      .footer-cat .cat-label { display:none !important; }
      .footer-cat .cat-shadow { opacity:.22; width:32px; left:13px; }
      .footer-cat .cat-svg { filter:drop-shadow(0 3px 5px rgba(0,0,0,.24)); }
      .footer-cat .cat-head-shape { transform-origin:32px 29px; }
      .footer-cat .cat-eye { transform-box:fill-box; }
    `;
    document.head.appendChild(style);
  }

  function createDrop(x, y) {
    const drop = document.createElement("span");
    drop.className = "water-drop-trail";
    drop.style.left = `${x}px`;
    drop.style.top = `${y}px`;
    document.body.appendChild(drop);
    window.setTimeout(() => drop.remove(), 760);
  }

  function init() {
    installStyles();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(hover: none) and (pointer: coarse)");
    if (coarsePointer.matches || reducedMotion.matches) return;

    const buttons = document.querySelectorAll(".btn-primary, .btn-secondary, .nav-cta");
    buttons.forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
        button.style.setProperty("--water-x", `${x}%`);
        button.style.setProperty("--water-y", `${100 - y}%`);
      }, { passive:true });

      button.addEventListener("pointerenter", (event) => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty("--water-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        button.style.setProperty("--water-y", `${100 - ((event.clientY - rect.top) / rect.height) * 100}%`);
      }, { passive:true });
    });

    let lastDropTime = 0;
    let lastDropX = -999;
    let lastDropY = -999;
    document.addEventListener("pointermove", (event) => {
      const now = performance.now();
      const dx = event.clientX - lastDropX;
      const dy = event.clientY - lastDropY;
      if (now - lastDropTime < 105 || (dx * dx + dy * dy) < 26 * 26) return;
      lastDropTime = now;
      lastDropX = event.clientX;
      lastDropY = event.clientY;
      createDrop(event.clientX, event.clientY);
    }, { passive:true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once:true });
  } else {
    init();
  }
})();
