'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { faqs } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-14 sm:py-20 bg-white overflow-hidden">

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Platform basics"
          title="The platform, in plain terms"
          description="Everything you need to know about what RBK TradeXchange is — and what it isn't."
        />

        <div className="mt-10 space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                'overflow-hidden rounded-2xl border transition-all duration-300',
                open === i ? 'border-brand-blue/30 bg-white shadow-lift' : 'border-brand-line bg-white shadow-soft hover:border-brand-blue/20'
              )}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className={cn('h-5 w-5 shrink-0 mt-0.5', open === i ? 'text-brand-blue' : 'text-brand-slate')} />
                  <span className="font-heading text-[15px] font-semibold text-brand-ink">{faq.q}</span>
                </div>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-brand-slate shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 pl-[3.25rem] text-sm leading-relaxed text-brand-slate">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}