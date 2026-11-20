"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { HeroCopy, heroPad } from "@/components/platform/hero-copy";
import { FloatTag } from "@/components/platform/frames";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function Crumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <motion.nav
      aria-label="Breadcrumb"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="mb-6"
    >
      <ol className="flex flex-wrap items-center gap-1 text-[13px] text-brand-slate">
        <li>
          <Link href="/" className="transition-colors hover:text-brand-blue">
            Home
          </Link>
        </li>
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
            {it.href ? (
              <Link
                href={it.href}
                className="rounded-full bg-white/70 px-2 py-0.5 transition-colors hover:bg-white hover:text-brand-blue"
              >
                {it.label}
              </Link>
            ) : (
              <span
                aria-current={i === items.length - 1 ? "page" : undefined}
                className="font-semibold text-brand-ink"
              >
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  );
}

function Paper({
  label,
  accent,
  className,
  typing = false,
  style,
}: {
  label?: string;
  accent: string;
  className?: string;
  typing?: boolean;
  style?: React.CSSProperties;
}) {
  const widths = [62, 84, 48, 74, 56];
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-white shadow-lift ring-1 ring-black/5",
        className,
      )}
      style={style}
    >
      <div className="px-5 py-4 text-white" style={{ background: accent }}>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-80">
          RBK / E-Docs
        </p>
        <p className="font-heading text-base font-semibold">{label ?? " "}</p>
      </div>
      <div className="space-y-3 p-5" aria-hidden>
        <div className="flex gap-3">
          <i className="h-2 w-1/2 rounded-full bg-brand-line" />
          <i className="h-2 w-1/3 rounded-full bg-brand-line" />
        </div>
        {widths.map((w, i) => (
          <motion.i
            key={i}
            className="block h-2 rounded-full"
            style={{ background: i % 2 ? "#e3e9f3" : `${accent}40` }}
            initial={{ width: typing ? "0%" : `${w}%` }}
            animate={{ width: `${w}%` }}
            transition={{
              duration: 0.9,
              delay: typing ? 0.6 + i * 0.25 : 0,
              ease,
            }}
          />
        ))}
        <div className="grid grid-cols-4 gap-1.5 rounded-lg border border-brand-line p-2.5">
          <i
            className="col-span-2 h-2 rounded-full"
            style={{ background: `${accent}30` }}
          />
          <i className="h-2 rounded-full bg-brand-line" />
          <i className="h-2 rounded-full bg-brand-line" />
          <i className="col-span-2 h-2 rounded-full bg-brand-line" />
          <i className="h-2 rounded-full bg-brand-line" />
          <i className="h-2 rounded-full bg-brand-line" />
        </div>
        <div className="flex justify-end">
          <i
            className="h-2.5 w-16 rounded-full"
            style={{ background: accent, opacity: 0.55 }}
          />
        </div>
      </div>
    </div>
  );
}

export function DocPageHero({
  name,
  label,
  short,
  usedWhen,
  accent,
  fieldCount,
}: {
  name: string;
  label: string;
  short: string;
  usedWhen: string;
  accent: string;
  fieldCount: number;
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${accent}1f 0%, #ffffff 55%)`,
      }}
    >
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div
        className="aurora-blob -right-16 top-0 h-96 w-96"
        style={{ background: `${accent}33` }}
        aria-hidden
      />
      <div
        className={cn(
          "relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8",
          heroPad,
        )}
      >
        <div>
          <Crumbs
            items={[
              {
                label: "Document Management",
                href: "/trade-management/document-management",
              },
              { label: "E-Docs", href: "/documents" },
              { label: name },
            ]}
          />
          <HeroCopy
            eyebrow="E-Docs template"
            title={name}
            text={`${short} ${usedWhen}`}
            primary={{ label: "Try it below", href: "#preview" }}
            secondary={{ label: "Use in the portal", href: "/signup" }}
          />
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-7 flex flex-wrap gap-2"
          >
            {[`${fieldCount} fields`, "Live preview", "Download PNG"].map(
              (c) => (
                <li key={c} className="chip">
                  {c}
                </li>
              ),
            )}
          </motion.ul>
        </div>

        <div className="relative mx-auto h-[26rem] w-full max-w-sm [perspective:1200px]">
          <motion.div
            initial={{ opacity: 0, rotate: 0, x: 0 }}
            animate={{ opacity: 1, rotate: -9, x: -34 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="absolute inset-x-6 top-6"
          >
            <Paper accent={accent} className="opacity-70" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: 0, x: 0 }}
            animate={{ opacity: 1, rotate: 7, x: 30 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="absolute inset-x-6 top-3"
          >
            <Paper accent={accent} className="opacity-85" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 18 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="absolute inset-x-4 top-0"
          >
            <div className="animate-float-y">
              <Paper accent={accent} label={label} typing />
            </div>
          </motion.div>
          <FloatTag tone="coral" className="-right-3 top-10" delay={1.2}>
            Live preview
          </FloatTag>
          <FloatTag className="-left-4 bottom-20" delay={1.5}>
            Your own format
          </FloatTag>
        </div>
      </div>
    </section>
  );
}

export function DocsIndexHero({
  docs,
}: {
  docs: { slug: string; name: string; label: string; accent: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-brand-paper">
      <div
        className="grid-lines-light absolute inset-0 opacity-60"
        aria-hidden
      />
      <div
        className="aurora-blob -left-24 top-10 h-96 w-96 bg-brand-sky/20"
        aria-hidden
      />
      <div
        className="aurora-blob -right-24 bottom-0 h-96 w-96 bg-[#FA7F63]/20"
        aria-hidden
      />
      <div
        className={cn(
          "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          heroPad,
          "!pb-10 sm:!pb-14",
        )}
      >
        <Crumbs
          items={[
            {
              label: "Document Management",
              href: "/trade-management/document-management",
            },
            { label: "E-Docs" },
          ]}
        />
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <HeroCopy
            eyebrow="E-Docs Studio"
            title={
              <>
                Trade paperwork that{" "}
                <span className="gradient-text">starts ready.</span>
              </>
            }
            text="Six formats for the documents behind every trade. Pick one, type your details and watch them land on the real format."
            primary={{ label: "Choose a format", href: "#formats" }}
            secondary={{ label: "Create account", href: "/signup" }}
          />
          <DocFan docs={docs} />
        </div>
      </div>
    </section>
  );
}

export function DocFan({
  docs,
}: {
  docs: { slug: string; name: string; label: string; accent: string }[];
}) {
  const n = docs.length;
  return (
    <div
      className="relative mx-auto h-[24rem] w-full max-w-xl"
      aria-label="Available document formats"
    >
      {docs.map((d, i) => {
        const spread = i - (n - 1) / 2;
        return (
          <motion.div
            key={d.slug}
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            animate={{
              opacity: 1,
              y: Math.abs(spread) * 6,
              rotate: spread * 6,
              x: spread * 78,
            }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease }}
            whileHover={{
              y: -22,
              rotate: 0,
              zIndex: 20,
              transition: { duration: 0.3 },
            }}
            style={{ zIndex: i }}
            className="absolute left-1/2 top-4 w-44 -translate-x-1/2 sm:w-48"
          >
            <Link
              href={`/documents/${d.slug}`}
              aria-label={d.name}
              className="block"
            >
              <Paper accent={d.accent} label={d.label} />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
