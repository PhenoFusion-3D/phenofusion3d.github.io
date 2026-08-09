"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Download, FileJson, GitCompareArrows, Images, Ruler } from "lucide-react";
import { useRef } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const metrics = [
  { label: "RGB-D frames", value: "598", note: "Complete dataset capture" },
  { label: "Successful ICP frames", value: "577", note: "21 frames rejected or failed" },
  { label: "Raw reconstructed points", value: "103.6M", note: "Full stakeholder ICP output" },
  { label: "Cleaned points", value: "2.38M", note: "Plant-focused post-cleanup model" },
];

const gallery = [
  {
    src: "/results/capture-frame.png",
    title: "RGB capture frame",
    caption: "Representative colour frame from test_plant_20230809133659.",
  },
  {
    src: "/results/selected-frames-mosaic.jpg",
    title: "Selected RGB-D sequence",
    caption: "Frames across the gantry traversal used to inspect capture coverage.",
  },
  {
    src: "/results/fused-rgb-masked.png",
    title: "Plant foreground mask",
    caption: "RGB evidence after foreground isolation for plant-focused processing.",
  },
  {
    src: "/results/fused-depth.png",
    title: "Fused depth evidence",
    caption: "Depth continuity view used during canopy reconstruction diagnostics.",
  },
  {
    src: "/results/icp-full-front.png",
    title: "Full ICP reconstruction",
    caption: "Front inspection rendered from merge_simple_full/merge_pcd_cam0.ply.",
  },
  {
    src: "/results/icp-full-top.png",
    title: "ICP top inspection",
    caption: "Top view of the same 103,615,118-point reconstruction.",
  },
  {
    src: "/results/post-cleanup-oblique.png",
    title: "Post-cleanup reconstruction",
    caption: "Oblique view rendered from post_cleanup/cleaned_plant.ply.",
  },
  {
    src: "/results/plant-1-traits.png",
    title: "Plant 1 trait input",
    caption: "Largest segmented plant used for bounding-box, height, and hull traits.",
  },
  {
    src: "/results/plant-2-traits.png",
    title: "Plant 2 trait input",
    caption: "Second segmented plant with 300,842 source points.",
  },
  {
    src: "/results/plant-3-traits.png",
    title: "Plant 3 trait input",
    caption: "Third segmented plant with 192,761 source points.",
  },
];

const traitRows = [
  {
    plant: "Plant 1",
    points: "1,883,153",
    dimensions: "2.244 x 2.565 x 2.190",
    hullArea: "15.817",
    hullVolume: "4.807",
    top5: "1.553",
  },
  {
    plant: "Plant 2",
    points: "300,842",
    dimensions: "0.925 x 0.700 x 0.809",
    hullArea: "1.926",
    hullVolume: "0.221",
    top5: "0.596",
  },
  {
    plant: "Plant 3",
    points: "192,761",
    dimensions: "0.823 x 0.668 x 0.696",
    hullArea: "1.781",
    hullVolume: "0.201",
    top5: "0.580",
  },
];

const completedWork = [
  "RGB and depth capture with intrinsics and gantry position metadata",
  "Sequential ICP reconstruction with per-frame acceptance and live merge output",
  "Streaming HSV cleanup, 1 cm voxel downsampling, and plant-focused filtering",
  "Three-plant segmentation from the cleaned reconstruction",
  "Bounding-box dimensions, volume, maximum height, and percentile heights",
  "Convex-hull surface area, volume, and PLY geometry for every segmented plant",
  "JSON and CSV trait exports plus reproducible command-line workflows",
];

const downloads = [
  { label: "Reconstruction summary", file: "reconstruction-summary.json" },
  { label: "Cleanup summary", file: "cleanup-summary.json" },
  { label: "Segmentation summary", file: "segmentation-summary.json" },
  { label: "Plant 1 traits", file: "plant-1-traits.json" },
  { label: "Plant 2 traits", file: "plant-2-traits.json" },
  { label: "Plant 3 traits", file: "plant-3-traits.json" },
];

export default function Results() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="results" ref={ref} className="relative overflow-hidden bg-[#07100b] py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-5 text-xs font-bold uppercase tracking-widest text-lime-400"
          >
            Current project results
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="text-4xl font-black text-white md:text-5xl"
          >
            One dataset, shown from capture to calculated traits
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16 }}
            className="mt-5 text-base leading-relaxed text-green-100/55"
          >
            Every result below comes from <span className="font-mono text-green-200">test_plant_20230809133659</span>.
            The evidence follows the implemented stakeholder ICP path, its post-cleanup model, three segmented plants,
            and the trait files generated from those plants.
          </motion.p>
        </div>

        <div className="grid gap-px overflow-hidden border border-green-500/15 bg-green-500/15 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12 + index * 0.06 }}
              className="bg-[#0b1710] p-5"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-green-100/40">{metric.label}</div>
              <div className="mt-3 text-3xl font-black text-white">{metric.value}</div>
              <div className="mt-2 text-xs text-green-100/40">{metric.note}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lime-400">
              <Images className="h-4 w-4" />
              Reconstruction evidence
            </div>
            <h3 className="mt-3 text-2xl font-black text-white">Actual images from the working dataset</h3>
          </div>
          <div className="hidden font-mono text-xs text-green-100/35 sm:block">10 evidence views</div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((shot, index) => (
            <motion.figure
              key={shot.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + Math.min(index, 5) * 0.05 }}
              className="overflow-hidden border border-green-500/15 bg-[#0a1510]"
            >
              <div className="relative aspect-[16/10] bg-[#030806]">
                <Image
                  src={shot.src}
                  alt={shot.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain"
                  unoptimized
                />
              </div>
              <figcaption className="border-t border-green-500/10 p-4">
                <div className="font-semibold text-white">{shot.title}</div>
                <div className="mt-1 text-xs leading-relaxed text-green-100/45">{shot.caption}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lime-400">
              <Ruler className="h-4 w-4" />
              Extracted 3D traits
            </div>
            <h3 className="mt-3 text-2xl font-black text-white">Measured outputs for all segmented plants</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-green-100/45">
              Dimensions are width x depth x height in metres. The complete files also include bounding-box volume,
              maximum height, and top 1%, 3%, 5%, 10%, and 13% height percentiles.
            </p>

            <div className="mt-6 overflow-x-auto border border-green-500/15">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-green-500/10 text-xs uppercase tracking-wider text-green-200/70">
                  <tr>
                    <th className="px-4 py-3">Plant</th>
                    <th className="px-4 py-3">Source points</th>
                    <th className="px-4 py-3">W x D x H (m)</th>
                    <th className="px-4 py-3">Hull area (m2)</th>
                    <th className="px-4 py-3">Hull volume (m3)</th>
                    <th className="px-4 py-3">Top 5% height (m)</th>
                  </tr>
                </thead>
                <tbody>
                  {traitRows.map((row) => (
                    <tr key={row.plant} className="border-t border-green-500/10 bg-[#0a1510] text-green-100/65">
                      <td className="px-4 py-3 font-semibold text-white">{row.plant}</td>
                      <td className="px-4 py-3 font-mono">{row.points}</td>
                      <td className="px-4 py-3 font-mono">{row.dimensions}</td>
                      <td className="px-4 py-3 font-mono">{row.hullArea}</td>
                      <td className="px-4 py-3 font-mono">{row.hullVolume}</td>
                      <td className="px-4 py-3 font-mono">{row.top5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="min-w-0 border border-green-500/15 bg-[#0a1510] p-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lime-400">
              <FileJson className="h-4 w-4" />
              Evidence files
            </div>
            <h3 className="mt-3 text-xl font-black text-white">Download project summaries</h3>
            <div className="mt-5 divide-y divide-green-500/10 border-y border-green-500/10">
              {downloads.map((item) => (
                <a
                  key={item.file}
                  href={`${basePath}/results/downloads/${item.file}`}
                  download
                  className="flex items-center justify-between gap-3 py-3 text-sm text-green-100/65 transition hover:text-white"
                >
                  {item.label}
                  <Download className="h-4 w-4 flex-shrink-0 text-green-400" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-green-100/35">
              CSV trait tables and convex-hull PLY files are included in the website assets.
            </p>
          </aside>
        </div>

        <div className="mt-16 grid gap-8 border-t border-green-500/15 pt-10 lg:grid-cols-[1fr_0.55fr]">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-lime-400">Implemented progress</div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {completedWork.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-relaxed text-green-100/60">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="border-l-2 border-amber-300/60 bg-amber-300/5 p-5">
            <GitCompareArrows className="h-5 w-5 text-amber-300" />
            <div className="mt-3 text-xs font-bold uppercase tracking-widest text-amber-200/70">Validation in progress</div>
            <h3 className="mt-2 text-lg font-bold text-white">Compare calculated traits with manual measurements</h3>
            <p className="mt-3 text-sm leading-relaxed text-green-100/50">
              The software outputs are complete. The next sprint task is to quantify agreement, error, and repeatability
              against the stakeholder&apos;s manual reference measurements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
