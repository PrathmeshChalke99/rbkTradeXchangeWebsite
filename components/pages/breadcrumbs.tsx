import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Breadcrumbs({ items, dark = false }: { items: { label: string; href?: string }[]; dark?: boolean }) {
  const muted = dark ? 'text-white/55 hover:text-white' : 'text-brand-slate hover:text-brand-blue';
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className={cn('flex flex-wrap items-center gap-1 text-[13px]', dark ? 'text-white/55' : 'text-brand-slate')}>
        <li><Link href="/" className={cn('transition-colors', muted)}>Home</Link></li>
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
            {it.href ? (
              <Link href={it.href} className={cn('transition-colors', muted)}>{it.label}</Link>
            ) : (
              <span aria-current={i === items.length - 1 ? 'page' : undefined} className={cn('font-medium', dark ? 'text-white' : 'text-brand-ink')}>{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
