import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Check, Lightbulb } from 'lucide-react';
import { IMG, eDocs, getDoc } from '@/lib/content';
import { PageHero } from '@/components/pages/page-hero';
import { Section, Heading } from '@/components/pages/section';
import { DocPreview } from '@/components/pages/doc-preview';
import { CtaBanner } from '@/components/pages/cta-banner';
import { DocCard } from '@/components/pages/doc-card';

export const dynamicParams = false;
export const generateStaticParams = () => eDocs.map((d) => ({ slug: d.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = getDoc(params.slug);
  return d ? { title: `${d.name} Template | RBK TradeXchange`, description: d.usedWhen } : {};
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const d = getDoc(params.slug);
  if (!d) notFound();
  const others = eDocs.filter((x) => x.slug !== d.slug).slice(0, 3);
  return (
    <>
      <PageHero eyebrow="E-Docs template" title={d.name} description={`${d.short} ${d.usedWhen}`} image={d.photo ?? IMG.eDocs} fallback={IMG.eDocs} imageAlt={d.name}
        crumbs={[{ label: 'E-Docs', href: '/documents' }, { label: d.name }]} primary={{ label: 'Use in the portal', href: '/signup' }} secondary={{ label: 'Try it below', href: '#preview' }} compact />
      <Section tone="paper" id="preview">
        <Heading center={false} eyebrow="Live preview" title={`Fill in a ${d.name.toLowerCase()}`} text="Edit the sample fields. The document on the right updates as you type." />
        <DocPreview name={d.name} label={d.label} color={d.color} fields={d.fields} />
      </Section>
      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="card p-6 sm:p-7">
            <h2 className="text-lg font-semibold text-brand-ink">Fields it includes</h2>
            <ul className="mt-4 space-y-3">{d.fields.map((f) => <li key={f} className="flex gap-3 text-sm text-brand-ink"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-mint text-brand-turquoise"><Check className="h-3 w-3" /></span>{f}</li>)}</ul>
          </div>
          <div className="card p-6 sm:p-7">
            <h2 className="text-lg font-semibold text-brand-ink">Tips for a clean document</h2>
            <ul className="mt-4 space-y-3">{d.tips.map((t) => <li key={t} className="flex gap-3 text-sm text-brand-ink"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-[#9a5d08]"><Lightbulb className="h-3 w-3" /></span>{t}</li>)}</ul>
            <p className="mt-6 rounded-xl bg-brand-paper p-4 text-sm text-brand-slate">Need finance against this paper? See <Link className="font-semibold text-brand-blue hover:underline" href="/finance">business finance products</Link>.</p>
          </div>
        </div>
      </Section>
      <Section tone="paper">
        <Heading center={false} eyebrow="More templates" title="Other documents in the studio" action={<Link href="/documents" className="btn-secondary">All templates<ArrowRight className="h-4 w-4" /></Link>} />
        <div className="grid gap-5 md:grid-cols-3">{others.map((x) => <DocCard key={x.slug} d={x} />)}</div>
      </Section>
      <CtaBanner />
    </>
  );
}
