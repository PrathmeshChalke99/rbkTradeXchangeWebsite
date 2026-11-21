"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, FileUp, RotateCcw, ScanSearch, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const CORAL = "#FA7F63";

type Field = { label: string; value: string };

/** Diagonal repeating text for the watermark layer (inline SVG, no extra request). */
const wmPattern = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='96'><text x='8' y='54' font-family='Inter,Arial,sans-serif' font-size='13' font-weight='700' fill='%23022350' fill-opacity='0.1'>RBK TRADEXCHANGE · SAMPLE</text></svg>")`;

/** Where each extracted field sits on the dummy purchase order, in percent of the page. */
const slots = [
  { l: 6, t: 20, w: 40, h: 12 },
  { l: 54, t: 20, w: 40, h: 12 },
  { l: 6, t: 44, w: 54, h: 8 },
  { l: 64, t: 44, w: 14, h: 8 },
  { l: 80, t: 44, w: 14, h: 8 },
  { l: 6, t: 60, w: 54, h: 8 },
];
const confidence = [99, 98, 97, 99, 96, 98];

/**
 * Animated TradeAI story (all sample data, on dummy formats):
 *  1. a purchase order is dropped in and uploaded,
 *  2. a scanning beam sweeps it, fields are detected and streamed to the AI core,
 *  3. the document is written field by field, verified, and stamped with the watermark.
 * Loops, can be replayed, and shows the finished state for reduced-motion visitors.
 */
export function DocFlowDemo({
  docName,
  label,
  accent,
  sourceLabel,
  fields,
  watermark,
}: {
  docName: string;
  label: string;
  accent: string;
  sourceLabel: string;
  fields: Field[];
  watermark: string;
}) {
  const reduce = useReducedMotion();
  const n = Math.min(fields.length, slots.length);
  const list = useMemo(() => fields.slice(0, n), [fields, n]);

  const [run, setRun] = useState(0);
  const [stage, setStage] = useState(1); // 1 upload, 2 analyse, 3 generate
  const [detected, setDetected] = useState(0);
  const [filled, setFilled] = useState(0);
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    if (reduce) {
      setStage(3);
      setDetected(n);
      setFilled(n);
      setStamped(true);
      return;
    }
    setStage(1);
    setDetected(0);
    setFilled(0);
    setStamped(false);
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    at(2500, () => setStage(2));
    list.forEach((f, i) => {
      const t = 3300 + i * 650;
      at(t, () => setDetected(i + 1));
    });
    const t3 = 3300 + n * 650 + 500;
    at(t3, () => setStage(3));
    list.forEach((_, i) => at(t3 + 500 + i * 620, () => setFilled(i + 1)));
    const done = t3 + 500 + n * 620 + 350;
    at(done, () => setStamped(true));
    at(done + 5200, () => setRun((r) => r + 1));
    return () => timers.forEach(clearTimeout);
  }, [run, reduce, n, list, docName, sourceLabel]);

  const pct =
    stamped ? 100 : stage === 1 ? 12 : stage === 2 ? 20 + Math.round((detected / n) * 35) : 58 + Math.round((filled / n) * 38);
  const stageNames = ["Upload", "AI scan", `${docName}`];
  const status = stage === 1 ? "Receiving file" : stage === 2 ? "Scanning & extracting" : stamped ? "Complete" : "Writing document";

  return (
    <div>
      <p className="sr-only" aria-live="polite">
        {`Step ${stage} of 3: ${status}`}
      </p>

      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-paleblue/60 via-white to-brand-paper p-4 shadow-lift ring-1 ring-brand-line sm:p-7">
        <div className="grid-lines-light absolute inset-0 opacity-70" aria-hidden />
        <div className="aurora-blob -right-20 top-0 h-72 w-72 bg-[#FA7F63]/15" aria-hidden />
        <div className="aurora-blob -bottom-24 -left-20 h-72 w-72 bg-brand-sky/20" aria-hidden />

        {/* stage strip */}
        <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3">
          <ol className="flex flex-wrap items-center gap-2" aria-label="Steps">
            {stageNames.map((s, i) => {
              const on = stage === i + 1;
              const done = stage > i + 1 || (i === 2 && stamped);
              return (
                <li
                  key={s}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-500",
                    on ? "border-[#FA7F63] bg-[#FA7F63] text-[#022350] shadow-glow-coral" : done ? "border-brand-accent/40 bg-brand-accent-soft text-brand-accent-dark" : "border-brand-line bg-white text-brand-slate",
                  )}
                >
                  <span className={cn("flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px]", on ? "bg-white/70" : done ? "bg-white" : "bg-brand-paper")}>
                    {done && !on ? <Check className="h-3 w-3" /> : i + 1}
                  </span>
                  {s}
                </li>
              );
            })}
          </ol>
          {/* <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-line bg-white px-3 py-1.5 text-xs font-semibold text-brand-ink shadow-soft transition hover:border-brand-accent"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Replay
          </button> */}
        </div>

        <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_0.5fr_1fr] lg:gap-2">
          {/* data streams between the three columns (desktop) */}
          <svg className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {[28, 50, 72].map((y, i) => (
              <g key={y}>
                <path d={`M34 ${y} C 42 ${y}, 44 50, 50 50`} fill="none" stroke="#022350" strokeOpacity="0.12" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                <path d={`M34 ${y} C 42 ${y}, 44 50, 50 50`} fill="none" stroke={CORAL} strokeWidth="1.4" vectorEffect="non-scaling-stroke" className={cn("flow-dash transition-opacity duration-500", stage === 2 ? "opacity-100" : "opacity-0")} />
                <path d={`M50 50 C 56 50, 58 ${y}, 66 ${y}`} fill="none" stroke="#022350" strokeOpacity="0.12" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                <path d={`M50 50 C 56 50, 58 ${y}, 66 ${y}`} fill="none" stroke="#2f8fd0" strokeWidth="1.4" vectorEffect="non-scaling-stroke" className={cn("flow-dash transition-opacity duration-500", stage === 3 && !stamped ? "opacity-100" : "opacity-0")} />
                {stage === 2 && (
                  <circle r="1.1" fill={CORAL}>
                    <animateMotion dur={`${1.8 + i * 0.3}s`} repeatCount="indefinite" path={`M34 ${y} C 42 ${y}, 44 50, 50 50`} />
                  </circle>
                )}
                {stage === 3 && !stamped && (
                  <circle r="1.1" fill="#2f8fd0">
                    <animateMotion dur={`${1.8 + i * 0.3}s`} repeatCount="indefinite" path={`M50 50 C 56 50, 58 ${y}, 66 ${y}`} />
                  </circle>
                )}
              </g>
            ))}
          </svg>

          {/* ---------- A: dummy purchase order being scanned ---------- */}
          <div className="relative z-10">
            <PanelLabel icon={<FileUp className="h-3.5 w-3.5" />} text={`Uploaded · ${sourceLabel}`} active={stage <= 2} />
            <div className="relative rounded-2xl p-3">
              <motion.div
                key={`drop-${run}`}
                initial={reduce ? false : { y: -70, rotate: -6, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.25 }}
                className="relative mx-auto aspect-[4/5] w-full max-w-[19rem] overflow-hidden rounded-xl bg-white shadow-lift ring-1 ring-black/5"
              >
                <div className="px-[6%] py-[4%] text-white" style={{ background: "#4b5a74" }}>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] opacity-80">Buyer document</p>
                  <p className="font-heading text-[13px] font-semibold">{sourceLabel.toUpperCase()}</p>
                </div>
                {/* dummy content: one skeleton block per field, plus filler lines */}
                {slots.slice(0, n).map((s, i) => (
                  <div key={i} className="absolute rounded-md border border-brand-line bg-brand-paper/70" style={{ left: `${s.l}%`, top: `${s.t}%`, width: `${s.w}%`, height: `${s.h}%` }}>
                    <i className="absolute left-2 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand-line" style={{ width: `${55 + ((i * 13) % 35)}%` }} />
                  </div>
                ))}
                {[76, 84].map((t, i) => (
                  <i key={t} className="absolute left-[6%] block h-1.5 rounded-full bg-brand-line" style={{ top: `${t}%`, width: `${i ? 46 : 70}%` }} />
                ))}
                <i className="absolute bottom-[5%] right-[6%] h-2 w-16 rounded-full bg-brand-line" />

                {/* faint grid + scanning beam */}
                {stage === 2 && (
                  <>
                    <span className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(250,127,99,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(250,127,99,0.08) 1px, transparent 1px)", backgroundSize: "18px 18px" }} aria-hidden />
                    <motion.div
                      key={`beam-${run}`}
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 z-10"
                      style={{ height: "22%" }}
                      initial={{ top: "-22%" }}
                      animate={{ top: "100%" }}
                      transition={{ duration: 1.5, ease: "easeInOut", repeat: 1 }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-t from-[#FA7F63]/40 to-transparent" />
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#FA7F63] shadow-[0_0_22px_6px_rgba(250,127,99,0.6)]" />
                    </motion.div>
                  </>
                )}

                {/* detected regions */}
                {slots.slice(0, n).map((s, i) => (
                  <AnimatePresence key={i}>
                    {i < detected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease }}
                        className="absolute z-20 rounded-md border-[1.5px] border-[#FA7F63] bg-[#FA7F63]/10"
                        style={{ left: `${s.l}%`, top: `${s.t}%`, width: `${s.w}%`, height: `${s.h}%` }}
                      >
                        <span className="absolute -top-[1.15rem] left-0 whitespace-nowrap rounded bg-[#FA7F63] px-1.5 py-px font-mono text-[8px] font-bold leading-tight text-[#022350]">
                          {list[i].label} · {confidence[i]}%
                        </span>
                        {["-left-[3px] -top-[3px]", "-right-[3px] -top-[3px]", "-bottom-[3px] -left-[3px]", "-bottom-[3px] -right-[3px]"].map((c) => (
                          <i key={c} className={`absolute h-1.5 w-1.5 bg-[#FA7F63] ${c}`} />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </motion.div>

              <div className="mx-auto mt-3 max-w-[19rem]">
                <div className="flex items-center justify-between text-[11px] font-medium text-brand-slate">
                  <span className="truncate font-mono">{sourceLabel.toLowerCase().replace(/\s+/g, "-")}-sample.pdf</span>
                  <span className={stage >= 2 ? "text-emerald-600" : "text-brand-ink"}>{stage >= 2 ? "✓ Uploaded" : "Uploading…"}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-brand-line">
                  <motion.div
                    key={`up-${run}`}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${accent}, ${CORAL})` }}
                    initial={{ width: reduce ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ---------- B: the AI core ---------- */}
          <div className="relative z-10 flex flex-col items-center gap-3 py-2">
            <div className="relative flex h-32 w-32 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[#FA7F63]/10 blur-xl" aria-hidden />
              {stage === 2 && <span className="absolute inset-0 rounded-full border border-[#FA7F63]/60 animate-ping-soft" aria-hidden />}
              <span className="spin-slow absolute inset-1 rounded-full border border-dashed border-[#022350]/25" style={{ "--spin": "14s" } as React.CSSProperties} aria-hidden />
              <span className="spin-slow-rev absolute inset-4 rounded-full border border-[#022350]/15" style={{ "--spin": "9s" } as React.CSSProperties} aria-hidden>
                <i className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#FA7F63] shadow-[0_0_10px_#FA7F63]" />
                <i className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#2f8fd0]" />
              </span>
              <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden>
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(2,35,80,0.1)" strokeWidth="3" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke={CORAL}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={289}
                  animate={{ strokeDashoffset: 289 - (289 * pct) / 100 }}
                  transition={{ duration: 0.6, ease }}
                />
              </svg>
              <div className="relative flex h-16 w-16 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#0a3a7a] to-[#022350] text-white shadow-[0_0_30px_rgba(68,160,220,0.45)] ring-1 ring-white/20">
                {stamped ? <Check className="h-6 w-6 text-emerald-400" /> : stage === 2 ? <ScanSearch className="h-6 w-6 text-[#FDB9A8]" /> : <Sparkles className="h-6 w-6 text-[#FDB9A8]" />}
                <span className="mt-0.5 font-mono text-[9px] font-semibold">{pct}%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="font-heading text-sm font-semibold text-brand-ink">TradeAI</p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-brand-accent-dark">{status}</p>
            </div>
            <div className="grid w-full max-w-[9rem] grid-cols-2 gap-2 text-center">
              <Stat k="Fields" v={`${stage === 3 ? n : detected}/${n}`} />
              <Stat k="Confidence" v={detected ? `${Math.round(confidence.slice(0, Math.max(1, detected)).reduce((a, b) => a + b, 0) / Math.max(1, detected))}%` : "–"} />
            </div>
          </div>

          {/* ---------- C: generated document on a dummy format ---------- */}
          <div className="relative z-10">
            <PanelLabel icon={<Check className="h-3.5 w-3.5" />} text="Generated" active={stage === 3} />
            <div className="relative rounded-2xl p-3">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[19rem] overflow-hidden rounded-xl bg-white shadow-lift ring-1 ring-black/5">
                <div className="flex items-start justify-between px-[6%] py-[4%] text-white" style={{ background: accent }}>
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] opacity-80">RBK / E-Docs</p>
                    <p className="font-heading text-[13px] font-semibold">{label}</p>
                  </div>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 font-mono text-[8px]">{stamped ? "READY" : stage === 3 ? "WRITING…" : "WAITING"}</span>
                </div>

                <div className="grid grid-cols-2 gap-x-2.5 gap-y-2 px-[6%] pt-[5%]">
                  {list.map((f, i) => {
                    const on = i < filled;
                    const typing = i === filled - 1 && !stamped;
                    return (
                      <div
                        key={f.label}
                        className={cn(
                          "relative rounded-md border px-2 py-1.5 transition-colors duration-300",
                          typing ? "border-[#FA7F63] bg-[#FA7F63]/10" : "border-brand-line",
                          i >= 4 && "col-span-2",
                        )}
                      >
                        <p className="font-mono text-[7px] uppercase tracking-wider text-brand-slate">{f.label}</p>
                        <div className="relative h-3.5">
                          {!on && <i className="absolute left-0 top-1.5 h-1.5 w-2/3 rounded-full bg-brand-line" aria-hidden />}
                          {on && (
                            <p className="truncate text-[11px] font-semibold leading-[14px] text-brand-ink">
                              {reduce ? f.value : <Typed text={f.value} />}
                            </p>
                          )}
                        </div>
                        {on && !typing && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 14 }} className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white">
                            <Check className="h-2.5 w-2.5" />
                          </motion.span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="absolute bottom-[5%] left-[6%] right-[6%] flex items-center justify-between">
                  <i className="h-1.5 w-1/3 rounded-full bg-brand-line" />
                  <i className="h-2.5 w-14 rounded-full" style={{ background: accent, opacity: 0.5 }} />
                </div>

                {/* watermark: tiled text + centred logo, stamps in once the document is written */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  initial={false}
                  animate={{ opacity: stamped ? 1 : 0, scale: stamped ? 1 : 1.6, rotate: stamped ? 0 : -8 }}
                  transition={{ type: "spring", stiffness: 120, damping: 14 }}
                >
                  <div className="absolute -inset-[40%] -rotate-[24deg]" style={{ backgroundImage: wmPattern }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={watermark} alt="" className="absolute left-1/2 top-1/2 w-3/5 -translate-x-1/2 -translate-y-1/2 -rotate-[24deg] opacity-[0.12]" />
                </motion.div>

                {/* shimmer sweep when the document completes */}
                {stamped && (
                  <motion.span
                    key={`shine-${run}`}
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                    initial={{ left: "-40%" }}
                    animate={{ left: "130%" }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                    style={{ transform: "skewX(-18deg)" }}
                  />
                )}
              </div>
              <div className="mx-auto mt-3 flex max-w-[19rem] items-center justify-between text-[11px]">
                <span className="text-brand-slate">{stamped ? "Review, edit, download and share" : stage === 3 ? "Writing your document…" : "Waiting for the analysis…"}</span>
                <AnimatePresence>
                  {stamped && (
                    <motion.span initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} className="rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-700">
                      ✓ Verified
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-brand-slate">
        Sample data on sample formats. Inside the portal, documents use your company details and templates.
      </p>
    </div>
  );
}

function PanelLabel({ icon, text, active }: { icon: ReactNode; text: string; active: boolean }) {
  return (
    <p className={cn("mb-2 flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-wider transition-colors duration-500", active ? "text-brand-ink" : "text-brand-slate/60")}>
      <span className={cn("flex h-6 w-6 items-center justify-center rounded-md transition-colors", active ? "bg-[#FA7F63] text-[#022350]" : "bg-brand-paper")}>{icon}</span>
      {text}
    </p>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-brand-line bg-white px-2 py-1.5">
      <p className="font-mono text-[8px] uppercase tracking-wider text-brand-slate">{k}</p>
      <p className="font-heading text-sm font-semibold text-brand-ink">{v}</p>
    </div>
  );
}

/** Types its text in, with a blinking caret while it writes. */
function Typed({ text, speed = 22 }: { text: string; speed?: number }) {
  const [k, setK] = useState(0);
  useEffect(() => {
    setK(0);
    const t = setInterval(() => {
      setK((v) => {
        if (v >= text.length) {
          clearInterval(t);
          return v;
        }
        return v + 1;
      });
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return (
    <>
      {text.slice(0, k)}
      {k < text.length && <span className="ml-px inline-block h-3 w-px translate-y-0.5 animate-pulse bg-[#FA7F63]" />}
    </>
  );
}
