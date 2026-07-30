"use client";

import { useEffect, useRef } from "react";

/**
 * 0 while the hero owns the first viewport, ramping to 1 once it has
 * scrolled away — the handoff between HeroScene (hero-local, its own two
 * cards) and GlobalScene (site-wide centerpiece).
 *
 * Without it both scenes would draw a card over the hero at once. A ref,
 * not state, because it's read every frame inside useFrame.
 */
export function useHeroHandoff() {
  const handoffRef = useRef(0);

  useEffect(() => {
    const update = () => {
      // Deliberately late. The hero's own geometry and dashboard mockup
      // are still on screen through most of the first viewport, so
      // ramping from scroll zero would put the hero's visuals and
      // GlobalScene's card centerpiece on screen at once, competing.
      // This starts once the hero is nearly gone and completes as the
      // next section arrives.
      const start = window.innerHeight * 0.8;
      const end = window.innerHeight * 1.25;
      const progress = (window.scrollY - start) / (end - start);
      handoffRef.current = Math.min(1, Math.max(0, progress));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return handoffRef;
}
