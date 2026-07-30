"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Counter({
  from,
  to,
  duration = 1.6,
  format = (n: number) => Math.round(n).toString(),
  className,
}: {
  from: number;
  to: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(format(from));

  useGSAP(
    () => {
      if (!ref.current) return;
      const proxy = { value: from };

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(proxy, {
            value: to,
            duration,
            ease: "power2.out",
            onUpdate: () => setDisplay(format(proxy.value)),
          });
        },
      });
    },
    { scope: ref, dependencies: [from, to, duration] }
  );

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
