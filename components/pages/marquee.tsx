import { allSubs } from "@/lib/content";

export function Marquee() {
  const items = [...allSubs, ...allSubs];

  return (
    <div
      className="group relative overflow-hidden border-b border-brand-line bg-white py-4"
      aria-label="Finance products covered"
    >
      <ul className="mask-fade-x flex w-max animate-marquee-slow items-center gap-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {items.map((s, i) => (
          <li
            key={`${s.name}-${i}`}
            aria-hidden={i >= allSubs.length}
            className="flex items-center gap-2.5 whitespace-nowrap text-[15px] font-medium text-brand-slate"
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-brand-sky"
              aria-hidden
            />

            {s.name}

            <span className="font-mono text-[11px] text-brand-slate/55">
              {s.product}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
