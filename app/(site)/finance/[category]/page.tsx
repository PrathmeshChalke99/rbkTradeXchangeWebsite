import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, FileText } from 'lucide-react';
import { Photo } from '@/components/pages/photo';
import { categories, getCategory } from '@/lib/content';
import { PageHero } from '@/components/pages/page-hero';
import { Section, Heading, Disclaimer } from '@/components/pages/section';
import { CategoryCard } from '@/components/pages/category-card';
import { CtaBanner } from '@/components/pages/cta-banner';
import { RevealGroup, RevealItem } from '@/components/pages/reveal';

export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ category: c.slug }));
export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const c = getCategory(params.category);
  return c ? { title: `${c.name} | RBK TradeXchange`, description: c.description } : {};
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const c = getCategory(params.category);
  if (!c) notFound();
  const docs = Array.from(new Set(c.products.flatMap((p) => p.docs)));
  const subCount = c.products.reduce((n, p) => n + p.subs.length, 0);
  return (
    <>
      <PageHero eyebrow={c.stage} title={c.name} description={c.description} image={c.image} fallback={c.fallback} imageAlt={c.name}
        crumbs={[{ label: 'Finance', href: '/finance' }, { label: c.name }]} primary={{ label: 'Apply now', href: '/signup' }} secondary={{ label: 'Talk to our team', href: '/contact' }}
        chips={[`${c.products.length} products`, `${subCount} sub-products`]} />

      <Section tone="paper">
        <Heading center={false} eyebrow="Products" title={`Products in ${c.name}`} text="Open a product to see each sub-product, the mechanism, documents and FAQs." />
        <RevealGroup className="grid gap-5 md:grid-cols-2">
          {c.products.map((p) => (
            <RevealItem key={p.slug}>
              <Link href={`/finance/${c.slug}/${p.slug}`} className="card card-hover ring-gradient group flex h-full overflow-hidden">
                <div className="relative hidden w-[38%] shrink-0 overflow-hidden sm:block"><Photo src={p.image} fallback={p.fallback} alt="" className="transition duration-700 ease-out-expo group-hover:scale-105" /></div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-brand-ink">{p.name}</h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: c.color }}>{p.tagline}</p>
                  <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-brand-slate">{p.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">{p.subs.map((x) => <li key={x.name} className="rounded-md px-2 py-0.5 text-xs font-medium" style={{ background: c.bg, color: c.color }}>{x.name}</li>)}</ul>
                  <span className="link-arrow mt-4">View details<ArrowRight className="h-4 w-4" /></span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Heading center={false} eyebrow="Checklist" title="Documents lenders usually ask for" text="Exact requirements vary by product and lender. The application flow adapts as you choose, so you only upload what is needed." className="mb-0" />
          <div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {docs.map((d) => <li key={d} className="flex items-center gap-3 rounded-xl border border-brand-line bg-white px-4 py-3 text-sm text-brand-ink shadow-soft"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-paleblue text-brand-blue"><FileText className="h-3.5 w-3.5" /></span>{d}</li>)}
            </ul>
            <Disclaimer className="mt-5" />
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <Heading center={false} eyebrow="Keep exploring" title="Other finance categories" />
        <div className="grid gap-5 md:grid-cols-2">{categories.filter((x) => x.slug !== c.slug).map((x) => <CategoryCard key={x.slug} c={x} />)}</div>
      </Section>
      <CtaBanner />
    </>
  );
}
