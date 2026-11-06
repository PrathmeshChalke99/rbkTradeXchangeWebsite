'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;
const item = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };

/** Heading for the interactive section components; visually identical to `Heading` in components/pages/section. */
export function SectionHeading({ eyebrow, title, description, className, align = 'center' }: {
  eyebrow?: string; title: React.ReactNode; description?: string; className?: string; align?: 'center' | 'left';
}) {
  return (
    <motion.div
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={cn('max-w-2xl', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}
    >
      {eyebrow && <motion.span variants={item} className={cn('eyebrow mb-3', align === 'center' && 'justify-center')}>{eyebrow}</motion.span>}
      <motion.h2 variants={item} className="text-h2 font-semibold text-brand-ink">{title}</motion.h2>
      {description && <motion.p variants={item} className="mt-3 text-base leading-relaxed text-brand-slate sm:text-[1.05rem]">{description}</motion.p>}
    </motion.div>
  );
}
