import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Motion brief — four systems, nothing else moves:
 *
 *   1. Hero load-in    — one-time timeline: image settles, eyebrow, masked
 *                        headline lines rise, rule draws, copy fades up.
 *   2. Scene arrivals  — each section plays the same arrival once as it
 *                        enters: eyebrow → masked h2 lines → rule → content.
 *   3. Macro parallax  — the movement macro drifts vertically, scrubbed to
 *                        scroll, while the architecture scene passes.
 *   (The peel itself stays in usePeel/CSS — GSAP never pins or hijacks.)
 *
 * One easing family (power3.out for reveals, power2.inOut for rules),
 * durations 0.6–1.2s, staggers 80–120ms. Everything is gated behind the
 * same viewport gate as the peel plus prefers-reduced-motion, via
 * gsap.matchMedia — outside the gate the page is fully static.
 */
const MOTION_GATE =
  '(prefers-reduced-motion: no-preference) and (min-width: 900px) and (min-height: 720px)';

export function usePageMotion(scopeRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!scopeRef.current) return;
    const ctx = gsap.context(() => {}, scopeRef);
    let cancelled = false;

    // SplitText measures line breaks, so the webfonts must be in first.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_GATE, () => {
          const splits: SplitText[] = [];

          /* 1 — hero load-in */
          const heroTitle = SplitText.create('#hero h1', { type: 'lines', mask: 'lines' });
          splits.push(heroTitle);
          gsap
            .timeline({ defaults: { ease: 'power3.out' } })
            .from('#hero img', { scale: 1.08, duration: 2.4, ease: 'power2.out' }, 0)
            .from('#hero .eyebrow', { y: 16, autoAlpha: 0, duration: 0.7 }, 0.15)
            .from(heroTitle.lines, { yPercent: 110, duration: 1.2, stagger: 0.12 }, 0.3)
            .from('#hero .gold-rule', { scaleX: 0, transformOrigin: 'left center', duration: 0.9, ease: 'power2.inOut' }, 0.95)
            .from('#hero .hero-content p', { y: 20, autoAlpha: 0, duration: 0.9 }, 1.1)
            .from('#hero .scroll-hint', { autoAlpha: 0, duration: 1 }, 1.5);

          /* 2 — scene arrivals */
          document.querySelectorAll<HTMLElement>('main > section:not(#hero)').forEach((sec) => {
            const h2 = sec.querySelector('h2');
            if (!h2) return;
            const split = SplitText.create(h2, { type: 'lines', mask: 'lines' });
            splits.push(split);

            const centered = Boolean(sec.querySelector('.content.centered, .cta-card'));
            const items = sec.querySelectorAll(
              [
                ':scope .content > p',
                ':scope .content > .numbered-list',
                ':scope .content > .fact-row',
                ':scope .process-grid > figure',
                ':scope .spec-grid > div',
                ':scope .lead-quote',
                ':scope .side-quotes > blockquote',
                ':scope .content > .signature-role',
                ':scope .cta-card > p',
                ':scope .price',
                ':scope .btn',
                ':scope .fig-caption',
              ].join(', '),
            );

            const tl = gsap.timeline({
              defaults: { ease: 'power3.out' },
              scrollTrigger: { trigger: sec, start: 'top 60%', once: true },
            });
            const eyebrow = sec.querySelector('.eyebrow');
            if (eyebrow) tl.from(eyebrow, { y: 16, autoAlpha: 0, duration: 0.6 }, 0);
            tl.from(split.lines, { yPercent: 110, duration: 1, stagger: 0.09 }, 0.15);
            const rule = sec.querySelector('.gold-rule');
            if (rule) {
              tl.from(
                rule,
                {
                  scaleX: 0,
                  transformOrigin: centered ? 'center center' : 'left center',
                  duration: 0.8,
                  ease: 'power2.inOut',
                },
                0.55,
              );
            }
            if (items.length) tl.from(items, { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.55);
          });

          /* 3 — scrubbed plate parallax */
          gsap.fromTo(
            '#architecture .plate-frame',
            { y: -18 },
            {
              y: 18,
              ease: 'none',
              scrollTrigger: { trigger: '#architecture', start: 'top bottom', end: 'bottom top', scrub: true },
            },
          );

          return () => splits.forEach((s) => s.revert());
        });
      });
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, [scopeRef]);
}
