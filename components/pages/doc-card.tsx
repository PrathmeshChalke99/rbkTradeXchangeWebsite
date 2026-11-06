import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { EDoc } from '@/lib/content';

/** Template card drawn as a miniature document instead of a stock photo. */
export function DocCard({ d }: { d: EDoc }) {
  return (
    <Link href={`/documents/${d.slug}`} className="card card-hover ring-gradient group flex h-full flex-col overflow-hidden">
      <div className="relative flex h-44 items-end justify-center overflow-hidden px-8 pt-6" style={{ background: `linear-gradient(180deg, ${d.bg}, #ffffff)` }}>
        <div className="grid-lines-light absolute inset-0" aria-hidden />
        <div className="relative w-full max-w-[220px] translate-y-3 rounded-t-lg bg-white shadow-lift ring-1 ring-black/5 transition duration-500 ease-out-expo group-hover:translate-y-0 group-hover:-rotate-1">
          <div className="rounded-t-lg px-3 py-2 text-white" style={{ background: d.color }}>
            <p className="font-mono text-[7px] uppercase tracking-[0.2em] opacity-80">RBK / E-Docs</p>
            <p className="font-heading text-[11px] font-semibold">{d.label}</p>
          </div>
          <div className="space-y-1.5 p-3" aria-hidden>
            <div className="flex gap-2"><span className="h-1.5 w-1/2 rounded-full bg-brand-line" /><span className="h-1.5 w-1/3 rounded-full bg-brand-line" /></div>
            <span className="block h-1.5 w-3/4 rounded-full bg-brand-line" />
            <div className="mt-2 grid grid-cols-4 gap-1 rounded border border-brand-line p-1.5">
              <span className="col-span-2 h-1.5 rounded-full bg-brand-paleblue" /><span className="h-1.5 rounded-full bg-brand-line" /><span className="h-1.5 rounded-full bg-brand-line" />
              <span className="col-span-2 h-1.5 rounded-full bg-brand-line" /><span className="h-1.5 rounded-full bg-brand-line" /><span className="h-1.5 rounded-full bg-brand-line" />
            </div>
            <div className="flex justify-end pt-1"><span className="h-2 w-12 rounded-full" style={{ background: d.color, opacity: 0.5 }} /></div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col border-t border-brand-line p-5">
        <h3 className="text-lg font-semibold text-brand-ink">{d.name}</h3>
        <p className="mt-1 text-sm font-medium text-brand-ink/80">{d.short}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-slate">{d.usedWhen}</p>
        <span className="link-arrow mt-4">Try the template<ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  );
}
