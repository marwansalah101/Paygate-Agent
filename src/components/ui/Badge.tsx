import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-gray-200)] bg-white px-3 py-1 text-xs font-medium text-[var(--color-gray-500)]",
        className
      )}
      {...props}
    />
  );
}
