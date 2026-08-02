import { SectionIndex } from "@/components/ui/SectionIndex";
import { SpotlightCard } from "@/components/shared/SpotlightCard";
import { ProvenanceBadge } from "@/components/ui/ProvenanceBadge";
import { RevealText } from "@/components/shared/RevealText";
import { MiniGlassNodes } from "@/components/shared/MiniGlassNodes";
import type { PillarContent } from "@/types/content";
import { cn } from "@/lib/utils";

export function PillarBlock({ pillar }: { pillar: PillarContent }) {
  const Icon = pillar.icon;
  const showMiniNodes = pillar.id === "scalable" || pillar.id === "secure";

  return (
    <div id={pillar.id} className="relative scroll-mt-32 py-16 md:py-24">
      <SectionIndex number={pillar.index} className="pointer-events-none absolute -top-8 left-0 -z-10 md:-top-14" />

      <RevealText as="div">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-blue-tag-bg)] text-[var(--color-blue-primary)]">
            <Icon size={20} />
          </span>
          <h3 className="text-3xl font-semibold tracking-tight text-[var(--color-gray-900)] md:text-4xl">
            {pillar.question}
          </h3>
        </div>
        <p className="mt-5 max-w-2xl text-lg font-medium text-[var(--color-gray-900)]">{pillar.summary}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <p className="max-w-xl text-[var(--color-gray-500)]">{pillar.body}</p>
          {pillar.id === "secure" && <ProvenanceBadge source="Nafath" />}
        </div>
      </RevealText>

      <div className="mt-10 flex flex-wrap gap-6">
        {pillar.details.map((detail, i) => (
          <RevealText
            as="div"
            key={detail.title}
            delay={i * 0.08}
            x={i % 2 === 0 ? -32 : 32}
            y={0}
            className={cn("w-full sm:w-[calc(50%-0.75rem)]", i % 2 === 1 && "sm:mt-8")}
          >
            <SpotlightCard className="h-full p-8 shadow-[0_30px_80px_-40px_rgba(46,125,245,0.35)]">
              <span className="font-live text-xs font-semibold tracking-wide text-[var(--color-blue-primary)]">
                {(i + 1).toString().padStart(2, "0")} —
              </span>
              <h4 className="mt-2 text-base font-semibold tracking-tight text-[var(--color-gray-900)]">
                {detail.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-gray-500)]">
                {detail.description}
              </p>
              {pillar.id === "secure" && i === 0 && (
                <ProvenanceBadge source="Wathiq" className="mt-4" />
              )}
            </SpotlightCard>
          </RevealText>
        ))}
      </div>

      {showMiniNodes && <MiniGlassNodes className="mt-10" />}
    </div>
  );
}
