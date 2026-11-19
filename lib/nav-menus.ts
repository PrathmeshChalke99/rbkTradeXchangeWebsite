import {
  AssessIcon,
  BankNoteIcon,
  ChartIcon,
  DashboardIcon,
  DocIcon,
  DocStackIcon,
  GlobeIcon,
  LcIcon,
  NetworkIcon,
  PortalIcon,
  QuoteIcon,
  ScanDocIcon,
  ShieldIcon,
  SparkleIcon,
  UserCheckIcon,
  WalletIcon,
} from "@/components/platform/icons";
import { shots, LOGIN_URL } from "./platform-assets";
import type { AnyIcon } from "@/components/platform/icons";

export type MenuCard = {
  label: string;
  href: string;
  text: string;
  icon: AnyIcon;
  /** Accent colour of the icon tile. */
  tint: string;
};

export type MenuDef = {
  title: string;
  subtitle: string;
  /** Showcase visual in the intro column (real platform screenshot). */
  image: string;
  pos: string;
  /** Zoom (origin top-right) so app chrome like the sidebar falls outside the crop. */
  zoom?: number;
  cta: { href: string; label: string; text: string };
  cards: MenuCard[];
  stripLabel: string;
  /** Extra links shown only in the scrolling strip (keeps older pages reachable). */
  extra: { label: string; href: string; icon: AnyIcon }[];
};

export const platformMenu: MenuDef = {
  title: "Business Ecosystem",
  subtitle: "One platform for trade, network and payments",
  image: shots.dashboard.src,
  pos: "top",
  cta: {
    href: "/platform",
    label: "Platform overview",
    text: "See the technology behind every trade.",
  },
  stripLabel: "Platform modules",
  cards: [
    {
      label: "Dashboard overview",
      href: "/dashboard",
      text: "Everything at a glance.",
      icon: DashboardIcon,
      tint: "#1d5fd6",
    },
    {
      label: "Business Network",
      href: "/platform/business-network",
      text: "Buyers, suppliers and logistics partners.",
      icon: NetworkIcon,
      tint: "#1d5fd6",
    },
    {
      label: "RBK Pay",
      href: "/platform/rbk-pay",
      text: "International payment collection in India.",
      icon: WalletIcon,
      tint: "#2f8fd0",
    },
    {
      label: "Exim World Advisory",
      href: "/platform/exim-world",
      text: "Advisory for your trade journey.",
      icon: GlobeIcon,
      tint: "#e8684a",
    },
    // { label: "Lender Quotations", href: "/platform/lender-quotations", text: "Compare and track quotations.", icon: QuoteIcon, tint: "#e8684a" },
    // { label: "Responsible AI", href: "/platform/responsible-ai", text: "AI that assists, people decide.", icon: ShieldIcon, tint: "#0f9a8a" },
  ],
  extra: [{ label: "How it works", href: "/how-it-works", icon: SparkleIcon }],
};

export const tradeMenu: MenuDef = {
  title: "Trade Portal",
  subtitle: "Manage your entire trade journey on one platform",
  image: shots.trade.src,
  pos: "100% 0%",
  zoom: 1.7,
  cta: {
    href: "/trade-management",
    label: "Explore the portal",
    text: "Orders, documents and payments in one place.",
  },
  stripLabel: "Trade tools",
  cards: [
    {
      label: "Trade Portal",
      href: "/trade-management",
      text: "Every trade, step by step.",
      icon: PortalIcon,
      tint: "#1d5fd6",
    },
    {
      label: "TradeAI",
      href: "/trade-management/tradeai",
      text: "AI documentation and risk analysis.",
      icon: SparkleIcon,
      tint: "#0a3a7a",
    },
    {
      label: "Document Management",
      href: "/trade-management/document-management",
      text: "Create, store and share documents.",
      icon: DocStackIcon,
      tint: "#2f8fd0",
    },
    {
      label: "LC Discrepancy Analysis",
      href: "/trade-management/lc-discrepancy",
      text: "UCP 600 / ISBP 821 checks.",
      icon: LcIcon,
      tint: "#e8684a",
    },
    {
      label: "Client Assessment",
      href: "/trade-management/client-assessment",
      text: "Eligibility test before you apply.",
      icon: AssessIcon,
      tint: "#0f9a8a",
    },
  ],
  extra: [{ label: "E-Docs Studio", href: "/documents", icon: DocIcon }],
};

export const dashboardMenu: MenuDef = {
  title: "Dashboard",
  subtitle: "The real platform, one screen",
  image: shots.dashboard.src,
  pos: "top",
  cta: {
    href: LOGIN_URL,
    label: "Log in to dashboard",
    text: "Already registered? Pick up where you left off.",
  },
  stripLabel: "Inside the dashboard",
  cards: [
    {
      label: "Dashboard overview",
      href: "/dashboard",
      text: "Everything at a glance.",
      icon: DashboardIcon,
      tint: "#1d5fd6",
    },
    {
      label: "Network at a glance",
      href: "/dashboard#network",
      text: "Buyers, suppliers, partners.",
      icon: NetworkIcon,
      tint: "#2f8fd0",
    },
    {
      label: "Applications & documents",
      href: "/dashboard#applications",
      text: "Track every finance application.",
      icon: ChartIcon,
      tint: "#e8684a",
    },
    {
      label: "Bank accounts",
      href: "/dashboard#accounts",
      text: "Linked accounts in view.",
      icon: BankNoteIcon,
      tint: "#0f9a8a",
    },
    {
      label: "Sign in or sign up",
      href: "/dashboard#start",
      text: "Password or OTP, three-step sign-up.",
      icon: UserCheckIcon,
      tint: "#0a3a7a",
    },
  ],
  extra: [],
};

export const menuDefs = {
  platform: platformMenu,
  trade: tradeMenu,
  dashboard: dashboardMenu,
} as const;
