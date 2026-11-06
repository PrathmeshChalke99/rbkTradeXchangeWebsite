'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { Logo } from '@/components/site/navbar';

/**
 * Split-screen frame for login, signup and contact: a dark brand panel with context on the left
 * (desktop only) and the form on the right.
 */
export function AuthShell({ children, title, subtitle, points, footnote, extra }: {
  children: React.ReactNode; title: React.ReactNode; subtitle: string; points: string[]; footnote?: string; extra?: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
      <aside className="surface-dark on-dark noise hidden flex-col justify-between p-10 lg:flex xl:p-14">
        <div className="grid-lines absolute inset-0" aria-hidden />
        <div className="aurora-blob -left-24 -top-24 h-96 w-96 bg-brand-blue/35" aria-hidden />
        <div className="aurora-blob -bottom-32 right-0 h-96 w-96 bg-brand-sky/20 [animation-delay:-12s]" aria-hidden />
        <Link href="/" className="relative w-fit rounded-lg" aria-label="RBK TradeXchange home"><Logo light /></Link>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative max-w-md">
          <h2 className="text-display-sm font-semibold text-white">{title}</h2>
          <p className="mt-4 text-white/65">{subtitle}</p>
          {points.length > 0 && <ul className="mt-8 space-y-3">
            {points.map((p, i) => (
              <motion.li key={p} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }} className="flex items-start gap-3 text-sm text-white/80">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-turquoise/20 text-[#5fd6c4]"><Check className="h-3 w-3" /></span>{p}
              </motion.li>
            ))}
          </ul>}
          {extra && <div className="mt-8">{extra}</div>}
        </motion.div>
        <p className="relative max-w-md text-xs leading-relaxed text-white/45">{footnote ?? 'RBK TradeXchange is a technology platform, not a bank, NBFC or lender. Participating lenders make their own decisions.'}</p>
      </aside>

      <main id="main" className="relative flex flex-col px-4 py-6 sm:px-8 lg:px-12">
        <div className="grid-lines-light absolute inset-x-0 top-0 h-64 lg:hidden" aria-hidden />
        <div className="relative flex items-center justify-between">
          <Link href="/" className="rounded-lg lg:hidden" aria-label="RBK TradeXchange home"><Logo className="h-9 sm:h-10" /></Link>
          <Link href="/" className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-brand-slate transition hover:text-brand-blue"><ArrowLeft className="h-4 w-4" />Back to site</Link>
        </div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          {children}
        </motion.div>
      </main>
    </div>
  );
}

/** Labelled input with optional leading icon and trailing slot. */
export function Field({ id, label, icon: Icon, trailing, hint, ...input }: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string; label: string; icon?: React.ComponentType<{ className?: string }>; trailing?: React.ReactNode; hint?: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}</label>
      <div className="group relative">
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/70 transition-colors group-focus-within:text-brand-blue" aria-hidden />}
        <input id={id} {...input} className={`field ${Icon ? 'pl-10' : ''} ${trailing ? 'pr-11' : ''}`} />
        {trailing && <div className="absolute right-2 top-1/2 -translate-y-1/2">{trailing}</div>}
      </div>
      {hint}
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <motion.div role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
      <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
      {message}
    </motion.div>
  );
}

export function Spinner() {
  return <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden />;
}
