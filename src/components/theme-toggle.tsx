"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : true;
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  }

  return (
    <button onClick={toggle} aria-label="Farbmodus wechseln" className="rounded-full border border-[var(--border)] p-2 text-[var(--muted)] transition hover:text-[var(--text)]">
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
