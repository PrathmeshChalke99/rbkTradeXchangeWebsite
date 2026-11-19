"use client";

import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card shell with a cursor-following spotlight and a lifting hover.
 * Children are rendered by the server, so icons can be passed in freely.
 */
export function Spot({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onMouseMove={move}
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border transition duration-300 ease-out-expo hover:-translate-y-1",
        dark
          ? "border-white/10 bg-white/[0.04] hover:border-[#FA7F63]/50 hover:bg-white/[0.07]"
          : "border-brand-line bg-white shadow-soft hover:border-brand-accent/50 hover:shadow-lift",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: dark
            ? "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(250,127,99,0.16), transparent 60%)"
            : "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(250,127,99,0.14), transparent 60%)",
        }}
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#FA7F63] to-brand-sky transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
      />
      {children}
    </div>
  );
}
