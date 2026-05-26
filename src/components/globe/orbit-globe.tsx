"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export function OrbitGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 600, h: 420 });
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

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="glass-strong neon-border relative min-h-[420px] overflow-hidden rounded-3xl lg:min-h-[520px]"
    >
      <div className="relative z-10 p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-purple-400">
          Network Matrix
        </p>
        <h2 className="neon-text mt-1 text-2xl font-bold lg:text-3xl">
          Orbit Protocol Globe
        </h2>
        <p className="mt-2 max-w-lg text-sm text-slate-400">
          Aomi agents routing Zora creator flows across Base in real time.
        </p>
      </div>

      <div
        ref={containerRef}
        className="absolute inset-x-0 bottom-0 top-16 flex items-center justify-center"
      >
        {mounted && (
          <Globe
            width={dims.w}
            height={dims.h}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            atmosphereColor="#a855f7"
            atmosphereAltitude={0.18}
            pointsData={[
              { lat: 37.77, lng: -122.42, size: 0.7, color: "#a855f7" },
              { lat: 40.71, lng: -74.01, size: 0.5, color: "#3b82f6" },
              { lat: 51.51, lng: -0.13, size: 0.45, color: "#22d3ee" },
            ]}
            pointAltitude="size"
            pointColor="color"
            pointRadius={0.5}
          />
        )}
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-10 grid grid-cols-3 gap-2">
        {["Zora", "Aerodrome", "Avantis"].map((node) => (
          <div key={node} className="glass rounded-xl px-3 py-2 text-center">
            <p className="text-[10px] text-slate-500">{node}</p>
            <p className="text-xs font-medium text-green-300">Connected</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
