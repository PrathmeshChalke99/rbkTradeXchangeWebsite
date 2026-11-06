import { Plus } from 'lucide-react';

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-brand-line overflow-hidden rounded-2xl border border-brand-line bg-white shadow-soft">
      {items.map((f) => (
        <details key={f.q} className="group px-5 py-4 transition-colors open:bg-brand-paper/60 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-brand-ink [&::-webkit-details-marker]:hidden">
            <span className="font-heading">{f.q}</span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-line bg-white text-brand-slate transition duration-300 group-open:rotate-45 group-open:border-brand-blue/40 group-open:text-brand-blue">
              <Plus className="h-4 w-4" aria-hidden />
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-slate">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
