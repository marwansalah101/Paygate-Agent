import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function TextArea({ className, error, ...props }: TextAreaProps) {
  return (
    <textarea
      className={cn(
        "w-full resize-none rounded-lg border bg-white px-4 py-3 text-sm text-[var(--color-gray-900)] outline-none transition-colors duration-200 placeholder:text-[var(--color-gray-500)]/70",
        "focus:border-[var(--color-blue-primary)] focus:ring-2 focus:ring-[var(--color-blue-primary)]/20",
        error ? "border-red-400" : "border-[var(--color-gray-200)]",
        className
      )}
      aria-invalid={!!error}
      {...props}
    />
  );
}
