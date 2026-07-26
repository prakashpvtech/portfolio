"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  id: string;
  index: string;
  label: string;
  /* The big statement that opens every section — specia1ne.com's pattern. */
  statement: ReactNode;
  lede?: string;
  /* e.g. "ACTIVE 01 / 04" */
  counter?: string;
  children?: ReactNode;
};

export function Section({ id, index, label, statement, lede, counter, children }: Props) {
  const reduce = useReducedMotion();

  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-12% 0px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section id={id} className="border-t border-line px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="meta">
          <span className="text-accent">{index}</span>
          <span aria-hidden className="mx-2 text-fg-faint">
            /
          </span>
          {label}
        </p>
        {counter && <p className="meta text-fg-faint">{counter}</p>}
      </div>

      <motion.div {...reveal} className="mt-10 max-w-4xl">
        <h2 className="display text-4xl sm:text-5xl lg:text-[3.75rem]">{statement}</h2>
        {lede && <p className="mt-6 max-w-2xl text-fg-muted">{lede}</p>}
      </motion.div>

      {children && <div className="mt-16">{children}</div>}
    </section>
  );
}
