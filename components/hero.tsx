"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { StatusLine } from "./status-line";

/* Total reveal stays under ~700ms so the hero is readable almost immediately —
   the olivergareis.com lesson. Reduced motion skips it entirely. */
const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: EASE },
        };

  const chars = (word: string, baseDelay: number) =>
    word.split("").map((ch, i) => (
      <motion.span
        key={`${ch}-${i}`}
        aria-hidden
        /* inline-block collapses a plain space, so render it as a nbsp. */
        className="inline-block whitespace-pre"
        initial={reduce ? undefined : { opacity: 0, y: "0.35em" }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={
          reduce
            ? undefined
            : { duration: 0.4, delay: baseDelay + i * 0.028, ease: EASE }
        }
      >
        {ch === " " ? " " : ch}
      </motion.span>
    ));

  return (
    <section
      id="intro"
      className="relative flex min-h-[100svh] flex-col justify-between px-6 pt-24 pb-10 sm:px-10 lg:px-14"
    >
      {/* Corner metadata — coordinates instead of a city, and the year stamp. */}
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-1">
          <p className="meta">{site.coordinates}</p>
          <p className="meta text-fg-faint">{site.location}</p>
        </div>
        <p className="meta shrink-0 text-right">{site.stamp}</p>
      </div>

      <div className="py-14">
        {/* Outline over solid — one typographic idea carrying the whole hero. */}
        <h1 className="display text-[15vw] leading-[0.86] sm:text-[12vw] lg:text-[9.5rem]">
          <span className="sr-only">{site.name}</span>
          {/* One aria-hidden wrapper for the whole decorative split, so the name is
              announced once from the sr-only span above, not twice. */}
          <span aria-hidden>
            <span className="outlined block">{chars(site.firstName, 0.05)}</span>
            <span className="block">
              {chars(site.lastName, 0.28)}
              <span className="caret ml-2 inline-block h-[0.72em] w-[0.055em] translate-y-[0.02em] bg-accent align-baseline" />
            </span>
          </span>
        </h1>

        <motion.p
          {...rise(0.5)}
          className="mt-10 max-w-2xl text-lg text-fg-muted sm:text-xl"
        >
          {site.positioning}
        </motion.p>

        <motion.ul {...rise(0.58)} className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
          {site.roles.map((role) => (
            <li key={role} className="meta flex items-center gap-2 text-fg">
              <span aria-hidden className="text-accent">
                ✳
              </span>
              {role}
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        {...rise(0.66)}
        className="flex flex-wrap items-end justify-between gap-6"
      >
        <StatusLine />
        <a
          href="#work"
          className="meta group inline-flex items-center gap-2 text-fg transition-colors hover:text-accent"
        >
          Scroll to explore
          <span
            aria-hidden
            className="inline-block transition-transform group-hover:translate-y-0.5"
          >
            ↓
          </span>
        </a>
      </motion.div>
    </section>
  );
}
