"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe2,
  Handshake,
  Pause,
  Play,
  Truck,
} from "lucide-react";
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

  hl: number;
  subtitle: string;
  accent: string;
  light: string;

  chips?: string[];
  points: { h: string; p: string }[];
  cta: { label: string; href: string };
  image: { src: string; fallback: string; alt: string };
  scrollTo?: string;
};

const slides: Slide[] = [
  {
    id: "trade",
    tab: "Trade Finance",
    icon: Globe2,
    eyebrow: "Trade. Finance. Grow.",
    title: "Unified Business Finance & Trade Ecosystem",
    hl: 3,
    subtitle:
      "From financing your trade transactions to managing business operations and accessing growth capital, RBK TradeXchange connects businesses with the financial solutions, technology and networks they need to grow.",
    accent: "#C9482A",
    light: "#FDB9A8",
    chips: ["Pre-shipment", "Post-shipment", "LC discounting", "Buyer credit"],
    points: [],
    cta: {
      label: "Explore trade finance",
      href: "/finance/international-trade-finance",
    },
    image: {
      src: "/images/home/hero-trade-finance.svg",
      fallback: IMG.hero,
      alt: "Container ship carrying export cargo with an export invoice",
    },
  },
  {
    id: "business",
    tab: "Business Finance",
    icon: Building2,
    eyebrow: "Business / Corporate Finance",
    subtitle: "",
    title: "Fund growth with working capital, loans and structured debt",
    hl: 5,
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
      src: "/images/home/hero-business-finance.svg",
      fallback: IMG.workingCapital,
      alt: "Office towers beside a rising growth chart and coins",
    },
  },
  {
    id: "supply",
    tab: "Supply Chain",
    icon: Truck,
    eyebrow: "Domestic Supply Chain Finance",
    subtitle: "",
    title: "Keep suppliers, dealers and distributors funded",
    hl: 3,
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
      src: "/images/home/hero-supply-chain.svg",
      fallback: IMG.supplyChain,
      alt: "Warehouse and delivery truck with an invoice",
    },
  },
  {
    id: "edocs",
    tab: "E-Docs Studio",
    icon: FileText,
    eyebrow: "E-Docs Studio",
    subtitle: "",
    title: "Trade paperwork that starts ready",
    hl: 3,
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
      src: "/images/home/hero-edocs.svg",
      fallback: IMG.eDocs,
      alt: "Proforma invoice, purchase order and sales contract",
    },
  },
  {
    id: "lenders",
    tab: "Lender Quotes",
    icon: Handshake,
    eyebrow: "AI Analysis & Lender Quotations",
    subtitle: "",
    title: "Check documents with AI, then compare lender quotes",
    hl: 4,
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
      src: "/images/home/hero-lender-quotes.svg",
      fallback: IMG.aiDocs,
      alt: "Bank and three lender quotations side by side",
    },
    scrollTo: "lender-quotations",
  },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.hash = id;
  }
}

const pad = (n: number) => String(n).padStart(2, "0");

export function HeroCarousel() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && !!prefersReduced;

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });

  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false); // hover / focus
  const [manualPause, setManualPause] = useState(false); // user pause button
  const s = slides[i];
  const go = useCallback(
    (n: number) => setI((n + slides.length) % slides.length),
    [],
  );

  const running = !paused && !manualPause && !reduce && inView;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => go(i + 1), DURATION);
    return () => clearTimeout(t);
  }, [i, running, go]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * -22);
    my.set(((e.clientY - r.top) / r.height - 0.5) * -14);
  };

  const d = reduce ? 0 : 1;

  const onCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (s.scrollTo && document.getElementById(s.scrollTo)) {
      e.preventDefault();
      scrollToId(s.scrollTo);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(i + 1);
    else if (e.key === "ArrowLeft") go(i - 1);
  };

  const words = s.title.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white pb-8 pt-24 sm:pt-28 lg:pb-10 lg:pt-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        mx.set(0);
        my.set(0);
      }}
      onMouseMove={onMove}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
      aria-roledescription="carousel"
      aria-label="Platform highlights"
    >
      <div className="absolute inset-0 bg-white" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(rgba(15,23,42,0.07) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 70% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 70% 40%, black 20%, transparent 75%)",
        }}
      />
      <AnimatePresence>
        <motion.div
          key={`bg-${s.id}`}
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1 * d }}
        >
          <div
            className="absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${s.light}, transparent 70%)`,
            }}
          />
          <div
            className="absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full opacity-10 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${s.accent}, transparent 70%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative min-h-[660px] sm:min-h-[640px] lg:min-h-[560px]"
          onPanEnd={(_, info) => {
            if (info.offset.x < -60) go(i + 1);
            else if (info.offset.x > 60) go(i - 1);
          }}
          style={{ touchAction: "pan-y" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={s.id}
              className="relative"
              initial="hidden"
              animate="show"
              exit="exit"
              role="tabpanel"
              aria-label={s.tab}
              aria-live={running ? "off" : "polite"}
            >
              <motion.div
                className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full lg:w-[58%]"
                initial={{ opacity: 0, scale: 1.05, x: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.9 * d, ease }}
              >
                <motion.div
                  className="relative h-full w-full"
                  style={reduce ? undefined : { x: px, y: py }}
                >
                  <div className="relative h-full w-full overflow-hidden">
                    <motion.div
                      className="relative h-full w-full"
                      animate={reduce ? undefined : { y: [0, -10, 0] }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Photo
                        src={s?.image?.src}
                        fallback={s?.image?.fallback}
                        alt={s?.image?.alt}
                        priority={i === 0}
                      />
                    </motion.div>

                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-transparent lg:bg-gradient-to-r lg:from-white lg:via-white/60 lg:to-transparent"
                    />
                  </div>
                </motion.div>

                <div
                  aria-hidden
                  className="absolute right-8 top-10 z-10 hidden [perspective:700px] motion-reduce:hidden lg:block"
                >
                  <div className="cube3d">
                    {["f1", "f2", "f3", "f4", "f5", "f6"].map((f) => (
                      <i key={f} className={f} />
                    ))}
                  </div>
                </div>

                <motion.div
                  aria-hidden
                  className="absolute bottom-6 right-4 hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-xl shadow-slate-900/10 backdrop-blur-md lg:flex"
                  initial={{ opacity: 0, y: 16 }}
                  animate={
                    reduce
                      ? { opacity: 1, y: 0 }
                      : { opacity: 1, y: [0, -6, 0] }
                  }
                  transition={{
                    opacity: { duration: 0.6 * d, delay: 0.6 * d },
                    y: {
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.9,
                    },
                  }}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: s.accent }}
                  >
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="leading-tight">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                      {pad(i + 1)} / {pad(slides.length)}
                    </span>
                    <span className="block font-heading text-sm font-semibold text-brand-navy">
                      {s.tab}
                    </span>
                  </span>
                </motion.div>
              </motion.div>

              <div className="relative z-10 grid grid-cols-1 items-center gap-10 py-6 lg:grid-cols-[minmax(0,44%)_1fr] lg:py-10">
                <div>
                  <motion.p
                    className="mb-4 inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] shadow-sm backdrop-blur"
                    style={{ color: s.accent, borderColor: `${s.accent}33` }}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      show: { opacity: 1, y: 0 },
                      exit: { opacity: 0 },
                    }}
                    transition={{ duration: 0.5 * d, ease }}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span
                        className="absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping"
                        style={{ backgroundColor: s.accent }}
                      />
                      <span
                        className="relative inline-flex h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: s.accent }}
                      />
                    </span>
                    {s.eyebrow}
                  </motion.p>

                  <h1 className="text-display font-semibold text-brand-navy">
                    {words.map((w, k) => {
                      const highlighted = k >= words.length - s.hl;
                      return (
                        <span
                          key={k}
                          className="inline-block overflow-hidden pb-[0.08em] align-top"
                        >
                          <motion.span
                            className="mr-[0.25em] inline-block"
                            style={
                              highlighted ? { color: s.accent } : undefined
                            }
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
                      );
                    })}
                  </h1>

                  {s.subtitle && (
                    <motion.p
                      className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600"
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { opacity: 1, y: 0 },
                        exit: { opacity: 0 },
                      }}
                      transition={{ duration: 0.5 * d, delay: d * 0.35, ease }}
                    >
                      {s.subtitle}
                    </motion.p>
                  )}

                  {s.chips && s.chips.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {s.chips.map((c, k) => (
                        <motion.li
                          key={c}
                          className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[12.5px] font-medium text-slate-700 shadow-sm backdrop-blur-sm"
                          variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            show: { opacity: 1, scale: 1 },
                            exit: { opacity: 0 },
                          }}
                          transition={{
                            duration: 0.4 * d,
                            delay: d * (0.5 + k * 0.08),
                            ease,
                          }}
                        >
                          {c}
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {s.points.length > 0 && (
                    <ul className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                      {s.points.map((p, k) => (
                        <motion.li
                          key={p.h}
                          className="relative rounded-xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md"
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
                            style={{ backgroundColor: s.accent }}
                            aria-hidden
                          />
                          <span
                            className="font-mono text-[11px]"
                            style={{ color: s.accent }}
                          >
                            0{k + 1}
                          </span>
                          <b className="mt-1 block font-heading text-sm font-semibold text-brand-navy">
                            {p?.h}
                          </b>
                          <span className="mt-1 block text-[13px] leading-snug text-slate-600">
                            {p?.p}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

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
                      href={s?.cta?.href}
                      onClick={onCtaClick}
                      className="btn-primary btn-lg"
                    >
                      {s?.cta?.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="https://dashboard.rbktradexchange.com/auth/sign-up"
                      className="btn-ghost btn-lg"
                    >
                      Create free account
                    </Link>
                  </motion.div>
                </div>

                <div aria-hidden className="hidden lg:block" />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="relative z-10 mt-4 flex items-center gap-3">
          <div
            role="tablist"
            aria-label="Choose hero slide"
            className="flex flex-1 snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((sl, k) => {
              const active = k === i;
              const Icon = sl.icon;
              return (
                <button
                  key={sl.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => go(k)}
                  className={cn(
                    "group relative flex min-w-[56px] snap-start items-center gap-2.5 overflow-hidden rounded-xl px-3 py-2.5 text-left outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 sm:min-w-[140px] sm:flex-1",
                    active
                      ? "bg-white shadow-md ring-1 ring-slate-200"
                      : "hover:bg-slate-50",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                      active
                        ? "text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200",
                    )}
                    style={active ? { backgroundColor: sl.accent } : undefined}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span
                    className={cn(
                      "hidden truncate text-[13px] font-semibold sm:block",
                      active ? "text-brand-navy" : "text-slate-500",
                    )}
                  >
                    {sl.tab}
                  </span>

                  {active && (
                    <span className="absolute inset-x-3 bottom-0 h-[3px] overflow-hidden rounded-full bg-slate-200">
                      <motion.span
                        key={`${i}-${running}`}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ backgroundColor: sl.accent }}
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
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
            <button
              type="button"
              onClick={() => go(i - 1)}
              aria-label="Previous slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-brand-navy focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setManualPause((v) => !v)}
              aria-label={manualPause ? "Play slideshow" : "Pause slideshow"}
              aria-pressed={manualPause}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-brand-navy focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              {manualPause ? (
                <Play className="h-4 w-4" />
              ) : (
                <Pause className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => go(i + 1)}
              aria-label="Next slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-brand-navy focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
