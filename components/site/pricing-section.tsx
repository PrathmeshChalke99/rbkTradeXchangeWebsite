'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, BookOpen } from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Starter',
    description: 'Essential tools for small import-export businesses',
    monthly: 999,
    annual: 9990,
    color: '#2563eb',
    bg: '#dbeafe',
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
    color: '#8b5cf6',
    bg: '#ede9fe',
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
    color: '#5eead4',
    bg: '#d1fae5',
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
    <section id="pricing" className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-brand-paleblue/30 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title={<>Choose the plan that <span className="gradient-text">fits your trade</span></>}
          description="Subscription plans with transparent entitlements. Prices shown are for illustration — actual plan configuration is managed within the platform."
        />

        {/* Billing toggle */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => setBilling('monthly')}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-all',
              billing === 'monthly' ? 'bg-brand-blue text-white shadow-soft' : 'text-brand-slate hover:bg-brand-paleblue/40'
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-all',
              billing === 'annual' ? 'bg-brand-blue text-white shadow-soft' : 'text-brand-slate hover:bg-brand-paleblue/40'
            )}
          >
            Annual
            <span className="ml-1.5 rounded-full bg-brand-mint/60 px-2 py-0.5 text-[10px] font-semibold text-success">
              Save ~17%
            </span>
          </button>
        </div>

        {/* Plans */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={cn(
                'relative rounded-2xl border-2 p-6 transition-all',
                plan.highlighted ? 'shadow-doc' : 'border-brand-paleblue/60 bg-white/80'
              )}
              style={plan.highlighted ? { borderColor: plan.color, background: plan.bg + '20' } : {}}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-brand-violet px-3 py-1 text-xs font-semibold text-white shadow-soft">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-heading text-xl font-bold text-brand-ink">{plan.name}</h3>
                <p className="text-sm text-brand-slate mt-1">{plan.description}</p>
              </div>

              <div className="mb-6 h-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={billing}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-baseline gap-1"
                  >
                    {plan.monthly === null ? (
                      <span className="font-heading text-3xl font-bold text-brand-ink">Custom</span>
                    ) : (
                      <>
                        <span className="font-heading text-4xl font-bold text-brand-ink">
                          ₹{billing === 'monthly' ? plan.monthly!.toLocaleString('en-IN') : plan.annual!.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-brand-slate">/{billing === 'monthly' ? 'month' : 'year'}</span>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <Button
                className={cn(
                  'w-full mb-6 gap-2',
                  plan.highlighted ? 'bg-brand-violet text-white hover:bg-brand-violet/90' : 'bg-brand-blue text-white hover:bg-brand-blue/90'
                )}
              >
                {plan.monthly === null ? 'Contact Sales' : 'Get Started'}
                <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="space-y-2.5">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <div
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{ background: plan.bg }}
                    >
                      <Check className="h-3 w-3" style={{ color: plan.color }} />
                    </div>
                    <span className="text-sm text-brand-ink">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-brand-slate">
          <BookOpen className="h-4 w-4" />
          Plan names, prices, and entitlements are shown for illustration. Actual configuration is managed within the platform.
        </div>
      </div>
    </section>
  );
}