"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { shots, LOGIN_URL } from "@/lib/platform-assets";
import { BrowserFrame, FloatTag, PanShot } from "./frames";
import { HeroCopy, heroPad } from "./hero-copy";
import { Globe } from "./globe";
import { cn } from "@/lib/utils";

export function PlatformHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section
      ref={ref}
      className="hero-night relative overflow-hidden text-white"
    >
      <div className="dot-grid-light absolute inset-0 opacity-40" aria-hidden />
      <div
        className={cn(
          "relative mx-auto grid grid-cols-1 max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8",
          heroPad,
        )}
      >
        <HeroCopy
          dark
          eyebrow="Platform"
          title={
            <>
              The technology behind{" "}
              <span className="gradient-text-light">every trade.</span>
            </>
          }
          text="Trade management, AI documentation, finance applications and payments, in one cloud workspace for importers and exporters."
          primary={{ label: "See the dashboard", href: "/dashboard" }}
          secondary={{ label: "Log in", href: LOGIN_URL }}
        />

        <div className="relative mx-auto aspect-[5/4] w-full max-w-[38rem]">
          <motion.div
            style={{ y: yBack }}
            className="absolute left-0 top-0 w-[66%] -rotate-3"
          >
            <BrowserFrame dark>
              <PanShot shot={shots.dashboard} aspect={1.3} duration={24} />
            </BrowserFrame>
          </motion.div>
          <motion.div
            style={{ y: yMid }}
            className="absolute right-0 top-[14%] w-[62%] rotate-2"
          >
            <BrowserFrame dark>
              <PanShot
                shot={shots.tradeFlow}
                aspect={1.2}
                duration={30}
                start={18}
              />
            </BrowserFrame>
          </motion.div>
          <motion.div
            style={{ y: yFront }}
            className="absolute bottom-0 left-[10%] w-[64%]"
          >
            <BrowserFrame dark>
              <PanShot shot={shots.lc} aspect={1.7} />
            </BrowserFrame>
          </motion.div>
          <FloatTag tone="coral" className="right-2 top-0" delay={0.6}>
            TradeAI
          </FloatTag>
          <FloatTag tone="dark" className="-left-2 bottom-[32%]" delay={0.9}>
            UCP 600 / ISBP 821 checks
          </FloatTag>
          <FloatTag tone="dark" className="bottom-2 right-0" delay={1.2}>
            Business network
          </FloatTag>
        </div>
      </div>
    </section>
  );
}

const financeTicker = [
  "Import Finance",
  "LC Discounting",
  "Export Invoice Discounting",
  "Purchase Invoice Discounting",
  "Working Capital & Business Loans",
  "Project Finance",
];

const financeChips: [string, string][] = [
  ["Import Finance", "left-[0%] top-[12%]"],
  ["LC Discounting", "right-[0%] top-[24%]"],
  ["Invoice Discounting", "left-[-2%] bottom-[26%]"],
  ["Working Capital", "right-[2%] bottom-[12%]"],
  ["Project Finance", "left-[24%] bottom-[0%]"],
  ["Export Finance", "right-[22%] top-[0%]"],
];

export function FinanceHero() {
  return (
    <section className="relative overflow-hidden bg-[#fff8f4]">
      <div className="dot-grid absolute inset-0 opacity-70" aria-hidden />
      <div
        className="aurora-blob -left-20 top-10 h-96 w-96 bg-[#FA7F63]/20"
        aria-hidden
      />
      <div
        className={cn(
          "relative mx-auto grid grid-cols-1 max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8",
          heroPad,
        )}
      >
        <div>
          <HeroCopy
            eyebrow="Finance"
            title={
              <>
                Finance for every stage of{" "}
                <span className="gradient-text">trade and growth.</span>
              </>
            }
            text="International trade finance, domestic supply chain finance and business & corporate finance, brought together under one roof."
            primary={{ label: "Explore finance solutions", href: "#solutions" }}
            secondary={{
              label: "Finance estimator",
              href: "/finance#estimator",
            }}
          />
          <div className="mt-8 flex flex-wrap gap-2 text-sm">
            {[
              ["International", "/finance/international-trade-finance"],
              ["Supply chain", "/finance/domestic-supply-chain-finance"],
              ["Corporate", "/finance/corporate-finance"],
            ].map(([l, h]) => (
              <Link
                key={h}
                href={h}
                className="chip hover:border-brand-accent hover:text-brand-ink"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-xl">
          <Globe />
          {financeChips.map(([label, pos], k) => (
            <span
              key={label}
              style={{ "--d": `${k * 1.3}s` } as React.CSSProperties}
              className={cn(
                "pop-in absolute z-10 rounded-full border border-brand-line bg-white px-3 py-1.5 text-xs font-semibold text-brand-ink shadow-lift",
                pos,
              )}
            >
              <i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#FA7F63]" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TradeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#022350] via-[#0a3a7a] to-[#1d5fd6] text-white">
      <div className="dot-grid-light absolute inset-0 opacity-30" aria-hidden />
      <div
        className="aurora-blob -right-24 top-0 h-96 w-96 bg-brand-sky/30"
        aria-hidden
      />
      <div
        className={cn(
          "relative mx-auto grid grid-cols-1 max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8",
          heroPad,
        )}
      >
        <HeroCopy
          dark
          eyebrow="Trade Portal"
          title={
            <>
              Run your entire trade{" "}
              <span className="gradient-text-light">from one screen.</span>
            </>
          }
          text="Orders, documents, checks and payments for every import and export, tracked step by step."
          primary={{ label: "Explore the portal", href: "#portal" }}
          secondary={{
            label: "Meet TradeAI",
            href: "/trade-management/tradeai",
          }}
        />
        <div className="relative">
          <BrowserFrame dark url="dashboard.rbktradexchange.com">
            <PanShot shot={shots.tradeFlow} aspect={1.15} duration={34} />
          </BrowserFrame>
          <FloatTag tone="coral" className="-right-2 -top-4" delay={0.8}>
            Mismatch flagged
          </FloatTag>
        </div>
      </div>
    </section>
  );
}

export function DashboardHero() {
  return (
    <section className="relative overflow-hidden bg-brand-paper">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div
        className="aurora-blob left-1/2 top-40 h-96 w-[40rem] -translate-x-1/2 bg-brand-sky/20"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 sm:pt-36 lg:px-8">
        <HeroCopy
          center
          eyebrow="Dashboard"
          title={
            <>
              Your whole business,{" "}
              <span className="gradient-text">at a glance.</span>
            </>
          }
          text="Network, applications, bank accounts and documents on one live screen. This is the real dashboard."
          primary={{ label: "Log in to dashboard", href: LOGIN_URL }}
          secondary={{
            label: "Create an account",
            href: "https://dashboard.rbktradexchange.com/auth/sign-up",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 70, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-14 max-w-5xl"
        >
          <BrowserFrame className="shadow-[0_60px_100px_-40px_rgba(2,35,80,0.5)]">
            <PanShot
              shot={shots.dashboard}
              aspect={1.45}
              mode="scroll"
              priority
            />
          </BrowserFrame>
          <FloatTag
            className="-left-3 top-[18%] hidden lg:inline-flex"
            delay={0.9}
          >
            Network management
          </FloatTag>
          <FloatTag
            tone="coral"
            className="-right-3 top-[40%] hidden lg:inline-flex"
            delay={1.1}
          >
            Limit applications
          </FloatTag>
          <FloatTag
            tone="dark"
            className="-left-3 bottom-[14%] hidden lg:inline-flex"
            delay={1.3}
          >
            Bank accounts
          </FloatTag>
        </motion.div>
      </div>
    </section>
  );
}
