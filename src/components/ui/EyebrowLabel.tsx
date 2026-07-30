import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function EyebrowLabel({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("eyebrow", className)} {...props} />;
}
