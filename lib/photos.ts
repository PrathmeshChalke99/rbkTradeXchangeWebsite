/**
 * Real photographs from Pexels (free licence, hotlinking allowed).
 * Each ID comes from a Pexels photo page; the URL pattern is the standard Pexels CDN form.
 * If any URL ever fails to load, the <Photo> component automatically falls back to the
 * matching bundled illustration in /public/images, so the layout never breaks.
 */
export const px = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const P = {
  // sea freight & ports
  shipAerial: px(4700621),
  cargoFleet: px(35421778),
  shipSailing: px(15320405),
  shipOcean: px(28379633),
  shipSeagull: px(29214695),
  portSunset: px(3057960),
  portXiamen: px(17737857),
  portJakarta: px(3856440),
  portSunrise: px(14020705),
  // warehouse & supply chain
  warehouseWide: px(4483610),
  warehouseWorkers: px(4483862),
  warehouseBright: px(4487363),
  // finance desk, documents & analytics
  financeDesk: px(669621),
  financeDesk2: px(669614),
  chartNotes: px(5717779),
  teamReports: px(7691715),
  meetingTable: px(7108591),
  analyticsTablet: px(4960323),
  tabletMan: px(9099822),
  proTablet: px(5833305),
  // offices, banks & commercial property
  londonOffice: px(34092),
  suitsWindow: px(6950120),
  meetingOffice: px(6950121),
  financialDistrict: px(11478169),
  chicagoTowers: px(2295433),
  frankfurtTower: px(2467163),
  glassTower: px(5087536),
};
