'use client';
import { motion, type Variants } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease } },
};

type Variant = 'up' | 'left' | 'right' | 'zoom' | 'tilt';
const from: Record<Variant, Record<string, number>> = {
  up: { y: 24 },
  left: { x: -36 },
  right: { x: 36 },
  zoom: { scale: 0.93 },
  tilt: { y: 30, rotateX: 10 },
};

/**
 * Fades and lifts content as it scrolls into view (once).
 * `variant` picks the entrance: up (default), left, right, zoom, or tilt (3D flip-up).
 * `x` is kept for older call sites (horizontal offset in px).
 */
export function Reveal({ children, className, delay = 0, x = 0, variant = 'up' }: { children: React.ReactNode; className?: string; delay?: number; x?: number; variant?: Variant }) {
  const start = x ? { x } : from[variant];
  return (
    <motion.div
      className={className}
      style={variant === 'tilt' ? { transformPerspective: 1200 } : undefined}
      initial={{ opacity: 0, ...start }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({ children, className, stagger = 0.08 }: { children: React.ReactNode; className?: string; stagger?: number }) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: 0.04 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} variants={item}>{children}</motion.div>;
}
