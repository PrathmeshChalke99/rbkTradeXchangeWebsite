import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { allProducts } from '@/lib/content';
import { FinanceExplorer } from '@/components/pages/finance-explorer';
import { FinanceHero } from '@/components/platform/heroes-core';
import { Section, Heading } from '@/components/pages/section';
import { FinanceEstimator } from '@/components/pages/finance-estimator';
import { ClosingCta } from '@/components/platform/blocks';
import { MechanismFlow } from '@/components/finance/mechanism-flow';

export const metadata: Metadata = { title: 'Business & Debt Finance Products | RBK TradeXchange', description: 'Pre-shipment, post-shipment, LC, working capital, term and supply-chain finance. Compare products, documents and how each one works.' };

export default function FinancePage() {
  return (
    <>
      <FinanceHero />

      <Section id="solutions" tone="paper">
        <Heading eyebrow="A complete business finance ecosystem" title="Every business has financial needs. We bring solutions together." text="Three categories, each with its own products and sub-categories. Pick one to explore." />
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
        <MechanismFlow accent="#022350" steps={['Pick a category and product', 'Upload KYC, company and financial documents', 'Participating lenders review independently', 'Compare quotations and accept or decline']} />
        <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
          {['No obligation to accept a quote', 'Requirements adapt to each product', 'Track status in your dashboard'].map((t) => <li key={t} className="chip"><Check className="h-3.5 w-3.5 text-brand-turquoise" />{t}</li>)}
        </ul>
      </Section>

      <Section>
        <Heading eyebrow="Estimator" title="Estimate what an invoice could release" text="Model an advance before you apply. Real terms come from participating lenders." />
        <FinanceEstimator />
      </Section>
      <ClosingCta title="Every business deserves better finance." text="Create your account to apply through one adaptive flow, or talk to our team first." />
    </>
  );
}
