import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';

const links = [
  { l: 'Finance products', h: '/finance', d: 'Trade, supply chain and corporate finance' },
  { l: 'Platform', h: '/platform', d: 'Six connected modules' },
  { l: 'E-Docs', h: '/documents', d: 'Trade document templates' },
  { l: 'Resources', h: '/resources', d: 'Plain-language guides' },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="surface-dark on-dark noise flex min-h-[80vh] items-center pb-16 pt-28">
        <div className="grid-lines absolute inset-0" aria-hidden />
        <div className="aurora-blob left-1/2 top-0 h-96 w-96 -translate-x-1/2 bg-brand-blue/30" aria-hidden />
        <div className="relative mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-[#8cc8f0]"><Compass className="h-7 w-7" /></span>
          <p className="mt-6 font-mono text-sm tracking-[0.2em] text-[#8cc8f0]">ERROR 404</p>
          <h1 className="mt-3 text-display-sm font-semibold text-white">This page is off the shipping route</h1>
          <p className="mx-auto mt-4 max-w-md text-white/65">It may have moved or never existed. Try one of these destinations instead.</p>
          <div className="mt-10 grid gap-3 text-left sm:grid-cols-2">
            {links.map((x) => (
              <Link key={x.h} href={x.h} className="card-dark group flex items-center justify-between p-4 transition hover:border-white/25 hover:bg-white/[0.08]">
                <span><span className="block font-semibold text-white">{x.l}</span><span className="text-sm text-white/55">{x.d}</span></span>
                <ArrowRight className="h-4 w-4 text-white/60 transition group-hover:translate-x-1 group-hover:text-white" />
              </Link>
            ))}
          </div>
          <Link href="/" className="btn-light mt-8">Back to home</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
