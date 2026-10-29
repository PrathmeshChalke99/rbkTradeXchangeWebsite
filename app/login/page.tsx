'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSupabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await getSupabase().auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.push('/');
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mesh-bg p-4">
      <div className="absolute top-10 left-10 h-48 w-48 rounded-full bg-brand-paleblue/40 animate-blob blur-3xl" />
      <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-brand-lavender/40 animate-blob blur-3xl" style={{ animationDelay: '3s' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-3xl border border-brand-paleblue/60 glass-card-strong p-8">
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-violet shadow-glow-blue">
                <span className="font-heading text-base font-bold text-white">RB</span>
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-brand-ink">
                RBK <span className="gradient-text-blue">TradeXchange</span>
              </span>
            </Link>
            <h1 className="font-heading text-2xl font-bold text-brand-ink">Welcome back</h1>
            <p className="text-sm text-brand-slate mt-1">Log in to access your trade management portal</p>
          </div>

          {error && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl bg-brand-pink/30 border border-rose-200/40 p-3">
              <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-xs text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-ink mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-slate" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="pl-10 border-brand-paleblue bg-white/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-ink mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-slate" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10 border-brand-paleblue bg-white/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-slate hover:text-brand-blue"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-blue text-white hover:bg-brand-blue/90 shadow-soft gap-2 h-11"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Logging in…
                </>
              ) : (
                <>
                  Log In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-brand-slate">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            Your data is handled securely
          </div>

          <p className="mt-6 text-center text-sm text-brand-slate">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-brand-blue hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}