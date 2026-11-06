'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, User, Mail, Lock, Building2, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import { AuthShell, Field, FormError, Spinner } from '@/components/pages/auth-shell';
import { cn } from '@/lib/utils';

/** Simple visual strength hint; validation itself is unchanged (min 6 characters). */
function strength(pw: string) {
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const labels = ['Too short', 'Fair', 'Good', 'Strong', 'Excellent'];
const tones = ['bg-rose-500', 'bg-amber-500', 'bg-brand-sky', 'bg-brand-blue', 'bg-brand-turquoise'];

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [company, setCompany] = useState('');
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
      const { error: signUpError } = await getSupabase().auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            mobile_number: mobile,
            company_name: company,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      router.push('/login');
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const st = strength(password);

  return (
    <AuthShell
      title={<>Open your <span className="gradient-text">trade finance</span> workspace</>}
      subtitle="Register your company to manage trades, check documents with AI, apply for finance and compare lender quotations."
      points={['One adaptive application for every finance product', 'AI cross-checks of invoices, packing lists, B/Ls and LCs', 'No obligation to accept any quotation']}
    >
      <h1 className="text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl">Create your account</h1>
      <p className="mt-1.5 text-sm text-brand-slate">It takes about a minute. You can complete company KYC later.</p>

      <div className="mt-8">
        {error && <FormError message={error} />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="fullName" label="Full name" icon={User} type="text" required autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" />
            <Field id="mobile" label="Mobile number" icon={Phone} type="tel" required autoComplete="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="+91 98765 43210" />
          </div>
          <Field id="company" label="Company name" icon={Building2} type="text" required autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your Company Ltd." />
          <Field id="email" label="Work email" icon={Mail} type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
          <Field
            id="password" label="Password" icon={Lock} type={showPassword ? 'text' : 'password'} required minLength={6} autoComplete="new-password"
            value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters"
            trailing={
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="rounded-lg p-1.5 text-brand-slate transition hover:bg-brand-paper hover:text-brand-blue">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            hint={password && (
              <div className="mt-2 flex items-center gap-3" aria-live="polite">
                <div className="grid flex-1 grid-cols-4 gap-1">
                  {[0, 1, 2, 3].map((k) => <span key={k} className={cn('h-1 rounded-full transition-colors duration-300', k < st ? tones[st] : 'bg-brand-line')} />)}
                </div>
                <span className="w-16 text-right text-[11px] font-medium text-brand-slate">{labels[st]}</span>
              </div>
            )}
          />
          <button type="submit" disabled={loading} className="btn-primary btn-lg w-full">
            {loading ? (<><Spinner />Creating account…</>) : (<>Create account<ArrowRight className="h-4 w-4" /></>)}
          </button>
        </form>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-brand-slate">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-turquoise" />
          Your data is handled securely
        </p>
        <p className="mt-8 border-t border-brand-line pt-6 text-center text-sm text-brand-slate">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-brand-blue hover:underline">Log in</Link>
        </p>
      </div>
    </AuthShell>
  );
}
