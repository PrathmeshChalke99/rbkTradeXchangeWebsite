import type { Metadata } from "next";
import { NetworkHero } from "@/components/platform/heroes-eco";
import { AudienceTabs } from "@/components/platform/audience-tabs";
import { StickyStory } from "@/components/platform/story";
import { Band, BandHeading, ClosingCta } from "@/components/platform/blocks";
import { shots } from "@/lib/platform-assets";

export const metadata: Metadata = {
  title: "Business Network | RBK TradeXchange",
  description:
    "Connect with buyers, suppliers, manufacturers and business partners. Manage your trade relationships on RBK TradeXchange.",
};

export default function BusinessNetworkPage() {
  return (
    <>
      <NetworkHero />

      <Band tone="white" id="audiences">
        <BandHeading
          eyebrow="One network"
          title="Multiple business opportunities."
          text="RBK TradeXchange is evolving into a connected network for the whole trade ecosystem."
        />
        <AudienceTabs />
      </Band>

      <Band tone="paper">
        <BandHeading
          eyebrow="Network management"
          title="Your relationships, organised."
          text="Real screens from the platform."
        />
        <StickyStory
          url="dashboard.rbktradexchange.com"
          steps={[
            {
              label: "Buyers",
              title: "Manage domestic and international buyers.",
              text: "See totals, search the network and add a new buyer in one place.",
              shot: shots.buyers,
              aspect: 1310 / 980,
              focus: 0,
              points: ["Domestic and international split", "Status per buyer", "Add a new buyer"],
            },
            {
              label: "Suppliers",
              title: "Keep every supplier in view.",
              text: "Contact person, company, entity type and registration details per supplier.",
              shot: shots.suppliers,
              aspect: 1310 / 880,
              focus: 0,
              points: ["Domestic or international", "Contact details", "Add a new supplier"],
            },
            {
              label: "Logistics partners",
              title: "Transporters on the same network.",
              text: "Domestic and international logistics partners alongside buyers and suppliers.",
              shot: shots.logistics,
              aspect: 1310 / 808,
              focus: 0,
              points: ["Domestic transporters", "International transporters", "Add a new partner"],
            },
          ]}
        />
      </Band>

      <ClosingCta
        title="Grow your network, grow your business."
        text="Create your account and start adding your partners."
      />
    </>
  );
}
