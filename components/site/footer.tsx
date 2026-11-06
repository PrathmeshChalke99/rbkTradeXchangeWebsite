import Link from 'next/link';
import { Mail, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { Logo } from '@/components/site/navbar';

export function Footer() {
  return (
    <footer className="surface-dark on-dark noise">
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Link href="/" aria-label="RBK TradeXchange home" className="inline-block rounded-lg">
              <Logo light className="h-12 sm:h-12" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/60">{siteConfig.description}</p>
            <ul className="mt-6 space-y-2.5 text-sm">
              <li>
                <a href="mailto:hello@rbktradexchange.com" className="inline-flex items-center gap-2.5 text-white/70 transition hover:text-white">
                  <Mail className="h-4 w-4 text-[#8cc8f0]" aria-hidden />hello@rbktradexchange.com
                </a>
              </li>
              <li>
                <a href="tel:+912212345678" className="inline-flex items-center gap-2.5 text-white/70 transition hover:text-white">
                  <Phone className="h-4 w-4 text-[#8cc8f0]" aria-hidden />+91 22 1234 5678
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-white/70">
                <MapPin className="h-4 w-4 text-[#8cc8f0]" aria-hidden />Mumbai, India
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            {Object.entries(siteConfig.footerNav).map(([section, links]) => (
              <nav key={section} aria-label={section}>
                <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">{section}</h4>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="group relative inline-block text-sm text-white/70 transition hover:text-white">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/50 transition-transform duration-300 group-hover:scale-x-100" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-white/55 sm:grid-cols-2 sm:p-5">
          <p className="flex gap-2.5"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#8cc8f0]" aria-hidden />RBK TradeXchange is a technology platform, not a bank, NBFC or lender. Eligibility, pricing and terms are decided independently by participating lenders.</p>
          <p className="flex gap-2.5"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#8cc8f0]" aria-hidden />AI features assist with document checks and fit estimates. They do not replace professional review or a lender&apos;s decision.</p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} RBK TradeXchange. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.14em]">Import · Export · Trade finance</p>
        </div>
      </div>
    </footer>
  );
}
