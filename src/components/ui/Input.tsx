import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border bg-white px-4 py-3 text-sm text-[var(--color-gray-900)] outline-none transition-colors duration-200 placeholder:text-[var(--color-gray-500)]/70",
        "focus:border-[var(--color-blue-primary)] focus:ring-2 focus:ring-[var(--color-blue-primary)]/20",
        error ? "border-red-400" : "border-[var(--color-gray-200)]",
        className
      )}
      aria-invalid={!!error}
      {...props}
    />
  );
}
