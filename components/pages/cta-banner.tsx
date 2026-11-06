import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

const points = ['No obligation to accept a quotation', 'Document checklists adapt to each product', 'Every AI flag is reviewed by a person'];

export function CtaBanner({ title = 'Ready to move your trade finance forward?', text = 'Create your account, upload your trade documents and let participating lenders review your application.' }: { title?: string; text?: string }) {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="surface-dark on-dark noise relative mx-auto max-w-7xl rounded-[2rem] px-6 py-12 sm:px-12 sm:py-16">
        <div className="grid-lines absolute inset-0 rounded-[2rem]" aria-hidden />
        <div className="aurora-blob -right-20 -top-24 h-80 w-80 bg-brand-sky/25" aria-hidden />
        <Image
          src="/tradeExchange.png"
          alt=""
          width={341}
          height={285}
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-10 hidden w-[340px] opacity-[0.07] brightness-0 invert motion-safe:animate-float-slow md:block"
        />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="eyebrow eyebrow-dark">Get started</span>
            <h2 className="mt-3 max-w-2xl text-h2 font-semibold text-white">{title}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-light btn-lg">Create your account<ArrowRight className="h-4 w-4" /></Link>
              <Link href="/contact" className="btn-ghost-dark btn-lg">Talk to our team</Link>
            </div>
          </div>
          <ul className="space-y-3">
            {points.map((p) => (
              <li key={p} className="card-dark flex items-center gap-3 px-4 py-3.5 text-sm text-white/85">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-turquoise/20 text-[#5fd6c4]"><Check className="h-3.5 w-3.5" /></span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
