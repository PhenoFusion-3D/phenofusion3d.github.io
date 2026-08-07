"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "RGB-D", label: "In-App Gantry & RealSense Capture", color: "text-green-400" },
  { value: "ICP", label: "Colour ICP Frame Alignment & Merge", color: "text-lime-400" },
  { value: "6+", label: "Per-Pair Quality Metrics Reported", color: "text-emerald-400" },
  { value: "2 OS", label: "Lab Linux + ROS and Windows Installs", color: "text-teal-400" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a0a] via-[#071510] to-[#050a0a]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-semibold uppercase tracking-widest mb-6"
            >
              About the Project
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
            >
              Accelerating Plant Science with{" "}
              <span className="bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
                Precision Analytics
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-green-100/60 leading-relaxed mb-6 text-base"
            >
              PhenoFusion3D is a Python toolkit for RGB-D–based 3D plant reconstruction,
              developed at the ANU node of the Australian Plant Phenomics Network (APPN).
              It turns paired colour and depth images from an Intel RealSense L515 into
              coloured point clouds, aligns successive frames with ICP, and merges them
              into a single 3D plant model — efficiently, objectively, and non-destructively.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-green-100/60 leading-relaxed mb-8 text-base"
            >
              The desktop app drives the whole workflow: capturing sequences on the lab
              gantry (ROS) or directly from a RealSense camera on Windows, running depth
              and ICP quality diagnostics with PASS/WARN/FAIL verdicts, and rejecting bad
              frames automatically so they never pollute the merged cloud.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {["3D Reconstruction", "RGB-D Imaging", "Plant Phenotyping", "Open Source (MPL-2.0)"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full border border-green-500/25 bg-green-500/10 text-green-300 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="p-6 rounded-2xl border border-green-500/15 bg-gradient-to-br from-[#0f1f15] to-[#0a1510] hover:border-green-500/30 hover:shadow-lg hover:shadow-green-950/30 transition-all duration-300"
              >
                <div className={`text-4xl font-black mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-green-100/50 text-sm leading-snug">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* APPN Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 p-6 rounded-2xl border border-green-500/20 bg-gradient-to-r from-[#0f1f15] via-[#0d1c13] to-[#0f1f15] flex flex-col md:flex-row items-center gap-6"
        >
          <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-lime-500/10 border border-green-500/30 flex items-center justify-center">
            <span className="text-2xl">🌿</span>
          </div>
          <div>
            <div className="text-xs font-semibold text-green-400/70 uppercase tracking-widest mb-1">Partner Organisation</div>
            <div className="text-white font-bold text-lg">Australian Plant Phenomics Network (APPN)</div>
            <div className="text-green-100/50 text-sm mt-1">
              Providing national plant phenotyping solutions, backed by specialist technical and data expertise.
              ANU Node · The Australian National University
            </div>
          </div>
          <a
            href="https://www.plantphenomics.org.au/contact#node-anu"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex-shrink-0 px-4 py-2 border border-green-500/40 text-green-300 text-sm font-medium rounded-full hover:bg-green-500/10 transition"
          >
            Visit APPN →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
