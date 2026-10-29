'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = 'center',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  align?: 'center' | 'left';
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <motion.span
          variants={fadeInUp}
          className="inline-block rounded-full bg-brand-paleblue/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue mb-4"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeInUp}
        className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-ink"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeInUp}
          className={cn(
            'mt-4 text-lg text-brand-slate leading-relaxed',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}