"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Cta = { label: string; href: string };

const ease = [0.16, 1, 0.3, 1] as const;


export function HeroCopy({
  eyebrow,
  title,
  text,
  primary,
  secondary,
  dark = false,
  center = false,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text: string;
  primary?: Cta;
  secondary?: Cta;
  dark?: boolean;
  center?: boolean;
  className?: string;
}) {
  const up = (d: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: d, ease },
  });
  return (
    <div className={cn(center && "mx-auto text-center", className)}>
      <motion.span
        {...up(0)}
        className={cn(
          "eyebrow",
          center && "justify-center",
          dark && "!text-[#FDB9A8]",
        )}
      >
        {eyebrow}
      </motion.span>
      <motion.h1
        {...up(0.08)}
        className={cn(
          "mt-4 text-display-sm font-semibold",
          dark ? "text-white" : "text-brand-ink",
        )}
      >
        {title}
      </motion.h1>
      <motion.p
        {...up(0.18)}
        className={cn(
          "mt-5 max-w-xl text-base leading-relaxed sm:text-lg",
          center && "mx-auto",
          dark ? "text-white/70" : "text-brand-slate",
        )}
      >
        {text}
      </motion.p>
      {(primary || secondary) && (
        <motion.div
          {...up(0.28)}
          className={cn("mt-8 flex flex-wrap gap-3", center && "justify-center")}
        >
          {primary && (
            <Link
              href={primary.href}
              className={cn(
                "btn btn-lg",
                dark
                  ? "bg-[#FA7F63] text-[#022350] shadow-glow-coral hover:-translate-y-0.5 hover:bg-[#ff9279]"
                  : "btn-primary",
              )}
            >
              {primary.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          {secondary && (
            <Link
              href={secondary.href}
              className={cn(
                "btn btn-lg",
                dark
                  ? "border border-white/25 text-white hover:bg-white/10"
                  : "btn-secondary",
              )}
            >
              {secondary.label}
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}

export const heroPad = "pb-16 pt-28 sm:pb-24 sm:pt-36";
