"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { RevealText } from "@/components/shared/RevealText";
import { engagementStages } from "@/constants/engagement";

gsap.registerPlugin(ScrollTrigger);

export function Engagement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!lineRef.current || !sectionRef.current) return;
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section id="engagement" ref={sectionRef} className="relative bg-white/88 px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <RevealText as="div">
          <EyebrowLabel>The Engagement Model</EyebrowLabel>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-[var(--color-gray-900)] md:text-5xl">
            From first conversation to <span className="text-[var(--color-blue-primary)]">full funnel.</span>
          </h2>
        </RevealText>

        <div className="relative mt-16 pl-10 md:pl-14">
          <div className="absolute left-2 top-1 h-full w-px bg-[var(--color-gray-200)] md:left-3" />
          <div ref={lineRef} className="absolute left-2 top-1 h-full w-px bg-[var(--color-blue-primary)] md:left-3" />

          <div className="flex flex-col gap-16">
            {engagementStages.map((stage, i) => (
              <RevealText as="div" key={stage.index} delay={i * 0.1} className="relative">
                <SectionIndex
                  number={stage.index}
                  className="pointer-events-none absolute -left-10 -top-10 -z-10 md:-left-14"
                />
                <span className="absolute -left-10 top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--color-blue-primary)] bg-white text-[10px] font-bold text-[var(--color-blue-primary)] md:-left-14">
                  {stage.index}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-gray-900)]">
                  {stage.title}
                </h3>
                <p className="mt-2 max-w-xl text-[var(--color-gray-500)]">{stage.tagline}</p>
                <dl className="mt-5 flex flex-col gap-2.5">
                  {stage.details.map((detail) => (
                    <div key={detail.label} className="flex flex-wrap gap-x-2 text-sm">
                      <dt className="font-semibold text-[var(--color-gray-900)]">{detail.label}:</dt>
                      <dd className="text-[var(--color-gray-500)]">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </RevealText>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
