"use client";

import { motion } from "motion/react";
import { pillars } from "@/constants/pillars";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useLenis } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

export function PillarNav() {
  const activeId = useScrollSpy(pillars.map((p) => p.id));
  const lenis = useLenis();

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -96, duration: 1 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-20 z-20 mb-4 flex justify-center md:top-24">
      <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-[var(--color-gray-200)] bg-white/90 p-1.5 shadow-[0_8px_30px_-16px_rgba(17,19,24,0.2)] backdrop-blur-xl">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const isActive = activeId === pillar.id;
          return (
            <button
              key={pillar.id}
              onClick={() => scrollTo(pillar.id)}
              className={cn(
                "relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors duration-200",
                isActive
                  ? "text-[var(--color-blue-primary)]"
                  : "text-[var(--color-gray-500)] hover:text-[var(--color-gray-900)]"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="pillar-nav-pill"
                  className="absolute inset-0 rounded-full bg-[var(--color-blue-tag-bg)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon size={14} className="relative z-10" />
              <span className="relative z-10">{pillar.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
