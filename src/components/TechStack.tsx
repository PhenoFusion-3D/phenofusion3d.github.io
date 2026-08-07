"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const techStack = [
  {
    category: "Core Processing",
    items: [
      { name: "Python 3.10+", icon: "🐍", desc: "Primary language for the pipeline, app, and tooling (3.12 in development)" },
      { name: "Open3D", icon: "🔷", desc: "RGBD-to-point-cloud conversion, colour ICP registration, and 3D visualisation" },
      { name: "NumPy / OpenCV", icon: "📐", desc: "Numerical processing, image I/O, and depth handling across the pipeline" },
    ],
  },
  {
    category: "Capture Hardware",
    items: [
      { name: "Intel RealSense L515", icon: "📷", desc: "LiDAR depth camera captured via pyrealsense2 with colour-aligned depth" },
      { name: "ROS + Gantry", icon: "🤖", desc: "Twist-based velocity control drives the lab gantry during capture (rospy)" },
      { name: "Session Metadata", icon: "🗂️", desc: "Per-capture intrinsics and frame-to-gantry-position mapping in session.json" },
    ],
  },
  {
    category: "Desktop Application",
    items: [
      { name: "PyQt5 / pyqtgraph", icon: "🪟", desc: "Cross-platform GUI with Data Capture, Data Quality, and Reconstruction panels" },
      { name: "Matplotlib", icon: "📊", desc: "Plots for quality metrics and diagnostics inside the app" },
      { name: "natsort / tqdm", icon: "⏱️", desc: "Natural-order frame pairing and progress reporting for long runs" },
    ],
  },
  {
    category: "Quality & Tooling",
    items: [
      { name: "pytest", icon: "✅", desc: "Unit tests for loader, RGBD conversion, and ICP, plus an end-to-end smoke script" },
      { name: "ruff", icon: "🧹", desc: "Linting to keep the codebase consistent across contributors" },
      { name: "Install Scripts", icon: "💾", desc: "One-command installers for lab Linux (ROS) and Windows (camera-only)" },
    ],
  },
];

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tech" ref={ref} className="relative py-28 overflow-hidden">
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
            Technology Stack
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Built with{" "}
            <span className="bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
              Scientific Rigour
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-green-100/50 max-w-xl mx-auto text-base"
          >
            The Python stack actually powering capture, reconstruction, and quality checking.
          </motion.p>
        </div>

        {/* Tech grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {techStack.map((category, ci) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + ci * 0.15 }}
              className="rounded-2xl border border-green-500/15 bg-gradient-to-br from-[#0f1f15] to-[#0a1510] overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-green-900/30 bg-[#0d1a12]">
                <div className="text-xs font-bold text-green-400/70 uppercase tracking-wider">{category.category}</div>
              </div>
              <div className="p-4 space-y-3">
                {category.items.map((item, ii) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + ci * 0.15 + ii * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-green-900/15 transition-all duration-200 cursor-default group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{item.name}</div>
                      <div className="text-green-100/40 text-xs mt-0.5 leading-relaxed">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Open source banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 p-6 rounded-2xl border border-green-500/25 bg-gradient-to-r from-green-500/10 via-lime-500/5 to-green-500/10 flex flex-col md:flex-row items-center gap-4 text-center md:text-left"
        >
          <div className="text-4xl">📖</div>
          <div>
            <div className="text-white font-bold text-lg">Open Science Principles</div>
            <div className="text-green-100/50 text-sm mt-1">
              PhenoFusion3D is MPL-2.0 licensed with setup and troubleshooting docs for Ubuntu, Windows,
              and the L515 camera, unit and smoke tests, and reproducible pipelines built for adoption
              and extension by the plant science community.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
