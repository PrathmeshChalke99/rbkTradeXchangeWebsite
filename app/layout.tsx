import './globals.css';
import '@fontsource-variable/inter';
import '@fontsource-variable/sora';
import '@fontsource-variable/jetbrains-mono';
import type { Metadata } from 'next';
import { Providers } from '@/components/pages/providers';

const title = 'RBK TradeXchange — Trade Finance Technology for Importers & Exporters';
const description =
  'RBK TradeXchange connects importers and exporters with participating lenders. Manage trade documents, check them with AI, apply for trade and business finance, compare lender quotations and generate e-documents in one workspace.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title,
  description,
  keywords: [
    'RBK TradeXchange',
    'trade finance',
    'import export',
    'letter of credit',
    'LC discounting',
    'invoice financing',
    'packing credit',
    'trade documents',
    'bill of lading',
    'India trade finance',
  ],
  openGraph: { title, description, type: 'website', siteName: 'RBK TradeXchange' },
  twitter: { card: 'summary_large_image', title, description },
  themeColor: '#050f24',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-blue focus:shadow-lift">
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
