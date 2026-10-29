"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // 👈 import this
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-brand-paleblue/60 shadow-soft"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* -------- LOGO -------- */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group shrink-0"
              aria-label="RBK TradeXchange Home"
            >
              {/* Actual logo image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative flex h-36 w-36 items-center justify-center"
              >
                <Image
                  src="/tradeExchange_logo.png" 
                  alt="RBK TradeXchange"
                  width={36}
                  height={36}
                  priority
                  className="h-36 w-36 object-contain rounded-xl"
                />
              </motion.div>

              {/* Text — hidden on very small screens */}
              <span className="hidden xs:inline font-heading text-base sm:text-lg font-bold tracking-tight text-brand-ink">
                RBK <span className="gradient-text-blue">TradeXchange</span>
              </span>
            </Link>

            {/* -------- DESKTOP NAV -------- */}
            <div className="hidden items-center gap-1 md:flex">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-brand-slate transition-colors hover:bg-brand-paleblue/50 hover:text-brand-blue"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* -------- DESKTOP CTAs -------- */}
            <div className="hidden items-center gap-3 md:flex shrink-0">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-brand-slate hover:text-brand-blue"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-brand-blue text-white hover:bg-brand-blue/90 shadow-soft gap-1.5"
                >
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            {/* -------- MOBILE TOGGLE -------- */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden text-brand-ink"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* -------- MOBILE MENU -------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto bg-white/95 backdrop-blur-xl border-b border-brand-paleblue/60 md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-brand-slate hover:bg-brand-paleblue/50 hover:text-brand-blue"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-3">
                <Link
                  href="/login"
                  className="flex-1"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link
                  href="/signup"
                  className="flex-1"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button className="w-full bg-brand-blue text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
