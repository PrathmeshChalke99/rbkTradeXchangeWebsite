"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Pt = [number, number];
const LAND: Pt[][] = [
  // North America
  [
    [-168, 66],
    [-150, 71],
    [-125, 70],
    [-95, 73],
    [-80, 69],
    [-62, 60],
    [-56, 52],
    [-66, 45],
    [-70, 41],
    [-76, 35],
    [-81, 30],
    [-80, 25],
    [-84, 30],
    [-90, 29],
    [-97, 26],
    [-97, 21],
    [-92, 18],
    [-87, 21],
    [-83, 10],
    [-78, 8],
    [-85, 12],
    [-92, 15],
    [-105, 20],
    [-110, 24],
    [-117, 32],
    [-124, 40],
    [-124, 48],
    [-135, 58],
    [-150, 60],
    [-165, 62],
  ],
  // Greenland
  [
    [-73, 78],
    [-55, 83],
    [-20, 82],
    [-20, 70],
    [-43, 60],
    [-55, 68],
  ],
  // South America
  [
    [-80, 9],
    [-72, 12],
    [-62, 10],
    [-50, 2],
    [-35, -6],
    [-39, -15],
    [-48, -26],
    [-58, -36],
    [-65, -42],
    [-68, -52],
    [-72, -54],
    [-75, -45],
    [-71, -30],
    [-70, -18],
    [-76, -12],
    [-81, -5],
  ],
  // Africa
  [
    [-17, 21],
    [-10, 30],
    [0, 36],
    [10, 37],
    [25, 32],
    [33, 31],
    [43, 12],
    [51, 12],
    [42, -2],
    [40, -15],
    [35, -25],
    [27, -34],
    [18, -34],
    [12, -18],
    [9, -1],
    [-8, 4],
    [-15, 10],
  ],
  // Europe
  [
    [-9, 37],
    [-9, 43],
    [-2, 44],
    [-4, 48],
    [2, 51],
    [8, 54],
    [9, 57],
    [12, 56],
    [18, 55],
    [22, 58],
    [24, 60],
    [30, 60],
    [30, 70],
    [20, 70],
    [14, 67],
    [5, 62],
    [8, 58],
    [5, 54],
    [-1, 50],
    [-4, 43],
  ],
  // Asia
  [
    [28, 41],
    [36, 36],
    [36, 30],
    [43, 12],
    [51, 15],
    [58, 22],
    [56, 26],
    [48, 30],
    [55, 26],
    [66, 25],
    [73, 20],
    [77, 8],
    [80, 15],
    [88, 22],
    [92, 21],
    [98, 10],
    [100, 2],
    [104, 1],
    [109, 12],
    [106, 20],
    [121, 29],
    [122, 38],
    [118, 39],
    [125, 40],
    [130, 43],
    [142, 53],
    [160, 60],
    [165, 62],
    [180, 68],
    [170, 70],
    [140, 72],
    [110, 77],
    [80, 73],
    [60, 70],
    [60, 68],
    [40, 66],
    [40, 56],
    [36, 45],
  ],
  // Australia
  [
    [114, -22],
    [122, -18],
    [130, -12],
    [136, -12],
    [142, -11],
    [146, -19],
    [153, -26],
    [150, -37],
    [141, -38],
    [131, -31],
    [115, -34],
  ],
  // UK, Japan, Sumatra, Borneo, Madagascar
  [
    [-5, 50],
    [1, 51],
    [2, 53],
    [-3, 58],
    [-6, 56],
  ],
  [
    [130, 31],
    [140, 35],
    [142, 42],
    [140, 40],
    [132, 34],
  ],
  [
    [95, 5],
    [106, -6],
    [104, -5],
    [98, 0],
  ],
  [
    [109, 1],
    [118, 7],
    [119, -1],
    [111, -3],
  ],
  [
    [44, -25],
    [50, -15],
    [47, -13],
    [43, -22],
  ],
];

function inside(lon: number, lat: number, poly: Pt[]) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
    )
      c = !c;
  }
  return c;
}

const rad = (d: number) => (d * Math.PI) / 180;
const vec = (lon: number, lat: number): [number, number, number] => [
  Math.cos(rad(lat)) * Math.sin(rad(lon)),
  Math.sin(rad(lat)),
  Math.cos(rad(lat)) * Math.cos(rad(lon)),
];

export type GlobeHub = { name: string; lon: number; lat: number };
export const defaultHub: GlobeHub = { name: "India", lon: 78, lat: 21 };
export const defaultTargets: GlobeHub[] = [
  { name: "Middle East", lon: 55, lat: 25 },
  { name: "Europe", lon: 8, lat: 50 },
  { name: "Americas", lon: -74, lat: 40 },
  { name: "Asia-Pacific", lon: 110, lat: 8 },
  { name: "Africa", lon: 30, lat: -2 },
];

/**
 * Rotating dotted globe with animated trade arcs from a hub.
 * Pure canvas (no WebGL), pauses off-screen, and draws a still frame for reduced motion.
 */
export function Globe({
  hub = defaultHub,
  targets = defaultTargets,
  className,
}: {
  hub?: GlobeHub;
  targets?: GlobeHub[];
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // land dots
    const dots: [number, number, number][] = [];
    for (let lat = -78; lat <= 84; lat += 2.6) {
      const step = 2.6 / Math.max(0.25, Math.cos(rad(lat)));
      for (let lon = -180; lon < 180; lon += step) {
        if (LAND.some((p) => inside(lon, lat, p))) dots.push(vec(lon, lat));
      }
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.41;
      const cx = w / 2;
      const cy = h * 0.54;
      // keep the hub facing the viewer, sway slowly either side
      const rotLon = hub.lon + Math.sin(t * 0.2) * 55 + (reduce ? 0 : t * 1.5);
      const tilt = 18;
      const cl = Math.cos(rad(-rotLon));
      const sl = Math.sin(rad(-rotLon));
      const ct = Math.cos(rad(tilt));
      const st = Math.sin(rad(tilt));

      const proj = (
        v: [number, number, number],
        lift = 1,
      ): [number, number, number] => {
        const x1 = v[0] * cl + v[2] * sl;
        const z1 = -v[0] * sl + v[2] * cl;
        const y2 = v[1] * ct - z1 * st;
        const z2 = v[1] * st + z1 * ct;
        return [cx + x1 * R * lift, cy - y2 * R * lift, z2];
      };

      // sphere body
      const g = ctx.createRadialGradient(
        cx - R * 0.35,
        cy - R * 0.4,
        R * 0.1,
        cx,
        cy,
        R,
      );
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.6, "#e9f1fb");
      g.addColorStop(1, "#cddff4");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = "rgba(2,35,80,0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // graticule
      ctx.strokeStyle = "rgba(2,35,80,0.07)";
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let pen = false;
        for (let lon = -180; lon <= 180; lon += 6) {
          const p = proj(vec(lon, lat));
          if (p[2] > 0) {
            pen ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]);
            pen = true;
          } else pen = false;
        }
        ctx.stroke();
      }

      // land dots
      for (const d of dots) {
        const p = proj(d);
        if (p[2] <= 0.02) continue;
        ctx.globalAlpha = 0.25 + p[2] * 0.75;
        ctx.fillStyle = "#022350";
        ctx.beginPath();
        ctx.arc(p[0], p[1], Math.max(0.9, R * 0.0105), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // arcs from hub
      const a = vec(hub.lon, hub.lat);
      targets.forEach((tg, i) => {
        const b = vec(tg.lon, tg.lat);
        const dot = Math.max(
          -1,
          Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]),
        );
        const om = Math.acos(dot);
        const so = Math.sin(om) || 1;
        const pts: [number, number, number][] = [];
        const N = 48;
        for (let k = 0; k <= N; k++) {
          const f = k / N;
          const s1 = Math.sin((1 - f) * om) / so;
          const s2 = Math.sin(f * om) / so;
          const v: [number, number, number] = [
            a[0] * s1 + b[0] * s2,
            a[1] * s1 + b[1] * s2,
            a[2] * s1 + b[2] * s2,
          ];
          pts.push(proj(v, 1 + 0.17 * Math.sin(Math.PI * f) * (om / 1.6)));
        }
        // track
        ctx.beginPath();
        let pen = false;
        for (const p of pts) {
          if (p[2] > -0.05) {
            pen ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]);
            pen = true;
          } else pen = false;
        }
        ctx.strokeStyle = "rgba(250,127,99,0.85)";
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // travelling dot
        const f = reduce ? 0.6 : (t * 0.22 + i * 0.19) % 1;
        const pp = pts[Math.floor(f * N)];
        if (pp && pp[2] > -0.05) {
          ctx.beginPath();
          ctx.arc(pp[0], pp[1], 3.4, 0, Math.PI * 2);
          ctx.fillStyle = "#022350";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(pp[0], pp[1], 7, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(2,35,80,0.14)";
          ctx.fill();
        }

        // endpoint + label
        const e = proj(b);
        if (e[2] > 0.05) {
          ctx.beginPath();
          ctx.arc(e[0], e[1], 4.5, 0, Math.PI * 2);
          ctx.fillStyle = "#fff";
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#022350";
          ctx.stroke();
          ctx.font = "600 11px Inter, system-ui, sans-serif";
          ctx.fillStyle = "#022350";
          ctx.textAlign = "center";
          ctx.fillText(tg.name, e[0], e[1] + 18);
        }
      });

      // hub
      const hp = proj(a);
      if (hp[2] > 0.05) {
        const pulse = reduce ? 0 : (t % 2) / 2;
        ctx.beginPath();
        ctx.arc(hp[0], hp[1], 6 + pulse * 18, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(250,127,99,${0.7 * (1 - pulse)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(hp[0], hp[1], 6.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FA7F63";
        ctx.fill();
        ctx.font = "700 12px Inter, system-ui, sans-serif";
        ctx.fillStyle = "#022350";
        ctx.textAlign = "center";
        ctx.fillText(hub.name, hp[0], hp[1] - 14);
      }
    };

    const loop = (now: number) => {
      if (visible) draw(now);
      raf = requestAnimationFrame(loop);
    };
    if (reduce) draw(performance.now());
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [hub, targets]);

  return (
    <canvas
      ref={ref}
      className={cn("block h-full w-full", className)}
      role="img"
      aria-label="Globe showing trade corridors from India to global markets"
    />
  );
}
