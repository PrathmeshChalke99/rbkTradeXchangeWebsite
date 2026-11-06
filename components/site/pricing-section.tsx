'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Check, ArrowRight, Info } from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Starter',
    description: 'Essential tools for small import-export businesses',
    monthly: 999,
    annual: 9990,
    color: '#1d5fd6',
    bg: '#e2ecfa',
    features: [
      'Trade document management',
      'Basic AI document analysis',
      'Up to 10 trade documents/month',
      'Network management (up to 20 partners)',
      'E-Docs (basic templates)',
      'Email support',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    description: 'For growing businesses with active trade workflows',
    monthly: 2999,
    annual: 29990,
    color: '#4c5fd5',
    bg: '#eceffb',
    features: [
      'Everything in Starter',
      'Advanced AI document analysis',
      'Unlimited trade documents',
      'Business finance applications',
      'Lender quotation dashboard',
      'LC discrepancy checking',
      'E-Docs (all templates)',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with custom requirements',
    monthly: null,
    annual: null,
    color: '#0f9a8a',
    bg: '#ddf4ee',
    features: [
      'Everything in Professional',
      'AI client assessment',
      'Custom finance categories',
      'Unlimited network partners',
      'Dedicated account manager',
      'API access',
      'Custom integrations',
      'SLA & priority support',
    ],
    highlighted: false,
  },
];

export function PricingSection() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section id="pricing" className="relative overflow-hidden bg-brand-paper py-14 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Plans"
          title={<>Choose the plan that <span className="gradient-text">fits your trade</span></>}
          description="Every plan includes the Trade Management portal. Upgrade as your document volume and finance activity grow."
        />

        {/* Billing toggle */}
        <div className="mt-8 flex justify-center">
          <div role="radiogroup" aria-label="Billing period" className="inline-flex rounded-xl border border-brand-line bg-white p-1 shadow-soft">
            {(['monthly', 'annual'] as const).map((b) => (
              <button key={b} role="radio" aria-checked={billing === b} onClick={() => setBilling(b)}
                className={cn('relative rounded-lg px-4 py-2 text-sm font-medium transition-colors', billing === b ? 'text-white' : 'text-brand-slate hover:text-brand-ink')}>
                {billing === b && <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-lg bg-brand-navy" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="relative flex items-center gap-1.5">
                  {b === 'monthly' ? 'Monthly' : 'Annual'}
                  {b === 'annual' && <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-semibold', billing === b ? 'bg-white/15 text-white' : 'bg-brand-mint text-brand-turquoise')}>Save ~17%</span>}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const dark = plan.highlighted;
            const custom = plan.monthly === null;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'relative flex flex-col rounded-3xl p-6 sm:p-7 transition duration-300 hover:-translate-y-1',
                  dark ? 'surface-dark on-dark shadow-lift' : 'border border-brand-line bg-white shadow-soft hover:shadow-lift',
                )}
              >
                {dark && <div className="grid-lines absolute inset-0 rounded-3xl" aria-hidden />}
                <div className="relative flex items-center justify-between">
                  <h3 className={cn('text-lg font-semibold', dark ? 'text-white' : 'text-brand-ink')}>{plan.name}</h3>
                  {dark && <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#8cc8f0] ring-1 ring-white/15">Most popular</span>}
                </div>
                <p className={cn('relative mt-1.5 text-sm', dark ? 'text-white/60' : 'text-brand-slate')}>{plan.description}</p>

                <div className="relative mt-6 h-14">
                  <AnimatePresence mode="wait">
                    <motion.div key={billing} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="flex items-baseline gap-1">
                      {custom ? (
                        <span className={cn('font-heading text-3xl font-semibold', dark ? 'text-white' : 'text-brand-ink')}>Custom</span>
                      ) : (
                        <>
                          <span className={cn('kbd-num font-heading text-4xl font-semibold tracking-tight', dark ? 'text-white' : 'text-brand-ink')}>
                            ₹{billing === 'monthly' ? plan.monthly!.toLocaleString('en-IN') : plan.annual!.toLocaleString('en-IN')}
                          </span>
                          <span className={cn('text-sm', dark ? 'text-white/55' : 'text-brand-slate')}>/{billing === 'monthly' ? 'month' : 'year'}</span>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <Link href={custom ? '/contact' : '/signup'} className={cn('relative mt-2 w-full', dark ? 'btn-light' : custom ? 'btn-secondary' : 'btn-primary')}>
                  {custom ? 'Contact sales' : 'Get started'}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <ul className={cn('relative mt-6 space-y-2.5 border-t pt-6', dark ? 'border-white/10' : 'border-brand-line')}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span className={cn('mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full', dark ? 'bg-white/10 text-[#8cc8f0]' : '')} style={dark ? undefined : { background: plan.bg, color: plan.color }}>
                        <Check className="h-3 w-3" />
                      </span>
                      <span className={cn('text-sm', dark ? 'text-white/85' : 'text-brand-ink')}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 text-center text-xs text-brand-slate">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Plan names, prices and entitlements are shown for illustration. Actual configuration and billing are managed within the platform.
        </p>
      </div>
    </section>
  );
}
