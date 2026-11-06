import Link from 'next/link';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { modules } from '@/lib/content';
import { Icon } from './icon';
import { RevealGroup, RevealItem } from './reveal';
import { cn } from '@/lib/utils';

/** Bento grid of the six platform modules; Responsible AI closes the grid as a dark trust band. */
export function ModuleBento() {
  const main = modules.filter((m) => m.slug !== 'responsible-ai');
  const rai = modules.find((m) => m.slug === 'responsible-ai');
  return (
    <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {main.map((m, i) => {
        const big = i === 0;
        return (
          <RevealItem key={m.slug} className={cn(big && 'md:col-span-2')}>
            <Link href={`/platform/${m.slug}`} className="card card-hover ring-gradient group relative flex h-full flex-col overflow-hidden p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" style={{ background: m.bg }} aria-hidden />
              <div className="relative flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105" style={{ background: m.bg, color: m.color }}><Icon name={m.icon} className="h-5 w-5" /></span>
                <ArrowRight className="h-4 w-4 -translate-x-1 text-brand-slate opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
              <h3 className="relative mt-5 text-lg font-semibold text-brand-ink">{m.name}</h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-brand-slate">{m.headline} {big ? m.intro : ''}</p>
              <ul className={cn('relative mt-5 grid gap-2 border-t border-brand-line pt-4', big && 'sm:grid-cols-2')}>
                {m.highlights.slice(0, big ? 4 : 2).map((h) => (
                  <li key={h} className="flex items-start gap-2 text-[13px] text-brand-ink"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: m.color }} />{h}</li>
                ))}
              </ul>
            </Link>
          </RevealItem>
        );
      })}
      {rai && (
        <RevealItem className="md:col-span-2 lg:col-span-3">
          <Link href={`/platform/${rai.slug}`} className="surface-dark on-dark group flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="grid-lines absolute inset-0" aria-hidden />
            <div className="relative flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#8cc8f0]"><ShieldCheck className="h-5 w-5" /></span>
              <div>
                <h3 className="text-lg font-semibold text-white">{rai.name}: {rai.headline}</h3>
                <p className="mt-1 max-w-2xl text-sm text-white/60">{rai.intro}</p>
              </div>
            </div>
            <span className="relative inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white">Our AI principles<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
          </Link>
        </RevealItem>
      )}
    </RevealGroup>
  );
}
