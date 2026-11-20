import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { flow, getArticle } from "@/lib/content";
import { tradeWorkflowSteps } from "@/lib/site-config";
import { shots } from "@/lib/platform-assets";
import { HowHero } from "@/components/finance/how-hero";
import { PinnedJourney } from "@/components/platform/pinned-journey";
import { ShotCard, StepCard } from "@/components/platform/journey-cards";
import { Band, BandHeading, ClosingCta } from "@/components/platform/blocks";
import { Spot } from "@/components/platform/spot";
import { GlossIcon } from "@/components/platform/gloss-icon";
import { DocStackIcon, QuoteIcon } from "@/components/platform/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/pages/reveal";

export const metadata: Metadata = {
  title: "How It Works | RBK TradeXchange",
  description:
    "From sign-up to lender quotation: how RBK TradeXchange takes you through trade documents, finance applications and e-docs.",
};

const steps = tradeWorkflowSteps;

export default function HowItWorks() {
  const readiness = getArticle("export-finance-readiness-checklist");
  const total = steps.length;

  const nodes = [
    <ShotCard key="1" shot={shots.signup} aspect={1310 / 671} n={1} total={total} title={steps[0].title} text={steps[0].description} />,
    <ShotCard key="2" shot={shots.tradeFlow} focus={12} aspect={1.3} n={2} total={total} title={steps[1].title} text={steps[1].description} />,
    <ShotCard key="3" shot={shots.dashboard} focus={30} aspect={1.5} n={3} total={total} title={steps[2].title} text={steps[2].description} />,
    <StepCard
      key="4"
      icon={QuoteIcon}
      tint="#e8684a"
      n={4}
      total={total}
      title={steps[3].title}
      text={steps[3].description}
      points={["Quotations arrive in your dashboard", "Accept or decline, with no obligation", "Track every application's status"]}
    />,
    <StepCard
      key="5"
      icon={DocStackIcon}
      tint="#2f8fd0"
      n={5}
      total={total}
      title={steps[4].title}
      text={steps[4].description}
      points={["Proforma invoice and contracts", "Purchase order and packing list", "Live preview on your own format"]}
      href="/documents"
      hrefLabel="Open E-Docs"
    />,
  ];

  return (
    <>
      <HowHero steps={steps.map((s) => ({ title: s.title, text: s.description }))} />

      <PinnedJourney
        label="How it works"
        eyebrow="The workflow"
        heading={
          <>
            Five steps inside the <span className="gradient-text">portal</span>
          </>
        }
        bgWord="HOW IT WORKS"
        items={steps.map((s, i) => ({ id: s.id, label: s.title, node: nodes[i] }))}
      />

      {readiness && (
        <Band tone="paper">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div>
              <BandHeading
                eyebrow="Before you start"
                title="Have these ready for a smoother application"
                text="Lenders review faster when your business and trade papers are complete and consistent."
              />
              <Link href={`/resources/${readiness.slug}`} className="link-arrow">
                Read the full checklist <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <RevealGroup className="grid gap-4 sm:grid-cols-2">
              {readiness.sections.map((s, i) => (
                <RevealItem key={s.h} className="h-full">
                  <Spot>
                    <div className="relative p-5">
                      <span
                        aria-hidden
                        className="pointer-events-none absolute bottom-1 right-3 font-heading text-5xl font-bold leading-none text-brand-ink/[0.05]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <GlossIcon icon={DocStackIcon} tint={["#1d5fd6", "#0f9a8a", "#e8684a", "#0a3a7a"][i % 4]} size="md" />
                      <h3 className="relative mt-3 font-heading text-[15px] font-semibold text-brand-ink">{s.h}</h3>
                      <p className="relative mt-1.5 text-sm leading-relaxed text-brand-slate">{s.p}</p>
                    </div>
                  </Spot>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Band>
      )}

      <Band tone="white">
        <BandHeading
          eyebrow="Find your way"
          title="Where each stage lives on this site"
          text="Every stage of the journey has pages you can explore before signing up."
        />
        <ol className="relative mx-auto max-w-3xl space-y-4">
          <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-[#022350] via-brand-sky to-[#FA7F63]" />
          {flow.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.05}>
              <li className="relative flex list-none gap-5">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#022350] font-mono text-xs font-semibold text-white shadow-soft">
                  {f.id}
                </span>
                <div className="flex-1">
                  <Spot>
                    <div className="p-5">
                      <h3 className="font-heading text-[17px] font-semibold text-brand-ink">{f.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-brand-slate">{f.body}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {f.links.map(([l, h]) => (
                          <Link
                            key={h}
                            href={h}
                            className="inline-flex items-center gap-1 rounded-md bg-brand-accent-soft px-2.5 py-1 text-xs font-semibold text-brand-accent-dark transition hover:bg-[#FA7F63]/25"
                          >
                            {l}
                            <ArrowUpRight className="h-3 w-3" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </Spot>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Band>

      <ClosingCta
        title="Start with your first trade."
        text="Create your account and follow the five steps, or talk to our team for a walkthrough."
      />
    </>
  );
}
