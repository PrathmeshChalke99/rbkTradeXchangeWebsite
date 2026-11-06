'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, PenLine } from 'lucide-react';

export function DocPreview({ name, label, color, fields }: { name: string; label: string; color: string; fields: string[] }) {
  const [seller, setSeller] = useState('Your Company Pvt. Ltd.');
  const [buyer, setBuyer] = useState('Globex Trading Co.');
  const [item, setItem] = useState('Industrial fasteners, 20 mm');
  const [qty, setQty] = useState(1200);
  const [price, setPrice] = useState(14.5);
  const total = qty * price;
  const ref = `${label.slice(0, 2)}-2026-0418`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
      <form className="card space-y-4 p-6 sm:p-7" onSubmit={(e) => e.preventDefault()} aria-label={`${name} sample fields`}>
        <div className="flex items-center gap-2.5 text-base font-semibold text-brand-ink"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-paleblue text-brand-blue"><PenLine className="h-4 w-4" /></span>Try the template</div>
        <div><label htmlFor="dp-seller" className="field-label">Seller</label><input id="dp-seller" className="field" value={seller} onChange={(e) => setSeller(e.target.value)} /></div>
        <div><label htmlFor="dp-buyer" className="field-label">Buyer</label><input id="dp-buyer" className="field" value={buyer} onChange={(e) => setBuyer(e.target.value)} /></div>
        <div><label htmlFor="dp-item" className="field-label">Item description</label><input id="dp-item" className="field" value={item} onChange={(e) => setItem(e.target.value)} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label htmlFor="dp-qty" className="field-label">Quantity</label><input id="dp-qty" type="number" min={0} className="field kbd-num" value={qty} onChange={(e) => setQty(Math.max(0, Number(e.target.value)))} /></div>
          <div><label htmlFor="dp-price" className="field-label">Unit price (USD)</label><input id="dp-price" type="number" min={0} step="0.1" className="field kbd-num" value={price} onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))} /></div>
        </div>
        <p className="rounded-lg bg-brand-paper p-3 text-xs text-brand-slate">Preview only. Full templates, saving and export are available inside the portal.</p>
      </form>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-paleblue/70 via-brand-paper to-white p-4 ring-1 ring-brand-line sm:p-8">
        <div className="grid-lines-light absolute inset-0" aria-hidden />
        <span className="relative mb-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-brand-slate shadow-soft"><Eye className="h-3.5 w-3.5 text-brand-blue" />Live preview</span>
        <motion.div initial={{ opacity: 0, y: 16, rotateX: 8 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ transformPerspective: 900 }}
          className="relative mx-auto max-w-md rounded-xl bg-white shadow-lift ring-1 ring-black/5">
          <div className="flex items-start justify-between rounded-t-xl px-6 py-5 text-white" style={{ background: color }}>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">RBK / E-Docs</p>
              <p className="mt-1 font-heading text-xl font-semibold tracking-tight">{label}</p>
            </div>
            <p className="text-right font-mono text-[11px] opacity-85">No. {ref}<br />05 Nov 2026</p>
          </div>
          <div className="space-y-5 p-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="font-mono text-[10px] uppercase tracking-wider text-brand-slate">From</p><p className="mt-1 break-words font-semibold text-brand-ink">{seller || '—'}</p></div>
              <div><p className="font-mono text-[10px] uppercase tracking-wider text-brand-slate">To</p><p className="mt-1 break-words font-semibold text-brand-ink">{buyer || '—'}</p></div>
            </div>
            <div className="overflow-hidden rounded-lg border border-brand-line">
              <div className="grid grid-cols-4 gap-2 border-b border-brand-line bg-brand-paper px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-brand-slate"><span className="col-span-2">Item</span><span className="text-right">Qty</span><span className="text-right">Price</span></div>
              <div className="grid grid-cols-4 gap-2 px-3 py-3"><span className="col-span-2 break-words">{item || '—'}</span><span className="kbd-num text-right">{qty.toLocaleString()}</span><span className="kbd-num text-right">${price.toFixed(2)}</span></div>
            </div>
            <div className="flex items-center justify-between border-t border-dashed border-brand-line pt-4"><span className="text-brand-slate">Total (USD)</span><span className="kbd-num font-heading text-2xl font-semibold text-brand-ink">${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
            <p className="text-xs text-brand-slate">{name} also includes: {fields.slice(0, 3).join(', ')}…</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
