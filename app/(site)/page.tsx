import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { resources } from '@/lib/content';
import { HeroCarousel } from '@/components/pages/hero-carousel';
import { FinanceExplorer } from '@/components/pages/finance-explorer';
import { Marquee } from '@/components/pages/marquee';
import { StatsStrip } from '@/components/pages/stats-strip';
import { Section, Heading } from '@/components/pages/section';
import { Reveal } from '@/components/pages/reveal';
import { FinanceEstimator } from '@/components/pages/finance-estimator';
import { ResourceGrid } from '@/components/pages/resource-grid';
import { CtaBanner } from '@/components/pages/cta-banner';
import { ConnectMap, DocCheckVisual, DocTypeChips, QuoteVisual } from '@/components/pages/home-visuals';
import { ModuleBento } from '@/components/pages/module-bento';
import { StepsTimeline } from '@/components/pages/steps-timeline';

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[15px] text-brand-ink">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-mint text-brand-turquoise"><Check className="h-3 w-3" /></span>
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <StatsStrip />
      <Marquee />

      {/* WHO IT CONNECTS */}
      <Section tone="dark">
        <Heading dark eyebrow="One network" title={<>Importers, exporters and lenders, <span className="gradient-text">on one platform</span></>}
          text="RBK TradeXchange sits between the businesses that move goods and the institutions that finance them, so documents, applications and quotations flow through one place." />
        <ConnectMap />
      </Section>

      {/* FINANCE */}
      <Section tone="paper" id="finance">
        <Heading eyebrow="Business finance" title={<>Three categories, <span className="gradient-text">eleven products</span>, one application</>}
          text="Pick a category to see its products, the sub-products inside each and who they suit." />
        <FinanceExplorer />
        <div className="mt-8 text-center"><Link href="/finance" className="link-arrow">Compare every finance product<ArrowRight className="h-4 w-4" /></Link></div>
      </Section>

      {/* DOCUMENT INTELLIGENCE */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="eyebrow">AI document analysis</span>
            <h2 className="mt-3 text-h2 font-semibold text-brand-ink">Catch document errors <span className="gradient-text">before a lender does</span></h2>
            <p className="mt-4 text-base leading-relaxed text-brand-slate sm:text-[1.05rem]">Upload the paperwork behind a trade. The platform extracts key fields, compares them across documents and your trade history, and labels every mismatch by severity for your team to review.</p>
            <div className="mt-6"><DocTypeChips /></div>
            <Bullets items={['Cross-checks names, dates, values, addresses and HS codes', 'Matched, warning, discrepancy and unchecked states', 'Human review comes first; AI never auto-rejects a document']} />
            <Link href="/platform/ai-document-analysis" className="link-arrow mt-7">Explore AI document analysis<ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
          <Reveal delay={0.1}><DocCheckVisual /></Reveal>
        </div>
      </Section>

      {/* LENDER QUOTATIONS */}
      <Section tone="paper">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-2">
            <span className="eyebrow">Lender quotations</span>
            <h2 className="mt-3 text-h2 font-semibold text-brand-ink">Quotes side by side, <span className="gradient-text">the decision stays yours</span></h2>
            <p className="mt-4 text-base leading-relaxed text-brand-slate sm:text-[1.05rem]">Submit one finance application with an adaptive KYC and document checklist. Participating lenders review it independently and respond with terms you can compare, accept or decline.</p>
            <Bullets items={['Live status for every participating lender', 'Rate, tenure and amount compared in one view', 'Full application timeline from submission to acceptance']} />
            <Link href="/platform/lender-quotations" className="link-arrow mt-7">See how quotations work<ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
          <Reveal delay={0.1} className="lg:order-1"><QuoteVisual /></Reveal>
        </div>
      </Section>

      {/* PLATFORM */}
      <Section>
        <Heading center={false} eyebrow="Platform" title="Everything your trade desk needs" text="Six connected modules take a trade from documents to finance without switching tools."
          action={<Link href="/platform" className="btn-secondary">Platform overview<ArrowRight className="h-4 w-4" /></Link>} />
        <ModuleBento />
      </Section>

      {/* FLOW */}
      <Section tone="tint">
        <Heading eyebrow="How it works" title="From sign-up to quotation in five steps" text="Each step has its own workspace inside the portal, and your data carries forward to the next." />
        <StepsTimeline />
        <div className="mt-10 text-center"><Link href="/how-it-works" className="link-arrow">See the full journey<ArrowRight className="h-4 w-4" /></Link></div>
      </Section>

      {/* ESTIMATOR */}
      <Section>
        <Heading eyebrow="Try it" title="How much cash could an invoice release?" text="Move the sliders to see an illustrative advance, discount charge and net proceeds." />
        <FinanceEstimator />
      </Section>

      {/* RESOURCES */}
      <Section tone="paper">
        <Heading center={false} eyebrow="Resources" title="Learn the language of trade finance" text="Short, plain-language guides to the products and documents behind every shipment."
          action={<Link href="/resources" className="btn-secondary">All guides<ArrowRight className="h-4 w-4" /></Link>} />
        <ResourceGrid items={resources.slice(0, 3)} filterable={false} />
      </Section>

      <CtaBanner />
    </>
  );
}
