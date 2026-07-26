"use client";

import { useEffect, useRef, useState } from "react";
import { sections } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

/* Pill nav (jingjinghan.com), bracket radio markers and the persistent corner
   section indicator (dungyov.com) all share one piece of state, so they live in
   one component rather than three that each observe the page. */
export function Chrome() {
  const [active, setActive] = useState<string>(sections[0].id);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  /* A sentinel at the top of the page rather than a scroll listener: it reports
     its own initial state on observe, costs nothing per frame, and cannot drift
     out of sync after a programmatic jump. */
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Close the mobile sheet on Escape — keyboard users must have a way out. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const current = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <>
      {/* Scrolled past this and the chrome appears. */}
      <div ref={sentinel} aria-hidden className="absolute top-0 left-0 h-30 w-px" />

      {/* Desktop pill nav */}
      <nav
        aria-label="Sections"
        className={`fixed top-5 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-line bg-bg/70 px-2 py-1.5 backdrop-blur-md transition-all duration-500 md:flex ${
          scrolled ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        {sections.map((s) => {
          const isActive = s.id === active;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`meta rounded-full px-3 py-1.5 transition-colors ${
                isActive ? "text-accent" : "text-fg-muted hover:text-fg"
              }`}
            >
              <span aria-hidden className="mr-1.5">
                {isActive ? "[·]" : "[ ]"}
              </span>
              {s.label}
            </a>
          );
        })}
        <span aria-hidden className="mx-1 h-4 w-px bg-line" />
        <ThemeToggle />
      </nav>

      {/* Mobile: a single button opening a full-screen sheet with large targets */}
      <div
        className={`fixed top-4 right-4 z-50 flex items-center gap-2 transition-opacity duration-500 md:hidden ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        <ThemeToggle className="rounded-full border border-line bg-bg/70 backdrop-blur-md" />
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          className="meta rounded-full border border-line bg-bg/70 px-4 py-2 text-fg backdrop-blur-md"
        >
          Menu
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-bg md:hidden">
          <div className="flex items-center justify-between px-6 py-5">
            <p className="meta text-fg-faint">Sections</p>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="meta px-3 py-2 text-fg"
            >
              Close ✕
            </button>
          </div>
          <ul className="flex flex-1 flex-col justify-center gap-2 px-6 pb-16">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="display flex items-baseline gap-4 py-4 text-3xl"
                >
                  <span className="meta text-accent">{s.index}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Persistent section indicator */}
      <p
        aria-hidden
        className={`meta fixed bottom-5 left-6 z-40 hidden transition-opacity duration-500 lg:block ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        Section <span className="text-accent">{current.index}</span> / {current.label}
      </p>
    </>
  );
}
