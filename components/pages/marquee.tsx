import { allSubs } from '@/lib/content';

/** Endless, pause-on-hover ribbon of every finance sub-product. */
export function Marquee() {
  const items = [...allSubs, ...allSubs];
  return (
    <div className="group relative overflow-hidden border-b border-brand-line bg-white py-4" aria-label="Finance products covered">
      <ul className="mask-fade-x flex w-max animate-marquee items-center gap-2.5 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {items.map((s, i) => (
          <li key={i} aria-hidden={i >= allSubs.length} className="flex items-center gap-2.5 whitespace-nowrap text-[13px] font-medium text-brand-slate">
            <span className="h-1 w-1 rounded-full bg-brand-sky" aria-hidden />
            {s.name}
            <span className="font-mono text-[10.5px] text-brand-slate/55">{s.product}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
