"use client";

/**
 * Scroll-driven pinned story.
 * Desktop: the section pins to the screen and scrolling plays it - a giant outlined word drifts
 * sideways, a progress rail fills, the step list lights up and a 3D card flips to the next step.
 * After the last step the pin releases and the page carries on.
 * Mobile / reduced motion: a plain stacked list, no pinning.
 * Built on framer-motion (already in the project), so no extra dependency.
 */
import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "@/components/pages/reveal";
import { cn } from "@/lib/utils";

export type JourneyItem = {
  id: string;
  label: string;
  node: ReactNode;
};

function FlipCard({
  i,
  n,
  p,
  active,
  children,
}: {
  i: number;
  n: number;
  p: MotionValue<number>;
  active: boolean;
  children: ReactNode;
}) {
  const t = (i + 0.5) / n;
  const wide = 0.5 / n;
  const near = 0.2 / n;
  const first = i === 0;
  const last = i === n - 1;
  const input = [
    first ? -0.01 : t - wide,
    first ? 0 : t - near,
    last ? 1 : t + near,
    last ? 1.01 : t + wide,
  ];
  const opacity = useTransform(p, input, [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const rotateX = useTransform(p, input, [
    first ? 0 : -35,
    0,
    0,
    last ? 0 : 30,
  ]);
  const y = useTransform(p, input, [first ? 0 : 80, 0, 0, last ? 0 : -80]);
  const scale = useTransform(p, input, [
    first ? 1 : 0.92,
    1,
    1,
    last ? 1 : 0.92,
  ]);
  return (
    <motion.div
      style={{
        opacity,
        rotateX,
        y,
        scale,
        transformPerspective: 1200,
        pointerEvents: active ? "auto" : "none",
      }}
      className="absolute inset-0 flex items-center"
      aria-hidden={!active}
    >
      {children}
    </motion.div>
  );
}

export function PinnedJourney({
  eyebrow,
  heading,
  bgWord,
  items,
  perStep = 70,
  tone = "white",
  label,
}: {
  eyebrow: string;
  heading: ReactNode;
  bgWord: string;
  items: JourneyItem[];

  perStep?: number;
  tone?: "white" | "paper";
  label: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = items.length;

  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const wordX = useTransform(p, [0, 1], ["0%", "-18%"]);
  useMotionValueEvent(p, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(v * n * 0.999)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + range * ((i + 0.5) / n), behavior: "smooth" });
  };

  const bg = tone === "paper" ? "bg-brand-paper" : "bg-white";

  return (
    <section aria-label={label} className={cn("relative", bg)}>
      <div
        ref={ref}
        style={{ height: `calc(100vh + ${(n - 1) * perStep}vh)` }}
        className={cn("relative hidden", !reduce && "lg:block")}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            aria-hidden
            style={{ x: wordX, WebkitTextStroke: "2px rgba(2,35,80,0.07)" }}
            className="pointer-events-none absolute left-[4%] top-[50%] -translate-y-1/2 whitespace-nowrap font-heading text-[24vw] font-semibold leading-none text-transparent"
          >
            {bgWord}
          </motion.div>

          <div className="relative mx-auto grid h-full max-w-7xl grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-center gap-12 px-8 pt-20">
            <div>
              <span className="eyebrow">{eyebrow}</span>
              <h2 className="mt-3 text-h2 font-semibold text-brand-ink">
                {heading}
              </h2>
              <div className="relative mt-9 flex gap-6">
                <div className="relative w-1 shrink-0 rounded-full bg-brand-line">
                  <motion.span
                    style={{ scaleY: p }}
                    className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-[#FA7F63] to-[#022350]"
                  />
                </div>
                <ol className="space-y-3.5" role="tablist" aria-label={label}>
                  {items.map((s, k) => (
                    <li key={s.id}>
                      <button
                        role="tab"
                        aria-selected={k === active}
                        onClick={() => jump(k)}
                        className={cn(
                          "flex items-center gap-3 text-left transition-all duration-500",
                          k === active
                            ? "translate-x-1 opacity-100"
                            : "opacity-40 hover:opacity-70",
                        )}
                      >
                        <span
                          className={cn(
                            "font-mono text-xs font-semibold transition-colors",
                            k === active
                              ? "text-[#C9482A]"
                              : "text-brand-slate",
                          )}
                        >
                          {String(k + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] font-semibold text-brand-ink">
                          {s.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="relative h-[min(68vh,560px)] [perspective:1400px]">
              {items.map((s, k) => (
                <FlipCard key={s.id} i={k} n={n} p={p} active={k === active}>
                  {s.node}
                </FlipCard>
              ))}
            </div>
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-slate/70">
            {active < n - 1 ? "Keep scrolling" : "Scroll on"}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20",
          !reduce && "lg:hidden",
        )}
      >
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-3 max-w-2xl text-h2 font-semibold text-brand-ink">
            {heading}
          </h2>
        </Reveal>
        <ol className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map((s, k) => (
            <Reveal key={s.id} delay={k * 0.05}>
              <li className="list-none">{s.node}</li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
