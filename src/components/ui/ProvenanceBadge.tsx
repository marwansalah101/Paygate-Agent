import { Database } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProvenanceBadge({
  source,
  className,
}: {
  source: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md bg-[var(--color-blue-tag-bg)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-blue-tag-text)]",
        className
      )}
    >
      <Database size={11} className="shrink-0" />
      <span className="font-live normal-case tracking-normal">Source: {source}</span>
    </span>
  );
}
