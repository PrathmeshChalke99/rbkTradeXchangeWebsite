'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Building2, ChevronDown, Globe2, Menu, Truck, X } from 'lucide-react';
import { categories, modules } from '@/lib/content';
import { siteConfig } from '@/lib/site-config';
import { Icon } from '@/components/pages/icon';
import { cn } from '@/lib/utils';

const catIcon: Record<string, typeof Globe2> = {
  'international-trade-finance': Globe2,
  'domestic-supply-chain-finance': Truck,
  'corporate-finance': Building2,
};

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Image
      src="/tradeExchange_logo.png"
      alt="RBK TradeXchange"
      width={415}
      height={129}
      priority
      className={cn('h-10 w-auto transition-[filter] duration-300 sm:h-11', light && 'brightness-0 invert', className)}
    />
  );
}

function FinanceMenu() {
  return (
    <div className="grid w-[760px] grid-cols-3 gap-1 p-2">
      {categories.map((c) => {
        const I = catIcon[c.slug] ?? Globe2;
        return (
          <div key={c.slug} className="rounded-xl p-3">
            <Link href={`/finance/${c.slug}`} className="group flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: c.bg, color: c.color }}><I className="h-[18px] w-[18px]" /></span>
              <span>
                <span className="flex items-center gap-1 text-sm font-semibold text-brand-ink group-hover:text-brand-blue">{c.name}</span>
                <span className="mt-0.5 block text-xs leading-snug text-brand-slate">{c.short}</span>
              </span>
            </Link>
            <ul className="mt-3 space-y-0.5 border-t border-brand-line pt-3">
              {c.products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/finance/${c.slug}/${p.slug}`} className="group flex items-center justify-between rounded-lg px-2 py-1.5 text-[13px] text-brand-slate transition hover:bg-brand-paper hover:text-brand-ink">
                    {p.name}
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <div className="col-span-3 mt-1 flex items-center justify-between rounded-xl bg-brand-paper px-4 py-3 text-sm">
        <span className="text-brand-slate">Not sure which product fits? Model an invoice advance first.</span>
        <Link href="/finance#estimator" className="link-arrow">Finance estimator<ArrowRight className="h-4 w-4" /></Link>
      </div>
    </div>
  );
}

function PlatformMenu() {
  return (
    <div className="grid w-[640px] grid-cols-[1fr_200px] gap-2 p-2">
      <ul className="grid grid-cols-2 gap-1">
        {modules.map((m) => (
          <li key={m.slug}>
            <Link href={`/platform/${m.slug}`} className="group flex gap-3 rounded-xl p-3 transition hover:bg-brand-paper">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition group-hover:scale-105" style={{ background: m.bg, color: m.color }}><Icon name={m.icon} className="h-[18px] w-[18px]" /></span>
              <span>
                <span className="block text-sm font-semibold text-brand-ink">{m.name}</span>
                <span className="mt-0.5 block text-xs leading-snug text-brand-slate">{m.short}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/how-it-works" className="surface-dark group flex flex-col justify-between rounded-xl p-4">
        <div className="grid-lines absolute inset-0" aria-hidden />
        <span className="relative font-mono text-[10px] uppercase tracking-[0.16em] text-[#8cc8f0]">Five steps</span>
        <span className="relative">
          <span className="block font-heading text-base font-semibold leading-snug">From sign-up to lender quotation</span>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/80 group-hover:text-white">See how it works<ArrowUpRight className="h-3.5 w-3.5" /></span>
        </span>
      </Link>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setMobileOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Over the dark hero the bar is transparent with a white logo; once scrolled (or a menu is open) it turns light.
  const solid = scrolled || !!openMenu;
  const open = (m: string | null) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(m);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href + '/'));

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300',
          solid ? 'border-b border-brand-line/80 bg-white/85 shadow-[0_8px_30px_-12px_rgba(10,22,48,0.12)] backdrop-blur-xl backdrop-saturate-150' : 'border-b border-transparent bg-transparent',
          !solid && 'on-dark',
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Primary">
          <Link href="/" className="shrink-0 rounded-lg" aria-label="RBK TradeXchange home">
            <Logo light={!solid} />
          </Link>

          <div className="hidden items-center lg:flex" onMouseLeave={() => { setHovered(null); scheduleClose(); }}>
            {siteConfig.nav.map((item) => {
              const active = isActive(item.href);
              const expanded = openMenu === item.menu && !!item.menu;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => { setHovered(item.href); open(item.menu ?? null); }}
                  onFocus={() => open(item.menu ?? null)}
                >
                  <Link
                    href={item.href}
                    aria-haspopup={item.menu ? 'true' : undefined}
                    aria-expanded={item.menu ? expanded : undefined}
                    className={cn(
                      'relative z-10 inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors',
                      solid ? (active ? 'text-brand-blue' : 'text-brand-slate hover:text-brand-ink') : active ? 'text-white' : 'text-white/75 hover:text-white',
                    )}
                  >
                    {item.label}
                    {item.menu && <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-300', expanded && 'rotate-180')} aria-hidden />}
                    {active && <span className={cn('absolute inset-x-3.5 -bottom-[13px] h-[2px] rounded-full', solid ? 'bg-brand-blue' : 'bg-[#8cc8f0]')} aria-hidden />}
                  </Link>
                  {hovered === item.href && (
                    <motion.span layoutId="nav-hover" className={cn('absolute inset-0 rounded-lg', solid ? 'bg-brand-paper' : 'bg-white/[0.08]')} transition={{ type: 'spring', stiffness: 400, damping: 34 }} aria-hidden />
                  )}
                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className={cn('absolute top-full pt-3', item.menu === 'finance' ? '-left-40' : '-left-24')}
                        onMouseEnter={() => open(item.menu ?? null)}
                      >
                        <div className="origin-top overflow-hidden rounded-2xl border border-brand-line bg-white shadow-lift ring-1 ring-black/[0.02]">
                          {item.menu === 'finance' ? <FinanceMenu /> : <PlatformMenu />}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Link href="/login" className={cn('rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors', solid ? 'text-brand-slate hover:text-brand-ink' : 'text-white/80 hover:text-white')}>
              Log in
            </Link>
            <Link href="/signup" className={cn(solid ? 'btn-primary' : 'btn-light', 'px-4 py-2 text-[13.5px]')}>
              Get started
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <button
            className={cn('flex h-10 w-10 items-center justify-center rounded-xl border transition lg:hidden', solid ? 'border-brand-line bg-white text-brand-ink' : 'border-white/15 bg-white/5 text-white')}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-brand-blue to-brand-sky" aria-hidden />
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-brand-night/50 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} aria-hidden />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 40 }}
              className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-sm flex-col bg-white shadow-lift lg:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-brand-line px-4">
                <Logo className="h-8 sm:h-8" />
                <button onClick={() => setMobileOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-line text-brand-ink" aria-label="Close menu"><X className="h-5 w-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-4">
                {siteConfig.nav.map((item, i) => {
                  const items = item.menu === 'finance'
                    ? categories.map((c) => ({ label: c.name, href: `/finance/${c.slug}`, note: c.short }))
                    : item.menu === 'platform' ? modules.map((m) => ({ label: m.name, href: `/platform/${m.slug}`, note: m.short })) : null;
                  const expanded = mobileSection === item.href;
                  return (
                    <motion.div key={item.href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.035 }} className="border-b border-brand-line/70 last:border-0">
                      <div className="flex items-center">
                        <Link href={item.href} className={cn('flex-1 rounded-lg px-3 py-3.5 text-[15px] font-semibold', isActive(item.href) ? 'text-brand-blue' : 'text-brand-ink')}>{item.label}</Link>
                        {items && (
                          <button onClick={() => setMobileSection(expanded ? null : item.href)} aria-expanded={expanded} aria-label={`Show ${item.label} pages`} className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-slate">
                            <ChevronDown className={cn('h-4 w-4 transition-transform', expanded && 'rotate-180')} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence initial={false}>
                        {items && expanded && (
                          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-2">
                            {items.map((s) => (
                              <li key={s.href}>
                                <Link href={s.href} className="block rounded-lg px-3 py-2 hover:bg-brand-paper">
                                  <span className="block text-sm font-medium text-brand-ink">{s.label}</span>
                                  <span className="block text-xs text-brand-slate">{s.note}</span>
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
                <Link href="/faq" className="block px-3 py-3.5 text-[15px] font-semibold text-brand-ink">FAQ</Link>
                <Link href="/contact" className="block px-3 py-3.5 text-[15px] font-semibold text-brand-ink">Contact</Link>
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-brand-line p-4">
                <Link href="/login" className="btn-secondary">Log in</Link>
                <Link href="/signup" className="btn-primary">Get started</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
