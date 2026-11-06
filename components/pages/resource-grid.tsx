'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Clock, SearchX, Search, X } from 'lucide-react';
import type { Article } from '@/lib/content';
import { Photo } from './photo';
import { cn } from '@/lib/utils';

export function ResourceGrid({ items, filterable = true }: { items: Article[]; filterable?: boolean }) {
  const tags = useMemo(() => ['All', ...Array.from(new Set(items.map((i) => i.tag)))], [items]);
  const [tag, setTag] = useState('All');
  const [q, setQ] = useState('');
  const shown = items.filter((i) => (tag === 'All' || i.tag === tag) && (i.title + i.excerpt).toLowerCase().includes(q.toLowerCase()));
  const reset = () => { setTag('All'); setQ(''); };

  return (
    <div>
      {filterable && (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filter by topic">
            {tags.map((t) => (
              <button key={t} role="tab" aria-selected={tag === t} onClick={() => setTag(t)}
                className={cn('relative shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors', tag === t ? 'text-white' : 'text-brand-slate hover:text-brand-ink')}>
                {tag === t && <motion.span layoutId="res-tag" className="absolute inset-0 rounded-full bg-brand-navy" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                {tag !== t && <span className="absolute inset-0 rounded-full border border-brand-line bg-white" />}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>
          <label className="relative block sm:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate" aria-hidden />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search guides" aria-label="Search guides" className="field rounded-full py-2 pl-10 pr-9" />
            {q && <button onClick={() => setQ('')} aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-brand-slate hover:bg-brand-paper"><X className="h-3.5 w-3.5" /></button>}
          </label>
        </div>
      )}

      {shown.length === 0 && (
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-brand-line bg-white px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-paleblue text-brand-blue"><SearchX className="h-6 w-6" /></span>
          <h3 className="mt-4 text-lg font-semibold text-brand-ink">No guides match &ldquo;{q || tag}&rdquo;</h3>
          <p className="mt-1 max-w-sm text-sm text-brand-slate">Try a broader term such as &ldquo;LC&rdquo;, &ldquo;invoice&rdquo; or &ldquo;working capital&rdquo;, or clear the filters.</p>
          <button onClick={reset} className="btn-secondary mt-5">Clear filters</button>
        </div>
      )}

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((a) => (
            <motion.div key={a.slug} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }}>
              <Link href={`/resources/${a.slug}`} className="card card-hover ring-gradient group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden"><Photo src={a.photo ?? a.image} fallback={a.image} alt="" className="transition duration-700 ease-out-expo group-hover:scale-105" /></div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-md bg-brand-paleblue px-2 py-0.5 font-semibold text-brand-blue">{a.tag}</span>
                    <span className="flex items-center gap-1 text-brand-slate"><Clock className="h-3 w-3" aria-hidden />{a.read}</span>
                  </div>
                  <h3 className="mt-3 text-[17px] font-semibold leading-snug text-brand-ink transition-colors group-hover:text-brand-blue">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-brand-slate">{a.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">Read guide<ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
