"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion } from "framer-motion";
import { Check, Download, Move, RotateCcw, Wand2 } from "lucide-react";
import type { FormatField } from "@/lib/doc-formats";
import { cn } from "@/lib/utils";

type Box = [number, number, number, number];

/**
 * Live format preview: the visitor's typing is written onto the ORIGINAL format image,
 * in the exact place each field belongs. Without an image it falls back to a generated blank
 * page carrying the same fields. In development a "Calibrate positions" tool lets you drag
 * each field into place and copy the coordinates back into lib/doc-formats.ts.
 */
export function FormatPreview({
  slug,
  name,
  label,
  accent,
  image,
  fields,
}: {
  slug: string;
  name: string;
  label: string;
  accent: string;
  image: string;
  fields: FormatField[];
}) {
  const initial = () => Object.fromEntries(fields.map((f) => [f.key, f.value]));
  const [vals, setVals] = useState<Record<string, string>>(initial);
  const [boxes, setBoxes] = useState<Record<string, Box>>(() =>
    Object.fromEntries(fields.map((f) => [f.key, f.box])),
  );
  const [active, setActive] = useState<string | null>(null);
  const [imgOk, setImgOk] = useState<boolean | null>(null);
  const [cal, setCal] = useState(false);
  const [copied, setCopied] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const dev = process.env.NODE_ENV === "development";

  useEffect(() => {
    const el = imgRef.current;
    if (el?.complete) setImgOk(el.naturalWidth > 0);
  }, []);

  const filled = fields.filter((f) => (vals[f.key] ?? "").trim()).length;

  const drag = useRef<{
    key: string;
    mode: "move" | "size";
    sx: number;
    sy: number;
    box: Box;
  } | null>(null);
  const down = (e: PointerEvent, key: string, mode: "move" | "size") => {
    if (!cal) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { key, mode, sx: e.clientX, sy: e.clientY, box: boxes[key] };
  };
  const move = (e: PointerEvent) => {
    const d = drag.current;
    const r = stage.current?.getBoundingClientRect();
    if (!d || !r) return;
    const dx = ((e.clientX - d.sx) / r.width) * 100;
    const dy = ((e.clientY - d.sy) / r.height) * 100;
    const [x, y, w, h] = d.box;
    const next: Box =
      d.mode === "move"
        ? [x + dx, y + dy, w, h]
        : [x, y, Math.max(2, w + dx), Math.max(1, h + dy)];
    setBoxes((b) => ({ ...b, [d.key]: next }));
  };
  const up = () => (drag.current = null);

  const json = fields
    .map((f) => {
      const b = boxes[f.key].map((n) => Math.round(n * 10) / 10);
      return `${f.key}: [${b.join(", ")}]`;
    })
    .join("\n");

  const download = () => {
    const img = imgRef.current;
    if (!img || imgOk !== true) return;
    const W = img.naturalWidth;
    const H = img.naturalHeight;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const g = c.getContext("2d");
    if (!g) return;
    g.drawImage(img, 0, 0, W, H);
    g.textBaseline = "top";
    for (const f of fields) {
      const [x, y, w, h] = boxes[f.key];
      const px = ((f.size ?? 1.5) / 100) * W;
      const lh = px * 1.25;
      g.font = `${f.bold ? 700 : 400} ${px}px Inter, Arial, sans-serif`;
      g.fillStyle = "#10213f";
      g.textAlign = f.align ?? "left";
      const bx = (x / 100) * W;
      const by = (y / 100) * H;
      const bw = (w / 100) * W;
      const maxLines = Math.max(1, Math.floor(((h / 100) * H) / lh));
      const ax =
        f.align === "right" ? bx + bw : f.align === "center" ? bx + bw / 2 : bx;
      let lines: string[] = [];
      for (const para of (vals[f.key] ?? "").split("\n")) {
        if (f.kind !== "textarea") {
          lines.push(para);
          continue;
        }
        let line = "";
        for (const word of para.split(" ")) {
          const test = line ? `${line} ${word}` : word;
          if (g.measureText(test).width > bw && line) {
            lines.push(line);
            line = word;
          } else line = test;
        }
        lines.push(line);
      }
      lines = lines.slice(0, maxLines);
      lines.forEach((l, i) => g.fillText(l, ax, by + i * lh, bw));
    }
    c.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${slug}-filled.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }, "image/png");
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
      {}
      <form
        onSubmit={(e) => e.preventDefault()}
        aria-label={`${name} fields`}
        className="self-start rounded-3xl border border-brand-line bg-white p-6 shadow-soft sm:p-7 lg:sticky lg:top-28"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2.5 font-heading text-lg font-semibold text-brand-ink">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: `${accent}1a`, color: accent }}
            >
              <Wand2 className="h-4 w-4" />
            </span>
            Fill in your details
          </p>
          <button
            type="button"
            onClick={() => setVals(initial())}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-brand-slate transition hover:bg-brand-paper hover:text-brand-ink"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-brand-line">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${accent}, #FA7F63)`,
              }}
              animate={{ width: `${(filled / fields.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className="font-mono text-[11px] text-brand-slate">
            {filled}/{fields.length}
          </span>
        </div>

        <div className="mt-5 max-h-[60vh] space-y-3.5 overflow-y-auto pr-1">
          {fields.map((f) => (
            <div key={f.key}>
              <label htmlFor={`f-${f.key}`} className="field-label">
                {f.label}
              </label>
              {f.kind === "textarea" ? (
                <textarea
                  id={`f-${f.key}`}
                  rows={2}
                  className="field resize-none"
                  value={vals[f.key] ?? ""}
                  onChange={(e) =>
                    setVals((v) => ({ ...v, [f.key]: e.target.value }))
                  }
                  onFocus={() => setActive(f.key)}
                  onBlur={() => setActive(null)}
                />
              ) : (
                <input
                  id={`f-${f.key}`}
                  className="field"
                  value={vals[f.key] ?? ""}
                  onChange={(e) =>
                    setVals((v) => ({ ...v, [f.key]: e.target.value }))
                  }
                  onFocus={() => setActive(f.key)}
                  onBlur={() => setActive(null)}
                />
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl bg-brand-paper p-3 text-xs leading-relaxed text-brand-slate">
          Preview only. Nothing you type is saved or sent. Full templates,
          saving and sharing are inside the portal.
        </p>
      </form>

      {}
      <div className="min-w-0">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-paleblue/70 via-brand-paper to-white p-3 ring-1 ring-brand-line sm:p-6">
          <div className="grid-lines-light absolute inset-0" aria-hidden />
          <div className="relative mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-slate shadow-soft">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />{" "}
              Live format
            </span>
            <div className="flex gap-2">
              {dev && (
                <button
                  type="button"
                  onClick={() => setCal((c) => !c)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-soft transition",
                    cal
                      ? "bg-[#FA7F63] text-[#022350]"
                      : "bg-white text-brand-ink hover:bg-brand-paper",
                  )}
                >
                  <Move className="h-3.5 w-3.5" />{" "}
                  {cal ? "Done calibrating" : "Calibrate positions"}
                </button>
              )}
              {imgOk === true && (
                <button
                  type="button"
                  onClick={download}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#022350] px-3 py-1 text-xs font-semibold text-white shadow-soft transition hover:bg-[#0a3a7a]"
                >
                  <Download className="h-3.5 w-3.5" /> Download PNG
                </button>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 1200 }}
            className="relative mx-auto max-w-[44rem] overflow-hidden rounded-lg bg-white shadow-lift ring-1 ring-black/5"
          >
            <div
              ref={stage}
              className="relative w-full select-none"
              style={{ containerType: "inline-size" }}
              onPointerMove={move}
              onPointerUp={up}
            >
              {imgOk !== false ? (
                <img
                  ref={imgRef}
                  src={image}
                  alt={`${name} format`}
                  draggable={false}
                  onLoad={() => setImgOk(true)}
                  onError={() => setImgOk(false)}
                  className="block h-auto w-full"
                />
              ) : (
                <BlankPage label={label} name={name} accent={accent} />
              )}

              {fields.map((f) => {
                const [x, y, w, h] = boxes[f.key];
                const on = active === f.key;
                return (
                  <div
                    key={f.key}
                    onPointerDown={(e) => down(e, f.key, "move")}
                    onClick={() =>
                      !cal && document.getElementById(`f-${f.key}`)?.focus()
                    }
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      width: `${w}%`,
                      height: `${h}%`,
                    }}
                    className={cn(
                      "absolute rounded-[2px] transition-[background-color,box-shadow] duration-200",
                      !cal && "cursor-text hover:bg-[#FA7F63]/10",
                      on && "bg-[#FA7F63]/15 shadow-[0_0_0_2px_#FA7F63]",
                      cal &&
                        "cursor-move bg-brand-blue/10 shadow-[0_0_0_1px_rgba(29,95,214,0.7)]",
                    )}
                  >
                    {(on || cal) && (
                      <span className="pointer-events-none absolute -top-[1.35em] left-0 z-10 whitespace-nowrap rounded bg-[#022350] px-1.5 py-px text-[0.62rem] font-semibold leading-tight text-white">
                        {f.label}
                      </span>
                    )}
                    <div
                      className="h-full w-full overflow-hidden"
                      style={{
                        fontSize: `${f.size ?? 1.5}cqw`,
                        lineHeight: 1.25,
                        color: "#10213f",
                        textAlign: f.align ?? "left",
                        fontWeight: f.bold ? 700 : 400,
                        fontFamily: "Inter, Arial, sans-serif",
                        whiteSpace:
                          f.kind === "textarea" ? "pre-wrap" : "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {vals[f.key]}
                    </div>
                    {cal && (
                      <span
                        onPointerDown={(e) => down(e, f.key, "size")}
                        className="absolute -bottom-1 -right-1 h-3 w-3 cursor-nwse-resize rounded-sm bg-brand-blue"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {dev && imgOk === false && (
          <p className="mt-3 rounded-xl border border-dashed border-brand-accent/60 bg-brand-accent-soft/50 p-3 text-xs text-brand-ink">
            Development note: no format image found. Add yours at{" "}
            <code className="font-mono">public{image}</code> and this page will
            use it.
          </p>
        )}

        {dev && cal && (
          <div className="mt-4 rounded-2xl border border-brand-line bg-white p-4 shadow-soft">
            <p className="text-sm font-semibold text-brand-ink">
              Drag each box onto its place (corner handle resizes). Copy the
              positions below into{" "}
              <code className="font-mono text-xs">lib/doc-formats.ts</code>.
            </p>
            <textarea
              readOnly
              rows={Math.min(14, fields.length + 1)}
              value={json}
              className="field mt-3 font-mono text-xs"
            />
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(json);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="btn-primary mt-3"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" /> Copied
                </>
              ) : (
                "Copy positions"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function BlankPage({
  label,
  name,
  accent,
}: {
  label: string;
  name: string;
  accent: string;
}) {
  return (
    <div className="relative bg-white" style={{ aspectRatio: "1 / 1.414" }}>
      <div
        className="px-[6%] py-[4.5%] text-white"
        style={{ background: accent }}
      >
        <p
          className="font-mono uppercase tracking-[0.2em] opacity-80"
          style={{ fontSize: "1.1cqw" }}
        >
          RBK / E-Docs
        </p>
        <p
          className="font-heading font-semibold"
          style={{ fontSize: "3.6cqw" }}
        >
          {label}
        </p>
      </div>
      <p
        className="absolute bottom-[3%] left-0 right-0 text-center font-mono uppercase tracking-widest text-brand-slate/50"
        style={{ fontSize: "1cqw" }}
      >
        {name}
      </p>
    </div>
  );
}
