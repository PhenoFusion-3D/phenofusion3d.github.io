"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, Zap, Scan, Layers, BarChart2, Download } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Capture RGB-D Sequence",
    description:
      "Drive the gantry over the plant via ROS on the lab machine, or capture directly from a RealSense L515 on Windows. Frames, intrinsics, and gantry positions are saved per session.",
    color: "green",
  },
  {
    step: "02",
    icon: Zap,
    title: "Load & Organise Data",
    description:
      "Pair RGB and depth PNGs from stakeholder or ICL-NUIM layouts with the loader, parse camera intrinsics, and reorganise raw team drops into a standard layout with CLI scripts.",
    color: "lime",
  },
  {
    step: "03",
    icon: Scan,
    title: "Run Quality Diagnostics",
    description:
      "Quick Check or Full Report computes depth validity, median depth, point count, ICP fitness, inlier RMSE, and rotation per pair, then issues a PASS/WARN/FAIL verdict.",
    color: "emerald",
  },
  {
    step: "04",
    icon: Layers,
    title: "Generate Point Clouds",
    description:
      "Convert each RGB + depth pair into a coloured Open3D point cloud, with downsampling, outlier removal, and normal estimation applied before alignment.",
    color: "teal",
  },
  {
    step: "05",
    icon: BarChart2,
    title: "Align & Merge with ICP",
    description:
      "Sequentially register frames using colour ICP with a point-to-plane fallback. Frames below the fitness or RMSE thresholds are rejected; a live merge snapshot updates each frame.",
    color: "green",
  },
  {
    step: "06",
    icon: Download,
    title: "Export Model & Metrics",
    description:
      "Write the merged cloud to PLY, save per-frame fitness and RMSE metrics to CSV, and keep quality reports (CSV + TXT) next to the dataset for reproducibility.",
    color: "lime",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  green: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", glow: "shadow-green-500/20" },
  lime: { bg: "bg-lime-500/10", border: "border-lime-500/30", text: "text-lime-400", glow: "shadow-lime-500/20" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
  teal: { bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-400", glow: "shadow-teal-500/20" },
};

export default function Pipeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pipeline" ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a0a] via-[#071510] to-[#050a0a]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-semibold uppercase tracking-widest mb-6"
          >
            Analysis Pipeline
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            From Camera Capture to{" "}
            <span className="bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
              Merged 3D Model
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-green-100/50 max-w-xl mx-auto text-base"
          >
            The reproducible, end-to-end RGB-D reconstruction pipeline as implemented.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[calc(50%-1px)] bottom-12 w-px bg-gradient-to-b from-green-500/0 via-green-500/30 to-green-500/0" />

          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
            {steps.map((step, i) => {
              const colors = colorMap[step.color];
              const isRight = i % 2 === 1;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isRight ? 60 : -60 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className={`group relative p-6 rounded-2xl border ${colors.border} bg-gradient-to-br from-[#0f1f15] to-[#0a1510] hover:shadow-xl ${colors.glow} transition-all duration-300`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className={`w-5 h-5 ${colors.text}`} strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-bold font-mono ${colors.text} opacity-60`}>
                          STEP {step.step}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1.5">{step.title}</h3>
                      <p className="text-green-100/50 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pipeline output preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 p-6 rounded-2xl border border-green-500/20 bg-[#0a1510] font-mono text-sm"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-green-900/40">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-green-500/50 text-xs ml-2">phenofusion3d — pipeline output</span>
          </div>
          <div className="space-y-1 text-xs">
            {[
              { text: "$ python main.py  # Data Capture → Data Quality → Reconstruction", color: "text-green-300" },
              { text: "[INFO] Loaded 142 RGB-D pairs: data/captures/20260406152752/", color: "text-green-100/60" },
              { text: "[INFO] Intrinsics: kdc_intrinsics.txt (640x480)... ✓", color: "text-green-100/60" },
              { text: "[INFO] Quality check: depth validity 68.4% | median depth 0.61 m... ✓", color: "text-green-100/60" },
              { text: "[INFO] rgbd2pcd: frame 0 → 156,892 pts (voxel downsample, outliers removed)... ✓", color: "text-green-100/60" },
              { text: "[INFO] Colour ICP frame 1/141: fitness 0.87 | inlier RMSE 0.0041 m... ✓", color: "text-green-100/60" },
              { text: "[WARN] Frame 57 REJECTED: fitness 0.24 < min_fitness 0.30", color: "text-lime-400" },
              { text: "  → Merged: 140/141 frames  |  mean fitness 0.83  |  mean RMSE 0.0046 m", color: "text-lime-300" },
              { text: "  → Live snapshot updated: merge_pcd_live.ply", color: "text-lime-300" },
              { text: "[SUCCESS] Exported: merge_pcd_live.ply, quality_report.csv, quality_report.txt", color: "text-emerald-400" },
            ].map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1 + i * 0.08 }}
                className={line.color}
              >
                {line.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
