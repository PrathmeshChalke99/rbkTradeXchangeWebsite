'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileSearch, Landmark, Share2, Handshake, FilePlus,
  Upload, ScanLine, CheckCircle2, AlertTriangle, XCircle,
  ArrowRight, ArrowLeft, Play, Pause, Package, Building2,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/site/section-heading';
import {
  documentTypes, analysisResult, financeCategories,
  sampleNetworkNodes, sampleQuotations, eDocTemplates,
} from '@/lib/site-config';
import { cn } from '@/lib/utils';

const modules = [
  { id: 'trade', label: 'Trade Management', icon: FileSearch, color: '#1d5fd6', bg: '#e2ecfa' },
  { id: 'finance', label: 'Business Finance', icon: Landmark, color: '#4c5fd5', bg: '#eceffb' },
  { id: 'network', label: 'Network Mgmt', icon: Share2, color: '#0f9a8a', bg: '#ddf4ee' },
  { id: 'quotations', label: 'Trade Finance', icon: Handshake, color: '#b7700b', bg: '#fdf3da' },
  { id: 'edocs', label: 'E-Docs', icon: FilePlus, color: '#0b78bf', bg: '#e3f1fb' },
];

// ── Trade Management Demo ──────────────────────────────────────────
function TradeManagementDemo() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [activeDoc, setActiveDoc] = useState(0);

  useEffect(() => {
    if (!scanning) return;
    const timer = setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, [scanning]);

  const startScan = () => {
    setScanned(false);
    setScanning(true);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Upload & scan panel */}
      <div className="space-y-4">
        <div className="rounded-xl border border-brand-paleblue bg-white/60 p-4">
          <h4 className="font-heading text-sm font-semibold text-brand-ink mb-3">Trade Type</h4>
          <div className="grid grid-cols-2 gap-2">
            {['Import', 'Export'].map((type) => (
              <button
                key={type}
                className={cn(
                  'rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all',
                  type === 'Import'
                    ? 'border-brand-blue bg-brand-paleblue/50 text-brand-blue'
                    : 'border-brand-mint bg-brand-mint/20 text-brand-turquoise'
                )}
              >
                {type === 'Import' ? '↧ Import' : '↥ Export'}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-brand-paleblue bg-white/60 p-4">
          <h4 className="font-heading text-sm font-semibold text-brand-ink mb-3">Uploaded Documents</h4>
          <div className="space-y-2">
            {documentTypes.slice(0, 4).map((doc, i) => (
              <button
                key={doc.short}
                onClick={() => { setActiveDoc(i); setScanned(false); }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg border p-2.5 text-left transition-all',
                  activeDoc === i
                    ? 'border-2 shadow-soft'
                    : 'border-brand-paleblue/60 hover:bg-brand-paleblue/30'
                )}
                style={activeDoc === i ? { borderColor: doc.color, background: doc.bg + '40' } : {}}
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold"
                  style={{ background: doc.bg, color: doc.color }}
                >
                  {doc.short}
                </div>
                <span className="flex-1 text-sm font-medium text-brand-ink">{doc.name}</span>
                {scanned && activeDoc === i ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <Upload className="h-4 w-4 text-brand-slate" />
                )}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={startScan}
          disabled={scanning}
          className="w-full bg-brand-blue text-white hover:bg-brand-blue/90 gap-2"
        >
          {scanning ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Analyzing…
            </>
          ) : (
            <>
              <ScanLine className="h-4 w-4" />
              {scanned ? 'Re-run AI Analysis' : 'Run AI Analysis'}
            </>
          )}
        </Button>
        <p className="text-xs text-brand-slate text-center">
          Demo — AI assists with document checks and does not guarantee accuracy.
        </p>
      </div>

      {/* Results panel */}
      <div className="relative rounded-xl border border-brand-paleblue bg-white/80 overflow-hidden min-h-[400px]">
        {scanning && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm">
            <div className="text-center">
              <div className="relative mx-auto mb-4 h-32 w-44 rounded-lg border-2 border-brand-blue/30 bg-white doc-shadow overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-brand-blue to-brand-violet" />
                <div className="space-y-2 p-3">
                  <div className="h-1.5 w-full rounded-full bg-brand-paleblue" />
                  <div className="h-1.5 w-3/4 rounded-full bg-brand-paleblue" />
                  <div className="h-1.5 w-2/3 rounded-full bg-brand-paleblue" />
                  <div className="grid grid-cols-3 gap-1 pt-1">
                    <div className="h-4 rounded bg-brand-paleblue" />
                    <div className="h-4 rounded bg-brand-lavender" />
                    <div className="h-4 rounded bg-brand-mint" />
                  </div>
                </div>
                <motion.div
                  className="absolute inset-x-0 h-12"
                  animate={{ y: [-20, 150, -20] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(96,165,250,0.4), transparent)' }}
                />
              </div>
              <p className="text-sm font-medium text-brand-blue">AI scanning documents…</p>
            </div>
          </div>
        )}

        {scanned ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 space-y-3 max-h-[450px] overflow-y-auto"
          >
            <h4 className="font-heading text-sm font-semibold text-brand-ink sticky top-0 bg-white/90 backdrop-blur-sm py-1">
              Analysis Report — <span className="text-brand-slate font-normal">Sample results</span>
            </h4>

            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-xs font-semibold text-success">Matched Fields ({analysisResult.matched.length})</span>
              </div>
              <div className="space-y-1.5">
                {analysisResult.matched.map((m) => (
                  <div key={m.field} className="flex items-center justify-between rounded-lg bg-brand-mint/30 px-3 py-2">
                    <span className="text-xs font-medium text-brand-ink">{m.field}</span>
                    <span className="font-mono text-xs text-brand-slate">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-xs font-semibold text-warning">Warnings ({analysisResult.warnings.length})</span>
              </div>
              <div className="space-y-1.5">
                {analysisResult.warnings.map((w) => (
                  <div key={w.field} className="rounded-lg bg-brand-peach/40 px-3 py-2">
                    <span className="text-xs font-medium text-brand-ink">{w.field}</span>
                    <p className="text-xs text-brand-slate mt-0.5">{w.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <span className="text-xs font-semibold text-destructive">Discrepancies ({analysisResult.discrepancies.length})</span>
              </div>
              <div className="space-y-1.5">
                {analysisResult.discrepancies.map((d) => (
                  <div key={d.field} className="rounded-lg bg-brand-pink/40 px-3 py-2">
                    <span className="text-xs font-medium text-brand-ink">{d.field}</span>
                    <p className="text-xs text-brand-slate mt-0.5">{d.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="h-4 w-4 rounded-full border-2 border-brand-slate" />
                <span className="text-xs font-semibold text-brand-slate">Unchecked ({analysisResult.unchecked.length})</span>
              </div>
              <div className="space-y-1.5">
                {analysisResult.unchecked.map((u) => (
                  <div key={u.field} className="rounded-lg bg-brand-paper px-3 py-2 border border-brand-paleblue/40">
                    <span className="text-xs font-medium text-brand-ink">{u.field}</span>
                    <p className="text-xs text-brand-slate mt-0.5">{u.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : !scanning ? (
          <div className="flex h-full min-h-[400px] items-center justify-center p-8 text-center">
            <div>
              <ScanLine className="mx-auto h-12 w-12 text-brand-paleblue mb-3" />
              <p className="text-sm font-medium text-brand-slate">
                Run AI analysis to see extracted fields, cross-checked data, and flagged discrepancies.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ── Business Finance Demo ───────────────────────────────────────────
function BusinessFinanceDemo() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<number | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-heading text-sm font-semibold text-brand-ink">Finance Categories</h4>
        {financeCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setSelectedCat(cat.id); setSelectedSub(null); }}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition-all',
              selectedCat === cat.id
                ? 'shadow-soft'
                : 'border-brand-paleblue/60 bg-white/60 hover:bg-brand-paleblue/20'
            )}
            style={selectedCat === cat.id ? { borderColor: cat.color, background: cat.bg + '40' } : {}}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: cat.bg }}>
              <Landmark className="h-5 w-5" style={{ color: cat.color }} />
            </div>
            <span className="text-sm font-medium text-brand-ink">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Subcategories */}
      <div className="space-y-3">
        <h4 className="font-heading text-sm font-semibold text-brand-ink">
          {selectedCat ? 'Subcategories' : 'Select a category'}
        </h4>
        {!selectedCat ? (
          <div className="rounded-xl border border-dashed border-brand-paleblue bg-white/40 p-8 text-center">
            <p className="text-sm text-brand-slate">Choose a finance category to see available subcategories.</p>
          </div>
        ) : (
          financeCategories
            .filter((c) => c.id === selectedCat)
            .flatMap((c) => c.subcategories)
            .map((sub, i) => (
              <button
                key={sub.name}
                onClick={() => setSelectedSub(i)}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl border-2 p-3 text-left transition-all',
                  selectedSub === i
                    ? 'border-brand-blue bg-brand-paleblue/40 shadow-soft'
                    : 'border-brand-paleblue/60 bg-white/60 hover:bg-brand-paleblue/20'
                )}
              >
                <span className="text-sm font-medium text-brand-ink">{sub.name}</span>
                <ArrowRight className="h-4 w-4 text-brand-slate" />
              </button>
            ))
        )}
      </div>

      {/* Requirements */}
      <div className="space-y-3">
        <h4 className="font-heading text-sm font-semibold text-brand-ink">Required Documents</h4>
        {selectedCat === null || selectedSub === null ? (
          <div className="rounded-xl border border-dashed border-brand-paleblue bg-white/40 p-8 text-center">
            <p className="text-sm text-brand-slate">
              Requirements vary by finance product — select a subcategory to see the specific document checklist.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-brand-paleblue bg-white/80 p-4 space-y-2"
          >
            {financeCategories
              .filter((c) => c.id === selectedCat)
              .flatMap((c) => c.subcategories)
              [selectedSub].requires.map((req) => (
                <div key={req} className="flex items-center gap-2.5 rounded-lg bg-brand-paleblue/30 px-3 py-2">
                  <Package className="h-4 w-4 text-brand-blue" />
                  <span className="text-sm text-brand-ink">{req}</span>
                </div>
              ))}
            <div className="pt-2">
              <Button size="sm" className="w-full bg-brand-violet text-white hover:bg-brand-violet/90 gap-1.5">
                <Upload className="h-3.5 w-3.5" />
                Start Application
              </Button>
              <p className="text-xs text-brand-slate text-center mt-2">Demo — document requirements shown for illustration.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ── Network Management Demo ─────────────────────────────────────────
function NetworkDemo() {
  const [hovered, setHovered] = useState<string | null>(null);
  const nodeColors: Record<string, string> = {
    company: '#1d5fd6', buyer: '#4c5fd5', supplier: '#0f9a8a', logistics: '#b7700b',
  };
  const nodeBgs: Record<string, string> = {
    company: '#e2ecfa', buyer: '#eceffb', supplier: '#ddf4ee', logistics: '#fdf3da',
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3 relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-xl border border-brand-paleblue bg-gradient-to-br from-brand-paleblue/20 via-white to-brand-lavender/20 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          {sampleNetworkNodes
            .filter((n) => n.id !== 'company')
            .map((node) => {
              const company = sampleNetworkNodes.find((n) => n.id === 'company')!;
              const isActive = hovered === node.id;
              return (
                <motion.line
                  key={node.id}
                  x1={`${company.x}%`}
                  y1={`${company.y}%`}
                  x2={`${node.x}%`}
                  y2={`${node.y}%`}
                  stroke={nodeColors[node.type]}
                  strokeWidth={isActive ? 3 : 1.5}
                  strokeDasharray="6 4"
                  animate={{ opacity: isActive ? 1 : 0.4 }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}
        </svg>
        {sampleNetworkNodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className={cn(
                'flex items-center justify-center rounded-full border-2 transition-all',
                node.id === 'company' ? 'h-16 w-16' : 'h-11 w-11',
                hovered === node.id && 'scale-110 shadow-doc'
              )}
              style={{ background: nodeBgs[node.type], borderColor: nodeColors[node.type] }}
            >
              {node.id === 'company' ? (
                <Building2 className="h-7 w-7" style={{ color: nodeColors.company }} />
              ) : (
                <span className="text-xs font-bold" style={{ color: nodeColors[node.type] }}>
                  {node.type === 'buyer' ? 'B' : node.type === 'supplier' ? 'S' : 'L'}
                </span>
              )}
            </div>
            <div
              className={cn(
                'absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium transition-opacity',
                node.id === 'company' || hovered === node.id ? 'opacity-100' : 'opacity-0'
              )}
              style={{ background: nodeBgs[node.type], color: nodeColors[node.type] }}
            >
              {node.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-xl border border-brand-paleblue bg-white/80 p-4">
          <h4 className="font-heading text-sm font-semibold text-brand-ink mb-3">Network Legend</h4>
          <div className="space-y-2">
            {[
              { label: 'Your Company', color: '#1d5fd6', bg: '#e2ecfa' },
              { label: 'Buyers', color: '#4c5fd5', bg: '#eceffb' },
              { label: 'Suppliers', color: '#0f9a8a', bg: '#ddf4ee' },
              { label: 'Logistics Partners', color: '#b7700b', bg: '#fdf3da' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div className="h-4 w-4 rounded-full border-2" style={{ background: item.bg, borderColor: item.color }} />
                <span className="text-sm text-brand-ink">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {hovered && hovered !== 'company' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border-2 border-brand-paleblue bg-white/90 p-4 shadow-soft"
          >
            {(() => {
              const node = sampleNetworkNodes.find((n) => n.id === hovered)!;
              return (
                <>
                  <h4 className="font-heading text-sm font-semibold text-brand-ink mb-2">{node.label}</h4>
                  <p className="text-xs text-brand-slate capitalize mb-3">Type: {node.type}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs">View Details</Button>
                    <Button size="sm" variant="ghost" className="text-xs text-destructive">Remove</Button>
                  </div>
                </>
              );
            })()}
          </motion.div>
        ) : (
          <div className="rounded-xl border border-dashed border-brand-paleblue bg-white/40 p-4">
            <Button size="sm" className="w-full bg-brand-turquoise text-brand-ink hover:bg-brand-turquoise/80 gap-1.5">
              <FilePlus className="h-3.5 w-3.5" />
              Add Partner
            </Button>
            <p className="text-xs text-brand-slate text-center mt-3">Sample data shown for demonstration.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Trade Finance / Quotations Demo ─────────────────────────────────
function QuotationsDemo() {
  const [decisions, setDecisions] = useState<Record<string, 'accepted' | 'rejected' | null>>({});

  return (
    <div className="space-y-4">
      {/* Application summary */}
      <div className="rounded-xl border border-brand-paleblue bg-white/80 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="font-heading text-sm font-semibold text-brand-ink">Finance Application #APP-2026-001</h4>
            <p className="text-xs text-brand-slate mt-0.5">Invoice Discounting — Post-Shipment Finance</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-brand-paleblue/50 px-3 py-1">
              <div className="h-2 w-2 rounded-full bg-brand-blue animate-pulse-soft" />
              <span className="text-xs font-medium text-brand-blue">Active</span>
            </div>
            <span className="font-mono text-sm text-brand-ink">$48,500</span>
          </div>
        </div>
        {/* Progress */}
        <div className="mt-3 flex items-center gap-2">
          {['Submitted', 'Assigned', 'Under Review', 'Quoted', 'Decision'].map((stage, i) => (
            <div key={stage} className="flex flex-1 items-center gap-2">
              <div className={cn('h-2 flex-1 rounded-full', i <= 2 ? 'bg-brand-blue' : 'bg-brand-paleblue')} />
              <span className={cn('text-[10px] font-medium', i <= 2 ? 'text-brand-blue' : 'text-brand-slate')}>{stage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lender quotations */}
      <div className="grid gap-3 sm:grid-cols-3">
        {sampleQuotations.map((q) => {
          const decision = decisions[q.id];
          return (
            <div
              key={q.id}
              className="rounded-xl border-2 p-4 transition-all"
              style={{ borderColor: decision === 'accepted' ? '#10b981' : decision === 'rejected' ? '#ef4444' : `${q.color}30`, background: decision ? 'white' : `${q.bg}30` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-brand-ink">{q.lender}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{ background: q.bg, color: q.color }}
                >
                  {q.status}
                </span>
              </div>
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-brand-slate">Amount</span>
                  <span className="font-mono text-brand-ink">{q.amount}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-brand-slate">Rate</span>
                  <span className="font-mono text-brand-ink">{q.rate}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-brand-slate">Tenure</span>
                  <span className="font-mono text-brand-ink">{q.tenure}</span>
                </div>
              </div>
              {decision ? (
                <div className={cn(
                  'flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium',
                  decision === 'accepted' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                )}>
                  {decision === 'accepted' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                  {decision === 'accepted' ? 'Accepted' : 'Rejected'}
                </div>
              ) : q.status === 'Quoted' ? (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setDecisions((d) => ({ ...d, [q.id]: 'accepted' }))}
                    className="flex-1 bg-success text-white hover:bg-success/90 text-xs h-8"
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDecisions((d) => ({ ...d, [q.id]: 'rejected' }))}
                    className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/10 text-xs h-8"
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg bg-brand-paleblue/30 py-2 text-center text-xs text-brand-slate">
                  Awaiting lender response
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-xs text-brand-slate text-center">
        All lender names and quotations are simulated examples for demonstration.
      </p>
    </div>
  );
}

// ── E-Docs Demo ─────────────────────────────────────────────────────
function EDocsDemo() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Template selection */}
      <div className="lg:col-span-2 space-y-3">
        <h4 className="font-heading text-sm font-semibold text-brand-ink">Document Templates</h4>
        <div className="grid grid-cols-2 gap-2">
          {eDocTemplates.map((tpl, i) => {
            const isSelected = selected === i;
            return (
              <button
                key={tpl.name}
                onClick={() => setSelected(i)}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all',
                  isSelected ? 'shadow-soft' : 'border-brand-paleblue/60 bg-white/60 hover:bg-brand-paleblue/20'
                )}
                style={isSelected ? { borderColor: tpl.color, background: tpl.bg + '40' } : {}}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: tpl.bg }}>
                  <FilePlus className="h-5 w-5" style={{ color: tpl.color }} />
                </div>
                <span className="text-xs font-medium text-brand-ink text-center">{tpl.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview */}
      <div className="lg:col-span-3">
        {selected === null ? (
          <div className="flex h-full min-h-[300px] items-center justify-center rounded-xl border border-dashed border-brand-paleblue bg-white/40">
            <div className="text-center">
              <FilePlus className="mx-auto h-10 w-10 text-brand-paleblue mb-2" />
              <p className="text-sm text-brand-slate">Select a template to preview</p>
            </div>
          </div>
        ) : (
          <motion.div
            key={selected}
            initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-brand-paleblue bg-white doc-shadow overflow-hidden"
            style={{ perspective: '1000px' }}
          >
            <div className="h-2" style={{ background: `linear-gradient(90deg, ${eDocTemplates[selected].color}, ${eDocTemplates[selected].color}80)` }} />
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between border-b border-brand-paleblue pb-3">
                <div>
                  <h4 className="font-heading text-lg font-bold text-brand-ink">{eDocTemplates[selected].name}</h4>
                  <p className="text-xs text-brand-slate">Document Preview — Sample</p>
                </div>
                <div className="h-8 w-8 rounded-lg" style={{ background: eDocTemplates[selected].bg }}>
                  <div className="flex h-full items-center justify-center">
                    <FilePlus className="h-4 w-4" style={{ color: eDocTemplates[selected].color }} />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="font-semibold text-brand-slate mb-1">From</p>
                    <p className="text-brand-ink">Your Company Ltd.</p>
                    <p className="text-brand-slate">Mumbai, India</p>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-slate mb-1">To</p>
                    <p className="text-brand-ink">Globex Trading Co.</p>
                    <p className="text-brand-slate">Dubai, UAE</p>
                  </div>
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-brand-paleblue">
                      <th className="py-2 text-left font-semibold text-brand-slate">Item</th>
                      <th className="py-2 text-right font-semibold text-brand-slate">Qty</th>
                      <th className="py-2 text-right font-semibold text-brand-slate">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { item: 'Textile Goods — Grade A', qty: '500', price: '$24,000' },
                      { item: 'Cotton Fabric — Premium', qty: '300', price: '$18,500' },
                      { item: 'Shipping & Handling', qty: '1', price: '$6,000' },
                    ].map((row) => (
                      <tr key={row.item} className="border-b border-brand-paleblue/40">
                        <td className="py-2 text-brand-ink">{row.item}</td>
                        <td className="py-2 text-right font-mono text-brand-ink">{row.qty}</td>
                        <td className="py-2 text-right font-mono text-brand-ink">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between border-t border-brand-paleblue pt-3">
                  <span className="text-sm font-bold text-brand-ink">Total</span>
                  <span className="font-mono text-sm font-bold text-brand-ink">$48,500.00</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1 bg-brand-pink text-brand-ink hover:bg-brand-pink/80 gap-1.5">
                  <FilePlus className="h-3.5 w-3.5" />
                  Generate
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <Upload className="h-3.5 w-3.5" />
                  Export
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ── Main Workbench ──────────────────────────────────────────────────
export function ProductWorkbench() {
  const [activeTab, setActiveTab] = useState('trade');
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [paused, setPaused] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (paused || !autoAdvance) return;
    const idx = modules.findIndex((m) => m.id === activeTab);
    const nextIdx = (idx + 1) % modules.length;
    const timer = setTimeout(() => setActiveTab(modules[nextIdx].id), 8000);
    timersRef.current.push(timer);
    return () => clearTimeout(timer);
  }, [activeTab, paused, autoAdvance]);

  return (
    <section id="workbench" className="relative py-14 sm:py-20 bg-white overflow-hidden">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Interactive Workbench"
          title={<>Explore the <span className="gradient-text">five modules</span></>}
          description="Each module is a working interactive preview. Hover to pause auto-advance, or click through to explore on your own."
        />

        <div
          className="mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <TabsList className="flex h-auto w-full flex-wrap gap-1 rounded-xl border border-brand-line bg-white p-1.5 shadow-soft sm:w-auto sm:flex-nowrap">
                {modules.map((m) => {
                  const Icon = m.icon;
                  return (
                    <TabsTrigger
                      key={m.id}
                      value={m.id}
                      className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium text-brand-slate transition-colors data-[state=active]:shadow-soft sm:text-sm"
                      style={activeTab === m.id ? { background: m.bg, color: m.color } : {}}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{m.label}</span>
                      <span className="sm:hidden">{m.label.split(' ')[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPaused(!paused)}
                  className="gap-1.5 rounded-lg border-brand-line"
                >
                  {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                  {paused ? 'Resume' : 'Pause'}
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-brand-line bg-brand-paper shadow-lift">
            <div className="flex items-center gap-2 border-b border-brand-line bg-white px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden><i className="h-2.5 w-2.5 rounded-full bg-[#e6ebf3]" /><i className="h-2.5 w-2.5 rounded-full bg-[#e6ebf3]" /><i className="h-2.5 w-2.5 rounded-full bg-[#e6ebf3]" /></span>
              <span className="ml-2 truncate font-mono text-[11px] text-brand-slate">portal.rbktradexchange · {modules.find((m) => m.id === activeTab)?.label}</span>
              <span className="ml-auto rounded-full bg-brand-paper px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-slate ring-1 ring-brand-line">Interactive demo</span>
            </div>
            <div className="p-4 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="trade" className="mt-0"><TradeManagementDemo /></TabsContent>
                <TabsContent value="finance" className="mt-0"><BusinessFinanceDemo /></TabsContent>
                <TabsContent value="network" className="mt-0"><NetworkDemo /></TabsContent>
                <TabsContent value="quotations" className="mt-0"><QuotationsDemo /></TabsContent>
                <TabsContent value="edocs" className="mt-0"><EDocsDemo /></TabsContent>
              </motion.div>
            </AnimatePresence>
            </div>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}