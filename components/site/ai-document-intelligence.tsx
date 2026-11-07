"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ScanLine,
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RefreshCw,
  FileSearch,
  Sparkles,
  Landmark,
  Share2,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { documentTypes, analysisResult } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const docFields: Record<
  string,
  { label: string; value: string; highlight?: boolean }[]
> = {
  "Commercial Invoice": [
    { label: "Invoice No.", value: "INV-2026-0418" },
    { label: "Buyer", value: "Globex Trading Co." },
    { label: "Amount", value: "$48,500.00" },
    { label: "Currency", value: "USD" },
  ],
  "Packing List": [
    { label: "Invoice Ref", value: "INV-2026-0418" },
    { label: "Packages", value: "120 cartons" },
    { label: "Gross Weight", value: "2,450 kg" },
    { label: "Shipping Date", value: "2026-11-02" },
  ],
  "Bill of Lading": [
    { label: "B/L No.", value: "BL-2026-0892" },
    { label: "Consignee", value: "Globex Trading Co." },
    { label: "Amount", value: "$48,500.00" },
    { label: "Shipping Date", value: "2026-11-04" },
  ],
  "Letter of Credit": [
    { label: "LC No.", value: "LC-2026-5531" },
    { label: "Consignee", value: "Globex Trdg. Co." },
    { label: "Currency", value: "USD" },
    { label: "Expiry", value: "2026-12-15" },
  ],
};

/* Stage 3 sample data — per-product finance readiness */
const readiness = [
  {
    name: "Pre-shipment finance",
    pct: 92,
    status: "ready" as const,
    missing: [] as string[],
  },
  {
    name: "Post-shipment finance",
    pct: 84,
    status: "ready" as const,
    missing: [] as string[],
  },
  {
    name: "LC discounting",
    pct: 68,
    status: "partial" as const,
    missing: ["Certificate of Origin", "LC amendment"],
  },
  {
    name: "Buyer credit",
    pct: 41,
    status: "blocked" as const,
    missing: ["KYC of buyer", "Insurance certificate"],
  },
];

export function AIDocumentIntelligence() {
  const [phase, setPhase] = useState<
    "idle" | "scanning" | "analyzing" | "complete"
  >("idle");
  const [activeDocIdx, setActiveDocIdx] = useState(0);

  useEffect(() => {
    if (phase !== "scanning") return;
    if (activeDocIdx < documentTypes.length - 1) {
      const timer = setTimeout(() => setActiveDocIdx((i) => i + 1), 800);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setPhase("analyzing"), 800);
    return () => clearTimeout(timer);
  }, [phase, activeDocIdx]);

  useEffect(() => {
    if (phase !== "analyzing") return;
    const timer = setTimeout(() => setPhase("complete"), 2000);
    return () => clearTimeout(timer);
  }, [phase]);

  const start = () => {
    setPhase("scanning");
    setActiveDocIdx(0);
  };

  const reset = () => {
    setPhase("idle");
    setActiveDocIdx(0);
  };

  const readinessTone = {
    ready: {
      bar: "bg-emerald-500",
      chip: "bg-emerald-50 text-emerald-700",
      label: "Ready",
    },
    partial: {
      bar: "bg-amber-500",
      chip: "bg-amber-50 text-amber-700",
      label: "Missing items",
    },
    blocked: {
      bar: "bg-rose-500",
      chip: "bg-rose-50 text-rose-700",
      label: "Not ready",
    },
  };

  return (
    <section
      id="ai-intelligence"
      className="relative py-14 sm:py-20 bg-brand-paper overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="AI Document Intelligence · Step 1 of 3"
          title={
            <>
              Watch AI{" "}
              <span className="gradient-text">scan, extract & cross-check</span>{" "}
              every trade document
            </>
          }
          description="Documents are uploaded, fields extracted, related documents cross-checked against trade history, and discrepancies flagged. The same scan feeds the LC check (Step 2) and your finance readiness report (Step 3)."
        />


        <div className="mt-10 grid gap-8 lg:grid-cols-2 items-center">
          {/* Left: Document carousel */}
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              {documentTypes.map((doc, i) => (
                <button
                  key={doc.short}
                  onClick={() => {
                    setActiveDocIdx(i);
                    if (phase === "idle") setPhase("scanning");
                  }}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-all",
                    activeDocIdx === i
                      ? "text-white"
                      : "bg-white/60 text-brand-slate border border-brand-paleblue",
                  )}
                  style={activeDocIdx === i ? { background: doc.color } : {}}
                >
                  {doc.short}
                </button>
              ))}
            </div>

            <div className="relative h-80 rounded-2xl border-2 border-brand-paleblue bg-gradient-to-br from-brand-paleblue/10 via-white to-brand-lavender/10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDocIdx}
                  initial={{ opacity: 0, rotateY: -20, x: 40 }}
                  animate={{ opacity: 1, rotateY: 0, x: 0 }}
                  exit={{ opacity: 0, rotateY: 20, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center p-8"
                  style={{ perspective: "1000px" }}
                >
                  <div className="w-64 rounded-xl border-2 bg-white doc-shadow overflow-hidden">
                    <div
                      className="h-2"
                      style={{
                        background: `linear-gradient(90deg, ${documentTypes[activeDocIdx].color}, ${documentTypes[activeDocIdx].color}80)`,
                      }}
                    />
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{
                              background: documentTypes[activeDocIdx].color,
                            }}
                          />
                          <span className="text-sm font-bold text-brand-ink">
                            {documentTypes[activeDocIdx].name}
                          </span>
                        </div>
                        <FileText className="h-4 w-4 text-brand-slate" />
                      </div>
                      <div className="space-y-2">
                        {(
                          docFields[documentTypes[activeDocIdx].name] || []
                        ).map((field, fi) => (
                          <motion.div
                            key={field.label}
                            initial={{ opacity: 0.3 }}
                            animate={{
                              opacity: 1,
                              background:
                                phase === "scanning" || phase === "analyzing"
                                  ? ["#f0f7ff", "#e2ecfa", "#f0f7ff"]
                                  : "#ffffff",
                            }}
                            transition={{
                              duration: 0.5,
                              delay: fi * 0.1,
                              repeat: phase === "scanning" ? Infinity : 0,
                            }}
                            className="flex items-center justify-between rounded-lg px-2.5 py-1.5"
                          >
                            <span className="text-xs text-brand-slate">
                              {field.label}
                            </span>
                            <span className="font-mono text-xs font-medium text-brand-ink">
                              {field.value}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {(phase === "scanning" || phase === "analyzing") && (
                <motion.div
                  className="absolute inset-x-0 h-24 pointer-events-none"
                  animate={{ y: [-20, 300, -20] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(96,165,250,0.3), transparent)",
                  }}
                />
              )}

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm border border-brand-paleblue px-3 py-1 shadow-soft">
                  {phase === "idle" && (
                    <FileSearch className="h-3.5 w-3.5 text-brand-slate" />
                  )}
                  {phase === "scanning" && (
                    <ScanLine className="h-3.5 w-3.5 text-brand-blue animate-pulse" />
                  )}
                  {phase === "analyzing" && (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-brand-blue/30 border-t-brand-blue" />
                  )}
                  {phase === "complete" && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  )}
                  <span className="text-xs font-medium text-brand-ink">
                    {phase === "idle" && "Ready to scan"}
                    {phase === "scanning" &&
                      `Scanning ${documentTypes[activeDocIdx].name}…`}
                    {phase === "analyzing" && "Cross-checking & comparing…"}
                    {phase === "complete" && "Analysis complete"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={start}
                disabled={phase === "scanning" || phase === "analyzing"}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-all hover:bg-brand-blue/90 disabled:opacity-50"
              >
                <ScanLine className="h-4 w-4" />
                {phase === "complete" ? "Re-run Analysis" : "Start AI Scan"}
              </button>
              {phase === "complete" && (
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-paleblue bg-white px-4 py-2.5 text-sm font-medium text-brand-slate hover:bg-brand-paleblue/30"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Right: Analysis process & results */}
          <div className="space-y-4">
            <div className="rounded-xl border border-brand-paleblue bg-white/80 p-4">
              <h4 className="font-heading text-sm font-semibold text-brand-ink mb-3">
                Analysis Process
              </h4>
              <div className="space-y-3">
                {[
                  {
                    label: "Document upload & identification",
                    desc: "AI identifies document type and structure",
                  },
                  {
                    label: "Field extraction",
                    desc: "Relevant fields are extracted from each document",
                  },
                  {
                    label: "Cross-checking between documents",
                    desc: "Related trade documents are compared",
                  },
                  {
                    label: "Comparison with trade history",
                    desc: "Previous trade documents referenced where available",
                  },
                  {
                    label: "Discrepancy identification",
                    desc: "Inconsistent, missing, or mismatched info flagged",
                  },
                ].map((step, i) => {
                  const stepActive =
                    phase !== "idle" &&
                    i <=
                      (phase === "scanning"
                        ? activeDocIdx
                        : documentTypes.length - 1);
                  const stepDone =
                    phase === "complete" || (phase === "analyzing" && i < 4);
                  return (
                    <div key={step.label} className="flex items-start gap-3">
                      <div
                        className={cn(
                          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all",
                          stepDone
                            ? "bg-success text-white"
                            : stepActive
                              ? "bg-brand-blue text-white"
                              : "bg-brand-paleblue text-brand-slate",
                        )}
                      >
                        {stepDone ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          i + 1
                        )}
                      </div>
                      <div>
                        <p
                          className={cn(
                            "text-sm font-medium",
                            stepActive || stepDone
                              ? "text-brand-ink"
                              : "text-brand-slate",
                          )}
                        >
                          {step.label}
                        </p>
                        <p className="text-xs text-brand-slate">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {phase === "complete" && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-brand-paleblue bg-white/90 p-4"
              >
                <h4 className="font-heading text-sm font-semibold text-brand-ink mb-3">
                  Combined Analysis Report
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  <div className="rounded-lg bg-brand-mint/30 p-3 text-center">
                    <CheckCircle2 className="mx-auto h-5 w-5 text-success mb-1" />
                    <p className="text-lg font-bold text-success">
                      {analysisResult.matched.length}
                    </p>
                    <p className="text-[10px] text-brand-slate">Matched</p>
                  </div>
                  <div className="rounded-lg bg-brand-peach/40 p-3 text-center">
                    <AlertTriangle className="mx-auto h-5 w-5 text-warning mb-1" />
                    <p className="text-lg font-bold text-warning">
                      {analysisResult.warnings.length}
                    </p>
                    <p className="text-[10px] text-brand-slate">Warnings</p>
                  </div>
                  <div className="rounded-lg bg-brand-pink/40 p-3 text-center">
                    <XCircle className="mx-auto h-5 w-5 text-destructive mb-1" />
                    <p className="text-lg font-bold text-destructive">
                      {analysisResult.discrepancies.length}
                    </p>
                    <p className="text-[10px] text-brand-slate">
                      Discrepancies
                    </p>
                  </div>
                  <div className="rounded-lg bg-brand-paper border border-brand-paleblue/40 p-3 text-center">
                    <span className="mx-auto mb-1 block h-5 w-5 rounded-full border-2 border-brand-slate" />
                    <p className="text-lg font-bold text-brand-slate">
                      {analysisResult.unchecked.length}
                    </p>
                    <p className="text-[10px] text-brand-slate">Unchecked</p>
                  </div>
                </div>
                <p className="text-xs text-brand-slate mt-3 text-center">
                  Sample results for demonstration — AI assists and does not
                  guarantee accuracy.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Stage 3 hand-off — Finance readiness report → Lender quotes   */}
        {/* ------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl border border-brand-paleblue bg-white p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-brand-slate">
                Step 3 of 3 · hand-off
              </p>
              <h3 className="mt-1 font-heading text-xl font-semibold text-brand-ink">
                The same scan becomes your{" "}
                <span className="gradient-text">finance readiness report</span>
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-brand-slate">
                No re-upload. When you apply for finance, the trade documents
                already scanned here are checked against each product&apos;s
                criteria and shared with participating lenders — who then issue
                quotations against the application.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-mint/40 px-3 py-1 text-xs font-semibold text-brand-ink">
              <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
              Lender-facing
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {readiness.map((r, i) => {
              const tone = readinessTone[r.status];
              return (
                <div
                  key={r.name}
                  className="rounded-xl border border-brand-paleblue/60 bg-brand-paper/50 p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-brand-ink">
                      {r.name}
                    </p>
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold",
                        tone.chip,
                      )}
                    >
                      {r.pct}% · {tone.label}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                    <motion.div
                      className={cn("h-full rounded-full", tone.bar)}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${r.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.08 }}
                    />
                  </div>
                  {r.missing.length > 0 && (
                    <p className="mt-1.5 text-[11px] text-brand-slate">
                      Missing: {r.missing.join(", ")}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand-paleblue/60 bg-brand-lavender/10 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-brand-slate">
              <Landmark className="h-4 w-4 text-brand-violet" />
              Shared with{" "}
              <strong className="text-brand-ink">
                4 participating lenders
              </strong>{" "}
              · quotes pending
            </div>
            <a
              href="#lender-quotations"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:underline"
            >
              <Share2 className="h-4 w-4" />
              See lender quotations
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
