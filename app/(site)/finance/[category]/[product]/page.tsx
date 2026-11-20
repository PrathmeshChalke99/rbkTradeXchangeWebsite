import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Calculator,
  Check,
} from "lucide-react";
import {
  allProducts,
  getProduct,
  resources,
  considerations,
} from "@/lib/content";
import { ProductHero } from "@/components/finance/product-hero";
import { MechanismFlow } from "@/components/finance/mechanism-flow";
import { Band, BandHeading, ClosingCta } from "@/components/platform/blocks";
import { Spot } from "@/components/platform/spot";
import { GlossIcon } from "@/components/platform/gloss-icon";
import { DocIcon, LayersIcon } from "@/components/platform/icons";
import { Disclaimer } from "@/components/pages/section";
import { FaqList } from "@/components/pages/faq-list";
import { RevealGroup, RevealItem } from "@/components/pages/reveal";
import { OnThisPage } from "@/components/pages/on-this-page";

export const dynamicParams = false;
export const generateStaticParams = () =>
  allProducts.map((p) => ({ category: p.category.slug, product: p.slug }));
export function generateMetadata({
  params,
}: {
  params: { category: string; product: string };
}): Metadata {
  const r = getProduct(params.category, params.product);
  return r
    ? {
        title: `${r.product.name} | RBK TradeXchange`,
        description: r.product.summary,
      }
    : {};
}

const accents: Record<string, string> = {
  "international-trade-finance": "#1d5fd6",
  "domestic-supply-chain-finance": "#0f9a8a",
  "corporate-finance": "#0a3a7a",
};

export default function ProductPage({
  params,
}: {
  params: { category: string; product: string };
}) {
  const r = getProduct(params.category, params.product);
  if (!r) notFound();
  const { category: c, product: p } = r;
  const accent = accents[c.slug] ?? "#1d5fd6";
  const siblings = c.products.filter((x) => x.slug !== p.slug).slice(0, 2);
  const article = resources.find(
    (a) => a.related === `/finance/${c.slug}/${p.slug}`,
  );

  return (
    <>
      <ProductHero
        catName={c.name}
        catSlug={c.slug}
        catStage={c.stage}
        name={p.name}
        tagline={p.tagline}
        summary={p.summary}
        image={p.image}
        fallback={p.fallback}
        subs={p.subs}
        accent={accent}
      />
      <OnThisPage
        items={[
          { id: "sub-products", label: "Sub-products" },
          { id: "how-it-works", label: "How it works" },
          { id: "fit", label: "Who it suits" },
          { id: "documents", label: "Documents" },
          { id: "faqs", label: "FAQs" },
        ]}
      />

      <Band tone="paper" id="sub-products">
        <BandHeading
          eyebrow="What's inside"
          title={`${p.name} covers`}
          text="Each sub-product suits a different situation. Choose the one that fits when you apply."
        />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.subs.map((s, i) => (
            <RevealItem key={s.name} className="h-full">
              <Spot>
                <div
                  id={s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  className="relative flex h-full gap-4 p-6"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-1 right-4 font-heading text-6xl font-bold leading-none text-brand-ink/[0.045]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <GlossIcon icon={LayersIcon} tint={accent} size="lg" />
                  <div className="relative">
                    <h3 className="font-heading text-lg font-semibold text-brand-ink">
                      {s.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-brand-slate">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Spot>
            </RevealItem>
          ))}
        </RevealGroup>
      </Band>

      <Band tone="white" id="how-it-works">
        <BandHeading
          eyebrow="Mechanism"
          title={`How ${p.name} works`}
          text="The typical sequence. Each lender sets its own structure and conditions."
        />
        <MechanismFlow steps={p.mechanism} accent={accent} />
      </Band>

      <Band tone="paper" id="fit">
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            {
              t: "Best suited for",
              items: p.bestFor,
              icon: Check,
              tone: "bg-emerald-50 text-emerald-600",
            },
            {
              t: "Things to consider",
              items: considerations,
              icon: AlertCircle,
              tone: "bg-brand-accent-soft text-brand-accent-dark",
            },
          ].map((b) => (
            <Spot key={b.t} className="!rounded-3xl">
              <div className="p-7">
                <h3 className="font-heading text-xl font-semibold text-brand-ink">
                  {b.t}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {b.items.map((i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-brand-ink"
                    >
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${b.tone}`}
                      >
                        <b.icon className="h-3.5 w-3.5" />
                      </span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </Spot>
          ))}
        </div>
      </Band>

      <Band tone="white">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <div id="documents" className="scroll-mt-32">
            <BandHeading
              eyebrow="Documents"
              title="What you will typically upload"
              text="The checklist inside the portal adapts to this product. Lenders may ask for more."
            />
            <RevealGroup className="grid gap-3 sm:grid-cols-2">
              {p.docs.map((d) => (
                <RevealItem key={d}>
                  <Spot>
                    <div className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-brand-ink">
                      <GlossIcon icon={DocIcon} tint={accent} size="sm" />
                      {d}
                    </div>
                  </Spot>
                </RevealItem>
              ))}
            </RevealGroup>
            <Disclaimer className="mt-6" />
          </div>
          <div id="faqs" className="scroll-mt-32">
            <BandHeading eyebrow="FAQs" title="Frequently asked questions" />
            <FaqList items={p.faqs} />
          </div>
        </div>
      </Band>

      <Band tone="paper">
        <BandHeading eyebrow="Related" title="Keep exploring" />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siblings.map((s) => (
            <RevealItem key={s.slug} className="h-full">
              <Link
                href={`/finance/${c.slug}/${s.slug}`}
                className="block h-full"
              >
                <Spot>
                  <div className="p-5">
                    <p className="font-mono text-[10.5px] uppercase tracking-wider text-brand-slate">
                      Also in {c.stage}
                    </p>
                    <p className="mt-2 font-heading text-base font-semibold text-brand-ink">
                      {s.name}
                    </p>
                    <p className="mt-1 text-sm text-brand-slate">{s.tagline}</p>
                  </div>
                </Spot>
              </Link>
            </RevealItem>
          ))}
          {article && (
            <RevealItem className="h-full">
              <Link
                href={`/resources/${article.slug}`}
                className="block h-full"
              >
                <Spot>
                  <div className="p-5">
                    <p className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-brand-slate">
                      <BookOpen className="h-3.5 w-3.5" />
                      Guide
                    </p>
                    <p className="mt-2 font-heading text-base font-semibold text-brand-ink">
                      {article.title}
                    </p>
                    <span className="link-arrow mt-2">
                      Read <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Spot>
              </Link>
            </RevealItem>
          )}
          <RevealItem className="h-full">
            <Link href="/finance#estimator" className="block h-full">
              <Spot>
                <div className="p-5">
                  <p className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-brand-slate">
                    <Calculator className="h-3.5 w-3.5" />
                    Tool
                  </p>
                  <p className="mt-2 font-heading text-base font-semibold text-brand-ink">
                    Finance estimator
                  </p>
                  <span className="link-arrow mt-2">
                    Try it <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Spot>
            </Link>
          </RevealItem>
        </RevealGroup>
      </Band>

      <ClosingCta
        title={`Ready to apply for ${p.name}?`}
        text="Create your account, upload your documents and let participating lenders review your application."
      />
    </>
  );
}
