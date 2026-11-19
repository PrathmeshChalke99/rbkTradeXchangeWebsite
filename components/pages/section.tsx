import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Reveal } from './reveal';

type Tone = 'white' | 'paper' | 'tint';

export function Section({ children, className, tone = 'white', id, size = 'md' }: { children: React.ReactNode; className?: string; tone?: Tone; id?: string; size?: 'sm' | 'md' }) {
  return (
    <section
      id={id}
      className={cn(
        'relative',
        size === 'md' ? 'py-14 sm:py-20' : 'py-10 sm:py-14',
        tone === 'white' && 'bg-white',
        tone === 'paper' && 'bg-brand-paper',
        tone === 'tint' && 'bg-gradient-to-b from-brand-paper to-white',
        className,
      )}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/**
 * Section heading. Centered by default; pass `center={false}` for a left-aligned heading,
 * optionally with an `action` (link/button) aligned to the right on wide screens.
 */
export function Heading({ eyebrow, title, text, center = true, action, className }: {
  eyebrow?: string; title: React.ReactNode; text?: React.ReactNode; center?: boolean; action?: React.ReactNode; className?: string;
}) {
  const body = (
    <div className={cn('max-w-2xl', center && !action && 'mx-auto text-center')}>
      {eyebrow && <span className={cn('eyebrow mb-3', center && !action && 'justify-center')}>{eyebrow}</span>}
      <h2 className={'text-h2 font-semibold text-brand-ink'}>{title}</h2>
      {text && <p className={'mt-3 text-base leading-relaxed text-brand-slate sm:text-[1.05rem]'}>{text}</p>}
    </div>
  );
  if (!action) return <Reveal className={cn('mb-10 sm:mb-12', className)}>{body}</Reveal>;
  return (
    <Reveal className={cn('mb-10 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between', className)}>
      {body}
      <div className="shrink-0">{action}</div>
    </Reveal>
  );
}

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p className={cn('flex gap-3 rounded-xl border border-brand-line bg-brand-paper p-4 text-xs leading-relaxed text-brand-slate', className)}>
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden />
      <span>RBK TradeXchange is a technology platform, not a bank, NBFC or lender. Product descriptions are general information. Eligibility, pricing, tenure and security are decided independently by participating lenders.</span>
    </p>
  );
}
