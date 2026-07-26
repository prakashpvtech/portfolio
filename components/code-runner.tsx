"use client";

import { useState } from "react";

type Result = {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  timeMs: number | null;
};

type Response = {
  passed?: boolean;
  results?: Result[];
  runtimeError?: string | null;
  compileError?: string | null;
  error?: string;
};

const STARTER = `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(target - nums[i])) {
      return [seen.get(target - nums[i]), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`;

export function CodeRunner() {
  const [code, setCode] = useState(STARTER);
  const [state, setState] = useState<"idle" | "running">("idle");
  const [response, setResponse] = useState<Response | null>(null);

  async function run() {
    setState("running");
    setResponse(null);
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      setResponse(await res.json());
    } catch {
      setResponse({ error: "Network error — could not reach the judge." });
    } finally {
      setState("idle");
    }
  }

  const error = response?.error ?? response?.compileError ?? response?.runtimeError;

  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-bg-elevated px-4 py-3">
        <p className="meta">
          two-sum <span className="text-fg-faint">/ javascript</span>
        </p>
        <button
          type="button"
          onClick={run}
          disabled={state === "running"}
          className="meta rounded-full bg-accent px-4 py-2 text-accent-fg transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {state === "running" ? "Running…" : "Run ▸"}
        </button>
      </div>

      <label className="sr-only" htmlFor="runner">
        JavaScript solution for two-sum
      </label>
      <textarea
        id="runner"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        rows={11}
        className="w-full resize-y bg-bg px-4 py-4 font-mono text-[0.78rem] leading-relaxed text-fg outline-none"
      />

      <div
        aria-live="polite"
        className="border-t border-line bg-bg-elevated px-4 py-4 text-sm"
      >
        {!response && state === "idle" && (
          <p className="meta text-fg-faint">
            Edit the solution and press run — it executes on the real judge.
          </p>
        )}

        {state === "running" && <p className="meta text-fg-faint">Waiting for the judge…</p>}

        {error && (
          <p className="font-mono text-[0.78rem] text-fg">
            <span className="meta mr-2 text-fg-faint">Error</span>
            {error}
          </p>
        )}

        {response?.results && response.results.length > 0 && (
          <div className="space-y-3">
            <p className="meta">
              {response.passed ? (
                <span className="text-ok">All cases passed</span>
              ) : (
                <span className="text-fg">Some cases failed</span>
              )}
            </p>
            <ul className="space-y-2 font-mono text-[0.72rem]">
              {response.results.map((r, i) => (
                <li
                  key={i}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-2 first:border-t-0 first:pt-0"
                >
                  <span className={r.passed ? "text-ok" : "text-fg"}>
                    {r.passed ? "PASS" : "FAIL"}
                  </span>
                  <span className="text-fg-faint">
                    in {r.input.replace(/\n/g, " · ")}
                  </span>
                  <span className="text-fg-muted">got {r.actual}</span>
                  {!r.passed && <span className="text-fg-faint">want {r.expected}</span>}
                  {r.timeMs !== null && <span className="text-fg-faint">{r.timeMs}ms</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
