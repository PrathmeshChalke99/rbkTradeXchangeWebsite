import type { AnyIcon } from "./icons";
import { cn } from "@/lib/utils";

/** Lighten (+) or darken (-) a #rrggbb colour. */
function adj(hex: string, amt: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, "$1$1") : h, 16);
  const c = (v: number) => Math.max(0, Math.min(255, v + amt));
  const r = c((n >> 16) & 255);
  const g = c((n >> 8) & 255);
  const b = c(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

const sizes = {
  sm: "h-9 w-9 rounded-[12px] [&>svg]:h-[19px] [&>svg]:w-[19px]",
  md: "h-11 w-11 rounded-[14px] [&>svg]:h-6 [&>svg]:w-6",
  lg: "h-14 w-14 rounded-[18px] [&>svg]:h-8 [&>svg]:w-8",
  xl: "h-20 w-20 rounded-[24px] [&>svg]:h-12 [&>svg]:w-12",
} as const;

/**
 * Soft icon tile: a pale wash of the brand colour with a hairline ring and a coloured glyph.
 * Light on purpose, so icons never overpower the card they sit in.
 */
export function GlossIcon({
  icon: I,
  tint = "#1d5fd6",
  size = "md",
  onDark = false,
  className,
}: {
  icon: AnyIcon;
  tint?: string;
  size?: keyof typeof sizes;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center transition-all duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:scale-110",
        sizes[size],
        "group-hover:text-[#f97316]",
        className,
      )}
      style={{
        color: onDark ? adj(tint, 95) : tint,
        boxShadow: `inset 0 0 0 1px ${tint}${onDark ? "55" : "2e"}`,
      }}
    >
      <I strokeWidth={2} />
    </span>
  );
}
