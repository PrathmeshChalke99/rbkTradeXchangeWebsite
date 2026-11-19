/**
 * Lists the PNG icons in /public/icons so the site can use them in place of the built-in SVGs.
 * Runs automatically before `npm run dev` and `npm run build`; run `npm run icons` by hand after
 * adding or removing a file.
 */
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "public", "icons");
const out = path.join(__dirname, "..", "lib", "icon-manifest.json");
const files = fs.existsSync(dir)
  ? fs
      .readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith(".png"))
      .map((f) => f.slice(0, -4))
      .sort()
  : [];
fs.writeFileSync(out, JSON.stringify({ files }, null, 2) + "\n");
console.log(`icons: ${files.length} PNG override(s)${files.length ? ": " + files.join(", ") : ""}`);
