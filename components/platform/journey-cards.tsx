import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AnyIcon } from "./icons";
import type { Shot } from "@/lib/platform-assets";
import { BrowserFrame, FocusShot } from "./frames";
import { GlossIcon } from "./gloss-icon";

export function ShotCard({
  shot,
  focus = 0,
  aspect = 1.45,
  n,
  total,
  title,
  text,
}: {
  shot: Shot;
  focus?: number;
  aspect?: number;
  n: number;
  total: number;
  title: string;
  text: string;
}) {
  return (
    <div
      className="mx-auto w-full"
      style={{ maxWidth: `calc((68vh - 8.5rem) * ${aspect})` }}
    >
      <BrowserFrame url="dashboard.rbktradexchange.com">
        <FocusShot shot={shot} focus={focus} aspect={aspect} />
      </BrowserFrame>
      <div className="mt-4 flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#C9482A]">
            Step {n} of {total}
          </p>
          <h3 className="mt-1 font-heading text-xl font-semibold text-brand-ink sm:text-2xl">
            {title}
          </h3>
          <p className="mt-1 max-w-lg text-sm leading-relaxed text-brand-slate">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AudienceCard({
  icon,
  tint,
  title,
  text,
  chips,
  href,
  n,
  total,
}: {
  icon: AnyIcon;
  tint: string;
  title: string;
  text: string;
  chips: string[];
  href: string;
  n: number;
  total: number;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-brand-line bg-white p-8 shadow-lift sm:p-9">
      <span
        aria-hidden
        className="absolute -right-6 -top-10 font-heading text-[10rem] font-semibold leading-none text-[#022350]/[0.05]"
      >
        {String(n).padStart(2, "0")}
      </span>
      <GlossIcon icon={icon} tint={tint} size="lg" className="relative" />
      <p className="relative mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#C9482A]">
        Audience {n} of {total}
      </p>
      <h3 className="relative mt-2 text-3xl font-semibold text-[#022350]">
        {title}
      </h3>
      <p className="relative mt-4 max-w-md text-base leading-relaxed text-brand-slate">
        {text}
      </p>
      <ul className="relative mt-5 flex flex-wrap gap-2">
        {chips.map((c) => (
          <li key={c} className="chip">
            {c}
          </li>
        ))}
      </ul>
      <Link href={href} className="link-arrow relative mt-6">
        Explore solutions <ArrowRight className="h-4 w-4" />
      </Link>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#FA7F63] to-[#022350]"
      />
    </div>
  );
}

export function StepCard({
  icon,
  tint,
  title,
  text,
  points,
  href,
  hrefLabel,
  n,
  total,
}: {
  icon: AnyIcon;
  tint: string;
  title: string;
  text: string;
  points?: string[];
  href?: string;
  hrefLabel?: string;
  n: number;
  total: number;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-brand-line bg-white p-8 shadow-lift sm:p-9">
      <span
        aria-hidden
        className="absolute -right-6 -top-10 font-heading text-[10rem] font-semibold leading-none text-[#022350]/[0.05]"
      >
        {String(n).padStart(2, "0")}
      </span>
      <GlossIcon icon={icon} tint={tint} size="xl" className="relative" />
      <p className="relative mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#C9482A]">
        Step {n} of {total}
      </p>
      <h3 className="relative mt-2 text-3xl font-semibold text-[#022350]">
        {title}
      </h3>
      <p className="relative mt-4 max-w-md text-base leading-relaxed text-brand-slate">
        {text}
      </p>
      {points && (
        <ul className="relative mt-5 space-y-2">
          {points.map((p) => (
            <li
              key={p}
              className="flex items-center gap-2.5 text-sm font-medium text-brand-ink"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#FA7F63]" />
              {p}
            </li>
          ))}
        </ul>
      )}
      {href && (
        <Link href={href} className="link-arrow relative mt-6">
          {hrefLabel ?? "Learn more"} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#FA7F63] to-[#022350]"
      />
    </div>
  );
}
