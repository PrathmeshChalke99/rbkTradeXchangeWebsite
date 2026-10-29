'use client';

import { motion } from 'framer-motion';
import {
  UserPlus, FileSearch, Landmark, Handshake, FilePlus,
} from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { tradeWorkflowSteps } from '@/lib/site-config';
import { fadeInUp, slideInLeft, slideInRight } from '@/lib/animations';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  UserPlus, FileSearch, Landmark, Handshake, FilePlus,
};

export function TradeWorkflow() {
  return (
    <section id="workflow" className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-paleblue/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 h-80 w-80 rounded-full bg-brand-mint/30 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title={<>The complete <span className="gradient-text-violet">trade workflow</span></>}
          description="From signup to e-doc generation — follow the five-step journey that connects every part of your trade finance process."
        />

        {/* Desktop: Horizontal timeline */}
        <div className="mt-16 hidden lg:block">
          <div className="relative">
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="absolute top-8 left-0 right-0 h-1"
              preserveAspectRatio="none"
              viewBox="0 0 100 1"
            >
              <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#dbeafe" strokeWidth="1" />
            </motion.svg>
            <div className="relative grid grid-cols-5 gap-4">
              {tradeWorkflowSteps.map((step, i) => {
                const Icon = iconMap[step.icon] || UserPlus;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="text-center"
                  >
                    <div className="relative mx-auto mb-4 flex justify-center">
                      <div
                        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 bg-white shadow-soft transition-transform hover:scale-110"
                        style={{ borderColor: step.color, background: step.bg }}
                      >
                        <Icon className="h-7 w-7" style={{ color: step.color }} />
                        <motion.div
                          className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                          style={{ background: step.color }}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.12 + 0.3, type: 'spring' }}
                        >
                          {step.id}
                        </motion.div>
                      </div>
                      {i < tradeWorkflowSteps.length - 1 && (
                        <motion.div
                          className="absolute top-8 left-1/2 w-full h-0.5"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.12 + 0.3 }}
                          style={{ background: `linear-gradient(90deg, ${step.color}, ${tradeWorkflowSteps[i + 1].color})`, transformOrigin: 'left' }}
                        />
                      )}
                    </div>
                    <h3 className="font-heading text-base font-semibold text-brand-ink mb-1.5">{step.title}</h3>
                    <p className="text-sm text-brand-slate leading-relaxed px-2">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="mt-12 space-y-6 lg:hidden">
          {tradeWorkflowSteps.map((step, i) => {
            const Icon = iconMap[step.icon] || UserPlus;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 bg-white shadow-soft"
                    style={{ borderColor: step.color, background: step.bg }}
                  >
                    <Icon className="h-6 w-6" style={{ color: step.color }} />
                  </div>
                  {i < tradeWorkflowSteps.length - 1 && (
                    <div className="w-0.5 flex-1 mt-2" style={{ background: `linear-gradient(to bottom, ${step.color}, ${tradeWorkflowSteps[i + 1].color}40)` }} />
                  )}
                </div>
                <div className="pt-1 pb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded text-white" style={{ background: step.color }}>
                      {step.id}
                    </span>
                    <h3 className="font-heading text-base font-semibold text-brand-ink">{step.title}</h3>
                  </div>
                  <p className="text-sm text-brand-slate leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}