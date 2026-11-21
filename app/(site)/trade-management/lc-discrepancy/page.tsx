import type { Metadata } from "next";
import { LCHero } from "@/components/platform/heroes-trade";
import { BrowserFrame, FocusShot, Img } from "@/components/platform/frames";
import {
  Band,
  BandHeading,
  ClosingCta,
  SplitRow,
} from "@/components/platform/blocks";
import { shots } from "@/lib/platform-assets";
import { ReportViewer } from "@/components/platform/report-viewer";

export const metadata: Metadata = {
  title: "LC Discrepancy Analysis | RBK TradeXchange",
  description:
    "Upload your Letter of Credit documents and check them against UCP 600 and ISBP 821 before presenting them to the bank.",
};

const mandatory = ["Letter of Credit", "Commercial Invoice", "Bill of Lading"];
const optional = [
  "LC Amendments",
  "Sales / Purchase documents",
  "Packing List / Certificate of Origin",
  "Draft / Bill of Exchange",
  "Insurance Documents",
];

export default function LCDiscrepancyPage() {
  return (
    <>
      <LCHero />

      <Band tone="white" id="how">
        <BandHeading
          eyebrow="How it works"
          title="Three steps to a cleaner presentation."
        />

        <SplitRow
          eyebrow="01 · Upload"
          title="Attach the LC document set."
          text="Three documents are mandatory. Add the optional ones for a fuller check."
          visual={
            <BrowserFrame url="dashboard.rbktradexchange.com">
              <Img shot={shots.lc} />
            </BrowserFrame>
          }
          footer={
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-brand-accent-dark">Mandatory</p>
                <ul className="mt-2 space-y-1.5 text-sm font-medium text-brand-ink">
                  {mandatory.map((m) => <li key={m}>· {m}</li>)}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-brand-slate">Optional</p>
                <ul className="mt-2 space-y-1.5 text-sm text-brand-slate">
                  {optional.map((m) => <li key={m}>· {m}</li>)}
                </ul>
              </div>
            </div>
          }
        />

        <SplitRow
          reverse
          eyebrow="02 · Review"
          title="See every mismatch, in plain words."
          text="Differences are listed with what was found and what was expected."
          points={[
            "Currency and amount",
            "Incoterm",
            "Goods description",
            "Applicant",
            "Port of discharge",
            "Expiry date",
          ]}
          visual={
            <BrowserFrame url="dashboard.rbktradexchange.com">
              <FocusShot shot={shots.tradeFlow} focus={25} aspect={4 / 3.2} />
            </BrowserFrame>
          }
        />

        <SplitRow
          eyebrow="03 · Report"
          title="Take a written report to your team."
          text="Findings are graded by severity, with the clause referenced and a suggested correction."
          visual={
            <ReportViewer
              src="/platform/lc-discrepancies/LC_Discrepancy_Report.pdf"
              title="LC Discrepancy Assessment Report"
              subtitle="Sample report on test data"
              filename="LC_Discrepancy_Report.pdf"
            />
          }
        />
      </Band>


      <ClosingCta
        title="Present with confidence."
        text="Run your next LC through the analyzer first."
        primary={{ label: "Request a demo", href: "/contact" }}
        secondary={{ label: "Meet TradeAI", href: "/trade-management/tradeai" }}
      />
    </>
  );
}
