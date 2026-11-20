import { AssessIcon, BoxIcon, ContractIcon, DocIcon, DocStackIcon, LcIcon, PortalIcon, ReceiptIcon, ShareIcon, ShieldIcon, TagIcon } from "@/components/platform/icons";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  FileText,
  FolderTree,
  LayoutTemplate,
  Library,
  PenLine,
  Share2,
  ShieldCheck,
  Tags,
} from "lucide-react";
import { DocMgmtHero } from "@/components/platform/heroes-trade";
import { DocCard } from "@/components/pages/doc-card";
import { eDocs } from "@/lib/content";
import { docFormats } from "@/lib/doc-formats";
import { RevealGroup, RevealItem } from "@/components/pages/reveal";
import {
  Band,
  BandHeading,
  CapabilityRows,
  ClosingCta,
} from "@/components/platform/blocks";
import { Reveal } from "@/components/pages/reveal";

export const metadata: Metadata = {
  title: "Document Management | RBK TradeXchange",
  description:
    "Create, organise, store and share business and trade documents from one centralised environment.",
};

export default function DocumentManagementPage() {
  return (
    <>
      <DocMgmtHero
        docs={eDocs.map((d) => ({
          slug: d.slug,
          name: d.name,
          label: d.label,
          color: d.color,
          bg: d.bg,
          accent: docFormats.find((f) => f.slug === d.slug)?.accent,
        }))}
      />

      <Band tone="white" id="formats">
        <BandHeading
          eyebrow="Document formats"
          title="Pick a document. See the format."
          text="Open any card for the format overview and a live preview you can fill in."
        />
        <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {eDocs.map((d) => (
            <RevealItem key={d.slug}>
              <DocCard d={d} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Band>

      <Band tone="paper" id="capabilities">
        <BandHeading
          eyebrow="Capabilities"
          title="Less documentation chaos. More control."
        />
        <CapabilityRows
          cols={2}
          items={[
            { icon: ContractIcon, title: "Business document creation" },
            { icon: DocIcon, title: "Document templates" },
            { icon: BoxIcon, title: "Centralised document storage" },
            { icon: TagIcon, title: "Document categorisation" },
            { icon: ShieldIcon, title: "Document access and management" },
            { icon: ShareIcon, title: "Downloading and sharing" },
            { icon: DocStackIcon, title: "Trade and transaction documents" },
          ]}
        />
      </Band>

      <Band tone="paper">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-brand-line bg-white p-8 shadow-soft sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-accent-soft text-brand-accent-dark">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-heading text-xl font-semibold text-brand-ink">
                  Contracts, invoices and commercial documents.
                </h3>
                <p className="mt-1 text-sm text-brand-slate">
                  Generate them from templates in E-Docs Studio.
                </p>
              </div>
            </div>
            <Link href="/documents" className="btn-primary shrink-0">
              Open E-Docs Studio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </Band>

      <ClosingCta
        title="Keep every document within reach."
        text="Create your account and bring your documents together."
      />
    </>
  );
}
