import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function GlowCard({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[var(--color-gray-200)] bg-white p-8 shadow-[0_30px_80px_-40px_rgba(46,125,245,0.35)]",
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-blue-tag-bg) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
