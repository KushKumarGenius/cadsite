"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function ContentCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[color:var(--border)] bg-[var(--card)] p-6 shadow-[0_1px_2px_rgb(74_21_21/0.04)] transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-[color:var(--brand-coral-muted)] hover:shadow-[0_8px_28px_rgb(143_45_45/0.1)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
