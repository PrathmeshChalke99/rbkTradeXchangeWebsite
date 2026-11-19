"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type PhotoProps = {
  src: string;
  fallback?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Absolute-fill photo with a shimmer skeleton while loading, a soft blur-fade-in
 * when ready, and automatic fallback to a bundled illustration.
 *
 * Parent must be `relative` (or have explicit dimensions).
 *
 * `className` is applied to the *wrapper*, so `rounded-*`, `shadow-*`, `overflow-hidden`,
 * `ring-*` all behave intuitively — the skeleton is clipped to the same shape.
 */
export function Photo({
  src,
  fallback,
  alt = "",
  className,
  priority,
}: PhotoProps) {
  const [current, setCurrent] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset when the src changes (e.g. carousel slide swap)
  useEffect(() => {
    setCurrent(src);
    setLoaded(false);
    setFailed(false);
  }, [src]);

  // Catch images that finished loading / failed before hydration
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (!el.complete) return;

    if (el.naturalWidth > 0) {
      setLoaded(true);
    } else if (fallback && current !== fallback) {
      setCurrent(fallback);
    } else {
      setFailed(true);
      setLoaded(true); // stop the shimmer; show whatever we have
    }
  }, [fallback, current]);

  return (
    <span
      className={cn(
        "absolute inset-0 block overflow-hidden bg-slate-100",
        className,
      )}
    >
      {/* Shimmer skeleton — clipped to the wrapper's radius */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-[linear-gradient(100deg,#eef2f7_20%,#f8fafc_40%,#eef2f7_60%)]",
          "bg-[length:200%_100%]",
          "transition-opacity duration-500",
          loaded ? "opacity-0" : "animate-shimmer opacity-100",
        )}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={current}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        referrerPolicy="no-referrer"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (fallback && current !== fallback) setCurrent(fallback);
          else {
            setFailed(true);
            setLoaded(true);
          }
        }}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          "transition-[opacity,filter,transform] duration-700 ease-out will-change-[opacity,filter]",
          loaded
            ? "opacity-100 blur-0 scale-100"
            : "opacity-0 blur-md scale-[1.02]",
          failed && "opacity-0", // hide broken icon if there's truly no fallback
        )}
      />
    </span>
  );
}
