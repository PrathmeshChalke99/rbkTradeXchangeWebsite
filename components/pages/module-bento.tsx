"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { modules } from "@/lib/content";
import { Icon } from "./icon";
import { Tilt3D } from "./tilt-3d";
import { RevealGroup, RevealItem } from "./reveal";
import { cn } from "@/lib/utils";

function trackPointer(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/**
 * Bento grid of the platform modules.
 * Resting state is just icon + name + one line. Hovering (or keyboard focus)
 * lights up a spotlight and slides the key highlights open. On touch devices,
 * where there is no hover, the highlights are always visible.
 */
export function ModuleBento() {
  const main = modules.filter((m) => m.slug !== "responsible-ai");
  const rai = modules.find((m) => m.slug === "responsible-ai");

  return (
    <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {main.map((m, i) => {
        const big = i === 0;
        const highlights = m.highlights.slice(0, big ? 4 : 2);
        return (
          <RevealItem key={m.slug} className={cn(big && "md:col-span-2")}>
            <Tilt3D max={5} glare={false} className="h-full">
              <Link
                href={`/platform/${m.slug}`}
                onMouseMove={trackPointer}
                className="card card-hover ring-gradient group relative flex h-full flex-col overflow-hidden p-6 outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), ${m.bg}, transparent 70%)`,
                  }}
                />

                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-8 -right-6 opacity-[0.07] transition-all duration-700 ease-out group-hover:-rotate-6 group-hover:scale-110 group-hover:opacity-[0.12]"
                  style={{ color: m.color }}
                >
                  <Icon name={m.icon} className="h-36 w-36" />
                </span>

                <div className="relative flex items-center justify-between">
                  <span
                    className="relative flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                    style={{ background: m.bg, color: m.color }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:animate-ping group-hover:opacity-30 motion-reduce:hidden"
                      style={{ background: m.color }}
                    />
                    <Icon name={m.icon} className="relative h-5 w-5" />
                  </span>
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-line bg-white text-brand-slate transition-all duration-300 group-hover:border-transparent group-hover:text-white"
                    style={{ ["--c" as string]: m.color }}
                  >
                    <ArrowRight className="h-4 w-4 -translate-x-0.5 transition-transform duration-300 group-hover:translate-x-0" />
                  </span>
                </div>

                <h3 className="relative mt-5 text-lg font-semibold text-brand-ink">
                  {m.name}
                </h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-brand-slate">
                  {m.headline}
                </p>

                <div
                  className={cn(
                    "relative grid transition-[grid-template-rows] duration-500 ease-out",
                    big
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]",
                  )}
                >
                  <ul
                    className={cn(
                      "min-h-0 overflow-hidden",
                      big
                        ? "mt-5 grid gap-2 border-t border-brand-line pt-4 sm:grid-cols-2"
                        : "grid gap-2",
                    )}
                  >
                    {highlights.map((h, k) => (
                      <li
                        key={h}
                        className={cn(
                          "flex items-start gap-2 text-[13px] text-brand-ink",
                          !big &&
                            "translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100",
                          !big && "first:mt-4",
                        )}
                        style={
                          !big ? { transitionDelay: `${k * 80}ms` } : undefined
                        }
                      >
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0"
                          style={{ color: m.color }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                  style={{ background: m.color }}
                />
              </Link>
            </Tilt3D>
          </RevealItem>
        );
      })}

      {rai && (
        <RevealItem className="md:col-span-2 lg:col-span-3">
          <Link
            href={`/platform/${rai.slug}`}
            onMouseMove={trackPointer}
            className="card card-hover group relative flex flex-col gap-5 overflow-hidden p-6 outline-none focus-visible:ring-2 focus-visible:ring-brand-blue sm:flex-row sm:items-center sm:justify-between sm:p-7"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(59,130,246,0.10), transparent 70%)",
              }}
            />
            <div className="relative flex items-center gap-4">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-accent-soft text-brand-accent-dark">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-xl border border-brand-accent/40 motion-safe:animate-ping [animation-duration:2.8s]"
                />
                <ShieldCheck className="relative h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-brand-ink">
                  {rai.name}
                </h3>
                <p className="mt-0.5 max-w-xl text-sm text-brand-slate">
                  {rai.headline}
                </p>
              </div>
            </div>
            <span className="relative inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-accent-dark">
              Our AI principles
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </Link>
        </RevealItem>
      )}
    </RevealGroup>
  );
}
