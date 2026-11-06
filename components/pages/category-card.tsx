import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/lib/content';
import { Photo } from './photo';

export function CategoryCard({ c }: { c: Category }) {
  return (
    <Link href={`/finance/${c.slug}`} className="card card-hover ring-gradient group flex flex-col overflow-hidden">
      <div className="relative aspect-[16/8] overflow-hidden">
        <Photo src={c.image} fallback={c.fallback} alt="" className="transition duration-700 ease-out-expo group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-night/70 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-wider backdrop-blur" style={{ color: c.color }}>{c.stage}</span>
        <h3 className="absolute bottom-4 left-5 right-5 text-xl font-semibold text-white">{c.name}</h3>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex-1 text-sm leading-relaxed text-brand-slate">{c.short}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">{c.products.map((p) => <li key={p.slug} className="chip">{p.name}</li>)}</ul>
        <span className="link-arrow mt-5">Explore category<ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  );
}
