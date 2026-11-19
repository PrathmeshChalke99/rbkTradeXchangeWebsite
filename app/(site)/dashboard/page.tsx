import { AssessIcon, BankIcon, DocIcon, DocStackIcon, GlobeIcon, LcIcon, NetworkIcon, PortalIcon, ReceiptIcon, ShipIcon, WalletIcon } from "@/components/platform/icons";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Banknote,
  Building2,
  Globe2,
  Landmark,
  Network,
  FileText,
  Ship,
  Wallet,
} from "lucide-react";
import { DashboardHero } from "@/components/platform/heroes-core";
import { StickyStory } from "@/components/platform/story";
import { BrowserFrame, Img } from "@/components/platform/frames";
import {
  Band,
  BandHeading,
  CapabilityRows,
  ClosingCta,
  SplitRow,
} from "@/components/platform/blocks";
import { shots, LOGIN_URL, SIGNUP_URL } from "@/lib/platform-assets";

export const metadata: Metadata = {
  title: "Dashboard | RBK TradeXchange",
  description:
    "See the real RBK TradeXchange dashboard: network, finance applications, bank accounts and documents on one screen.",
};

export default function DashboardPage() {
  return (
    <>
      <DashboardHero />

      <Band tone="white">
        <BandHeading
          eyebrow="Inside the dashboard"
          title="Scroll through the real thing."
          text="Every screen on this page is captured from the live platform."
        />
        <StickyStory
          url="dashboard.rbktradexchange.com"
          steps={[
            {
              id: "network",
              label: "Network",
              title: "Your network, counted.",
              text: "Buyers, suppliers and logistics partners summarised the moment you log in.",
              shot: shots.dashboard,
              focus: 0,
              points: ["Total network", "Buyers", "Suppliers", "Logistics partners"],
            },
            {
              id: "applications",
              label: "Applications",
              title: "Every finance application, tracked.",
              text: "Application type, applicant, documents and status in one table.",
              shot: shots.dashboard,
              focus: 30,
              points: ["In review, approved or rejected", "Documents attached to each application"],
            },
            {
              id: "accounts",
              label: "Accounts & documents",
              title: "Bank accounts and shared files.",
              text: "Linked bank accounts in view. Shared documents stay in your own Google Drive.",
              shot: shots.dashboard,
              focus: 100,
              points: ["Linked bank accounts", "Files stored in your Google Drive"],
            },
          ]}
        />
      </Band>

      <Band tone="paper">
        <BandHeading
          eyebrow="One menu"
          title="Everything is one click away."
          text="The dashboard sidebar brings the whole ecosystem together."
        />
        <CapabilityRows
          cols={3}
          items={[
            { icon: BankIcon, title: "Apply for Business Finance" },
            { icon: WalletIcon, title: "RBK Pay" },
            { icon: GlobeIcon, title: "Exim World" },
            { icon: NetworkIcon, title: "Network Management" },
            { icon: ShipIcon, title: "Trade Finance" },
            { icon: DocIcon, title: "E-Docs" },
          ]}
        />
      </Band>

      <Band tone="white" id="start">
        <BandHeading
          eyebrow="Get in"
          title="Sign in with a password or an OTP."
          text="New here? Registering your business takes three short steps."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <BrowserFrame url="dashboard.rbktradexchange.com/auth/login">
              <Img shot={shots.login} />
            </BrowserFrame>
            <p className="mt-4 text-sm font-semibold text-brand-ink">Sign in</p>
            <p className="text-sm text-brand-slate">Password login or OTP login.</p>
          </div>
          <div>
            <BrowserFrame url="dashboard.rbktradexchange.com/auth/sign-up">
              <Img shot={shots.signup} />
            </BrowserFrame>
            <p className="mt-4 text-sm font-semibold text-brand-ink">Sign up</p>
            <p className="text-sm text-brand-slate">Business, user details, security.</p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={LOGIN_URL} className="btn-primary btn-lg">
            Log in
          </Link>
          <Link href={SIGNUP_URL} className="btn-secondary btn-lg">
            Create an account
          </Link>
        </div>
      </Band>

      <ClosingCta
        title="See it with your own trades."
        text="Create your account and bring your first trade into the dashboard."
      />
    </>
  );
}
