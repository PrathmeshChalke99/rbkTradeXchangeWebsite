'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, TrendingUp, AlertCircle, FileCheck, Gauge,
  CheckCircle2, Info,
} from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { lenderAssessmentNodes } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function AIClientAssessment() {
  const [assessing, setAssessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeLender, setActiveLender] = useState<string | null>(null);

  useEffect(() => {
    if (!assessing) return;
    if (progress < 100) {
      const timer = setTimeout(() => setProgress((p) => Math.min(p + 2, 100)), 50);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setAssessing(false), 500);
    return () => clearTimeout(timer);
  }, [assessing, progress]);

  const startAssessment = () => {
    setProgress(0);
    setAssessing(true);
  };

  const fitFactors = [
    { label: 'Document Completeness', value: 85, icon: FileCheck, color: '#10b981' },
    { label: 'Financial Health', value: 72, icon: TrendingUp, color: '#1d5fd6' },
    { label: 'Credit Profile Alignment', value: 68, icon: Gauge, color: '#4c5fd5' },
    { label: 'Missing Information', value: 15, icon: AlertCircle, color: '#b7700b' },
  ];

  return (
    <section id="ai-assessment" className="relative py-14 sm:py-20 bg-brand-paper overflow-hidden">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="AI Client Assessment"
          title={<>How well does your application <span className="gradient-text">fit each lender?</span></>}
          description="AI analyzes how closely your finance application aligns with each participating lender's criteria. The fit score is an estimate — not a loan approval guarantee."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2 items-center">
          {/* Left: Lender network graph */}
          <div className="relative aspect-square max-w-md mx-auto w-full rounded-2xl border border-brand-paleblue bg-gradient-to-br from-brand-paleblue/10 via-white to-brand-mint/10 overflow-hidden">
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full">
              {lenderAssessmentNodes.map((node) => (
                <motion.line
                  key={`line-${node.id}`}
                  x1="50%"
                  y1="50%"
                  x2={`${node.x}%`}
                  y2={`${node.y}%`}
                  stroke={assessing ? '#44a0dc' : node.fit > 60 ? '#0f9a8a' : '#b7700b'}
                  strokeWidth={1.5}
                  strokeDasharray="5 3"
                  animate={{ opacity: assessing ? [0.2, 0.8, 0.2] : [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() }}
                />
              ))}
            </svg>

            {/* Central application node */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              animate={{ scale: assessing ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 1.5, repeat: assessing ? Infinity : 0 }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-violet shadow-glow-blue">
                <Brain className="h-9 w-9 text-white" />
              </div>
              <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-brand-ink">Your Application</span>
            </motion.div>

            {/* Lender nodes */}
            {lenderAssessmentNodes.map((node, i) => {
              const color = node.fit > 70 ? '#10b981' : node.fit > 50 ? '#4c5fd5' : '#b7700b';
              const bg = node.fit > 70 ? '#ddf4ee' : node.fit > 50 ? '#eceffb' : '#fdf3da';
              const nodeProgress = assessing ? Math.min(progress, node.fit) : node.fit;
              return (
                <motion.div
                  key={node.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  onMouseEnter={() => setActiveLender(node.id)}
                  onMouseLeave={() => setActiveLender(null)}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div
                    className={cn(
                      'relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all',
                      activeLender === node.id && 'scale-110 shadow-doc'
                    )}
                    style={{ background: bg, borderColor: color }}
                  >
                    {/* Progress ring */}
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
                      <circle
                        cx="28" cy="28" r="24"
                        fill="none"
                        stroke={color}
                        strokeWidth="3"
                        strokeDasharray={`${(nodeProgress / 100) * 150.8} 150.8`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="font-mono text-sm font-bold" style={{ color }}>{Math.round(nodeProgress)}%</span>
                  </div>
                  <span className="absolute top-full mt-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-brand-ink">
                    {node.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Assessment panel */}
          <div className="space-y-4">
            {/* Fit score */}
            <div className="rounded-xl border border-brand-paleblue bg-white/90 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-brand-blue" />
                  <h4 className="font-heading text-sm font-semibold text-brand-ink">Estimated Application-to-Lender Fit</h4>
                </div>
                <button
                  onClick={startAssessment}
                  disabled={assessing}
                  className="rounded-lg bg-brand-blue px-4 py-1.5 text-xs font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50"
                >
                  {assessing ? 'Assessing…' : 'Run Assessment'}
                </button>
              </div>

              {assessing || progress > 0 ? (
                <div className="space-y-3">
                  {fitFactors.map((factor) => {
                    const Icon = factor.icon;
                    const v = assessing ? Math.min(progress / 100 * factor.value, factor.value) : factor.value;
                    return (
                      <div key={factor.label}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <Icon className="h-3.5 w-3.5" style={{ color: factor.color }} />
                            <span className="text-xs font-medium text-brand-ink">{factor.label}</span>
                          </div>
                          <span className="font-mono text-xs font-bold" style={{ color: factor.color }}>{Math.round(v)}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-brand-paleblue/40 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: factor.color }}
                            animate={{ width: `${v}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center py-8 text-center">
                  <div>
                    <Info className="mx-auto h-8 w-8 text-brand-paleblue mb-2" />
                    <p className="text-sm text-brand-slate">Click "Run Assessment" to see estimated fit scores for each lender.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Active lender details */}
            {activeLender && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border-2 border-brand-paleblue bg-white/90 p-4 shadow-soft"
              >
                {(() => {
                  const node = lenderAssessmentNodes.find((n) => n.id === activeLender)!;
                  return (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-heading text-sm font-semibold text-brand-ink">{node.label}</h4>
                        <span className="font-mono text-lg font-bold text-brand-blue">{node.fit}%</span>
                      </div>
                      <p className="text-xs text-brand-slate">
                        Estimated fit based on document completeness, financial health, and credit profile alignment.
                        This is an estimate and not a verified outcome.
                      </p>
                    </>
                  );
                })()}
              </motion.div>
            )}

            {/* Disclaimer */}
            <div className="flex items-start gap-2.5 rounded-xl bg-brand-peach/30 border border-amber-200/40 p-4">
              <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-brand-ink">AI does not make lending decisions</p>
                <p className="text-xs text-brand-slate mt-1">
                  Participating lenders make their own decisions according to their criteria and processes.
                  The fit score is an estimate to help you understand alignment — not a loan approval guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}