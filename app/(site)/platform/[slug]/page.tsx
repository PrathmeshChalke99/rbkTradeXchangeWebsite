import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, FileText } from "lucide-react";
import { categories, eDocs, modules, getModule } from "@/lib/content";
import { financeCategories } from "@/lib/site-config";
import { PageHero } from "@/components/pages/page-hero";
import { Section, Heading } from "@/components/pages/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/pages/reveal";
import { CtaBanner } from "@/components/pages/cta-banner";
import { Icon } from "@/components/pages/icon";
import { CategoryCard } from "@/components/pages/category-card";
import { NetworkGraph } from "@/components/pages/network-graph";
import { AIDocumentIntelligence } from "@/components/site/ai-document-intelligence";
import { LCDiscrepancy } from "@/components/site/lc-discrepancy";
import { AIClientAssessment } from "@/components/site/ai-client-assessment";
import { ResponsibleAI } from "@/components/site/responsible-ai";

export const dynamicParams = false;
export const generateStaticParams = () =>
  modules.map((m) => ({ slug: m.slug }));
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const m = getModule(params.slug);
  return m
    ? { title: `${m.name} | RBK TradeXchange`, description: m.intro }
    : {};
}

/** Module-specific supporting content for modules without an interactive embed. */
function ModuleExtras({ slug }: { slug: string }) {
  if (slug === "business-finance") {
    return (
      <>
        <Section>
          <Heading
            center={false}
            eyebrow="Adaptive checklists"
            title="Requirements change with the product you choose"
            text="A sample of how the document checklist adapts. Exact requirements are set by participating lenders."
          />
          <RevealGroup className="grid gap-4 md:grid-cols-3">
            {financeCategories.map((fc) => (
              <RevealItem key={fc.id}>
                <div className="card h-full p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-brand-ink">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: fc.color }}
                    />
                    {fc.name}
                  </p>
                  <div className="mt-4 space-y-3">
                    {fc.subcategories.map((s) => (
                      <div
                        key={s.name}
                        className="rounded-xl border border-brand-line bg-brand-paper/60 p-3"
                      >
                        <p className="text-[13px] font-semibold text-brand-ink">
                          {s.name}
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-1">
                          {s.requires.map((r) => (
                            <li
                              key={r}
                              className="rounded-md bg-white px-1.5 py-0.5 text-[11px] text-brand-slate ring-1 ring-brand-line"
                            >
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
        <Section tone="paper">
          <Heading
            center={false}
            eyebrow="Finance categories"
            title="Apply across three categories"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {categories.map((c) => (
              <CategoryCard key={c.slug} c={c} />
            ))}
          </div>
        </Section>
      </>
    );
  }
  if (slug === "network-management") {
    return (
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <Heading
            center={false}
            eyebrow="Partner graph"
            title="Buyers, suppliers and logistics partners, mapped"
            text="Each partner keeps its addresses, contacts and trade references, ready to drop into e-documents and finance applications."
            className="mb-0"
          />
          <Reveal delay={0.1}>
            <NetworkGraph />
          </Reveal>
        </div>
      </Section>
    );
  }
  if (slug === "e-docs-studio") {
    return (
      <Section>
        <Heading
          center={false}
          eyebrow="Templates"
          title="Six templates for the trade paper trail"
          action={
            <Link href="/documents" className="btn-secondary">
              All templates
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {eDocs.map((d) => (
            <RevealItem key={d.slug}>
              <Link
                href={`/documents/${d.slug}`}
                className="card card-hover ring-gradient group flex h-full items-start gap-4 p-5"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: d.bg, color: d.color }}
                >
                  <FileText className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-brand-ink group-hover:text-brand-blue">
                    {d.name}
                  </span>
                  <span className="mt-1 block text-sm text-brand-slate">
                    {d.short}
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    );
  }
  return null;
}

export default function ModulePage({ params }: { params: { slug: string } }) {
  const m = getModule(params.slug);
  if (!m) notFound();
  const i = modules.indexOf(m);
  const prev = modules[(i + modules.length - 1) % modules.length];
  const next = modules[(i + 1) % modules.length];
  return (
    <>
      <PageHero
        eyebrow={m.name}
        title={m.headline}
        description={m.intro}
        image={m.photo ?? m.image}
        fallback={m.image}
        imageAlt={m.name}
        crumbs={[{ label: "Platform", href: "/platform" }, { label: m.name }]}
        primary={{ label: "Get started", href: "/signup" }}
        secondary={{ label: "All modules", href: "/platform" }}
      />

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Heading
              center={false}
              eyebrow="Capabilities"
              title="What you can do"
            />
            <RevealGroup className="grid gap-3 sm:grid-cols-2">
              {m.highlights.map((h) => (
                <RevealItem key={h}>
                  <div className="card flex h-full items-start gap-3 p-4">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: m.bg, color: m.color }}
                    >
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="pt-1 text-sm font-medium text-brand-ink">
                      {h}
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <div>
            <Heading center={false} eyebrow="Workflow" title="How it works" />
            <ol className="relative space-y-3">
              <span
                aria-hidden
                className="absolute bottom-5 left-[19px] top-5 w-px"
                style={{
                  background: `linear-gradient(${m.color}, ${m.color}22)`,
                }}
              />
              {m.steps.map((s, k) => (
                <Reveal key={s} delay={k * 0.08}>
                  <li className="relative flex list-none items-center gap-4">
                    <span
                      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-mono text-xs font-semibold shadow-soft ring-1 ring-brand-line"
                      style={{ color: m.color }}
                    >
                      {String(k + 1).padStart(2, "0")}
                    </span>
                    <span className="card flex-1 px-4 py-3 text-sm font-medium text-brand-ink">
                      {s}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {m.embed === "ai" && (
        <>
          <AIDocumentIntelligence />
          <LCDiscrepancy />
          <div id="lender-quotations">
            <AIClientAssessment />
          </div>
        </>
      )}
      {m.embed === "quotes" && <AIClientAssessment />}
      {m.slug === "responsible-ai" && <ResponsibleAI />}
      <ModuleExtras slug={m.slug} />

      <Section size="sm" className="border-t border-brand-line">
        <nav aria-label="More modules" className="grid gap-4 sm:grid-cols-2">
          <Link
            href={`/platform/${prev.slug}`}
            className="card card-hover group flex items-center gap-4 p-5"
          >
            <ArrowLeft className="h-4 w-4 text-brand-slate transition group-hover:-translate-x-1" />
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ background: prev.bg, color: prev.color }}
            >
              <Icon name={prev.icon} className="h-4 w-4" />
            </span>
            <span>
              <span className="block font-mono text-[10.5px] uppercase tracking-wider text-brand-slate">
                Previous
              </span>
              <span className="font-semibold text-brand-ink">{prev.name}</span>
            </span>
          </Link>
          <Link
            href={`/platform/${next.slug}`}
            className="card card-hover group flex items-center justify-end gap-4 p-5 text-right"
          >
            <span>
              <span className="block font-mono text-[10.5px] uppercase tracking-wider text-brand-slate">
                Next
              </span>
              <span className="font-semibold text-brand-ink">{next.name}</span>
            </span>
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ background: next.bg, color: next.color }}
            >
              <Icon name={next.icon} className="h-4 w-4" />
            </span>
            <ArrowRight className="h-4 w-4 text-brand-slate transition group-hover:translate-x-1" />
          </Link>
        </nav>
      </Section>
      <CtaBanner />
    </>
  );
}
