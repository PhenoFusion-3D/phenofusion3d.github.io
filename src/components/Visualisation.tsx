"use client";

import { motion, useInView } from "framer-motion";
import { Box, Layers3, MousePointer2, ScanLine } from "lucide-react";
import { useRef } from "react";
import ModelViewer from "./ModelViewer";

const stages = [
  {
    icon: ScanLine,
    label: "ICP reconstruction",
    value: "103,615,118 points",
    detail: "598 RGB-D frames processed through the stakeholder ICP pipeline.",
  },
  {
    icon: Layers3,
    label: "Post-cleanup",
    value: "2,381,707 points",
    detail: "HSV green filtering, 1 cm voxel downsampling, and component cleanup.",
  },
  {
    icon: Box,
    label: "Trait geometry",
    value: "3 plant models",
    detail: "Each segmented point cloud includes its calculated convex hull.",
  },
];

export default function Visualisation() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="visualisation" ref={ref} className="relative overflow-hidden bg-[#050a0a] py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 text-xs font-bold uppercase tracking-widest text-lime-400">Interactive model evidence</div>
            <h2 className="text-4xl font-black text-white md:text-5xl">Inspect the actual reconstruction</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl text-base leading-relaxed text-green-100/55"
          >
            Switch between the complete ICP merge, the cleaned plant reconstruction, and each segmented plant.
            The plant views include the real convex-hull geometry used for trait extraction.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          <ModelViewer />
        </motion.div>

        <div className="mt-6 grid gap-px overflow-hidden border border-green-500/15 bg-green-500/15 md:grid-cols-3">
          {stages.map(({ icon: Icon, label, value, detail }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + index * 0.08 }}
              className="bg-[#0a1510] p-5"
            >
              <Icon className="mb-4 h-5 w-5 text-lime-400" />
              <div className="text-xs font-bold uppercase tracking-widest text-green-100/40">{label}</div>
              <div className="mt-2 text-xl font-black text-white">{value}</div>
              <p className="mt-2 text-sm leading-relaxed text-green-100/45">{detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-green-100/35">
          <MousePointer2 className="h-4 w-4 text-green-400/65" />
          Optimised browser samples preserve coordinates and RGB values from the full PLY outputs.
        </div>
      </div>
    </section>
  );
}
