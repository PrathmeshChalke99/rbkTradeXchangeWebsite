"use client";

import { type CSSProperties } from "react";
import { HeroCopy, heroPad } from "./hero-copy";
import { cn } from "@/lib/utils";

const wd = (w: number, d: number) =>
  ({ "--w": `${w}%`, animationDelay: `${d}s` }) as CSSProperties;

/** Three finance category heroes, each with its own scene. */
export function CategoryHero({
  slug,
  name,
  stage,
  description,
}: {
  slug: string;
  name: string;
  stage: string;
  description: string;
}) {
  const bg =
    slug === "international-trade-finance"
      ? "bg-[#eef4ff]"
      : slug === "domestic-supply-chain-finance"
        ? "bg-[#effaf6]"
        : "bg-[#f2f3fd]";

  return (
    <section className={cn("relative overflow-hidden", bg)}>
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div
        className={cn(
          "relative mx-auto grid grid-cols-1 max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8",
          heroPad,
        )}
      >
        <HeroCopy
          eyebrow={stage}
          title={name}
          text={description}
          primary={{ label: "Apply now", href: "/signup" }}
          secondary={{ label: "Talk to our team", href: "/contact" }}
        />
        <div className="rounded-[2rem] border border-white bg-white/80 p-5 shadow-lift backdrop-blur sm:p-8">
          {slug === "international-trade-finance" && <ShipRoute />}
          {slug === "domestic-supply-chain-finance" && <ChainFlow />}
          {slug === "corporate-finance" && <GrowthBars />}
        </div>
      </div>
    </section>
  );
}

export function ShipRoute() {
  const d = "M 70 190 C 160 20, 360 20, 450 190";
  return (
    <svg viewBox="0 0 520 260" className="h-auto w-full" role="img" aria-label="Goods moving from exporter to importer">
      <path d={d} fill="none" stroke="#022350" strokeOpacity="0.15" strokeWidth="2" />
      <path d={d} fill="none" stroke="#1d5fd6" strokeWidth="2.4" className="flow-dash" />
      <g>
        <circle r="9" fill="#022350">
          <animateMotion dur="6s" repeatCount="indefinite" path={d} />
        </circle>
        <circle r="16" fill="#1d5fd6" fillOpacity="0.2">
          <animateMotion dur="6s" repeatCount="indefinite" path={d} />
        </circle>
      </g>
      {[
        [70, 190, "Exporter"],
        [450, 190, "Importer"],
      ].map(([x, y, l]) => (
        <g key={String(l)}>
          <circle cx={Number(x)} cy={Number(y)} r="12" fill="#fff" stroke="#022350" strokeWidth="2.5" />
          <text x={Number(x)} y={Number(y) + 34} textAnchor="middle" className="fill-[#022350] text-[13px] font-bold">{l}</text>
        </g>
      ))}
      {[
        [160, 80, "Pre-shipment"],
        [260, 52, "LC"],
        [360, 80, "Post-shipment"],
      ].map(([x, y, l]) => (
        <g key={String(l)}>
          <rect x={Number(x) - 48} y={Number(y) - 14} width="96" height="26" rx="13" fill="#FA7F63" />
          <text x={Number(x)} y={Number(y) + 4} textAnchor="middle" className="fill-[#022350] text-[11px] font-bold">{l}</text>
        </g>
      ))}
    </svg>
  );
}

export function ChainFlow() {
  const nodes = ["Supplier", "Manufacturer", "Distributor", "Dealer"];
  return (
    <svg viewBox="0 0 520 220" className="h-auto w-full" role="img" aria-label="Invoices moving through a supply chain">
      {nodes.map((n, i) => {
        const x = 55 + i * 137;
        return (
          <g key={n}>
            {i < nodes.length - 1 && (
              <>
                <line x1={x + 28} y1="100" x2={x + 109} y2="100" stroke="#0f9a8a" strokeWidth="2.4" className="flow-dash" />
                <rect width="18" height="12" rx="3" fill="#FA7F63">
                  <animateMotion dur={`${2.6 + i * 0.3}s`} repeatCount="indefinite" path={`M ${x + 28} 94 L ${x + 109} 94`} />
                </rect>
              </>
            )}
            <circle cx={x} cy="100" r="28" fill="#fff" stroke="#0f9a8a" strokeWidth="2.5" />
            <text x={x} y="105" textAnchor="middle" className="fill-[#022350] text-[12px] font-bold">{i + 1}</text>
            <text x={x} y="154" textAnchor="middle" className="fill-[#022350] text-[12px] font-semibold">{n}</text>
          </g>
        );
      })}
      <text x="260" y="40" textAnchor="middle" className="fill-[#0f9a8a] text-[11px] font-bold uppercase tracking-widest">Invoices keep the chain funded</text>
    </svg>
  );
}

export function GrowthBars() {
  const bars: [string, number][] = [
    ["Working capital", 72],
    ["Term loans", 58],
    ["Asset & project finance", 86],
    ["Strategic corporate finance", 44],
  ];
  return (
    <div className="space-y-5" role="img" aria-label="Corporate finance solution areas">
      {bars.map(([l, w], i) => (
        <div key={l}>
          <p className="mb-1.5 text-sm font-semibold text-brand-ink">{l}</p>
          <div className="h-3 overflow-hidden rounded-full bg-brand-line">
            <div className="bar-fill h-full rounded-full bg-gradient-to-r from-[#4c5fd5] to-[#FA7F63]" style={wd(w, i * 0.4)} />
          </div>
        </div>
      ))}
    </div>
  );
}
