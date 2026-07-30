import { cn } from "@/lib/utils";

export function SectionIndex({
  number,
  className,
  tone = "light",
}: {
  number: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none select-none font-mono text-[18vw] leading-none font-bold md:text-[10vw]",
        tone === "light" ? "text-[var(--color-gray-900)]/[0.04]" : "text-white/[0.06]",
        className
      )}
    >
      {number}
    </span>
  );
}
