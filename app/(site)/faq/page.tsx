import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { categories } from '@/lib/content';
import { PageHero } from '@/components/pages/page-hero';
import { Section, Heading } from '@/components/pages/section';
import { FaqList } from '@/components/pages/faq-list';
import { FAQSection } from '@/components/site/faq-section';
import { CtaBanner } from '@/components/pages/cta-banner';

export const metadata: Metadata = { title: 'FAQ | RBK TradeXchange', description: 'Answers about the platform, responsible AI and each debt finance product.' };

export default function FaqPage() {
  return (
    <>
      <PageHero compact eyebrow="FAQ" title={<>Questions, <span className="gradient-text">answered</span></>}
        description="Start with the platform basics, then browse questions for each finance product."
        crumbs={[{ label: 'FAQ' }]} primary={{ label: 'Contact us', href: '/contact' }} secondary={{ label: 'Product questions', href: '#products' }} />
      <FAQSection />
      <Section tone="paper" id="products">
        <Heading center={false} eyebrow="By product" title="Finance product questions" />
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Finance categories" className="hidden lg:block">
            <ul className="sticky top-28 space-y-1 border-l border-brand-line">
              {categories.map((c) => <li key={c.slug}><a href={`#faq-${c.slug}`} className="-ml-px flex items-center gap-2 border-l border-transparent py-1.5 pl-4 text-sm text-brand-slate transition hover:border-brand-blue hover:text-brand-ink"><span className="h-2 w-2 rounded-full" style={{ background: c.color }} />{c.name}</a></li>)}
            </ul>
          </nav>
          <div className="space-y-10">
            {categories.map((c) => (
              <div key={c.slug} id={`faq-${c.slug}`} className="scroll-mt-28">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-brand-ink"><span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />{c.name}</h3>
                <FaqList items={c.products.flatMap((p) => p.faqs.map((f) => ({ q: `${p.name}: ${f.q}`, a: f.a })))} />
              </div>
            ))}
            <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-paleblue text-brand-blue"><Mail className="h-5 w-5" /></span>
                <div><p className="font-semibold text-brand-ink">Still have a question?</p><p className="text-sm text-brand-slate">Our team can help with platform and account questions.</p></div>
              </div>
              <Link href="/contact" className="btn-primary shrink-0">Contact us</Link>
            </div>
          </div>
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
