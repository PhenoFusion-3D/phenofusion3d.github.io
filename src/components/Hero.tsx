"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Box, Camera, GitMerge, Ruler } from "lucide-react";

const headlineMetrics = [
  { icon: Camera, label: "RGB-D frames", value: "598" },
  { icon: GitMerge, label: "ICP points", value: "103.6M" },
  { icon: Box, label: "Cleaned points", value: "2.38M" },
  { icon: Ruler, label: "Segmented plants", value: "3" },
];

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[86vh] items-end overflow-hidden bg-[#030806] pt-28">
      <Image
        src="/results/post-cleanup-oblique.png"
        alt="PhenoFusion3D post-cleanup plant reconstruction"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-70"
        unoptimized
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,8,6,0.98)_0%,rgba(3,8,6,0.78)_45%,rgba(3,8,6,0.28)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,8,6,0.98)_0%,transparent_48%,rgba(3,8,6,0.45)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lime-300"
        >
          <span className="h-2 w-2 bg-lime-400" />
          Australian Plant Phenomics Network | ANU Node
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="max-w-4xl text-4xl font-black leading-[1.02] text-white sm:text-5xl md:text-7xl lg:text-8xl"
        >
          PhenoFusion3D
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mt-5 max-w-2xl text-xl font-medium text-green-100/85 md:text-2xl"
        >
          RGB-D reconstruction and measurable 3D plant traits
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-4 max-w-2xl text-sm leading-relaxed text-green-100/58 md:text-base"
        >
          Capture plants with a RealSense L515 and motorised gantry, reconstruct the RGB-D sequence with ICP,
          clean and segment the point cloud, then export plant dimensions, heights, and convex-hull traits.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a
            href="#visualisation"
            className="inline-flex items-center gap-2 bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
          >
            Explore 3D models
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="#results"
            className="inline-flex items-center border border-green-200/30 bg-black/30 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-green-500/15"
          >
            View measured results
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42 }}
          className="mt-10 grid max-w-4xl grid-cols-2 gap-px overflow-hidden border border-green-200/15 bg-green-200/15 sm:grid-cols-4"
        >
          {headlineMetrics.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-black/55 p-4 backdrop-blur">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-100/45">
                <Icon className="h-3.5 w-3.5 text-lime-400" />
                {label}
              </div>
              <div className="mt-2 text-2xl font-black text-white">{value}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
