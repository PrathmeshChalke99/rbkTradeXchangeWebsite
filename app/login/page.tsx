'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import { AuthShell, Field, FormError, Spinner } from '@/components/pages/auth-shell';

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
    <AuthShell
      title={<>Welcome back to your <span className="gradient-text">trade desk</span></>}
      subtitle="Pick up where you left off: trades, document checks, finance applications and lender quotations."
      points={['Track every application and lender response', 'Review AI document flags before you submit', 'Generate e-documents from saved partner data']}
    >
      <h1 className="text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl">Log in</h1>
      <p className="mt-1.5 text-sm text-brand-slate">Access your Trade Management portal.</p>

      <div className="mt-8">
        {error && <FormError message={error} />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field id="email" label="Work email" icon={Mail} type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
          <Field
            id="password" label="Password" icon={Lock} type={showPassword ? 'text' : 'password'} required autoComplete="current-password"
            value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
            trailing={
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="rounded-lg p-1.5 text-brand-slate transition hover:bg-brand-paper hover:text-brand-blue">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />
          <button type="submit" disabled={loading} className="btn-primary btn-lg w-full">
            {loading ? (<><Spinner />Logging in…</>) : (<>Log in<ArrowRight className="h-4 w-4" /></>)}
          </button>
        </form>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-brand-slate">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-turquoise" />
          Your data is handled securely
        </p>
        <p className="mt-8 border-t border-brand-line pt-6 text-center text-sm text-brand-slate">
          New to RBK TradeXchange?{' '}
          <Link href="/signup" className="font-semibold text-brand-blue hover:underline">Create an account</Link>
        </p>
      </div>
    </AuthShell>
  );
}
