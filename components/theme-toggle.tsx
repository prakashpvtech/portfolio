"use client";

import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const EVENT = "themechange";

/* The current theme lives in the DOM (data-theme) with the OS preference as
   fallback — both external sources, so useSyncExternalStore reads them rather
   than mirroring them into React state inside an effect. */
const read = (): Theme => {
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit === "light" || explicit === "dark") return explicit;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const subscribe = (onChange: () => void) => {
  const mq = matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    window.removeEventListener(EVENT, onChange);
  };
};

/* null on the server so the markup never claims a theme the client must correct. */
const getServerSnapshot = () => null;

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, read, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = read() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* Private mode — the choice just won't persist. */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Switch theme"
      }
      className={`meta inline-flex h-7 items-center gap-1.5 rounded-full px-2 text-fg-muted transition-colors hover:text-accent ${className}`}
    >
      <span aria-hidden>{theme === "dark" ? "◑" : "◐"}</span>
      <span className="hidden sm:inline">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
