'use client';

import { motion } from 'framer-motion';
import {
  ScanLine, Landmark, Share2, Handshake, FilePlus, ShieldCheck,
} from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { platformCapabilities } from '@/lib/site-config';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  ScanLine, Landmark, Share2, Handshake, FilePlus, ShieldCheck,
};

export function PlatformCapabilities() {
  return (
    <section id="platform" className="relative py-20 sm:py-28 mesh-bg-soft overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-brand-lavender/40 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Platform Capabilities"
          title={<>Everything you need for <span className="gradient-text">trade finance</span></>}
          description="Six core capabilities that work together to manage your entire import-export trade lifecycle — from document analysis to lender quotations."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {platformCapabilities.map((cap) => {
            const Icon = iconMap[cap.icon] || ScanLine;
            return (
              <motion.div
                key={cap.title}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl border border-brand-paleblue/60 bg-white/80 backdrop-blur-sm p-6 shadow-soft transition-all hover:shadow-doc"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl mb-4 transition-transform group-hover:scale-110"
                  style={{ background: cap.bg }}
                >
                  <Icon className="h-6 w-6" style={{ color: cap.color }} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-brand-ink mb-2">{cap.title}</h3>
                <p className="text-sm text-brand-slate leading-relaxed">{cap.description}</p>
                <div
                  className="absolute bottom-0 left-0 h-1 rounded-b-2xl transition-all duration-300 group-hover:w-full"
                  style={{ width: '0%', background: `linear-gradient(90deg, ${cap.color}, ${cap.color}80)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}