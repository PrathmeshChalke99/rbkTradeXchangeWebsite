'use client';
import { MotionConfig } from 'framer-motion';

/** Global motion settings: every framer-motion animation honours the OS "reduce motion" setting. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  );
}
