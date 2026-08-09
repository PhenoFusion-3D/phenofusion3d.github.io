"use client";

import { motion, useInView } from "framer-motion";
import { Camera, CheckCircle2, Download, Filter, GitMerge, Ruler, Split } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: Camera,
    step: "01",
    title: "Capture RGB-D data",
    description: "Collect colour, depth, camera intrinsics, and gantry positions. This dataset contains 598 frames.",
    evidence: "rgb/ + depth/ + intrinsics",
  },
  {
    icon: GitMerge,
    step: "02",
    title: "Reconstruct with ICP",
    description: "Register the capture sequence and merge accepted frames into a coloured full-scene point cloud.",
    evidence: "577 successful frames | 103,615,118 points",
  },
  {
    icon: Filter,
    step: "03",
    title: "Clean the reconstruction",
    description: "Apply streaming HSV green filtering, 1 cm voxel downsampling, and coarse component cleanup.",
    evidence: "post_cleanup/cleaned_plant.ply | 2,381,707 points",
  },
  {
    icon: Split,
    step: "04",
    title: "Segment individual plants",
    description: "Separate the cleaned reconstruction into three plant point clouds for plant-level analysis.",
    evidence: "plants/plant_1.ply to plant_3.ply",
  },
  {
    icon: Ruler,
    step: "05",
    title: "Calculate 3D traits",
    description: "Measure dimensions, volumes, maximum height, percentile heights, and convex-hull geometry.",
    evidence: "traits.json + traits.csv + convex_hull.ply",
  },
  {
    icon: Download,
    step: "06",
    title: "Export evidence for validation",
    description: "Publish viewable models and machine-readable outputs ready for manual measurement comparison.",
    evidence: "PLY + JSON + CSV",
  },
];

export default function Pipeline() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pipeline" ref={ref} className="relative overflow-hidden bg-[#07100b] py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-5 text-xs font-bold uppercase tracking-widest text-lime-400"
          >
            Implemented pipeline
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="text-4xl font-black text-white md:text-5xl"
          >
            From gantry capture to validated trait files
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-green-100/55"
          >
            The website now follows the outputs that exist in the repository, using the same dataset at every stage.
          </motion.p>
        </div>

        <div className="grid gap-px overflow-hidden border border-green-500/15 bg-green-500/15 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ icon: Icon, step, title, description, evidence }, index) => (
            <motion.article
              key={step}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 + index * 0.07 }}
              className="bg-[#0a1510] p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center border border-green-500/25 bg-green-500/10">
                  <Icon className="h-5 w-5 text-lime-400" />
                </div>
                <div className="font-mono text-xs text-green-100/30">STEP {step}</div>
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-green-100/50">{description}</p>
              <div className="mt-5 flex items-start gap-2 border-t border-green-500/10 pt-4 text-xs text-green-200/55">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-green-400" />
                <span className="font-mono leading-relaxed">{evidence}</span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
          className="mt-6 grid gap-3 border border-green-500/15 bg-[#050a0a] p-5 font-mono text-xs text-green-100/55 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div><span className="text-green-400">pipeline</span> stakeholder_icp</div>
          <div><span className="text-green-400">depth</span> 500-4000 mm</div>
          <div><span className="text-green-400">voxel</span> 0.01 m</div>
          <div><span className="text-green-400">exports</span> PLY / JSON / CSV</div>
        </motion.div>
      </div>
    </section>
  );
}
