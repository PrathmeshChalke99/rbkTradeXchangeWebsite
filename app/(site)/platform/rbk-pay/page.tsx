import { BankIcon, BankNoteIcon, CoinIcon, GlobeIcon, ReceiptIcon, SyncIcon } from "@/components/platform/icons";
import type { Metadata } from "next";
import {
  Banknote,
  Coins,
  Globe2,
  Landmark,
  ReceiptText,
  Workflow,
} from "lucide-react";
import { PayHero } from "@/components/platform/heroes-eco";
import {
  Band,
  BandHeading,
  CapabilityRows,
  ClosingCta,
} from "@/components/platform/blocks";
import { Reveal } from "@/components/pages/reveal";

export const metadata: Metadata = {
  title: "RBK Pay | International Payments in India | RBK TradeXchange",
  description:
    "Receive international payments in India. Cross-border collection, multicurrency accounts, competitive FX and transparent charges for exporters.",
};

export default function RbkPayPage() {
  return (
    <>
      <PayHero />

      <Band tone="white" id="benefits">
        <BandHeading
          eyebrow="Key benefits"
          title="Simpler cross-border collections."
          text="For Indian exporters, receiving international payments efficiently is part of successful global trade."
        />
        <CapabilityRows
          cols={2}
          items={[
            { icon: GlobeIcon, title: "International payment collection" },
            { icon: CoinIcon, title: "Multicurrency account capabilities" },
            { icon: BankNoteIcon, title: "Competitive foreign exchange rates" },
            { icon: ReceiptIcon, title: "Transparent banking and FX charges" },
            { icon: BankIcon, title: "Streamlined inward remittance" },
            { icon: SyncIcon, title: "Support for cross-border transactions" },
          ]}
        />
      </Band>

      <Band tone="night">
        <Reveal variant="zoom">
          <p className="mx-auto max-w-4xl text-center font-heading text-3xl font-semibold leading-tight sm:text-5xl">
            Trade globally.{" "}
            <span className="gradient-text-light">Collect internationally.</span>{" "}
            Manage payments smarter.
          </p>
        </Reveal>
      </Band>

      <ClosingCta
        title="Connect payments to your trade."
        text="RBK Pay sits inside your dashboard, next to your trades and documents."
        primary={{ label: "Talk to our team", href: "/contact" }}
        secondary={{ label: "See the dashboard", href: "/dashboard" }}
      />
    </>
  );
}
