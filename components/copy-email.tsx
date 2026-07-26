"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  /* Reset the confirmation without setting state straight from an effect body. */
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      /* Clipboard blocked — the mailto link beside this still works. */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="meta inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-fg-muted transition-colors hover:border-accent hover:text-accent"
    >
      <span aria-hidden>{copied ? "✓" : "⧉"}</span>
      {copied ? "Copied" : "Copy email"}
      <span aria-live="polite" className="sr-only">
        {copied ? `${site.email} copied to clipboard` : ""}
      </span>
    </button>
  );
}
