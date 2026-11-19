import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { IMG, flow, getArticle } from '@/lib/content';
import { P } from '@/lib/photos';
import { PageHero } from '@/components/pages/page-hero';
import { Section, Heading } from '@/components/pages/section';
import { Reveal } from '@/components/pages/reveal';
import { StepsTimeline } from '@/components/pages/steps-timeline';
import { CtaBanner } from '@/components/pages/cta-banner';

export const metadata: Metadata = { title: 'How It Works | RBK TradeXchange', description: 'From sign-up to lender quotation: how RBK TradeXchange takes you through trade documents, finance applications and e-docs.' };

export default function HowItWorks() {
  const readiness = getArticle('export-finance-readiness-checklist');
  return (
    <>
      <PageHero eyebrow="How it works" title={<>From sign-up to quotation, <span className="gradient-text">step by step</span></>}
        description="Follow the journey a business takes on RBK TradeXchange: register, manage trades, apply for finance, compare lender quotations and generate documents."
        image={P.portSunset} fallback={IMG.postShipment} imageAlt="Container ship leaving port" crumbs={[{ label: 'How it works' }]}
        primary={{ label: 'Create account', href: '/signup' }} secondary={{ label: 'View pricing', href: '/pricing' }} />

      <Section tone="paper">
        <Heading eyebrow="The workflow" title="Five steps inside the portal" text="Each step has its own workspace, and your data carries forward to the next." />
        <StepsTimeline />
      </Section>

      {readiness && (
        <Section>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
            <Heading center={false} eyebrow="Before you start" title="Have these ready for a smoother application" text="Lenders review faster when your business and trade papers are complete and consistent."
              action={<Link href={`/resources/${readiness.slug}`} className="link-arrow">Read the full checklist<ArrowUpRight className="h-4 w-4" /></Link>} className="mb-0 md:flex-col md:items-start" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {readiness.sections.map((s, i) => (
                <Reveal key={s.h} delay={i * 0.06}>
                  <li className="card h-full list-none p-5">
                    <CheckCircle2 className="h-5 w-5 text-brand-turquoise" aria-hidden />
                    <h3 className="mt-3 text-[15px] font-semibold text-brand-ink">{s.h}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-brand-slate">{s.p}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <Section tone="paper">
        <Heading eyebrow="Find your way" title="Where each stage lives on this site" text="Every stage of the journey has pages you can explore before signing up." />
        <ol className="relative mx-auto max-w-3xl space-y-4">
          <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-brand-blue via-brand-sky to-brand-turquoise" />
          {flow.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.05}>
              <li className="relative flex list-none gap-5">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-navy font-mono text-xs font-semibold text-white shadow-soft">{f.id}</span>
                <div className="card flex-1 p-5">
                  <h3 className="text-[17px] font-semibold text-brand-ink">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-brand-slate">{f.body}</p>
                  <div className="mt-3 flex flex-wrap gap-2">{f.links.map(([l, h]) => <Link key={h} href={h} className="inline-flex items-center gap-1 rounded-md bg-brand-paleblue/70 px-2.5 py-1 text-xs font-semibold text-brand-blue transition hover:bg-brand-paleblue">{l}<ArrowUpRight className="h-3 w-3" /></Link>)}</div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
      <CtaBanner />
    </>
  );
}
