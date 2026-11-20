"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, FileSignature, Receipt, ShoppingCart } from "lucide-react";
import { shots } from "@/lib/platform-assets";
import { BrowserFrame, FloatTag, PanShot, Img } from "./frames";
import { HeroCopy, heroPad } from "./hero-copy";
import { DocFan } from "@/components/documents/doc-heroes";
import { cn } from "@/lib/utils";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function MiniDoc({
  icon: I,
  name,
  d,
  className,
}: {
  icon: typeof FileText;
  name: string;
  d: number;
  className?: string;
}) {
  return (
    <div
      style={delay(d)}
      className={cn(
        "step-on w-44 rounded-xl border border-white/15 bg-white p-3 text-brand-ink shadow-lift",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-accent-soft text-brand-accent-dark">
          <I className="h-4 w-4" />
        </span>
        <span className="text-xs font-semibold">{name}</span>
      </div>
      <div className="mt-3 space-y-1.5" aria-hidden>
        <i className="block h-1.5 w-full rounded bg-brand-line" />
        <i className="block h-1.5 w-4/5 rounded bg-brand-line" />
        <i className="block h-1.5 w-3/5 rounded bg-brand-line" />
      </div>
    </div>
  );
}

export function TradeAIHero() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b2e] text-white">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 50% at 85% 15%, rgba(76,95,213,0.5), transparent 70%), radial-gradient(40% 45% at 10% 95%, rgba(250,127,99,0.2), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="dot-grid-light absolute inset-0 opacity-30" aria-hidden />
      <div
        className={cn(
          "relative mx-auto grid grid-cols-1 max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8",
          heroPad,
        )}
      >
        <HeroCopy
          dark
          eyebrow="TradeAI"
          title={
            <>
              Upload a purchase order.{" "}
              <span className="gradient-text-light">Get your documents.</span>
            </>
          }
          text="Your AI-powered trade documentation and risk analysis assistant. It generates documents and flags mismatches before they cost you."
          primary={{ label: "See how it works", href: "#how" }}
          secondary={{ label: "Request a demo", href: "/contact" }}
        />

        <div className="relative mx-auto w-full max-w-xl">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="relative">
              <MiniDoc icon={ShoppingCart} name="Purchase order" d={0} />
              <span className="absolute -top-3 left-3 rounded-full bg-[#FA7F63] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#022350]">
                UPLOAD
              </span>
            </div>
            <svg
              viewBox="0 0 120 20"
              className="hidden h-5 w-28 sm:block"
              aria-hidden
            >
              <path
                d="M0 10 L 110 10"
                className="flow-dash"
                fill="none"
                stroke="#FDB9A8"
                strokeWidth="2.5"
              />
              <path
                d="M104 4 L 116 10 L 104 16"
                fill="none"
                stroke="#FDB9A8"
                strokeWidth="2.5"
              />
            </svg>
            <div className="grid gap-2.5">
              <MiniDoc
                icon={FileText}
                name="Proforma invoice"
                d={1.5}
                className="w-48"
              />
              <MiniDoc
                icon={FileSignature}
                name="Sales contract"
                d={3}
                className="w-48"
              />
              <MiniDoc
                icon={Receipt}
                name="Commercial invoice"
                d={4.5}
                className="w-48"
              />
            </div>
          </div>
          <div className="relative mt-8">
            <BrowserFrame dark url="dashboard.rbktradexchange.com">
              <PanShot
                shot={shots.tradeFlow}
                aspect={2.2}
                start={25}
                duration={26}
              />
            </BrowserFrame>
            <FloatTag tone="red" className="-right-2 -top-3" delay={0.8}>
              LC draft: 9 mismatches found
            </FloatTag>
          </div>
        </div>
      </div>
    </section>
  );
}

const lcFlags: { t: string; cls: string; d: number }[] = [
  { t: "Currency differs", cls: "left-[4%] top-[8%]", d: 0.5 },
  { t: "Incoterm mismatch", cls: "right-[2%] top-[26%]", d: 2 },
  { t: "Port of discharge", cls: "left-[6%] bottom-[22%]", d: 3.5 },
  { t: "LC has expired", cls: "right-[6%] bottom-[8%]", d: 5 },
];

export function LCHero() {
  return (
    <section className="relative overflow-hidden bg-[#fff6f6]">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div
        className="aurora-blob right-0 top-0 h-96 w-96 bg-rose-300/25"
        aria-hidden
      />
      <div
        className={cn(
          "relative mx-auto grid grid-cols-1 max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8",
          heroPad,
        )}
      >
        <div className="order-2 lg:order-1">
          <div className="relative">
            <BrowserFrame url="dashboard.rbktradexchange.com">
              <div className="relative">
                <Img shot={shots.lc} priority />
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  aria-hidden
                >
                  <span className="scan-line" />
                </div>
              </div>
            </BrowserFrame>
            {lcFlags.map((f) => (
              <span
                key={f.t}
                style={delay(f.d)}
                className={cn(
                  "pop-in absolute z-10 hidden items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-rose-700 shadow-lift sm:inline-flex",
                  f.cls,
                )}
              >
                <i className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                {f.t}
              </span>
            ))}
          </div>
        </div>
        <HeroCopy
          className="order-1 lg:order-2"
          eyebrow="LC Discrepancy Analysis"
          title={
            <>
              Catch LC discrepancies{" "}
              <span className="gradient-text">before the bank does.</span>
            </>
          }
          text="Upload your LC document set. TradeAI checks it against UCP 600 and ISBP 821 and flags what does not match."
          primary={{ label: "How it works", href: "#how" }}
          secondary={{ label: "Request a demo", href: "/contact" }}
        />
      </div>
    </section>
  );
}

const assessDocs = [
  "Commercial CIBIL report",
  "Individual CIBIL reports",
  "GSTR-3B (last 12 months)",
  "Bank statements",
  "Audited financials",
  "Provisional financials",
  "Existing debt sheet",
  "Business profile",
  "Incorporation document",
];

export function AssessmentHero() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setN((v) => (v >= assessDocs.length ? 0 : v + 1)),
      900,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#06382f] via-[#0b5d52] to-[#0f9a8a] text-white">
      <div className="dot-grid-light absolute inset-0 opacity-30" aria-hidden />
      <div
        className={cn(
          "relative mx-auto grid grid-cols-1 max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8",
          heroPad,
        )}
      >
        <HeroCopy
          dark
          eyebrow="Client Assessment"
          title={
            <>
              Know where you stand{" "}
              <span className="gradient-text-light">before you apply.</span>
            </>
          }
          text="Upload your KYC and financial documents and run an eligibility assessment. It is a readiness check, not a lending decision."
          primary={{ label: "See the checklist", href: "#checklist" }}
          secondary={{ label: "Talk to our team", href: "/contact" }}
        />
        <div className="relative">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-3 backdrop-blur">
            <BrowserFrame dark url="dashboard.rbktradexchange.com">
              <Img shot={shots.assessment} priority />
            </BrowserFrame>
          </div>
          <div className="absolute -bottom-6 left-4 right-4 rounded-2xl bg-white p-4 text-brand-ink shadow-lift sm:left-auto sm:w-72">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Mandatory documents</span>
              <span className="font-mono text-emerald-600">
                {n}/{assessDocs.length}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-brand-line">
              <motion.div
                className="h-full rounded-full bg-emerald-500"
                animate={{ width: `${(n / assessDocs.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="mt-2 h-4 truncate text-[11px] text-brand-slate">
              {n > 0 ? `✓ ${assessDocs[n - 1]}` : "Waiting for uploads"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export type DocTile = {
  slug: string;
  name: string;
  label: string;
  color: string;
  bg: string;
  accent?: string;
};

export function DocMgmtHero({ docs }: { docs: DocTile[] }) {
  return (
    <section className="relative overflow-hidden bg-brand-paper">
      <div
        className="grid-lines-light absolute inset-0 opacity-60"
        aria-hidden
      />
      <div
        className="aurora-blob -left-24 bottom-0 h-96 w-96 bg-brand-sky/20"
        aria-hidden
      />
      <div
        className={cn(
          "relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8",
          heroPad,
        )}
      >
        <HeroCopy
          eyebrow="Document Management"
          title={
            <>
              All your business documents.{" "}
              <span className="gradient-text">Organised in one place.</span>
            </>
          }
          text="Create, organise, store and share contracts, invoices and trade documents. Open any format to see it live."
          primary={{ label: "Open a document format", href: "#formats" }}
          secondary={{ label: "What you can do", href: "#capabilities" }}
        />
        <DocFan
          docs={docs.map((d) => ({
            slug: d.slug,
            name: d.name,
            label: d.label,
            accent: d.accent ?? d.color,
          }))}
        />
      </div>
    </section>
  );
}
