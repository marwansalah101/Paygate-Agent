"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function RevealText({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  x = 0,
  y = 28,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, x, y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    },
    { scope: ref, dependencies: [delay, x, y] }
  );

  return createElement(Tag, { ref, className }, children);
}
