"use client";

import { useEffect, useRef } from "react";

export function CursorLiquid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isCoarse = window.matchMedia("(pointer: coarse)");
    if (reduceMotion.matches || isCoarse.matches) return;

    type Drop = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      angle: number;
      spin: number;
    };

    const drops: Drop[] = [];
    const mouse = { x: -1000, y: -1000, tx: -1000, ty: -1000, active: false };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let last = 0;
    let lastSpawn = 0;

    const styleId = "cursor-liquid-water-ui";

    const installButtonStyles = () => {
      if (document.getElementById(styleId)) return;
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        /* Clean liquid fill: no external goo, no old red hover treatment. */
        a.rounded-full:not([aria-label]),
        button.rounded-full:not([aria-label]) {
          position:relative;
          isolation:isolate;
          overflow:hidden;
          transform:translateZ(0);
          --water-level:0%;
          --water-x:50%;
        }

        a.rounded-full:not([aria-label])::before,
        button.rounded-full:not([aria-label])::before {
          content:"";
          position:absolute;
          z-index:-1;
          left:-3%;
          right:-3%;
          bottom:-2px;
          height:var(--water-level);
          border-radius:50% 50% 0 0 / 14px 14px 0 0;
          background:
            radial-gradient(circle at 24% 16%, rgba(255,255,255,.42) 0 1px, transparent 2px),
            radial-gradient(circle at 68% 12%, rgba(255,255,255,.22) 0 1px, transparent 2px),
            linear-gradient(180deg, rgba(91,205,255,.96), rgba(24,129,215,.98));
          box-shadow:inset 0 1px 0 rgba(255,255,255,.36), 0 -7px 20px rgba(45,166,240,.26);
          transition:height .62s cubic-bezier(.18,.78,.2,1);
        }

        a.rounded-full:not([aria-label])::after,
        button.rounded-full:not([aria-label])::after {
          content:"";
          position:absolute;
          z-index:-1;
          left:var(--water-x);
          bottom:calc(var(--water-level) - 1px);
          width:12px;
          height:12px;
          border-radius:55% 55% 52% 52%;
          transform:translate(-50%,50%) rotate(45deg) scale(0);
          background:linear-gradient(135deg, rgba(255,255,255,.98), rgba(86,195,255,.96) 42%, rgba(16,108,197,1));
          box-shadow:0 2px 9px rgba(30,148,224,.42);
          opacity:0;
          transition:opacity .15s ease, transform .38s cubic-bezier(.18,.9,.25,1.28);
        }

        a.rounded-full:not([aria-label]):hover::before,
        button.rounded-full:not([aria-label]):hover::before {
          height:100%;
        }

        a.rounded-full:not([aria-label]):hover::after,
        button.rounded-full:not([aria-label]):hover::after {
          opacity:.82;
          transform:translate(-50%,50%) rotate(45deg) scale(1);
        }

        .cursor-water-drop {
          position:fixed;
          left:0;
          top:0;
          width:9px;
          height:13px;
          pointer-events:none;
          z-index:9999;
          opacity:0;
          border-radius:55% 55% 58% 58%;
          background:linear-gradient(145deg, rgba(245,253,255,.98), rgba(83,194,255,.96) 38%, rgba(12,105,194,.98));
          box-shadow:0 0 10px rgba(51,175,245,.35), inset 1px 1px 1px rgba(255,255,255,.7);
          transform:translate(-50%,-50%) rotate(45deg) scale(.5);
          animation:cursor-water-drop .72s ease-out forwards;
        }

        .cursor-water-drop::after {
          content:"";
          position:absolute;
          left:2px;
          top:2px;
          width:3px;
          height:4px;
          border-radius:50%;
          background:rgba(255,255,255,.78);
        }

        @keyframes cursor-water-drop {
          0% { opacity:.9; transform:translate(-50%,-50%) rotate(45deg) scale(.5); }
          25% { opacity:.84; transform:translate(-50%,-58%) rotate(45deg) scale(1); }
          100% { opacity:0; transform:translate(-50%,-125%) rotate(45deg) scale(.62); }
        }

        @media (hover:none), (pointer:coarse) {
          a.rounded-full:not([aria-label])::before,
          a.rounded-full:not([aria-label])::after,
          button.rounded-full:not([aria-label])::before,
          button.rounded-full:not([aria-label])::after,
          .cursor-water-drop { display:none; }
        }

        @media (prefers-reduced-motion:reduce) {
          a.rounded-full:not([aria-label])::before,
          button.rounded-full:not([aria-label])::before { transition:none; }
          .cursor-water-drop { display:none; }
        }
      `;
      document.head.appendChild(style);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (x: number, y: number, strength = 1) => {
      const count = Math.min(2, Math.max(1, Math.ceil(strength)));
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.05 + Math.random() * 0.38;
        const size = 4 + Math.random() * 5;
        const maxLife = 650 + Math.random() * 750;
        drops.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
          life: maxLife,
          maxLife,
          angle: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.006,
        });
      }
      if (drops.length > 90) drops.splice(0, drops.length - 90);
    };

    const pointerMove = (event: PointerEvent) => {
      mouse.tx = event.clientX;
      mouse.ty = event.clientY;
      if (!mouse.active) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
        mouse.active = true;
      }
    };

    const pointerLeave = () => { mouse.active = false; };

    const createDomDrop = (x: number, y: number) => {
      const drop = document.createElement("span");
      drop.className = "cursor-water-drop";
      drop.style.left = `${x}px`;
      drop.style.top = `${y}px`;
      document.body.appendChild(drop);
      window.setTimeout(() => drop.remove(), 760);
    };

    const updateButtons = () => {
      document.querySelectorAll<HTMLElement>('a.rounded-full:not([aria-label]), button.rounded-full:not([aria-label])').forEach((button) => {
        if (button.dataset.waterBound === "1") return;
        button.dataset.waterBound = "1";
        button.addEventListener("pointerenter", (event) => {
          const rect = button.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          button.style.setProperty("--water-x", `${Math.max(8, Math.min(92, x))}%`);
          button.style.setProperty("--water-level", "100%");
        }, { passive: true });
        button.addEventListener("pointermove", (event) => {
          const rect = button.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          button.style.setProperty("--water-x", `${Math.max(8, Math.min(92, x))}%`);
          button.style.setProperty("--water-level", "100%");
        }, { passive: true });
        button.addEventListener("pointerleave", () => {
          button.style.setProperty("--water-level", "0%");
        }, { passive: true });
      });
    };

    const animate = (time: number) => {
      const dt = Math.min(time - last || 16, 40);
      last = time;
      ctx.clearRect(0, 0, width, height);

      if (mouse.active) {
        mouse.x += (mouse.tx - mouse.x) * 0.24;
        mouse.y += (mouse.ty - mouse.y) * 0.24;
        if (time - lastSpawn > 92) {
          spawn(mouse.x, mouse.y, 1);
          createDomDrop(mouse.x, mouse.y);
          lastSpawn = time;
        }
      }

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (let i = drops.length - 1; i >= 0; i -= 1) {
        const drop = drops[i];
        drop.life -= dt;
        if (drop.life <= 0) {
          drops.splice(i, 1);
          continue;
        }

        const dx = mouse.x - drop.x;
        const dy = mouse.y - drop.y;
        const distance = Math.hypot(dx, dy) || 1;
        const pull = Math.min(0.02, 0.55 / distance);
        drop.vx += dx * pull * 0.016;
        drop.vy += dy * pull * 0.016;
        drop.vx *= 0.988;
        drop.vy *= 0.988;
        drop.x += drop.vx * dt;
        drop.y += drop.vy * dt;
        drop.angle += drop.spin * dt;

        const fadeIn = Math.min(1, (drop.maxLife - drop.life) / 110);
        const fadeOut = Math.min(1, drop.life / 260);
        const alpha = fadeIn * fadeOut * 0.78;
        const radius = drop.size * (0.92 + 0.1 * Math.sin((drop.maxLife - drop.life) / 150));

        ctx.save();
        ctx.translate(drop.x, drop.y);
        ctx.rotate(drop.angle);
        ctx.globalAlpha = alpha;

        const gradient = ctx.createLinearGradient(-radius, -radius, radius, radius);
        gradient.addColorStop(0, "rgba(245,253,255,1)");
        gradient.addColorStop(0.3, "rgba(108,211,255,1)");
        gradient.addColorStop(0.72, "rgba(38,155,232,1)");
        gradient.addColorStop(1, "rgba(9,91,177,1)");
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(0, -radius * 1.45);
        ctx.bezierCurveTo(radius * 1.12, -radius * 0.45, radius * 0.96, radius * 0.7, 0, radius * 1.08);
        ctx.bezierCurveTo(-radius * 0.96, radius * 0.7, -radius * 1.12, -radius * 0.45, 0, -radius * 1.45);
        ctx.closePath();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(55,178,248,.42)";
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(255,255,255,.78)";
        ctx.beginPath();
        ctx.ellipse(-radius * 0.28, -radius * 0.55, radius * 0.18, radius * 0.34, -0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();

      updateButtons();
      raf = requestAnimationFrame(animate);
    };

    installButtonStyles();
    resize();
    updateButtons();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", pointerMove, { passive: true });
    window.addEventListener("pointerleave", pointerLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerleave", pointerLeave);
      document.getElementById(styleId)?.remove();
      document.querySelectorAll(".cursor-water-drop").forEach((drop) => drop.remove());
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] h-full w-full" />;
}
