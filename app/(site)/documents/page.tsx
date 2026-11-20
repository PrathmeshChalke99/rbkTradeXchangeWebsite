import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { eDocs } from "@/lib/content";
import { docFormats } from "@/lib/doc-formats";
import { DocsIndexHero } from "@/components/documents/doc-heroes";
import { Band, BandHeading, ClosingCta } from "@/components/platform/blocks";
import { DocCard } from "@/components/pages/doc-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/pages/reveal";

export const metadata: Metadata = {
  title: "E-Docs Studio | RBK TradeXchange",
  description:
    "Generate proforma invoices, contracts, purchase orders, export invoices and packing lists on your own formats.",
};

const steps = [
  { k: "Choose a format", t: "Pick the document you need." },
  { k: "Type your details", t: "Your text lands on the real format, in the right place." },
  { k: "Check the preview", t: "See the finished page update as you type." },
  { k: "Download or attach", t: "Save it, share it or attach it to a trade." },
];

export default function DocumentsPage() {
  return (
    <>
      <DocsIndexHero
        docs={eDocs.map((d) => ({
          slug: d.slug,
          name: d.name,
          label: d.label,
          accent: docFormats.find((f) => f.slug === d.slug)?.accent ?? d.color,
        }))}
      />

      <Band tone="white" id="formats">
        <BandHeading
          eyebrow="Formats"
          title="Choose a document."
          text="Open any card to fill it in and see the format live."
        />
        <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {eDocs.map((d) => (
            <RevealItem key={d.slug}>
              <DocCard d={d} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Band>

      <Band tone="paper">
        <BandHeading eyebrow="How it works" title="From format to finished paper." />
        <ol className="relative grid gap-6 md:grid-cols-4">
          <span className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent md:block" aria-hidden />
          {steps.map((s, i) => (
            <li key={s.k}>
              <Reveal delay={i * 0.1}>
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#022350] font-mono text-sm text-white shadow-lift">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold text-brand-ink">{s.k}</h3>
                <p className="mt-1 text-sm text-brand-slate">{s.t}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Link href="/trade-management/document-management" className="link-arrow">
            Back to Document Management <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Band>

      <ClosingCta
        title="Paperwork that starts ready."
        text="Create your account to save formats, share them and attach them to your trades."
      />
    </>
  );
}
