import type { MetadataRoute } from 'next';
import { categories, allProducts, modules, eDocs, resources } from '@/lib/content';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ['', '/finance', '/platform', '/how-it-works', '/documents', '/resources', '/pricing', '/faq', '/contact', '/login', '/signup'];
  const dynamic = [
    ...categories.map((c) => `/finance/${c.slug}`),
    ...allProducts.map((p) => `/finance/${p.category.slug}/${p.slug}`),
    ...modules.map((m) => `/platform/${m.slug}`),
    ...eDocs.map((d) => `/documents/${d.slug}`),
    ...resources.map((r) => `/resources/${r.slug}`),
  ];
  return [...fixed, ...dynamic].map((p) => ({ url: base + p, lastModified: new Date() }));
}
