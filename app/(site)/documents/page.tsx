import type { Metadata } from 'next';
import { IMG, eDocs } from '@/lib/content';
import { P } from '@/lib/photos';
import { PageHero } from '@/components/pages/page-hero';
import { Section, Heading } from '@/components/pages/section';
import { CtaBanner } from '@/components/pages/cta-banner';
import { DocCard } from '@/components/pages/doc-card';
import { RevealGroup, RevealItem } from '@/components/pages/reveal';
import { NumberedSteps } from '@/components/pages/numbered-steps';

export const metadata: Metadata = { title: 'E-Docs Studio | RBK TradeXchange', description: 'Generate proforma invoices, contracts, purchase orders, export invoices and packing lists from templates.' };

export default function DocumentsPage() {
  return (
    <>
      <PageHero eyebrow="E-Docs Studio" title={<>Trade paperwork that <span className="gradient-text">starts ready</span></>}
        description="Six templates for the documents behind every trade, with live preview and your company and partner details filled in. Consistent paperwork also means fewer flags in AI document checks."
        image={P.chartNotes} fallback={IMG.eDocs} imageAlt="Proforma invoice, purchase order and sales contract" crumbs={[{ label: 'E-Docs' }]}
        primary={{ label: 'Create account', href: '/signup' }} secondary={{ label: 'See the module', href: '/platform/e-docs-studio' }}
        chips={eDocs.map((d) => d.name)} />
      <Section tone="paper">
        <Heading center={false} eyebrow="Templates" title="Choose a document" text="Open any template to fill in a sample and watch the preview update." />
        <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {eDocs.map((d) => <RevealItem key={d.slug}><DocCard d={d} /></RevealItem>)}
        </RevealGroup>
      </Section>
      <Section>
        <Heading eyebrow="In the portal" title="From template to finance-ready paper" text="How E-Docs connects to the rest of your trade workflow." />
        <NumberedSteps steps={['Choose a template', 'Select your company and a partner from your network', 'Edit fields with live preview', 'Download, share or attach to a trade']} />
      </Section>
      <CtaBanner />
    </>
  );
}
