import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from './breadcrumbs';
import { Reveal } from './reveal';
import { Photo } from './photo';
import { cn } from '@/lib/utils';

type Cta = { label: string; href: string };

/**
 * Dark "command-centre" hero used by every inner page: aurora glow, hairline grid,
 * breadcrumbs, headline, chips, CTAs and an optional framed photo with an overlay card.
 */
export function PageHero({ eyebrow, title, description, image, fallback, imageAlt, crumbs, primary, secondary, chips, aside, compact }: {
  eyebrow: string; title: React.ReactNode; description: string; image?: string; fallback?: string; imageAlt?: string;
  crumbs?: { label: string; href?: string }[]; primary?: Cta; secondary?: Cta; chips?: string[];
  /** Optional element layered over the photo (e.g. a sample status card). */
  aside?: React.ReactNode;
  compact?: boolean;
}) {
  const hasMedia = !!image;
  return (
    <section className="surface-dark on-dark noise">
      <div className="grid-lines absolute inset-0" aria-hidden />
      <div className="aurora-blob -left-32 -top-40 h-[28rem] w-[28rem] bg-brand-blue/30" aria-hidden />
      <div className="aurora-blob -right-24 top-10 h-[24rem] w-[24rem] bg-brand-sky/20 [animation-delay:-8s]" aria-hidden />

      <div className={cn('relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:px-8', compact ? 'pb-12 pt-28 sm:pt-32' : 'pb-14 pt-28 sm:pb-20 sm:pt-32', hasMedia && 'lg:grid-cols-[1.1fr_1fr] lg:gap-14')}>
        <Reveal>
          {crumbs && <Breadcrumbs items={crumbs} dark />}
          <span className="eyebrow eyebrow-dark">{eyebrow}</span>
          <h1 className={cn('mt-4 font-semibold text-white', hasMedia ? 'text-display-sm' : 'max-w-3xl text-display-sm')}>{title}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{description}</p>
          {chips && chips.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Highlights">
              {chips.map((c) => <li key={c} className="chip-dark">{c}</li>)}
            </ul>
          )}
          {(primary || secondary) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primary && <Link href={primary.href} className="btn-primary btn-lg">{primary.label}<ArrowRight className="h-4 w-4" /></Link>}
              {secondary && <Link href={secondary.href} className="btn-ghost-dark btn-lg">{secondary.label}</Link>}
            </div>
          )}
        </Reveal>

        {hasMedia && (
          <Reveal delay={0.12} className="relative">
            <div className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] sm:aspect-[16/11]">
                <Photo src={image!} fallback={fallback} alt={imageAlt ?? ''} priority />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-night/70 via-brand-night/10 to-transparent" />
              </div>
            </div>
            {aside && <div className="absolute -bottom-6 left-4 right-4 sm:-left-6 sm:right-auto">{aside}</div>}
          </Reveal>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />
    </section>
  );
}
