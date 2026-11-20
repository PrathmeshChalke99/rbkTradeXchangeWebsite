"use client";

/**
 * components/pages/report-journey.tsx
 *
 * One interactive section for the AI features. Pick a step (or let it auto-play):
 * the animated report on the right shows what the AI does, and the PDF bar under it
 * lets visitors preview and download the actual PDF report for that step.
 *
 * To use your own PDFs: replace the files in /public/reports/ (keep the names), or
 * change the `pdf` paths in `steps` below.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Download,
  Eye,
  FileSearch,
  FileText,
  Handshake,
  ScrollText,
  Sparkles,
  UploadCloud,
  UserCheck,
  Wand2,
} from "lucide-react";
import {
  DocCheckVisual,
  DocPipelineVisual,
  FinanceReadinessVisual,
  QuoteVisual,
} from "@/components/pages/home-visuals";
import { Tilt3D } from "@/components/pages/tilt-3d";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const DURATION = 10000; // long enough for each visual's own sequence to finish
const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    id: "check",
    icon: FileSearch,
    title: "Cross-check documents",
    text: "Fields are extracted and compared across every document, then labelled by severity.",
    cta: "Explore document scanning",
    href: "/platform/ai-document-analysis",
    Visual: DocCheckVisual,
    pdf: {
      file: "/reports/sample-document-check.pdf",
      name: "Document cross-check report",
      what: "A one-page summary of every field the AI compared, with a status for each.",
    },
  },
  {
    id: "lc",
    icon: ScrollText,
    title: "Catch LC discrepancies",
    text: "Every document is checked against the LC terms before the bank sees it.",
    cta: "See how LC checking works",
    href: "/platform/lc-discrepancy-check",
    Visual: DocPipelineVisual,
    pdf: {
      file: "/reports/sample-lc-discrepancy.pdf",
      name: "LC discrepancy report",
      what: "Each LC clause next to what your documents say, so you can fix problems first.",
    },
  },
  {
    id: "ready",
    icon: Sparkles,
    title: "Get a readiness report",
    text: "Your uploads are reused to show what's complete and what a lender will flag.",
    cta: "See the readiness report",
    href: "/platform/finance-readiness",
    Visual: FinanceReadinessVisual,
    pdf: {
      file: "/reports/sample-finance-readiness.pdf",
      name: "Finance readiness report",
      what: "A score per finance product and a list of anything still missing. Shared with lenders.",
    },
  },
  {
    id: "quotes",
    icon: Handshake,
    title: "Compare lender quotes",
    text: "Lenders quote on your verified application. You accept or decline.",
    cta: "See how quotations work",
    href: "/platform/lender-quotations",
    Visual: QuoteVisual,
    pdf: {
      file: "/reports/sample-lender-quotes.pdf",
      name: "Lender quotations summary",
      what: "Rate, tenure and amount from each lender, side by side.",
    },
  },
];

type Pdf = (typeof steps)[number]["pdf"];

function PdfBar({ pdf }: { pdf: Pdf }) {
  return (
    <div className="mt-5 rounded-2xl border border-brand-line bg-white p-4 shadow-soft">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <span className="relative flex h-14 w-11 shrink-0 items-center justify-center rounded-md border border-brand-line bg-brand-paper">
            <span
              className="absolute right-0 top-0 h-3 w-3 rounded-bl-md bg-brand-accent"
              aria-hidden
            />
            <FileText className="h-5 w-5 text-brand-ink" />
            <span className="absolute -bottom-2 rounded bg-brand-navy px-1 font-mono text-[8px] font-semibold text-white">
              PDF
            </span>
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-brand-accent-dark">
              Sample PDF report
            </p>
            <p className="mt-0.5 text-[15px] font-semibold text-brand-ink">
              {pdf.name}
            </p>
            <p className="text-[13px] leading-snug text-brand-slate">
              {pdf.what}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className="btn-primary">
                <Eye className="h-4 w-4" /> Preview
              </button>
            </DialogTrigger>
            <DialogContent className="w-[96vw] max-w-4xl gap-0 overflow-hidden p-0 sm:rounded-2xl">
              <div className="flex items-center justify-between gap-3 border-b border-brand-line bg-white px-5 py-3 pr-12">
                <div className="min-w-0">
                  <DialogTitle className="truncate text-base font-semibold text-brand-ink">
                    {pdf.name}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-brand-slate">
                    Sample report with illustrative data.
                  </DialogDescription>
                </div>
                <a href={pdf.file} download className="btn-secondary shrink-0">
                  <Download className="h-4 w-4" /> Download
                </a>
              </div>

              <object
                data={`${pdf.file}#view=FitH`}
                type="application/pdf"
                aria-label={pdf.name}
                className="h-[78vh] w-full bg-brand-paper"
              >
                <div className="flex h-[78vh] flex-col items-center justify-center gap-4 bg-brand-paper p-6 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-soft">
                    <FileText className="h-7 w-7 text-brand-accent-dark" />
                  </span>
                  <p className="max-w-sm text-sm text-brand-slate">
                    Your browser can&apos;t show PDFs inside the page. Open the
                    report in a new tab or download it.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <a
                      href={pdf.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <Eye className="h-4 w-4" /> Open in new tab
                    </a>
                    <a href={pdf.file} download className="btn-secondary">
                      <Download className="h-4 w-4" /> Download
                    </a>
                  </div>
                </div>
              </object>
            </DialogContent>
          </Dialog>
          <a
            href={pdf.file}
            download
            className="btn-secondary"
            aria-label={`Download ${pdf.name}`}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </div>

      <ol className="mt-4 grid gap-2 border-t border-brand-line pt-4 text-[12.5px] text-brand-slate sm:grid-cols-3">
        {[
          { i: UploadCloud, t: "You upload your trade documents" },
          { i: Wand2, t: "The AI reads them and writes this report" },
          { i: UserCheck, t: "Your team reviews it and decides" },
        ].map((s, k) => (
          <li key={s.t} className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-accent-soft text-brand-accent-dark">
              <s.i className="h-3.5 w-3.5" />
            </span>
            <span>
              <b className="mr-1 font-mono text-[11px] text-brand-accent-dark">
                {k + 1}
              </b>
              {s.t}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ReportJourney() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const go = useCallback((n: number) => setI(n % steps.length), []);
  const running = inView && !hover && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => go(i + 1), DURATION);
    return () => clearTimeout(t);
  }, [i, running, go]);

  const Active = steps[i].Visual;

  return (
    <div
      ref={ref}
      className="grid items-start gap-8 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-14"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ul
        role="tablist"
        aria-label="Platform steps"
        className="space-y-2 lg:pt-4"
      >
        {steps.map((s, k) => {
          const active = k === i;
          const Icon = s.icon;
          return (
            <li key={s.id}>
              <button
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setI(k)}
                className={cn(
                  "group relative w-full overflow-hidden rounded-2xl border p-4 text-left outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand-blue",
                  active
                    ? "border-brand-line bg-white shadow-lift"
                    : "border-transparent hover:bg-brand-paper",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                      active
                        ? "scale-105 bg-brand-accent text-brand-navy shadow-glow-coral"
                        : "bg-brand-paper text-brand-slate group-hover:bg-brand-accent-soft",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand-slate/70">
                      Step {k + 1}
                    </p>
                    <p
                      className={cn(
                        "text-[15px] font-semibold transition-colors",
                        active ? "text-brand-ink" : "text-brand-slate",
                      )}
                    >
                      {s.title}
                    </p>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm leading-relaxed text-brand-slate">
                        {s.text}
                      </p>
                      <Link
                        href={s.href}
                        className="link-arrow mt-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {s.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>

                {active && (
                  <span className="absolute inset-x-4 bottom-0 h-[3px] overflow-hidden rounded-full bg-brand-line">
                    <motion.span
                      key={`${i}-${running}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-brand-accent"
                      initial={{ width: running ? "0%" : "100%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: running ? DURATION / 1000 : 0,
                        ease: "linear",
                      }}
                    />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="relative min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={steps[i].id}
            role="tabpanel"
            initial={{ opacity: 0, y: 28, rotateX: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.98 }}
            transition={{ duration: 0.55, ease }}
            style={{ transformPerspective: 1200 }}
          >
            <Tilt3D max={4} glare={false}>
              <Active />
            </Tilt3D>
            <PdfBar pdf={steps[i].pdf} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
