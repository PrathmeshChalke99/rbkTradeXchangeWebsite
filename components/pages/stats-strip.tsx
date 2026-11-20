import {
  categories,
  modules,
  eDocs,
  allProducts,
  allSubs,
} from "@/lib/content";
import { CountUp } from "./count-up";
import { RevealGroup, RevealItem } from "./reveal";

export function StatsStrip() {
  const stats = [
    {
      v: categories.length,
      k: "Finance categories",
      n: "Trade, supply chain, corporate",
    },
    {
      v: allProducts.length,
      k: "Finance products",
      n: "Explained with documents & FAQs",
    },
    { v: allSubs.length, k: "Sub-products", n: "From packing credit to LRD" },
    { v: modules.length, k: "Platform modules", n: "One connected workspace" },
    { v: eDocs.length, k: "E-doc templates", n: "With live preview" },
  ];
  return (
    <div className="border-b border-brand-line bg-white">
      <RevealGroup
        stagger={0.09}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => (
            <RevealItem
              key={s.k}
              className={i === 4 ? "col-span-2 sm:col-span-1" : ""}
            >
              <div
                className={`group border-brand-line py-6 transition-colors duration-300 hover:bg-brand-accent-soft/60 sm:py-8 ${i > 0 ? "lg:border-l lg:pl-8" : ""}`}
              >
                <span
                  aria-hidden
                  className="mb-3 block h-1 w-8 rounded-full bg-gradient-to-r from-brand-accent-bright to-brand-sky transition-all duration-500 group-hover:w-16"
                />
                <dd className="font-heading text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">
                  <CountUp value={s.v} />
                </dd>
                <dt className="mt-1 text-sm font-medium text-brand-ink">
                  {s.k}
                </dt>
                <p className="text-xs text-brand-slate">{s.n}</p>
              </div>
            </RevealItem>
          ))}
        </dl>
      </RevealGroup>
    </div>
  );
}
