"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { shots } from "@/lib/platform-assets";
import { BrowserFrame, FloatTag, Img } from "./frames";
import { HeroCopy, heroPad } from "./hero-copy";
import { Globe } from "./globe";
import { cn } from "@/lib/utils";

const rot = (s: number) => ({ "--spin": `${s}s` }) as CSSProperties;

const orbiters = [
  "Manufacturers",
  "Suppliers",
  "Importers",
  "Exporters",
  "Partners",
];
const netShots = [
  { k: "Buyers", shot: shots.buyers },
  { k: "Suppliers", shot: shots.suppliers },
  { k: "Logistic partners", shot: shots.logistics },
];

export function NetworkHero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % netShots.length), 3200);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="hero-night relative overflow-hidden text-white">
      <div className="dot-grid-light absolute inset-0 opacity-30" aria-hidden />
      <div
        className={cn(
          "relative mx-auto grid grid-cols-1 max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8",
          heroPad,
        )}
      >
        <HeroCopy
          dark
          eyebrow="Business Network"
          title={
            <>
              Connect with buyers, suppliers and{" "}
              <span className="gradient-text-light">business partners.</span>
            </>
          }
          text="Business growth depends on the right connections. Manage your trade relationships and discover new opportunities."
          primary={{ label: "Explore the network", href: "#audiences" }}
          secondary={{
            label: "Log in",
            href: "https://dashboard.rbktradexchange.com/auth/login",
          }}
        />

        <div className="relative mx-auto w-full max-w-2xl">
          <div
            className="relative mx-auto aspect-square w-[78%] max-w-[26rem]"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-full border border-dashed border-white/20" />
            <div className="absolute inset-[16%] rounded-full border border-dashed border-white/15" />
            <div className="spin-slow absolute inset-0" style={rot(40)}>
              {orbiters.map((o, idx) => {
                const a = (idx / orbiters.length) * Math.PI * 2;
                return (
                  <span
                    key={o}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${(50 + 50 * Math.cos(a)).toFixed(2)}%`,
                      top: `${(50 + 50 * Math.sin(a)).toFixed(2)}%`,
                    }}
                  >
                    <span className="spin-slow-rev block" style={rot(40)}>
                      <span className="block whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold backdrop-blur">
                        {o}
                      </span>
                    </span>
                  </span>
                );
              })}
            </div>
            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FA7F63] text-center text-xs font-bold leading-tight text-[#022350] shadow-glow-coral">
              Your
              <br />
              business
            </div>
          </div>

          <div className="relative -mt-10 ml-auto w-[88%] sm:-mt-16">
            <BrowserFrame dark url="dashboard.rbktradexchange.com">
              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Img shot={netShots[i].shot} priority={i === 0} />
                </motion.div>
              </AnimatePresence>
            </BrowserFrame>
            <FloatTag tone="coral" className="-left-3 -top-3" delay={0.6}>
              {netShots[i].k}
            </FloatTag>
          </div>
        </div>
      </div>
    </section>
  );
}

const ccy = ["$", "€", "£", "¥", "د.إ"];

export function PayHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#04213f] via-[#073b5c] to-[#0b6e8a] text-white">
      <div className="dot-grid-light absolute inset-0 opacity-30" aria-hidden />
      <div
        className="aurora-blob -right-20 top-0 h-96 w-96 bg-[#FA7F63]/25"
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
          eyebrow="RBK Pay"
          title={
            <>
              Receive international payments{" "}
              <span className="gradient-text-light">in India.</span>
            </>
          }
          text="Cross-border collections for exporters, with multicurrency capabilities and transparent FX and banking charges."
          primary={{ label: "What RBK Pay offers", href: "#benefits" }}
          secondary={{ label: "Talk to our team", href: "/contact" }}
        />

        <div className="relative mx-auto w-full max-w-xl rounded-[2rem] border border-white/15 bg-white/5 p-6 backdrop-blur sm:p-8">
          <svg
            viewBox="0 0 520 300"
            className="h-auto w-full"
            role="img"
            aria-label="Foreign currencies flowing into one Indian account"
          >
            {ccy.map((c, idx) => {
              const y = 40 + idx * 55;
              const d = `M 70 ${y} C 190 ${y}, 200 150, 330 150`;
              return (
                <g key={c}>
                  <path
                    d={d}
                    fill="none"
                    stroke="#fff"
                    strokeOpacity="0.15"
                    strokeWidth="1.5"
                  />
                  <path
                    d={d}
                    fill="none"
                    stroke="#FDB9A8"
                    strokeWidth="1.8"
                    className="flow-dash"
                  />
                  <circle r="4" fill="#FA7F63">
                    <animateMotion
                      dur={`${3 + idx * 0.4}s`}
                      repeatCount="indefinite"
                      path={d}
                    />
                  </circle>
                  <circle
                    cx="48"
                    cy={y}
                    r="22"
                    fill="#fff"
                    fillOpacity="0.1"
                    stroke="#fff"
                    strokeOpacity="0.4"
                  />
                  <text
                    x="48"
                    y={y + 5}
                    textAnchor="middle"
                    className="fill-white text-[15px] font-bold"
                  >
                    {c}
                  </text>
                </g>
              );
            })}
            <rect x="330" y="105" width="170" height="90" rx="18" fill="#fff" />
            <image
              href="/rbk_pay.png"
              x="383"
              y="98"
              width="64"
              height="64"
              preserveAspectRatio="xMidYMid meet"
            />
            <text
              x="415"
              y="186"
              textAnchor="middle"
              className="fill-[#022350] text-[24px] font-bold"
            >
              ₹ India
            </text>
          </svg>
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-white/50">
            Illustrative flow
          </p>
        </div>
      </div>
    </section>
  );
}

export function EximHero() {
  return (
    <section className="relative overflow-hidden bg-[#fbf7f2]">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div
        className={cn(
          "relative mx-auto grid grid-cols-1 max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8",
          heroPad,
        )}
      >
        <HeroCopy
          eyebrow="Exim World Advisory"
          title={
            <>
              Advisory for your{" "}
              <span className="gradient-text">global trade journey.</span>
            </>
          }
          text="Part of the RBK TradeXchange business ecosystem, alongside network management and RBK Pay."
          primary={{ label: "Talk to our team", href: "/contact" }}
          secondary={{ label: "See the ecosystem", href: "/platform" }}
        />
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <Globe />
          <div className="absolute left-0 top-0 rounded-2xl bg-white p-3 shadow-lift ring-1 ring-brand-line">
            {}
            <img
              src="/exim_world.jpeg"
              alt="Exim World"
              className="h-12 w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
