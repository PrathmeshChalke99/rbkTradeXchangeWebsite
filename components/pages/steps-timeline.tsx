'use client';
import { motion } from 'framer-motion';
import { tradeWorkflowSteps } from '@/lib/site-config';
import { Icon } from './icon';

const ease = [0.16, 1, 0.3, 1] as const;

/** Five-step journey: horizontal timeline on desktop, vertical on mobile. */
export function StepsTimeline() {
  return (
    <ol className="relative grid gap-4 lg:grid-cols-5 lg:gap-5">
      <motion.span
        aria-hidden
        className="absolute left-[10%] right-[10%] top-[27px] hidden h-px origin-left bg-gradient-to-r from-brand-blue via-brand-sky to-brand-turquoise lg:block"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.6, ease }}
      />
      <span aria-hidden className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-brand-blue via-brand-sky to-brand-turquoise lg:hidden" />
      {tradeWorkflowSteps.map((s, i) => (
        <motion.li
          key={s.id}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease }}
          className="relative flex gap-4 lg:block"
        >
          <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand-line bg-white shadow-soft lg:mx-auto">
            <Icon name={s.icon} className="h-6 w-6" style={{ color: s.color }} />
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-navy px-1 font-mono text-[10px] font-medium text-white">{s.id}</span>
          </div>
          <div className="card card-hover flex-1 p-4 lg:mt-5 lg:text-center">
            <h3 className="text-[15px] font-semibold text-brand-ink">{s.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-brand-slate">{s.description}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
