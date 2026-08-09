"use client";

import { Box, Pause, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type TraitSummary = {
  pointCount: number;
  widthM: number;
  depthM: number;
  heightM: number;
  bboxVolumeM3: number;
  hullAreaM2: number;
  hullVolumeM3: number;
  heightTop1PctM: number;
  heightTop3PctM: number;
  heightTop5PctM: number;
  heightTop10PctM: number;
  heightTop13PctM: number;
};

type ModelEntry = {
  id: string;
  label: string;
  description: string;
  file: string;
  source: string;
  sourcePointCount: number;
  sampledPointCount: number;
  boundsMetres: { min: number[]; max: number[]; extent: number[] };
  hullFile?: string;
  traits?: TraitSummary;
};

type Manifest = {
  dataset: string;
  models: ModelEntry[];
};

type HullPayload = {
  vertices: number[][];
  faces: number[][];
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function disposeGroup(group: THREE.Group) {
  group.traverse((object) => {
    if (object instanceof THREE.Points || object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
      object.geometry.dispose();
      const material = object.material;
      if (Array.isArray(material)) material.forEach((entry) => entry.dispose());
      else material.dispose();
    }
  });
}

export default function ModelViewer() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const hullObjectsRef = useRef<THREE.Object3D[]>([]);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [activeId, setActiveId] = useState("icp-full");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showHull, setShowHull] = useState(true);

  const activeModel = useMemo(
    () => manifest?.models.find((entry) => entry.id === activeId) ?? null,
    [activeId, manifest],
  );

  const resetCamera = useCallback(() => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    camera.position.set(1.25, 0.16, 1.65);
    controls.target.set(0, 0, 0);
    controls.update();
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`${basePath}/results/manifest.json`)
      .then((response) => {
        if (!response.ok) throw new Error(`Manifest request failed (${response.status})`);
        return response.json();
      })
      .then((data: Manifest) => {
        if (!cancelled) setManifest(data);
      })
      .catch((reason: Error) => {
        if (!cancelled) setError(reason.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#030806");
    scene.fog = new THREE.FogExp2("#030806", 0.55);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 0.65;
    controls.maxDistance = 4;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.75;

    const grid = new THREE.GridHelper(2.5, 14, 0x1f6f43, 0x123622);
    grid.position.y = -0.57;
    const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.28;
    });
    scene.add(grid);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    controlsRef.current = controls;
    modelGroupRef.current = modelGroup;
    resetCamera();

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    let animationFrame = 0;
    const render = () => {
      controls.update();
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      controls.dispose();
      disposeGroup(modelGroup);
      renderer.dispose();
      renderer.domElement.remove();
      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
      controlsRef.current = null;
      modelGroupRef.current = null;
    };
  }, [resetCamera]);

  useEffect(() => {
    if (controlsRef.current) controlsRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    hullObjectsRef.current.forEach((object) => {
      object.visible = showHull;
    });
  }, [showHull]);

  useEffect(() => {
    const group = modelGroupRef.current;
    if (!activeModel || !group) return;
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    const load = async () => {
      const cloudResponse = await fetch(`${basePath}/results/${activeModel.file}`, { signal: controller.signal });
      if (!cloudResponse.ok) throw new Error(`Point-cloud request failed (${cloudResponse.status})`);
      const buffer = await cloudResponse.arrayBuffer();
      const view = new DataView(buffer);
      const magic = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3));
      if (magic !== "PF3D") {
        throw new Error("Point-cloud asset has an invalid header");
      }
      const count = view.getUint32(4, true);
      const expectedBytes = 8 + count * 15;
      if (buffer.byteLength !== expectedBytes) throw new Error("Point-cloud asset is incomplete");

      const positions = new Float32Array(count * 3);
      const colours = new Float32Array(count * 3);
      let offset = 8;
      for (let index = 0; index < count; index += 1) {
        const target = index * 3;
        positions[target] = view.getFloat32(offset, true);
        positions[target + 1] = view.getFloat32(offset + 4, true);
        positions[target + 2] = view.getFloat32(offset + 8, true);
        colours[target] = Math.min(1, 0.16 + (view.getUint8(offset + 12) / 255) * 1.28);
        colours[target + 1] = Math.min(1, 0.16 + (view.getUint8(offset + 13) / 255) * 1.28);
        colours[target + 2] = Math.min(1, 0.16 + (view.getUint8(offset + 14) / 255) * 1.28);
        offset += 15;
      }

      const nextObjects: THREE.Object3D[] = [];
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colours, 3));
      geometry.computeBoundingSphere();
      const material = new THREE.PointsMaterial({
        size: activeModel.id === "icp-full" ? 0.01 : 0.012,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.96,
      });
      nextObjects.push(new THREE.Points(geometry, material));

      const nextHullObjects: THREE.Object3D[] = [];
      if (activeModel.hullFile) {
        const hullResponse = await fetch(`${basePath}/results/${activeModel.hullFile}`, { signal: controller.signal });
        if (!hullResponse.ok) throw new Error(`Convex-hull request failed (${hullResponse.status})`);
        const hull = (await hullResponse.json()) as HullPayload;
        const hullGeometry = new THREE.BufferGeometry();
        hullGeometry.setAttribute("position", new THREE.Float32BufferAttribute(hull.vertices.flat(), 3));
        hullGeometry.setIndex(hull.faces.flat());
        hullGeometry.computeVertexNormals();
        const hullMesh = new THREE.Mesh(
          hullGeometry,
          new THREE.MeshBasicMaterial({ color: 0x45e675, transparent: true, opacity: 0.13, side: THREE.DoubleSide }),
        );
        const hullEdges = new THREE.LineSegments(
          new THREE.EdgesGeometry(hullGeometry, 16),
          new THREE.LineBasicMaterial({ color: 0x9cff65, transparent: true, opacity: 0.72 }),
        );
        hullMesh.visible = showHull;
        hullEdges.visible = showHull;
        nextHullObjects.push(hullMesh, hullEdges);
        nextObjects.push(hullMesh, hullEdges);
      }

      if (controller.signal.aborted) {
        nextObjects.forEach((object) => {
          if (object instanceof THREE.Points || object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
            object.geometry.dispose();
          }
        });
        return;
      }

      disposeGroup(group);
      group.clear();
      nextObjects.forEach((object) => group.add(object));
      hullObjectsRef.current = nextHullObjects;
      resetCamera();
      setIsLoading(false);
    };

    load().catch((reason: Error) => {
      if (reason.name !== "AbortError") {
        setError(reason.message);
        setIsLoading(false);
      }
    });
    return () => controller.abort();
  }, [activeModel, resetCamera]);

  return (
    <div className="overflow-hidden border border-green-500/20 bg-[#07100b]">
      <div
        className="flex gap-1 overflow-x-auto border-b border-green-500/15 bg-[#0b1710] p-2 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
        role="tablist"
        aria-label="3D reconstruction models"
      >
        {manifest?.models.map((model) => (
          <button
            key={model.id}
            type="button"
            role="tab"
            aria-selected={activeId === model.id}
            onClick={() => {
              setActiveId(model.id);
              setShowHull(true);
            }}
            className={`whitespace-nowrap border-b-2 px-3 py-2 text-xs font-semibold transition-colors ${
              activeId === model.id
                ? "border-lime-400 bg-green-500/10 text-white"
                : "border-transparent text-green-100/45 hover:text-green-200"
            }`}
          >
            {model.label}
          </button>
        ))}
      </div>

      <div className="relative h-[440px] sm:h-[520px]" aria-label="Interactive PhenoFusion3D point-cloud viewer">
        <div ref={mountRef} className="absolute inset-0" />
        <div className="pointer-events-none absolute left-4 top-4 max-w-[min(360px,calc(100%-32px))] border border-green-500/20 bg-black/65 px-3 py-2 backdrop-blur">
          <div className="text-[10px] font-bold uppercase tracking-widest text-lime-400">Actual project output</div>
          <div className="mt-1 text-sm font-semibold text-white">{activeModel?.label ?? "Loading reconstruction"}</div>
          {activeModel && <div className="mt-1 text-xs leading-relaxed text-green-100/55">{activeModel.description}</div>}
        </div>

        <div className="absolute bottom-4 left-4 flex gap-2">
          <button
            type="button"
            onClick={() => setAutoRotate((value) => !value)}
            className="flex h-10 w-10 items-center justify-center border border-green-500/25 bg-black/65 text-green-200 backdrop-blur transition hover:bg-green-500/15"
            aria-label={autoRotate ? "Pause model rotation" : "Resume model rotation"}
            title={autoRotate ? "Pause rotation" : "Resume rotation"}
          >
            {autoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={resetCamera}
            className="flex h-10 w-10 items-center justify-center border border-green-500/25 bg-black/65 text-green-200 backdrop-blur transition hover:bg-green-500/15"
            aria-label="Reset 3D view"
            title="Reset view"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          {activeModel?.hullFile && (
            <button
              type="button"
              onClick={() => setShowHull((value) => !value)}
              className={`flex h-10 items-center gap-2 border px-3 text-xs font-semibold backdrop-blur transition ${
                showHull
                  ? "border-lime-400/50 bg-lime-400/15 text-lime-200"
                  : "border-green-500/25 bg-black/65 text-green-100/55"
              }`}
              aria-pressed={showHull}
            >
              <Box className="h-4 w-4" />
              Hull
            </button>
          )}
        </div>

        {activeModel && (
          <div className="pointer-events-none absolute bottom-4 right-4 hidden border border-green-500/20 bg-black/65 px-3 py-2 text-right text-xs backdrop-blur sm:block">
            <div className="font-mono text-green-100/75">{activeModel.sampledPointCount.toLocaleString()} web points</div>
            <div className="mt-0.5 text-green-100/40">from {activeModel.sourcePointCount.toLocaleString()} source points</div>
          </div>
        )}

        {(isLoading || error) && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#030806]/55">
            <div className={`border px-4 py-3 text-sm backdrop-blur ${error ? "border-red-400/35 text-red-200" : "border-green-500/25 text-green-100/70"}`}>
              {error ?? "Loading actual point-cloud data..."}
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-3 border-t border-green-500/15 bg-[#0b1710] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <div className="text-sm font-semibold text-white">{activeModel?.source ?? "Preparing model metadata"}</div>
          <div className="mt-1 text-xs text-green-100/40">Drag to rotate. Scroll or pinch to zoom.</div>
        </div>
        {activeModel?.traits && (
          <div className="grid grid-cols-3 gap-4 text-right">
            <div><div className="text-[10px] uppercase tracking-wider text-green-100/35">Height</div><div className="font-mono text-sm text-lime-300">{activeModel.traits.heightM.toFixed(3)} m</div></div>
            <div><div className="text-[10px] uppercase tracking-wider text-green-100/35">Hull area</div><div className="font-mono text-sm text-lime-300">{activeModel.traits.hullAreaM2.toFixed(3)} m2</div></div>
            <div><div className="text-[10px] uppercase tracking-wider text-green-100/35">Hull volume</div><div className="font-mono text-sm text-lime-300">{activeModel.traits.hullVolumeM3.toFixed(3)} m3</div></div>
          </div>
        )}
      </div>
    </div>
  );
}
