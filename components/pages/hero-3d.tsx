"use client";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check } from "lucide-react";

/**
 * 3D hero scene used by inner-page heroes that have no photo.
 * A document card, floating chips, a spinning cube and an orbit ring sit at different depths
 * and tilt with the pointer. Pure CSS 3D + framer-motion, no extra libraries.
 */
export function Hero3DScene({
  title,
  chips = [],
  className = "",
}: {
  title: string;
  chips?: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), {
    stiffness: 90,
    damping: 16,
  });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-16, 16]), {
    stiffness: 90,
    damping: 16,
  });
  const labels = [
    chips[0] ?? "Documents",
    chips[1] ?? "Finance",
    chips[2] ?? "Lenders",
  ];

  return (
    <div
      className={`relative mx-auto h-[330px] w-full max-w-[540px] [perspective:1300px] sm:h-[380px] ${className}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0"
        style={
          reduce
            ? undefined
            : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }
        }
      >
        <div
          className="absolute left-[10%] top-[8%] h-[84%] w-[80%]"
          style={{
            transform: "translateZ(-80px)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="animate-orbit h-full w-full rounded-full border-[3px] border-dashed border-[#FA7F63]/45" />
        </div>
        <div
          className="absolute left-[2%] top-[34%] h-40 w-40 rounded-full border-[16px] border-[#022350]/[0.07]"
          style={{ transform: "translateZ(-50px)" }}
        />

        <div
          className="absolute left-[13%] top-[12%] w-[64%]"
          style={{
            transform: "translateZ(10px) rotateY(-9deg) rotateX(3deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="animate-float-slow rounded-2xl border border-brand-line bg-white p-4 shadow-lift">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-[#022350]" />
              <span className="truncate font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-brand-slate">
                {title}
              </span>
            </div>
            <div className="mt-4 space-y-2.5">
              {[88, 72, 80, 56].map((w, i) => (
                <motion.span
                  key={i}
                  className="block h-2 rounded-full bg-brand-line"
                  initial={{ width: 0 }}
                  animate={{ width: `${w}%` }}
                  transition={{
                    duration: 0.9,
                    delay: 0.4 + i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-brand-line">
              <motion.span
                className="block h-full rounded-full bg-gradient-to-r from-[#FA7F63] to-[#FDB9A8]"
                initial={{ width: "0%" }}
                animate={{ width: "78%" }}
                transition={{
                  duration: 1.6,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="absolute right-[2%] top-[6%]"
          style={{ transform: "translateZ(90px)" }}
        >
          <div className="animate-float flex items-center gap-2 rounded-xl bg-[#FA7F63] px-3.5 py-2.5 text-[13px] font-semibold text-[#022350] shadow-glow-coral">
            <Check className="h-4 w-4" /> {labels[0]}
          </div>
        </div>

        <div
          className="absolute bottom-[10%] left-[0%]"
          style={{ transform: "translateZ(120px)" }}
        >
          <div className="animate-float-delay rounded-xl bg-[#022350] px-3.5 py-2.5 text-[13px] font-semibold text-white shadow-lift">
            {labels[1]}
          </div>
        </div>

        <div
          className="absolute bottom-[22%] right-[0%]"
          style={{ transform: "translateZ(60px)" }}
        >
          <div className="animate-float-slow flex items-center gap-2 rounded-xl border border-brand-line bg-white px-3.5 py-2.5 text-[13px] font-semibold text-[#022350] shadow-lift">
            <span className="h-2 w-2 rounded-full bg-[#44A0DC]" /> {labels[2]}
          </div>
        </div>

        {/* <div className="absolute right-[18%] top-[56%]" style={{ transform: 'translateZ(140px)' }}>
          <div className="cube3d">
            {['f1', 'f2', 'f3', 'f4', 'f5', 'f6'].map((f) => (
              <i key={f} className={f} />
            ))}
          </div>
        </div> */}
      </motion.div>
    </div>
  );
}
