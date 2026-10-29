'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Floating shapes */}
      <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-brand-paleblue/40 animate-blob blur-2xl" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-brand-lavender/40 animate-blob blur-2xl" style={{ animationDelay: '4s' }} />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="rounded-3xl border border-brand-paleblue/60 glass-card-strong p-10 sm:p-14 text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-brand-paleblue px-4 py-1.5 text-xs font-medium text-brand-slate shadow-soft mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-violet" />
            Start your trade finance journey today
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-ink"
          >
            Ready to trade smarter with{' '}
            <span className="gradient-text">AI-assisted</span> document intelligence?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-4 text-lg text-brand-slate max-w-xl mx-auto"
          >
            Sign up, choose your subscription plan, and start managing your trade documents,
            finance applications, and lender quotations — all in one platform.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-brand-blue text-white hover:bg-brand-blue/90 shadow-glow-blue gap-2 text-base h-12 px-8">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-brand-paleblue text-brand-ink hover:bg-brand-paleblue/50 h-12 px-8 text-base">
                Talk to Us
              </Button>
            </Link>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-xs text-brand-slate"
          >
            Technology platform — not a bank, NBFC, or lender. AI assists and does not replace professional review.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}