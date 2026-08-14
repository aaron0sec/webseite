"use client";

import { useEffect, useRef, useState } from "react";

const CAT_WIDTH = 82;
const CAT_HEIGHT = 74;
const EDGE_PADDING = 18;
const CAT_CURSOR_GAP = 92;
const FOLLOW_SPEED = 0.075;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function CuteFooterCat() {
  const catRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const stuntTimerRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const touchDeviceRef = useRef(false);
  const visibleRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    const cat = catRef.current;
    if (!footer || !cat) return;

    touchDeviceRef.current = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const setCatVisible = (value: boolean) => {
      visibleRef.current = value;
      setVisible(value);
    };

    const getRestingPosition = () => {
      const rect = footer.getBoundingClientRect();
      return {
        x: clamp(rect.right - CAT_WIDTH - EDGE_PADDING, EDGE_PADDING, window.innerWidth - CAT_WIDTH - EDGE_PADDING),
        y: clamp(rect.bottom - CAT_HEIGHT - EDGE_PADDING, EDGE_PADDING, window.innerHeight - CAT_HEIGHT - EDGE_PADDING),
      };
    };

    const isInsideFooter = (x: number, y: number) => {
      const rect = footer.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    const setPosition = (x: number, y: number) => {
      positionRef.current = { x, y };
      cat.style.left = `${x}px`;
      cat.style.top = `${y}px`;
    };

    const setWalking = (walking: boolean) => cat.classList.toggle("cute-cat-walk", walking);

    const runStunt = () => {
      if (reducedMotion.matches || !visibleRef.current || document.visibilityState === "hidden") return;
      if (cat.classList.contains("cute-cat-stunt")) return;

      const stunts = ["cute-cat-stunt", "cute-cat-jump", "cute-cat-kick", "cute-cat-staff"];
      const stunt = stunts[Math.floor(Math.random() * stunts.length)];
      cat.classList.add(stunt);
      window.setTimeout(() => cat.classList.remove(stunt), stunt === "cute-cat-staff" ? 1500 : 1150);
    };

    const scheduleStunt = () => {
      if (stuntTimerRef.current !== null) window.clearTimeout(stuntTimerRef.current);
      const delay = 7000 + Math.random() * 10000;
      stuntTimerRef.current = window.setTimeout(() => {
        if (visibleRef.current) runStunt();
        scheduleStunt();
      }, delay);
    };

    const animate = () => {
      const current = positionRef.current;
      const target = targetRef.current;
      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const distance = Math.hypot(dx, dy);

      if (activeRef.current && !touchDeviceRef.current) {
        setPosition(current.x + dx * FOLLOW_SPEED, current.y + dy * FOLLOW_SPEED);
        cat.style.setProperty("--walk-direction", dx < -1 ? "-1" : "1");
        setWalking(distance > 3);
      } else {
        setWalking(false);
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    const moveToCursor = (event: PointerEvent) => {
      if (touchDeviceRef.current || !isInsideFooter(event.clientX, event.clientY)) return;
      const rect = footer.getBoundingClientRect();
      const maxLeft = Math.min(window.innerWidth - CAT_WIDTH - EDGE_PADDING, rect.right - CAT_WIDTH - EDGE_PADDING);
      const minLeft = Math.max(EDGE_PADDING, rect.left + EDGE_PADDING);
      const maxTop = Math.min(window.innerHeight - CAT_HEIGHT - EDGE_PADDING, rect.bottom - CAT_HEIGHT - EDGE_PADDING);
      const minTop = Math.max(EDGE_PADDING, rect.top + EDGE_PADDING);
      targetRef.current = {
        x: clamp(event.clientX + CAT_CURSOR_GAP - CAT_WIDTH / 2, minLeft, maxLeft),
        y: clamp(event.clientY - CAT_HEIGHT / 2, minTop, maxTop),
      };
      activeRef.current = true;
      setCatVisible(true);
    };

    const enterFooter = (event: PointerEvent) => {
      if (touchDeviceRef.current || !isInsideFooter(event.clientX, event.clientY)) return;
      const resting = getRestingPosition();
      setPosition(resting.x, resting.y);
      targetRef.current = resting;
      activeRef.current = true;
      setCatVisible(true);
    };

    const leaveFooter = (event: PointerEvent) => {
      if (touchDeviceRef.current) return;
      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof Node && footer.contains(nextTarget)) return;
      activeRef.current = false;
      setWalking(false);
      targetRef.current = getRestingPosition();
    };

    const updateMobileCat = () => {
      if (!touchDeviceRef.current) return;
      const rect = footer.getBoundingClientRect();
      const inViewport = rect.bottom > 0 && rect.top < window.innerHeight;
      if (inViewport) {
        const resting = getRestingPosition();
        setPosition(resting.x, resting.y);
        setCatVisible(true);
      } else {
        setCatVisible(false);
      }
    };

    const handleResize = () => {
      if (touchDeviceRef.current) updateMobileCat();
      else if (!activeRef.current) setPosition(getRestingPosition().x, getRestingPosition().y);
    };

    const observer = new IntersectionObserver(([entry]) => {
      setCatVisible(entry.isIntersecting);
      if (touchDeviceRef.current && entry.isIntersecting) updateMobileCat();
    }, { threshold: 0.05 });

    observer.observe(footer);
    footer.addEventListener("pointerenter", enterFooter, { passive: true });
    footer.addEventListener("pointermove", moveToCursor, { passive: true });
    footer.addEventListener("pointerleave", leaveFooter, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", updateMobileCat, { passive: true });

    const initial = getRestingPosition();
    setPosition(initial.x, initial.y);
    targetRef.current = initial;
    if (touchDeviceRef.current) updateMobileCat();
    frameRef.current = window.requestAnimationFrame(animate);
    scheduleStunt();

    return () => {
      observer.disconnect();
      footer.removeEventListener("pointerenter", enterFooter);
      footer.removeEventListener("pointermove", moveToCursor);
      footer.removeEventListener("pointerleave", leaveFooter);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateMobileCat);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      if (stuntTimerRef.current !== null) window.clearTimeout(stuntTimerRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        .cute-footer-cat {
          position: fixed;
          left: 0;
          top: 0;
          width: ${CAT_WIDTH}px;
          height: ${CAT_HEIGHT}px;
          z-index: 40;
          border: 0;
          padding: 0;
          margin: 0;
          background: transparent;
          opacity: 0;
          pointer-events: none !important;
          transform: translate3d(0, 0, 0) scale(.94);
          transform-origin: center bottom;
          transition: opacity .35s ease, transform .35s ease;
          will-change: left, top, transform;
        }
        .cute-footer-cat.is-visible { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        .cute-cat-body { transform-origin: center bottom; animation: cute-cat-breathe 1.7s ease-in-out infinite; }
        .cute-cat-tail { transform-box: fill-box; transform-origin: 18% 70%; animation: cute-cat-tail 1.15s ease-in-out infinite; }
        .cute-cat-paw { transform-box: fill-box; transform-origin: center top; }
        .cute-cat-walk .cute-cat-body { animation: cute-cat-walk-bounce .42s ease-in-out infinite alternate; }
        .cute-cat-walk .cute-cat-paw-left { animation: cute-cat-step-left .42s ease-in-out infinite alternate; }
        .cute-cat-walk .cute-cat-paw-right { animation: cute-cat-step-right .42s ease-in-out infinite alternate; }
        .cute-cat-ear { transform-box: fill-box; transform-origin: bottom center; animation: cute-cat-ear 3.2s ease-in-out infinite; }
        .cute-cat-eye { transform-box: fill-box; transform-origin: center; animation: cute-cat-blink 4.5s ease-in-out infinite; }
        .cute-cat-staff { animation: cute-cat-staff 1.45s cubic-bezier(.2,.8,.2,1) both !important; }
        .cute-cat-stunt { animation: cute-cat-tumble 1.1s cubic-bezier(.4,.05,.6,.95) both !important; }
        .cute-cat-jump { animation: cute-cat-jump 1s cubic-bezier(.2,.8,.2,1) both !important; }
        .cute-cat-kick { animation: cute-cat-kick 1.1s ease-in-out both !important; }
        .cute-cat-staff-pole { opacity: 0; transform-box: fill-box; transform-origin: center; }
        .cute-cat-staff .cute-cat-staff-pole { opacity: 1; animation: staff-appear .25s ease-out both, staff-spin 1.1s .25s ease-in-out both; }
        @keyframes cute-cat-breathe { 0%,100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(-1.5px) scaleY(1.018); } }
        @keyframes cute-cat-walk-bounce { from { transform: translateY(0) rotate(-1deg); } to { transform: translateY(-2.5px) rotate(1deg); } }
        @keyframes cute-cat-tail { 0%,100% { transform: rotate(-7deg); } 50% { transform: rotate(18deg); } }
        @keyframes cute-cat-step-left { from { transform: translateY(0) rotate(5deg); } to { transform: translateY(-4px) rotate(-8deg); } }
        @keyframes cute-cat-step-right { from { transform: translateY(-4px) rotate(-8deg); } to { transform: translateY(0) rotate(5deg); } }
        @keyframes cute-cat-ear { 0%,82%,100% { transform: rotate(0); } 88% { transform: rotate(-6deg); } 93% { transform: rotate(4deg); } }
        @keyframes cute-cat-blink { 0%,88%,100% { transform: scaleY(1); } 91% { transform: scaleY(.08); } 94% { transform: scaleY(1); } }
        @keyframes cute-cat-tumble {
          0% { transform: translate3d(0,0,0) scale(1) rotate(0deg); }
          18% { transform: translate3d(0,-7px,0) scale(1.02) rotate(65deg); }
          45% { transform: translate3d(0,-18px,0) scale(1.03) rotate(180deg); }
          72% { transform: translate3d(0,-7px,0) scale(1.02) rotate(295deg); }
          100% { transform: translate3d(0,0,0) scale(1) rotate(360deg); }
        }
        @keyframes cute-cat-jump {
          0% { transform: translate3d(0,0,0) scale(1); }
          20% { transform: translate3d(0,-10px,0) scale(1.02, .98); }
          50% { transform: translate3d(0,-25px,0) rotate(-5deg) scale(1.04, .96); }
          78% { transform: translate3d(0,-9px,0) rotate(5deg) scale(1.01); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes cute-cat-kick {
          0%,100% { transform: translate3d(0,0,0) rotate(0); }
          25% { transform: translate3d(0,-5px,0) rotate(-7deg); }
          48% { transform: translate3d(5px,-9px,0) rotate(12deg); }
          68% { transform: translate3d(-2px,-3px,0) rotate(-5deg); }
        }
        @keyframes cute-cat-staff {
          0% { transform: translate3d(0,0,0) rotate(0); }
          18% { transform: translate3d(0,-4px,0) rotate(-8deg); }
          42% { transform: translate3d(0,-8px,0) rotate(12deg); }
          68% { transform: translate3d(0,-3px,0) rotate(-10deg); }
          100% { transform: translate3d(0,0,0) rotate(0); }
        }
        @keyframes staff-appear { from { opacity: 0; transform: scale(.4) rotate(-45deg); } to { opacity: 1; transform: scale(1) rotate(0); } }
        @keyframes staff-spin { 0% { transform: rotate(0deg) translateX(0); } 35% { transform: rotate(120deg) translateX(-3px); } 70% { transform: rotate(250deg) translateX(3px); } 100% { transform: rotate(360deg) translateX(0); } }
        @media (hover:none), (pointer:coarse) {
          .cute-footer-cat { width:68px; height:62px; transform:translate3d(0,0,0) scale(.82); }
          .cute-footer-cat.is-visible { transform:translate3d(0,0,0) scale(.82); }
          .cute-cat-stunt { animation-name: cute-cat-tumble-mobile !important; }
          .cute-cat-jump { animation-name: cute-cat-jump-mobile !important; }
          .cute-cat-kick { animation-name: cute-cat-kick-mobile !important; }
          .cute-cat-staff { animation-name: cute-cat-staff-mobile !important; }
        }
        @keyframes cute-cat-tumble-mobile {
          0% { transform: translate3d(0,0,0) scale(.82) rotate(0); }
          20% { transform: translate3d(0,-5px,0) scale(.84) rotate(70deg); }
          50% { transform: translate3d(0,-12px,0) scale(.84) rotate(180deg); }
          80% { transform: translate3d(0,-5px,0) scale(.84) rotate(290deg); }
          100% { transform: translate3d(0,0,0) scale(.82) rotate(360deg); }
        }
        @keyframes cute-cat-jump-mobile { 0%,100% { transform: translate3d(0,0,0) scale(.82); } 50% { transform: translate3d(0,-17px,0) scale(.84); } }
        @keyframes cute-cat-kick-mobile { 0%,100% { transform: translate3d(0,0,0) scale(.82) rotate(0); } 50% { transform: translate3d(3px,-7px,0) scale(.84) rotate(9deg); } }
        @keyframes cute-cat-staff-mobile { 0%,100% { transform: translate3d(0,0,0) scale(.82); } 45% { transform: translate3d(0,-7px,0) scale(.84) rotate(8deg); } }
        @media (prefers-reduced-motion: reduce) {
          .cute-footer-cat,.cute-cat-body,.cute-cat-tail,.cute-cat-walk .cute-cat-body,.cute-cat-walk .cute-cat-paw-left,.cute-cat-walk .cute-cat-paw-right,.cute-cat-ear,.cute-cat-eye,.cute-cat-stunt,.cute-cat-jump,.cute-cat-kick,.cute-cat-staff,.cute-cat-staff-pole { animation:none !important; transition:none; }
        }
      `}</style>
      <div ref={catRef} aria-hidden="true" className={`cute-footer-cat ${visible ? "is-visible" : ""}`}>
        <svg width="82" height="74" viewBox="0 0 132 118" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="66" cy="111" rx="35" ry="5" fill="rgba(0,0,0,.2)"/>
          <g className="cute-cat-body">
            <g className="cute-cat-tail"><path d="M91 57C112 45 126 54 122 69C119 80 109 82 101 75" stroke="#fff" strokeWidth="8" strokeLinecap="round"/><path d="M91 57C112 45 126 54 122 69C119 80 109 82 101 75" stroke="#172033" strokeWidth="2.4" strokeLinecap="round"/></g>
            <path d="M34 57C34 37 46 27 66 27C86 27 98 38 98 58C98 79 85 91 66 91C47 91 34 78 34 57Z" fill="#fff" stroke="#172033" strokeWidth="2.4"/>
            <g className="cute-cat-ear"><path d="M39 43L35 14L57 32Z" fill="#fff" stroke="#172033" strokeWidth="2.4" strokeLinejoin="round"/><path d="M41 37L39 23L51 33Z" fill="#f5a9bf"/></g>
            <g className="cute-cat-ear"><path d="M75 32L97 14L93 44Z" fill="#fff" stroke="#172033" strokeWidth="2.4" strokeLinejoin="round"/><path d="M81 33L94 23L92 38Z" fill="#f5a9bf"/></g>
            <g className="cute-cat-eye"><ellipse cx="53" cy="56" rx="5" ry="6" fill="#172033"/><circle cx="54.5" cy="54" r="1.7" fill="#fff"/></g>
            <g className="cute-cat-eye"><ellipse cx="79" cy="56" rx="5" ry="6" fill="#172033"/><circle cx="80.5" cy="54" r="1.7" fill="#fff"/></g>
            <path d="M63 65L69 65L66 69Z" fill="#ef9fb6" stroke="#172033" strokeWidth="1.1"/><path d="M66 69C63 73 59 73 57 70M66 69C69 73 73 73 75 70" stroke="#172033" strokeWidth="1.7" strokeLinecap="round"/>
            <path d="M37 68L18 64M37 74L17 75M95 68L114 64M95 74L116 75" stroke="#172033" strokeWidth="1.2" strokeLinecap="round" opacity=".65"/>
            <path d="M48 83C47 91 43 96 37 100C45 105 55 106 66 106C77 106 87 105 95 100C89 96 85 91 84 83C79 88 73 91 66 91C59 91 53 88 48 83Z" fill="#fff" stroke="#172033" strokeWidth="2.4"/>
            <g className="cute-cat-paw cute-cat-paw-left"><ellipse cx="47" cy="99" rx="9" ry="11" fill="#fff" stroke="#172033" strokeWidth="2.2"/><circle cx="43" cy="95" r="1.8" fill="#f2a5ba"/><circle cx="47" cy="93" r="1.8" fill="#f2a5ba"/><circle cx="51" cy="95" r="1.8" fill="#f2a5ba"/></g>
            <g className="cute-cat-paw cute-cat-paw-right"><ellipse cx="85" cy="99" rx="9" ry="11" fill="#fff" stroke="#172033" strokeWidth="2.2"/><circle cx="81" cy="95" r="1.8" fill="#f2a5ba"/><circle cx="85" cy="93" r="1.8" fill="#f2a5ba"/><circle cx="89" cy="95" r="1.8" fill="#f2a5ba"/></g>
          </g>
          <g className="cute-cat-staff-pole" aria-hidden="true">
            <rect x="16" y="54" width="100" height="5" rx="2.5" fill="#090b12" stroke="#273047" strokeWidth="1.2"/>
            <circle cx="18.5" cy="56.5" r="3.5" fill="#090b12" stroke="#273047" strokeWidth="1.1"/>
            <circle cx="113.5" cy="56.5" r="3.5" fill="#090b12" stroke="#273047" strokeWidth="1.1"/>
          </g>
        </svg>
        <span className="sr-only">Dekorative, animierte Katze im Footer</span>
      </div>
    </>
  );
}
