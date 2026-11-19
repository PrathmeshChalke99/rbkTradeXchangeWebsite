import { AssessIcon, CartIcon, ContractIcon, DocIcon, DocStackIcon, LcIcon, NetworkIcon, PortalIcon, ReceiptIcon, SparkleIcon } from "@/components/platform/icons";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileCheck2,
  FileSearch,
  FileSignature,
  FileText,
  Network,
  ShoppingCart,
  Sparkles,
  Users,
  Receipt,
  ScrollText,
  Landmark,
} from "lucide-react";
import { TradeHero } from "@/components/platform/heroes-core";
import { StickyStory } from "@/components/platform/story";
import {
  Band,
  BandHeading,
  CapabilityRows,
  ClosingCta,
} from "@/components/platform/blocks";
import { GlossIcon } from "@/components/platform/gloss-icon";
import { shots } from "@/lib/platform-assets";

export const metadata: Metadata = {
  title: "Trade Portal | RBK TradeXchange",
  description:
    "Manage every import and export on one digital platform: purchase orders, documents, LC checks, payments and your business network.",
};

const nextLinks = [
  { href: "/trade-management/tradeai", label: "TradeAI", text: "Documents and risk analysis", icon: SparkleIcon, tint: "#0a3a7a" },
  { href: "/trade-management/lc-discrepancy", label: "LC Discrepancy Analysis", text: "Check an LC before you present it", icon: LcIcon, tint: "#e8684a" },
  { href: "/trade-management/client-assessment", label: "Client Assessment", text: "Run an eligibility test", icon: AssessIcon, tint: "#0f9a8a" },
  { href: "/trade-management/document-management", label: "Document Management", text: "One home for your documents", icon: DocStackIcon, tint: "#2f8fd0" },
];

export default function TradeManagementPage() {
  return (
    <>
      <TradeHero />

      <Band tone="white" id="portal">
        <BandHeading
          eyebrow="The portal"
          title="Your trade operations. Digitally connected."
          text="Follow one real export from purchase order to payment."
        />
        <StickyStory
          url="dashboard.rbktradexchange.com"
          steps={[
            {
              label: "Order & contract",
              title: "Start from the purchase order.",
              text: "Upload the PO, accept it, then create the proforma invoice and sales contract. Each document is verified against the trade details.",
              shot: shots.tradeFlow,
              focus: 12,
              points: ["Purchase order", "Proforma invoice", "Sales purchase contract"],
            },
            {
              label: "LC check",
              title: "Mismatches flagged on arrival.",
              text: "When the LC draft lands, TradeAI compares it with the trade and lists every difference in red.",
              shot: shots.tradeFlow,
              focus: 25,
              points: ["Currency and amount", "Incoterm and ports", "Applicant and expiry"],
            },
            {
              label: "Production",
              title: "Goods ready, documents aligned.",
              text: "Production, e-way bill, export invoice, packing list and certificates, each checked against earlier documents.",
              shot: shots.tradeFlow,
              focus: 50,
              points: ["E-way bill", "Phytosanitary certificate", "Certificate of origin"],
            },
            {
              label: "Shipment & payment",
              title: "From bill of lading to trade closed.",
              text: "Freight, customs, bill of lading and payment confirmation, all on the same timeline.",
              shot: shots.tradeFlow,
              focus: 100,
              points: ["Shipping bill", "Bill of lading", "Payment against BOL"],
            },
          ]}
        />
      </Band>

      <Band tone="paper">
        <BandHeading
          eyebrow="Capabilities"
          title="Everything a trade needs."
        />
        <CapabilityRows
          cols={2}
          items={[
            { icon: PortalIcon, title: "Trade transaction management" },
            { icon: CartIcon, title: "Purchase order management" },
            { icon: DocIcon, title: "Sales and purchase documentation" },
            { icon: ReceiptIcon, title: "Pro forma and commercial invoices" },
            { icon: ContractIcon, title: "Sales and purchase contracts" },
            { icon: DocStackIcon, title: "Trade document management" },
            { icon: LcIcon, title: "Letter of Credit document analysis" },
            { icon: SparkleIcon, title: "Discrepancy identification" },
            { icon: SparkleIcon, title: "AI-powered trade assistance" },
            { icon: NetworkIcon, title: "Business and supplier network" },
          ]}
        />
      </Band>

      <Band tone="white">
        <BandHeading eyebrow="Go deeper" title="Four tools inside the portal." />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-brand-line bg-brand-line sm:grid-cols-2">
          {nextLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex items-center gap-4 bg-white p-6 transition hover:bg-brand-accent-soft/50"
            >
              <GlossIcon icon={l.icon} tint={l.tint} size="lg" />
              <span className="flex-1">
                <span className="block font-heading text-lg font-semibold text-brand-ink">{l.label}</span>
                <span className="block text-sm text-brand-slate">{l.text}</span>
              </span>
              <ArrowRight className="h-5 w-5 text-brand-slate transition group-hover:translate-x-1 group-hover:text-brand-accent-dark" />
            </Link>
          ))}
        </div>
        <p className="mt-6 flex items-center gap-2 text-sm text-brand-slate">
          <Users className="h-4 w-4" /> Built for importers and exporters.
        </p>
      </Band>

      <ClosingCta
        title="Manage your next trade on one platform."
        text="Create your account and bring your first purchase order in."
      />
    </>
  );
}
