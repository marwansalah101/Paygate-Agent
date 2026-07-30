import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-black)] text-white hover:bg-[var(--color-navy-dark)] active:scale-[0.97]",
        secondary:
          "bg-white text-[var(--color-black)] border border-[var(--color-black)] hover:bg-[var(--color-gray-50)] active:scale-[0.97]",
        ghost:
          "bg-transparent text-[var(--color-gray-900)] hover:bg-[var(--color-gray-50)] active:scale-[0.97]",
        accent:
          "bg-[var(--color-blue-primary)] text-white hover:brightness-110 active:scale-[0.97]",
        outline:
          "bg-white/5 text-white border border-white/25 hover:bg-white/10 active:scale-[0.97]",
        "hero-light":
          "bg-[var(--color-hero-cta-light)] text-[var(--color-hero-cta-light-text)] hover:brightness-105 active:scale-[0.97]",
        "header-cta":
          "bg-[var(--color-header-cta-bg)] text-[var(--color-header-cta-text)] hover:brightness-105 active:scale-[0.97]",
        // No active:scale here — this variant is meant to be wrapped in a
        // motion.div with whileHover/whileTap, which owns the press feedback.
        "hero-cta":
          "bg-[var(--color-blue-primary)] text-white shadow-[0_10px_40px_-8px_var(--color-blue-primary)] hover:brightness-110 hover:shadow-[0_14px_50px_-6px_var(--color-blue-primary)]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
