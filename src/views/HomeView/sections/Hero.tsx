"use client";

import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { HeroScene } from "@/components/shared/Scene3D/HeroScene/HeroScene";
import { useLenis } from "@/hooks/useLenis";

const HERO_BACKGROUND =
  "radial-gradient(ellipse 85% 65% at 50% 50%, #1d52ce 0%, #173faa 35%, #0c1e4c 65%, #040916 100%)";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const springTransition = { type: "spring", stiffness: 100, damping: 18, mass: 0.8 } as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: springTransition },
};

// Headline lines enter from opposite sides instead of the shared vertical rise.
const itemVariantsLeft: Variants = {
  hidden: { opacity: 0, x: -56, y: 0 },
  visible: { opacity: 1, x: 0, y: 0, transition: springTransition },
};

const itemVariantsRight: Variants = {
  hidden: { opacity: 0, x: 56, y: 0 },
  visible: { opacity: 1, x: 0, y: 0, transition: springTransition },
};

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

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
      className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden px-5 py-28 sm:px-6 md:px-8 md:pb-28 md:pt-44"
      style={{ background: HERO_BACKGROUND }}
    >
      {/* 3D background geometry canvas */}
      <HeroScene sectionRef={heroRef} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center px-2 sm:px-0"
      >
        <motion.span
          variants={itemVariants}
          className="block text-[11px] sm:text-xs font-mono font-medium uppercase tracking-[0.22em] sm:tracking-[0.25em] text-[#9ca3af] mb-4 sm:mb-6"
        >
          PAYGATE AI SUITE
        </motion.span>

        <h1 className="text-4xl min-[400px]:text-[42px] sm:text-6xl md:text-7xl lg:text-[84px] font-normal tracking-tight text-white leading-[1.12] sm:leading-[1.08]">
          <motion.span variants={itemVariantsLeft} className="block font-normal">
            Next-gen payment
          </motion.span>
          <motion.span variants={itemVariantsRight} className="block font-extrabold mt-1 sm:mt-1.5">
            infrastructure.
          </motion.span>
        </h1>

        <motion.div
          variants={itemVariants}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto"
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -15px rgba(79, 134, 247, 0.5)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={scrollToDemo}
            className="w-full sm:w-auto rounded-full bg-[#4F86F7] px-7 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-xl shadow-blue-500/30 transition-colors hover:bg-[#3b7be6] text-center cursor-pointer"
          >
            See Platform
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.4)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={scrollToDemo}
            className="w-full sm:w-auto rounded-full border border-white/15 bg-[#18181b] px-7 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-white transition-all hover:bg-[#27272a] text-center cursor-pointer"
          >
            Book a Consultant
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
