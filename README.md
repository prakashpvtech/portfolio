# Portfolio — Prakash Sirvi K

[![CI](https://github.com/prakashpvtech/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/prakashpvtech/portfolio/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

My personal site: a landing page plus a case study for each project, covering what
each one does — and what it doesn't.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion

## Design notes

- **Colour is variables, not variants.** Tokens live as CSS custom properties that swap
  on `[data-theme]`, so components use `bg-bg` / `text-fg` and no component carries a
  `dark:` prefix. Light is an editorial off-white; dark is the default.
- **External state uses `useSyncExternalStore`.** The wall clock and the active theme are
  both sources outside React, so they are read rather than mirrored into state from an
  effect.
- **Chrome visibility is an IntersectionObserver sentinel**, not a scroll listener — it
  reports on observe and costs nothing per frame.

## Accessibility and motion

These are treated as constraints, not polish:

- A single `prefers-reduced-motion` query disables every animation on the page.
- A skip link precedes all content; focus rings are never removed.
- Revealed blocks are forced visible under `<noscript>` — Motion writes its initial
  state into the server HTML, so without that the page would render blank.
- Self-hosted fonts via `next/font`, so no layout shift and no third-party request.

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npx eslint .        # lint
npx tsc --noEmit    # typecheck
npm run build       # production build
```

CI runs all three on every push.

## Structure

```
app/
  page.tsx            landing page
  work/[slug]/        one SSG case study per project
components/           hero, section shell, project list, chrome, theme toggle
lib/
  site.ts             profile, section index
  projects.ts         project data + case-study content
```

## License

MIT — see [LICENSE](LICENSE).
