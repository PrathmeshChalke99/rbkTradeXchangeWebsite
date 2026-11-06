/**
 * Central content store for every dynamic page on the site.
 *   /finance/[category]/[product]   -> categories[].products[]
 *   /platform/[slug]                -> modules[]
 *   /documents/[slug]               -> eDocs[]
 *   /resources/[slug]               -> resources[]
 * `image` = real photo URL (Pexels), `fallback` = bundled illustration used if the photo fails.
 */
import { P } from './photos';

export const IMG = {
  hero: '/images/hero-harbour.svg',
  cta: '/images/cta-banner.svg',
  preShipment: '/images/pre-shipment.svg',
  postShipment: '/images/post-shipment.svg',
  lc: '/images/lc-discounting.svg',
  workingCapital: '/images/working-capital.svg',
  termLoan: '/images/term-loan.svg',
  supplyChain: '/images/supply-chain.svg',
  factoring: '/images/invoice-factoring.svg',
  exportCredit: '/images/export-credit.svg',
  aiDocs: '/images/ai-documents.svg',
  network: '/images/network.svg',
  lenders: '/images/lenders.svg',
  eDocs: '/images/e-docs.svg',
  responsible: '/images/responsible-ai.svg',
};

/* ------------------------------------------------------------------ */
/* FINANCE: 3 categories -> 11 products -> 34 sub-products             */
/* ------------------------------------------------------------------ */
export type Sub = { name: string; desc: string };
export type Product = {
  slug: string; value: string; name: string; tagline: string; summary: string;
  portalPath: string; features: string[]; subs: Sub[]; bestFor: string[]; mechanism: string[]; docs: string[];
  faqs: { q: string; a: string }[]; image: string; fallback: string;
};
export type Category = {
  slug: string; id: string; name: string; short: string; description: string; stage: string;
  color: string; bg: string; image: string; fallback: string;
  products: Product[];
};

export const considerations = [
  'Eligibility, pricing, tenure and security are decided independently by each participating lender.',
  'Complete, consistent documents make review faster.',
  'Charges and terms vary by structure, so compare quotations before you accept.',
];

const KYC = 'KYC documents';
const CO = 'Company documents';
const S = (name: string, desc: string): Sub => ({ name, desc });

const trade: Product[] = [
  { slug: 'export-trade-finance', value: 'export_trade_finance', name: 'Export Trade Finance', portalPath: '/apply-for-trade-finance',
    tagline: 'Finance your export receivables and expand globally.',
    summary: 'Funding for exporters at every step, from buying and packing goods before shipment to getting paid early on export invoices after shipment.',
    features: ['Fast approval', 'Competitive rates', 'Global reach'],
    subs: [S('Pre Shipment', 'Working capital to buy, produce and pack goods against a confirmed export order or LC.'), S('Post Shipment', 'Funding after shipment against export documents, until the overseas buyer pays.'), S('Invoice Discounting', 'An advance on export invoices so you are not waiting out the buyer’s credit period.')],
    bestFor: ['Manufacturers and merchant exporters', 'Businesses with confirmed export orders', 'Exporters offering credit terms to overseas buyers'],
    mechanism: ['Win a confirmed export order or LC', 'Lender funds production and packing', 'Ship goods and submit documents for early payment', 'Buyer’s payment repays the lender'],
    docs: [KYC, CO, 'P&L statements', 'Provisional financials', 'Export order or LC'],
    faqs: [{ q: 'Do I need a confirmed order?', a: 'Pre-shipment products are normally linked to a confirmed order or LC. Your lender will confirm what it needs.' }, { q: 'Can I finance after shipping too?', a: 'Yes. Post-shipment finance and invoice discounting cover the period between shipment and payment.' }],
    image: P.portSunset, fallback: IMG.preShipment },
  { slug: 'import-trade-finance', value: 'import_trade_finance', name: 'Import Trade Finance', portalPath: '/apply-for-trade-finance',
    tagline: 'Streamline import payments with flexible financing.',
    summary: 'Funding that lets importers pay overseas suppliers on time while keeping their own cash free for operations.',
    features: ['Flexible terms', 'Multiple currencies', 'Quick disbursement'],
    subs: [S('Buyer Credit', 'A loan from an overseas lender to pay for imports, repaid at a later date.'), S('Supplier Credit', 'Your overseas supplier extends payment terms, often supported by a bank.'), S('Import Finance', 'Funding to pay for imported goods and manage the payment cycle.')],
    bestFor: ['Importers of raw material and goods', 'Businesses paying overseas suppliers in foreign currency', 'Firms that want longer payment cycles'],
    mechanism: ['Agree terms with your overseas supplier', 'Lender arranges funding for the import payment', 'Goods arrive and are cleared', 'You repay the lender on the agreed date'],
    docs: [KYC, CO, 'Purchase order or proforma invoice', 'Import documents', 'Financial statements'],
    faqs: [{ q: 'Is foreign-currency funding available?', a: 'Many structures are offered in foreign currency. Currency risk and regulatory norms apply, so discuss hedging with your lender.' }, { q: 'How fast is disbursement?', a: 'Timelines depend on the lender and structure, and on how complete your documents are.' }],
    image: P.cargoFleet, fallback: IMG.postShipment },
  { slug: 'lc-solutions', value: 'lc_solutions', name: 'Letter of Credit Solutions', portalPath: '/apply-for-lc',
    tagline: 'Secure international trade with LC services.',
    summary: 'Services built around the letter of credit: opening one, getting it confirmed, and receiving the proceeds early through discounting.',
    features: ['Risk mitigation', 'Global acceptance', 'Expert advisory'],
    subs: [S('LC Discounting', 'Receive LC proceeds early, before the maturity date.'), S('Confirmation', 'A second bank adds its payment undertaking, reducing issuing-bank and country risk.'), S('Confirmation + Discounting', 'Combine a confirmed LC with early payment for certainty and liquidity.'), S('Issuance', 'Open a letter of credit in favour of your supplier.'), S('Bank Guarantee', 'A bank’s undertaking to pay if you fail to meet a contractual obligation.')],
    bestFor: ['Exporters paid under LCs', 'Importers who must open LCs for suppliers', 'Businesses trading with new or distant buyers'],
    mechanism: ['LC is issued by the buyer’s bank', 'Optionally, a second bank confirms it', 'You present compliant documents', 'Proceeds are paid at maturity, or early through discounting'],
    docs: [KYC, CO, 'LC draft', 'Supporting LC documents'],
    faqs: [{ q: 'What does confirmation do?', a: 'A confirming bank adds its own payment undertaking, so you are protected even if the issuing bank or its country fails to pay.' }, { q: 'Why do LCs get delayed?', a: 'Mostly document discrepancies against LC terms. Check every document before submission.' }],
    image: P.meetingTable, fallback: IMG.lc },
  { slug: 'trade-guarantees', value: 'trade_guarantees', name: 'Trade Guarantees', portalPath: '/apply-for-lc',
    tagline: 'Secure your trade commitments with guarantees.',
    summary: 'Bank-backed assurances that you will perform your contract or make a payment, so counterparties can trade with confidence.',
    features: ['Bank guarantees', 'Performance bonds', 'Bid bonds'],
    subs: [S('SBLC', 'A standby letter of credit that acts as a payment backstop if the applicant defaults.'), S('BG', 'A bank guarantee securing obligations such as payments or deliveries.'), S('Performance Guarantee', 'Assures the buyer that you will deliver the contract as agreed.')],
    bestFor: ['Contractors and suppliers bidding for large orders', 'Businesses asked for security by buyers', 'Firms entering new markets'],
    mechanism: ['Counterparty asks for a guarantee', 'Lender assesses your standing and the contract', 'Guarantee is issued in the beneficiary’s favour', 'It lapses on completion or is invoked on default'],
    docs: [KYC, CO, 'Contract or tender document', 'Financial statements'],
    faqs: [{ q: 'SBLC or bank guarantee?', a: 'Both secure obligations. An SBLC follows letter-of-credit rules and is common in international trade; a bank guarantee is often used domestically.' }, { q: 'Is margin money required?', a: 'Often some security or margin is required. Terms depend on the lender and your profile.' }],
    image: P.suitsWindow, fallback: IMG.responsible },
];
const domestic: Product[] = [
  { slug: 'supplier-finance', value: 'supplier_finance', name: 'Domestic Supplier Finance', portalPath: '/apply-for-trade-finance',
    tagline: 'Optimise your supply chain with supplier financing.',
    summary: 'Programmes that keep suppliers, vendors and dealers funded so goods keep moving and relationships stay strong.',
    features: ['Supplier relationships', 'Inventory optimization', 'Working capital'],
    subs: [S('SID / PID', 'Invoice discounting programmes for the selling and buying side of a supply chain.'), S('Vendor Discounting', 'Suppliers get paid early on invoices approved by an anchor buyer.'), S('Dealer Finance', 'Working capital for dealers to stock and sell a manufacturer’s products.')],
    bestFor: ['Anchor buyers with many suppliers', 'Dealers and distributors carrying stock', 'Suppliers waiting on long payment cycles'],
    mechanism: ['Anchor buyer approves invoices or limits', 'Lender funds suppliers or dealers early', 'Goods are supplied and sold', 'Anchor or dealer repays on the due date'],
    docs: [KYC, CO, 'Approved invoices', 'Supply or dealer agreement'],
    faqs: [{ q: 'Who starts a programme?', a: 'Usually the anchor buyer or manufacturer, who invites suppliers and dealers onto the lender’s programme.' }, { q: 'Why can pricing be lower?', a: 'Repayment can rest on the stronger anchor’s credit standing rather than the smaller supplier’s.' }],
    image: P.warehouseWorkers, fallback: IMG.supplyChain },
  { slug: 'invoice-finance', value: 'invoice_finance', name: 'Invoice Finance', portalPath: '/apply-for-trade-finance',
    tagline: 'Unlock cash from your unpaid invoices.',
    summary: 'Turn invoices and bills into cash today instead of waiting for customers to pay.',
    features: ['Quick cash flow', 'No collateral', 'Online management'],
    subs: [S('Invoice Discounting', 'Borrow against unpaid invoices and receive cash now.'), S('Bill Discounting', 'Early payment against bills of exchange raised on your buyers.'), S('Vendor Programs', 'Structured early-payment programmes for suppliers of an anchor buyer.'), S('Distributor Programs', 'Credit lines that help distributors buy inventory and pay on time.')],
    bestFor: ['Businesses with many credit sales', 'Companies with lumpy cash flow', 'Growing firms without hard collateral'],
    mechanism: ['Raise invoices on your customers', 'Lender advances a share of the value', 'Customer pays on the due date', 'Balance is released after charges'],
    docs: [KYC, CO, 'Invoices or bills', 'Customer ledger'],
    faqs: [{ q: 'How much of an invoice is advanced?', a: 'A portion of the invoice value, decided by the lender based on your buyer and profile. The balance follows on payment.' }, { q: 'Is collateral needed?', a: 'Receivables themselves are often the main security, but each lender sets its own requirements.' }],
    image: P.chartNotes, fallback: IMG.factoring },
];
const corporate: Product[] = [
  { slug: 'working-capital-finance', value: 'working_capital_finance', name: 'Working Capital Finance', portalPath: '/apply-for-trade-finance',
    tagline: 'Manage day-to-day operations with flexible capital.',
    summary: 'Revolving and short-term facilities that cover the gap between paying for inputs and collecting from customers.',
    features: ['Flexible limits', 'Interest only on used amount', 'Quick access'],
    subs: [S('CC', 'Cash credit: a revolving limit usually secured against stock and receivables.'), S('OD', 'Overdraft: draw above your balance up to a sanctioned limit.'), S('WCL', 'Working capital loan: a short-term loan sized to your operating cycle.')],
    bestFor: ['Businesses with seasonal demand', 'Companies holding stock or receivables', 'Firms needing flexible drawdown'],
    mechanism: ['Lender assesses your operating cycle', 'A limit or loan is sanctioned', 'You draw and repay as cash moves', 'Limit is reviewed periodically'],
    docs: [KYC, CO, 'Financial statements', 'Bank statements', 'Stock and debtor statements'],
    faqs: [{ q: 'What is drawing power?', a: 'The most you can draw at a point in time, worked out from eligible stock and receivables within your sanctioned limit.' }, { q: 'Cash credit or overdraft?', a: 'Both revolve. Cash credit is typically secured against current assets; overdraft can be secured or unsecured depending on the lender.' }],
    image: P.financeDesk2, fallback: IMG.workingCapital },
  { slug: 'short-term-loans', value: 'short_term_loans', name: 'Short-Term Loans', portalPath: '/apply-for-trade-finance',
    tagline: 'Bridge funding for immediate business needs.',
    summary: 'Quick, fixed-tenure funding for a specific near-term need such as an order, a payment or a timing gap.',
    features: ['Fast approval', 'Competitive rates', 'Flexible tenure'],
    subs: [S('Bridge Loan', 'Interim funding until a longer-term source or receipt arrives.'), S('STL', 'A short-term loan for immediate needs, with a fixed tenure.')],
    bestFor: ['Businesses awaiting a large receipt', 'Firms funding a one-off order', 'Companies covering a temporary gap'],
    mechanism: ['Define the need and expected repayment source', 'Lender assesses and sanctions', 'Funds are disbursed', 'Loan is repaid at the end of its tenure'],
    docs: [KYC, CO, 'Financial statements', 'Bank statements'],
    faqs: [{ q: 'How long can a short-term loan run?', a: 'Tenures are short, usually months rather than years. The lender sets the exact period.' }, { q: 'What is the repayment source?', a: 'Lenders usually want a clear source, such as a receipt, a refinance or sale proceeds.' }],
    image: P.tabletMan, fallback: IMG.lenders },
  { slug: 'term-asset-finance', value: 'term_asset_finance', name: 'Term & Asset Finance', portalPath: '/apply-for-trade-finance',
    tagline: 'Long-term funding for assets and expansion.',
    summary: 'Multi-year loans for growth, machinery and property-backed funding, repaid through scheduled instalments.',
    features: ['Long tenure', 'Asset-backed', 'Competitive rates'],
    subs: [S('Term Loan', 'A fixed-tenure loan for expansion and long-term investment.'), S('Machinery', 'Finance to buy plant and machinery, with the asset as security.'), S('LAP', 'Loan against property: funds raised against owned real estate.')],
    bestFor: ['Manufacturers buying machinery', 'Businesses expanding capacity', 'Owners with property to leverage'],
    mechanism: ['Present the project or asset', 'Lender appraises repayment capacity', 'Loan is disbursed in one or more tranches', 'Instalments repay principal and interest'],
    docs: [KYC, CO, 'Audited financials', 'Project report or quotation', 'Property or asset papers'],
    faqs: [{ q: 'How long can the tenure be?', a: 'Several years, depending on the asset and lender.' }, { q: 'Can I prepay?', a: 'Often yes, sometimes with charges. Check the sanction terms.' }],
    image: P.chicagoTowers, fallback: IMG.termLoan },
  { slug: 'cre-finance', value: 'cre_finance', name: 'Commercial Real Estate Finance', portalPath: '/apply-for-trade-finance',
    tagline: 'Finance for commercial property investments.',
    summary: 'Large, long-tenure funding to buy, build or refinance commercial property, or to raise funds against rental income.',
    features: ['High value', 'Long tenure', 'Property-backed'],
    subs: [S('CRE', 'Finance to buy, build or refinance commercial property.'), S('Lease Rental Discounting', 'Raise funds against future rentals from leased property.')],
    bestFor: ['Owners of leased commercial property', 'Developers and investors', 'Businesses buying their own premises'],
    mechanism: ['Property and cash flows are valued', 'Lender structures the facility', 'Funds are disbursed against the property', 'Rentals or business cash flows service the loan'],
    docs: [KYC, CO, 'Property documents', 'Lease agreements', 'Financial statements'],
    faqs: [{ q: 'How is lease rental discounting repaid?', a: 'Future rentals from tenants are used to service the loan, so lease quality matters a lot.' }, { q: 'What do lenders value?', a: 'Property title, location, tenants, lease terms and your overall financial standing.' }],
    image: P.financialDistrict, fallback: IMG.termLoan },
  { slug: 'structured-finance', value: 'structured_finance', name: 'Structured Finance', portalPath: '/apply-for-trade-finance',
    tagline: 'Custom financing solutions for complex needs.',
    summary: 'Tailored debt for larger or more complex requirements, from overseas borrowing to project funding and venture debt.',
    features: ['Custom solutions', 'Expert advisory', 'Large funding'],
    subs: [S('ECB', 'External commercial borrowing from overseas lenders, subject to regulatory norms.'), S('Project Finance', 'Long-term funding for a project, repaid from its own cash flows.'), S('Venture Debt', 'Debt for high-growth, typically venture-backed companies, alongside equity.')],
    bestFor: ['Large or complex funding needs', 'Infrastructure and project sponsors', 'High-growth, venture-backed companies'],
    mechanism: ['Needs are mapped with an adviser', 'A structure is designed with lenders', 'Terms are negotiated and documented', 'Funds are drawn and repaid per the structure'],
    docs: [KYC, CO, 'Audited financials', 'Project report or business plan', 'Cap table or sponsor details'],
    faqs: [{ q: 'Who is structured finance for?', a: 'Businesses whose needs do not fit standard products, usually larger or more complex requirements.' }, { q: 'Are there regulatory limits on ECB?', a: 'Yes. ECB is regulated, so eligibility, end-use and pricing norms apply. Take professional advice.' }],
    image: P.teamReports, fallback: IMG.exportCredit },
];

export const categories: Category[] = [
  { slug: 'international-trade-finance', id: 'international_trade_finance', name: 'International Trade Finance', short: 'Cross-border import & export financing.', stage: 'Import & export',
    description: 'Fund every stage of cross-border trade, from export orders and import payments to letters of credit and guarantees.',
    color: '#1d5fd6', bg: '#e2ecfa', image: P.shipAerial, fallback: IMG.hero, products: trade },
  { slug: 'domestic-supply-chain-finance', id: 'domestic_supply_chain_finance', name: 'Domestic Supply Chain Finance', short: 'Receivable & payable financing within India.', stage: 'Domestic chain',
    description: 'Keep suppliers, dealers and distributors funded with invoice and supplier finance across your domestic supply chain.',
    color: '#0f9a8a', bg: '#ddf4ee', image: P.warehouseWide, fallback: IMG.supplyChain, products: domestic },
  { slug: 'corporate-finance', id: 'corporate_finance', name: 'Business / Corporate Finance', short: 'Working capital, loans & structured funding.', stage: 'Corporate funding',
    description: 'Working capital, short-term loans, term and asset finance, commercial real estate and structured debt for growing businesses.',
    color: '#4c5fd5', bg: '#eceffb', image: P.londonOffice, fallback: IMG.workingCapital, products: corporate },
];

export const allProducts = categories.flatMap((c) => c.products.map((p) => ({ ...p, category: c })));
export const allSubs = allProducts.flatMap((p) => p.subs.map((s) => ({ ...s, product: p.name })));
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (cat: string, slug: string) => {
  const c = getCategory(cat);
  const p = c?.products.find((x) => x.slug === slug);
  return c && p ? { category: c, product: p } : undefined;
};

/* ------------------------------------------------------------------ */
/* PLATFORM MODULES                                                    */
/* ------------------------------------------------------------------ */
export type Module = {
  photo?: string; slug: string; name: string; short: string; headline: string; intro: string; image: string;
  color: string; bg: string; icon: string; highlights: string[]; steps: string[]; embed?: 'ai' | 'quotes';
};
export const modules: Module[] = [
  { slug: 'ai-document-analysis', name: 'AI Document Analysis', icon: 'ScanLine', color: '#1d5fd6', bg: '#e2ecfa', image: IMG.aiDocs, embed: 'ai',
    short: 'Extract fields, cross-check documents and flag discrepancies.',
    headline: 'Catch document errors before a lender does.',
    intro: 'Upload invoices, packing lists, bills of lading, purchase orders and LCs. The platform extracts key fields, compares them across documents and trade history, and highlights mismatches for your team to review.',
    highlights: ['Field extraction across trade documents', 'Cross-document consistency checks', 'Comparison with previous trade history', 'Severity-labelled discrepancy report'],
    steps: ['Choose import or export and upload documents', 'AI extracts and cross-checks fields', 'Review matches, warnings and discrepancies', 'Fix issues and proceed to finance'] },
  { slug: 'business-finance', name: 'Business Finance', icon: 'Landmark', color: '#4c5fd5', bg: '#eceffb', image: IMG.preShipment,
    short: 'Apply for debt finance with requirements that adapt to each product.',
    headline: 'One application flow, tailored to every product.',
    intro: 'Choose a finance category and product, and the checklist of KYC, company and financial documents adapts automatically. Submit once and let participating lenders review.',
    highlights: ['Adaptive document checklists', 'Applicant and co-applicant flows', 'KYC upload and verification status', 'Application tracking timeline'],
    steps: ['Pick a category and product', 'Upload required documents', 'Submit for lender review', 'Track status in your dashboard'] },
  { slug: 'network-management', name: 'Network Management', icon: 'Share2', color: '#0f9a8a', bg: '#ddf4ee', image: IMG.network,
    short: 'Map buyers, suppliers and logistics partners.',
    headline: 'See your whole trade network in one view.',
    intro: 'Build a living map of the buyers, suppliers and logistics partners behind your shipments, and keep their details ready for documents and finance applications.',
    highlights: ['Interactive relationship graph', 'Colour-coded partner types', 'Contextual partner details', 'Reusable partner data in e-docs'],
    steps: ['Add partners with key details', 'Group by buyer, supplier or logistics', 'Open a partner to see context', 'Reuse data across documents'] },
  { slug: 'lender-quotations', name: 'Lender Quotations', icon: 'Handshake', color: '#b7700b', bg: '#fdf3da', image: IMG.lenders, embed: 'quotes',
    short: 'Compare quotations from participating lenders.',
    headline: 'Quotes side by side, decision in your hands.',
    intro: 'Participating lenders review your application independently and respond with quotations. Track every response, compare terms and accept or reject on your own timeline.',
    highlights: ['Quotation dashboard with live status', 'Accept or reject actions', 'Estimated application-to-lender fit', 'Full application timeline'],
    steps: ['Submit your application', 'Lenders review independently', 'Compare quotation terms', 'Accept the offer that fits'] },
  { slug: 'e-docs-studio', name: 'E-Docs Studio', icon: 'FilePlus', color: '#0b78bf', bg: '#e3f1fb', image: IMG.eDocs,
    short: 'Generate trade paperwork from templates.',
    headline: 'Trade paperwork that starts ready.',
    intro: 'Create proforma invoices, contracts, purchase orders, export invoices and packing lists from templates that pull in your company and partner information.',
    highlights: ['Six ready templates', 'Live preview while you type', 'Company and partner data pre-filled', 'Export-ready output'],
    steps: ['Choose a template', 'Select company and partner', 'Edit fields with live preview', 'Download or share'] },
  { slug: 'responsible-ai', name: 'Responsible AI', icon: 'ShieldCheck', color: '#4c5fd5', bg: '#eceffb', image: IMG.responsible,
    short: 'AI that assists professionals and never replaces them.',
    headline: 'Helpful AI, with humans in charge.',
    intro: 'Every AI feature is clearly labelled. AI helps with document checks and fit estimates, but professional review and the lender\u2019s final decision always come first.',
    highlights: ['AI features clearly labelled', 'Sample data marked as such', 'No automated loan decisions', 'Human review at every stage'],
    steps: ['AI flags potential issues', 'You review each flag', 'Professionals confirm', 'Lenders make the final call'] },
];
export const getModule = (slug: string) => modules.find((m) => m.slug === slug);

/* ------------------------------------------------------------------ */
/* E-DOCS                                                              */
/* ------------------------------------------------------------------ */
export type EDoc = { photo?: string; slug: string; name: string; short: string; color: string; bg: string; usedWhen: string; fields: string[]; tips: string[]; label: string };
export const eDocs: EDoc[] = [
  { slug: 'proforma-invoice', name: 'Proforma Invoice', label: 'PROFORMA', color: '#1d5fd6', bg: '#e2ecfa', short: 'A preliminary quote sent before shipment.', usedWhen: 'Sent to a buyer before an order is confirmed, often to arrange payment or open an LC.', fields: ['Seller and buyer details', 'Item description, quantity and unit price', 'Incoterms and delivery terms', 'Payment terms and bank details', 'Validity period'], tips: ['Keep descriptions identical to the later commercial invoice', 'State the validity date clearly', 'Include Incoterms to avoid disputes'] },
  { slug: 'sales-contract', name: 'Sales Contract', label: 'SALES CONTRACT', color: '#4c5fd5', bg: '#eceffb', short: 'The agreement between exporter and buyer.', usedWhen: 'Signed once price and terms are agreed, forming the legal basis for the trade.', fields: ['Parties and addresses', 'Goods, quantity and specification', 'Price, currency and payment terms', 'Shipment and delivery terms', 'Dispute resolution and governing law'], tips: ['Align terms with any LC to be issued', 'Specify inspection and quality standards', 'Define governing law and jurisdiction'] },
  { slug: 'purchase-contract', name: 'Purchase Contract', label: 'PURCHASE CONTRACT', color: '#0f9a8a', bg: '#ddf4ee', short: 'The agreement with your own supplier.', usedWhen: 'Used when a trader or exporter buys goods from a supplier to fulfil a customer order.', fields: ['Supplier and buyer details', 'Product specification', 'Price and payment schedule', 'Delivery timeline', 'Penalties and warranties'], tips: ['Back-to-back the dates with the sales contract', 'Agree quality checks before shipment', 'Record packaging requirements'] },
  { slug: 'purchase-order', name: 'Purchase Order', label: 'PURCHASE ORDER', color: '#b7700b', bg: '#fdf3da', short: 'A buyer\u2019s formal order for goods.', usedWhen: 'Issued by a buyer to confirm a purchase; lenders often use it to support pre-shipment finance.', fields: ['PO number and date', 'Item list with quantities and prices', 'Delivery address and date', 'Payment terms', 'Authorised signatory'], tips: ['Keep PO numbers unique', 'Reference the PO on all later documents', 'Confirm delivery dates are realistic'] },
  { slug: 'export-invoice', name: 'Export Invoice', label: 'EXPORT INVOICE', color: '#0b78bf', bg: '#e3f1fb', short: 'The commercial invoice for an export shipment.', usedWhen: 'Raised at shipment; it supports customs clearance, payment and post-shipment finance.', fields: ['Invoice number and date', 'Exporter, consignee and notify party', 'HS codes, quantities and values', 'Incoterms and port details', 'Declaration and signature'], tips: ['HS codes must match other documents', 'Currency and totals must match the LC', 'Use consistent party names everywhere'] },
  { slug: 'packing-list', name: 'Packing List', label: 'PACKING LIST', color: '#4c5fd5', bg: '#eceffb', short: 'A detailed breakdown of what is in each package.', usedWhen: 'Accompanies the shipment so customs, carriers and buyers can verify contents.', fields: ['Invoice and PO references', 'Package counts and types', 'Net and gross weights', 'Dimensions and marks', 'Container or vehicle details'], tips: ['Weights should reconcile with the bill of lading', 'Mark packages consistently', 'Match item descriptions to the invoice'] },
];
export const getDoc = (slug: string) => eDocs.find((d) => d.slug === slug);

/* ------------------------------------------------------------------ */
/* RESOURCES (articles)                                                */
/* ------------------------------------------------------------------ */
export type Article = { photo?: string; slug: string; title: string; excerpt: string; tag: string; image: string; read: string; related: string; sections: { h: string; p: string }[] };
export const resources: Article[] = [
  { slug: 'what-is-packing-credit', title: 'What is packing credit and who is it for?', tag: 'Pre-shipment', image: '/images/res-packing-credit.svg', read: '4 min read', related: '/finance/international-trade-finance/export-trade-finance',
    excerpt: 'How exporters fund production before the money arrives.',
    sections: [
      { h: 'The problem it solves', p: 'Exporters usually have to buy material, pay workers and pack goods weeks before a buyer pays. Packing credit bridges that gap with short-term funding linked to a confirmed order or LC.' },
      { h: 'How it works', p: 'You show the lender a confirmed export order. The lender advances funds for production and packing, you ship the goods, and the export proceeds repay the advance.' },
      { h: 'What lenders look at', p: 'Lenders look at the order, your buyer, your past export performance and your financials. Clear, consistent documents make the review smoother.' },
      { h: 'Before you apply', p: 'Prepare KYC, company documents and recent financials, and make sure order details match across every paper. A platform checklist can save days.' },
    ] },
  { slug: 'lc-discounting-explained', title: 'LC discounting, explained simply', tag: 'LC finance', image: '/images/res-lc-discounting.svg', read: '5 min read', related: '/finance/international-trade-finance/lc-solutions',
    excerpt: 'Get paid now for an LC that matures later.',
    sections: [
      { h: 'Start with the letter of credit', p: 'A letter of credit is a bank\u2019s promise to pay an exporter when compliant documents are presented. Usance LCs promise payment at a later date.' },
      { h: 'What discounting adds', p: 'Instead of waiting for maturity, you ask a lender to pay you early. The lender deducts a discount and collects from the issuing bank later.' },
      { h: 'Why documents matter', p: 'The bank pays only against documents that match the LC terms. Even small discrepancies, such as a name or date mismatch, can delay payment.' },
      { h: 'Reducing the risk', p: 'Check documents against the LC before submission. AI-assisted discrepancy checks help spot issues, but professional review is still essential.' },
    ] },
  { slug: 'invoice-discounting-vs-factoring', title: 'Invoice discounting vs factoring', tag: 'Receivables', image: '/images/res-invoice-discounting.svg', read: '4 min read', related: '/finance/domestic-supply-chain-finance/invoice-finance',
    excerpt: 'Two ways to turn invoices into cash, and how they differ.',
    sections: [
      { h: 'Same goal, different structure', p: 'Both release cash tied up in unpaid invoices. The difference lies mainly in who collects the money and how visible the arrangement is to customers.' },
      { h: 'Invoice discounting', p: 'You borrow against your invoices and usually keep managing collections yourself. It is often more discreet and suits businesses with strong credit control.' },
      { h: 'Factoring', p: 'You sell the invoices to a factor, who often handles collections too. That can save effort but customers typically know a third party is involved.' },
      { h: 'Choosing between them', p: 'Consider cost, control, customer relationships and whether you want recourse. Compare quotations before deciding.' },
    ] },
  { slug: 'managing-the-working-capital-cycle', title: 'Managing the working capital cycle', tag: 'Working capital', image: '/images/res-working-capital.svg', read: '5 min read', related: '/finance/corporate-finance/working-capital-finance',
    excerpt: 'Why profitable businesses still run short of cash.',
    sections: [
      { h: 'Profit is not cash', p: 'A business can be profitable on paper and still struggle to pay bills if cash is locked in stock or unpaid invoices.' },
      { h: 'The three levers', p: 'Working capital depends on how fast you sell stock, how fast customers pay and how long you take to pay suppliers. Improving any one releases cash.' },
      { h: 'Where debt fits', p: 'Revolving limits, working capital loans and receivables finance smooth the timing gap. Choose the product that matches the source of the gap.' },
      { h: 'Plan ahead', p: 'Forecast cash weekly during busy seasons, and arrange facilities before you urgently need them.' },
    ] },
  { slug: 'export-finance-readiness-checklist', title: 'Export finance readiness checklist', tag: 'Guides', image: '/images/res-export-credit.svg', read: '3 min read', related: '/finance',
    excerpt: 'What to prepare before you approach a lender.',
    sections: [
      { h: 'Know your business papers', p: 'Keep KYC documents, incorporation papers, tax registrations and recent financial statements current and organised in one place.' },
      { h: 'Know your trade papers', p: 'Have purchase orders, invoices, packing lists and shipping documents consistent in names, dates, quantities and values.' },
      { h: 'Know your buyers', p: 'Lenders care about who is paying. Keep buyer details and trade history handy, and note any LC terms.' },
      { h: 'Know your numbers', p: 'Understand your margins, repayment capacity and how much finance you actually need and for how long.' },
    ] },
  { slug: 'understanding-trade-finance-risks', title: 'Understanding trade finance risks', tag: 'Guides', image: '/images/res-trade-risk.svg', read: '5 min read', related: '/platform/responsible-ai',
    excerpt: 'Payment, document and timing risks and how to manage them.',
    sections: [
      { h: 'Payment risk', p: 'A buyer may delay or fail to pay. LCs, credit insurance and buyer due diligence all reduce this exposure.' },
      { h: 'Document risk', p: 'Errors and mismatches can block payment under an LC or delay finance. Careful preparation and checks are your best defence.' },
      { h: 'Timing and currency risk', p: 'Delays in shipment or payment, and currency movements, can squeeze margins. Build buffers into your pricing and plan.' },
      { h: 'Keep humans in the loop', p: 'Technology can flag issues quickly, but experienced professionals and lenders make the final calls.' },
    ] },
];
export const getArticle = (slug: string) => resources.find((r) => r.slug === slug);

/* ------------------------------------------------------------------ */
/* SITE FLOW                                                           */
/* ------------------------------------------------------------------ */
export const flow = [
  { id: '01', title: 'Discover', body: 'Visitors land on the home page, then explore finance products, platform modules and learning resources.', links: [['Home', '/'], ['Finance', '/finance'], ['Platform', '/platform']] },
  { id: '02', title: 'Understand a product', body: 'Each finance category opens into product pages with how it works, documents required, benefits and FAQs.', links: [['Finance category', '/finance/international-trade-finance'], ['Product page', '/finance/international-trade-finance/export-trade-finance']] },
  { id: '03', title: 'Estimate & compare', body: 'The finance estimator and e-doc previews let visitors try numbers and templates before committing.', links: [['Finance estimator', '/finance#estimator'], ['E-Docs', '/documents']] },
  { id: '04', title: 'Choose a plan', body: 'Pricing explains plans and entitlements for the Trade Management portal.', links: [['Pricing', '/pricing'], ['FAQ', '/faq']] },
  { id: '05', title: 'Sign up & apply', body: 'Register, subscribe and enter the portal to manage trades, apply for finance and receive lender quotations.', links: [['Sign up', '/signup'], ['Login', '/login'], ['Contact', '/contact']] },
];

/* photos for modules, documents and articles (illustration in `image` is the fallback) */
const MP: Record<string, string> = { 'ai-document-analysis': P.analyticsTablet, 'business-finance': P.financialDistrict, 'network-management': P.portXiamen, 'lender-quotations': P.suitsWindow, 'e-docs-studio': P.chartNotes, 'responsible-ai': P.londonOffice };
modules.forEach((m) => { m.photo = MP[m.slug]; });
const DP: Record<string, string> = { 'proforma-invoice': P.chartNotes, 'sales-contract': P.meetingOffice, 'purchase-contract': P.warehouseBright, 'purchase-order': P.warehouseWorkers, 'export-invoice': P.portSunrise, 'packing-list': P.warehouseWide };
eDocs.forEach((d) => { d.photo = DP[d.slug]; });
const RP: Record<string, string> = { 'what-is-packing-credit': P.portJakarta, 'lc-discounting-explained': P.meetingTable, 'invoice-discounting-vs-factoring': P.financeDesk, 'managing-the-working-capital-cycle': P.financeDesk2, 'export-finance-readiness-checklist': P.shipSailing, 'understanding-trade-finance-risks': P.shipOcean };
resources.forEach((r) => { r.photo = RP[r.slug]; });
