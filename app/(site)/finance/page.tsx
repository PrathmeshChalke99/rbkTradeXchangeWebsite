import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { IMG, allProducts } from '@/lib/content';
import { P } from '@/lib/photos';
import { FinanceExplorer } from '@/components/pages/finance-explorer';
import { PageHero } from '@/components/pages/page-hero';
import { Section, Heading, Disclaimer } from '@/components/pages/section';
import { FinanceEstimator } from '@/components/pages/finance-estimator';
import { CtaBanner } from '@/components/pages/cta-banner';
import { NumberedSteps } from '@/components/pages/numbered-steps';

export const metadata: Metadata = { title: 'Business & Debt Finance Products | RBK TradeXchange', description: 'Pre-shipment, post-shipment, LC, working capital, term and supply-chain finance. Compare products, documents and how each one works.' };

export default function FinancePage() {
  const subTotal = allProducts.reduce((n, p) => n + p.subs.length, 0);
  return (
    <>
      <PageHero eyebrow="Business finance" title={<>Debt financing for <span className="gradient-text">every stage</span> of trade</>}
        description="Explore every finance product with plain-language explanations: how it works, who it suits and what documents lenders usually ask for. Then apply through one adaptive flow."
        image={P.shipAerial} fallback={IMG.hero} imageAlt="Container ship at sea" crumbs={[{ label: 'Finance' }]}
        primary={{ label: 'Start an application', href: '/signup' }} secondary={{ label: 'Try the estimator', href: '#estimator' }} chips={['3 categories', `${allProducts.length} products`, `${subTotal} sub-products`]} />

      <Section tone="paper">
        <Heading eyebrow="Categories" title="Choose by where your cash is stuck" text="Before shipment, after shipment, inside your supply chain or across the business." />
        <FinanceExplorer />
      </Section>

      <Section>
        <Heading center={false} eyebrow="Compare" title="All products at a glance" text="Every product, the stage it covers and the documents lenders typically start with." />
        <div className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-brand-paper">
                <tr className="font-mono text-[11px] uppercase tracking-wider text-brand-slate">
                  <th scope="col" className="px-5 py-3.5 font-medium">Product</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Category</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Sub-products</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Typical documents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-line">
                {allProducts.map((p) => (
                  <tr key={p.slug} className="group transition-colors hover:bg-brand-paper/70">
                    <td className="px-5 py-4">
                      <Link className="inline-flex items-center gap-1 font-semibold text-brand-ink group-hover:text-brand-blue" href={`/finance/${p.category.slug}/${p.slug}`}>{p.name}<ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" /></Link>
                      <p className="mt-0.5 text-xs text-brand-slate">{p.tagline}</p>
                    </td>
                    <td className="px-5 py-4"><span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] text-brand-slate"><span className="h-2 w-2 rounded-full" style={{ background: p.category.color }} />{p.category.stage}</span></td>
                    <td className="px-5 py-4"><div className="flex flex-wrap gap-1">{p.subs.map((x) => <span key={x.name} className="rounded-md bg-brand-paper px-1.5 py-0.5 text-xs text-brand-ink ring-1 ring-brand-line">{x.name}</span>)}</div></td>
                    <td className="px-5 py-4 text-[13px] text-brand-slate">{p.docs.slice(0, 3).join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <Heading eyebrow="How applying works" title="One application, many lenders" text="You choose the product. The checklist adapts. Lenders respond on their own terms." />
        <NumberedSteps steps={['Pick a category and product', 'Upload KYC, company and financial documents', 'Participating lenders review independently', 'Compare quotations and accept or decline']} />
        <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
          {['No obligation to accept a quote', 'Requirements adapt to each product', 'Track status in your dashboard'].map((t) => <li key={t} className="chip"><Check className="h-3.5 w-3.5 text-brand-turquoise" />{t}</li>)}
        </ul>
      </Section>

      <Section>
        <Heading eyebrow="Estimator" title="Estimate what an invoice could release" text="Model an advance before you apply. Real terms come from participating lenders." />
        <FinanceEstimator />
        <Disclaimer className="mt-6" />
      </Section>
      <CtaBanner />
    </>
  );
}
