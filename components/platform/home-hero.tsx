"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { shots } from "@/lib/platform-assets";
import { BrowserFrame, FloatTag, PanShot } from "./frames";
import { ChainFlow, GrowthBars, ShipRoute } from "./heroes-finance";
import { heroPad } from "./hero-copy";
import { DocFan } from "@/components/documents/doc-heroes";
import { docFormats } from "@/lib/doc-formats";
import { cn } from "@/lib/utils";

const DURATION = 12000;
const ease = [0.16, 1, 0.3, 1] as const;

function Collage() {
  return (
    <div className="relative mx-auto w-full max-w-[36rem] [perspective:1600px]">
      <div
        className="relative"
        style={{ transform: "rotateY(-7deg)", transformStyle: "preserve-3d" }}
      >
        <BrowserFrame className="shadow-[0_50px_90px_-40px_rgba(2,35,80,0.55)]">
          <PanShot
            shot={shots.tradeFlow}
            aspect={1.25}
            duration={26}
            start={11}
            priority
          />
        </BrowserFrame>
        <div
          className="absolute -bottom-8 -left-5 hidden w-[56%] sm:block"
          style={{ transform: "translateZ(60px)" }}
        >
          <BrowserFrame>
            <PanShot shot={shots.dashboard} aspect={1.4} duration={20} />
          </BrowserFrame>
        </div>
        <div
          className="absolute -right-4 -top-7 hidden w-[42%] md:block"
          style={{ transform: "translateZ(40px)" }}
        >
          <BrowserFrame>
            <PanShot shot={shots.lc} aspect={1.5} />
          </BrowserFrame>
        </div>
        <FloatTag
          tone="coral"
          className="-right-2 bottom-20 hidden lg:inline-flex"
          delay={0.8}
        >
          Real platform screens
        </FloatTag>
      </div>
    </div>
  );
}

function SceneCard({
  children,
  label,
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[36rem] rounded-[2rem] border border-white bg-white/85 p-5 shadow-lift backdrop-blur sm:p-8">
      {children}
      {label && (
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-brand-slate/70">
          {label}
        </p>
      )}
    </div>
  );
}

function TradeScene() {
  const steps = [
    "Purchase order",
    "Proforma invoice",
    "Sales contract",
    "LC draft check",
    "Payment",
  ];
  return (
    <div className="relative mx-auto w-full max-w-[36rem]">
      <BrowserFrame className="shadow-[0_50px_90px_-40px_rgba(2,35,80,0.5)]">
        <PanShot shot={shots.tradeFlow} aspect={1.2} duration={30} start={16} />
      </BrowserFrame>
      <ol
        className="absolute -left-3 top-8 hidden w-48 space-y-2 md:block"
        aria-label="Trade steps"
      >
        {steps.map((s, i) => (
          <li
            key={s}
            style={{ "--d": `${i * 1.4}s` } as React.CSSProperties}
            className="step-on flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-brand-ink shadow-lift"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white">
              ✓
            </span>
            {s}
          </li>
        ))}
      </ol>
      <FloatTag tone="coral" className="-right-2 -top-3" delay={0.6}>
        TradeAI flags mismatches
      </FloatTag>
    </div>
  );
}

const orbiters: { label: string; logo?: string }[] = [
  { label: "Manufacturers" },
  { label: "Suppliers" },
  { label: "Exim World", logo: "/exim_world.jpeg" },
  { label: "Importers" },
  { label: "Exporters" },
];
function NetworkScene() {
  return (
    <SceneCard label="Business network · RBK Pay">
      <div
        className="relative mx-auto aspect-square w-[82%] max-w-[22rem]"
        aria-hidden
      >
        <div className="absolute inset-0 rounded-full border border-dashed border-brand-navy/20" />
        <div className="absolute inset-[18%] rounded-full border border-dashed border-brand-navy/15" />
        <div
          className="spin-slow absolute inset-0"
          style={{ "--spin": "40s" } as React.CSSProperties}
        >
          {orbiters.map((o, idx) => {
            const a = (idx / orbiters.length) * Math.PI * 2;
            return (
              <span
                key={o.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${(50 + 50 * Math.cos(a)).toFixed(2)}%`,
                  top: `${(50 + 50 * Math.sin(a)).toFixed(2)}%`,
                }}
              >
                <span
                  className="spin-slow-rev block"
                  style={{ "--spin": "40s" } as React.CSSProperties}
                >
                  <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-line bg-white px-3 py-1.5 text-[11px] font-semibold text-brand-ink shadow-soft">
                    {o.logo && (
                      <img src={o.logo} alt="" className="h-4 w-auto" />
                    )}
                    {o.label}
                  </span>
                </span>
              </span>
            );
          })}
        </div>
        <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lift ring-1 ring-brand-line">
          {}
          <img
            src="/rbk_pay.png"
            alt="RBK Pay"
            className="h-[5.5rem] w-[5.5rem] object-contain"
          />
        </div>
      </div>
    </SceneCard>
  );
}

type Slide = {
  id: string;
  tab: string;
  eyebrow: string;
  title: ReactNode;
  text: string;
  chips: string[];
  cta: { label: string; href: string };
  cta2?: { label: string; href: string };
  glow: string;
  visual: ReactNode;
};

const slides: Slide[] = [
  {
    id: "overview",
    tab: "Ecosystem",
    eyebrow: "Unified business finance & trade ecosystem",
    title: (
      <>
        Trade. Finance. <span className="gradient-text">Grow.</span>
      </>
    ),
    text: "From financing your trade transactions to managing operations and accessing growth capital, one connected ecosystem for your business.",
    chips: [
      "Trade finance",
      "Supply chain finance",
      "Corporate finance",
      "TradeAI",
    ],
    cta: { label: "Explore the platform", href: "/platform" },
    cta2: { label: "Explore finance", href: "/finance" },
    glow: "bg-[#FA7F63]/15",
    visual: <Collage />,
  },
  {
    id: "documents",
    tab: "Document Management",
    eyebrow: "Document Management",
    title: (
      <>
        All your business documents.{" "}
        <span className="gradient-text">Organised in one place.</span>
      </>
    ),
    text: "Create, organise, store and share contracts, invoices and trade documents. Open any format to see it live.",
    chips: [
      "Proforma invoice",
      "Sales contract",
      "Purchase order",
      "Packing list",
    ],
    cta: {
      label: "Explore document management",
      href: "/trade-management/document-management",
    },
    cta2: { label: "Open E-Docs", href: "/documents" },
    glow: "bg-brand-sky/20",
    visual: (
      <DocFan
        docs={docFormats.map((d) => ({
          slug: d.slug,
          name: d.name,
          label: d.label,
          accent: d.accent,
        }))}
      />
    ),
  },
  {
    id: "trade",
    tab: "Trade Portal & TradeAI",
    eyebrow: "04 · Trade Portal & TradeAI",
    title: (
      <>
        Manage your entire trade journey on{" "}
        <span className="gradient-text">one platform.</span>
      </>
    ),
    text: "Orders, documents and checks in one portal, with an AI assistant that flags discrepancies early.",
    chips: ["Trade portal", "AI documentation", "LC analysis", "Risk analysis"],
    cta: { label: "Explore the trade portal", href: "/trade-management" },
    cta2: { label: "Meet TradeAI", href: "/trade-management/tradeai" },
    glow: "bg-brand-sky/20",
    visual: <TradeScene />,
  },
  {
    id: "network",
    tab: "Network & RBK Pay",
    eyebrow: "05 · Business Network & Payments",
    title: (
      <>
        Connect, organise and{" "}
        <span className="gradient-text">collect internationally.</span>
      </>
    ),
    text: "A connected network of buyers and suppliers, centralised documents and cross-border collections.",
    chips: ["Business network", "Document management", "RBK Pay"],
    cta: { label: "Explore the network", href: "/platform/business-network" },
    cta2: { label: "RBK Pay", href: "/platform/rbk-pay" },
    glow: "bg-[#FA7F63]/15",
    visual: <NetworkScene />,
  },
  {
    id: "intl",
    tab: "International Trade Finance",
    eyebrow: "01 · International Trade Finance",
    title: (
      <>
        Finance every stage of your{" "}
        <span className="gradient-text">global trade.</span>
      </>
    ),
    text: "Import and export finance, LC discounting and more, aligned with your cross-border transactions.",
    chips: [
      "Import finance",
      "Pre & post-shipment",
      "LC discounting",
      "Buyer & supplier credit",
    ],
    cta: {
      label: "Explore international trade finance",
      href: "/finance/international-trade-finance",
    },
    glow: "bg-brand-blue/15",
    visual: (
      <SceneCard label="Cross-border trade">
        <ShipRoute />
      </SceneCard>
    ),
  },
  {
    id: "domestic",
    tab: "Domestic Supply Chain Finance",
    eyebrow: "02 · Domestic Supply Chain Finance",
    title: (
      <>
        Unlock working capital across your{" "}
        <span className="gradient-text">supply chain.</span>
      </>
    ),
    text: "Improve cash flow and optimise payment cycles with invoice and supply chain financing.",
    chips: [
      "Invoice discounting",
      "Factoring",
      "Receivables & payables",
      "Dealer financing",
    ],
    cta: {
      label: "Explore supply chain finance",
      href: "/finance/domestic-supply-chain-finance",
    },
    glow: "bg-brand-turquoise/15",
    visual: (
      <SceneCard label="Domestic supply chain">
        <ChainFlow />
      </SceneCard>
    ),
  },
  {
    id: "corporate",
    tab: "Business & Corporate Finance",
    eyebrow: "03 · Business & Corporate Finance",
    title: (
      <>
        Capital for operations.{" "}
        <span className="gradient-text">Finance for expansion.</span>
      </>
    ),
    text: "Working capital, term loans, project finance, guarantees and strategic corporate finance.",
    chips: ["Business loans", "OD / CC", "Project finance", "M&A"],
    cta: {
      label: "Explore corporate finance",
      href: "/finance/corporate-finance",
    },
    glow: "bg-brand-violet/15",
    visual: (
      <SceneCard label="Corporate finance">
        <GrowthBars />
      </SceneCard>
    ),
  },
];

export function HomeHero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [hover, setHover] = useState(false);

  const go = useCallback((n: number, d?: number) => {
    setDir(d ?? (n >= 0 ? 1 : -1));
    setI(((n % slides.length) + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setI((current) => (current + 1) % slides.length);
      setDir(1);
    }, DURATION);

    return () => window.clearInterval(timer);
  }, []);

  const s = slides[i];

  return (
    <section
      className="relative overflow-hidden bg-white"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-roledescription="carousel"
      aria-label="Our services"
    >
      <div
        className="grid-lines-light absolute inset-0 opacity-50"
        aria-hidden
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={s.id + "-glow"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          aria-hidden
        >
          <div
            className={cn(
              "aurora-blob -right-24 -top-24 h-[28rem] w-[28rem]",
              s.glow,
            )}
          />
          <div className="aurora-blob -bottom-32 -left-24 h-96 w-96 bg-brand-sky/10" />
        </motion.div>
      </AnimatePresence>

      <div
        className={cn(
          "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          heroPad,
        )}
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:min-h-[34rem] lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="min-w-0">
            {}
            <div
              className="mb-6 flex items-center gap-2"
              role="tablist"
              aria-label="Choose slide"
            >
              {slides.map((x, k) => {
                const on = k === i;
                return (
                  <button
                    key={x.id}
                    role="tab"
                    aria-selected={on}
                    aria-label={`${x.tab} (slide ${k + 1} of ${slides.length})`}
                    onClick={() => go(k, k > i ? 1 : -1)}
                    className={cn(
                      "relative h-2.5 overflow-hidden rounded-full transition-all duration-500",
                      on
                        ? "w-12 bg-brand-line"
                        : "w-2.5 bg-brand-line hover:bg-brand-slate/40",
                    )}
                  >
                    {on && (
                      <span
                        key={`${i}`}
                        className="absolute inset-y-0 left-0 rounded-full bg-[#FA7F63]"
                        style={{
                          animation: !reduce
                            ? `hero-progress ${DURATION}ms linear infinite`
                            : undefined,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={s.id + "-copy"}
                initial={{ opacity: 0, x: 40 * dir }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * dir }}
                transition={{ duration: 0.55, ease }}
                aria-live="polite"
              >
                <span className="eyebrow">{s.eyebrow}</span>
                <h1 className="mt-4 text-display-sm font-semibold text-brand-ink">
                  {s.title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-slate sm:text-lg">
                  {s.text}
                </p>
                <ul
                  className="mt-6 flex flex-wrap gap-2"
                  aria-label="Highlights"
                >
                  {s.chips.map((c, k) => (
                    <motion.li
                      key={c}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + k * 0.07 }}
                      className="chip"
                    >
                      {c}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={s.cta.href} className="btn-primary btn-lg">
                    {s.cta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {s.cta2 && (
                    <Link href={s.cta2.href} className="btn-secondary btn-lg">
                      {s.cta2.label}
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={s.id + "-visual"}
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.65, ease }}
            >
              {s.visual}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
