'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Brain, Eye, Lock, FileCheck, Scale } from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const principles = [
  {
    icon: Brain,
    title: 'AI Assists, Never Decides',
    description: 'AI helps with document analysis and assessment, but it never makes the final call. Lenders make their own decisions. Professionals review documents.',
    color: '#2563eb',
    bg: '#dbeafe',
  },
  {
    icon: Eye,
    title: 'Transparent & Labeled',
    description: 'Every AI feature is clearly labeled. Sample data is identified as such. Simulated results are never presented as real backend operations.',
    color: '#8b5cf6',
    bg: '#ede9fe',
  },
  {
    icon: FileCheck,
    title: 'No Guaranteed Accuracy',
    description: 'AI-assisted document analysis does not guarantee perfect accuracy. All results should be reviewed by a human before final decisions.',
    color: '#5eead4',
    bg: '#d1fae5',
  },
  {
    icon: Lock,
    title: 'Data Handling',
    description: 'Your documents and financial information are handled with care. Access is controlled and data is used only for the stated purpose.',
    color: '#f59e0b',
    bg: '#fef3c7',
  },
  {
    icon: Scale,
    title: 'Honest Business Claims',
    description: 'RBK TradeXchange is a technology platform — not a bank, NBFC, or lender. We do not claim certifications or regulatory authorizations we do not hold.',
    color: '#ec4899',
    bg: '#fce7f3',
  },
  {
    icon: ShieldCheck,
    title: 'Professional Review Required',
    description: 'AI does not replace required professional review of LC documents or financial assessments. Qualified professionals must always be involved.',
    color: '#14b8a6',
    bg: '#ccfbf1',
  },
];

export function ResponsibleAI() {
  return (
    <section id="responsible-ai" className="relative py-20 sm:py-28 mesh-bg overflow-hidden">
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-brand-mint/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-brand-lavender/30 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Responsible AI & Data Handling"
          title={<>AI you can <span className="gradient-text">trust</span> — with clear boundaries</>}
          description="We are transparent about what AI does and what it doesn't do. These principles guide every feature we build."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-brand-paleblue/60 bg-white/70 backdrop-blur-sm p-5 shadow-soft"
              >
                <div
                  className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: p.bg }}
                >
                  <Icon className="h-5 w-5" style={{ color: p.color }} />
                </div>
                <h3 className="font-heading text-sm font-semibold text-brand-ink mb-1.5">{p.title}</h3>
                <p className="text-xs text-brand-slate leading-relaxed">{p.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}