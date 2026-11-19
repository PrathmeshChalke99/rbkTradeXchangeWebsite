import { BuildingIcon, ChartIcon, ChipIcon, FactoryIcon, GlobeIcon, LayersIcon, QuoteIcon, ShieldIcon, ShipIcon, StoreIcon } from "@/components/platform/icons";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Cpu,
  Factory,
  Globe2,
  Handshake,
  Layers,
  LineChart,
  Network,
  ShieldCheck,
  Ship,
  Store,
  Wallet,
} from "lucide-react";
import { HomeHero } from "@/components/platform/home-hero";
import { Marquee } from "@/components/pages/marquee";
import { FinanceExplorer } from "@/components/pages/finance-explorer";
import { PinnedJourney } from "@/components/platform/pinned-journey";
import { AudienceCard, ShotCard } from "@/components/platform/journey-cards";
import { BeyondCards, EcosystemHub } from "@/components/platform/home-sections";
import { BrowserFrame, Img } from "@/components/platform/frames";
import {
  Band,
  BandHeading,
  CapabilityRows,
  ClosingCta,
  SplitRow,
} from "@/components/platform/blocks";
import { Reveal, RevealGroup, RevealItem } from "@/components/pages/reveal";
import { shots } from "@/lib/platform-assets";


const steps = [
  { k: "Tell us about your business", t: "Profile, industry, requirements and objectives." },
  { k: "Identify your requirements", t: "We evaluate and match relevant solutions." },
  { k: "Explore available solutions", t: "Connect with providers, partners and platform capabilities." },
  { k: "Move forward with confidence", t: "Onboarding, documentation and assessment." },
];

const techSteps = [
  { k: "Dashboard", title: "Your business at a glance.", text: "Network, finance applications, bank accounts and documents on one live screen.", shot: shots.dashboard, focus: 0, aspect: 1.5 },
  { k: "Trade Portal", title: "Every trade, step by step.", text: "From purchase order to payment, each document verified against the last.", shot: shots.tradeFlow, focus: 12, aspect: 1.3 },
  { k: "TradeAI checks", title: "Mismatches flagged before the bank sees them.", text: "Currency, incoterm, ports and expiry compared against your trade.", shot: shots.tradeFlow, focus: 25, aspect: 1.3 },
  { k: "LC analysis", title: "Check the LC against UCP 600 / ISBP 821.", text: "Upload the document set and run the discrepancy assessment.", shot: shots.lc, focus: 0, aspect: 1310 / 731 },
  { k: "Business network", title: "Buyers, suppliers and logistics partners.", text: "Manage your trade relationships in one network.", shot: shots.buyers, focus: 0, aspect: 1310 / 980 },
];

const audiences = [
  { icon: ShipIcon, tint: "#1d5fd6", k: "Importers & Exporters", t: "Trade finance, digital trade management, AI documentation and international payment solutions.", chips: ["Trade finance", "Trade portal", "TradeAI", "RBK Pay"], href: "/trade-management" },
  { icon: FactoryIcon, tint: "#0f9a8a", k: "Manufacturers", t: "Machinery finance, working capital, supply chain finance, project finance and supplier network access.", chips: ["Machinery finance", "Working capital", "Project finance", "Supplier network"], href: "/finance/corporate-finance" },
  { icon: StoreIcon, tint: "#e8684a", k: "Traders & Distributors", t: "Invoice discounting, purchase finance, receivables financing and working capital facilities.", chips: ["Invoice discounting", "Purchase finance", "Receivables", "Working capital"], href: "/finance/domestic-supply-chain-finance" },
  { icon: ChipIcon, tint: "#2f8fd0", k: "IT & Technology Companies", t: "Business loans, working capital finance, structured funding and corporate finance solutions.", chips: ["Business loans", "Working capital", "Structured funding"], href: "/finance/corporate-finance" },
  { icon: BuildingIcon, tint: "#0a3a7a", k: "SMEs & Growing Enterprises", t: "Secured and unsecured loans, OD/CC facilities, asset finance and business expansion funding.", chips: ["Secured loans", "Unsecured loans", "OD / CC", "Asset finance"], href: "/finance/corporate-finance" },
  { icon: LayersIcon, tint: "#e8684a", k: "Large Corporates", t: "Structured finance, supply chain finance, project finance, off-balance-sheet facilities and strategic corporate finance.", chips: ["Structured finance", "Project finance", "Off-balance-sheet", "Corporate finance"], href: "/finance/corporate-finance" },
];

export default function Home() {
  return (
    <>
      <HomeHero />
      <Marquee />

      <Band tone="white">
        <BandHeading
          eyebrow="One integrated ecosystem"
          title="Business finance, trade management and growth, connected."
          text="Every part of RBK TradeXchange, connected through one platform."
        />
        <EcosystemHub />
      </Band>

      <Band tone="paper" id="finance">
        <BandHeading
          eyebrow="Financial solutions"
          title="Every business has financial needs. We bring solutions together."
          text="Three categories. Pick one to see its products and sub-categories."
        />
        <FinanceExplorer />
        <div className="mt-10 text-center">
          <Link href="/finance" className="link-arrow">
            Compare every finance solution
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Band>

      <PinnedJourney
        label="Technology that simplifies global trade"
        eyebrow="Technology that simplifies global trade"
        heading={
          <>
            One digital platform for your <span className="gradient-text">entire trade journey</span>
          </>
        }
        bgWord="ONE PLATFORM"
        items={techSteps.map((t, i) => ({
          id: t.k,
          label: t.k,
          node: (
            <ShotCard
              shot={t.shot}
              focus={t.focus}
              aspect={t.aspect}
              n={i + 1}
              total={techSteps.length}
              title={t.title}
              text={t.text}
            />
          ),
        }))}
      />
      <div className="bg-white pb-14">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="btn-primary">
            Explore the dashboard <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/trade-management" className="btn-secondary">
            Trade Portal
          </Link>
        </div>
      </div>

      <Band tone="night">
        <BandHeading
          dark
          eyebrow="Meet TradeAI"
          title="Your AI-powered trade documentation assistant."
          text="Generate documents, find discrepancies and understand your LC before you execute."
        />
        <SplitRow
          dark
          eyebrow="LC analysis"
          title="Check the LC before the bank does."
          points={["UCP 600 / ISBP 821", "Flags inconsistencies", "Compares documents to LC terms", "Your team reviews"]}
          visual={
            <BrowserFrame dark url="dashboard.rbktradexchange.com">
              <Img shot={shots.lc} />
            </BrowserFrame>
          }
          footer={
            <div className="flex flex-wrap gap-3">
              <Link href="/trade-management/tradeai" className="btn bg-[#FA7F63] text-[#022350] hover:bg-[#ff9279]">
                Explore TradeAI <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/trade-management/lc-discrepancy" className="btn border border-white/25 text-white hover:bg-white/10">
                LC analysis
              </Link>
            </div>
          }
        />
      </Band>

      <Band tone="white">
        <BandHeading
          eyebrow="Beyond finance"
          title="Network. Documents. Payments."
          text="Everything around your trade, in the same ecosystem."
        />
        <BeyondCards />
      </Band>

      <PinnedJourney
        tone="paper"
        label="Who we serve"
        eyebrow="Who we serve"
        heading={
          <>
            Solutions for businesses <span className="gradient-text">across industries</span>
          </>
        }
        bgWord="WHO WE SERVE"
        items={audiences.map((a, i) => ({
          id: a.k,
          label: a.k,
          node: (
            <AudienceCard
              icon={a.icon}
              tint={a.tint}
              title={a.k}
              text={a.t}
              chips={a.chips}
              href={a.href}
              n={i + 1}
              total={audiences.length}
            />
          ),
        }))}
      />

      <Band tone="night">
        <BandHeading
          dark
          eyebrow="Why RBK TradeXchange"
          title="More than financial services. A connected business ecosystem."
        />
        <CapabilityRows
          dark
          cols={3}
          items={[
            { icon: LayersIcon, title: "Multiple financial solutions", text: "Trade, supply chain and corporate finance in one ecosystem." },
            { icon: ChipIcon, title: "Technology-enabled operations", text: "Digitise workflows and manage documents in a cloud portal." },
            { icon: ShieldIcon, title: "AI-powered trade intelligence", text: "Generate documents and identify discrepancies with TradeAI." },
            { icon: QuoteIcon, title: "Connected business network", text: "Discover and connect with manufacturers, suppliers and buyers." },
            { icon: GlobeIcon, title: "Integrated payment solutions", text: "International payment capabilities through RBK Pay." },
            { icon: ChartIcon, title: "Business growth focus", text: "Solutions aligned with your requirements and objectives." },
          ]}
        />
      </Band>

      <Band tone="paper">
        <BandHeading
          eyebrow="How to get started"
          title="Your business. Your requirements. The right solutions."
        />
        <ol className="relative grid gap-6 md:grid-cols-4">
          <span className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent md:block" aria-hidden />
          {steps.map((s, i) => (
            <li key={s.k}>
              <Reveal delay={i * 0.1}>
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#022350] font-mono text-sm text-white shadow-lift">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold text-brand-ink">{s.k}</h3>
                <p className="mt-1 text-sm text-brand-slate">{s.t}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Link href="/contact" className="btn-primary btn-lg">
            Submit your business enquiry <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Band>

      <ClosingCta
        title="Every business deserves better finance and smarter operations."
        text="Explore opportunities. Access financial solutions. Simplify operations. Grow your business."
        primary={{ label: "Get started", href: "https://dashboard.rbktradexchange.com/auth/sign-up" }}
        secondary={{ label: "Talk to our team", href: "/contact" }}
      />
    </>
  );
}
