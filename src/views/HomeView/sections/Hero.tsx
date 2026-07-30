"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { HeroScene } from "@/components/shared/Scene3D/HeroScene/HeroScene";
import { useLenis } from "@/hooks/useLenis";

const HERO_BACKGROUND =
  "radial-gradient(ellipse 85% 65% at 50% 50%, #1d52ce 0%, #173faa 35%, #0c1e4c 65%, #040916 100%)";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-hero-item]",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.15 }
      );
    },
    { scope: heroRef }
  );

  const scrollToDemo = () => {
    const target = document.querySelector("#demo");
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -24, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden px-4 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44"
      style={{ background: HERO_BACKGROUND }}
    >
      {/* 3D background geometry canvas */}
      <HeroScene sectionRef={heroRef} />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
        <span
          data-hero-item
          className="block text-xs font-mono font-medium uppercase tracking-[0.25em] text-[#9ca3af] mb-6"
        >
          PAYGATE AI SUITE
        </span>

        <h1 className="text-5xl font-normal tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[84px] leading-[1.08]">
          <span data-hero-item className="block font-normal">
            Next-gen payment
          </span>
          <span data-hero-item className="block font-extrabold mt-1.5">
            infrastructure.
          </span>
        </h1>

        <div data-hero-item className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={scrollToDemo}
            className="rounded-full bg-[#4F86F7] px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-blue-500/30 transition-colors hover:bg-[#3b7be6]"
          >
            See Platform
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={scrollToDemo}
            className="rounded-full border border-white/15 bg-[#18181b] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#27272a]"
          >
            Book a Consultant
          </motion.button>
        </div>
      </div>
    </section>
  );
}
