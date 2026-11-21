import type { Metadata } from "next";
import { TradeAIHero } from "@/components/platform/heroes-trade";
import { BrowserFrame, FocusShot, Img } from "@/components/platform/frames";
import {
  Band,
  BandHeading,
  ClosingCta,
  SplitRow,
} from "@/components/platform/blocks";
import { shots } from "@/lib/platform-assets";

export const metadata: Metadata = {
  title: "TradeAI | RBK TradeXchange",
  description:
    "Your AI-powered trade documentation and risk analysis assistant: generate trade documents, find discrepancies and analyse Letters of Credit.",
};

export default function TradeAIPage() {
  return (
    <>
      <TradeAIHero />

      <Band tone="white" id="how">
        <BandHeading
          eyebrow="Four ways TradeAI helps"
          title="From purchase order to risk check."
        />

        <SplitRow
          eyebrow="01 · Generate"
          title="Turn a purchase order into trade documents."
          text="Upload the buyer's PO. TradeAI builds the documents from your transaction details. You review, edit, download and share."
          points={[
            "Pro forma invoice",
            "Sales contract",
            "Purchase contract, where applicable",
            "Commercial invoice",
          ]}
          visual={
            <BrowserFrame url="dashboard.rbktradexchange.com">
              <FocusShot shot={shots.tradeFlow} focus={12} aspect={4 / 3.2} />
            </BrowserFrame>
          }
        />

        <SplitRow
          reverse
          eyebrow="02 · Analyse"
          title="Find errors before documents are submitted."
          text="TradeAI checks uploaded documents against each other and flags what needs a second look."
          points={[
            "Buyer and seller mismatches",
            "Product descriptions",
            "Quantity and value",
            "Payment terms",
            "Shipment information",
            "Missing mandatory fields",
          ]}
          visual={
            <BrowserFrame url="dashboard.rbktradexchange.com">
              <FocusShot shot={shots.tradeFlow} focus={50} aspect={4 / 3.2} />
            </BrowserFrame>
          }
        />

        <SplitRow
          eyebrow="03 · LC analysis"
          title="Understand your LC before you execute."
          text="Even small discrepancies can mean rejection, amendments and delays. Check the LC and your documents against its conditions."
          points={[
            "Extract and structure LC clauses",
            "Critical dates and shipment conditions",
            "Document presentation requirements",
            "Compare documents against LC conditions",
          ]}
          visual={
            <BrowserFrame url="dashboard.rbktradexchange.com">
              <Img shot={shots.lc} />
            </BrowserFrame>
          }
          footer={
            <a href="/trade-management/lc-discrepancy" className="link-arrow">
              LC Discrepancy Analysis →
            </a>
          }
        />

        <SplitRow
          reverse
          eyebrow="04 · Assist"
          title="A smarter assistant for your trade operations."
          text="Ask about an LC clause, an invoice, a purchase order or a document mismatch. TradeAI answers from your own transaction information."
          points={[
            "Understand an LC clause",
            "Prepare an invoice",
            "Review a purchase order",
            "Spot a document mismatch",
          ]}
          visual={
            <div className="rounded-3xl border border-brand-line bg-brand-paper p-6 shadow-soft">
              <div className="space-y-3">
                <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[#022350] px-4 py-3 text-sm text-white">
                  Why was my LC draft flagged?
                </p>
                <p className="max-w-[90%] rounded-2xl rounded-bl-sm border border-brand-line bg-white px-4 py-3 text-sm text-brand-ink">
                  The currency, incoterm and port of discharge differ from your trade details. Review them before presenting.
                </p>
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-brand-slate/70">
                Illustrative conversation
              </p>
            </div>
          }
        />
      </Band>


      <ClosingCta
        title="Let TradeAI read the paperwork."
        text="See it work on your own purchase order."
        primary={{ label: "Request a demo", href: "/contact" }}
        secondary={{ label: "Explore the portal", href: "/trade-management" }}
      />
    </>
  );
}
