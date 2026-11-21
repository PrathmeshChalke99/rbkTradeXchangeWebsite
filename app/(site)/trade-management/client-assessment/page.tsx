import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { FileText } from "lucide-react";
import { ReportViewer } from "@/components/platform/report-viewer";
import { AssessmentHero } from "@/components/platform/heroes-trade";
import {
  Band,
  BandHeading,
  ClosingCta,
} from "@/components/platform/blocks";
import { Reveal, RevealGroup, RevealItem } from "@/components/pages/reveal";

export const metadata: Metadata = {
  title: "Client Assessment | RBK TradeXchange",
  description:
    "Upload your KYC and financial documents and run an eligibility assessment before you apply for finance.",
};

const mandatory = [
  "Commercial CIBIL Report",
  "Individual CIBIL Report(s)",
  "GSTR-3B (Last 12 Months)",
  "Bank Statements (Last 12 Months)",
  "Audited Financials",
  "Provisional Financials",
  "Existing Debt Sheet",
  "Business Profile",
  "Incorporation Document",
];
const optional = ["Income Tax Returns", "GSTR-1", "MIS Reports", "Existing Loan Documents", "Other / Supporting"];

const REPORT = "/platform/client-assement/client-assement-report.pdf";

export default function ClientAssessmentPage() {
  const hasReport = fs.existsSync(path.join(process.cwd(), "public", REPORT));
  return (
    <>
      <AssessmentHero />

      <Band tone="white" id="checklist">
        <BandHeading
          eyebrow="The checklist"
          title="Nine documents. One clear picture."
          text="Upload what you have, add optional documents and any instructions, then run the assessment."
        />
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-accent-dark">Mandatory</p>
            <RevealGroup className="mt-4 grid gap-3 sm:grid-cols-2">
              {mandatory.map((m, i) => (
                <RevealItem key={m}>
                  <div className="flex items-center gap-3 rounded-xl border border-dashed border-brand-line bg-brand-paper px-4 py-3 text-sm font-medium text-brand-ink transition hover:border-brand-accent hover:bg-white">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white font-mono text-[11px] text-brand-slate">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {m}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal variant="right">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-slate">Optional</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {optional.map((o) => (
                <li key={o} className="chip">{o}</li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
              <p className="font-heading text-base font-semibold text-brand-ink">Add your own instructions</p>
              <p className="mt-1 text-sm text-brand-slate">
                Tell the assessment what to focus on, for example an unsecured working capital request or banking behaviour.
              </p>
            </div>
            <p className="mt-6 text-sm font-semibold text-brand-ink">
              Two tabs: <span className="text-brand-accent-dark">Eligibility Test</span> and Previous Reports.
            </p>
          </Reveal>
        </div>
      </Band>

      <Band tone="white" id="report">
        <BandHeading
          eyebrow="The report"
          title="Read the assessment, page by page."
          text="Scroll through a full assessment report: score, ratios, risk scorecard and next steps."
        />
        {hasReport ? (
          <div className="mx-auto max-w-4xl">
            <ReportViewer
              src={REPORT}
              title="Credit Feasibility Assessment"
              subtitle="Sample report"
              filename="credit-feasibility-assessment.pdf"
              height={640}
            />
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col items-center rounded-3xl border border-dashed border-brand-line bg-brand-paper px-6 py-14 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent-soft text-brand-accent-dark">
              <FileText className="h-6 w-6" />
            </span>
            <p className="mt-4 font-heading text-xl font-semibold text-brand-ink">Sample report coming soon</p>
            <p className="mt-1 max-w-md text-sm text-brand-slate">
              A full sample assessment report will be shown here.
            </p>
            {process.env.NODE_ENV === "development" && (
              <p className="mt-4 rounded-lg bg-white px-3 py-2 font-mono text-[11px] text-brand-slate">
                Development note: add the PDF at public{REPORT}
              </p>
            )}
          </div>
        )}
      </Band>


      <ClosingCta
        title="Check your readiness first."
        text="Run an assessment, then apply with the right documents."
      />
    </>
  );
}
