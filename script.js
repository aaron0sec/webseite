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
