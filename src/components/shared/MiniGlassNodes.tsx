import { heroApiNodes } from "@/constants/hero";
import { cn } from "@/lib/utils";

/**
 * Small, lightweight recurrence of the hero's glass-node motif (pale-blue
 * tile + institution name + connecting pulse) — rearranged as a flat inline
 * row rather than re-modeled as a second 3D canvas, per the brief's "running
 * visual signature, not a one-off hero trick" note.
 */
export function MiniGlassNodes({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative flex flex-wrap items-center gap-3 py-2", className)}>
      <svg className="pointer-events-none absolute inset-x-2 top-1/2 h-px w-[calc(100%-1rem)] -translate-y-1/2" preserveAspectRatio="none">
        <line
          x1="0"
          y1="0.5"
          x2="100%"
          y2="0.5"
          stroke="var(--color-blue-primary)"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
      </svg>
      {heroApiNodes.map((label, i) => (
        <span
          key={label}
          className="font-live relative z-10 rounded-full border border-[var(--color-blue-primary)]/25 bg-[var(--color-blue-tag-bg)]/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-blue-tag-text)]"
          style={{ animation: `pulse-glow 2.4s ease-in-out ${i * 0.3}s infinite` }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
