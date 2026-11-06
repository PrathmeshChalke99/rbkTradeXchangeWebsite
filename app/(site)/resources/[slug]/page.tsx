import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Photo } from '@/components/pages/photo';
import { resources, getArticle } from '@/lib/content';
import { Breadcrumbs } from '@/components/pages/breadcrumbs';
import { Section, Heading, Disclaimer } from '@/components/pages/section';
import { ResourceGrid } from '@/components/pages/resource-grid';
import { CtaBanner } from '@/components/pages/cta-banner';
import { Reveal } from '@/components/pages/reveal';

export const dynamicParams = false;
export const generateStaticParams = () => resources.map((r) => ({ slug: r.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getArticle(params.slug);
  return a ? { title: `${a.title} | RBK TradeXchange`, description: a.excerpt } : {};
}

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  if (!a) notFound();
  const more = resources.filter((r) => r.slug !== a.slug).slice(0, 3);
  return (
    <>
      <header className="surface-dark on-dark noise pb-28 pt-28 sm:pb-32 sm:pt-32">
        <div className="grid-lines absolute inset-0" aria-hidden />
        <div className="aurora-blob -left-24 -top-32 h-96 w-96 bg-brand-blue/30" aria-hidden />
        <Reveal className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs dark items={[{ label: 'Resources', href: '/resources' }, { label: a.tag }]} />
          <div className="flex items-center gap-3 text-xs">
            <span className="chip-dark">{a.tag}</span>
            <span className="flex items-center gap-1 text-white/60"><Clock className="h-3 w-3" aria-hidden />{a.read}</span>
          </div>
          <h1 className="mt-4 text-display-sm font-semibold text-white">{a.title}</h1>
          <p className="mt-4 text-lg text-white/70">{a.excerpt}</p>
        </Reveal>
      </header>

      <article className="bg-white pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="relative -mt-20 aspect-[16/8] overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/5 sm:-mt-24">
            <Photo src={a.photo ?? a.image} fallback={a.image} alt="" priority />
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-[220px_1fr]">
            <aside className="hidden lg:block">
              <nav aria-label="In this guide" className="sticky top-28">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-slate">In this guide</p>
                <ol className="mt-4 space-y-1 border-l border-brand-line">
                  {a.sections.map((s) => <li key={s.h}><a href={`#${anchor(s.h)}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-brand-slate transition hover:border-brand-blue hover:text-brand-ink">{s.h}</a></li>)}
                </ol>
              </nav>
            </aside>
            <div className="max-w-2xl">
              <div className="space-y-10">
                {a.sections.map((s, i) => (
                  <section key={s.h} id={anchor(s.h)} className="scroll-mt-28">
                    <span className="font-mono text-xs text-brand-blue">{String(i + 1).padStart(2, '0')}</span>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight text-brand-ink">{s.h}</h2>
                    <p className="mt-3 text-[1.075rem] leading-[1.8] text-brand-slate">{s.p}</p>
                  </section>
                ))}
              </div>
              <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-brand-line bg-brand-paper p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-brand-ink">Put this into practice</p>
                  <p className="text-sm text-brand-slate">See the product this guide relates to, its documents and how to apply.</p>
                </div>
                <Link href={a.related} className="btn-primary shrink-0">Explore the product<ArrowRight className="h-4 w-4" /></Link>
              </div>
              <Disclaimer className="mt-6" />
              <Link href="/resources" className="link-arrow mt-8"><ArrowLeft className="h-4 w-4" />All guides</Link>
            </div>
          </div>
        </div>
      </article>
      <Section tone="paper">
        <Heading center={false} eyebrow="Keep reading" title="More guides" />
        <ResourceGrid items={more} filterable={false} />
      </Section>
      <CtaBanner />
    </>
  );
}
