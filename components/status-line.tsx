"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/lib/site";

const format = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: site.timeZone,
  }).format(d);

/* The wall clock is an external mutable source, so useSyncExternalStore is the
   right primitive: it re-reads on tick, and getServerSnapshot returning null
   means the server never renders a time the client would have to correct. */
const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
};

/* Returns the same string for a whole minute, so this stays referentially
   stable between renders and cannot loop. */
const getSnapshot = () => format(new Date());
const getServerSnapshot = () => null;

export function StatusLine({ className = "" }: { className?: string }) {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <p className={`meta flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      <span>{site.locationShort}</span>
      <span aria-hidden className="text-fg-faint">
        /
      </span>
      <span
        className="tabular-nums"
        aria-label={now ? `Local time ${now} ${site.timeZoneLabel}` : undefined}
      >
        {now ? `${now} ${site.timeZoneLabel}` : `— — ${site.timeZoneLabel}`}
      </span>
      <span aria-hidden className="text-fg-faint">
        /
      </span>
      <span className="inline-flex items-center gap-2 text-ok">
        <span className="relative flex h-1.5 w-1.5" aria-hidden>
          <span className="dot-ping absolute inline-flex h-full w-full rounded-full bg-ok" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
        </span>
        Open to work
      </span>
    </p>
  );
}
