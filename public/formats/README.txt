Put your ORIGINAL document formats here, one image per template:

  proforma-invoice.png
  sales-contract.png
  purchase-contract.png
  purchase-order.png
  export-invoice.png
  packing-list.png

(Full-page image of the blank format, portrait, about 1240 x 1754 px or larger. PNG or JPG.)

Then positions of each field are set in lib/doc-formats.ts. The quickest way:
  1. npm run dev
  2. open /documents/<name>  and press "Calibrate positions" (development only)
  3. drag each box onto its place, press "Copy positions", paste into lib/doc-formats.ts

Until an image exists, the page shows a generated blank format with the same fields.
