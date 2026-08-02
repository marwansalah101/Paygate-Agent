"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useLenis } from "@/hooks/useLenis";

/**
 * 0 while the hero is fully in view, ramping to 1 as it scrolls out of the
 * viewport — drives the background triangles' scroll-exit drift in
 * HeroIdleRig. Driven directly off Lenis smooth scroll for frame-accurate sync.
 */
export function useHeroScrollProgress(sectionRef: RefObject<HTMLElement | null>) {
  const progressRef = useRef(0);
  const lenis = useLenis();

  useEffect(() => {
    const update = (scrollY: number) => {
      const section = sectionRef.current;
      if (!section) return;

      const end = section.offsetHeight * 0.9;
      const progress = scrollY / (end || 1);
      progressRef.current = Math.min(1, Math.max(0, progress));
    };

    if (lenis) {
      const handleScroll = (e: { scroll: number }) => update(e.scroll);
      update(lenis.scroll);
      lenis.on("scroll", handleScroll);
      return () => {
        lenis.off("scroll", handleScroll);
      };
    } else {
      const handleNative = () => update(window.scrollY);
      handleNative();
      window.addEventListener("scroll", handleNative, { passive: true });
      window.addEventListener("resize", handleNative, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleNative);
        window.removeEventListener("resize", handleNative);
      };
    }
  }, [sectionRef, lenis]);

  return progressRef;
}
