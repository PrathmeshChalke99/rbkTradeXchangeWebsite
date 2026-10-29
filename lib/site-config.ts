export const siteConfig = {
  name: 'RBK TradeXchange',
  shortName: 'RBK',
  tagline: 'AI-Powered Trade Finance Technology Platform',
  description:
    'An Indian import-export trade-finance technology platform that helps importers and exporters manage trade documents, business-finance workflows, lender quotations, and e-documents.',
  url: '',
  nav: [
    { label: 'Platform', href: '#platform' },
    { label: 'Workbench', href: '#workbench' },
    { label: 'AI Intelligence', href: '#ai-intelligence' },
    { label: 'Finance', href: '#finance' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  footerNav: {
    Product: [
      { label: 'Platform Capabilities', href: '#platform' },
      { label: 'AI Document Intelligence', href: '#ai-intelligence' },
      { label: 'Business Finance', href: '#finance' },
      { label: 'E-Docs', href: '#e-docs' },
      { label: 'Pricing', href: '#pricing' },
    ],
    Company: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Features', href: '#features' },
      { label: 'Responsible AI', href: '#responsible-ai' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '/contact' },
    ],
    Account: [
      { label: 'Login', href: '/login' },
      { label: 'Sign Up', href: '/signup' },
    ],
  },
};

export const tradeWorkflowSteps = [
  {
    id: '01',
    title: 'Sign Up & Subscribe',
    description:
      'Register your company and choose a subscription plan to access the Trade Management portal with entitlements tailored to your needs.',
    icon: 'UserPlus',
    color: '#2563eb',
    bg: '#dbeafe',
  },
  {
    id: '02',
    title: 'Manage Trades',
    description:
      'Select import or export, upload trade documents, and let AI-assisted analysis extract fields, cross-check data, and flag discrepancies.',
    icon: 'FileSearch',
    color: '#8b5cf6',
    bg: '#ede9fe',
  },
  {
    id: '03',
    title: 'Apply for Finance',
    description:
      'Choose a finance category and subcategory, upload KYC and financial documents, and submit your application for lender review.',
    icon: 'Landmark',
    color: '#5eead4',
    bg: '#d1fae5',
  },
  {
    id: '04',
    title: 'Receive Quotations',
    description:
      'Participating lenders independently review your application and provide quotations based on their own criteria and assessment.',
    icon: 'Handshake',
    color: '#f59e0b',
    bg: '#fef3c7',
  },
  {
    id: '05',
    title: 'Generate E-Docs',
    description:
      'Create proforma invoices, contracts, and packing lists from templates using your company information and partner details.',
    icon: 'FilePlus',
    color: '#ec4899',
    bg: '#fce7f3',
  },
];

export const platformCapabilities = [
  {
    title: 'AI Document Analysis',
    description:
      'Upload trade documents and let AI extract fields, cross-check related documents, compare with trade history, and flag discrepancies.',
    icon: 'ScanLine',
    color: '#2563eb',
    bg: '#dbeafe',
  },
  {
    title: 'Business Finance',
    description:
      'Apply across multiple finance categories and subcategories with requirements that adapt to each product — not a one-size-fits-all checklist.',
    icon: 'Landmark',
    color: '#8b5cf6',
    bg: '#ede9fe',
  },
  {
    title: 'Network Management',
    description:
      'Build and visualize your network of buyers, suppliers, and logistics partners with an interactive relationship graph.',
    icon: 'Share2',
    color: '#5eead4',
    bg: '#d1fae5',
  },
  {
    title: 'Lender Quotations',
    description:
      'Participating lenders independently review your application and provide quotations you can accept or reject — all tracked in a dashboard.',
    icon: 'Handshake',
    color: '#f59e0b',
    bg: '#fef3c7',
  },
  {
    title: 'E-Docs Studio',
    description:
      'Generate proforma invoices, sales contracts, purchase orders, export invoices, and packing lists from your company templates.',
    icon: 'FilePlus',
    color: '#ec4899',
    bg: '#fce7f3',
  },
  {
    title: 'Responsible AI',
    description:
      'AI assists with document checks and assessment — it never replaces professional review or the lender\u2019s final decision.',
    icon: 'ShieldCheck',
    color: '#14b8a6',
    bg: '#ccfbf1',
  },
];

export const documentTypes = [
  { name: 'Commercial Invoice', short: 'CI', color: '#2563eb', bg: '#dbeafe' },
  { name: 'Packing List', short: 'PL', color: '#8b5cf6', bg: '#ede9fe' },
  { name: 'Bill of Lading', short: 'BL', color: '#5eead4', bg: '#d1fae5' },
  { name: 'Purchase Order', short: 'PO', color: '#f59e0b', bg: '#fef3c7' },
  { name: 'Letter of Credit', short: 'LC', color: '#ec4899', bg: '#fce7f3' },
  { name: 'Certificate of Origin', short: 'COO', color: '#14b8a6', bg: '#ccfbf1' },
];

export const analysisResult = {
  matched: [
    { field: 'Invoice Number', value: 'INV-2026-0418', documents: ['Commercial Invoice', 'Packing List'] },
    { field: 'Buyer Name', value: 'Globex Trading Co.', documents: ['Commercial Invoice', 'Purchase Order'] },
    { field: 'Currency', value: 'USD', documents: ['Commercial Invoice', 'Letter of Credit'] },
    { field: 'Total Amount', value: '$48,500.00', documents: ['Commercial Invoice', 'Bill of Lading'] },
  ],
  warnings: [
    {
      field: 'Shipping Date',
      message: 'Packing List date differs from Bill of Lading by 2 days',
      documents: ['Packing List', 'Bill of Lading'],
    },
    {
      field: 'HS Code',
      message: 'HS code format differs between Invoice and Certificate of Origin',
      documents: ['Commercial Invoice', 'Certificate of Origin'],
    },
  ],
  discrepancies: [
    {
      field: 'Consignee Address',
      message: 'Address mismatch between LC and Bill of Lading',
      documents: ['Letter of Credit', 'Bill of Lading'],
    },
  ],
  unchecked: [
    { field: 'Incoterms', message: 'Not present in all documents — manual review recommended' },
    { field: 'Port of Loading', message: 'Field not extracted from Purchase Order' },
  ],
};

export const financeCategories = [
  {
    id: 'pre-shipment',
    name: 'Pre-Shipment Finance',
    color: '#2563eb',
    bg: '#dbeafe',
    subcategories: [
      { name: 'Packing Credit', requires: ['KYC Documents', 'Company Documents', 'P&L Statements', 'Provisional Financials'] },
      { name: 'Pre-Shipment Loan', requires: ['KYC Documents', 'Company Documents', 'Audited Financials', 'Purchase Order'] },
    ],
  },
  {
    id: 'post-shipment',
    name: 'Post-Shipment Finance',
    color: '#8b5cf6',
    bg: '#ede9fe',
    subcategories: [
      { name: 'Invoice Discounting', requires: ['KYC Documents', 'Company Documents', 'Commercial Invoice', 'Bill of Lading'] },
      { name: 'Bill Discounting', requires: ['KYC Documents', 'Company Documents', 'Bill of Lading', 'Letter of Credit'] },
    ],
  },
  {
    id: 'lc',
    name: 'LC Discounting',
    color: '#5eead4',
    bg: '#d1fae5',
    subcategories: [
      { name: 'LC Discounting', requires: ['KYC Documents', 'Company Documents', 'LC Draft', 'Supporting LC Documents'] },
      { name: 'Back-to-Back LC', requires: ['KYC Documents', 'Company Documents', 'LC Draft', 'Provisional Financials'] },
    ],
  },
];

export const sampleNetworkNodes = [
  { id: 'company', label: 'Your Company', type: 'company', x: 50, y: 50 },
  { id: 'buyer-1', label: 'Globex Trading Co.', type: 'buyer', x: 82, y: 22 },
  { id: 'buyer-2', label: 'Initech Imports', type: 'buyer', x: 85, y: 68 },
  { id: 'buyer-3', label: 'Umbrella Exports', type: 'buyer', x: 80, y: 45 },
  { id: 'supplier-1', label: 'Acme Supplies Ltd.', type: 'supplier', x: 18, y: 25 },
  { id: 'supplier-2', label: 'Stark Industries', type: 'supplier', x: 15, y: 70 },
  { id: 'logistics-1', label: 'OceanLink Logistics', type: 'logistics', x: 50, y: 88 },
  { id: 'logistics-2', label: 'FastTrack Freight', type: 'logistics', x: 25, y: 50 },
];

export const sampleQuotations = [
  {
    id: 'q1',
    lender: 'Participating Lender A',
    status: 'Quoted',
    amount: '$48,500',
    rate: '8.5% p.a.',
    tenure: '90 days',
    color: '#2563eb',
    bg: '#dbeafe',
  },
  {
    id: 'q2',
    lender: 'Participating Lender B',
    status: 'Under Review',
    amount: '$48,500',
    rate: '9.2% p.a.',
    tenure: '120 days',
    color: '#8b5cf6',
    bg: '#ede9fe',
  },
  {
    id: 'q3',
    lender: 'Participating Lender C',
    status: 'Pending',
    amount: '—',
    rate: '—',
    tenure: '—',
    color: '#f59e0b',
    bg: '#fef3c7',
  },
];

export const lenderAssessmentNodes = [
  { id: 'lender-a', label: 'Lender A', x: 18, y: 30, fit: 78 },
  { id: 'lender-b', label: 'Lender B', x: 18, y: 70, fit: 62 },
  { id: 'lender-c', label: 'Lender C', x: 50, y: 12, fit: 85 },
  { id: 'lender-d', label: 'Lender D', x: 50, y: 88, fit: 45 },
  { id: 'lender-e', label: 'Lender E', x: 82, y: 40, fit: 71 },
];

export const eDocTemplates = [
  { name: 'Proforma Invoice', icon: 'FileText', color: '#2563eb', bg: '#dbeafe' },
  { name: 'Sales Contract', icon: 'FileSignature', color: '#8b5cf6', bg: '#ede9fe' },
  { name: 'Purchase Contract', icon: 'FileCheck', color: '#5eead4', bg: '#d1fae5' },
  { name: 'Purchase Order', icon: 'ShoppingCart', color: '#f59e0b', bg: '#fef3c7' },
  { name: 'Export Invoice', icon: 'Receipt', color: '#ec4899', bg: '#fce7f3' },
  { name: 'Packing List', icon: 'Package', color: '#14b8a6', bg: '#ccfbf1' },
];

export const faqs = [
  {
    q: 'Is RBK TradeXchange a bank, NBFC, or lender?',
    a: 'No. RBK TradeXchange is a technology platform. It is not a bank, NBFC, or lender. Participating lenders independently assess applications and make their own financing decisions based on their criteria.',
  },
  {
    q: 'Does the AI document analysis guarantee accuracy?',
    a: 'No. AI-assisted document analysis helps extract fields, cross-check information, and flag potential discrepancies — but it does not guarantee perfect accuracy. All results should be reviewed by a human before final decisions are made.',
  },
  {
    q: 'Does the AI client assessment approve my loan?',
    a: 'No. The AI client assessment provides an estimated application-to-lender fit score. It does not make loan approval or rejection decisions. Participating lenders make their own decisions according to their criteria and processes.',
  },
  {
    q: 'Can AI replace professional review of LC documents?',
    a: 'No. AI-assisted LC discrepancy checking helps identify potential inconsistencies across documents, but it does not replace required professional review. All LC documents should be reviewed by qualified professionals.',
  },
  {
    q: 'How are subscription prices determined?',
    a: 'Subscription plans and their entitlements are configured in the application. The pricing shown on this website reflects the current plan configuration. Actual prices, billing options, and entitlements are managed within the platform.',
  },
  {
    q: 'Are the lender names and quotations shown real?',
    a: 'No. All lender names, quotations, and financing outcomes shown in demonstrations are simulated examples clearly labeled as such. They do not represent real lender partnerships or financing offers.',
  },
];

export const features = [
  {
    title: 'Multi-Document AI Analysis',
    description: 'Extract fields, cross-check related documents, compare with trade history, and flag discrepancies — across invoices, packing lists, bills of lading, and more.',
    icon: 'ScanLine',
  },
  {
    title: 'Adaptive Finance Applications',
    description: 'Requirements adapt to each finance product — LC discounting has different document requirements than pre-shipment packing credit, and the UI reflects that.',
    icon: 'Layers',
  },
  {
    title: 'Interactive Network Graph',
    description: 'Visualize and manage buyers, suppliers, and logistics partners in an animated, color-coded relationship graph with contextual detail panels.',
    icon: 'Share2',
  },
  {
    title: 'Lender Quotation Dashboard',
    description: 'Track multiple lender quotations, response statuses, and your accept or reject actions — with a full application-tracking timeline.',
    icon: 'LayoutDashboard',
  },
  {
    title: 'LC Discrepancy Detection',
    description: 'Animated document layers with highlighted fields and severity-labeled discrepancy reports using green, amber, and rose indicators.',
    icon: 'FileWarning',
  },
  {
    title: 'Document Studio',
    description: 'Generate proforma invoices, contracts, and packing lists from templates with an animated paper-unfolding effect and live preview.',
    icon: 'FilePlus',
  },
  {
    title: 'Responsive & Accessible',
    description: 'Works on mobile, tablet, and desktop with keyboard navigation, focus indicators, reduced-motion support, and semantic HTML throughout.',
    icon: 'Accessibility',
  },
  {
    title: 'Responsible AI by Design',
    description: 'Every AI feature is clearly labeled. Sample data is identified as such. AI never replaces professional review or lender decisions.',
    icon: 'ShieldCheck',
  },
];
