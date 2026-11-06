'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building2, Check, Globe2, Layers, Truck, Workflow } from 'lucide-react';
import { categories } from '@/lib/content';
import { Photo } from './photo';
import { cn } from '@/lib/utils';

const catIcon: Record<string, typeof Globe2> = {
  'international-trade-finance': Globe2,
  'domestic-supply-chain-finance': Truck,
  'corporate-finance': Building2,
};
const ease = [0.16, 1, 0.3, 1] as const;

export function FinanceExplorer() {
  const [active, setActive] = useState(0);
  const c = categories[active];
  const subCount = c.products.reduce((n, p) => n + p.subs.length, 0);

  return (
    <div>
      <div role="tablist" aria-label="Finance categories" className="mx-auto mb-8 grid max-w-4xl gap-1.5 rounded-2xl border border-brand-line bg-white p-1.5 shadow-soft sm:grid-cols-3">
        {categories.map((cat, i) => {
          const I = catIcon[cat.slug] ?? Globe2;
          const on = active === i;
          return (
            <button key={cat.slug} role="tab" aria-selected={on} aria-controls="finance-panel" onClick={() => setActive(i)}
              className={cn('relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-colors', on ? 'text-white' : 'text-brand-ink hover:bg-brand-paper')}>
              {on && <motion.span layoutId="finance-tab" className="absolute inset-0 rounded-xl bg-brand-navy shadow-lift" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
              <span className={cn('relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors', on ? 'bg-white/10 text-white' : '')} style={on ? undefined : { background: cat.bg, color: cat.color }}><I className="h-[18px] w-[18px]" /></span>
              <span className="relative min-w-0">
                <span className="block text-sm font-semibold leading-tight">{cat.name}</span>
                <span className={cn('mt-0.5 block truncate text-xs', on ? 'text-white/65' : 'text-brand-slate')}>{cat.short}</span>
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div id="finance-panel" role="tabpanel" key={c.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease }}>
          <div className="mb-6 flex flex-col justify-between gap-5 rounded-2xl border border-brand-line bg-white p-5 shadow-soft sm:p-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h3 className="text-xl font-semibold text-brand-ink">{c.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-slate">{c.description}</p>
            </div>
            <dl className="grid shrink-0 grid-cols-3 divide-x divide-brand-line rounded-xl border border-brand-line bg-brand-paper">
              {[{ icon: Layers, k: 'Products', v: String(c.products.length) }, { icon: Workflow, k: 'Sub-products', v: String(subCount) }, { icon: Globe2, k: 'Focus', v: c.stage }].map((s) => (
                <div key={s.k} className="px-3 py-3 text-center sm:px-4">
                  <dd className={cn('font-heading font-semibold text-brand-ink', s.v.length > 3 ? 'whitespace-nowrap text-sm leading-7' : 'text-lg')}>{s.v}</dd>
                  <dt className="mt-0.5 flex items-center justify-center gap-1 text-[11px] text-brand-slate"><s.icon className="h-3 w-3" style={{ color: c.color }} aria-hidden />{s.k}</dt>
                </div>
              ))}
            </dl>
          </div>

          <motion.div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
            {c.products.map((p) => (
              <motion.div key={p.slug} variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}>
                <Link href={`/finance/${c.slug}/${p.slug}`} className="card card-hover ring-gradient group flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/8] overflow-hidden">
                    <Photo src={p.image} fallback={p.fallback} alt="" className="transition duration-700 ease-out-expo group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-night/80 via-brand-night/20 to-transparent" />
                    <h4 className="absolute bottom-3 left-4 right-4 text-lg font-semibold text-white">{p.name}</h4>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm text-brand-slate">{p.tagline}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Sub-products">
                      {p.subs.map((s) => <li key={s.name} className="rounded-md px-2 py-0.5 text-xs font-medium" style={{ background: c.bg, color: c.color }}>{s.name}</li>)}
                    </ul>
                    <ul className="mt-4 flex-1 space-y-1.5 border-t border-brand-line pt-4">
                      {p.bestFor.slice(0, 2).map((f) => <li key={f} className="flex items-start gap-2 text-[13px] text-brand-ink"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-turquoise" />{f}</li>)}
                    </ul>
                    <span className="link-arrow mt-5">View product<ArrowRight className="h-4 w-4" /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
