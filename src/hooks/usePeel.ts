import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

const PEEL_GATE = '(min-width: 900px) and (min-height: 720px)';
const MOTION_OK = '(prefers-reduced-motion: no-preference)';

/**
 * Drives the peel mechanic and section tracking.
 *
 * Sections pin via CSS `position: sticky`; this hook only feeds each
 * section a `--peel` custom property (0 → next section entering the
 * viewport, 1 → fully covered) and tracks which section is current.
 * Native scroll is never hijacked.
 *
 * Flow positions come from `offsetTop`, which ignores the sticky offset —
 * unlike getBoundingClientRect, it stays valid while sections are pinned.
 */
export function usePeel(mainRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(0);
  const [labels, setLabels] = useState<string[]>([]);
  const topsRef = useRef<number[]>([]);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const sections = [...main.querySelectorAll<HTMLElement>(':scope > section')];
    const peelGate = matchMedia(PEEL_GATE);
    const motionOK = matchMedia(MOTION_OK);

    setLabels(sections.map((s) => s.querySelector('h1, h2')?.textContent ?? s.id));

    const measure = () => {
      topsRef.current = sections.map((s) => s.offsetTop);
    };

    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const tops = topsRef.current;
      const peelOn = peelGate.matches && motionOK.matches;

      sections.forEach((sec, i) => {
        if (!peelOn) {
          sec.style.removeProperty('--peel');
          return;
        }
        const next = tops[i + 1];
        const p = next === undefined ? 0 : Math.min(1, Math.max(0, (y - (next - vh)) / vh));
        sec.style.setProperty('--peel', p.toFixed(3));
      });

      let idx = 0;
      tops.forEach((t, i) => {
        if (y + vh / 2 >= t) idx = i;
      });
      setActive(idx);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
    };
  }, [mainRef]);

  const goTo = useCallback((index: number) => {
    window.scrollTo({
      top: topsRef.current[index] ?? 0,
      behavior: matchMedia(MOTION_OK).matches ? 'smooth' : 'auto',
    });
  }, []);

  return { active, labels, goTo };
}
