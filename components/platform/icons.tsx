/**
 * RBK TradeXchange icon set: bold, rounded line pictograms drawn on a 64x64 grid.
 * One colour (the current text colour), thick uniform strokes and small compound scenes
 * (document + coin, ship + container, shield + tick), so they read as real objects.
 *
 * PNG override: drop a PNG named after the icon key into /public/icons (for example
 * /public/icons/globe.png) and run `npm run icons`. That file then replaces the SVG everywhere
 * the icon is used. The keys are the first argument of each `icon("...")` call below.
 */
import type { ComponentType, ReactNode } from "react";
import manifest from "@/lib/icon-manifest.json";
import { cn } from "@/lib/utils";

export type AnyIcon = ComponentType<{
  className?: string;
  strokeWidth?: number | string;
}>;

const files = new Set<string>(manifest.files);

function Svg({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      focusable="false"
    >
      {children}
    </svg>
  );
}

function icon(key: string, draw: ReactNode): AnyIcon {
  const Comp = ({ className }: { className?: string }) =>
    files.has(key) ? (
      <img
        src={`/icons/${key}.png`}
        alt=""
        aria-hidden
        loading="lazy"
        className={cn("object-contain", className)}
      />
    ) : (
      <Svg className={className}>{draw}</Svg>
    );
  Comp.displayName = `Icon(${key})`;
  return Comp;
}

const DOC =
  "M14 6h24l12 12v36a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z";
const dot = { fill: "currentColor", stroke: "none" } as const;

export const GlobeIcon = icon(
  "globe",
  <>
    <circle cx="30" cy="30" r="20" />
    <ellipse cx="30" cy="30" rx="8.5" ry="20" />
    <path d="M10 30h40M13 19h34M13 41h34" />
    <path d="M10 52c11 8 32 6 44-8" />
    <path d="M45 43l9 1-3-9" />
  </>,
);

export const TruckIcon = icon(
  "truck",
  <>
    <rect x="5" y="14" width="31" height="28" rx="3" />
    <path d="M36 24h11l11 12v6H36" />
    <path d="M13 24h14M13 32h9" />
    <circle cx="17" cy="47" r="5.5" />
    <circle cx="47" cy="47" r="5.5" />
  </>,
);

export const BankIcon = icon(
  "bank",
  <>
    <path d="M32 6 6 20h52z" />
    <path d="M14 27v19M26 27v19M38 27v19M50 27v19" />
    <path d="M8 52h48M4 58h56" />
    <circle cx="32" cy="14" r="2.2" {...dot} />
  </>,
);

export const PortalIcon = icon(
  "portal",
  <>
    <rect x="5" y="9" width="54" height="46" rx="5" />
    <path d="M5 21h54" />
    <circle cx="12" cy="15" r="1.6" {...dot} />
    <circle cx="18" cy="15" r="1.6" {...dot} />
    <path d="M16 46V38M26 46V30M36 46V35M46 46V28" strokeWidth={5} />
  </>,
);

export const SparkleIcon = icon(
  "sparkle",
  <>
    <path d="M26 8l5.5 14.5L46 28l-14.5 5.5L26 48l-5.5-14.5L6 28l14.5-5.5z" />
    <path d="M48 5l2.4 6.4L57 14l-6.6 2.6L48 23l-2.4-6.4L39 14l6.6-2.6z" />
    <path d="M46 40l1.8 4.6 4.7 1.8-4.7 1.8L46 52.8l-1.8-4.6-4.7-1.8 4.7-1.8z" />
  </>,
);

export const NetworkIcon = icon(
  "network",
  <>
    <path d="M17 19l10 8M47 19l-10 8M17 45l10-8M47 45l-10-8" />
    <circle cx="32" cy="32" r="6.5" />
    <circle cx="11" cy="13" r="6" />
    <circle cx="53" cy="13" r="6" />
    <circle cx="11" cy="51" r="6" />
    <circle cx="53" cy="51" r="6" />
  </>,
);

export const WalletIcon = icon(
  "wallet",
  <>
    <rect x="5" y="17" width="46" height="37" rx="6" />
    <path d="M11 17l31-10v10" />
    <rect x="35" y="29" width="24" height="15" rx="4" />
    <circle cx="44" cy="36.5" r="2.6" {...dot} />
  </>,
);

export const DocIcon = icon(
  "doc",
  <>
    <path d={DOC} />
    <path d="M38 6v12h12" />
    <circle cx="28" cy="31" r="8.5" />
    <path
      d="M28 25v12M31.5 28c-1-2-7-2-7 1.2 0 3.6 7.2 1.6 7.2 5.4 0 2.6-5 2.8-7.2.8"
      strokeWidth={2.6}
    />
    <path d="M18 49h14" />
  </>,
);

export const DocStackIcon = icon(
  "doc-stack",
  <>
    <path d="M22 8h22l12 12v28" />
    <path d="M10 16h22l12 12v26a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4z" />
    <path d="M32 16v12h12" />
    <path d="M14 40h22M14 48h14" />
  </>,
);

export const LcIcon = icon(
  "lc",
  <>
    <path d="M30 58H14a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4h24l12 12v8" />
    <path d="M38 6v12h12" />
    <path d="M18 28h16M18 37h8" />
    <circle cx="42" cy="43" r="11" />
    <path d="M50 51l9 9" strokeWidth={4.6} />
  </>,
);

export const AssessIcon = icon(
  "assess",
  <>
    <rect x="10" y="10" width="44" height="49" rx="5" />
    <path d="M24 10V6h16v4" />
    <path d="M18 27l4 4 8-9M18 43l4 4 8-9" />
    <path d="M36 28h12M36 44h12" />
  </>,
);

export const DashboardIcon = icon(
  "dashboard",
  <>
    <rect x="5" y="8" width="54" height="48" rx="5" />
    <path d="M5 21h54" />
    <circle cx="24" cy="39" r="10" />
    <path d="M24 39V29M24 39l8 5" />
    <path d="M42 50V39M51 50V31" strokeWidth={5} />
  </>,
);

export const QuoteIcon = icon(
  "quote",
  <>
    <path d={DOC} />
    <path d="M38 6v12h12" />
    <circle cx="23" cy="28" r="3.8" />
    <circle cx="37" cy="44" r="3.8" />
    <path d="M38 25 22 47" />
  </>,
);

export const ShieldIcon = icon(
  "shield",
  <>
    <path d="M32 5 54 13v16c0 14-9 24-22 30C19 53 10 43 10 29V13z" />
    <path d="M22 31l7 7 14-15" />
  </>,
);

export const ShipIcon = icon(
  "ship",
  <>
    <path d="M5 38h54l-8 14H13z" />
    <path d="M16 38V27h32v11" />
    <path d="M24 27V15h16v12" />
    <path d="M32 15V7" />
    <path d="M4 59c5-3 9-3 14 0s9 3 14 0 9-3 14 0 9 3 14 0" />
  </>,
);

export const FactoryIcon = icon(
  "factory",
  <>
    <path d="M6 57V29l16 10V29l16 10V15h20v42z" />
    <path d="M17 49h4M29 49h4M45 49h4M45 27h4" />
  </>,
);

export const StoreIcon = icon(
  "store",
  <>
    <path d="M9 24 13 8h38l4 16z" />
    <path d="M9 24c0 6 9 7 11.5 1 2.5 6 8.5 6 11.5 0 3 6 9 6 11.5 0C46 31 55 30 55 24" />
    <path d="M12 31v26h40V31" />
    <path d="M26 57V42h12v15" />
  </>,
);

export const ChipIcon = icon(
  "chip",
  <>
    <rect x="17" y="17" width="30" height="30" rx="5" />
    <rect x="26" y="26" width="12" height="12" rx="2" />
    <path d="M24 6v11M32 6v11M40 6v11M24 47v11M32 47v11M40 47v11M6 24h11M6 32h11M6 40h11M47 24h11M47 32h11M47 40h11" />
  </>,
);

export const BuildingIcon = icon(
  "building",
  <>
    <rect x="15" y="6" width="34" height="52" rx="3" />
    <path d="M24 17h4M36 17h4M24 27h4M36 27h4M24 37h4M36 37h4" />
    <path d="M27 58V48h10v10" />
  </>,
);

export const LayersIcon = icon(
  "layers",
  <>
    <path d="M32 6 58 20 32 34 6 20z" />
    <path d="M6 32l26 14 26-14" />
    <path d="M6 44l26 14 26-14" />
  </>,
);

export const BankNoteIcon = icon(
  "banknote",
  <>
    <rect x="4" y="14" width="56" height="36" rx="5" />
    <circle cx="32" cy="32" r="8.5" />
    <circle cx="14" cy="32" r="2" {...dot} />
    <circle cx="50" cy="32" r="2" {...dot} />
    <path d="M14 21h4M46 43h4" />
  </>,
);

export const ChartIcon = icon(
  "chart",
  <>
    <path d="M8 6v52h52" />
    <rect x="16" y="36" width="8" height="16" rx="2" />
    <rect x="30" y="26" width="8" height="26" rx="2" />
    <rect x="44" y="18" width="8" height="34" rx="2" />
    <path d="M14 24l14-9 10 6 14-12M44 9h8v8" />
  </>,
);

export const UserCheckIcon = icon(
  "user-check",
  <>
    <circle cx="26" cy="20" r="11" />
    <path d="M5 58c0-13 9-21 21-21 4 0 8 1 11 3" />
    <path d="M40 47l7 7 13-15" />
  </>,
);

export const ScanDocIcon = icon(
  "scan-doc",
  <>
    <path d={DOC} />
    <path d="M38 6v12h12" />
    <path d="M3 36h58" strokeDasharray="7 5" />
    <path d="M18 48h14" />
  </>,
);

export const ReceiptIcon = icon(
  "receipt",
  <>
    <path d="M14 6h36v52l-6-4-6 4-6-4-6 4-6-4-6 4z" />
    <path d="M22 18h20M22 28h20M22 38h10" />
  </>,
);

export const BoxIcon = icon(
  "box",
  <>
    <path d="M32 6 56 18v28L32 58 8 46V18z" />
    <path d="M8 18l24 12 24-12M32 30v28" />
    <path d="M20 12l24 12" />
  </>,
);

export const CoinIcon = icon(
  "coin",
  <>
    <circle cx="32" cy="32" r="25" />
    <circle cx="32" cy="32" r="17" />
    <path d="M32 20v24M39 26c-2-4-14-4-14 2 0 8 15 3 15 11 0 6-12 6-15 1" />
  </>,
);

export const CartIcon = icon(
  "cart",
  <>
    <path d="M4 8h8l8 32h32l6-24H16" />
    <path d="M22 26h32" />
    <circle cx="24" cy="52" r="4.5" />
    <circle cx="46" cy="52" r="4.5" />
  </>,
);

export const ContractIcon = icon(
  "contract",
  <>
    <path d={DOC} />
    <path d="M38 6v12h12" />
    <path d="M18 28h20" />
    <path d="M18 43c4-8 6 4 10-2" />
    <path d="M36 54l16-16 6 6-16 16-8 2z" />
  </>,
);

export const TagIcon = icon(
  "tag",
  <>
    <path d="M6 6h24l28 28-24 24L6 30z" />
    <circle cx="18" cy="18" r="4" />
  </>,
);

export const ShareIcon = icon(
  "share",
  <>
    <path d="M20 29l22-12M20 35l22 12" />
    <circle cx="14" cy="32" r="7" />
    <circle cx="48" cy="14" r="7" />
    <circle cx="48" cy="50" r="7" />
  </>,
);

export const SyncIcon = icon(
  "sync",
  <>
    <path d="M54 26A22 22 0 0 0 14 18" />
    <path d="M54 10v16H38" />
    <path d="M10 38a22 22 0 0 0 40 8" />
    <path d="M10 54V38h16" />
  </>,
);
