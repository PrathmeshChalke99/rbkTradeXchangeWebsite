import { categories, modules, eDocs, allProducts, allSubs } from '@/lib/content';
import { CountUp } from './count-up';

/** Factual platform coverage figures, derived from the content model (not marketing claims). */
export function StatsStrip() {
  const stats = [
    { v: categories.length, k: 'Finance categories', n: 'Trade, supply chain, corporate' },
    { v: allProducts.length, k: 'Finance products', n: 'Explained with documents & FAQs' },
    { v: allSubs.length, k: 'Sub-products', n: 'From packing credit to LRD' },
    { v: modules.length, k: 'Platform modules', n: 'One connected workspace' },
    { v: eDocs.length, k: 'E-doc templates', n: 'With live preview' },
  ];
  return (
    <div className="border-b border-brand-line bg-white">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:grid-cols-3 sm:px-6 lg:grid-cols-5 lg:px-8">
        {stats.map((s, i) => (
          <div key={s.k} className={`border-brand-line py-6 sm:py-8 ${i > 0 ? 'lg:border-l lg:pl-8' : ''} ${i === 4 ? 'col-span-2 sm:col-span-1' : ''}`}>
            <dd className="font-heading text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl"><CountUp value={s.v} /></dd>
            <dt className="mt-1 text-sm font-medium text-brand-ink">{s.k}</dt>
            <p className="text-xs text-brand-slate">{s.n}</p>
          </div>
        ))}
      </dl>
    </div>
  );
}
