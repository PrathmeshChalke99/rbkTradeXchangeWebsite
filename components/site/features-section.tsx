'use client';

import { motion } from 'framer-motion';
import {
  ScanLine, Layers, Share2, LayoutDashboard, FileWarning,
  FilePlus, Accessibility, ShieldCheck,
} from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { features } from '@/lib/site-config';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ScanLine, Layers, Share2, LayoutDashboard, FileWarning,
  FilePlus, Accessibility, ShieldCheck,
};

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 sm:py-28 mesh-bg-soft overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title={<>Built for <span className="gradient-text">real trade finance</span> workflows</>}
          description="Every feature is designed around the actual import-export trade lifecycle — from document scanning to lender quotations."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] || ScanLine;
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-brand-paleblue/60 bg-white/70 backdrop-blur-sm p-5 shadow-soft transition-all hover:shadow-doc"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-paleblue to-brand-lavender transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5 text-brand-blue" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-brand-ink mb-1.5">{feature.title}</h3>
                <p className="text-xs text-brand-slate leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}