import type { Metadata } from "next";
import { Info } from "lucide-react";
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

export default function ClientAssessmentPage() {
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

      <Band tone="paper">
        <p className="mx-auto flex max-w-3xl gap-3 rounded-xl border border-brand-line bg-white p-4 text-xs leading-relaxed text-brand-slate">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden />
          The assessment estimates readiness. It does not approve or reject a loan. Participating lenders make their own decisions.
        </p>
      </Band>

      <ClosingCta
        title="Check your readiness first."
        text="Run an assessment, then apply with the right documents."
      />
    </>
  );
}
