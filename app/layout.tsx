import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-geist', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  title: 'RBK TradeXchange — AI-Powered Trade Finance Technology Platform',
  description:
    'RBK TradeXchange is an Indian import-export trade-finance technology platform. Manage trade documents, business finance workflows, lender quotations, AI document analysis, and e-documents — all in one place.',
  keywords: [
    'RBK TradeXchange',
    'trade finance',
    'import export',
    'document analysis',
    'letter of credit',
    'business finance',
    'India trade',
  ],
  openGraph: {
    title: 'RBK TradeXchange — AI-Powered Trade Finance Technology Platform',
    description:
      'Manage trade documents, business finance workflows, lender quotations, AI document analysis, and e-documents — all in one place.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RBK TradeXchange — AI-Powered Trade Finance Technology Platform',
    description:
      'Manage trade documents, business finance workflows, lender quotations, AI document analysis, and e-documents.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}