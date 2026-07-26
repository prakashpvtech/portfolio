import { NextResponse } from "next/server";

/* Proxies a single fixed problem to CodeForge's judge.
 *
 * Server-side because the judge sends no CORS headers, so the browser could not
 * call it directly. The slug and language are hardcoded rather than taken from
 * the request: this endpoint exists to run one demo, and forwarding arbitrary
 * input would turn my domain into a general-purpose relay for someone else's
 * execution service. */
const JUDGE = "https://dsacodeforgeai.vercel.app/api/judge";
const SLUG = "two-sum";
const MAX_CODE = 4000;

export async function POST(request: Request) {
  let code: unknown;
  try {
    ({ code } = await request.json());
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  if (typeof code !== "string" || code.trim().length === 0) {
    return NextResponse.json({ error: "Send some code to run." }, { status: 400 });
  }
  if (code.length > MAX_CODE) {
    return NextResponse.json(
      { error: `That is longer than ${MAX_CODE} characters.` },
      { status: 413 },
    );
  }

  try {
    const upstream = await fetch(JUDGE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: SLUG, language: "javascript", code, submit: true }),
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return NextResponse.json(
        { error: data?.error ?? "The judge rejected that submission." },
        { status: 502 },
      );
    }

    /* Forward only what the widget renders — the judge also echoes back debug
       payloads that nobody needs on this page. */
    return NextResponse.json({
      passed: Boolean(data.passed),
      runtimeError: data.runtimeError ?? null,
      compileError: data.compileError ?? null,
      results: Array.isArray(data.results)
        ? data.results.slice(0, 5).map((r: Record<string, unknown>) => ({
            input: String(r.input ?? ""),
            expected: String(r.expected ?? ""),
            actual: String(r.actual ?? ""),
            passed: Boolean(r.passed),
            timeMs: typeof r.timeMs === "number" ? r.timeMs : null,
          }))
        : [],
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return NextResponse.json(
      {
        error: timedOut
          ? "The judge took too long to answer."
          : "Could not reach the judge right now.",
      },
      { status: 504 },
    );
  }
}
