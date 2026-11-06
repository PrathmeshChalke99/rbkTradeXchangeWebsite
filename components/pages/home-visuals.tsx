'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { AlertTriangle, Building2, CheckCircle2, CircleDashed, Handshake, Landmark, Network, Ship, XCircle } from 'lucide-react';
import { analysisResult, sampleQuotations, documentTypes } from '@/lib/site-config';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Who the platform connects — animated hub diagram                    */
/* ------------------------------------------------------------------ */
const parties = [
  { side: 'left', icon: Ship, title: 'Exporters', text: 'Manage export trades, check documents and apply for pre- and post-shipment finance or LC discounting.' },
  { side: 'left', icon: Building2, title: 'Importers', text: 'Track import trades, open LCs and apply for buyer credit, supplier credit or import finance.' },
  { side: 'right', icon: Landmark, title: 'Participating lenders', text: 'Banks, NBFCs and financial institutions review applications independently and send quotations.' },
  { side: 'right', icon: Network, title: 'Business partners', text: 'Buyers, suppliers and logistics partners kept in your network and reused across documents.' },
] as const;

function PartyCard({ p, i }: { p: (typeof parties)[number]; i: number }) {
  const I = p.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: p.side === 'left' ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
      className="card-dark group p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#8cc8f0] transition group-hover:bg-brand-blue group-hover:text-white"><I className="h-5 w-5" /></span>
        <h3 className="text-base font-semibold text-white">{p.title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{p.text}</p>
    </motion.div>
  );
}

export function ConnectMap() {
  const left = parties.filter((p) => p.side === 'left');
  const right = parties.filter((p) => p.side === 'right');
  // Lines from the four cards into the hub (viewBox 100 x 100)
  const paths = ['M0 27 C 25 27, 30 50, 50 50', 'M0 73 C 25 73, 30 50, 50 50', 'M100 27 C 75 27, 70 50, 50 50', 'M100 73 C 75 73, 70 50, 50 50'];
  return (
    <div className="relative grid items-center gap-5 lg:grid-cols-[1fr_minmax(220px,0.8fr)_1fr] lg:gap-0">
      <div className="space-y-5 lg:pr-2">{left.map((p, i) => <PartyCard key={p.title} p={p} i={i} />)}</div>

      <div className="relative order-first mx-auto flex h-56 w-full max-w-xs items-center justify-center lg:order-none lg:h-[340px] lg:max-w-none">
        <svg className="absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="cm-line" x1="0" x2="1">
              <stop offset="0" stopColor="#44a0dc" stopOpacity="0.15" />
              <stop offset="0.5" stopColor="#44a0dc" stopOpacity="0.8" />
              <stop offset="1" stopColor="#44a0dc" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          {paths.map((d, i) => (
            <motion.path key={d} d={d} fill="none" stroke="url(#cm-line)" strokeWidth="0.5" vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3 + i * 0.12, ease }} />
          ))}
          {paths.map((d, i) => (
            <circle key={`dot-${i}`} r="0.9" fill="#8cc8f0" className="motion-reduce:hidden">
              <animateMotion dur={`${3.2 + i * 0.4}s`} repeatCount="indefinite" path={d} />
            </circle>
          ))}
        </svg>
        <div className="relative flex flex-col items-center">
          <span className="absolute h-40 w-40 rounded-full bg-brand-blue/25 blur-2xl" aria-hidden />
          <span className="absolute h-36 w-36 rounded-full border border-white/10 motion-safe:animate-ping-soft" aria-hidden />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/15 bg-gradient-to-b from-white/[0.12] to-white/[0.03] shadow-[0_0_60px_-10px_rgba(68,160,220,0.6)] backdrop-blur">
            <Image src="/tradeExchange.png" alt="" width={341} height={285} className="h-16 w-auto brightness-0 invert motion-safe:animate-float-y" aria-hidden />
          </div>
          <p className="relative mt-4 font-heading text-sm font-semibold text-white">RBK TradeXchange</p>
          <p className="relative font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/50">Workspace & marketplace</p>
        </div>
      </div>

      <div className="space-y-5 lg:pl-2">{right.map((p, i) => <PartyCard key={p.title} p={p} i={i + 2} />)}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AI document cross-check vignette (sample data, labelled)           */
/* ------------------------------------------------------------------ */
export function DocCheckVisual() {
  const rows = [
    ...analysisResult.matched.slice(0, 3).map((m) => ({ s: 'ok' as const, f: m.field, n: m.value, d: m.documents.join(' · ') })),
    ...analysisResult.warnings.map((w) => ({ s: 'warn' as const, f: w.field, n: w.message, d: w.documents.join(' · ') })),
    ...analysisResult.discrepancies.map((w) => ({ s: 'err' as const, f: w.field, n: w.message, d: w.documents.join(' · ') })),
    ...analysisResult.unchecked.slice(0, 1).map((w) => ({ s: 'skip' as const, f: w.field, n: w.message, d: 'Manual review' })),
  ];
  const counts = [
    { k: 'Matched', v: analysisResult.matched.length, c: 'text-brand-turquoise bg-brand-mint' },
    { k: 'Warnings', v: analysisResult.warnings.length, c: 'text-[#9a5d08] bg-brand-yellow' },
    { k: 'Discrepancies', v: analysisResult.discrepancies.length, c: 'text-rose-700 bg-rose-50' },
    { k: 'Unchecked', v: analysisResult.unchecked.length, c: 'text-brand-slate bg-brand-paper' },
  ];
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-paleblue via-white to-brand-mint/50 sm:-inset-6" aria-hidden />
      <div className="relative overflow-hidden rounded-2xl border border-brand-line bg-white shadow-lift">
        <div className="flex items-center justify-between border-b border-brand-line bg-brand-paper/70 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex gap-1" aria-hidden><i className="h-2.5 w-2.5 rounded-full bg-[#e6ebf3]" /><i className="h-2.5 w-2.5 rounded-full bg-[#e6ebf3]" /><i className="h-2.5 w-2.5 rounded-full bg-[#e6ebf3]" /></span>
            <span className="ml-2 font-mono text-[11px] text-brand-slate">Trade · Export · INV-2026-0418</span>
          </div>
          <span className="rounded-full bg-white px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-slate ring-1 ring-brand-line">Sample data</span>
        </div>
        <div className="grid grid-cols-4 gap-2 p-4">
          {counts.map((c) => (
            <div key={c.k} className={cn('rounded-xl px-2 py-2.5 text-center', c.c)}>
              <p className="font-heading text-xl font-semibold">{c.v}</p>
              <p className="text-[10.5px] font-medium opacity-90">{c.k}</p>
            </div>
          ))}
        </div>
        <ul className="space-y-1.5 px-4 pb-4">
          {rows.map((r, i) => (
            <motion.li key={r.f} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease }}
              className={cn('flex items-start gap-3 rounded-xl border px-3 py-2.5', r.s === 'err' ? 'border-rose-200 bg-rose-50/60' : r.s === 'warn' ? 'border-amber-200 bg-amber-50/60' : 'border-brand-line bg-white')}>
              {r.s === 'ok' && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-turquoise" />}
              {r.s === 'warn' && <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#b7700b]" />}
              {r.s === 'err' && <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />}
              {r.s === 'skip' && <CircleDashed className="mt-0.5 h-4 w-4 shrink-0 text-brand-slate" />}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="text-[13px] font-semibold text-brand-ink">{r.f}</p>
                  <p className="font-mono text-[10.5px] text-brand-slate">{r.d}</p>
                </div>
                <p className="truncate text-xs text-brand-slate">{r.n}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Lender quotation vignette (simulated, labelled)                     */
/* ------------------------------------------------------------------ */
export function QuoteVisual() {
  const statusTone: Record<string, string> = {
    Quoted: 'bg-brand-mint text-brand-turquoise',
    'Under Review': 'bg-brand-paleblue text-brand-blue',
    Pending: 'bg-brand-paper text-brand-slate',
  };
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-bl from-brand-yellow/60 via-white to-brand-paleblue sm:-inset-6" aria-hidden />
      <div className="relative overflow-hidden rounded-2xl border border-brand-line bg-white shadow-lift">
        <div className="flex items-center justify-between border-b border-brand-line px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-brand-ink">LC Discounting · Application</p>
            <p className="font-mono text-[11px] text-brand-slate">Requested $48,500 · 90–120 days</p>
          </div>
          <span className="rounded-full bg-brand-paper px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-slate ring-1 ring-brand-line">Simulated</span>
        </div>
        <ul className="divide-y divide-brand-line">
          {sampleQuotations.map((q, i) => (
            <motion.li key={q.id} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease }}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 sm:grid-cols-[minmax(0,1.7fr)_0.7fr_0.7fr_auto]">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: q.bg, color: q.color }}><Handshake className="h-4 w-4" /></span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-brand-ink">{q.lender}</p>
                  <span className={cn('mt-0.5 inline-block rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold', statusTone[q.status])}>{q.status}</span>
                </div>
              </div>
              <div className="hidden sm:block"><p className="font-mono text-[10px] uppercase text-brand-slate">Rate</p><p className="kbd-num text-sm font-semibold text-brand-ink">{q.rate}</p></div>
              <div className="hidden sm:block"><p className="font-mono text-[10px] uppercase text-brand-slate">Tenure</p><p className="kbd-num text-sm font-semibold text-brand-ink">{q.tenure}</p></div>
              {q.status === 'Quoted' ? (
                <span className="rounded-lg bg-brand-blue px-3 py-1.5 text-xs font-semibold text-white shadow-glow-blue">Review offer</span>
              ) : (
                <span className="rounded-lg border border-brand-line px-3 py-1.5 text-xs font-medium text-brand-slate">Awaiting</span>
              )}
            </motion.li>
          ))}
        </ul>
        <p className="border-t border-brand-line bg-brand-paper/70 px-5 py-3 text-[11.5px] text-brand-slate">Lender names and terms are illustrative. Each lender decides independently.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Trade document coverage strip                                       */
/* ------------------------------------------------------------------ */
export function DocTypeChips() {
  const extra = [{ name: 'Sales / Purchase Contract', short: 'SC', color: '#4c5fd5', bg: '#eceffb' }];
  return (
    <ul className="flex flex-wrap gap-2">
      {[...documentTypes, ...extra].map((d, i) => (
        <motion.li key={d.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-lg border border-brand-line bg-white py-1 pl-1 pr-3 text-[13px] font-medium text-brand-ink shadow-soft">
          <span className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-md px-1 font-mono text-[10px] font-semibold" style={{ background: d.bg, color: d.color }}>{d.short}</span>
          {d.name}
        </motion.li>
      ))}
    </ul>
  );
}

