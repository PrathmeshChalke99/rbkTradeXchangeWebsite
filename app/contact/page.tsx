'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Info } from 'lucide-react';
import { AuthShell, Field, FormError, Spinner } from '@/components/pages/auth-shell';

const topics = ['Platform & features', 'Pricing & plans', 'Finance products', 'Partnering as a lender', 'Something else'];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // This is a demo — no backend endpoint configured.
      // Replace with your actual contact API or form handler.
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contacts = [
    { icon: Mail, label: 'Email', value: 'hello@rbktradexchange.com', href: 'mailto:hello@rbktradexchange.com' },
    { icon: Phone, label: 'Phone', value: '+91 22 1234 5678', href: 'tel:+912212345678' },
    { icon: MapPin, label: 'Location', value: 'Mumbai, India' },
  ];

  return (
    <AuthShell
      title={<>Talk to the <span className="gradient-text">RBK TradeXchange</span> team</>}
      subtitle="Questions about the platform, plans or how finance applications work? Send us a message."
      points={[]}
      footnote="RBK TradeXchange is a technology platform, not a bank, NBFC or lender. For questions about a specific quotation, contact the participating lender directly."
      extra={
        <ul className="space-y-3">
          {contacts.map((c) => {
            const body = (
              <>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#8cc8f0]"><c.icon className="h-[18px] w-[18px]" /></span>
                <span><span className="block font-mono text-[10.5px] uppercase tracking-wider text-white/50">{c.label}</span><span className="text-sm font-medium text-white">{c.value}</span></span>
              </>
            );
            return (
              <li key={c.label}>
                {c.href ? <a href={c.href} className="card-dark flex items-center gap-3 p-3.5 transition hover:border-white/25">{body}</a> : <div className="card-dark flex items-center gap-3 p-3.5">{body}</div>}
              </li>
            );
          })}
        </ul>
      }
    >
      {success ? (
        <div className="flex flex-col items-center text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }} className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand-mint">
            <span className="absolute inset-0 rounded-full bg-brand-mint motion-safe:animate-ping-soft" aria-hidden />
            <CheckCircle2 className="relative h-8 w-8 text-brand-turquoise" />
          </motion.div>
          <h1 className="mt-6 text-2xl font-semibold text-brand-ink">Message sent</h1>
          <p className="mt-2 text-sm text-brand-slate">Thanks, {name.split(' ')[0] || 'there'}. We&apos;ll get back to you as soon as possible.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => { setSuccess(false); setName(''); setEmail(''); setSubject(''); setMessage(''); }} className="btn-secondary">Send another message</button>
            <Link href="/" className="btn-primary">Back to home</Link>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl">Send a message</h1>
          <p className="mt-1.5 text-sm text-brand-slate">We usually reply by email.</p>
          <div className="mt-8">
            {error && <FormError message={error} />}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Name" type="text" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                <Field id="email" label="Email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
              </div>
              <div>
                <Field id="subject" label="Subject" type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="How can we help?" />
                <div className="mt-2 flex flex-wrap gap-1.5" aria-label="Suggested topics">
                  {topics.map((t) => (
                    <button key={t} type="button" onClick={() => setSubject(t)} className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${subject === t ? 'border-brand-blue bg-brand-paleblue text-brand-blue' : 'border-brand-line text-brand-slate hover:border-brand-blue/40 hover:text-brand-ink'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="message" className="field-label">Message</label>
                <textarea id="message" required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us more about your inquiry…" className="field min-h-[140px] resize-y" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary btn-lg w-full">
                {loading ? (<><Spinner />Sending…</>) : (<><Send className="h-4 w-4" />Send message</>)}
              </button>
              <p className="flex items-start justify-center gap-1.5 text-center text-xs text-brand-slate">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Demo: this form is for illustration. Configure a contact endpoint to enable real submissions.
              </p>
            </form>
          </div>
        </>
      )}
    </AuthShell>
  );
}
