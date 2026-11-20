"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Play, X } from "lucide-react";
import type { Shot } from "@/lib/platform-assets";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  children,
  url = "dashboard.rbktradexchange.com",
  className,
  dark = false,
}: {
  children: ReactNode;
  url?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border shadow-lift",
        dark
          ? "border-white/10 bg-[#0b1a38] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
          : "border-brand-line bg-white",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b px-4 py-2.5",
          dark
            ? "border-white/10 bg-white/5"
            : "border-brand-line bg-brand-paper",
        )}
      >
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#28c940]" />
        </span>
        <span
          className={cn(
            "mx-auto max-w-[70%] truncate rounded-md px-3 py-0.5 font-mono text-[10px] sm:text-[11px]",
            dark ? "bg-white/10 text-white/60" : "bg-white text-brand-slate",
          )}
        >
          {url}
        </span>
        <span className="w-10" aria-hidden />
      </div>
      {children}
    </div>
  );
}

export function Img({
  shot,
  className,
  priority,
}: {
  shot: Shot;
  className?: string;
  priority?: boolean;
}) {
  if (shot.crop) {
    const [a, b] = shot.crop;
    const f = b - a;
    return (
      <div className="overflow-hidden">
        {}
        <img
          src={shot.src}
          alt={shot.alt}
          width={shot.w}
          height={shot.h}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn("block h-auto max-w-none", className)}
          style={{ width: `${100 / f}%`, marginLeft: `${(-a * 100) / f}%` }}
        />
      </div>
    );
  }
  return (
    <img
      src={shot.src}
      alt={shot.alt}
      width={shot.w}
      height={shot.h}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("block h-auto w-full", className)}
    />
  );
}

function maxPan(shot: Shot, aspect: number) {
  const w = shot.crop ? shot.w * (shot.crop[1] - shot.crop[0]) : shot.w;
  return Math.max(0, (1 - w / (aspect * shot.h)) * 100);
}

export function PanShot({
  shot,
  aspect = 4 / 3,
  mode = "loop",
  duration = 22,
  start = 0,
  className,
  priority,
}: {
  shot: Shot;
  aspect?: number;
  mode?: "loop" | "scroll";
  duration?: number;

  start?: number;
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const pan = maxPan(shot, aspect);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0.1, 0.9], ["0%", `-${pan}%`]);
  const begin = (start / 100) * pan;

  return (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden bg-white", className)}
      style={{ aspectRatio: String(aspect) }}
    >
      {mode === "scroll" && !reduce ? (
        <motion.div style={{ y }} className="will-change-transform">
          <Img shot={shot} priority={priority} />
        </motion.div>
      ) : (
        <div
          className={cn(!reduce && pan > 0 && "shot-pan")}
          style={
            {
              "--pan": `-${pan}%`,
              "--pan-dur": `${duration}s`,
              transform: reduce ? `translateY(-${begin}%)` : undefined,
            } as CSSProperties
          }
        >
          <Img shot={shot} priority={priority} />
        </div>
      )}
    </div>
  );
}

export function FocusShot({
  shot,
  focus,
  aspect = 4 / 3,
  className,
}: {
  shot: Shot;

  focus: number;
  aspect?: number;
  className?: string;
}) {
  const pan = maxPan(shot, aspect);
  return (
    <div
      className={cn("relative w-full overflow-hidden bg-white", className)}
      style={{ aspectRatio: String(aspect) }}
    >
      <motion.div
        initial={false}
        animate={{ y: `-${(focus / 100) * pan}%` }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="will-change-transform"
      >
        <Img shot={shot} />
      </motion.div>
    </div>
  );
}

export function FloatTag({
  children,
  className,
  delay = 0,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  tone?: "light" | "coral" | "dark" | "green" | "red";
}) {
  const tones = {
    light: "bg-white text-brand-ink border-brand-line",
    coral: "bg-[#FA7F63] text-[#022350] border-[#FA7F63]",
    dark: "bg-[#0a1630] text-white border-white/10",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    red: "bg-rose-50 text-rose-700 border-rose-200",
  } as const;
  return (
    <motion.span
      initial={{ opacity: 0, y: 12, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "absolute z-20 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold shadow-lift",
        tones[tone],
        className,
      )}
    >
      <span className="animate-float-y inline-flex items-center gap-2">
        {children}
      </span>
    </motion.span>
  );
}

export function VideoLightbox({
  src,
  poster,
  label = "Watch a completed trade",
  className,
  children,
}: {
  src: string;
  poster?: ReactNode;
  label?: string;
  className?: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group relative block w-full overflow-hidden rounded-2xl text-left",
          className,
        )}
        aria-label={label}
      >
        {poster}
        {children}
        <span className="absolute inset-0 flex items-center justify-center bg-brand-night/30 transition group-hover:bg-brand-night/20">
          <span className="flex items-center gap-3 rounded-full bg-white/95 py-2 pl-2 pr-5 text-sm font-semibold text-brand-ink shadow-lift transition group-hover:scale-105">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FA7F63] text-[#022350]">
              <Play className="h-4 w-4 fill-current" />
            </span>
            {label}
          </span>
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-night/85 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-ink"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <video
              ref={videoRef}
              src={src}
              controls
              autoPlay
              playsInline
              className="max-h-[85vh] w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
