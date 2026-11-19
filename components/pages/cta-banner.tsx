import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { P } from "@/lib/photos"; // Make sure this path is correct for your project

const points = [
  "No obligation to accept a quotation",
  "Document checklists adapt to each product",
  "Every AI flag is reviewed by a person",
];

export function CtaBanner({
  title = "Ready to move your trade finance forward?",
  text = "Create your account, upload your trade documents and let participating lenders review your application.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-[#fcfaf8] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      {/* Main Card Container */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#07152e] px-6 py-12 shadow-2xl sm:px-12 sm:py-16">
        {/* === BACKGROUND IMAGE LAYER === */}
        <div className="absolute inset-0 z-0">
          {/* Replace P.meetingTable with your desired image URL if needed */}
          <Image
            src={P.meetingTable}
            alt=""
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          {/* Dark gradient overlay to ensure text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07152e] via-[#07152e]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07152e] via-transparent to-transparent" />
        </div>

        {/* Subtle grid pattern for texture */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />

        {/* Warm glow blobs that drift slowly */}
        <div
          className="aurora-blob -right-20 -top-24 z-0 h-80 w-80 bg-[#FA7F63]/25"
          aria-hidden
        />
        <div
          className="aurora-blob -bottom-28 left-1/3 z-0 h-72 w-72 bg-[#FDB9A8]/20 [animation-delay:-8s]"
          aria-hidden
        />

        {/* === CONTENT LAYER === */}
        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="mt-4 max-w-2xl font-heading text-2xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {text}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="https://dashboard.rbktradexchange.com/auth/sign-up"
                className="btn-primary btn-lg"
              >
                Create your account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Talk to our team
              </Link>
            </div>
          </div>

          {/* List items on the right */}
          <ul className="space-y-3">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white/90 backdrop-blur-md transition duration-300 hover:translate-x-1 hover:border-[#FA7F63]/50 hover:bg-black/50"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FA7F63]/20 text-[#FDB9A8]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
