import type { Metadata } from 'next';
import { IMG } from '@/lib/content';
import { P } from '@/lib/photos';
import { PageHero } from '@/components/pages/page-hero';
import { Section, Heading } from '@/components/pages/section';
import { ModuleBento } from '@/components/pages/module-bento';
import { ProductWorkbench } from '@/components/site/product-workbench';
import { CtaBanner } from '@/components/pages/cta-banner';
import { StepsTimeline } from '@/components/pages/steps-timeline';

export const metadata: Metadata = { title: 'Platform | RBK TradeXchange', description: 'AI document analysis, business finance, network management, lender quotations, e-docs and responsible AI in one trade workspace.' };

export default function PlatformPage() {
  return (
    <>
      <PageHero eyebrow="Platform" title={<>One workspace for <span className="gradient-text">trade and finance</span></>}
        description="Six connected modules take you from trade documents to lender quotations without switching tools. Company, partner and trade data entered once flows through every module."
        image={P.analyticsTablet} fallback={IMG.aiDocs} imageAlt="Trade documents with AI cross-check progress" crumbs={[{ label: 'Platform' }]}
        primary={{ label: 'Get started', href: '/https://dashboard.rbktradexchange.com/auth/sign-up' }} secondary={{ label: 'View pricing', href: '/pricing' }}
        chips={['Trade management', 'Company KYC', 'Finance applications', 'Lender quotations', 'E-documents']} />
      <Section tone="paper">
        <Heading center={false} eyebrow="Modules" title="Explore each module" text="Open any module for its capabilities, workflow and an interactive preview where available." />
        <ModuleBento />
      </Section>
      <ProductWorkbench />
      <Section tone="paper">
        <Heading eyebrow="Workflow" title="How the modules connect" text="A typical trade moves through the platform in this order." />
        <StepsTimeline />
      </Section>
      <CtaBanner />
    </>
  );
}
