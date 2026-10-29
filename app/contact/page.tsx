'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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

  return (
    <div className="min-h-screen mesh-bg pt-20 pb-12">
      <div className="absolute top-20 left-10 h-48 w-48 rounded-full bg-brand-paleblue/40 animate-blob blur-3xl" />
      <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-brand-lavender/40 animate-blob blur-3xl" style={{ animationDelay: '3s' }} />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-brand-slate hover:text-brand-blue mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 lg:grid-cols-2"
        >
          {/* Left: Info */}
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
              Get in <span className="gradient-text">touch</span>
            </h1>
            <p className="mt-3 text-brand-slate leading-relaxed">
              Have questions about RBK TradeXchange? Want to learn more about our trade finance
              technology platform? Send us a message and we&apos;ll get back to you.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'hello@rbktradexchange.com', color: '#2563eb', bg: '#dbeafe' },
                { icon: Phone, label: 'Phone', value: '+91 22 1234 5678', color: '#8b5cf6', bg: '#ede9fe' },
                { icon: MapPin, label: 'Location', value: 'Mumbai, India', color: '#5eead4', bg: '#d1fae5' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3 rounded-xl border border-brand-paleblue/60 bg-white/70 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: item.bg }}>
                      <Icon className="h-5 w-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-brand-slate">{item.label}</p>
                      <p className="text-sm font-medium text-brand-ink">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl bg-brand-peach/30 border border-amber-200/40 p-4">
              <p className="text-sm text-brand-ink font-medium">Please note</p>
              <p className="text-xs text-brand-slate mt-1">
                RBK TradeXchange is a technology platform. We are not a bank, NBFC, or lender.
                For finance-related inquiries, please contact the participating lender directly.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-3xl border border-brand-paleblue/60 glass-card-strong p-8">
            {success ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-mint mb-4"
                >
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </motion.div>
                <h2 className="font-heading text-xl font-bold text-brand-ink">Message sent!</h2>
                <p className="text-sm text-brand-slate mt-2">We&apos;ll get back to you as soon as possible.</p>
                <Button
                  onClick={() => { setSuccess(false); setName(''); setEmail(''); setSubject(''); setMessage(''); }}
                  variant="outline"
                  className="mt-6 border-brand-paleblue"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-heading text-xl font-bold text-brand-ink">Send a message</h2>

                {error && (
                  <div className="flex items-start gap-2.5 rounded-xl bg-brand-pink/30 border border-rose-200/40 p-3">
                    <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <p className="text-xs text-destructive">{error}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-brand-ink mb-1.5">Name</label>
                  <Input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="border-brand-paleblue bg-white/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-ink mb-1.5">Email</label>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="border-brand-paleblue bg-white/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-ink mb-1.5">Subject</label>
                  <Input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="How can we help?"
                    className="border-brand-paleblue bg-white/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-ink mb-1.5">Message</label>
                  <Textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us more about your inquiry…"
                    className="border-brand-paleblue bg-white/60 min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-blue text-white hover:bg-brand-blue/90 shadow-soft gap-2 h-11"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-xs text-brand-slate text-center">
                  Demo — this form is for illustration. Configure a contact endpoint to enable real submissions.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}