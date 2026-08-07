import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PhenoFusion3D — RGB-D 3D Reconstruction for Plant Phenotyping",
  description:
    "PhenoFusion3D turns paired RGB and depth images into coloured point clouds, aligns frames with ICP, and merges them into 3D plant models, developed at the ANU node of the Australian Plant Phenomics Network.",
  keywords: [
    "plant phenomics",
    "RGB-D",
    "3D reconstruction",
    "point cloud",
    "ICP",
    "Open3D",
    "RealSense L515",
    "APPN",
    "ANU",
  ],
  openGraph: {
    title: "PhenoFusion3D",
    description: "RGB-D 3D Reconstruction for Plant Phenotyping",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#050a0a] text-[#f0fdf4] antialiased`}>
        {children}
      </body>
    </html>
  );
}
