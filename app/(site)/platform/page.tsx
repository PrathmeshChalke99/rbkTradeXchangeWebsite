import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PlatformHero } from "@/components/platform/heroes-core";
import { Band, BandHeading, ClosingCta } from "@/components/platform/blocks";
import { ModuleBento } from "@/components/pages/module-bento";
import { StepsTimeline } from "@/components/pages/steps-timeline";
import { RevealGroup, RevealItem } from "@/components/pages/reveal";
import { shots } from "@/lib/platform-assets";

export const metadata: Metadata = {
  title: "Platform | RBK TradeXchange",
  description:
    "The RBK TradeXchange platform: dashboard, trade management, TradeAI, business network and RBK Pay in one connected workspace.",
};

const pillars = [
  { href: "/dashboard", label: "Dashboard", text: "Your business at a glance.", img: shots.dashboard.src, pos: "top", span: "md:col-span-2 md:row-span-2" },
  { href: "/trade-management", label: "Trade Portal", text: "Every trade, step by step.", img: shots.trade.src, pos: "50% 13%", span: "md:col-span-2" },
  { href: "/trade-management/tradeai", label: "TradeAI", text: "Documents and risk analysis.", img: shots.trade.src, pos: "50% 30%", span: "" },
  { href: "/trade-management/lc-discrepancy", label: "LC Analysis", text: "UCP 600 / ISBP 821.", img: shots.lc.src, pos: "top", span: "" },
  { href: "/platform/business-network", label: "Business Network", text: "Buyers, suppliers, partners.", img: shots.buyers.src, pos: "top", span: "md:col-span-2" },
];

export default function PlatformPage() {
  return (
    <>
      <PlatformHero />

      <Band tone="white">
        <BandHeading
          eyebrow="Services and technology"
          title="Finance on one side. Software on the other. One company."
          text="The platform is how our financial solutions reach you: apply, track and manage in the same place."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/finance" className="group rounded-3xl border border-brand-line bg-[#fff8f4] p-8 transition hover:border-brand-accent hover:shadow-lift">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-accent-dark">What we offer</p>
            <p className="mt-3 font-heading text-2xl font-semibold text-brand-ink">Financial solutions</p>
            <p className="mt-2 text-sm text-brand-slate">International trade, supply chain and corporate finance.</p>
            <span className="link-arrow mt-6">Explore finance <ArrowUpRight className="h-4 w-4" /></span>
          </Link>
          <Link href="/trade-management" className="group rounded-3xl border border-brand-line bg-brand-paper p-8 transition hover:border-brand-blue hover:shadow-lift">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-blue">What we built</p>
            <p className="mt-3 font-heading text-2xl font-semibold text-brand-ink">Digital platform</p>
            <p className="mt-2 text-sm text-brand-slate">Trade management, TradeAI, network and payments.</p>
            <span className="link-arrow mt-6">Explore the portal <ArrowUpRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </Band>

      <Band tone="paper">
        <BandHeading eyebrow="Inside the platform" title="Real screens, real features." />
        <RevealGroup className="grid auto-rows-[15rem] gap-4 md:grid-cols-4">
          {pillars.map((p) => (
            <RevealItem key={p.href + p.label} className={p.span}>
              <Link
                href={p.href}
                className="group relative block h-full overflow-hidden rounded-3xl border border-brand-line bg-white shadow-soft"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 ease-out-expo group-hover:scale-105"
                  style={{ objectPosition: p.pos }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050f24]/85 via-[#050f24]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                  <span>
                    <span className="block font-heading text-lg font-semibold">{p.label}</span>
                    <span className="block text-sm text-white/75">{p.text}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Band>

      <Band tone="white">
        <BandHeading
          eyebrow="Modules"
          title="Explore each module."
          text="Capabilities, workflow and an interactive preview where available."
        />
        <ModuleBento />
      </Band>

      <Band tone="paper">
        <BandHeading eyebrow="Workflow" title="How the modules connect." />
        <StepsTimeline />
      </Band>

      <ClosingCta
        title="See the platform with your own trades."
        text="Create your account, or talk to our team for a walkthrough."
        primary={{ label: "Request a demo", href: "/contact" }}
        secondary={{ label: "Log in", href: "https://dashboard.rbktradexchange.com/auth/login" }}
      />
    </>
  );
}
