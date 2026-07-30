"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { RevealText } from "@/components/shared/RevealText";
import {
  compareApiNodes,
  compareLegacySteps,
  compareLegacyLabel,
  compareLegacyTimeDisplay,
  compareNewTimeDisplay,
} from "@/constants/compare";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const LEGACY_TOTAL_SECONDS = 15 * 60;
const NEW_TOTAL_SECONDS = 161; // 2:41, measured end-to-end on the working prototype
const LEGACY_DURATION = 2; // seconds of real time — the deliberately longer, "grinding" column
const API_DURATION = 0.6; // seconds of real time — resolves almost immediately

function formatMMSS(totalSeconds: number) {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem.toString().padStart(2, "0")}`;
}

export function Compare() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const legacyBarRef = useRef<HTMLDivElement>(null);
  const apiBarRef = useRef<HTMLDivElement>(null);
  const legacyClockRef = useRef<HTMLSpanElement>(null);
  const apiClockRef = useRef<HTMLSpanElement>(null);
  const [legacyCount, setLegacyCount] = useState(0);
  const [apiCount, setApiCount] = useState(0);
  const [newWayResolved, setNewWayResolved] = useState(false);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        setLegacyCount(compareLegacySteps.length);
        setApiCount(compareApiNodes.length);
        setNewWayResolved(true);
        legacyBarRef.current?.style.setProperty("transform", "scaleY(1)");
        apiBarRef.current?.style.setProperty("transform", "scaleY(1)");
        if (legacyClockRef.current) legacyClockRef.current.textContent = compareLegacyTimeDisplay;
        if (apiClockRef.current) apiClockRef.current.textContent = compareNewTimeDisplay;
        return;
      }

      const legacyRow = { count: 0 };
      const legacySeconds = { value: 0 };
      const apiRow = { count: 0 };
      const apiSeconds = { value: 0 };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(legacyRow, {
            count: compareLegacySteps.length,
            duration: LEGACY_DURATION,
            ease: "power1.inOut",
            snap: { count: 1 },
            onUpdate: () => {
              setLegacyCount((prev) => (prev === legacyRow.count ? prev : legacyRow.count));
              legacyBarRef.current?.style.setProperty(
                "transform",
                `scaleY(${legacyRow.count / compareLegacySteps.length})`
              );
            },
          });
          gsap.to(legacySeconds, {
            value: LEGACY_TOTAL_SECONDS,
            duration: LEGACY_DURATION,
            ease: "power1.inOut",
            onUpdate: () => {
              if (legacyClockRef.current) legacyClockRef.current.textContent = formatMMSS(legacySeconds.value);
            },
            onComplete: () => {
              if (legacyClockRef.current) legacyClockRef.current.textContent = compareLegacyTimeDisplay;
            },
          });
          gsap.to(apiRow, {
            count: compareApiNodes.length,
            duration: API_DURATION,
            ease: "power2.out",
            snap: { count: 1 },
            onUpdate: () => {
              setApiCount((prev) => (prev === apiRow.count ? prev : apiRow.count));
              apiBarRef.current?.style.setProperty("transform", `scaleY(${apiRow.count / compareApiNodes.length})`);
            },
          });
          gsap.to(apiSeconds, {
            value: NEW_TOTAL_SECONDS,
            duration: API_DURATION,
            ease: "power2.out",
            onUpdate: () => {
              if (apiClockRef.current) apiClockRef.current.textContent = formatMMSS(apiSeconds.value);
            },
            onComplete: () => {
              setNewWayResolved(true);
              if (apiClockRef.current) apiClockRef.current.textContent = compareNewTimeDisplay;
            },
          });
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section id="compare" ref={sectionRef} className="relative bg-white/88 px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-center">
        <RevealText as="div">
          <EyebrowLabel>The Old Way vs. PayGate</EyebrowLabel>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-[var(--color-gray-900)] md:text-5xl">
            25+ manual inputs, 10+ screens —{" "}
            <span className="text-[var(--color-blue-primary)]">or one CR number.</span>
          </h2>
        </RevealText>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Old way */}
          <div>
            <div className="flex items-center justify-between border-b border-[var(--color-gray-200)] pb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)]">
                Legacy onboarding
              </p>
              <span ref={legacyClockRef} className="font-live text-lg font-semibold text-[var(--color-gray-500)]">
                0:00
              </span>
            </div>
            <div className="relative mt-4 pl-4">
              <div className="absolute left-0 top-0 h-full w-[2px] rounded-full bg-[var(--color-gray-200)]" />
              <div
                ref={legacyBarRef}
                className="absolute left-0 top-0 h-full w-[2px] origin-top rounded-full bg-[var(--color-gray-500)]"
                style={{ transform: "scaleY(0)" }}
              />
              <div className="flex flex-col gap-2">
                {compareLegacySteps.map((step, i) => (
                  <div
                    key={step.label}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-all duration-300 ease-power2-out",
                      i < legacyCount
                        ? "border-[var(--color-gray-200)] bg-[var(--color-gray-50)] text-[var(--color-gray-900)] opacity-100"
                        : "border-transparent text-[var(--color-gray-500)]/40 opacity-40"
                    )}
                  >
                    <span className="font-live w-6 shrink-0 text-xs text-[var(--color-gray-500)]/50">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    {step.label}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-xs text-[var(--color-gray-500)]">{compareLegacyLabel}</p>
          </div>

          {/* New way */}
          <div>
            <div className="flex items-center justify-between border-b border-[var(--color-blue-primary)]/30 pb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-blue-primary)]">
                PayGate
              </p>
              <span
                ref={apiClockRef}
                className={cn(
                  "font-live text-lg font-semibold transition-colors duration-300 ease-power2-out",
                  newWayResolved ? "text-highlight" : "text-[var(--color-blue-primary)]"
                )}
                style={newWayResolved ? { color: "var(--color-navy-dark)" } : undefined}
              >
                0:00
              </span>
            </div>
            <div className="relative mt-4 pl-4">
              <div className="absolute left-0 top-0 h-full w-[2px] rounded-full bg-[var(--color-blue-primary)]/15" />
              <div
                ref={apiBarRef}
                className="absolute left-0 top-0 h-full w-[2px] origin-top rounded-full bg-[var(--color-blue-primary)]"
                style={{ transform: "scaleY(0)" }}
              />
              <div className="flex flex-col gap-3">
                {compareApiNodes.map((node, i) => (
                  <div
                    key={node.label}
                    className={cn(
                      "flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-semibold transition-all duration-200 ease-power2-out",
                      i < apiCount
                        ? "border-[var(--color-blue-primary)]/30 bg-[var(--color-blue-tag-bg)]/50 text-[var(--color-gray-900)]"
                        : "border-transparent text-[var(--color-gray-500)]/40 opacity-40"
                    )}
                  >
                    <span className="font-live">{node.label}</span>
                    {i < apiCount && <Check size={16} className="text-[var(--color-blue-primary)]" />}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-xs text-[var(--color-gray-500)]">
              Running in parallel, visible live on screen, while the profile panel fills itself.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
