import { sampleNetworkNodes } from '@/lib/site-config';

const tone: Record<string, { fill: string; text: string; label: string }> = {
  company: { fill: '#022350', text: '#ffffff', label: 'Your company' },
  buyer: { fill: '#1d5fd6', text: '#ffffff', label: 'Buyers' },
  supplier: { fill: '#0f9a8a', text: '#ffffff', label: 'Suppliers' },
  logistics: { fill: '#b7700b', text: '#ffffff', label: 'Logistics' },
};

/** Static, labelled sample of the partner network graph (CSS-animated, no client JS). */
export function NetworkGraph() {
  const center = sampleNetworkNodes.find((n) => n.type === 'company')!;
  const others = sampleNetworkNodes.filter((n) => n.type !== 'company');
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-line px-5 py-3">
        <div className="flex flex-wrap gap-3">
          {Object.entries(tone).map(([k, t]) => <span key={k} className="flex items-center gap-1.5 text-xs text-brand-slate"><span className="h-2.5 w-2.5 rounded-full" style={{ background: t.fill }} />{t.label}</span>)}
        </div>
        <span className="rounded-full bg-brand-paper px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-slate ring-1 ring-brand-line">Sample network</span>
      </div>
      <div className="relative aspect-[16/10] bg-brand-paper/60">
        <div className="grid-lines-light absolute inset-0" aria-hidden />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          {others.map((n) => (
            <line key={n.id} x1={center.x} y1={center.y} x2={n.x} y2={n.y} stroke={tone[n.type].fill} strokeOpacity="0.55" strokeWidth="1" strokeDasharray="1.2 1.2" vectorEffect="non-scaling-stroke" className="animate-dash" />
          ))}
        </svg>
        <ul aria-label="Sample partners">
          {sampleNetworkNodes.map((n, i) => (
            <li key={n.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
              <span className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-lift ring-2 ring-white motion-safe:animate-float-y ${n.type === 'company' ? 'px-3.5 py-2 text-xs' : ''}`}
                style={{ background: tone[n.type].fill, color: tone[n.type].text, animationDelay: `${i * -0.7}s` }}>
                {n.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
