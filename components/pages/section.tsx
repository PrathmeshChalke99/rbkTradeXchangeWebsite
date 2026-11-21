import { cn } from '@/lib/utils';
import { Reveal } from './reveal';

type Tone = 'white' | 'paper' | 'tint';

export function Section({ children, className, tone = 'white', id, size = 'md' }: { children: React.ReactNode; className?: string; tone?: Tone; id?: string; size?: 'sm' | 'md' }) {
  return (
    <section
      id={id}
      className={cn(
        'relative',
        size === 'md' ? 'py-12 sm:py-16' : 'py-8 sm:py-10',
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
  if (!action) return <Reveal className={cn('mb-8 sm:mb-10', className)}>{body}</Reveal>;
  return (
    <Reveal className={cn('mb-10 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between', className)}>
      {body}
      <div className="shrink-0">{action}</div>
    </Reveal>
  );
}
