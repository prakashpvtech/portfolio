/* Inline SVG rather than an exported image: it inherits the theme tokens, scales
   without artefacts, and the labels stay real text for screen readers and search. */
export function ArchitectureDiagram() {
  const box = "fill-[var(--bg-elevated)] stroke-[var(--line)]";
  const label = "fill-[var(--fg-muted)] font-mono text-[9px] tracking-[0.14em] uppercase";
  const body = "fill-[var(--fg)] text-[11px]";
  const faint = "fill-[var(--fg-faint)] font-mono text-[9px]";

  return (
    <figure className="overflow-x-auto rounded-lg border border-line bg-bg p-5 sm:p-7">
      <svg
        viewBox="0 0 720 396"
        role="img"
        aria-labelledby="arch-title arch-desc"
        className="h-auto w-full min-w-[560px]"
      >
        <title id="arch-title">FinPilot AI architecture</title>
        <desc id="arch-desc">
          A Next.js frontend calls a FastAPI backend over HTTP with bearer JWTs. Inside the
          backend, thin routers delegate to services, which call framework-free domain
          engines. Those engines read and write PostgreSQL through async SQLAlchemy, and use
          Redis for rate limiting, brute-force lockout and AI memory.
        </desc>

        {/* Frontend tier */}
        <text x="0" y="12" className={label}>
          Frontend · Next.js 16
        </text>
        <rect x="0" y="22" width="720" height="76" rx="8" className={box} strokeWidth="1" />
        {[
          ["app/(auth)", "login · register · reset", 16],
          ["app/(dashboard)", "10 feature areas", 250],
          ["features/*/api", "payload → view model", 484],
        ].map(([heading, sub, x]) => (
          <g key={heading as string}>
            <text x={x as number} y="52" className={body}>
              {heading}
            </text>
            <text x={x as number} y="72" className={faint}>
              {sub}
            </text>
          </g>
        ))}

        {/* Boundary */}
        <line
          x1="360"
          y1="98"
          x2="360"
          y2="132"
          className="stroke-[var(--accent)]"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <text x="372" y="120" className={label}>
          HTTP · Bearer JWT
        </text>

        {/* Backend tier */}
        <text x="0" y="152" className={label}>
          Backend · FastAPI · 13 modules
        </text>
        <rect x="0" y="162" width="720" height="86" rx="8" className={box} strokeWidth="1" />
        {[
          ["Routers", "thin — parse & validate", 16],
          ["Services", "auth · audit · oauth", 250],
          ["Domain engines", "no framework import", 484],
        ].map(([heading, sub, x]) => (
          <g key={heading as string}>
            <text x={x as number} y="196" className={body}>
              {heading}
            </text>
            <text x={x as number} y="216" className={faint}>
              {sub}
            </text>
          </g>
        ))}
        {[228, 462].map((x) => (
          <text key={x} x={x} y="200" className="fill-[var(--accent)] text-[13px]">
            →
          </text>
        ))}
        <text x="16" y="238" className={faint}>
          identity · market data · AI gateway · document RAG · analysis · portfolio · news ·
          wealth · dashboard · notifications · integrations
        </text>

        <line
          x1="360"
          y1="248"
          x2="360"
          y2="282"
          className="stroke-[var(--accent)]"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Data tier */}
        <text x="0" y="302" className={label}>
          Data
        </text>
        <rect x="0" y="312" width="348" height="72" rx="8" className={box} strokeWidth="1" />
        <text x="16" y="342" className={body}>
          PostgreSQL
        </text>
        <text x="16" y="362" className={faint}>
          SQLAlchemy async ORM
        </text>

        <rect x="372" y="312" width="348" height="72" rx="8" className={box} strokeWidth="1" />
        <text x="388" y="342" className={body}>
          Redis
        </text>
        <text x="388" y="362" className={faint}>
          rate limit · lockout · AI memory
        </text>
      </svg>
      <figcaption className="meta mt-5 text-fg-faint">
        Thin routers → services → framework-free engines → data
      </figcaption>
    </figure>
  );
}
