import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";
import { Reveal } from "./reveal";
import { Photo } from "./photo";
import { Tilt3D } from "./tilt-3d";
import { Hero3DScene } from "./hero-3d";
import { cn } from "@/lib/utils";

type Cta = { label: string; href: string };

/**
 * White hero used by every inner page:
 * breadcrumbs, headline, chips, CTAs and a 3D media area on the right.
 * With a photo it becomes a tilting 3D card with a floating chip; without one it shows
 * the animated 3D scene (document card, chips, spinning cube).
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  fallback,
  imageAlt,
  crumbs,
  primary,
  secondary,
  chips,
  aside,
  compact,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  image?: string;
  fallback?: string;
  imageAlt?: string;
  crumbs?: { label: string; href?: string }[];
  primary?: Cta;
  secondary?: Cta;
  chips?: string[];

  aside?: React.ReactNode;
  compact?: boolean;
}) {
  const hasImage = !!image;
  return (
    <section className="relative overflow-hidden border-b border-brand-line bg-white">
      {}
      <div
        className="grid-lines-light absolute inset-0 opacity-40"
        aria-hidden
      />
      <div
        className="aurora-blob -right-24 -top-32 h-96 w-96 bg-[#FA7F63]/10"
        aria-hidden
      />

      <div
        className={cn(
          "relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8",
          compact ? "pb-12 pt-28 sm:pt-32" : "pb-14 pt-28 sm:pb-20 sm:pt-32",
        )}
      >
        <Reveal>
          {crumbs && <Breadcrumbs items={crumbs} />}
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-4 max-w-3xl text-display-sm font-semibold text-brand-ink">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-slate sm:text-lg">
            {description}
          </p>
          {chips && chips.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Highlights">
              {chips.map((c) => (
                <li
                  key={c}
                  className="chip transition duration-300 hover:-translate-y-0.5 hover:border-brand-accent/60 hover:text-brand-ink"
                >
                  {c}
                </li>
              ))}
            </ul>
          )}
          {(primary || secondary) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primary && (
                <Link href={primary.href} className="btn-primary btn-lg">
                  {primary.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {secondary && (
                <Link href={secondary.href} className="btn-secondary btn-lg">
                  {secondary.label}
                </Link>
              )}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.12} className="relative">
          {hasImage ? (
            <Tilt3D max={7} className="relative">
              <div className="relative rounded-[1.75rem] border border-brand-line bg-white p-2 shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] sm:aspect-[16/11]">
                  <Photo
                    src={image!}
                    fallback={fallback}
                    alt={imageAlt ?? ""}
                    priority
                  />
                </div>
              </div>
              {chips && chips[0] && (
                <span
                  aria-hidden
                  style={{ transform: "translateZ(60px)" }}
                  className="absolute -right-2 top-6 hidden rounded-xl bg-[#FA7F63] px-3.5 py-2 text-[13px] font-semibold text-[#022350] shadow-glow-coral sm:block"
                >
                  {chips[0]}
                </span>
              )}
              {aside && (
                <div
                  className="absolute -bottom-6 left-4 right-4 sm:-left-6 sm:right-auto"
                  style={{ transform: "translateZ(40px)" }}
                >
                  {aside}
                </div>
              )}
            </Tilt3D>
          ) : (
            <Hero3DScene title={eyebrow} chips={chips} />
          )}
        </Reveal>
      </div>
    </section>
  );
}
