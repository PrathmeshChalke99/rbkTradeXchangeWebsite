import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { categories, getCategory } from "@/lib/content";
import { CategoryHero } from "@/components/platform/heroes-finance";
import { Band, BandHeading, ClosingCta } from "@/components/platform/blocks";
import { Spot } from "@/components/platform/spot";
import { GlossIcon } from "@/components/platform/gloss-icon";
import { DocIcon } from "@/components/platform/icons";
import { Disclaimer } from "@/components/pages/section";
import { CategoryCard } from "@/components/pages/category-card";
import { Photo } from "@/components/pages/photo";
import { RevealGroup, RevealItem } from "@/components/pages/reveal";

export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ category: c.slug }));
export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const c = getCategory(params.category);
  return c ? { title: `${c.name} | RBK TradeXchange`, description: c.description } : {};
}

const accents: Record<string, string> = {
  "international-trade-finance": "#1d5fd6",
  "domestic-supply-chain-finance": "#0f9a8a",
  "corporate-finance": "#0a3a7a",
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const c = getCategory(params.category);
  if (!c) notFound();
  const accent = accents[c.slug] ?? "#1d5fd6";
  const docs = Array.from(new Set(c.products.flatMap((p) => p.docs)));
  const subCount = c.products.reduce((n, p) => n + p.subs.length, 0);

  return (
    <>
      <CategoryHero
        slug={c.slug}
        name={c.name}
        stage={c.stage}
        description={c.description}
        productCount={c.products.length}
        subCount={subCount}
      />

      <Band tone="paper" id="products">
        <BandHeading
          eyebrow="Products"
          title={`Products in ${c.name}`}
          text="Open a product to see each sub-product, the mechanism, documents and FAQs."
        />
        <RevealGroup className="grid gap-5 md:grid-cols-2">
          {c.products.map((p) => (
            <RevealItem key={p.slug} className="h-full">
              <Link href={`/finance/${c.slug}/${p.slug}`} className="block h-full">
                <Spot className="!rounded-3xl">
                  <div className="flex h-full flex-col">
                    <div className="relative aspect-[16/8] overflow-hidden">
                      <Photo
                        src={p.image}
                        fallback={p.fallback}
                        alt=""
                        className="transition duration-700 ease-out-expo group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-[#050f24]/40 to-transparent" aria-hidden />
                      <span className="absolute bottom-3 left-4 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider backdrop-blur" style={{ color: accent }}>
                        {p.subs.length} sub-products
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-heading text-xl font-semibold text-brand-ink">{p.name}</h3>
                      <p className="mt-1 text-sm font-medium" style={{ color: accent }}>
                        {p.tagline}
                      </p>
                      <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-brand-slate">{p.summary}</p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {p.subs.map((x) => (
                          <li key={x.name} className="rounded-md px-2 py-0.5 text-xs font-medium" style={{ background: `${accent}14`, color: accent }}>
                            {x.name}
                          </li>
                        ))}
                      </ul>
                      <span className="link-arrow mt-5">
                        View details <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Spot>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Band>

      <Band tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <BandHeading
            eyebrow="Checklist"
            title="Documents lenders usually ask for"
            text="Exact requirements vary by product and lender. The application flow adapts as you choose, so you only upload what is needed."
          />
          <div>
            <RevealGroup className="grid gap-3 sm:grid-cols-2">
              {docs.map((d) => (
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
        </div>
      </Band>

      <Band tone="paper">
        <BandHeading eyebrow="Keep exploring" title="Other finance categories" />
        <div className="grid gap-5 md:grid-cols-2">
          {categories
            .filter((x) => x.slug !== c.slug)
            .map((x) => (
              <CategoryCard key={x.slug} c={x} />
            ))}
        </div>
      </Band>

      <ClosingCta
        title={`Explore ${c.name}.`}
        text="Create your account and apply through one adaptive flow, or talk to our team first."
      />
    </>
  );
}
