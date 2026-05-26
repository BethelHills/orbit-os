"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SSR_SAFE_INITIAL } from "@/lib/motion";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const stats = [
  { label: "Active Agents", value: "12,458", change: "+24.3%" },
  { label: "Actions Executed", value: "47,892", change: "+31.2%" },
  { label: "Data Points Processed", value: "2.14TB", change: "+18.7%" },
];

const nodes = [
  { name: "Aerodrome", agents: "2,847", lat: 52, lng: -10, color: "#6366f1" },
  { name: "Zora", agents: "1,923", lat: 38, lng: -95, color: "#a855f7" },
  { name: "Limitless", agents: "1,456", lat: -20, lng: 140, color: "#22d3ee" },
  { name: "Avantis", agents: "987", lat: 20, lng: 75, color: "#3b82f6" },
  { name: "Monad", agents: "654", lat: -30, lng: -60, color: "#8b5cf6" },
];

export function OrbitGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 600, h: 480 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDims({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const arcs = nodes.flatMap((a, i) =>
    nodes.slice(i + 1).map((b) => ({
      startLat: a.lat,
      startLng: a.lng,
      endLat: b.lat,
      endLng: b.lng,
      color: ["rgba(168,85,247,0.4)", "rgba(59,130,246,0.15)"],
    }))
  );

  return (
    <motion.section
      initial={SSR_SAFE_INITIAL}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="glass-strong relative min-h-[480px] overflow-hidden rounded-3xl lg:min-h-[540px]"
    >
      <div className="absolute left-0 top-0 z-10 flex flex-col gap-4 p-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={SSR_SAFE_INITIAL}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
              {s.label}
            </p>
            <p className="mt-0.5 text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs font-medium text-green-400">{s.change}</p>
          </motion.div>
        ))}
      </div>

      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {mounted && (
          <Globe
            width={dims.w}
            height={dims.h}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            atmosphereColor="#a855f7"
            atmosphereAltitude={0.22}
            pointsData={nodes.map((n) => ({
              lat: n.lat,
              lng: n.lng,
              size: 0.6,
              color: n.color,
            }))}
            pointAltitude={0.05}
            pointColor="color"
            pointRadius={0.45}
            arcsData={arcs}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={2000}
            arcStroke={0.5}
          />
        )}
      </div>

      {nodes.map((node, i) => (
        <motion.div
          key={node.name}
          initial={SSR_SAFE_INITIAL}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.08 }}
          className="absolute z-10 hidden rounded-xl border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-md lg:block"
          style={{
            top: `${18 + i * 14}%`,
            right: i % 2 === 0 ? "8%" : "22%",
          }}
        >
          <p className="text-[10px] font-medium text-white">{node.name}</p>
          <p className="text-[10px] text-purple-300">{node.agents} agents</p>
        </motion.div>
      ))}

      <button className="absolute bottom-5 left-6 z-10 flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-medium text-purple-200 transition hover:bg-purple-500/20">
        View Network Map
        <ArrowRight size={14} />
      </button>
    </motion.section>
  );
}
