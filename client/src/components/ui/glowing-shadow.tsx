import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlowingShadow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("gs-wrapper", className)}>
      {children}
    </div>
  );
}
