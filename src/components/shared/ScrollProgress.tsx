"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Slim wayfinding readout for a long, single-route scrolling page — bound
 * directly to scroll input, not an autonomous loop, so it stays functional
 * (not decorative) rather than a candidate for reduced-motion removal.
 * Reduced motion only drops the spring smoothing, keeping a literal readout.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const smoothed = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-[var(--color-blue-primary)]"
      style={{ scaleX: reducedMotion ? scrollYProgress : smoothed }}
    />
  );
}
