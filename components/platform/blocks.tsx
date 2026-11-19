import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AnyIcon } from "./icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/pages/reveal";
import { cn } from "@/lib/utils";
import { SIGNUP_URL } from "@/lib/platform-assets";
import { GlossIcon } from "./gloss-icon";
import { Spot } from "./spot";

type Cta = { label: string; href: string };

/* ------------------------------------------------------------------ */
/*  Capability cards: glossy icon, spotlight hover, drawn accent line   */
/* ------------------------------------------------------------------ */
const palette = ["#1d5fd6", "#e8684a", "#0f9a8a", "#0a3a7a", "#2f8fd0", "#1d5fd6"];

export function CapabilityRows({
  items,
  dark = false,
  cols = 2,
}: {
  items: { icon?: AnyIcon; title: string; text?: string; tint?: string }[];
  dark?: boolean;
  cols?: 1 | 2 | 3;
}) {
  return (
    <RevealGroup
      stagger={0.07}
      className={cn(
        "grid gap-4",
        cols === 2 && "md:grid-cols-2",
        cols === 3 && "md:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {items.map((it, i) => {
        const I = it.icon;
        const tint = it.tint ?? palette[i % palette.length];
        return (
          <RevealItem key={it.title} className="h-full">
            <Spot dark={dark}>
              <div className="relative flex h-full items-start gap-4 p-6">
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute bottom-1 right-4 font-heading text-6xl font-bold leading-none transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110",
                    dark ? "text-white/[0.05]" : "text-brand-ink/[0.045]",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {I ? (
                  <GlossIcon icon={I} tint={tint} size="lg" onDark={dark} />
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-accent-soft font-mono text-sm text-brand-accent-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                <div className="relative min-w-0">
                  <h3
                    className={cn(
                      "font-heading text-base font-semibold leading-snug sm:text-lg",
                      dark ? "text-white" : "text-brand-ink",
                    )}
                  >
                    {it.title}
                  </h3>
                  {it.text && (
                    <p
                      className={cn(
                        "mt-1.5 text-sm leading-relaxed",
                        dark ? "text-white/60" : "text-brand-slate",
                      )}
                    >
                      {it.text}
                    </p>
                  )}
                </div>
              </div>
            </Spot>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}

/* ------------------------------------------------------------------ */
/*  Section wrapper with its own background style                      */
/* ------------------------------------------------------------------ */
export function Band({
  children,
  tone = "white",
  id,
  className,
}: {
  children: React.ReactNode;
  tone?: "white" | "paper" | "night" | "navy";
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-clip py-16 sm:py-24",
        tone === "white" && "bg-white",
        tone === "paper" && "bg-brand-paper",
        tone === "night" && "hero-night text-white",
        tone === "navy" && "bg-[#022350] text-white",
        className,
      )}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export function BandHeading({
  eyebrow,
  title,
  text,
  dark = false,
  center = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("mb-10 max-w-2xl sm:mb-14", center && "mx-auto text-center")}>
      {eyebrow && (
        <span
          className={cn(
            "eyebrow mb-3",
            center && "justify-center",
            dark && "!text-[#FDB9A8]",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-h2 font-semibold",
          dark ? "text-white" : "text-brand-ink",
        )}
      >
        {title}
      </h2>
      {text && (
        <p
          className={cn(
            "mt-3 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/65" : "text-brand-slate",
          )}
        >
          {text}
        </p>
      )}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Closing call to action with a per-page accent                      */
/* ------------------------------------------------------------------ */
export function ClosingCta({
  title,
  text,
  primary = { label: "Get started", href: SIGNUP_URL },
  secondary = { label: "Talk to our team", href: "/contact" },
  className,
}: {
  title: React.ReactNode;
  text?: string;
  primary?: Cta;
  secondary?: Cta;
  className?: string;
}) {
  return (
    <section className={cn("bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8", className)}>
      <Reveal variant="zoom">
        <div className="hero-night relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-14 text-center shadow-2xl sm:px-12 sm:py-20">
          <div className="dot-grid-light absolute inset-0 opacity-40" aria-hidden />
          <div className="aurora-blob -right-20 -top-24 h-80 w-80 bg-[#FA7F63]/25" aria-hidden />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {title}
            </h2>
            {text && (
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                {text}
              </p>
            )}
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href={primary.href}
                className="btn bg-[#FA7F63] px-6 py-3 text-[0.95rem] text-[#022350] shadow-glow-coral hover:-translate-y-0.5 hover:bg-[#ff9279]"
              >
                {primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={secondary.href}
                className="btn border border-white/25 px-6 py-3 text-[0.95rem] text-white hover:bg-white/10"
              >
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Honest note shown where a real screenshot is not published yet     */
/* ------------------------------------------------------------------ */
export function Note({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        "rounded-xl border px-4 py-3 text-xs leading-relaxed",
        dark
          ? "border-white/10 bg-white/5 text-white/60"
          : "border-brand-line bg-brand-paper text-brand-slate",
      )}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Text + visual row. `visual` is any node (a frame, a list, a figure) */
/* ------------------------------------------------------------------ */
export function SplitRow({
  eyebrow,
  title,
  text,
  points,
  visual,
  reverse = false,
  dark = false,
  id,
  footer,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: string;
  points?: string[];
  visual: React.ReactNode;
  reverse?: boolean;
  dark?: boolean;
  id?: string;
  footer?: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="grid grid-cols-1 items-center gap-10 py-8 lg:grid-cols-2 lg:gap-16 lg:py-12"
    >
      <Reveal
        variant={reverse ? "right" : "left"}
        className={cn(reverse && "lg:order-2")}
      >
        {eyebrow && (
          <span className={cn("eyebrow mb-3", dark && "!text-[#FDB9A8]")}>
            {eyebrow}
          </span>
        )}
        <h3
          className={cn(
            "text-2xl font-semibold sm:text-3xl",
            dark ? "text-white" : "text-brand-ink",
          )}
        >
          {title}
        </h3>
        {text && (
          <p
            className={cn(
              "mt-3 max-w-lg text-base leading-relaxed",
              dark ? "text-white/65" : "text-brand-slate",
            )}
          >
            {text}
          </p>
        )}
        {points && (
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {points.map((p) => (
              <li
                key={p}
                className={cn(
                  "flex items-start gap-2.5 text-sm font-medium",
                  dark ? "text-white/85" : "text-brand-ink",
                )}
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FA7F63]" />
                {p}
              </li>
            ))}
          </ul>
        )}
        {footer && <div className="mt-6">{footer}</div>}
      </Reveal>
      <Reveal variant="zoom" delay={0.1} className={cn(reverse && "lg:order-1")}>
        {visual}
      </Reveal>
    </div>
  );
}
