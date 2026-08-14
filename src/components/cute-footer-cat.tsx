"use client";

import { useEffect, useRef, useState } from "react";

const CAT_WIDTH = 82;
const CAT_HEIGHT = 74;
const EDGE_PADDING = 12;
const POINTER_GAP = 140;
const CANDIDATE_COUNT = 24;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function distanceToRect(pointX: number, pointY: number, left: number, top: number, width: number, height: number) {
  const closestX = clamp(pointX, left, left + width);
  const closestY = clamp(pointY, top, top + height);
  return Math.hypot(pointX - closestX, pointY - closestY);
}

export function CuteFooterCat() {
  const catRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    const cat = catRef.current;
    if (!footer || !cat) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(footer);

    const placeCatSafely = (event: PointerEvent) => {
      const rect = footer.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) return;

      const minLeft = Math.max(EDGE_PADDING, rect.left);
      const minTop = Math.max(EDGE_PADDING, rect.top);
      const maxLeft = Math.min(window.innerWidth - CAT_WIDTH - EDGE_PADDING, rect.right - CAT_WIDTH - EDGE_PADDING);
      const maxTop = Math.min(window.innerHeight - CAT_HEIGHT - EDGE_PADDING, rect.bottom - CAT_HEIGHT - EDGE_PADDING);

      if (maxLeft < minLeft || maxTop < minTop) return;

      const pointerX = event.clientX;
      const pointerY = event.clientY;
      const startAngle = Math.atan2(pointerY - (rect.top + rect.height / 2), pointerX - (rect.left + rect.width / 2));

      let best: { left: number; top: number; distance: number } | null = null;

      for (let index = 0; index < CANDIDATE_COUNT; index += 1) {
        const angle = startAngle + (Math.PI * 2 * index) / CANDIDATE_COUNT;
        const centerX = pointerX + Math.cos(angle) * POINTER_GAP;
        const centerY = pointerY + Math.sin(angle) * POINTER_GAP;
        const left = clamp(centerX - CAT_WIDTH / 2, minLeft, maxLeft);
        const top = clamp(centerY - CAT_HEIGHT / 2, minTop, maxTop);
        const distance = distanceToRect(pointerX, pointerY, left, top, CAT_WIDTH, CAT_HEIGHT);

        if (!best || distance > best.distance) best = { left, top, distance };
      }

      if (best) {
        cat.style.left = `${best.left}px`;
        cat.style.top = `${best.top}px`;
      }
    };

    window.addEventListener("pointermove", placeCatSafely, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", placeCatSafely);
    };
  }, []);

  return (
    <>
      <style>{`
        .cute-footer-cat {
          position: fixed;
          left: 20px;
          top: calc(100vh - 95px);
          width: ${CAT_WIDTH}px;
          height: ${CAT_HEIGHT}px;
          z-index: 40;
          border: 0;
          padding: 0;
          margin: 0;
          background: transparent;
          opacity: 0;
          pointer-events: none !important;
          transform: scale(.96);
          transition: opacity .2s ease, transform .2s ease;
        }
        .cute-footer-cat.is-visible {
          opacity: 1;
          transform: scale(1);
        }
        .cute-cat-paw { transform-box: fill-box; transform-origin: center; }
        .cute-cat-puff { animation: cute-puff .75s ease-out both; }
        @keyframes cute-puff { 0% { opacity: .8; transform: scale(.3); } 100% { opacity: 0; transform: scale(1.5) translateY(-4px); } }
        @media (prefers-reduced-motion: reduce) {
          .cute-footer-cat { transition: none; transform: none; }
          .cute-cat-puff { animation: none; }
        }
      `}</style>
      <div
        ref={catRef}
        aria-hidden="true"
        className={`cute-footer-cat ${visible ? "is-visible" : ""}`}
      >
        <svg width="82" height="74" viewBox="0 0 132 118" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="66" cy="111" rx="35" ry="5" fill="rgba(0,0,0,.2)"/>
          <path d="M91 57C112 45 126 54 122 69C119 80 109 82 101 75" stroke="#fff" strokeWidth="8" strokeLinecap="round"/>
          <path d="M91 57C112 45 126 54 122 69C119 80 109 82 101 75" stroke="#172033" strokeWidth="2.4" strokeLinecap="round"/>
          <path d="M34 57C34 37 46 27 66 27C86 27 98 38 98 58C98 79 85 91 66 91C47 91 34 78 34 57Z" fill="#fff" stroke="#172033" strokeWidth="2.4"/>
          <path d="M39 43L35 14L57 32Z" fill="#fff" stroke="#172033" strokeWidth="2.4" strokeLinejoin="round"/>
          <path d="M75 32L97 14L93 44Z" fill="#fff" stroke="#172033" strokeWidth="2.4" strokeLinejoin="round"/>
          <path d="M41 37L39 23L51 33Z" fill="#f5a9bf"/>
          <path d="M81 33L94 23L92 38Z" fill="#f5a9bf"/>
          <ellipse cx="53" cy="56" rx="5" ry="6" fill="#172033"/>
          <ellipse cx="79" cy="56" rx="5" ry="6" fill="#172033"/>
          <circle cx="54.5" cy="54" r="1.7" fill="#fff"/>
          <circle cx="80.5" cy="54" r="1.7" fill="#fff"/>
          <path d="M63 65L69 65L66 69Z" fill="#ef9fb6" stroke="#172033" strokeWidth="1.1"/>
          <path d="M66 69C63 73 59 73 57 70M66 69C69 73 73 73 75 70" stroke="#172033" strokeWidth="1.7" strokeLinecap="round"/>
          <path d="M37 68L18 64M37 74L17 75M95 68L114 64M95 74L116 75" stroke="#172033" strokeWidth="1.2" strokeLinecap="round" opacity=".65"/>
          <path d="M48 83C47 91 43 96 37 100C45 105 55 106 66 106C77 106 87 105 95 100C89 96 85 91 84 83C79 88 73 91 66 91C59 91 53 88 48 83Z" fill="#fff" stroke="#172033" strokeWidth="2.4"/>
          <g className="cute-cat-paw">
            <ellipse cx="47" cy="99" rx="9" ry="11" fill="#fff" stroke="#172033" strokeWidth="2.2"/>
            <circle cx="43" cy="95" r="1.8" fill="#f2a5ba"/><circle cx="47" cy="93" r="1.8" fill="#f2a5ba"/><circle cx="51" cy="95" r="1.8" fill="#f2a5ba"/>
          </g>
          <g className="cute-cat-paw">
            <ellipse cx="85" cy="99" rx="9" ry="11" fill="#fff" stroke="#172033" strokeWidth="2.2"/>
            <circle cx="81" cy="95" r="1.8" fill="#f2a5ba"/><circle cx="85" cy="93" r="1.8" fill="#f2a5ba"/><circle cx="89" cy="95" r="1.8" fill="#f2a5ba"/>
          </g>
        </svg>
        <span className="sr-only">Dekorative Katze im Footer</span>
      </div>
    </>
  );
}
