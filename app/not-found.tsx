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
      <main id="main" className="relative flex min-h-[80vh] items-center bg-white pb-16 pt-28">
        <div className="relative mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-line bg-brand-paleblue text-brand-blue"><Compass className="h-7 w-7" /></span>
          <p className="mt-6 font-mono text-sm tracking-[0.2em] text-brand-blue">ERROR 404</p>
          <h1 className="mt-3 text-display-sm font-semibold text-brand-ink">This page is off the shipping route</h1>
          <p className="mx-auto mt-4 max-w-md text-brand-slate">It may have moved or never existed. Try one of these destinations instead.</p>
          <div className="mt-10 grid gap-3 text-left sm:grid-cols-2">
            {links.map((x) => (
              <Link key={x.h} href={x.h} className="card card-hover group flex items-center justify-between p-4">
                <span><span className="block font-semibold text-brand-ink">{x.l}</span><span className="text-sm text-brand-slate">{x.d}</span></span>
                <ArrowRight className="h-4 w-4 text-brand-slate transition group-hover:translate-x-1 group-hover:text-brand-blue" />
              </Link>
            ))}
          </div>
          <Link href="/" className="btn-primary mt-8">Back to home</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
