"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeroCopy, heroPad } from "@/components/platform/hero-copy";
import { FloatTag } from "@/components/platform/frames";
import { Crumbs } from "@/components/documents/doc-heroes";
import { Photo } from "@/components/pages/photo";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Product page hero: category-coloured wash, breadcrumbs, the product photo in a tilted frame,
 * and a live card that cycles through the product's sub-products.
 */
export function ProductHero({
  catName,
  catSlug,
  catStage,
  name,
  tagline,
  summary,
  image,
  fallback,
  subs,
  accent,
}: {
  catName: string;
  catSlug: string;
  catStage: string;
  name: string;
  tagline: string;
  summary: string;
  image: string;
  fallback?: string;
  subs: { name: string; desc: string }[];
  accent: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (subs.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % subs.length), 3200);
    return () => clearInterval(t);
  }, [subs.length]);
  const cur = subs[i];

  return (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${accent}1f 0%, #ffffff 58%)` }}>
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="aurora-blob -right-16 top-0 h-96 w-96" style={{ background: `${accent}2e` }} aria-hidden />
      <div className={cn("relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8", heroPad)}>
        <div>
          <Crumbs
            items={[
              { label: "Finance", href: "/finance" },
              { label: catName, href: `/finance/${catSlug}` },
              { label: name },
            ]}
          />
          <HeroCopy
            eyebrow={catName}
            title={name}
            text={`${tagline} ${summary}`}
            primary={{ label: `Apply for ${name}`, href: "/signup" }}
            secondary={{ label: "Ask a question", href: "/contact" }}
          />
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-7 flex flex-wrap gap-2"
            aria-label="Sub-products"
          >
            {subs.map((s) => (
              <li key={s.name} className="chip">
                {s.name}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative mx-auto w-full max-w-lg pb-14">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 1.5 }}
            transition={{ duration: 1, ease }}
            className="relative rounded-[2rem] border border-white bg-white p-2 shadow-lift"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem]">
              <Photo src={image} fallback={fallback} alt={name} priority className="animate-[kenburns_18s_ease-in-out_infinite_alternate]" />
              <span className="absolute inset-0 bg-gradient-to-t from-[#050f24]/35 to-transparent" aria-hidden />
            </div>
          </motion.div>

          <FloatTag tone="coral" className="-right-3 top-6" delay={0.8}>
            {catStage}
          </FloatTag>

          <div className="absolute -bottom-0 left-3 right-3 sm:-left-6 sm:right-auto sm:w-[19rem]">
            <div className="overflow-hidden rounded-2xl border border-brand-line bg-white p-4 shadow-lift">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: accent }}>
                  Sub-product {String(i + 1).padStart(2, "0")} / {String(subs.length).padStart(2, "0")}
                </span>
                <span className="flex gap-1" aria-hidden>
                  {subs.map((_, k) => (
                    <i key={k} className={cn("h-1.5 rounded-full transition-all duration-500", k === i ? "w-5" : "w-1.5 bg-brand-line")} style={k === i ? { background: accent } : undefined} />
                  ))}
                </span>
              </div>
              <div className="relative mt-2 min-h-[4.2rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cur.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="font-heading text-base font-semibold text-brand-ink">{cur.name}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-brand-slate">{cur.desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
