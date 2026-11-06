'use client';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Absolute-fill photo with a shimmer skeleton while loading, a soft fade-in when ready,
 * and automatic fallback to a bundled illustration. Parent must be `relative`.
 */
export function Photo({ src, fallback, alt = '', className, priority }: { src: string; fallback?: string; alt?: string; className?: string; priority?: boolean }) {
  const [current, setCurrent] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !el.complete) return;
    // catches images that loaded or failed before hydration
    if (el.naturalWidth === 0 && fallback && current !== fallback) setCurrent(fallback);
    else if (el.naturalWidth > 0) setLoaded(true);
  }, [fallback, current]);

  return (
    <>
      {!loaded && <span className="skeleton absolute inset-0" aria-hidden />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={current}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => { if (fallback && current !== fallback) setCurrent(fallback); else setLoaded(true); }}
        className={cn('absolute inset-0 h-full w-full object-cover transition-opacity duration-700', loaded ? 'opacity-100' : 'opacity-0', className)}
      />
    </>
  );
}
