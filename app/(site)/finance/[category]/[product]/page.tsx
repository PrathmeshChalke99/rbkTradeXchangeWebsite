import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertCircle, ArrowRight, BookOpen, Calculator, Check, FileText } from 'lucide-react';
import { allProducts, getProduct, resources, considerations } from '@/lib/content';
import { PageHero } from '@/components/pages/page-hero';
import { Section, Heading, Disclaimer } from '@/components/pages/section';
import { FaqList } from '@/components/pages/faq-list';
import { CtaBanner } from '@/components/pages/cta-banner';
import { Reveal, RevealGroup, RevealItem } from '@/components/pages/reveal';
import { NumberedSteps } from '@/components/pages/numbered-steps';
import { OnThisPage } from '@/components/pages/on-this-page';

export const dynamicParams = false;
export const generateStaticParams = () => allProducts.map((p) => ({ category: p.category.slug, product: p.slug }));
export function generateMetadata({ params }: { params: { category: string; product: string } }): Metadata {
  const r = getProduct(params.category, params.product);
  return r ? { title: `${r.product.name} | RBK TradeXchange`, description: r.product.summary } : {};
}

export default function ProductPage({ params }: { params: { category: string; product: string } }) {
  const r = getProduct(params.category, params.product);
  if (!r) notFound();
  const { category: c, product: p } = r;
  const siblings = c.products.filter((x) => x.slug !== p.slug).slice(0, 2);
  const article = resources.find((a) => a.related === `/finance/${c.slug}/${p.slug}`);
  return (
    <>
      <PageHero eyebrow={c.name} title={p.name} description={`${p.tagline} ${p.summary}`} image={p.image} fallback={p.fallback} imageAlt={p.name}
        crumbs={[{ label: 'Finance', href: '/finance' }, { label: c.name, href: `/finance/${c.slug}` }, { label: p.name }]}
        primary={{ label: `Apply for ${p.name}`, href: '/signup' }} secondary={{ label: 'Ask a question', href: '/contact' }} chips={p.subs.map((s) => s.name)} />
      <OnThisPage items={[{ id: 'sub-products', label: 'Sub-products' }, { id: 'how-it-works', label: 'How it works' }, { id: 'fit', label: 'Who it suits' }, { id: 'documents', label: 'Documents' }, { id: 'faqs', label: 'FAQs' }]} />

      <Section tone="paper" id="sub-products">
        <Heading center={false} eyebrow="What's inside" title={`${p.name} covers`} text="Each sub-product suits a different situation. Choose the one that fits when you apply." />
        <RevealGroup className={`grid gap-4 sm:grid-cols-2 ${p.subs.length === 5 ? 'lg:grid-cols-5' : p.subs.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {p.subs.map((s, i) => (
            <RevealItem key={s.name}>
              <div id={s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="card card-hover h-full p-5">
                <span className="font-mono text-xs font-semibold" style={{ color: c.color }}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-base font-semibold text-brand-ink">{s.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-slate">{s.desc}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="how-it-works">
        <Heading center={false} eyebrow="Mechanism" title={`How ${p.name} works`} text="The typical sequence. Each lender sets its own structure and conditions." />
        <NumberedSteps steps={p.mechanism} color={c.color} />
      </Section>

      <Section tone="paper" id="fit">
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            { t: 'Best suited for', items: p.bestFor, icon: Check, tone: 'bg-brand-mint text-brand-turquoise' },
            { t: 'Things to consider', items: considerations, icon: AlertCircle, tone: 'bg-brand-yellow text-[#9a5d08]' },
          ].map((b, k) => (
            <Reveal key={b.t} delay={k * 0.08}>
              <div className="card h-full p-6 sm:p-7">
                <h3 className="text-lg font-semibold text-brand-ink">{b.t}</h3>
                <ul className="mt-4 space-y-3">{b.items.map((i) => <li key={i} className="flex gap-3 text-sm leading-relaxed text-brand-ink"><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${b.tone}`}><b.icon className="h-3 w-3" /></span>{i}</li>)}</ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div id="documents" className="scroll-mt-32">
            <Heading center={false} eyebrow="Documents" title="What you will typically upload" text="The checklist inside the portal adapts to this product. Lenders may ask for more." />
            <ul className="grid gap-2.5 sm:grid-cols-2">{p.docs.map((d) => <li key={d} className="flex items-center gap-3 rounded-xl border border-brand-line bg-white px-4 py-3 text-sm shadow-soft"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-paleblue text-brand-blue"><FileText className="h-3.5 w-3.5" /></span>{d}</li>)}</ul>
            <Disclaimer className="mt-5" />
          </div>
          <div id="faqs" className="scroll-mt-32">
            <Heading center={false} eyebrow="FAQs" title="Frequently asked questions" />
            <FaqList items={p.faqs} />
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <Heading center={false} eyebrow="Related" title="Keep exploring" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siblings.map((s) => (
            <Link key={s.slug} href={`/finance/${c.slug}/${s.slug}`} className="card card-hover ring-gradient group p-5">
              <p className="font-mono text-[10.5px] uppercase tracking-wider text-brand-slate">Also in {c.stage}</p>
              <p className="mt-2 text-base font-semibold text-brand-ink">{s.name}</p>
              <p className="mt-1 text-sm text-brand-slate">{s.tagline}</p>
            </Link>
          ))}
          {article && (
            <Link href={`/resources/${article.slug}`} className="card card-hover ring-gradient group p-5">
              <p className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-brand-slate"><BookOpen className="h-3.5 w-3.5" />Guide</p>
              <p className="mt-2 text-base font-semibold text-brand-ink">{article.title}</p>
              <span className="link-arrow mt-2">Read<ArrowRight className="h-4 w-4" /></span>
            </Link>
          )}
          <Link href="/finance#estimator" className="card card-hover ring-gradient group p-5">
            <p className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-brand-slate"><Calculator className="h-3.5 w-3.5" />Tool</p>
            <p className="mt-2 text-base font-semibold text-brand-ink">Finance estimator</p>
            <span className="link-arrow mt-2">Try it<ArrowRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </Section>
      <CtaBanner title={`Ready to apply for ${p.name}?`} />
    </>
  );
}
