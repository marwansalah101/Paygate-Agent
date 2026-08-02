"use client";

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisContext } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  // The browser's native scroll restoration fights with Lenis's own scroll
  // state across reloads — GSAP's ScrollTrigger then reads whatever position
  // got restored and renders every pinned animation already mid-progress.
  // Take manual control before Lenis/ScrollTrigger ever look at scroll position.
  useLayoutEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    // Ultra-smooth Awwwards exponential easing curve & tuned physics.
    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    instance.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      // Lenis.raf accepts elapsed time in milliseconds
      instance.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    return () => {
      gsap.ticker.remove(onTick);
      instance.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
