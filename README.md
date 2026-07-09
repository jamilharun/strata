# Strata — Caliber 1

A concept landing page for a fictional independent watchmaker releasing a
50-piece skeleton watch. Built as a portfolio design study in editorial,
print-inspired web design: hairline rules, a strict typographic system, a
custom scroll mechanic, and deliberately restrained motion.

**Live:** https://strata.jamilharun.workers.dev

> Concept design by [Jamil Harun](https://portfolio.jamilharun.workers.dev).
> Strata is a fictional brand; imagery is AI-generated concept art.

## Stack

- **React 19 + TypeScript + Vite** — single-page app, no router, no state library
- **Tailwind CSS v4** — design tokens via `@theme`, custom `@utility` definitions,
  bespoke stylesheet in `@layer components`
- **GSAP** (ScrollTrigger + SplitText) — scroll choreography
- **Cloudflare Workers** — static assets serving, security headers, health endpoint

## How it works

### The peel mechanic

Sections pin to the viewport with `position: sticky` while the next section
slides up and covers them — the covered scene dims and drifts upward. Native
scroll is never hijacked: one rAF-throttled scroll listener
(`src/hooks/usePeel.ts`) feeds each section a `--peel` custom property
(0 → next section entering, 1 → fully covered) and the rest is CSS.

The effect only engages on viewports where every section provably fits
(`min-width: 900px` and `min-height: 720px`, with a tightened layout tier for
short laptop screens). Below the gate — and for `prefers-reduced-motion`
users — the page is a plain scrolling document.

### The motion brief

All GSAP animation lives in `src/hooks/usePageMotion.ts` and is limited to
three systems (documented in the file header):

1. **Hero load-in** — masked headline lines rise, rule draws, copy fades up
2. **Scene arrivals** — each section plays the same staggered reveal once
3. **Plate parallax** — the movement detail drifts, scrubbed to scroll

One easing family, durations 0.6–1.2 s, staggers 80–120 ms. Everything is
gated behind `gsap.matchMedia` on the same viewport gate as the peel plus
`prefers-reduced-motion`, so the static fallback is total.

### Materials

A sub-perceptual paper grain (inline SVG `feTurbulence`, ~3% opacity, no
asset) overlays the page, and the dark sections carry a faint radial lift —
both defined as Tailwind `@utility` classes (`grain`, `ink-depth`).

### The Worker

`worker/index.ts` serves the built site via Workers Static Assets with
`run_worker_first: true`, so every response — assets included — gets a strict
Content-Security-Policy, HSTS, `nosniff`, referrer and permissions policies.
Framing is allowed only from the portfolio origin via `frame-ancestors`.
`GET /ping` returns `200 pong` with open CORS for uptime checks from any
origin.

## Development

```bash
npm install
npm run dev          # Vite dev server
npm run build        # type-check (app + worker) and build to dist/
npx wrangler dev     # serve dist/ through the Worker locally
```

## Deployment

```bash
npm run deploy       # build + wrangler deploy
npm run cf-typegen   # regenerate Env types after wrangler.jsonc changes
```

Requires a Cloudflare account (`npx wrangler login`). The compatibility date
in `wrangler.jsonc` is capped by the installed workerd runtime — if
`wrangler dev` rejects the date, update wrangler alongside it.

## Structure

```
public/               images served as-is (all unbranded/AI concept art)
src/
  index.css           design tokens, full design system, peel + responsive CSS
  App.tsx             page composition
  hooks/
    usePeel.ts        peel progress + active-section tracking (no GSAP)
    usePageMotion.ts  the GSAP motion brief
  components/         one component per section + header/footer/nav
worker/
  index.ts            security headers + /ping endpoint
wrangler.jsonc        Workers Static Assets config (run_worker_first)
```
