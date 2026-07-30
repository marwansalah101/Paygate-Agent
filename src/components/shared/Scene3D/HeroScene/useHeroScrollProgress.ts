"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * 0 while the hero is fully in view, ramping to 1 as it scrolls out of the
 * viewport — drives the background triangles' scroll-exit drift in
 * HeroIdleRig. Same window.scrollY + clamp approach as useHeroHandoff (a
 * ref, not state, since it's read every frame inside useFrame), kept as its
 * own hook because it's keyed to the hero section's own height rather than
 * a fixed viewport-height threshold.
 */
export function useHeroScrollProgress(sectionRef: RefObject<HTMLElement | null>) {
  const progressRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const end = section.offsetHeight * 0.9;
      const progress = window.scrollY / (end || 1);
      progressRef.current = Math.min(1, Math.max(0, progress));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionRef]);

  return progressRef;
}
