"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeroCopy, heroPad } from "@/components/platform/hero-copy";
import { Crumbs } from "@/components/documents/doc-heroes";
import { GlossIcon } from "@/components/platform/gloss-icon";
import {
  BankIcon,
  DocStackIcon,
  PortalIcon,
  QuoteIcon,
  UserCheckIcon,
  type AnyIcon,
} from "@/components/platform/icons";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const icons: { icon: AnyIcon; tint: string }[] = [
  { icon: UserCheckIcon, tint: "#1d5fd6" },
  { icon: PortalIcon, tint: "#0f9a8a" },
  { icon: BankIcon, tint: "#0a3a7a" },
  { icon: QuoteIcon, tint: "#e8684a" },
  { icon: DocStackIcon, tint: "#2f8fd0" },
];

export function HowHero({
  steps,
}: {
  steps: { title: string; text: string }[];
}) {
  const [a, setA] = useState(0);
  const n = steps.length;
  useEffect(() => {
    const t = setInterval(() => setA((v) => (v + 1) % n), 2600);
    return () => clearInterval(t);
  }, [n]);

  return (
    <section className="relative overflow-hidden bg-brand-paper">
      <div
        className="grid-lines-light absolute inset-0 opacity-60"
        aria-hidden
      />
      <div
        className="aurora-blob -left-24 top-10 h-96 w-96 bg-brand-sky/20"
        aria-hidden
      />
      <div
        className="aurora-blob -right-24 bottom-0 h-96 w-96 bg-[#FA7F63]/20"
        aria-hidden
      />
      <div
        className={cn(
          "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          heroPad,
        )}
      >
        <Crumbs items={[{ label: "How it works" }]} />
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <HeroCopy
            eyebrow="How it works"
            title={
              <>
                From sign-up to quotation,{" "}
                <span className="gradient-text">step by step.</span>
              </>
            }
            text="Register, manage trades, apply for finance, compare lender quotations and generate documents, all in one workspace."
            primary={{ label: "Create account", href: "/signup" }}
            secondary={{ label: "View pricing", href: "/pricing" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="rounded-[2rem] border border-white bg-white/85 p-5 shadow-lift backdrop-blur sm:p-8"
          >
            <div className="relative">
              <span
                className="absolute left-7 right-7 top-7 h-0.5 rounded-full bg-brand-line"
                aria-hidden
              />
              <motion.span
                aria-hidden
                className="absolute left-7 top-7 h-0.5 origin-left rounded-full bg-gradient-to-r from-[#022350] to-[#FA7F63]"
                style={{ right: "1.75rem" }}
                animate={{ scaleX: a / (n - 1) }}
                transition={{ duration: 0.8, ease }}
              />
              <ol className="relative flex justify-between">
                {steps.map((s, i) => {
                  const on = i === a;
                  const done = i < a;
                  const { icon, tint } = icons[i % icons.length];
                  return (
                    <li
                      key={s.title}
                      className="flex w-14 flex-col items-center gap-2 sm:w-20"
                    >
                      <motion.div
                        animate={{ scale: on ? 1.18 : 1, y: on ? -4 : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className={cn(
                          "rounded-[18px] bg-white p-1 transition-shadow",
                          on && "shadow-glow-coral",
                        )}
                      >
                        <GlossIcon
                          icon={icon}
                          tint={tint}
                          size="lg"
                          className={cn(!on && !done && "opacity-60")}
                        />
                      </motion.div>
                      <span
                        className={cn(
                          "hidden text-center text-[11px] font-semibold leading-tight sm:block",
                          on ? "text-brand-ink" : "text-brand-slate",
                        )}
                      >
                        {s.title}
                      </span>
                      <span
                        className={cn(
                          "font-mono text-[10px] sm:hidden",
                          on ? "text-[#C9482A]" : "text-brand-slate",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="mt-8 min-h-[6.5rem] rounded-2xl bg-brand-paper p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={a}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#C9482A]">
                    Step {a + 1} of {n}
                  </p>
                  <p className="mt-1 font-heading text-lg font-semibold text-brand-ink">
                    {steps[a].title}
                  </p>
                  <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-brand-slate">
                    {steps[a].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
