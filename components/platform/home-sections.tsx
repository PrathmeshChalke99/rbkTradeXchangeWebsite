"use client";

import {
  BankIcon,
  GlobeIcon,
  NetworkIcon,
  PortalIcon,
  SparkleIcon,
  TruckIcon,
  WalletIcon,
} from "@/components/platform/icons";
import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Cpu,
  Factory,
  FileText,
  Globe2,
  Landmark,
  Layers,
  Network,
  Ship,
  Sparkles,
  Store,
  Truck,
  Wallet,
} from "lucide-react";
import { GlossIcon, LogoTile } from "./gloss-icon";
import type { AnyIcon } from "./icons";
import { Spot } from "./spot";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type Pillar = {
  icon: AnyIcon;
  tint: string;
  title: string;
  text: string;
  href: string;
  logo?: string;
};

const left: Pillar[] = [
  {
    icon: GlobeIcon,
    tint: "#1d5fd6",
    title: "International Trade Finance",
    text: "Import finance, export finance, LC discounting.",
    href: "/finance/international-trade-finance",
  },
  {
    icon: TruckIcon,
    tint: "#0f9a8a",
    title: "Domestic Supply Chain Finance",
    text: "Invoice discounting, factoring, purchase finance.",
    href: "/finance/domestic-supply-chain-finance",
  },
  {
    icon: BankIcon,
    tint: "#0a3a7a",
    title: "Business & Corporate Finance",
    text: "Business loans, OD/CC, project finance, M&A.",
    href: "/finance/corporate-finance",
  },
];
const right: Pillar[] = [
  {
    icon: SparkleIcon,
    tint: "#e8684a",
    title: "Trade Portal & TradeAI",
    text: "Trade portal, AI documentation, risk analysis.",
    href: "/trade-management",
  },
  {
    icon: NetworkIcon,
    tint: "#2f8fd0",
    title: "Business Network & Documents",
    text: "Connect with partners, keep documents organised.",
    href: "/platform/business-network",
  },
  {
    icon: WalletIcon,
    tint: "#e8684a",
    title: "RBK Pay",
    text: "Receive international payments in India.",
    href: "/platform/rbk-pay",
    logo: "/rbk_pay.png",
  },
];

function PillarCard({ p, i, side }: { p: Pillar; i: number; side: "l" | "r" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "l" ? -28 : 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease }}
    >
      <Link href={p.href} className="block">
        <Spot>
          <div className="flex items-center gap-4 p-4 sm:p-5">
            {p.logo ? (
              <LogoTile src={p.logo} alt={p.title} size="lg" />
            ) : (
              <GlossIcon icon={p.icon} tint={p.tint} size="lg" />
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-heading text-[15px] font-semibold leading-snug text-brand-ink">
                {p.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-brand-slate sm:text-[13px]">
                {p.text}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-brand-slate transition group-hover:translate-x-1 group-hover:text-brand-accent-dark" />
          </div>
        </Spot>
      </Link>
    </motion.div>
  );
}

export function EcosystemHub() {
  const ys = [17, 50, 83];
  const lp = ys.map((y) => `M0 ${y} C 26 ${y}, 30 50, 50 50`);
  const rp = ys.map((y) => `M100 ${y} C 74 ${y}, 70 50, 50 50`);
  const paths = [...lp, ...rp];

  return (
    <div className="relative grid items-stretch gap-8 lg:grid-cols-[1fr_minmax(220px,0.7fr)_1fr] lg:gap-2">
      <div className="flex flex-col justify-between gap-4 lg:pr-4">
        {left.map((p, i) => (
          <PillarCard key={p.title} p={p} i={i} side="l" />
        ))}
      </div>

      <div className="relative order-first mx-auto flex h-60 w-full max-w-xs items-center justify-center lg:order-none lg:h-auto lg:max-w-none">
        <svg
          className="absolute inset-0 hidden h-full w-full lg:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="eco-line" x1="0" x2="1">
              <stop offset="0" stopColor="#022350" stopOpacity="0.25" />
              <stop offset="0.5" stopColor="#FA7F63" stopOpacity="0.9" />
              <stop offset="1" stopColor="#022350" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          {paths.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke="url(#eco-line)"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 + i * 0.12, ease }}
            />
          ))}
          {paths.map((d, i) => (
            <circle
              key={`dot-${i}`}
              r="1.1"
              fill={i % 2 ? "#022350" : "#FA7F63"}
              className="motion-reduce:hidden"
            >
              <animateMotion
                dur={`${3 + i * 0.35}s`}
                repeatCount="indefinite"
                path={d}
              />
            </circle>
          ))}
        </svg>

        <div className="relative flex flex-col items-center">
          <span
            className="absolute h-44 w-44 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #FDB9A8 0%, #44a0dc 60%, transparent 100%)",
            }}
            aria-hidden
          />
          <span
            className="absolute h-36 w-36 rounded-full border border-brand-accent/40 motion-safe:animate-ping-soft"
            aria-hidden
          />
          <span
            className="absolute h-44 w-44 rounded-full border border-dashed border-brand-navy/20 spin-slow"
            style={{ "--spin": "50s" } as CSSProperties}
            aria-hidden
          />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white bg-white/90 shadow-[0_18px_50px_-12px_rgba(2,35,80,0.35)] backdrop-blur-md">
            <Image
              src="/tradeExchange.png"
              alt="RBK TradeXchange"
              width={341}
              height={285}
              className="h-[4.5rem] w-auto"
            />
          </div>
          <p className="relative mt-5 font-heading text-sm font-bold text-brand-ink">
            RBK TradeXchange
          </p>
          <p className="relative font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-brand-slate">
            One integrated ecosystem
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 lg:pl-4">
        {right.map((p, i) => (
          <PillarCard key={p.title} p={p} i={i + 3} side="r" />
        ))}
      </div>
    </div>
  );
}

function NetworkScene() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <span className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/40" />
      <span className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/25" />
      <span
        className="spin-slow absolute inset-0"
        style={{ "--spin": "18s" } as CSSProperties}
      >
        {[0, 1, 2, 3, 4].map((k) => {
          const a = (k / 5) * Math.PI * 2;
          return (
            <i
              key={k}
              className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.9)]"
              style={{
                left: `${(50 + 38 * Math.cos(a)).toFixed(2)}%`,
                top: `${(50 + 38 * Math.sin(a)).toFixed(2)}%`,
              }}
            />
          );
        })}
      </span>
      <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lift">
        <Network className="h-5 w-5 text-[#2f8fd0]" />
      </span>
    </div>
  );
}

function DocScene() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      aria-hidden
    >
      {[
        { r: -14, x: -34, c: "bg-white/70", d: "0s" },
        { r: 0, x: 0, c: "bg-white/85", d: "0.15s" },
        { r: 14, x: 34, c: "bg-white", d: "0.3s" },
      ].map((p, i) => (
        <span
          key={i}
          className={cn(
            "absolute flex h-28 w-20 flex-col gap-1.5 rounded-lg p-2.5 shadow-lift transition duration-500 ease-out-expo group-hover:-translate-y-2",
            p.c,
          )}
          style={{
            transform: `translateX(${p.x * 0.5}px) rotate(${p.r}deg)`,
            transitionDelay: p.d,
          }}
        >
          <i className="block h-1.5 w-8 rounded bg-[#022350]/70" />
          <i className="block h-1 w-full rounded bg-[#022350]/15" />
          <i className="block h-1 w-4/5 rounded bg-[#022350]/15" />
          <i className="block h-1 w-3/5 rounded bg-[#022350]/15" />
          <i className="mt-auto block h-2 w-10 self-end rounded bg-[#FA7F63]" />
        </span>
      ))}
    </div>
  );
}

function PayScene() {
  const rows = ["$", "€", "£"];
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3"
      aria-hidden
    >
      {rows.map((c, i) => (
        <div key={c} className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-[#022350] shadow-lift">
            {c}
          </span>
          <svg viewBox="0 0 80 10" className="h-2.5 w-20">
            <path
              d="M0 5 L 72 5"
              className="flow-dash"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
            <path
              d="M68 1 L 78 5 L 68 9"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FA7F63] text-sm font-bold text-[#022350] shadow-lift">
            ₹
          </span>
        </div>
      ))}
    </div>
  );
}

const beyond = [
  {
    href: "/platform/business-network",
    title: "Business Network",
    text: "Connect with buyers, suppliers, manufacturers and business partners.",
    grad: "linear-gradient(140deg,#022350,#2f8fd0)",
    scene: <NetworkScene />,
  },
  {
    href: "/trade-management/document-management",
    title: "Document Management",
    text: "All your business documents, organised in one place.",
    grad: "linear-gradient(140deg,#0a3a7a,#0a3a7a)",
    scene: <DocScene />,
  },
  {
    href: "/platform/rbk-pay",
    title: "RBK Pay",
    text: "Receive international payments in India. Simplify cross-border collections.",
    grad: "linear-gradient(140deg,#022350,#e8684a)",
    scene: <PayScene />,
  },
];

export function BeyondCards() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {beyond.map((c, i) => (
        <motion.div
          key={c.href}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.12, ease }}
        >
          <Link href={c.href} className="group block h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-brand-line bg-white shadow-soft transition duration-300 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift">
              <div
                className="relative h-52 overflow-hidden"
                style={{ background: c.grad }}
              >
                <div
                  className="dot-grid-light absolute inset-0 opacity-40"
                  aria-hidden
                />
                {c.scene}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-xl font-semibold text-brand-ink">
                  {c.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-slate">
                  {c.text}
                </p>
                <span className="link-arrow mt-5">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
