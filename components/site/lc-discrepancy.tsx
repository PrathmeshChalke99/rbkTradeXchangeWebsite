'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileWarning, CheckCircle2, AlertTriangle, XCircle,
  Upload, ScanLine, FileText, Layers,
} from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const lcFields = [
  { label: 'LC Number', lc: 'LC-2026-5531', draft: 'LC-2026-5531', status: 'match' },
  { label: 'Applicant Name', lc: 'Your Company Ltd.', draft: 'Your Company Ltd.', status: 'match' },
  { label: 'Beneficiary', lc: 'Globex Trading Co.', draft: 'Globex Trading Co.', status: 'match' },
  { label: 'Amount', lc: '$48,500.00', draft: '$48,500.00', status: 'match' },
  { label: 'Currency', lc: 'USD', draft: 'USD', status: 'match' },
  { label: 'Consignee Address', lc: 'Dubai Silicon Oasis, UAE', draft: 'Dubai Marina, UAE', status: 'discrepancy' },
  { label: 'Shipment Date', lc: '2026-11-04', draft: '2026-11-06', status: 'warning' },
  { label: 'Port of Loading', lc: 'Mumbai, IN', draft: 'Nhava Sheva, IN', status: 'warning' },
  { label: 'Incoterms', lc: 'CIF', draft: '—', status: 'unchecked' },
];

export function LCDiscrepancy() {
  const [activeField, setActiveField] = useState<number | null>(null);

  const statusConfig = {
    match: { icon: CheckCircle2, color: '#10b981', bg: '#ddf4ee', label: 'Matched' },
    warning: { icon: AlertTriangle, color: '#b7700b', bg: '#fdf3da', label: 'Warning' },
    discrepancy: { icon: XCircle, color: '#ef4444', bg: '#e3f1fb', label: 'Discrepancy' },
    unchecked: { icon: FileText, color: '#94a3b8', bg: '#f1f5f9', label: 'Unchecked' },
  };

  return (
    <section id="lc-discrepancy" className="relative py-14 sm:py-20 bg-white overflow-hidden">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="LC Discrepancy Testing"
          title={<>AI-assisted <span className="gradient-text-violet">LC discrepancy</span> checking</>}
          description="Upload the LC draft and supporting documents. AI extracts fields, compares across documents, and produces a structured report with clear severity labels."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Document layers visualization */}
          <div className="relative">
            <div className="rounded-2xl border border-brand-paleblue bg-gradient-to-br from-brand-lavender/10 via-white to-brand-pink/10 p-6 min-h-[360px]">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-5 w-5 text-brand-violet" />
                <h4 className="font-heading text-sm font-semibold text-brand-ink">Document Layers</h4>
              </div>

              <div className="relative flex items-center justify-center">
                {/* Layer 1: LC Draft */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute z-30"
                >
                  <div className="w-44 rounded-xl border-2 border-brand-violet/40 bg-white doc-shadow overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-brand-violet to-brand-pink" />
                    <div className="p-3">
                      <span className="text-xs font-bold text-brand-ink">LC Draft</span>
                      <div className="mt-2 space-y-1.5">
                        <div className="h-1.5 w-full rounded-full bg-brand-lavender" />
                        <div className="h-1.5 w-3/4 rounded-full bg-brand-lavender" />
                        <div className="h-1.5 w-2/3 rounded-full bg-brand-lavender" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Layer 2: Supporting doc */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute z-20 translate-x-16 translate-y-8"
                >
                  <div className="w-40 rounded-xl border-2 border-brand-blue/40 bg-white doc-shadow overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-brand-blue to-brand-sky" />
                    <div className="p-3">
                      <span className="text-xs font-bold text-brand-ink">Bill of Lading</span>
                      <div className="mt-2 space-y-1.5">
                        <div className="h-1.5 w-full rounded-full bg-brand-paleblue" />
                        <div className="h-1.5 w-3/4 rounded-full bg-brand-paleblue" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Scan effect */}
                <motion.div
                  className="absolute inset-0 z-40 pointer-events-none"
                  animate={{ y: [-60, 100, -60] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="h-16 bg-gradient-to-b from-transparent via-brand-violet/20 to-transparent rounded-2xl" />
                </motion.div>
              </div>

              {/* Severity legend */}
              <div className="mt-6 grid grid-cols-2 gap-2">
                {Object.entries(statusConfig).map(([key, cfg]) => {
                  const Icon = cfg.icon;
                  return (
                    <div key={key} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: cfg.bg + '60' }}>
                      <Icon className="h-3.5 w-3.5" style={{ color: cfg.color }} />
                      <span className="text-xs font-medium" style={{ color: cfg.color }}>{cfg.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button size="sm" className="flex-1 bg-brand-violet text-white hover:bg-brand-violet/90 gap-1.5">
                <Upload className="h-3.5 w-3.5" />
                Upload LC Draft
              </Button>
              <Button size="sm" variant="outline" className="flex-1 gap-1.5 border-brand-paleblue">
                <ScanLine className="h-3.5 w-3.5" />
                Run Check
              </Button>
            </div>
          </div>

          {/* Discrepancy report */}
          <div className="rounded-2xl border border-brand-paleblue bg-white/90 p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileWarning className="h-5 w-5 text-brand-violet" />
              <h4 className="font-heading text-sm font-semibold text-brand-ink">Discrepancy Report</h4>
              <span className="ml-auto rounded-full bg-brand-paleblue/50 px-2.5 py-0.5 text-xs font-medium text-brand-blue">
                {lcFields.length} fields checked
              </span>
            </div>

            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {lcFields.map((field, i) => {
                const cfg = statusConfig[field.status as keyof typeof statusConfig];
                const Icon = cfg.icon;
                const isActive = activeField === i;
                return (
                  <button
                    key={field.label}
                    onClick={() => setActiveField(isActive ? null : i)}
                    className={cn(
                      'w-full rounded-lg border-2 p-3 text-left transition-all',
                      isActive ? 'shadow-soft' : 'border-brand-paleblue/40'
                    )}
                    style={isActive ? { borderColor: cfg.color, background: cfg.bg + '30' } : {}}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-3.5 w-3.5" style={{ color: cfg.color }} />
                      <span className="text-sm font-medium text-brand-ink">{field.label}</span>
                      <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>
                        {cfg.label}
                      </span>
                    </div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
                            <div className="rounded-lg bg-brand-lavender/20 p-2">
                              <p className="font-semibold text-brand-violet mb-0.5">LC Draft</p>
                              <p className="font-mono text-brand-ink">{field.lc}</p>
                            </div>
                            <div className="rounded-lg bg-brand-paleblue/20 p-2">
                              <p className="font-semibold text-brand-blue mb-0.5">Supporting Doc</p>
                              <p className="font-mono text-brand-ink">{field.draft}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-brand-paper px-3 py-2.5 border border-brand-paleblue/40">
              <span className="text-xs text-brand-slate">Items requiring human review</span>
              <span className="text-sm font-bold text-destructive">
                {lcFields.filter((f) => f.status === 'discrepancy' || f.status === 'warning').length} items
              </span>
            </div>
            <p className="text-xs text-brand-slate mt-3 text-center">
              AI assists with document checks and does not replace required professional review.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}