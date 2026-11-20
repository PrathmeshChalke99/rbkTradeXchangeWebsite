/**
 * Real RBK TradeXchange platform captures (personal data blurred).
 * Files live in /public/platform. To swap or add a screenshot, drop the file in the
 * matching folder and update the entry here: every page reads from this one place.
 */
export type Shot = {
  src: string;
  w: number;
  h: number;
  alt: string;

  crop?: [number, number];
};

export const shots = {
  dashboard: {
    src: "/platform/dashboard/full-dashboard-overview.png",
    w: 1310,
    h: 2152,
    alt: "RBK TradeXchange dashboard: network summary, limit applications and documents, bank accounts and shared documents",
  },
  trade: {
    src: "/platform/tradeai/tradeai-overview.png",
    w: 1310,
    h: 4275,
    alt: "Trade Management: a 21-step export trade with purchase order, proforma invoice, sales contract and LC draft checks",
  },

  tradeFlow: {
    src: "/platform/tradeai/tradeai-overview.png",
    w: 1310,
    h: 4275,
    crop: [0.385, 0.985],
    alt: "Trade Portal: a 21-step export trade with purchase order, proforma invoice, sales contract and LC draft checks",
  },
  lc: {
    src: "/platform/lc-discrepancies/lc-discrepancies.png",
    w: 1310,
    h: 731,
    alt: "LC Discrepancy AI Bot with mandatory and optional LC document checklist",
  },
  assessment: {
    src: "/platform/client-assement/client-assement.png",
    w: 1310,
    h: 860,
    alt: "Client Assessment: eligibility test with a nine-document checklist",
  },
  buyers: {
    src: "/platform/network/network-management-buyer-section.png",
    w: 1310,
    h: 1247,
    alt: "Buyer Management: domestic and international buyer network",
  },
  suppliers: {
    src: "/platform/network/network-management-supplier-section.png",
    w: 1310,
    h: 944,
    alt: "Supplier Management: domestic and international supplier network",
  },
  logistics: {
    src: "/platform/network/network-management-logistic-partner-section.png",
    w: 1310,
    h: 808,
    alt: "Logistic Partners Management: domestic and international transporters",
  },
  login: {
    src: "/platform/auth/auth-login-01.png",
    w: 1310,
    h: 671,
    alt: "RBK TradeXchange sign-in with password and OTP login",
  },
  signup: {
    src: "/platform/auth/auth-signup-01.png",
    w: 1310,
    h: 671,
    alt: "RBK TradeXchange three-step business sign-up",
  },
} satisfies Record<string, Shot>;

export const videos: Record<string, string> = {};

export const LOGIN_URL = "https://dashboard.rbktradexchange.com/auth/login";
export const SIGNUP_URL = "https://dashboard.rbktradexchange.com/auth/sign-up";
