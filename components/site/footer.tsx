'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-brand-paper to-white border-t border-brand-paleblue/60 overflow-hidden">
      <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-brand-blue via-brand-violet to-brand-turquoise" />

      {/* Floating brand mark */}
      <motion.div
        className="absolute top-10 right-10 h-20 w-20 rounded-full bg-brand-paleblue/20 blur-2xl pointer-events-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-violet shadow-glow-blue">
                <span className="font-heading text-sm font-bold text-white">RB</span>
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-brand-ink">
                RBK <span className="gradient-text-blue">TradeXchange</span>
              </span>
            </Link>
            <p className="text-sm text-brand-slate max-w-xs leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-brand-slate">
                <Mail className="h-3.5 w-3.5 text-brand-blue" />
                hello@rbktradexchange.com
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-slate">
                <Phone className="h-3.5 w-3.5 text-brand-blue" />
                +91 22 1234 5678
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-slate">
                <MapPin className="h-3.5 w-3.5 text-brand-blue" />
                Mumbai, India
              </div>
            </div>
          </div>

          {/* Footer nav */}
          {Object.entries(siteConfig.footerNav).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-heading text-sm font-semibold text-brand-ink mb-3">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-slate hover:text-brand-blue transition-colors flex items-center gap-1 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:ml-0 group-hover:opacity-100 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-brand-paleblue/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-slate">
            © {new Date().getFullYear()} RBK TradeXchange. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-brand-slate">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-blue animate-pulse-soft" />
              Technology platform — not a lender
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-violet animate-pulse-soft" />
              Responsible AI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}