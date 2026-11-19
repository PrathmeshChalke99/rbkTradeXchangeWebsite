"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Globe2,
  Landmark,
  Layers,
  LineChart,
  Menu,
  Package,
  Receipt,
  Ship,
  ShoppingCart,
  Truck,
  Wallet,
  X,
} from "lucide-react";
import { categories, modules } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { menuDefs, type MenuDef } from "@/lib/nav-menus";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/platform-assets";
import { GlossIcon } from "@/components/platform/gloss-icon";
import {
  BankIcon,
  BankNoteIcon,
  BoxIcon,
  CartIcon,
  ChartIcon,
  CoinIcon,
  GlobeIcon,
  LcIcon,
  NetworkIcon,
  ReceiptIcon,
  ShipIcon,
  TruckIcon,
  WalletIcon,
  type AnyIcon,
} from "@/components/platform/icons";
import { Icon } from "@/components/pages/icon";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Realistic icon map — one distinct icon per category               */
/* ------------------------------------------------------------------ */
const catIcon: Record<string, AnyIcon> = {
  "international-trade-finance": GlobeIcon,
  "domestic-supply-chain-finance": TruckIcon,
  "corporate-finance": BankIcon,
};

/* Product-level icons so rows feel real, not repetitive */
const productIcon = (name: string): AnyIcon => {
  const n = name.toLowerCase();
  if (n.includes("invoice")) return ReceiptIcon;
  if (n.includes("letter") || n.includes("lc")) return LcIcon;
  if (n.includes("import") || n.includes("export")) return ShipIcon;
  if (n.includes("purchase") || n.includes("po")) return CartIcon;
  if (n.includes("inventory") || n.includes("stock")) return BoxIcon;
  if (n.includes("distributor") || n.includes("dealer")) return NetworkIcon;
  if (n.includes("term") || n.includes("loan")) return BankNoteIcon;
  if (n.includes("working") || n.includes("capital")) return ChartIcon;
  if (n.includes("credit")) return WalletIcon;
  return CoinIcon;
};

/* ------------------------------------------------------------------ */
/*  Logo                                                               */
/* ------------------------------------------------------------------ */
export function Logo({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Image
      src="/tradeExchange_logo.png"
      alt="RBK TradeXchange"
      width={415}
      height={129}
      priority
      className={cn(
        "h-10 w-auto transition-[filter] duration-300 sm:h-12",
        light && "brightness-0 invert",
        className,
      )}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Video / Image media block (shared)                                 */
/* ------------------------------------------------------------------ */
function Media({
  video,
  image,
  alt,
  className,
  sizes = "(min-width: 1280px) 260px, 220px",
  priority = false,
  pos,
  zoom,
}: {
  video?: string;
  image?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  pos?: string;
  zoom?: number;
}) {
  if (video) {
    return (
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={cn("h-full w-full object-cover", className)}
        aria-label={alt}
      />
    );
  }
  if (image) {
    return (
      <Image
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
        style={
          pos || zoom
            ? {
                objectPosition: pos,
                transform: zoom ? `scale(${zoom})` : undefined,
                transformOrigin: "100% 0%",
              }
            : undefined
        }
      />
    );
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Marquee — seamless, fading edges, pause on hover                  */
/* ------------------------------------------------------------------ */
type MarqueeItem = { label: string; href: string; icon: ReactNode };

function Marquee({
  items,
  seconds = 45,
}: {
  items: MarqueeItem[];
  seconds?: number;
}) {
  const loop = [...items, ...items];

  return (
    <div className="group/marquee relative w-full overflow-hidden py-2">
      <style>{`
        @keyframes nav-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .nav-marquee-track {
          width: max-content;
          animation: nav-marquee var(--marquee-duration) linear infinite;
          will-change: transform;
        }

        .group\\/marquee:hover .nav-marquee-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-marquee-track {
            animation: none;
            transform: none;
          }
        }
      `}</style>

      {/* Scrolling track */}
      <ul
        className="nav-marquee-track flex items-center"
        style={
          {
            "--marquee-duration": `${seconds}s`,
          } as React.CSSProperties
        }
      >
        {loop.map((item, i) => {
          const clone = i >= items.length;

          return (
            <li
              key={`${item.href}-${i}`}
              className="shrink-0 px-2"
              aria-hidden={clone || undefined}
            >
              <Link
                href={item.href}
                tabIndex={clone ? -1 : undefined}
                className="
                group/item relative inline-flex items-center gap-3
                overflow-hidden rounded-xl
                border border-dashed border-slate-300
                bg-white px-5 py-3
                text-[13px] font-semibold text-slate-700
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-blue-400
                hover:bg-blue-50/60
                hover:text-blue-700
                hover:shadow-[0_8px_22px_rgba(37,99,235,0.10)]
"
              >
                {/* Icon container */}
                <span
                  className="
                    flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-lg bg-white
                    text-orange-500
                    transition-all duration-300
                    group-hover/item:bg-orange-600-600
                    group-hover/item:text-orange-600
                    [&>svg]:h-[18px] [&>svg]:w-[18px]
                  "
                >
                  {item.icon}
                </span>

                {/* Label */}
                <span className="relative whitespace-nowrap">{item.label}</span>

                {/* Arrow */}
                <ArrowUpRight
                  className="
                    ml-1 h-3.5 w-3.5 shrink-0
                    text-slate-400 opacity-0
                    -translate-x-1
                    transition-all duration-300
                    group-hover/item:translate-x-0
                    group-hover/item:opacity-100
                    group-hover/item:text-blue-600
                  "
                />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Left fade */}
      <div
        className="
        pointer-events-none absolute inset-y-0 left-0 z-10
        w-20 bg-gradient-to-r
        from-white via-white/80 to-transparent
      "
      />

      {/* Right fade */}
      <div
        className="
        pointer-events-none absolute inset-y-0 right-0 z-10
        w-20 bg-gradient-to-l
        from-white via-white/80 to-transparent
      "
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Strip heading                                                      */
/* ------------------------------------------------------------------ */

function StripHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-4">
      <h3 className="shrink-0 text-sm font-medium text-slate-700">
        {children}
      </h3>

      <span
        className="h-px flex-1 border-t border-dashed border-blue-300"
        aria-hidden
      />
    </div>
  );
}

function MenuIntro({
  title,
  subtitle,
  video,
  image,
  imagePos,
  imageZoom,
  cta,
}: {
  title: string;
  subtitle: string;
  video?: string;
  image?: string;
  imagePos?: string;
  imageZoom?: number;
  cta: { href: string; label: string; text: string };
}) {
  const hasMedia = Boolean(video || image);

  return (
    <div className="flex flex-col">
      <p className="font-heading text-xl font-semibold text-brand-blue">
        {title}
      </p>
      <p className="mt-1 text-sm font-medium leading-snug text-brand-slate">
        {subtitle}
      </p>

      <div className="relative mt-5 flex-1 overflow-hidden rounded-xl shadow-lg">
        {hasMedia ? (
          <div className="relative h-full min-h-[170px] w-full">
            <Media
              video={video}
              image={image}
              alt={title}
              sizes="(min-width: 1280px) 300px, 260px"
              priority
              pos={imagePos}
              zoom={imageZoom}
            />
            {/* subtle overlay so text stays readable on busy media */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <Link
              href={cta.href}
              className="absolute inset-x-3 bottom-3 inline-flex items-center justify-between rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-brand-ink backdrop-blur-sm transition hover:bg-white"
            >
              {cta.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="relative flex h-full min-h-[170px] flex-col justify-between bg-gradient-to-br from-brand-night via-brand-blue to-brand-sky p-4 text-white">
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,.9) 1px, transparent 0)",
                backgroundSize: "18px 18px",
              }}
              aria-hidden
            />
            <span className="relative font-mono text-[10px] uppercase tracking-[0.16em] text-white/80">
              Quick start
            </span>
            <div className="relative">
              <p className="text-sm font-semibold leading-snug">{cta.text}</p>
              <Link
                href={cta.href}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white hover:underline"
              >
                {cta.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FinanceMenu() {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? "");

  const activeCategory =
    categories.find((c) => c.slug === activeSlug) ?? categories[0];

  const strip: MarqueeItem[] = categories.flatMap((c) => {
    return c.products.map((p) => ({
      label: p.name,
      href: `/finance/${c.slug}/${p.slug}`,
      icon: <GlossIcon icon={productIcon(p.name)} tint={c.color} size="sm" />,
    }));
  });

  return (
    <>
      <div className="grid gap-6 p-4 lg:grid-cols-[260px_260px_minmax(0,1fr)] xl:grid-cols-[300px_320px_minmax(0,1fr)] xl:gap-8 xl:p-8">
        {/* ---------- COLUMN 1: FINANCE INTRO ---------- */}
        <div className="min-w-0">
          <MenuIntro
            title="A Complete Business Finance Ecosystem"
            subtitle="Every Business Has Financial Needs. We Bring Solutions Together"
            video="/images/finance.mp4"
            image="/images/nav/finance-hero.jpg"
            cta={{
              href: "/finance#estimator",
              label: "Finance estimator",
              text: "Not sure which product fits? Model an invoice advance first.",
            }}
          />
        </div>

        {/* ---------- COLUMN 2: MAIN CATEGORIES ---------- */}
        <div className="min-w-0 border-l border-slate-200 pl-5">
          <h3 className="mb-4 text-sm font-semibold text-brand-ink">
            Finance Categories
          </h3>

          <nav className="flex flex-col gap-2" aria-label="Finance categories">
            {categories.map((c) => {
              const I = catIcon[c.slug] ?? Globe2;
              const active = c.slug === activeSlug;

              return (
                <button
                  key={c.slug}
                  type="button"
                  onMouseEnter={() => setActiveSlug(c.slug)}
                  onFocus={() => setActiveSlug(c.slug)}
                  onClick={() => setActiveSlug(c.slug)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-200",
                    active
                      ? "border-slate-200 bg-white shadow-sm"
                      : "border-transparent hover:border-slate-200 hover:bg-white hover:shadow-sm",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center transition-all duration-200",
                      active
                        ? "border-orange-200 text-orange-500"
                        : "border-slate-200 text-brand-blue group-hover:border-orange-200 group-hover:text-orange-500",
                    )}
                  >
                    <I className="h-[18px] w-[18px]" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-sm font-semibold",
                        active ? "text-brand-blue" : "text-brand-ink",
                      )}
                    >
                      {c.name}
                    </span>
                    {/* 
                    <span className="mt-0.5 block text-xs leading-snug text-brand-slate">
                      {c.short}
                    </span> */}
                  </span>

                  <ArrowRight
                    className={cn(
                      "h-4 w-4 shrink-0 transition-all",
                      active
                        ? "translate-x-0 text-brand-blue opacity-100"
                        : "-translate-x-1 text-slate-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                    )}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* ---------- COLUMN 3: SUBCATEGORIES / PRODUCTS ---------- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{
              duration: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="min-w-0  pl-5"
          >
            <div className="mb-4 flex items-end justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-heading text-lg font-semibold text-brand-ink">
                  {activeCategory?.name}
                </h3>

                <p className="mt-0.5 text-xs text-brand-slate">
                  {activeCategory?.products.length} products available
                </p>
              </div>

              <Link
                href={`/finance/${activeCategory?.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:underline"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <ul className="grid grid-cols-2 gap-3 xl:grid-cols-3">
              {activeCategory?.products.map((p) => {
                const PIcon = productIcon(p.name);

                return (
                  <li key={p.slug} className="h-full">
                    <Link
                      href={`/finance/${activeCategory.slug}/${p.slug}`}
                      className="group relative flex h-full items-start gap-3 overflow-hidden rounded-xl p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md"
                    >
                      <GlossIcon icon={PIcon} tint={activeCategory.color} />

                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-[13px] font-semibold leading-snug text-brand-ink transition-colors group-hover:text-brand-blue">
                          {p.name}
                        </span>

                        <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[11px] font-semibold text-brand-blue">
                          Learn more
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-4 xl:px-4">
        <StripHeading>All finance products</StripHeading>
        <Marquee items={strip} seconds={Math.max(30, strip.length * 4)} />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Card menu: used by Platform, Trade Management and Dashboard.       */
/*  Same pattern as Finance (intro + cards + strip), different content */
/* ------------------------------------------------------------------ */
function CardMenu({
  def,
  withModules = false,
}: {
  def: MenuDef;
  withModules?: boolean;
}) {
  const strip: MarqueeItem[] = [
    ...def.cards.map((c) => ({
      label: c.label,
      href: c.href,
      icon: <GlossIcon icon={c.icon} tint={c.tint} size="sm" />,
    })),
    ...def.extra.map((c) => ({
      label: c.label,
      href: c.href,
      icon: <GlossIcon icon={c.icon} tint="#4b5a74" size="sm" />,
    })),
    ...(withModules
      ? modules.map((m) => ({
          label: m.name,
          href: `/platform/${m.slug}`,
          icon: <Icon name={m.icon} />,
        }))
      : []),
  ];

  return (
    <>
      <div className="grid gap-6 p-6 lg:grid-cols-[260px_1fr] xl:grid-cols-[300px_1fr] xl:gap-10 xl:p-8">
        <MenuIntro
          title={def.title}
          subtitle={def.subtitle}
          image={def.image}
          imagePos={def.pos}
          imageZoom={def.zoom}
          cta={def.cta}
        />

        <ul className="grid grid-cols-2 content-start gap-3 xl:grid-cols-3">
          {def.cards.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="group relative flex h-full items-start gap-3.5 overflow-hidden rounded-xl bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md"
              >
                <GlossIcon icon={c.icon} tint={c.tint} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-ink group-hover:text-brand-blue">
                    {c.label}
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                  <span className="mt-1 line-clamp-2 block text-xs leading-snug text-brand-slate">
                    {c.text}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-brand-line bg-brand-paper/40 px-6 py-4 xl:px-8">
        <StripHeading>{def.stripLabel}</StripHeading>
        <Marquee items={strip} seconds={Math.max(30, strip.length * 5)} />
      </div>
    </>
  );
}
/* ------------------------------------------------------------------ */
type MobileItem = {
  label: string;
  href: string;
  note?: string;
  icon?: AnyIcon;
  tint?: string;
  children?: { label: string; href: string }[];
};

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */
export function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
      else setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || !!openMenu;

  const open = (m: string | null) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(m);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
      setHovered(null);
    }, 140);
  };

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  const mobileItems = (menu?: string): MobileItem[] | null => {
    if (menu === "finance")
      return categories.map((c) => ({
        label: c.name,
        href: `/finance/${c.slug}`,
        note: c.short,
        icon: catIcon[c.slug] ?? Globe2,
        tint: c.color,
        children: c.products.map((p) => ({
          label: p.name,
          href: `/finance/${c.slug}/${p.slug}`,
        })),
      }));
    if (menu === "platform")
      return menuDefs.platform.cards.map((c) => ({
        label: c.label,
        href: c.href,
        note: c.text,
        icon: c.icon,
        tint: c.tint,
      }));
    if (menu === "trade" || menu === "dashboard")
      return [
        ...menuDefs[menu].cards.map((c) => ({
          label: c.label,
          href: c.href,
          note: c.text,
          icon: c.icon,
          tint: c.tint,
        })),
        ...menuDefs[menu].extra.map((c) => ({
          label: c.label,
          href: c.href,
          icon: c.icon,
          tint: "#4b5a74",
        })),
      ];
    return null;
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 lg:pt-4"
        onMouseLeave={scheduleClose}
      >
        <div className="relative mx-auto max-w-7xl">
          <div
            className={cn(
              "relative rounded-2xl border backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300",
              solid
                ? "border-slate-300/80 bg-slate-100/95 shadow-[0_12px_40px_-12px_rgba(10,22,48,0.25)]"
                : "border-slate-200/70 bg-slate-50/80 shadow-sm",
            )}
          >
            <nav
              className="flex h-20 items-center justify-between gap-3 px-4 lg:gap-4 lg:px-6"
              aria-label="Primary"
            >
              <Link
                href="/"
                className="shrink-0 rounded-lg"
                aria-label="RBK TradeXchange home"
              >
                <Logo />
              </Link>

              <div
                className="hidden items-center lg:flex"
                onMouseLeave={() => setHovered(null)}
              >
                {siteConfig.nav.map((item) => {
                  const active = isActive(item.href);
                  const expanded = openMenu === item.menu && !!item.menu;
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => {
                        setHovered(item.href);
                        open(item.menu ?? null);
                      }}
                      onFocus={() => open(item.menu ?? null)}
                    >
                      <Link
                        href={item.href}
                        aria-haspopup={item.menu ? "true" : undefined}
                        aria-expanded={item.menu ? expanded : undefined}
                        onClick={(e) => {
                          if (
                            item.menu &&
                            !expanded &&
                            window.matchMedia("(hover: none)").matches
                          ) {
                            e.preventDefault();
                            open(item.menu);
                          }
                        }}
                        className={cn(
                          "relative z-10 inline-flex items-center gap-1 rounded-lg px-2 py-2 text-[13.5px] font-medium transition-colors xl:px-3 xl:text-[14.5px]",
                          active
                            ? "text-brand-blue"
                            : "text-brand-slate hover:text-brand-ink",
                        )}
                      >
                        {item.label}
                        {item.menu && (
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 transition-transform duration-300",
                              expanded && "rotate-180",
                            )}
                            aria-hidden
                          />
                        )}
                        {active && (
                          <span
                            className="absolute inset-x-2 -bottom-[11px] h-[2px] rounded-full bg-brand-blue xl:inset-x-3"
                            aria-hidden
                          />
                        )}
                      </Link>
                      {hovered === item.href && (
                        <motion.span
                          layoutId="nav-hover"
                          className="absolute inset-0 rounded-lg bg-slate-200/80"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 34,
                          }}
                          aria-hidden
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="hidden shrink-0 items-center gap-2 lg:flex">
                {/* <Link
                  href={LOGIN_URL}
                  className="hidden rounded-lg px-3 py-2 text-[14.5px] font-medium text-brand-slate transition-colors hover:text-brand-ink xl:block"
                >
                  Log in
                </Link> */}
                <Link
                  href={SIGNUP_URL}
                  className="btn-primary px-4 py-2 text-[14.5px]"
                >
                  Get started <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <button
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white/80 text-brand-ink transition hover:bg-slate-50 lg:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </nav>
          </div>

          <AnimatePresence>
            {openMenu && (
              <motion.div
                key={openMenu}
                initial={{ opacity: 0, y: 8, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.985 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 top-full hidden pt-3 lg:block"
                onMouseEnter={() => open(openMenu)}
              >
                <div className="max-h-[calc(100dvh-6.5rem)] origin-top overflow-y-auto overscroll-contain rounded-2xl border border-blue-200/70 bg-white shadow-2xl shadow-blue-200/50 ring-1 ring-black/[0.02]">
                  {openMenu === "finance" && <FinanceMenu />}
                  {openMenu === "platform" && (
                    <CardMenu def={menuDefs.platform} withModules />
                  )}
                  {openMenu === "trade" && <CardMenu def={menuDefs.trade} />}
                  {openMenu === "dashboard" && (
                    <CardMenu def={menuDefs.dashboard} />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-brand-night/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 40 }}
              className="fixed inset-y-0 right-0 z-[60] flex h-dvh w-full max-w-sm flex-col rounded-l-3xl bg-white shadow-lift lg:hidden"
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-brand-line px-4">
                <Logo className="h-8 sm:h-8" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-brand-ink"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
                {siteConfig.nav.map((item, i) => {
                  const items = mobileItems(item.menu);
                  const expanded = mobileSection === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.035 }}
                      className="border-b border-brand-line/70 last:border-0"
                    >
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          className={cn(
                            "flex-1 rounded-lg px-3 py-3.5 text-[15px] font-semibold",
                            isActive(item.href)
                              ? "text-brand-blue"
                              : "text-brand-ink",
                          )}
                        >
                          {item.label}
                        </Link>
                        {items && (
                          <button
                            onClick={() =>
                              setMobileSection(expanded ? null : item.href)
                            }
                            aria-expanded={expanded}
                            aria-label={`Show ${item.label} pages`}
                            className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-slate"
                          >
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform",
                                expanded && "rotate-180",
                              )}
                            />
                          </button>
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {items && expanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pb-2"
                          >
                            {items.map((s) => (
                              <li key={s.href} className="mb-1">
                                <Link
                                  href={s.href}
                                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-brand-paper"
                                >
                                  {s.icon && (
                                    <GlossIcon
                                      icon={s.icon}
                                      tint={s.tint ?? "#1d5fd6"}
                                      size="sm"
                                    />
                                  )}
                                  <span className="min-w-0">
                                    <span className="block text-sm font-medium text-brand-ink">
                                      {s.label}
                                    </span>
                                    {s.note && (
                                      <span className="block text-xs text-brand-slate">
                                        {s.note}
                                      </span>
                                    )}
                                  </span>
                                </Link>
                                {s.children && (
                                  <ul className="ml-5 border-l border-brand-line pl-2">
                                    {s.children.map((c) => (
                                      <li key={c.href}>
                                        <Link
                                          href={c.href}
                                          className="block rounded-md px-2 py-1.5 text-[13px] text-brand-slate hover:bg-brand-paper hover:text-brand-ink"
                                        >
                                          {c.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}

                {[
                  ["How it works", "/how-it-works"],
                  ["E-Docs", "/documents"],
                  ["Resources", "/resources"],
                  ["Pricing", "/pricing"],
                  ["FAQ", "/faq"],
                  ["Contact", "/contact"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="block px-3 py-3 text-[15px] font-medium text-brand-slate"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-brand-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                {/* <Link href={LOGIN_URL} className="btn-ghost">
                  Log in
                </Link> */}
                <Link href={SIGNUP_URL} className="btn-primary">
                  Get started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
