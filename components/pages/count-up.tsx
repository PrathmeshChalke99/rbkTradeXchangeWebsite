'use client';
import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

/** Animates a number when it scrolls into view. Accepts values like "95%", "4.8", "2-3 days". */
export function CountUp({ value, className }: { value: string | number; className?: string }) {
  const text = String(value);
  const match = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  const reduce = useReducedMotion();
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!match || !inView) return;
    if (reduce) { setN(target); return; }
    const c = animate(0, target, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setN(v) });
    return () => c.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <span className={className}>{text}</span>;
  return <span ref={ref} className={className}>{n.toFixed(decimals)}{match[2]}</span>;
}
