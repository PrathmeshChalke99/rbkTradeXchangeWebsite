'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';
import { Calculator, Info } from 'lucide-react';

const fmt = (n: number, cur: string) => new Intl.NumberFormat(cur === 'INR' ? 'en-IN' : 'en-US', { style: 'currency', currency: cur, maximumFractionDigits: 0 }).format(n);

/** Number that eases toward its new value whenever inputs change. */
function Animated({ value, cur }: { value: number; cur: string }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    if (reduce) { setShown(value); prev.current = value; return; }
    const c = animate(prev.current, value, { duration: 0.5, ease: [0.16, 1, 0.3, 1], onUpdate: setShown });
    prev.current = value;
    return () => c.stop();
  }, [value, reduce]);
  return <>{fmt(shown, cur)}</>;
}

function Slider({ id, label, v, set, min, max, step, suffix, hint }: { id: string; label: string; v: number; set: (n: number) => void; min: number; max: number; step: number; suffix: string; hint: string }) {
  const fill = ((v - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-brand-ink">{label}</label>
        <output htmlFor={id} className="kbd-num rounded-md bg-brand-paper px-2 py-0.5 text-sm font-semibold text-brand-blue">{v}{suffix}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={v} onChange={(e) => set(Number(e.target.value))} className="range mt-3" style={{ ['--fill' as string]: `${fill}%` }} />
      <p className="mt-1.5 flex justify-between font-mono text-[10.5px] text-brand-slate/80"><span>{min}{suffix}</span><span>{hint}</span><span>{max}{suffix}</span></p>
    </div>
  );
}

export function FinanceEstimator() {
  const [cur, setCur] = useState('USD');
  const [value, setValue] = useState(50000);
  const [advance, setAdvance] = useState(80);
  const [rate, setRate] = useState(9);
  const [days, setDays] = useState(90);

  const r = useMemo(() => {
    const adv = (value * advance) / 100;
    const charge = (adv * rate * days) / 36500;
    return { adv, charge, net: adv - charge, balance: value - adv, total: value - charge };
  }, [value, advance, rate, days]);

  const netShare = value > 0 ? Math.max(0, Math.min(100, (r.net / value) * 100)) : 0;

  return (
    <div id="estimator" className="grid overflow-hidden rounded-3xl border border-brand-line bg-white shadow-lift lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-6 p-6 sm:p-8">
        <div>
          <div className="flex items-center gap-2.5 text-base font-semibold text-brand-ink"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-paleblue text-brand-blue"><Calculator className="h-4 w-4" /></span>Invoice finance estimator</div>
          <p className="mt-2 text-sm text-brand-slate">Enter an invoice and adjust the terms to see an illustrative advance and discount charge.</p>
        </div>
        <div>
          <label htmlFor="est-value" className="field-label">Invoice value</label>
          <div className="flex rounded-xl border border-brand-line shadow-soft focus-within:border-brand-blue focus-within:ring-4 focus-within:ring-brand-blue/10">
            <select value={cur} onChange={(e) => setCur(e.target.value)} aria-label="Currency" className="rounded-l-xl border-r border-brand-line bg-brand-paper px-3 text-sm font-semibold text-brand-ink focus:outline-none">
              {['USD', 'EUR', 'INR', 'AED'].map((c) => <option key={c}>{c}</option>)}
            </select>
            <input id="est-value" type="number" inputMode="numeric" min={0} value={value} onChange={(e) => setValue(Math.max(0, Number(e.target.value)))} className="kbd-num w-full rounded-r-xl bg-white px-3.5 py-2.5 text-sm text-brand-ink focus:outline-none" />
          </div>
        </div>
        <Slider id="est-adv" label="Advance on invoice" v={advance} set={setAdvance} min={50} max={95} step={1} suffix="%" hint="share funded upfront" />
        <Slider id="est-rate" label="Illustrative annual rate" v={rate} set={setRate} min={4} max={20} step={0.5} suffix="%" hint="set by lenders" />
        <Slider id="est-days" label="Financing period" v={days} set={setDays} min={15} max={180} step={5} suffix="d" hint="until buyer pays" />
      </div>

      <div className="surface-dark on-dark flex flex-col p-6 sm:p-8" aria-live="polite">
        <div className="grid-lines absolute inset-0" aria-hidden />
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8cc8f0]">Cash you could receive today</p>
          <p className="kbd-num mt-2 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl"><Animated value={r.net} cur={cur} /></p>
          <div className="mt-5" aria-hidden>
            <div className="flex h-2 overflow-hidden rounded-full bg-white/10">
              <span className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-sky transition-[width] duration-500 ease-out-expo" style={{ width: `${netShare}%` }} />
            </div>
            <p className="mt-1.5 font-mono text-[11px] text-white/50">{netShare.toFixed(1)}% of invoice value, net of charges</p>
          </div>
          <dl className="mt-6 divide-y divide-white/10 text-sm">
            {([['Advance on invoice', r.adv, ''], ['Discount charge', r.charge, '− '], ['Balance on realisation', r.balance, ''], ['Total after charges', r.total, '']] as const).map(([k, v, pre]) => (
              <div key={k} className="flex justify-between py-2.5"><dt className="text-white/60">{k}</dt><dd className="kbd-num font-medium text-white">{pre}<Animated value={v} cur={cur} /></dd></div>
            ))}
          </dl>
        </div>
        <p className="relative mt-auto flex gap-2 pt-6 text-xs leading-relaxed text-white/55"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />Illustrative only. Rates, advances and charges are set by participating lenders, not by RBK TradeXchange.</p>
      </div>
    </div>
  );
}
