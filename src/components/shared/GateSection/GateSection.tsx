"use client";

import { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "motion/react";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { RevealText } from "@/components/shared/RevealText";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ONBOARDING_STEPS, type OnboardingStep } from "@/constants/onboardingSteps";
import { STEP_ILLUSTRATIONS } from "./StepIllustrations";

gsap.registerPlugin(ScrollTrigger);

// Gate starts off-white (matches the Engagement section above) and eases into the
// same dark charcoal the onboarding steps below live on, as the gate opens.
const INITIAL_BG_COLOR = "#F7F6F0";
const FINAL_BG_COLOR = "#1F1C1B";

const INITIAL_LINE_COLOR = "#27272A"; // High contrast dark slate gray for light bg (will stay visible on dark)
const FINAL_LINE_COLOR = "#FAFAFA"; // Luminous white line for dark bg

// Scroll px consumed per "timeline second" — the pin only covers the gate-open
// beats now, so this keeps their original pacing (~1 unit of animation).
const PX_PER_UNIT = 2400;

const NUM_PARTICLES = 50;

interface AshParticle {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  driftX: number;
  driftY: number;
  rotation: number;
  delay: number;
}

// Deterministic pseudo-random number generator for SSR & Hydration parity
function pseudoRandom(index: number, seed: number = 1): number {
  const value = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453123;
  return value - Math.floor(value);
}

function StepVisual({
  step,
  Illustration,
  imageFirst,
}: {
  step: OnboardingStep;
  Illustration: (typeof STEP_ILLUSTRATIONS)[number];
  imageFirst: boolean;
}) {
  const illustrationRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: illustrationRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-1 items-center justify-items-center gap-8 md:grid-cols-2 md:gap-16">
      {/* Illustration enters from the side it's already laid out on */}
      <RevealText as="div" x={imageFirst ? 56 : -56} y={0} className={cn(imageFirst ? "md:order-1" : "md:order-2")}>
        <motion.div ref={illustrationRef} style={{ y: reducedMotion ? 0 : y }}>
          <Illustration className="h-40 w-40 md:h-64 md:w-64" />
        </motion.div>
      </RevealText>

      {/* Text enters from the opposite side */}
      <RevealText
        as="div"
        x={imageFirst ? -56 : 56}
        y={0}
        delay={0.08}
        className={cn("max-w-md text-center md:text-left", imageFirst ? "md:order-2" : "md:order-1")}
      >
        <span className="font-mono text-sm font-bold tracking-wider text-[var(--color-paygate-blue)]">
          {step.number} —
        </span>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#FAFAFA] md:text-3xl">{step.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA] md:text-base">{step.desc}</p>
      </RevealText>
    </div>
  );
}

export function GateSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const gateCanvasRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Gate element refs
  const outerFrameRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const lockCapsuleRef = useRef<HTMLDivElement>(null);
  const lockDialRef = useRef<HTMLDivElement>(null);
  const lockTopNotchRef = useRef<HTMLDivElement>(null);
  const lockBottomNotchRef = useRef<HTMLDivElement>(null);
  const lockLeftLatchRef = useRef<HTMLDivElement>(null);
  const lockRightLatchRef = useRef<HTMLDivElement>(null);

  // Generate deterministic linear ash flecks (SSR & Client match 100%)
  const particles = useMemo<AshParticle[]>(() => {
    const list: AshParticle[] = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const isOuter = i < 20;
      const isLock = i >= 20 && i < 34;

      let x = 0;
      let y = 0;

      const rand1 = pseudoRandom(i, 1);
      const rand2 = pseudoRandom(i, 2);
      const rand3 = pseudoRandom(i, 3);
      const rand4 = pseudoRandom(i, 4);

      if (isLock) {
        x = 224 + rand1 * 32;
        y = 260 + rand2 * 140;
      } else if (isOuter) {
        const side = Math.floor(rand1 * 4);
        if (side === 0) {
          x = 16 + rand2 * 448;
          y = 16;
        } else if (side === 1) {
          x = 16 + rand2 * 448;
          y = 644;
        } else if (side === 2) {
          x = 16;
          y = 16 + rand2 * 628;
        } else {
          x = 464;
          y = 16 + rand2 * 628;
        }
      } else {
        x = 26 + rand1 * 428;
        y = 26 + rand2 * 608;
      }

      list.push({
        id: i,
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
        width: Number((rand3 * 2 + 1).toFixed(2)),
        height: Number((rand4 * 5 + 2).toFixed(2)),
        driftX: Number(((rand1 - 0.5) * 220).toFixed(2)),
        driftY: Number((-(rand2 * 180 + 40)).toFixed(2)),
        rotation: Number(((rand3 - 0.5) * 180).toFixed(2)),
        delay: Number((rand4 * 0.1).toFixed(3)),
      });
    }
    return list;
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || !cameraRef.current || !stageRef.current) return;

      // The wireframe's own box is a fixed 480x660px — a CSS `scale()` transform
      // never changes how much space that reserves in the flex layout, so picking
      // a scale without checking the *actual* available space risks the gate
      // overlapping the header on shorter viewports than we happened to test on.
      // Measure the real stage and size the gate to fit inside it, with margin.
      const isDesktop = window.innerWidth >= 768;
      const stageRect = stageRef.current.getBoundingClientRect();
      const maxScaleByHeight = (stageRect.height * 0.92) / 660;
      const maxScaleByWidth = (stageRect.width * 0.92) / 480;
      const scaleCap = isDesktop ? 0.85 : 0.62;
      const cameraScaleFinal = Math.max(0.3, Math.min(maxScaleByHeight, maxScaleByWidth, scaleCap));
      const cameraScaleMid = cameraScaleFinal * 0.78;
      const cameraScaleBase = cameraScaleFinal * 0.7;

      const allGateLineElements = [
        outerFrameRef.current,
        leftDoorRef.current,
        ...(leftDoorRef.current ? Array.from(leftDoorRef.current.querySelectorAll("div")) : []),
        rightDoorRef.current,
        ...(rightDoorRef.current ? Array.from(rightDoorRef.current.querySelectorAll("div")) : []),
        lockCapsuleRef.current,
        lockDialRef.current,
        lockTopNotchRef.current,
        lockBottomNotchRef.current,
        lockLeftLatchRef.current,
        lockRightLatchRef.current,
      ].filter(Boolean);

      const lockElements = [
        lockCapsuleRef.current,
        lockDialRef.current,
        lockTopNotchRef.current,
        lockBottomNotchRef.current,
        lockLeftLatchRef.current,
        lockRightLatchRef.current,
      ].filter(Boolean);

      // Pre‑render set – gate opens on the off-white section background above it
      gsap.set(cameraRef.current, { scale: cameraScaleBase, transformStyle: "preserve-3d" });
      gsap.set(sectionRef.current, { backgroundColor: INITIAL_BG_COLOR });
      gsap.set(allGateLineElements, {
        borderColor: INITIAL_LINE_COLOR,
        borderTopColor: INITIAL_LINE_COLOR,
        borderLeftColor: INITIAL_LINE_COLOR,
      });

      if (leftDoorRef.current) {
        gsap.set(leftDoorRef.current, { rotateY: 0, transformOrigin: "left center", transformStyle: "preserve-3d" });
      }
      if (rightDoorRef.current) {
        gsap.set(rightDoorRef.current, { rotateY: 0, transformOrigin: "right center", transformStyle: "preserve-3d" });
      }

      // Must start paused — this timeline is handed to ScrollTrigger below via
      // `animation:` rather than an inline `scrollTrigger:` config, so nothing
      // else stops it auto-playing in real time on creation.
      const tl = gsap.timeline({ paused: true });

      // Background eases from off-white to charcoal as the gate opens
      tl.to(sectionRef.current, { backgroundColor: FINAL_BG_COLOR, ease: "none", duration: 1 }, 0);

      // Wireframe line color transition dark slate -> luminous white
      tl.to(
        allGateLineElements,
        { borderColor: FINAL_LINE_COLOR, borderTopColor: FINAL_LINE_COLOR, borderLeftColor: FINAL_LINE_COLOR, ease: "none", duration: 1 },
        0
      );

      // Header text color shifts to keep contrast on dark background
      if (titleRef.current) {
        tl.to(titleRef.current, { color: "#FAFAFA", ease: "none", duration: 0.8 }, 0);
      }
      if (descRef.current) {
        tl.to(descRef.current, { color: "#E4E4E7", ease: "none", duration: 0.8 }, 0);
      }

      // ANIMATION SEQUENCING
      tl.to(cameraRef.current, { scale: cameraScaleMid, ease: "none", duration: 0.2 }, 0);

      if (lockDialRef.current) {
        tl.to(lockDialRef.current, { rotate: 90, duration: 0.15, ease: "power2.inOut" }, 0.2);
      }
      if (lockTopNotchRef.current) {
        tl.to(lockTopNotchRef.current, { y: -3, duration: 0.1, ease: "power2.out" }, 0.25);
      }
      if (lockBottomNotchRef.current) {
        tl.to(lockBottomNotchRef.current, { y: 3, duration: 0.1, ease: "power2.out" }, 0.25);
      }
      if (lockLeftLatchRef.current) {
        tl.to(lockLeftLatchRef.current, { x: 12, opacity: 0.4, duration: 0.15, ease: "power2.inOut" }, 0.3);
      }
      if (lockRightLatchRef.current) {
        tl.to(lockRightLatchRef.current, { x: -12, opacity: 0.4, duration: 0.15, ease: "power2.inOut" }, 0.3);
      }

      tl.to(lockElements, { opacity: 0, scale: 0.8, duration: 0.1, ease: "power1.out" }, 0.45);

      if (leftDoorRef.current) {
        tl.to(leftDoorRef.current, { rotateY: -100, duration: 0.28, ease: "power1.inOut" }, 0.45);
      }
      if (rightDoorRef.current) {
        tl.to(rightDoorRef.current, { rotateY: 100, duration: 0.28, ease: "power1.inOut" }, 0.45);
      }

      tl.to(cameraRef.current, { scale: cameraScaleFinal, duration: 0.28, ease: "power1.inOut" }, 0.45);

      if (gateCanvasRef.current) {
        tl.to(gateCanvasRef.current, { opacity: 0, scale: 0.9, duration: 0.15, ease: "power2.in" }, 0.70);
      }

      if (particlesRef.current) {
        const particleEls = Array.from(particlesRef.current.children);
        particleEls.forEach((el, idx) => {
          const p = particles[idx];
          if (!p) return;
          tl.fromTo(el, { opacity: 0, scale: 0.5, x: 0, y: 0, rotate: 0 }, { opacity: 1.0, scale: 1.0, duration: 0.05, ease: "power1.out" }, 0.68 + p.delay);
          tl.to(el, { x: p.driftX, y: p.driftY, rotate: p.rotation, opacity: 0, scale: 0.1, duration: 0.18, ease: "power2.out" }, 0.73 + p.delay);
        });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${Math.round(tl.duration() * PX_PER_UNIT)}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        animation: tl,
        invalidateOnRefresh: true,
      });
    },
    { scope: sectionRef, dependencies: [particles] }
  );

  return (
    <>
      {/* PINNED GATE — opening animation + "Verified Before Access" title, disabled per request.
      <section
        id="gate"
        ref={sectionRef}
        className="relative flex min-h-screen h-screen w-full flex-col items-center justify-between overflow-hidden bg-[#F7F6F0] px-6 select-none pt-20 pb-16"
        style={{ perspective: "1200px" }}
      >
        SECTION HEADER
        <div ref={headerRef} className="relative z-20 mx-auto max-w-3xl text-center shrink-0">
          <EyebrowLabel>▲ HOW IT WORKS</EyebrowLabel>
          <h2 ref={titleRef} className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-gray-900)] sm:text-4xl md:text-5xl">
            Verified Before Access
          </h2>
          <p ref={descRef} className="mt-3 max-w-xl mx-auto text-sm text-[var(--color-gray-500)] md:text-base leading-relaxed">
            Businesses verify themselves through trusted providers before using PayGate. Secure, instant clearance with complete auditability.
          </p>
        </div>

        GATE CENTER ILLUSTRATION
        <div ref={stageRef} className="relative flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden">
          <div ref={cameraRef} className="relative flex items-center justify-center w-full" style={{ transformStyle: "preserve-3d" }}>
            ASH FLECKS
            <div ref={particlesRef} className="pointer-events-none absolute z-20" style={{ width: "480px", height: "660px" }}>
              {particles.map((p) => (
                <div key={p.id} className="absolute bg-[#FAFAFA] opacity-0" style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }} />
              ))}
            </div>

            GATE VECTOR
            <div ref={gateCanvasRef} className="relative z-10" style={{ width: "480px", height: "660px", background: "transparent", transformStyle: "preserve-3d" }}>
              outer frame
              <div ref={outerFrameRef} className="gate-line" style={{ position: "absolute", left: "16px", top: "16px", right: "16px", bottom: "16px", border: `4px solid ${INITIAL_LINE_COLOR}`, borderRadius: "22px", boxSizing: "border-box" }} />
              left door
              <div ref={leftDoorRef} className="gate-door-left" style={{ position: "absolute", left: "26px", top: "26px", width: "184px", height: "608px", border: `2.5px solid ${INITIAL_LINE_COLOR}`, borderRadius: "14px 0 0 14px", boxSizing: "border-box", transformStyle: "preserve-3d" }} />
              right door
              <div ref={rightDoorRef} className="gate-door-right" style={{ position: "absolute", right: "26px", top: "26px", width: "184px", height: "608px", border: `2.5px solid ${INITIAL_LINE_COLOR}`, borderRadius: "0 14px 14px 0", boxSizing: "border-box", transformStyle: "preserve-3d" }} />
              central lock
              <div ref={lockCapsuleRef} style={{ position: "absolute", left: "224px", top: "260px", width: "32px", height: "140px", border: `2.5px solid ${INITIAL_LINE_COLOR}`, borderRadius: "16px", boxSizing: "border-box", background: "transparent" }} />
              <div ref={lockDialRef} style={{ position: "absolute", left: "230px", top: "320px", width: "20px", height: "20px", border: `1.5px solid ${INITIAL_LINE_COLOR}`, borderRadius: "50%", boxSizing: "border-box" }} />
              <div ref={lockTopNotchRef} style={{ position: "absolute", left: "234px", top: "256px", width: "12px", height: "5px", border: `1.5px solid ${INITIAL_LINE_COLOR}`, borderRadius: "2px", boxSizing: "border-box" }} />
              <div ref={lockBottomNotchRef} style={{ position: "absolute", left: "234px", top: "399px", width: "12px", height: "5px", border: `1.5px solid ${INITIAL_LINE_COLOR}`, borderRadius: "2px", boxSizing: "border-box" }} />
              <div ref={lockLeftLatchRef} style={{ position: "absolute", left: "210px", top: "327px", width: "14px", height: 0, borderTop: `1.5px solid ${INITIAL_LINE_COLOR}` }} />
              <div ref={lockRightLatchRef} style={{ position: "absolute", left: "256px", top: "327px", width: "14px", height: 0, borderTop: `1.5px solid ${INITIAL_LINE_COLOR}` }} />
            </div>
          </div>
        </div>
      </section>
      */}

      {/* ONBOARDING JOURNEY — regular document flow below the gate, smooth-scrolled by Lenis
          like the rest of the page. Not pinned; each step reveals once as it scrolls into view. */}
      <section className="relative w-full overflow-x-hidden bg-[#1F1C1B] px-6 py-28 md:py-40">
        <RevealText as="div" className="mx-auto max-w-3xl text-center">
          <EyebrowLabel className="text-[#FAFAFA]">Onboarding</EyebrowLabel>
          <h2 className="mt-5 text-5xl font-semibold tracking-tight text-[#FAFAFA] sm:text-6xl md:text-7xl">
            Your Journey Starts Here
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-base leading-relaxed text-[#A1A1AA] md:text-lg">
            PayGate automatically prepares everything so businesses can start accepting payments in minutes.
          </p>
        </RevealText>

        <div className="mx-auto mt-24 flex max-w-6xl flex-col gap-24 md:mt-32 md:gap-36">
          {ONBOARDING_STEPS.map((step, i) => (
            <StepVisual key={step.number} step={step} Illustration={STEP_ILLUSTRATIONS[i]} imageFirst={i % 2 === 1} />
          ))}
        </div>
      </section>
    </>
  );
}
