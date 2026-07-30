import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { RevealText } from "@/components/shared/RevealText";
import { trustBadges } from "@/constants/trust";
import { cn } from "@/lib/utils";

export function TrustStrip() {
  const loop = [...trustBadges, ...trustBadges];

  return (
    <section id="trust" className="relative overflow-hidden border-y border-[var(--color-gray-200)] bg-white/88 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <RevealText as="div">
          <EyebrowLabel>Verified Against</EyebrowLabel>
        </RevealText>
      </div>

      <div className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((badge, i) => (
            <span
              key={`${badge.name}-${i}`}
              className={cn(
                "font-live shrink-0 text-lg font-semibold tracking-tight md:text-xl",
                badge.kind === "institution" ? "text-[var(--color-gray-900)]" : "text-[var(--color-gray-500)]"
              )}
            >
              {badge.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
