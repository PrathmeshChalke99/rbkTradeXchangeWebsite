'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Upload, CheckCircle2, ArrowRight, FileText } from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { financeCategories } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function BusinessFinanceSection() {
  const [activeCat, setActiveCat] = useState(0);
  const [activeSub, setActiveSub] = useState(0);

  return (
    <section id="finance" className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <div className="absolute top-1/4 left-0 h-72 w-72 rounded-full bg-brand-lavender/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 h-80 w-80 rounded-full bg-brand-paleblue/30 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Business Finance"
          title={<>Finance applications that <span className="gradient-text-violet">adapt</span> to each product</>}
          description="Three finance categories with multiple subcategories. Requirements vary by product — LC discounting needs different documents than pre-shipment packing credit, and the UI reflects that."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Left: Category cards */}
          <div className="lg:col-span-4 space-y-3">
            {financeCategories.map((cat, i) => (
              <motion.button
                key={cat.id}
                onClick={() => { setActiveCat(i); setActiveSub(0); }}
                whileHover={{ x: 4 }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all',
                  activeCat === i ? 'shadow-soft' : 'border-brand-paleblue/60 bg-white/60'
                )}
                style={activeCat === i ? { borderColor: cat.color, background: cat.bg + '40' } : {}}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: cat.bg }}>
                  <Landmark className="h-6 w-6" style={{ color: cat.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-sm font-semibold text-brand-ink">{cat.name}</h3>
                  <p className="text-xs text-brand-slate">{cat.subcategories.length} subcategories</p>
                </div>
                <ArrowRight className="h-4 w-4 text-brand-slate" />
              </motion.button>
            ))}
          </div>

          {/* Right: Detail panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCat}-${activeSub}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-brand-paleblue bg-white/90 p-6"
              >
                {/* Subcategory tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {financeCategories[activeCat].subcategories.map((sub, i) => (
                    <button
                      key={sub.name}
                      onClick={() => setActiveSub(i)}
                      className={cn(
                        'rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                        activeSub === i
                          ? 'text-white shadow-soft'
                          : 'bg-brand-paleblue/40 text-brand-slate hover:bg-brand-paleblue/60'
                      )}
                      style={activeSub === i ? { background: financeCategories[activeCat].color } : {}}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>

                {/* Required documents */}
                <div>
                  <h4 className="font-heading text-sm font-semibold text-brand-ink mb-3">Required Documents</h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {financeCategories[activeCat].subcategories[activeSub].requires.map((req, i) => (
                      <motion.div
                        key={req}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 rounded-xl border border-brand-paleblue/60 bg-brand-paleblue/20 p-3"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                          <FileText className="h-4 w-4 text-brand-blue" />
                        </div>
                        <span className="text-sm text-brand-ink">{req}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Submission steps */}
                <div className="mt-6">
                  <h4 className="font-heading text-sm font-semibold text-brand-ink mb-3">Application Steps</h4>
                  <div className="space-y-2">
                    {[
                      'Review eligibility and required documents',
                      'Upload KYC documents',
                      'Upload company documents',
                      'Submit P&L statements',
                      'Submit audited financial statements where applicable',
                      'Submit provisional financial statements where applicable',
                      'Review application before submission',
                    ].map((step, i) => (
                      <div key={step} className="flex items-center gap-2.5">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-paleblue/60 text-[10px] font-bold text-brand-blue">
                          {i + 1}
                        </div>
                        <span className="text-sm text-brand-slate">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LC-specific note */}
                {financeCategories[activeCat].id === 'lc' && (
                  <div className="mt-6 rounded-xl bg-brand-mint/30 border border-brand-turquoise/30 p-4">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-brand-ink">LC Document Submission & Discrepancy Checking</p>
                        <p className="text-xs text-brand-slate mt-1">
                          Includes LC draft preview, supporting document list, cross-document comparison, extracted fields,
                          potential inconsistencies, analysis status, and discrepancy report.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center gap-3">
                  <button className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-medium text-white shadow-soft hover:bg-brand-blue/90">
                    <Upload className="h-4 w-4" />
                    Start Application
                  </button>
                  <p className="text-xs text-brand-slate">Demo — document requirements shown for illustration.</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}