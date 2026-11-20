/**
 * Original document formats for the E-Docs studio.
 *
 * Each template shows YOUR format image (/public/formats/<slug>.png) and writes whatever the
 * visitor types into the matching place on it. Positions are percentages of the image
 * (x, y = top-left corner; w, h = size), so they stay correct at any screen size.
 *
 * Adding or fixing a format:
 *   1. Save the image as /public/formats/<slug>.png (PNG or JPG renamed .png is fine).
 *   2. Run `npm run dev`, open the template page and press "Calibrate positions" (dev only).
 *   3. Drag each box onto its place, then copy the JSON and paste it over the `box` values below.
 * Until an image exists the template shows a generated blank page with the same fields.
 */
export type FieldKind = "text" | "textarea";

export type FormatField = {
  key: string;
  label: string;
  kind?: FieldKind;
  value: string;

  box: [number, number, number, number];

  size?: number;
  bold?: boolean;
  align?: "left" | "center" | "right";
};

export type DocFormat = {
  slug: string;
  name: string;
  label: string;

  accent: string;
  image: string;
  fields: FormatField[];
};

const t = (
  key: string,
  label: string,
  value: string,
  box: [number, number, number, number],
  o: Partial<FormatField> = {},
): FormatField => ({ key, label, value, box, ...o });
const ta = (
  key: string,
  label: string,
  value: string,
  box: [number, number, number, number],
  o: Partial<FormatField> = {},
): FormatField => ({ key, label, value, box, kind: "textarea", ...o });

export const docFormats: DocFormat[] = [
  {
    slug: "proforma-invoice",
    name: "Proforma Invoice",
    label: "PROFORMA",
    accent: "#1d5fd6",
    image: "/formats/proforma-invoice.png",
    fields: [
      t("no", "Proforma no.", "PI-2026-0418", [68, 8.5, 24, 2.4], {
        align: "right",
      }),
      t("date", "Date", "05 Nov 2026", [68, 11.6, 24, 2.4], { align: "right" }),
      t("seller", "Seller", "Your Company Pvt. Ltd.", [8, 17, 40, 2.4], {
        bold: true,
      }),
      ta(
        "sellerAddr",
        "Seller address",
        "Plot 12, Industrial Area, Pune, Maharashtra, India",
        [8, 19.8, 40, 6],
      ),
      t("buyer", "Buyer", "Globex Trading Co.", [52, 17, 40, 2.4], {
        bold: true,
      }),
      ta(
        "buyerAddr",
        "Buyer address",
        "88 Harbour Road, Dubai, UAE",
        [52, 19.8, 40, 6],
      ),
      ta(
        "item",
        "Item description",
        "Industrial fasteners, 20 mm",
        [8, 36, 44, 6],
      ),
      t("qty", "Quantity", "1,200", [54, 36, 10, 2.4], { align: "right" }),
      t("unit", "Unit price (USD)", "14.50", [65, 36, 12, 2.4], {
        align: "right",
      }),
      t("amount", "Amount (USD)", "17,400.00", [79, 36, 13, 2.4], {
        align: "right",
      }),
      t("incoterm", "Incoterms", "CIF Jebel Ali", [8, 52, 40, 2.4]),
      t(
        "payment",
        "Payment terms",
        "50% advance, 50% against BL",
        [8, 55.2, 44, 2.4],
      ),
      ta("bank", "Bank details", "Bank name, A/c no., SWIFT", [8, 59, 44, 7]),
      t("validity", "Validity", "30 days from date", [8, 70, 30, 2.4]),
      t("total", "Total (USD)", "17,400.00", [79, 50, 13, 2.6], {
        bold: true,
        align: "right",
      }),
    ],
  },
  {
    slug: "sales-contract",
    name: "Sales Contract",
    label: "SALES CONTRACT",
    accent: "#0a3a7a",
    image: "/formats/sales-contract.png",
    fields: [
      t("no", "Contract no.", "SC-2026-0112", [66, 8.5, 26, 2.4], {
        align: "right",
      }),
      t("date", "Date", "05 Nov 2026", [66, 11.6, 26, 2.4], { align: "right" }),
      t("seller", "Seller", "Your Company Pvt. Ltd.", [8, 18, 84, 2.4], {
        bold: true,
      }),
      ta(
        "sellerAddr",
        "Seller address",
        "Plot 12, Industrial Area, Pune, Maharashtra, India",
        [8, 20.8, 84, 4],
      ),
      t("buyer", "Buyer", "Globex Trading Co.", [8, 27, 84, 2.4], {
        bold: true,
      }),
      ta(
        "buyerAddr",
        "Buyer address",
        "88 Harbour Road, Dubai, UAE",
        [8, 29.8, 84, 4],
      ),
      ta(
        "goods",
        "Goods and specification",
        "Industrial fasteners, 20 mm, grade 8.8",
        [8, 38, 84, 5],
      ),
      t("qty", "Quantity", "1,200 cartons", [8, 45, 40, 2.4]),
      t(
        "price",
        "Price and currency",
        "USD 14.50 per carton",
        [52, 45, 40, 2.4],
      ),
      t("payment", "Payment terms", "LC at sight", [8, 52, 84, 2.4]),
      t(
        "shipment",
        "Shipment and delivery",
        "Latest shipment 15 Dec 2026, CIF Jebel Ali",
        [8, 56, 84, 2.4],
      ),
      t(
        "law",
        "Governing law",
        "Laws of India; courts of Mumbai",
        [8, 60, 84, 2.4],
      ),
    ],
  },
  // {
  //   slug: "purchase-contract",
  //   name: "Purchase Contract",
  //   label: "PURCHASE CONTRACT",
  //   accent: "#0f9a8a",
  //   image: "/formats/purchase-contract.png",
  //   fields: [
  //     t("no", "Contract no.", "PC-2026-0087", [66, 8.5, 26, 2.4], { align: "right" }),
  //     t("date", "Date", "05 Nov 2026", [66, 11.6, 26, 2.4], { align: "right" }),
  //     t("buyer", "Buyer (your company)", "Your Company Pvt. Ltd.", [8, 18, 84, 2.4], { bold: true }),
  //     ta("buyerAddr", "Buyer address", "Plot 12, Industrial Area, Pune, Maharashtra, India", [8, 20.8, 84, 4]),
  //     t("supplier", "Supplier", "Acme Supplies Ltd.", [8, 27, 84, 2.4], { bold: true }),
  //     ta("supplierAddr", "Supplier address", "5 Mill Road, Surat, Gujarat, India", [8, 29.8, 84, 4]),
  //     ta("goods", "Goods and specification", "Cold-rolled steel coils, 1.2 mm", [8, 38, 84, 5]),
  //     t("qty", "Quantity", "40 MT", [8, 45, 40, 2.4]),
  //     t("price", "Price", "INR 62,000 per MT", [52, 45, 40, 2.4]),
  //     t("delivery", "Delivery terms", "Ex-works, within 21 days", [8, 52, 84, 2.4]),
  //     t("payment", "Payment terms", "30 days from invoice", [8, 56, 84, 2.4]),
  //   ],
  // },
  {
    slug: "purchase-order",
    name: "Purchase Order",
    label: "PURCHASE ORDER",
    accent: "#e8684a",
    image: "/formats/purchase-order.png",
    fields: [
      t("no", "PO no.", "PO-2026-2310", [68, 8.5, 24, 2.4], { align: "right" }),
      t("date", "Date", "05 Nov 2026", [68, 11.6, 24, 2.4], { align: "right" }),
      t("buyer", "Buyer", "Globex Trading Co.", [8, 17, 40, 2.4], {
        bold: true,
      }),
      ta(
        "buyerAddr",
        "Buyer address",
        "88 Harbour Road, Dubai, UAE",
        [8, 19.8, 40, 6],
      ),
      t("supplier", "Supplier", "Your Company Pvt. Ltd.", [52, 17, 40, 2.4], {
        bold: true,
      }),
      ta(
        "supplierAddr",
        "Supplier address",
        "Plot 12, Industrial Area, Pune, India",
        [52, 19.8, 40, 6],
      ),
      ta(
        "item",
        "Item description",
        "Industrial fasteners, 20 mm",
        [8, 36, 44, 6],
      ),
      t("qty", "Quantity", "1,200", [54, 36, 10, 2.4], { align: "right" }),
      t("unit", "Unit price", "14.50", [65, 36, 12, 2.4], { align: "right" }),
      t("amount", "Amount", "17,400.00", [79, 36, 13, 2.4], { align: "right" }),
      t("delivery", "Delivery date", "15 Dec 2026", [8, 52, 40, 2.4]),
      ta(
        "shipTo",
        "Ship to",
        "Jebel Ali Free Zone, Dubai, UAE",
        [8, 56, 44, 6],
      ),
      t("total", "Total", "17,400.00", [79, 50, 13, 2.6], {
        bold: true,
        align: "right",
      }),
    ],
  },
  {
    slug: "export-invoice",
    name: "Export Invoice",
    label: "EXPORT INVOICE",
    accent: "#2f8fd0",
    image: "/formats/export-invoice.png",
    fields: [
      t("no", "Invoice no.", "EI-2026-0561", [68, 8.5, 24, 2.4], {
        align: "right",
      }),
      t("date", "Date", "05 Nov 2026", [68, 11.6, 24, 2.4], { align: "right" }),
      t("exporter", "Exporter", "Your Company Pvt. Ltd.", [8, 17, 40, 2.4], {
        bold: true,
      }),
      ta(
        "exporterAddr",
        "Exporter address",
        "Plot 12, Industrial Area, Pune, India",
        [8, 19.8, 40, 6],
      ),
      t("consignee", "Consignee", "Globex Trading Co.", [52, 17, 40, 2.4], {
        bold: true,
      }),
      ta(
        "consigneeAddr",
        "Consignee address",
        "88 Harbour Road, Dubai, UAE",
        [52, 19.8, 40, 6],
      ),
      t("pol", "Port of loading", "Nhava Sheva (JNPT)", [8, 29, 40, 2.4]),
      t("pod", "Port of discharge", "Jebel Ali", [52, 29, 40, 2.4]),
      ta(
        "goods",
        "Description of goods",
        "Industrial fasteners, 20 mm",
        [8, 38, 40, 6],
      ),
      t("hs", "HS code", "7318 15 00", [50, 38, 12, 2.4]),
      t("qty", "Quantity", "1,200", [63, 38, 10, 2.4], { align: "right" }),
      t("unit", "Unit price (USD)", "14.50", [74, 38, 8, 2.4], {
        align: "right",
      }),
      t("amount", "Amount (USD)", "17,400.00", [83, 38, 9, 2.4], {
        align: "right",
      }),
      t("incoterm", "Incoterms", "CIF Jebel Ali", [8, 54, 40, 2.4]),
      t("total", "Total (USD)", "17,400.00", [79, 52, 13, 2.6], {
        bold: true,
        align: "right",
      }),
    ],
  },
  {
    slug: "packing-list",
    name: "Packing List",
    label: "PACKING LIST",
    accent: "#3a5bd9",
    image: "/formats/packing-list.png",
    fields: [
      t("no", "Packing list no.", "PL-2026-0561", [68, 8.5, 24, 2.4], {
        align: "right",
      }),
      t("date", "Date", "05 Nov 2026", [68, 11.6, 24, 2.4], { align: "right" }),
      t("exporter", "Exporter", "Your Company Pvt. Ltd.", [8, 17, 40, 2.4], {
        bold: true,
      }),
      t("consignee", "Consignee", "Globex Trading Co.", [52, 17, 40, 2.4], {
        bold: true,
      }),
      t("packages", "Number of packages", "60 cartons", [8, 30, 30, 2.4]),
      ta("goods", "Description", "Industrial fasteners, 20 mm", [8, 38, 40, 6]),
      t("net", "Net weight", "1,150 kg", [52, 38, 16, 2.4], { align: "right" }),
      t("gross", "Gross weight", "1,260 kg", [70, 38, 16, 2.4], {
        align: "right",
      }),
      t("dims", "Dimensions", "60 x 40 x 35 cm", [8, 52, 40, 2.4]),
      ta("marks", "Shipping marks", "GLOBEX / DUBAI / 1-60", [8, 56, 44, 5]),
    ],
  },
];

export const getFormat = (slug: string) =>
  docFormats.find((f) => f.slug === slug);
