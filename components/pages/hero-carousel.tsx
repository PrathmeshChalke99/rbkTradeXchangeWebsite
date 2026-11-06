'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, ArrowRight, Building2, CheckCircle2, FileText, Globe2, Handshake, Pause, Play, ScanLine, Truck, XCircle } from 'lucide-react';
import { P } from '@/lib/photos';
import { IMG } from '@/lib/content';
import { Photo } from './photo';
import { cn } from '@/lib/utils';

const DURATION = 7000;
const ease = [0.16, 1, 0.3, 1] as const;

type Slide = {
  id: string; tab: string; icon: typeof Building2; eyebrow: string; title: string; accent: string; light: string;
  points: { h: string; p: string }[]; cta: { label: string; href: string };
  images: { src: string; fallback: string; alt: string }[];
};

const slides: Slide[] = [
  { id: 'trade', tab: 'Trade Finance', icon: Globe2, eyebrow: 'International Trade Finance', title: 'Finance every shipment, from first order to final payment', accent: '#1d5fd6', light: '#8cc8f0',
    points: [{ h: 'Export finance', p: 'Pre-shipment, post-shipment and invoice discounting.' }, { h: 'Import finance', p: 'Buyer credit and supplier credit in multiple currencies.' }, { h: 'LCs & guarantees', p: 'Discounting, confirmation, issuance, SBLC and BG.' }],
    cta: { label: 'Explore trade finance', href: '/finance/international-trade-finance' },
    images: [{ src: P.shipAerial, fallback: IMG.hero, alt: 'Container ship at sea' }, { src: P.portSunset, fallback: IMG.preShipment, alt: 'Port cranes at sunset' }, { src: P.meetingTable, fallback: IMG.lc, alt: 'Documents on a meeting table' }] },
  { id: 'business', tab: 'Business Finance', icon: Building2, eyebrow: 'Business / Corporate Finance', title: 'Fund growth with working capital, loans and structured debt', accent: '#4c5fd5', light: '#a9b3f3',
    points: [{ h: 'Working capital', p: 'CC, OD and WCL limits that flex with your cash cycle.' }, { h: 'Term & asset loans', p: 'Machinery, term loans and LAP over longer tenures.' }, { h: 'Structured funding', p: 'ECB, project finance and venture debt for bigger needs.' }],
    cta: { label: 'Explore business finance', href: '/finance/corporate-finance' },
    images: [{ src: P.financialDistrict, fallback: IMG.workingCapital, alt: 'Financial district towers' }, { src: P.financeDesk, fallback: IMG.termLoan, alt: 'Finance charts on a desk' }, { src: P.teamReports, fallback: IMG.lenders, alt: 'Team reviewing financial reports' }] },
  { id: 'supply', tab: 'Supply Chain', icon: Truck, eyebrow: 'Domestic Supply Chain Finance', title: 'Keep suppliers, dealers and distributors funded', accent: '#0f9a8a', light: '#6fdccb',
    points: [{ h: 'Supplier finance', p: 'SID / PID, vendor discounting and dealer finance.' }, { h: 'Invoice finance', p: 'Cash from unpaid invoices and bills, no hard collateral.' }, { h: 'Anchor programmes', p: 'Vendor and distributor programmes built on your credit.' }],
    cta: { label: 'Explore supply chain finance', href: '/finance/domestic-supply-chain-finance' },
    images: [{ src: P.warehouseWide, fallback: IMG.supplyChain, alt: 'Warehouse with stocked shelves' }, { src: P.warehouseWorkers, fallback: IMG.factoring, alt: 'Warehouse workers handling boxes' }, { src: P.portXiamen, fallback: IMG.postShipment, alt: 'Containers and cranes at port' }] },
  { id: 'edocs', tab: 'E-Docs Studio', icon: FileText, eyebrow: 'E-Docs Studio', title: 'Trade paperwork that starts ready', accent: '#0b78bf', light: '#7cc3ee',
    points: [{ h: 'Six templates', p: 'Proforma, contracts, PO, export invoice and packing list.' }, { h: 'Live preview', p: 'Watch the document update as you type.' }, { h: 'Pre-filled data', p: 'Company and partner details flow in automatically.' }],
    cta: { label: 'Try an e-doc template', href: '/documents' },
    images: [{ src: P.chartNotes, fallback: IMG.eDocs, alt: 'Notes on a business chart' }, { src: P.meetingOffice, fallback: IMG.aiDocs, alt: 'Professionals discussing a contract' }, { src: P.warehouseBright, fallback: IMG.supplyChain, alt: 'Bright warehouse interior' }] },
  { id: 'lenders', tab: 'Lender Quotes', icon: Handshake, eyebrow: 'AI Analysis & Lender Quotations', title: 'Check documents with AI, then compare lender quotes', accent: '#b7700b', light: '#f3c46b',
    points: [{ h: 'AI document checks', p: 'Fields extracted and cross-checked, discrepancies flagged.' }, { h: 'Quotes side by side', p: 'Participating lenders respond independently.' }, { h: 'You decide', p: 'Accept or reject, with a human always in the loop.' }],
    cta: { label: 'See lender quotations', href: '/platform/lender-quotations' },
    images: [{ src: P.analyticsTablet, fallback: IMG.aiDocs, alt: 'Analytics on a tablet' }, { src: P.suitsWindow, fallback: IMG.lenders, alt: 'Professionals talking by a window' }, { src: P.londonOffice, fallback: IMG.responsible, alt: 'Business team in a modern office' }] },
];

/** Labelled sample of the document cross-check a user sees in the portal. */
const checks = [
  { doc: 'Commercial invoice', state: 'ok' as const, note: 'Matched' },
  { doc: 'Packing list', state: 'ok' as const, note: 'Matched' },
  { doc: 'Bill of lading', state: 'warn' as const, note: 'Date differs by 2 days' },
  { doc: 'Letter of credit', state: 'err' as const, note: 'Consignee address' },
];

function SampleCheckCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9, ease }}
      className="w-[290px] rounded-2xl border border-white/60 bg-white/90 p-4 text-brand-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-semibold"><ScanLine className="h-4 w-4 text-brand-blue" />AI document check</span>
        <span className="rounded-full bg-brand-paper px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-slate">Sample</span>
      </div>
      <p className="mt-1 font-mono text-[11px] text-brand-slate">Export · INV-2026-0418</p>
      <ul className="mt-3 space-y-1.5">
        {checks.map((c, i) => (
          <motion.li
            key={c.doc}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.18, duration: 0.5, ease }}
            className="flex items-center gap-2.5 rounded-lg bg-brand-paper/80 px-2.5 py-1.5 text-xs"
          >
            {c.state === 'ok' && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-turquoise" />}
            {c.state === 'warn' && <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#b7700b]" />}
            {c.state === 'err' && <XCircle className="h-3.5 w-3.5 shrink-0 text-rose-600" />}
            <span className="flex-1 font-medium">{c.doc}</span>
            <span className={cn('text-[11px]', c.state === 'ok' ? 'text-brand-slate' : c.state === 'warn' ? 'text-[#9a5d08]' : 'text-rose-700')}>{c.note}</span>
          </motion.li>
        ))}
      </ul>
      <p className="mt-3 border-t border-brand-line pt-2 text-[11px] text-brand-slate">Flags are suggestions for your team to review.</p>
    </motion.div>
  );
}

export function HeroCarousel() {
  // Read the motion preference only after mount so server and client render the same markup.
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && !!prefersReduced;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const s = slides[i];
  const Icon = s.icon;
  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), []);
  const running = !paused && !manualPause && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => go(i + 1), DURATION);
    return () => clearTimeout(t);
  }, [i, running, go]);

  const d = reduce ? 0 : 1;
  return (
    <section
      className="surface-dark on-dark noise pb-10 pt-24 sm:pt-28 lg:pb-12 lg:pt-32"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      aria-roledescription="carousel" aria-label="Platform highlights"
    >
      <div className="grid-lines absolute inset-0" aria-hidden />
      <motion.div className="aurora-blob -left-40 -top-40 h-[34rem] w-[34rem] opacity-40" animate={{ backgroundColor: s.accent }} transition={{ duration: 1.2 }} aria-hidden />
      <div className="aurora-blob -right-32 top-24 h-[30rem] w-[30rem] bg-brand-sky/20 [animation-delay:-10s]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="relative min-h-[660px] sm:min-h-[640px] lg:min-h-[520px]" onPanEnd={(_, info) => { if (info.offset.x < -60) go(i + 1); else if (info.offset.x > 60) go(i - 1); }} style={{ touchAction: 'pan-y' }}>
          <AnimatePresence mode="wait">
            <motion.div key={s.id} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-14" initial="hidden" animate="show" exit="exit" aria-live="polite">
              {/* TEXT */}
              <div>
                <motion.span variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 } }} transition={{ duration: 0.45 * d, ease }}
                  className="chip-dark py-1.5 pl-1.5 pr-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10" style={{ color: s.light }}><Icon className="h-3.5 w-3.5" /></span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">{s.eyebrow}</span>
                </motion.span>
                <h1 className="mt-5 text-display font-semibold text-white">
                  {s.title.split(' ').map((w, k) => (
                    <span key={k} className="inline-block overflow-hidden pb-[0.08em] align-top">
                      <motion.span className="mr-[0.25em] inline-block" variants={{ hidden: { y: '105%' }, show: { y: 0 }, exit: { opacity: 0, y: '-30%' } }} transition={{ duration: 0.7 * d, delay: d * (0.05 + k * 0.04), ease }}>{w}</motion.span>
                    </span>
                  ))}
                </h1>
                <ul className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
                  {s.points.map((p, k) => (
                    <motion.li key={p.h} className="bg-brand-night/70 p-4 backdrop-blur"
                      variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0 } }} transition={{ duration: 0.55 * d, delay: d * (0.45 + k * 0.12), ease }}>
                      <span className="font-mono text-[11px]" style={{ color: s.light }}>0{k + 1}</span>
                      <b className="mt-1 block font-heading text-sm font-semibold text-white">{p.h}</b>
                      <span className="mt-1 block text-[13px] leading-snug text-white/60">{p.p}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.div className="mt-8 flex flex-wrap gap-3" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0 } }} transition={{ duration: 0.5 * d, delay: d * 0.85, ease }}>
                  <Link href={s.cta.href} className="btn-primary btn-lg">{s.cta.label}<ArrowRight className="h-4 w-4" /></Link>
                  <Link href="/signup" className="btn-ghost-dark btn-lg">Create free account</Link>
                </motion.div>
              </div>

              {/* IMAGES */}
              <div className="relative">
                <div className="grid h-[300px] grid-cols-5 grid-rows-2 gap-3 sm:h-[380px] lg:h-[460px]">
                  {s.images.map((im, k) => (
                    <motion.div key={im.src} className={cn('relative overflow-hidden rounded-[1.4rem] ring-1 ring-white/10', k === 0 ? 'col-span-3 row-span-2' : 'col-span-2')}
                      variants={{ hidden: { opacity: 0, scale: 0.94, y: k === 0 ? 0 : 30 }, show: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.98 } }}
                      transition={{ duration: 0.8 * d, delay: d * (0.15 + k * 0.18), ease }}>
                      <motion.div className="absolute inset-0" animate={reduce ? undefined : { scale: [1, 1.06] }} transition={{ duration: 9, ease: 'linear' }}>
                        <Photo src={im.src} fallback={im.fallback} alt={im.alt} priority={i === 0} />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-night/50 via-transparent to-transparent" />
                      {k === 0 && <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-navy backdrop-blur">{s.tab}</span>}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute bottom-0 left-[50%] hidden xl:block">
            <div className="motion-safe:animate-float-y"><SampleCheckCard /></div>
          </div>
        </motion.div>

        {/* CONTROLS */}
        <div className="mt-6 flex items-center gap-3">
          <button onClick={() => go(i - 1)} aria-label="Previous slide" className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white sm:flex"><ArrowLeft className="h-4 w-4" /></button>
          <div role="tablist" aria-label="Choose slide" className="grid flex-1 grid-cols-5 gap-2 sm:gap-3">
            {slides.map((sl, k) => (
              <button key={sl.id} role="tab" aria-selected={k === i} aria-label={sl.tab} onClick={() => go(k)} className="group py-2 text-left">
                <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/15">
                  {k < i && <span className="absolute inset-0 rounded-full bg-white/60" />}
                  {k === i && <motion.span key={`${i}-${running}`} className="absolute inset-y-0 left-0 rounded-full" style={{ background: sl.light }} initial={{ width: running ? '0%' : '100%' }} animate={{ width: '100%' }} transition={{ duration: running ? DURATION / 1000 : 0, ease: 'linear' }} />}
                </span>
                <span className={cn('mt-2.5 hidden text-xs font-medium transition sm:block', k === i ? 'text-white' : 'text-white/45 group-hover:text-white/80')}>{sl.tab}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setManualPause((v) => !v)} aria-label={manualPause ? 'Play slideshow' : 'Pause slideshow'} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white">{manualPause || reduce ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>
          <button onClick={() => go(i + 1)} aria-label="Next slide" className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white sm:flex"><ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
    </section>
  );
}
