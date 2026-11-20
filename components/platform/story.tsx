"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Shot } from "@/lib/platform-assets";
import { BrowserFrame, FocusShot } from "./frames";
import { cn } from "@/lib/utils";

export type StoryStep = {
  
  id?: string;
  label: string;
  title: string;
  text: string;
  shot: Shot;
  
  focus?: number;
  aspect?: number;
  points?: string[];
  icon?: ReactNode;
};

/**
 * Scroll-driven product story.
 * Desktop: steps scroll on the left while one real screenshot stays pinned on the
 * right and glides to the area each step talks about.
 * Mobile: each step shows its own screenshot below the copy.
 */
export function StickyStory({
  steps,
  url,
  dark = false,
  className,
}: {
  steps: StoryStep[];
  url?: string;
  dark?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.i);
            setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [steps.length]);

  const cur = steps[active] ?? steps[0];

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14",
        className,
      )}
    >
      <ol className="relative">
        {steps.map((s, i) => (
          <li
            key={s.label}
            id={s.id}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el as HTMLDivElement | null;
            }}
            className="flex min-h-0 flex-col justify-center py-8 lg:min-h-[72vh] lg:py-0"
          >
            <motion.div
              animate={{ opacity: active === i ? 1 : 0.38 }}
              transition={{ duration: 0.4 }}
              className="lg:will-change-[opacity]"
            >
              <span
                className={cn(
                  "inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em]",
                  dark ? "text-[#FDB9A8]" : "text-brand-accent-dark",
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-[11px]",
                    active === i
                      ? "bg-[#FA7F63] text-[#022350]"
                      : dark
                        ? "bg-white/10 text-white/70"
                        : "bg-brand-paper text-brand-slate",
                  )}
                >
                  {i + 1}
                </span>
                {s.label}
              </span>
              <h3
                className={cn(
                  "mt-4 text-2xl font-semibold sm:text-3xl",
                  dark ? "text-white" : "text-brand-ink",
                )}
              >
                {s.title}
              </h3>
              <p
                className={cn(
                  "mt-3 max-w-md text-base leading-relaxed",
                  dark ? "text-white/65" : "text-brand-slate",
                )}
              >
                {s.text}
              </p>
              {s.points && (
                <ul className="mt-5 space-y-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className={cn(
                        "flex items-center gap-2.5 text-sm font-medium",
                        dark ? "text-white/85" : "text-brand-ink",
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FA7F63]" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            {}
            <div className="mt-6 lg:hidden">
              <BrowserFrame url={url} dark={dark}>
                <FocusShot
                  shot={s.shot}
                  focus={s.focus ?? 0}
                  aspect={s.aspect ?? 4 / 3}
                />
              </BrowserFrame>
            </div>
          </li>
        ))}
      </ol>

      {}
      <div className="relative hidden lg:block">
        <div className="sticky top-28">
          <BrowserFrame url={url} dark={dark}>
            <div className="relative">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={cur.shot.src}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  <FocusShot
                    shot={cur.shot}
                    focus={cur.focus ?? 0}
                    aspect={cur.aspect ?? 4 / 3}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </BrowserFrame>
          <div className="mt-4 flex items-center justify-center gap-2" aria-hidden>
            {steps.map((s, i) => (
              <span
                key={s.label}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === active
                    ? "w-8 bg-[#FA7F63]"
                    : dark
                      ? "w-1.5 bg-white/25"
                      : "w-1.5 bg-brand-line",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
