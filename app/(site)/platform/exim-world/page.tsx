import { NetworkIcon, ShipIcon, WalletIcon } from "@/components/platform/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Network, Ship, Wallet } from "lucide-react";
import { EximHero } from "@/components/platform/heroes-eco";
import { Band, BandHeading, ClosingCta } from "@/components/platform/blocks";
import { GlossIcon } from "@/components/platform/gloss-icon";
import { RevealGroup, RevealItem } from "@/components/pages/reveal";

export const metadata: Metadata = {
  title: "Exim World Advisory | RBK TradeXchange",
  description:
    "Exim World Advisory is part of the RBK TradeXchange business ecosystem for importers and exporters.",
};

const links = [
  { href: "/platform/business-network", label: "Business Network", text: "Buyers, suppliers and partners.", icon: NetworkIcon, tint: "#2f8fd0" },
  { href: "/platform/rbk-pay", label: "RBK Pay", text: "International payment collection.", icon: WalletIcon, tint: "#e8684a" },
  { href: "/trade-management", label: "Trade Portal", text: "Your trades, step by step.", icon: ShipIcon, tint: "#1d5fd6" },
];

export default function EximWorldPage() {
  return (
    <>
      <EximHero />

      <Band tone="white">
        <BandHeading
          eyebrow="The ecosystem"
          title="One of several ways we support your trade."
          text="Speak to our team to learn how Exim World Advisory can help your business."
        />
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {links.map((l) => (
            <RevealItem key={l.href}>
              <Link
                href={l.href}
                className="group flex h-full flex-col rounded-2xl border border-brand-line bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-accent hover:shadow-lift"
              >
                <GlossIcon icon={l.icon} tint={l.tint} size="lg" />
                <span className="mt-5 font-heading text-lg font-semibold text-brand-ink">{l.label}</span>
                <span className="mt-1 text-sm text-brand-slate">{l.text}</span>
                <span className="link-arrow mt-5">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Band>

      <ClosingCta
        title="Talk to our advisory team."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "Platform overview", href: "/platform" }}
      />
    </>
  );
}
