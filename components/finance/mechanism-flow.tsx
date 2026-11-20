"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Steps joined by a line that draws itself as the section scrolls into view.
 * Four columns on desktop, a stacked list with a vertical line on mobile.
 */
export function MechanismFlow({
  steps,
  accent = "#022350",
}: {
  steps: string[];
  accent?: string;
}) {
  const n = steps.length;
  return (
    <div className="relative">
      {}
      <motion.span
        aria-hidden
        className="absolute left-6 right-6 top-6 hidden h-0.5 origin-left rounded-full lg:block"
        style={{ background: `linear-gradient(90deg, ${accent}, #FA7F63)` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.5, ease }}
      />
      {}
      <motion.span
        aria-hidden
        className="absolute bottom-6 left-6 top-6 w-0.5 origin-top rounded-full lg:hidden"
        style={{ background: `linear-gradient(180deg, ${accent}, #FA7F63)` }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.5, ease }}
      />
      <ol
        className={`relative grid gap-8 lg:gap-6 ${n === 5 ? "lg:grid-cols-5" : n === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
      >
        {steps.map((s, i) => (
          <motion.li
            key={s}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.14, ease }}
            className="relative flex gap-4 lg:flex-col lg:gap-5"
          >
            <span
              className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-white font-mono text-sm font-semibold shadow-soft"
              style={{ borderColor: accent, color: accent }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="pt-2 text-[15px] font-medium leading-relaxed text-brand-ink lg:pt-0">
              {s}
            </p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
