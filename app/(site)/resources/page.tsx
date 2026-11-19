import type { Metadata } from 'next';
import { resources } from '@/lib/content';
import { PageHero } from '@/components/pages/page-hero';
import { Section } from '@/components/pages/section';
import { ResourceGrid } from '@/components/pages/resource-grid';
import { CtaBanner } from '@/components/pages/cta-banner';

export const metadata: Metadata = { title: 'Resources & Guides | RBK TradeXchange', description: 'Plain-language guides to packing credit, LC discounting, invoice finance, working capital and trade risk.' };

export default function ResourcesPage() {
  const tags = Array.from(new Set(resources.map((r) => r.tag)));
  return (
    <>
      <PageHero compact eyebrow="Resources" title={<>Learn <span className="gradient-text">trade finance</span> in plain language</>}
        description="Short guides on the debt products, documents and risks behind every shipment. Each one links to the matching product so you can go from reading to applying."
        crumbs={[{ label: 'Resources' }]} chips={tags} />
      <Section tone="paper"><ResourceGrid items={resources} /></Section>
      <CtaBanner />
    </>
  );
}
