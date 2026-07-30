import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Tag({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-[var(--color-blue-tag-bg)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-blue-tag-text)]",
        className
      )}
      {...props}
    />
  );
}
