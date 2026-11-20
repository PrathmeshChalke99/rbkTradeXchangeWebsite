import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, Lightbulb } from "lucide-react";
import { eDocs, getDoc } from "@/lib/content";
import { getFormat } from "@/lib/doc-formats";
import { DocPageHero } from "@/components/documents/doc-heroes";
import { FormatPreview } from "@/components/documents/format-preview";
import { Band, BandHeading, ClosingCta } from "@/components/platform/blocks";
import { Spot } from "@/components/platform/spot";
import { DocCard } from "@/components/pages/doc-card";
import { RevealGroup, RevealItem } from "@/components/pages/reveal";

export const dynamicParams = false;
export const generateStaticParams = () => eDocs.map((d) => ({ slug: d.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = getDoc(params.slug);
  return d
    ? { title: `${d.name} Format | RBK TradeXchange`, description: `${d.short} ${d.usedWhen}` }
    : {};
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const d = getDoc(params.slug);
  const format = getFormat(params.slug);
  if (!d || !format) notFound();
  const others = eDocs.filter((x) => x.slug !== d.slug).slice(0, 3);

  return (
    <>
      <DocPageHero
        name={d.name}
        label={d.label}
        short={d.short}
        usedWhen={d.usedWhen}
        accent={format.accent}
        fieldCount={format.fields.length}
      />

      <Band tone="paper" id="preview">
        <BandHeading
          eyebrow="Live format"
          title={`Type your details. See the ${d.name.toLowerCase()}.`}
          text="Everything you type is written onto the format in the right place."
        />
        <FormatPreview
          slug={d.slug}
          name={d.name}
          label={d.label}
          accent={format.accent}
          image={format.image}
          fields={format.fields}
        />
      </Band>

      <Band tone="white">
        <div className="grid gap-5 lg:grid-cols-2">
          <Spot className="!rounded-3xl">
            <div className="p-7">
              <h2 className="font-heading text-xl font-semibold text-brand-ink">Fields it includes</h2>
              <ul className="mt-5 space-y-3">
                {d.fields.map((f, i) => (
                  <li key={f} className="flex gap-3 text-sm text-brand-ink">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                      style={{ background: `${format.accent}1f`, color: format.accent }}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="pt-0.5">{f}</span>
                    <span className="ml-auto font-mono text-[10px] text-brand-slate/50">{String(i + 1).padStart(2, "0")}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Spot>
          <Spot className="!rounded-3xl">
            <div className="p-7">
              <h2 className="font-heading text-xl font-semibold text-brand-ink">Tips for a clean document</h2>
              <ul className="mt-5 space-y-3">
                {d.tips.map((t) => (
                  <li key={t} className="flex gap-3 text-sm text-brand-ink">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-accent-soft text-brand-accent-dark">
                      <Lightbulb className="h-3.5 w-3.5" />
                    </span>
                    <span className="pt-0.5">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl bg-brand-paper p-4 text-sm text-brand-slate">
                Need finance against this paper? See{" "}
                <Link className="font-semibold text-brand-blue hover:underline" href="/finance">
                  business finance solutions
                </Link>
                .
              </p>
            </div>
          </Spot>
        </div>
      </Band>

      <Band tone="paper">
        <BandHeading
          eyebrow="More formats"
          title="Other documents in the studio"
        />
        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {others.map((x) => (
            <RevealItem key={x.slug}>
              <DocCard d={x} />
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-8">
          <Link href="/documents" className="btn-secondary">
            All formats <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Band>

      <ClosingCta
        title="Turn this format into finance-ready paper."
        text="Create your account to save, share and attach documents to a trade."
      />
    </>
  );
}
