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
  const activeRef = useRef(false);
  const touchDeviceRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    const cat = catRef.current;
    if (!footer || !cat) return;

    touchDeviceRef.current = window.matchMedia("(hover: none), (pointer: coarse)").matches;

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

    const setWalking = (walking: boolean) => {
      cat.classList.toggle("cute-cat-walk", walking);
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
      setVisible(true);
    };

    const enterFooter = (event: PointerEvent) => {
      if (touchDeviceRef.current || !isInsideFooter(event.clientX, event.clientY)) return;
      const resting = getRestingPosition();
      setPosition(resting.x, resting.y);
      targetRef.current = resting;
      activeRef.current = true;
      setVisible(true);
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
        setPosition(getRestingPosition().x, getRestingPosition().y);
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    const handleResize = () => {
      const resting = getRestingPosition();
      if (touchDeviceRef.current) {
        updateMobileCat();
      } else if (!activeRef.current) {
        setPosition(resting.x, resting.y);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (touchDeviceRef.current) {
          setVisible(entry.isIntersecting);
          if (entry.isIntersecting) updateMobileCat();
        } else {
          setVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.05 },
    );
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

    return () => {
      observer.disconnect();
      footer.removeEventListener("pointerenter", enterFooter);
      footer.removeEventListener("pointermove", moveToCursor);
      footer.removeEventListener("pointerleave", leaveFooter);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateMobileCat);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
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
          z-index: 10;
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

        .cute-footer-cat.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }

        .cute-cat-body {
          transform-origin: center bottom;
          animation: cute-cat-breathe 1.7s ease-in-out infinite;
        }

        .cute-cat-tail {
          transform-box: fill-box;
          transform-origin: 18% 70%;
          animation: cute-cat-tail 1.15s ease-in-out infinite;
        }

        .cute-cat-paw { transform-box: fill-box; transform-origin: center top; }
        .cute-cat-walk .cute-cat-body { animation: cute-cat-walk-bounce .42s ease-in-out infinite alternate; }
        .cute-cat-walk .cute-cat-paw-left { animation: cute-cat-step-left .42s ease-in-out infinite alternate; }
        .cute-cat-walk .cute-cat-paw-right { animation: cute-cat-step-right .42s ease-in-out infinite alternate; }
        .cute-cat-ear { transform-box: fill-box; transform-origin: bottom center; animation: cute-cat-ear 3.2s ease-in-out infinite; }
        .cute-cat-eye { transform-box: fill-box; transform-origin: center; animation: cute-cat-blink 4.5s ease-in-out infinite; }

        @keyframes cute-cat-breathe {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-1.5px) scaleY(1.018); }
        }
        @keyframes cute-cat-walk-bounce {
          from { transform: translateY(0) rotate(-1deg); }
          to { transform: translateY(-2.5px) rotate(1deg); }
        }
        @keyframes cute-cat-tail {
          0%, 100% { transform: rotate(-7deg); }
          50% { transform: rotate(18deg); }
        }
        @keyframes cute-cat-step-left {
          from { transform: translateY(0) rotate(5deg); }
          to { transform: translateY(-4px) rotate(-8deg); }
        }
        @keyframes cute-cat-step-right {
          from { transform: translateY(-4px) rotate(-8deg); }
          to { transform: translateY(0) rotate(5deg); }
        }
        @keyframes cute-cat-ear {
          0%, 82%, 100% { transform: rotate(0); }
          88% { transform: rotate(-6deg); }
          93% { transform: rotate(4deg); }
        }
        @keyframes cute-cat-blink {
          0%, 88%, 100% { transform: scaleY(1); }
          91% { transform: scaleY(.08); }
          94% { transform: scaleY(1); }
        }

        @media (hover: none), (pointer: coarse) {
          .cute-footer-cat {
            width: 68px;
            height: 62px;
            transform: translate3d(0, 0, 0) scale(.82);
          }
          .cute-footer-cat.is-visible { transform: translate3d(0, 0, 0) scale(.82); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cute-footer-cat,
          .cute-cat-body,
          .cute-cat-tail,
          .cute-cat-walk .cute-cat-body,
          .cute-cat-walk .cute-cat-paw-left,
          .cute-cat-walk .cute-cat-paw-right,
          .cute-cat-ear,
          .cute-cat-eye {
            animation: none;
            transition: none;
          }
        }
      `}</style>

      <div ref={catRef} aria-hidden="true" className={`cute-footer-cat ${visible ? "is-visible" : ""}`}>
        <svg width="82" height="74" viewBox="0 0 132 118" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="66" cy="111" rx="35" ry="5" fill="rgba(0,0,0,.2)"/>
          <g className="cute-cat-body">
            <g className="cute-cat-tail">
              <path d="M91 57C112 45 126 54 122 69C119 80 109 82 101 75" stroke="#fff" strokeWidth="8" strokeLinecap="round"/>
              <path d="M91 57C112 45 126 54 122 69C119 80 109 82 101 75" stroke="#172033" strokeWidth="2.4" strokeLinecap="round"/>
            </g>
            <path d="M34 57C34 37 46 27 66 27C86 27 98 38 98 58C98 79 85 91 66 91C47 91 34 78 34 57Z" fill="#fff" stroke="#172033" strokeWidth="2.4"/>
            <g className="cute-cat-ear">
              <path d="M39 43L35 14L57 32Z" fill="#fff" stroke="#172033" strokeWidth="2.4" strokeLinejoin="round"/>
              <path d="M41 37L39 23L51 33Z" fill="#f5a9bf"/>
            </g>
            <g className="cute-cat-ear">
              <path d="M75 32L97 14L93 44Z" fill="#fff" stroke="#172033" strokeWidth="2.4" strokeLinejoin="round"/>
              <path d="M81 33L94 23L92 38Z" fill="#f5a9bf"/>
            </g>
            <g className="cute-cat-eye"><ellipse cx="53" cy="56" rx="5" ry="6" fill="#172033"/><circle cx="54.5" cy="54" r="1.7" fill="#fff"/></g>
            <g className="cute-cat-eye"><ellipse cx="79" cy="56" rx="5" ry="6" fill="#172033"/><circle cx="80.5" cy="54" r="1.7" fill="#fff"/></g>
            <path d="M63 65L69 65L66 69Z" fill="#ef9fb6" stroke="#172033" strokeWidth="1.1"/>
            <path d="M66 69C63 73 59 73 57 70M66 69C69 73 73 73 75 70" stroke="#172033" strokeWidth="1.7" strokeLinecap="round"/>
            <path d="M37 68L18 64M37 74L17 75M95 68L114 64M95 74L116 75" stroke="#172033" strokeWidth="1.2" strokeLinecap="round" opacity=".65"/>
            <path d="M48 83C47 91 43 96 37 100C45 105 55 106 66 106C77 106 87 105 95 100C89 96 85 91 84 83C79 88 73 91 66 91C59 91 53 88 48 83Z" fill="#fff" stroke="#172033" strokeWidth="2.4"/>
            <g className="cute-cat-paw cute-cat-paw-left"><ellipse cx="47" cy="99" rx="9" ry="11" fill="#fff" stroke="#172033" strokeWidth="2.2"/><circle cx="43" cy="95" r="1.8" fill="#f2a5ba"/><circle cx="47" cy="93" r="1.8" fill="#f2a5ba"/><circle cx="51" cy="95" r="1.8" fill="#f2a5ba"/></g>
            <g className="cute-cat-paw cute-cat-paw-right"><ellipse cx="85" cy="99" rx="9" ry="11" fill="#fff" stroke="#172033" strokeWidth="2.2"/><circle cx="81" cy="95" r="1.8" fill="#f2a5ba"/><circle cx="85" cy="93" r="1.8" fill="#f2a5ba"/><circle cx="89" cy="95" r="1.8" fill="#f2a5ba"/></g>
          </g>
        </svg>
        <span className="sr-only">Dekorative, animierte Katze im Footer</span>
      </div>
    </>
  );
}
