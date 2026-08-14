"use client";

import { useEffect, useRef, useState } from "react";

export function CuteFooterCat() {
  const catRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);
  const [pooping, setPooping] = useState(false);
  const poopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const footer = document.querySelector("footer");
    const cat = catRef.current;
    if (!footer || !cat) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(footer);

    const onPointerMove = (event: PointerEvent) => {
      if (!entryInsideFooter(event, footer)) return;
      const width = 82;
      const height = 74;
      const left = Math.max(8, Math.min(window.innerWidth - width - 8, event.clientX - width / 2));
      const top = Math.max(8, Math.min(window.innerHeight - height - 8, event.clientY - height / 2));
      cat.style.left = `${left}px`;
      cat.style.top = `${top}px`;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      if (poopTimer.current) clearTimeout(poopTimer.current);
    };
  }, []);

  function entryInsideFooter(event: PointerEvent, footer: Element) {
    const rect = footer.getBoundingClientRect();
    return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
  }

  function handleClick() {
    setPooping(true);
    if (poopTimer.current) clearTimeout(poopTimer.current);
    poopTimer.current = setTimeout(() => setPooping(false), 1300);
  }

  return (
    <>
      <style>{`
        .cute-footer-cat {
          position: fixed;
          left: 20px;
          top: calc(100vh - 95px);
          width: 82px;
          height: 74px;
          z-index: 100;
          border: 0;
          padding: 0;
          margin: 0;
          background: transparent;
          cursor: pointer;
          opacity: 0;
          pointer-events: none;
          transform: scale(.96);
          transition: opacity .2s ease, transform .2s ease;
        }
        .cute-footer-cat.is-visible {
          opacity: 1;
          pointer-events: auto;
          transform: scale(1);
        }
        .cute-footer-cat:hover { transform: scale(1.05); }
        .cute-footer-cat:focus-visible { outline: 2px solid #60a5fa; outline-offset: 4px; border-radius: 999px; }
        .cute-cat-paw { transform-box: fill-box; transform-origin: center; }
        .cute-footer-cat:hover .cute-cat-paw { animation: cute-paw .42s ease-in-out; }
        .cute-cat-poop { transform-origin: 100px 84px; animation: cute-poop .7s cubic-bezier(.2,.8,.2,1) both; }
        .cute-cat-puff { animation: cute-puff .75s ease-out both; }
        @keyframes cute-paw { 50% { transform: translateY(-2px) rotate(-5deg); } }
        @keyframes cute-poop { 0% { opacity: 0; transform: translate(0,-12px) scale(.35); } 55% { opacity: 1; transform: translate(0,1px) scale(1.05); } 100% { opacity: 1; transform: translate(0,0) scale(1); } }
        @keyframes cute-puff { 0% { opacity: .8; transform: scale(.3); } 100% { opacity: 0; transform: scale(1.5) translateY(-4px); } }
        @media (prefers-reduced-motion: reduce) {
          .cute-footer-cat, .cute-footer-cat:hover { transition: none; transform: none; }
          .cute-cat-paw, .cute-cat-poop, .cute-cat-puff { animation: none; }
        }
      `}</style>
      <button
        ref={catRef}
        type="button"
        aria-label="Niedliche Katze im Footer"
        className={`cute-footer-cat ${visible ? "is-visible" : ""}`}
        onClick={handleClick}
      >
        <svg width="82" height="74" viewBox="0 0 132 118" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
          {pooping && (
            <g className="cute-cat-poop">
              <path d="M101 91C96 87 99 82 104 82C101 77 106 74 111 78C114 73 120 77 118 82C123 82 124 88 119 91C116 94 106 95 101 91Z" fill="#8b5a2b" stroke="#5b3a1c" strokeWidth="1.6"/>
              <circle className="cute-cat-puff" cx="121" cy="78" r="4" fill="#b98a5a" opacity=".65"/>
              <circle className="cute-cat-puff" cx="125" cy="86" r="3" fill="#b98a5a" opacity=".55"/>
            </g>
          )}
        </svg>
      </button>
      <style>{`.footer-cat-live { display: none !important; }`}</style>
    </>
  );
}
