'use client';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

/** Compact numbered process row with a connecting line that draws in on scroll. */
export function NumberedSteps({ steps, color = '#1d5fd6', cols = 4 }: { steps: string[]; color?: string; cols?: 3 | 4 | 5 }) {
  const grid = cols === 5 ? 'md:grid-cols-5' : cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4';
  return (
    <ol className={`relative grid gap-3 ${grid} md:gap-4`}>
      <motion.span aria-hidden className="absolute left-6 right-6 top-6 hidden h-px origin-left md:block" style={{ background: `linear-gradient(90deg, ${color}, ${color}22)` }}
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} />
      {steps.map((t, i) => (
        <motion.li key={t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease }}
          className="relative flex items-start gap-4 md:block">
          <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-line bg-white font-mono text-sm font-semibold shadow-soft" style={{ color }}>{String(i + 1).padStart(2, '0')}</span>
          <p className="pt-3 text-[15px] font-medium leading-snug text-brand-ink md:pt-4 md:pr-4">{t}</p>
        </motion.li>
      ))}
    </ol>
  );
}
