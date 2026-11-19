"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  CircleDashed,
  Landmark,
  Loader2,
  Network,
  Ship,
  XCircle,
} from "lucide-react";
import { analysisResult, documentTypes } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Who the platform connects — animated hub diagram (unchanged)        */
/* ------------------------------------------------------------------ */
const parties = [
  {
    side: "left",
    icon: Ship,
    title: "Exporters",
    text: "Manage export trades, check documents and apply for pre- and post-shipment finance or LC discounting.",
    bg: "bg-emerald-50",
    color: "text-emerald-600",
    accent: "#34d399",
  },
  {
    side: "left",
    icon: Building2,
    title: "Importers",
    text: "Track import trades, open LCs and apply for buyer credit, supplier credit or import finance.",
    bg: "bg-amber-50",
    color: "text-amber-600",
    accent: "#fbbf24",
  },
  {
    side: "right",
    icon: Landmark,
    title: "Participating lenders",
    text: "Banks, NBFCs and financial institutions review applications independently and send quotations.",
    bg: "bg-teal-50",
    color: "text-teal-600",
    accent: "#2dd4bf",
  },
  {
    side: "right",
    icon: Network,
    title: "Business partners",
    text: "Buyers, suppliers and logistics partners kept in your network and reused across documents.",
    bg: "bg-amber-50",
    color: "text-amber-700",
    accent: "#fde68a",
  },
] as const;

function PartyCard({ p, i }: { p: (typeof parties)[number]; i: number }) {
  const I = p.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: p.side === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
      className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${p.bg} ${p.color}`}
        >
          <I className="h-5 w-5" />
        </span>
        <h3 className="text-base font-semibold text-neutral-900">{p.title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">{p.text}</p>
    </motion.div>
  );
}

export function ConnectMap() {
  const left = parties.filter((p) => p.side === "left");
  const right = parties.filter((p) => p.side === "right");

  const paths = [
    "M0 27 C 25 27, 30 50, 50 50",
    "M0 73 C 25 73, 30 50, 50 50",
    "M100 27 C 75 27, 70 50, 50 50",
    "M100 73 C 75 73, 70 50, 50 50",
  ];

  return (
    <div className="">
      <div className="">
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_minmax(220px,0.8fr)_1fr] lg:gap-4">
          <div className="space-y-5 lg:pr-4">
            {left.map((p, i) => (
              <PartyCard key={p.title} p={p} i={i} />
            ))}
          </div>

          <div className="relative order-first mx-auto flex h-56 w-full max-w-xs items-center justify-center lg:order-none lg:h-[340px] lg:max-w-none">
            <svg
              className="absolute inset-0 hidden h-full w-full lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="cm-line" x1="0" x2="1">
                  <stop offset="0" stopColor="#d4d4d8" stopOpacity="0.4" />
                  <stop offset="0.5" stopColor="#fbbf24" stopOpacity="0.6" />
                  <stop offset="1" stopColor="#d4d4d8" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              {paths.map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  fill="none"
                  stroke="url(#cm-line)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.3 + i * 0.12, ease }}
                />
              ))}
              {paths.map((d, i) => (
                <circle
                  key={`dot-${i}`}
                  r="1"
                  fill={i % 2 === 0 ? "#10b981" : "#f59e0b"}
                  className="motion-reduce:hidden"
                >
                  <animateMotion
                    dur={`${3.2 + i * 0.4}s`}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
              ))}
            </svg>

            <div className="relative flex flex-col items-center">
              <span
                className="absolute h-40 w-40 rounded-full blur-3xl opacity-40"
                style={{
                  background:
                    "radial-gradient(circle, #fcd34d 0%, #34d399 60%, transparent 100%)",
                }}
                aria-hidden
              />
              <span
                className="absolute h-32 w-32 rounded-full border border-amber-200 motion-safe:animate-ping-soft"
                aria-hidden
              />

              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white bg-white/80 shadow-[0_8px_32px_rgba(251,191,36,0.2)] backdrop-blur-md">
                <Image
                  src="/tradeExchange.png"
                  alt="RBK TradeXchange"
                  width={341}
                  height={285}
                  className="h-14 w-auto"
                  aria-hidden
                />
              </div>

              <p className="relative mt-5 font-heading text-sm font-bold text-neutral-900">
                RBK TradeXchange
              </p>
              <p className="relative font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-500">
                Workspace & marketplace
              </p>
            </div>
          </div>

          <div className="space-y-5 lg:pl-4">
            {right.map((p, i) => (
              <PartyCard key={p.title} p={p} i={i + 2} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Animated frame around your REAL platform screenshots                */
/*                                                                     */
/* The screenshot stays the source of truth. The animation shows the   */
/* activity that produced it:                                          */
/*   1. screenshot comes into focus when the section scrolls in        */
/*   2. a scan beam sweeps while the "AI" works                        */
/*   3. status callouts pop onto the report at the right moment        */
/*   4. an activity bar under the image ticks through each step        */
/* Plays once. Reduced-motion users get the final state immediately.   */
/* ------------------------------------------------------------------ */
type Tone = "ok" | "warn" | "err" | "info";

type Callout = {
  /** shows once this many steps have completed */
  at: number;
  /** position on the screenshot, in % of its box */
  x: number;
  y: number;
  label: string;
  tone: Tone;
};

const TONE: Record<Tone, string> = {
  ok: "bg-emerald-600 text-white",
  warn: "bg-amber-500 text-white",
  err: "bg-rose-600 text-white",
  info: "bg-neutral-900 text-white",
};

function useSequence(total: number, stepMs = 900) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStep(total);
      return;
    }
    if (!inView) return;
    const id = window.setInterval(() => {
      setStep((s) => {
        if (s >= total) {
          window.clearInterval(id);
          return s;
        }
        return s + 1;
      });
    }, stepMs);
    return () => window.clearInterval(id);
  }, [inView, reduce, total, stepMs]);

  const done = step >= total;
  return { ref, step, done, scanning: inView && !done };
}

type ReportFrameProps = {
  /** small label shown on the image, e.g. "Live platform" */
  badge: string;
  accent: "emerald" | "amber" | "violet";
  src: string;
  alt: string;
  /** activity timeline shown under the image, one entry per step */
  steps: string[];
  /** label once every step is complete */
  doneLabel: string;
  callouts?: Callout[];
  fallback?: ReactNode;
  tall?: boolean;
  /** ms per step */
  stepMs?: number;
  priority?: boolean;
};

function ReportFrame({
  badge,
  accent,
  src,
  alt,
  steps,
  doneLabel,
  callouts = [],
  fallback,
  tall = false,
  stepMs = 900,
  priority = false,
}: ReportFrameProps) {
  const { ref, step, done, scanning } = useSequence(steps.length, stepMs);
  // A missing screenshot can fail before React attaches onError, so also check after mount.
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const img = (ref.current as HTMLElement | null)?.querySelector("img");
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [ref, src]);

  const accentBg = {
    emerald: "from-emerald-100 via-white to-amber-100",
    amber: "from-amber-100 via-white to-emerald-50",
    violet: "from-violet-100 via-white to-pink-50",
  }[accent];

  return (
    <div
      ref={ref}
      className="relative isolate mx-auto w-full max-w-[620px] py-6"
    >
      {/* Background glow */}
      <div
        className={cn(
          "absolute -inset-5 -z-10 rounded-[2rem] bg-gradient-to-br opacity-80 blur-xl",
          accentBg,
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative w-full animate-float transition-transform duration-500 hover:-translate-y-2",
          tall ? "aspect-[3/4]" : "aspect-[4/3]",
        )}
      >
        {/* Screenshot: blurred/dim until the first step completes */}
        <div
          className={cn(
            "absolute inset-0 overflow-hidden rounded-[24px] transition-all duration-700",
            step >= 1 ? "opacity-100 blur-0" : "opacity-40 blur-[3px]",
          )}
        >
          {/* A .pdf src shows your actual PDF report; anything else is an image. */}
          {src.toLowerCase().endsWith(".pdf") ? (
            <iframe
              src={`${src}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              title={alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0 bg-white"
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className={cn("object-contain", failed && "hidden")}
              priority={priority}
              onError={() => setFailed(true)}
            />
          )}

          {/* Scan beam */}
          {scanning && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-emerald-400/25 to-transparent"
              initial={{ top: "-10%" }}
              animate={{ top: "100%" }}
              transition={{
                duration: 1.8,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          )}
        </div>

        {fallback && failed && (
          <div
            data-report-fallback
            className="absolute inset-0 overflow-auto rounded-[24px] p-3"
          >
            {fallback}
          </div>
        )}

        {/* Status callouts pinned onto the report */}
        {callouts.map(
          (c) =>
            step >= c.at && (
              <motion.span
                key={`${c.label}-${c.x}-${c.y}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 16 }}
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                className={cn(
                  "absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-lg sm:block",
                  TONE[c.tone],
                )}
              >
                {c.label}
              </motion.span>
            ),
        )}

        {/* Full PDF link (PDF sources only). Mobile browsers often show just page 1 inline. */}
        {src.toLowerCase().endsWith(".pdf") && (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 z-10 rounded-full bg-neutral-900/90 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg backdrop-blur transition hover:bg-neutral-900"
          >
            Open full PDF
          </a>
        )}

        {/* Source badge */}
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-semibold text-neutral-700 shadow-sm backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          {badge}
        </span>
      </div>

      {/* Activity bar: what the platform is doing right now */}
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-neutral-200 bg-white/80 px-3.5 py-2.5 shadow-sm backdrop-blur">
        {done ? (
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
        ) : (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-amber-600 motion-reduce:animate-none" />
        )}
        <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-neutral-800">
          {done ? doneLabel : steps[step] ?? steps[0]}
        </p>
        <div className="flex shrink-0 items-center gap-1" aria-hidden>
          {steps.map((s, i) => (
            <span
              key={s}
              className={cn(
                "h-1.5 w-5 rounded-full transition-colors duration-500",
                i < step ? "bg-emerald-500" : "bg-neutral-200",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1 — Document cross-check                                       */
/* ------------------------------------------------------------------ */
export function DocCheckVisual() {
  return (
    <ReportFrame
      accent="emerald"
      badge="Live platform"
      src="/images/trade_workflow.png"
      alt="AI trade document cross-check report showing matched, warning and discrepancy fields"
      steps={[
        "Reading uploaded documents…",
        "Extracting key fields…",
        "Cross-checking across documents…",
        "Labelling mismatches by severity…",
      ]}
      doneLabel="Report ready for your team's review"
      // TUNE: x / y are % positions on YOUR screenshot. Move them so each
      // callout sits next to the matching row, or delete callouts you don't need.
      callouts={[
        { at: 2, x: 70, y: 38, label: "Matched", tone: "ok" },
        { at: 3, x: 70, y: 52, label: "Warning", tone: "warn" },
        { at: 4, x: 70, y: 66, label: "Discrepancy", tone: "err" },
      ]}
      fallback={<DocCheckFallback />}
    />
  );
}

function DocCheckFallback() {
  const rows = [
    ...analysisResult.matched.slice(0, 3).map((m) => ({
      s: "ok" as const,
      f: m.field,
      n: m.value,
      d: m.documents.join(" · "),
    })),
    ...analysisResult.warnings.map((w) => ({
      s: "warn" as const,
      f: w.field,
      n: w.message,
      d: w.documents.join(" · "),
    })),
    ...analysisResult.discrepancies.map((w) => ({
      s: "err" as const,
      f: w.field,
      n: w.message,
      d: w.documents.join(" · "),
    })),
    ...analysisResult.unchecked.slice(0, 1).map((w) => ({
      s: "skip" as const,
      f: w.field,
      n: w.message,
      d: "Manual review",
    })),
  ];
  const counts = [
    {
      k: "Matched",
      v: analysisResult.matched.length,
      c: "text-emerald-700 bg-emerald-50",
    },
    {
      k: "Warnings",
      v: analysisResult.warnings.length,
      c: "text-amber-700 bg-amber-50",
    },
    {
      k: "Discrepancies",
      v: analysisResult.discrepancies.length,
      c: "text-rose-700 bg-rose-50",
    },
    {
      k: "Unchecked",
      v: analysisResult.unchecked.length,
      c: "text-neutral-600 bg-neutral-100",
    },
  ];
  return (
    <div>
      <div className="mb-3 grid grid-cols-4 gap-2">
        {counts.map((c) => (
          <div
            key={c.k}
            className={cn("rounded-xl px-2 py-2.5 text-center", c.c)}
          >
            <p className="font-heading text-xl font-semibold">{c.v}</p>
            <p className="text-[10.5px] font-medium opacity-90">{c.k}</p>
          </div>
        ))}
      </div>
      <ul className="space-y-1.5">
        {rows.map((r, i) => (
          <motion.li
            key={r.f}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 * i, duration: 0.4 }}
            className={cn(
              "flex items-start gap-3 rounded-xl border px-3 py-2.5",
              r.s === "err"
                ? "border-rose-200 bg-rose-50/60"
                : r.s === "warn"
                  ? "border-amber-200 bg-amber-50/60"
                  : "border-neutral-200 bg-white",
            )}
          >
            {r.s === "ok" && (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            )}
            {r.s === "warn" && (
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            )}
            {r.s === "err" && (
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
            )}
            {r.s === "skip" && (
              <CircleDashed className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p className="text-[13px] font-semibold text-neutral-900">
                  {r.f}
                </p>
                <p className="font-mono text-[10.5px] text-neutral-500">
                  {r.d}
                </p>
              </div>
              <p className="truncate text-xs text-neutral-500">{r.n}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2 — LC discrepancy                                             */
/* ------------------------------------------------------------------ */
export function DocPipelineVisual() {
  return (
    <ReportFrame
      accent="amber"
      badge="Live platform"
      src="/images/lc_discrepancy.png"
      alt="LC discrepancy report showing clause-by-clause comparison against the LC draft"
      steps={[
        "Reading LC terms…",
        "Parsing shipment documents…",
        "Comparing clause by clause…",
        "Drafting suggested corrections…",
      ]}
      doneLabel="Discrepancy report ready before presentation to the bank"
      // TUNE: position these on your lc_discrepancy.png
      callouts={[
        { at: 3, x: 68, y: 40, label: "Late shipment date", tone: "err" },
        { at: 4, x: 68, y: 62, label: "Fix suggested", tone: "info" },
      ]}
      fallback={<LcDiscrepancyFallback />}
    />
  );
}

function LcDiscrepancyFallback() {
  const lcChecks = [
    {
      clause: "Latest shipment date",
      lc: "On or before 15 Apr 2026",
      doc: "B/L dated 18 Apr 2026",
      status: "err" as const,
      note: "3 days late — request LC amendment",
    },
    {
      clause: "Port of loading",
      lc: "Nhava Sheva (INNSA)",
      doc: "Nhava Sheva (INNSA)",
      status: "ok" as const,
      note: "Matched",
    },
    {
      clause: "Description of goods",
      lc: "Cotton t-shirts, HS 6109",
      doc: "Cotton t-shirts, HS 6109",
      status: "ok" as const,
      note: "Matched",
    },
    {
      clause: "Partial shipment",
      lc: "Not allowed",
      doc: "Single B/L — partial not used",
      status: "warn" as const,
      note: "Confirm with bank before presentation",
    },
    {
      clause: "Documents required",
      lc: "Invoice, B/L, Packing list, COO",
      doc: "Missing: Certificate of Origin",
      status: "err" as const,
      note: "Upload COO before presentation",
    },
  ];
  const icons = {
    ok: <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />,
    warn: <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />,
    err: <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />,
  };
  return (
    <div>
      <div className="mb-3 grid grid-cols-3 gap-2">
        {[
          { k: "Documents parsed", v: 6, ok: true },
          { k: "LC clauses checked", v: 5, ok: true },
          { k: "Discrepancies", v: 2, ok: false },
        ].map((s) => (
          <div
            key={s.k}
            className={cn(
              "rounded-lg px-2 py-1.5 text-center",
              s.ok
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700",
            )}
          >
            <p className="font-heading text-base font-semibold">{s.v}</p>
            <p className="text-[10px] font-medium opacity-90">{s.k}</p>
          </div>
        ))}
      </div>
      <ul className="space-y-1.5">
        {lcChecks.map((r, i) => (
          <motion.li
            key={r.clause}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 * i, duration: 0.4 }}
            className={cn(
              "flex items-start gap-3 rounded-xl border px-3 py-2.5",
              r.status === "err"
                ? "border-rose-200 bg-rose-50/60"
                : r.status === "warn"
                  ? "border-amber-200 bg-amber-50/60"
                  : "border-neutral-200 bg-white",
            )}
          >
            {icons[r.status]}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p className="text-[13px] font-semibold text-neutral-900">
                  {r.clause}
                </p>
                <p className="font-mono text-[10.5px] text-neutral-500">
                  LC: {r.lc}
                </p>
              </div>
              <p className="truncate text-xs text-neutral-500">Doc: {r.doc}</p>
              <p className="mt-0.5 text-[11px] font-medium text-neutral-700">
                {r.note}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3 — Finance readiness report                                   */
/* ------------------------------------------------------------------ */
export function FinanceReadinessVisual() {
  return (
    <ReportFrame
      accent="emerald"
      badge="Lender-facing report"
      /* FIX: this previously reused trade_workflow.png (same image as
         Step 1). Add a real readiness screenshot at this path. Until the
         file exists, the animated fallback below is shown instead. */
      src="/images/finance_readiness.png"
      alt="Finance readiness report showing per-product readiness score and missing documents"
      steps={[
        "Re-using your uploaded trade documents…",
        "Checking each product's eligibility criteria…",
        "Scoring readiness per product…",
        "Preparing the lender-facing report…",
      ]}
      doneLabel="Readiness report shared with participating lenders"
      fallback={<ReadinessFallback />}
    />
  );
}

function ReadinessFallback() {
  const products = [
    {
      name: "Pre-shipment finance",
      readiness: 92,
      status: "ready" as const,
      missing: [] as string[],
    },
    {
      name: "Post-shipment finance",
      readiness: 84,
      status: "ready" as const,
      missing: [] as string[],
    },
    {
      name: "LC discounting",
      readiness: 68,
      status: "partial" as const,
      missing: ["Certificate of Origin", "LC amendment"],
    },
    {
      name: "Buyer credit",
      readiness: 41,
      status: "blocked" as const,
      missing: ["KYC of buyer", "Insurance certificate"],
    },
  ];
  const statusMap = {
    ready: { c: "bg-emerald-500", t: "text-emerald-700", label: "Ready" },
    partial: { c: "bg-amber-500", t: "text-amber-700", label: "Missing items" },
    blocked: { c: "bg-rose-500", t: "text-rose-700", label: "Not ready" },
  };
  return (
    <div>
      <div className="mb-3">
        <p className="text-[12px] font-semibold text-neutral-900">
          Application shared with 4 lenders
        </p>
        <p className="text-[11px] text-neutral-500">
          Readiness report auto-generated from uploaded trade documents
        </p>
      </div>
      <ul className="divide-y divide-neutral-200">
        {products.map((p, i) => {
          const s = statusMap[p.status];
          return (
            <li key={p.name} className="py-2.5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] font-semibold text-neutral-900">
                  {p.name}
                </p>
                <span
                  className={cn(
                    "rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-[10.5px] font-semibold",
                    s.t,
                  )}
                >
                  {p.readiness}% · {s.label}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-100">
                <motion.div
                  className={cn("h-full rounded-full", s.c)}
                  initial={{ width: 0 }}
                  animate={{ width: `${p.readiness}%` }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease }}
                />
              </div>
              {p.missing.length > 0 && (
                <p className="mt-1 text-[11px] text-neutral-500">
                  Missing: {p.missing.join(", ")}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Lender quotations — real screenshot + live lender activity          */
/* ------------------------------------------------------------------ */
export function QuoteVisual() {
  return (
    <ReportFrame
      accent="amber"
      badge="Live platform"
      src="/images/quote.png"
      alt="Trade finance quote dashboard"
      steps={[
        "Application submitted with readiness report…",
        "Lenders reviewing independently…",
        "Quotations arriving…",
        "Rates, tenure and amounts ready to compare…",
      ]}
      doneLabel="Compare quotations. The decision stays yours"
      priority
      // TUNE: position on your quote.png, or remove
      callouts={[
        { at: 3, x: 68, y: 38, label: "Quote received", tone: "ok" },
        { at: 4, x: 68, y: 60, label: "Best rate", tone: "info" },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Trade document coverage strip (unchanged)                           */
/* ------------------------------------------------------------------ */
export function DocTypeChips() {
  const extra = [
    {
      name: "Sales / Purchase Contract",
      short: "SC",
      color: "#047857",
      bg: "#d1fae5",
    },
  ];
  return (
    <ul className="flex flex-wrap gap-2">
      {[...documentTypes, ...extra].map((d, i) => (
        <motion.li
          key={d.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white py-1 pl-1 pr-3 text-[13px] font-medium text-neutral-900 shadow-soft"
        >
          <span
            className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-md px-1 font-mono text-[10px] font-semibold"
            style={{ background: d.bg, color: d.color }}
          >
            {d.short}
          </span>
          {d.name}
        </motion.li>
      ))}
    </ul>
  );
}
