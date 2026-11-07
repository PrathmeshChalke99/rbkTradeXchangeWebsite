"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  FileText,
  Globe2,
  Handshake,
  ScanLine,
  Truck,
  XCircle,
} from "lucide-react";
import { P } from "@/lib/photos";
import { IMG } from "@/lib/content";
import { Photo } from "./photo";
import { cn } from "@/lib/utils";

const DURATION = 7000;
const ease = [0.16, 1, 0.3, 1] as const;

type Slide = {
  id: string;
  tab: string;
  icon: typeof Building2;
  eyebrow: string;
  title: string;
  accent: string;
  light: string;
  points: { h: string; p: string }[];
  cta: { label: string; href: string };
  /* Single hero image + its fallback */
  image: { src: string; fallback: string; alt: string };
  /* Section to smooth-scroll to when the CTA is clicked on this page */
  scrollTo?: string;
};

const slides: Slide[] = [
  {
    id: "trade",
    tab: "Trade Finance",
    icon: Globe2,
    eyebrow: "International Trade Finance",
    title: "Finance every shipment, from first order to final payment",
    accent: "#1d5fd6",
    light: "#8cc8f0",
    points: [
      {
        h: "Export finance",
        p: "Pre-shipment, post-shipment and invoice discounting.",
      },
      {
        h: "Import finance",
        p: "Buyer credit and supplier credit in multiple currencies.",
      },
      {
        h: "LCs & guarantees",
        p: "Discounting, confirmation, issuance, SBLC and BG.",
      },
    ],
    cta: {
      label: "Explore trade finance",
      href: "/finance/international-trade-finance",
    },
    image: {
      src: P.shipAerial,
      fallback: IMG.hero,
      alt: "Container ship at sea",
    },
  },
  {
    id: "business",
    tab: "Business Finance",
    icon: Building2,
    eyebrow: "Business / Corporate Finance",
    title: "Fund growth with working capital, loans and structured debt",
    accent: "#4c5fd5",
    light: "#a9b3f3",
    points: [
      {
        h: "Working capital",
        p: "CC, OD and WCL limits that flex with your cash cycle.",
      },
      {
        h: "Term & asset loans",
        p: "Machinery, term loans and LAP over longer tenures.",
      },
      {
        h: "Structured funding",
        p: "ECB, project finance and venture debt for bigger needs.",
      },
    ],
    cta: {
      label: "Explore business finance",
      href: "/finance/corporate-finance",
    },
    image: {
      src: P.financialDistrict,
      fallback: IMG.workingCapital,
      alt: "Financial district towers",
    },
  },
  {
    id: "supply",
    tab: "Supply Chain",
    icon: Truck,
    eyebrow: "Domestic Supply Chain Finance",
    title: "Keep suppliers, dealers and distributors funded",
    accent: "#0f9a8a",
    light: "#6fdccb",
    points: [
      {
        h: "Supplier finance",
        p: "SID / PID, vendor discounting and dealer finance.",
      },
      {
        h: "Invoice finance",
        p: "Cash from unpaid invoices and bills, no hard collateral.",
      },
      {
        h: "Anchor programmes",
        p: "Vendor and distributor programmes built on your credit.",
      },
    ],
    cta: {
      label: "Explore supply chain finance",
      href: "/finance/domestic-supply-chain-finance",
    },
    image: {
      src: P.warehouseWide,
      fallback: IMG.supplyChain,
      alt: "Warehouse with stocked shelves",
    },
  },
  {
    id: "edocs",
    tab: "E-Docs Studio",
    icon: FileText,
    eyebrow: "E-Docs Studio",
    title: "Trade paperwork that starts ready",
    accent: "#0b78bf",
    light: "#7cc3ee",
    points: [
      {
        h: "Six templates",
        p: "Proforma, contracts, PO, export invoice and packing list.",
      },
      { h: "Live preview", p: "Watch the document update as you type." },
      {
        h: "Pre-filled data",
        p: "Company and partner details flow in automatically.",
      },
    ],
    cta: { label: "Try an e-doc template", href: "/documents" },
    image: {
      src: P.chartNotes,
      fallback: IMG.eDocs,
      alt: "Notes on a business chart",
    },
  },
  {
    id: "lenders",
    tab: "Lender Quotes",
    icon: Handshake,
    eyebrow: "AI Analysis & Lender Quotations",
    title: "Check documents with AI, then compare lender quotes",
    accent: "#b7700b",
    light: "#f3c46b",
    points: [
      {
        h: "AI document checks",
        p: "Fields extracted and cross-checked, discrepancies flagged.",
      },
      {
        h: "Quotes side by side",
        p: "Participating lenders respond independently.",
      },
      {
        h: "You decide",
        p: "Accept or reject, with a human always in the loop.",
      },
    ],
    cta: {
      label: "See lender quotations",
      href: "/platform/lender-quotations",
    },
    image: {
      src: "/images/quote.png",
      fallback: IMG.aiDocs,
      alt: "Analytics on a tablet",
    },
    scrollTo: "lender-quotations",
  },
];

const checks = [
  { doc: "Commercial invoice", state: "ok" as const, note: "Matched" },
  { doc: "Packing list", state: "ok" as const, note: "Matched" },
  {
    doc: "Bill of lading",
    state: "warn" as const,
    note: "Date differs by 2 days",
  },
  { doc: "Letter of credit", state: "err" as const, note: "Consignee address" },
];

function SampleCheckCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9, ease }}
      className="w-[290px] rounded-2xl border border-white/70 bg-white/95 p-4 text-brand-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-semibold">
          <ScanLine className="h-4 w-4 text-brand-blue" />
          AI document check
        </span>
        <span className="rounded-full bg-brand-paper px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-slate">
          Sample
        </span>
      </div>
      <p className="mt-1 font-mono text-[11px] text-brand-slate">
        Export · INV-2026-0418
      </p>
      <ul className="mt-3 space-y-1.5">
        {checks.map((c, i) => (
          <motion.li
            key={c.doc}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.18, duration: 0.5, ease }}
            className="flex items-center gap-2.5 rounded-lg bg-brand-paper/80 px-2.5 py-1.5 text-xs"
          >
            {c.state === "ok" && (
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-turquoise" />
            )}
            {c.state === "warn" && (
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#b7700b]" />
            )}
            {c.state === "err" && (
              <XCircle className="h-3.5 w-3.5 shrink-0 text-rose-600" />
            )}
            <span className="flex-1 font-medium">{c.doc}</span>
            <span
              className={cn(
                "text-[11px]",
                c.state === "ok"
                  ? "text-brand-slate"
                  : c.state === "warn"
                    ? "text-[#9a5d08]"
                    : "text-rose-700",
              )}
            >
              {c.note}
            </span>
          </motion.li>
        ))}
      </ul>
      <p className="mt-3 border-t border-brand-line pt-2 text-[11px] text-brand-slate">
        Flags are suggestions for your team to review.
      </p>
    </motion.div>
  );
}

/* Smooth-scroll helper (falls back to hash navigation) */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.hash = id;
  }
}

export function HeroCarousel() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && !!prefersReduced;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const s = slides[i];
  const go = useCallback(
    (n: number) => setI((n + slides.length) % slides.length),
    [],
  );
  const running = !paused && !manualPause && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => go(i + 1), DURATION);
    return () => clearTimeout(t);
  }, [i, running, go]);

  const d = reduce ? 0 : 1;

  /* CTA handler: scroll if this slide has a scrollTo target, else follow the link */
  const onCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (s.scrollTo && document.getElementById(s.scrollTo)) {
      e.preventDefault();
      scrollToId(s.scrollTo);
    }
  };

  return (
    <section
      className="surface-dark on-dark noise relative overflow-hidden pb-10 pt-24 sm:pt-28 lg:pb-12 lg:pt-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Platform highlights"
    >
      {/* ── BACKGROUND LAYERS ── */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(120% 80% at 15% 0%, #0d2246 0%, #081733 45%, #050f24 100%)",
        }}
      />
      <motion.div
        className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full blur-[110px]"
        animate={{ backgroundColor: `${s.accent}33` }}
        transition={{ duration: 1.4, ease }}
        aria-hidden
      />
      <motion.div
        className="absolute -right-32 top-24 h-[34rem] w-[34rem] rounded-full blur-[110px]"
        animate={{ backgroundColor: `${s.light}22` }}
        transition={{ duration: 1.4, ease }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-1/3 h-[26rem] w-[26rem] rounded-full bg-[#f3c46b]/10 blur-[120px]"
        aria-hidden
      />
      <div className="grid-lines absolute inset-0 opacity-[0.06]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,15,36,0.35) 0%, transparent 25%, transparent 70%, rgba(5,15,36,0.55) 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative min-h-[660px] sm:min-h-[640px] lg:min-h-[520px]"
          onPanEnd={(_, info) => {
            if (info.offset.x < -60) go(i + 1);
            else if (info.offset.x > 60) go(i - 1);
          }}
          style={{ touchAction: "pan-y" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={s.id}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-14"
              initial="hidden"
              animate="show"
              exit="exit"
              aria-live="polite"
            >
              {/* TEXT */}
              <div>
                <div
                  className="mb-5 flex items-center gap-2"
                  role="tablist"
                  aria-label="Choose hero slide"
                >
                  {slides.map((sl, k) => (
                    <button
                      key={sl.id}
                      type="button"
                      role="tab"
                      aria-selected={k === i}
                      aria-label={`Show ${sl.tab} slide`}
                      onClick={() => go(k)}
                      className="group flex h-5 items-center justify-center rounded-full px-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#8cc8f0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#081733]"
                    >
                      {k === i ? (
                        <span className="relative block h-1.5 w-5 overflow-hidden rounded-full bg-white/25">
                          <motion.span
                            key={`${i}-${running}`}
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{ backgroundColor: sl.light }}
                            initial={{ width: "0%" }}
                            animate={{ width: running ? "100%" : "0%" }}
                            transition={{
                              duration: running ? DURATION / 1000 : 0,
                              ease: "linear",
                            }}
                          />
                        </span>
                      ) : (
                        <span className="block h-1.5 w-1.5 rounded-full bg-white/35 transition-all duration-300 group-hover:scale-125 group-hover:bg-white/70" />
                      )}
                    </button>
                  ))}
                </div>

                <motion.p
                  className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: s.light }}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0 },
                    exit: { opacity: 0 },
                  }}
                  transition={{ duration: 0.5 * d, ease }}
                >
                  <span
                    className="inline-block h-1 w-6 rounded-full"
                    style={{ backgroundColor: s.light }}
                  />
                  {s.eyebrow}
                </motion.p>

                <h1 className="text-display font-semibold text-white">
                  {s.title.split(" ").map((w, k) => (
                    <span
                      key={k}
                      className="inline-block overflow-hidden pb-[0.08em] align-top"
                    >
                      <motion.span
                        className="mr-[0.25em] inline-block"
                        variants={{
                          hidden: { y: "105%" },
                          show: { y: 0 },
                          exit: { opacity: 0, y: "-30%" },
                        }}
                        transition={{
                          duration: 0.7 * d,
                          delay: d * (0.05 + k * 0.04),
                          ease,
                        }}
                      >
                        {w}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                  {s.points.map((p, k) => (
                    <motion.li
                      key={p.h}
                      className="relative rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
                      variants={{
                        hidden: { opacity: 0, y: 14 },
                        show: { opacity: 1, y: 0 },
                        exit: { opacity: 0 },
                      }}
                      transition={{
                        duration: 0.55 * d,
                        delay: d * (0.45 + k * 0.12),
                        ease,
                      }}
                    >
                      <span
                        className="absolute left-0 top-4 h-6 w-[2px] rounded-full"
                        style={{ backgroundColor: s.light }}
                        aria-hidden
                      />
                      <span
                        className="font-mono text-[11px]"
                        style={{ color: s.light }}
                      >
                        0{k + 1}
                      </span>
                      <b className="mt-1 block font-heading text-sm font-semibold text-white">
                        {p.h}
                      </b>
                      <span className="mt-1 block text-[13px] leading-snug text-white/60">
                        {p.p}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="mt-8 flex flex-wrap gap-3"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0 },
                    exit: { opacity: 0 },
                  }}
                  transition={{ duration: 0.5 * d, delay: d * 0.85, ease }}
                >
                  <Link
                    href={s.cta.href}
                    onClick={onCtaClick}
                    className="btn-primary btn-lg"
                  >
                    {s.cta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/signup" className="btn-ghost-dark btn-lg">
                    Create free account
                  </Link>
                </motion.div>
              </div>

              {/* SINGLE FLOATING IMAGE */}
              <div className="relative">
                {/* ambient glow behind the image */}
                <motion.div
                  className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] blur-3xl"
                  style={{ backgroundColor: `${s.light}22` }}
                  animate={reduce ? undefined : { opacity: [0.6, 0.9, 0.6] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  aria-hidden
                />

                <motion.div
                  key={s.image.src}
                  className="relative overflow-hidden rounded-[1.6rem] ring-1 ring-white/15"
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8 * d, ease }}
                >
                  {/* floating effect — slow vertical drift */}
                  <motion.div
                    className="relative aspect-[4/3] w-full"
                    animate={reduce ? undefined : { y: [0, -8, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Photo
                      src={s.image.src}
                      fallback={s.image.fallback}
                      alt={s.image.alt}
                      priority={i === 0}
                    />
                    {/* soft bottom gradient for depth */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050f24]/50 via-transparent to-transparent" />
                    {/* tab label pill */}
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-navy backdrop-blur">
                      {s.tab}
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* <div className="pointer-events-none absolute bottom-0 left-[50%] hidden xl:block">
            <div className="motion-safe:animate-float-y">
              <SampleCheckCard />
            </div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
