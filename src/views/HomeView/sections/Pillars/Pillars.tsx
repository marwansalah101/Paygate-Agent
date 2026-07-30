import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { RevealText } from "@/components/shared/RevealText";
import { pillars } from "@/constants/pillars";
import { PillarNav } from "./PillarNav";
import { PillarBlock } from "./PillarBlock";

export function Pillars() {
  return (
    <section id="pillars" className="relative bg-[var(--color-gray-50)]/88 px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <RevealText as="div">
          <EyebrowLabel>The Platform</EyebrowLabel>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-[var(--color-gray-900)] md:text-5xl">
            Four questions, <span className="text-[var(--color-blue-primary)]">one architecture.</span>
          </h2>
        </RevealText>

        <PillarNav />

        <div className="divide-y divide-[var(--color-gray-200)]">
          {pillars.map((pillar) => (
            <PillarBlock key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}
