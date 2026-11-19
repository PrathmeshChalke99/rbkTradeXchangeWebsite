/** Sticky in-page navigation shown under the header on long detail pages. */
export function OnThisPage({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="sticky top-16 z-30 border-b border-brand-line bg-white/85 backdrop-blur-xl">
      <ul className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
        {items.map((it) => (
          <li key={it.id} className="shrink-0">
            <a href={`#${it.id}`} className="block rounded-lg px-3 py-1.5 text-[13px] font-medium text-brand-slate transition hover:bg-brand-paper hover:text-brand-ink">{it.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
