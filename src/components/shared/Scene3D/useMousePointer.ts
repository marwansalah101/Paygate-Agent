"use client";

import { useEffect, useRef } from "react";

/**
 * Normalized (-1..1) window-level pointer position, in a ref.
 *
 * Cannot use R3F's built-in useThree().pointer here: the canvas wrappers
 * must have pointer-events:none (they sit behind page content), which
 * suppresses canvas-targeted pointer events entirely.
 *
 * Shared by GlobalScene and HeroScene — both need the same window-level
 * signal, so it lives one level up from either.
 */
export function useMousePointer(enabled: boolean) {
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: PointerEvent) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [enabled]);

  return pointerRef;
}
