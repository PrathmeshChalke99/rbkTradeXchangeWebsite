import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { faqs } from '@/lib/site-config';
import { PageHero } from '@/components/pages/page-hero';
import { PricingSection } from '@/components/site/pricing-section';
import { Section, Heading } from '@/components/pages/section';
import { FaqList } from '@/components/pages/faq-list';
import { CtaBanner } from '@/components/pages/cta-banner';

export const metadata: Metadata = { title: 'Pricing | RBK TradeXchange', description: 'Subscription plans for the RBK TradeXchange Trade Management portal.' };

export default function PricingPage() {
  const pricingFaqs = faqs.filter((f) => /subscription|bank, NBFC|lender names/i.test(f.q));
  return (
    <>
      <PageHero compact eyebrow="Pricing" title={<>Plans that grow with <span className="gradient-text">your trade</span></>}
        description="A subscription unlocks the Trade Management portal. Finance pricing is separate and always set by participating lenders, never by RBK TradeXchange."
        crumbs={[{ label: 'Pricing' }]} chips={['Monthly or annual billing', 'Upgrade any time', 'Entitlements managed in the portal']} />
      <PricingSection />
      <Section>
        <Heading center={false} eyebrow="Good to know" title="Pricing questions" action={<Link href="/faq" className="btn-secondary">All FAQs<ArrowRight className="h-4 w-4" /></Link>} />
        <FaqList items={pricingFaqs} />
      </Section>
      <CtaBanner />
    </>
  );
}
