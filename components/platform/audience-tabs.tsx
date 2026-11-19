"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const audiences = [
  {
    k: "Manufacturers",
    t: "Showcase your manufacturing capabilities, products and business profile to potential domestic and international buyers.",
  },
  {
    k: "Suppliers",
    t: "Build business visibility and connect with companies looking for products, materials and services.",
  },
  {
    k: "Importers",
    t: "Discover manufacturers and suppliers, explore sourcing opportunities and manage your trade relationships.",
  },
  {
    k: "Exporters",
    t: "Expand your business network, showcase your offerings and connect with potential buyers across markets.",
  },
  {
    k: "Business Partners",
    t: "Explore opportunities to collaborate with businesses across the trade and financial ecosystem.",
  },
];

export function AudienceTabs() {
  const [a, setA] = useState(0);
  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-14">
      <div
        role="tablist"
        aria-label="Who the network is for"
        className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {audiences.map((x, i) => (
          <button
            key={x.k}
            role="tab"
            aria-selected={a === i}
            onClick={() => setA(i)}
            onMouseEnter={() => setA(i)}
            className={cn(
              "relative shrink-0 rounded-xl border px-5 py-3.5 text-left font-heading text-sm font-semibold transition",
              a === i
                ? "border-[#022350] bg-[#022350] text-white shadow-lift"
                : "border-brand-line bg-white text-brand-ink hover:border-brand-accent",
            )}
          >
            For {x.k}
          </button>
        ))}
      </div>
      <div className="relative min-h-[11rem] rounded-3xl border border-brand-line bg-brand-paper p-8 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={a}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            role="tabpanel"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-brand-accent-dark">
              For {audiences[a].k}
            </p>
            <p className="mt-4 font-heading text-xl font-semibold leading-snug text-brand-ink sm:text-2xl">
              {audiences[a].t}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
