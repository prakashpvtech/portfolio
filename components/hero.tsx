import { site } from "@/lib/site";
import { StatusLine } from "./status-line";

/* Server component. The hero's reveal is a CSS animation, so the above-the-fold
   content is visible without hydration, without an IntersectionObserver, and with
   JS disabled entirely — and the global prefers-reduced-motion rule freezes it on
   its visible end state. StatusLine is the only client code in here.
   Total reveal stays under ~800ms; the olivergareis.com lesson. */

const CHAR_STEP = 0.028;

function Chars({ word, delay }: { word: string; delay: number }) {
  return word.split("").map((ch, i) => (
    <span
      key={`${ch}-${i}`}
      className="reveal-up inline-block whitespace-pre"
      style={{ "--reveal-delay": `${delay + i * CHAR_STEP}s` } as React.CSSProperties}
    >
      {ch}
    </span>
  ));
}

export function Hero() {
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
            <span className="outlined block">
              <Chars word={site.firstName} delay={0.05} />
            </span>
            <span className="block">
              <Chars word={site.lastName} delay={0.28} />
              <span className="caret ml-2 inline-block h-[0.72em] w-[0.055em] translate-y-[0.02em] bg-accent align-baseline" />
            </span>
          </span>
        </h1>

        <p
          className="reveal-up mt-10 max-w-2xl text-lg text-fg-muted sm:text-xl"
          style={{ "--reveal-delay": "0.5s" } as React.CSSProperties}
        >
          {site.positioning}
        </p>

        <ul
          className="reveal-up mt-8 flex flex-wrap gap-x-7 gap-y-2"
          style={{ "--reveal-delay": "0.58s" } as React.CSSProperties}
        >
          {site.roles.map((role) => (
            <li key={role} className="meta flex items-center gap-2 text-fg">
              <span aria-hidden className="text-accent">
                ✳
              </span>
              {role}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="reveal-up flex flex-wrap items-end justify-between gap-6"
        style={{ "--reveal-delay": "0.66s" } as React.CSSProperties}
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
      </div>
    </section>
  );
}
