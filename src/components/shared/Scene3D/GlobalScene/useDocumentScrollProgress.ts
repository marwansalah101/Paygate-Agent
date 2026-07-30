"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Whole-document scroll progress (0→1), continuous across every section —
 * never resets, unlike a section-scoped trigger. Returned as a ref (not
 * React state) since it's read 60x/sec inside useFrame.
 */
export function useDocumentScrollProgress() {
  const progressRef = useRef(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    // Whole-document end:"bottom bottom" is sensitive to late layout shifts
    // (web-font swap, image load) — one refresh after mount keeps it accurate.
    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      trigger.kill();
    };
  }, []);

  return progressRef;
}
