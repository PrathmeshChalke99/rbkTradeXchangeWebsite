import { cn } from '@/lib/utils';
import { Photo } from './photo';

export function Illustration({ src, fallback, alt, className, priority, ratio = '3 / 2', children }: { src: string; fallback?: string; alt: string; className?: string; priority?: boolean; ratio?: string; children?: React.ReactNode }) {
  return (
    <div className={cn('relative overflow-hidden rounded-3xl bg-brand-paleblue/40 shadow-lift ring-1 ring-black/5', className)} style={{ aspectRatio: ratio }}>
      <Photo src={src} fallback={fallback} alt={alt} priority={priority} />
      {children}
    </div>
  );
}
