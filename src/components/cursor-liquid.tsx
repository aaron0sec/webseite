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

    type Blob = { x: number; y: number; vx: number; vy: number; size: number; life: number; maxLife: number };
    const blobs: Blob[] = [];
    const mouse = { x: -1000, y: -1000, tx: -1000, ty: -1000, active: false };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let last = 0;

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
      const count = Math.min(4, Math.ceil(strength * 2));
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.8;
        const size = 7 + Math.random() * 15;
        const maxLife = 700 + Math.random() * 900;
        blobs.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, size, life: maxLife, maxLife });
      }
      if (blobs.length > 150) blobs.splice(0, blobs.length - 150);
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

    const animate = (time: number) => {
      const dt = Math.min(time - last || 16, 40);
      last = time;
      ctx.clearRect(0, 0, width, height);

      if (mouse.active) {
        mouse.x += (mouse.tx - mouse.x) * 0.24;
        mouse.y += (mouse.ty - mouse.y) * 0.24;
        spawn(mouse.x, mouse.y, 1);
      }

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = blobs.length - 1; i >= 0; i -= 1) {
        const b = blobs[i];
        b.life -= dt;
        if (b.life <= 0) { blobs.splice(i, 1); continue; }

        const dx = mouse.x - b.x;
        const dy = mouse.y - b.y;
        const distance = Math.hypot(dx, dy) || 1;
        const pull = Math.min(0.025, 0.7 / distance);
        b.vx += dx * pull * 0.016;
        b.vy += dy * pull * 0.016;
        b.vx *= 0.988;
        b.vy *= 0.988;
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        const alpha = Math.min(1, b.life / 260) * 0.18;
        const radius = b.size * (0.85 + 0.25 * Math.sin((b.maxLife - b.life) / 160));
        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, radius);
        gradient.addColorStop(0, `rgba(255, 55, 55, ${alpha})`);
        gradient.addColorStop(0.45, `rgba(220, 30, 40, ${alpha * 0.55})`);
        gradient.addColorStop(1, "rgba(160, 0, 20, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(b.x, b.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      raf = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", pointerMove, { passive: true });
    window.addEventListener("pointerleave", pointerLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerleave", pointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] h-full w-full" />;
}
