import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { PageExtras } from '@/components/pages/page-extras';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageExtras />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
