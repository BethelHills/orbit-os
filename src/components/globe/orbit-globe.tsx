"use client";

import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

const arcsData = [
  {
    startLat: 6.5244,
    startLng: 3.3792,
    endLat: 37.7749,
    endLng: -122.4194,
    color: ["#8b5cf6", "#3b82f6"],
  },
  {
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 35.6762,
    endLng: 139.6503,
    color: ["#a855f7", "#22d3ee"],
  },
  {
    startLat: -23.5505,
    startLng: -46.6333,
    endLat: 48.8566,
    endLng: 2.3522,
    color: ["#7c3aed", "#2563eb"],
  },
];

const pointsData = [
  { lat: 6.5244, lng: 3.3792 },
  { lat: 37.7749, lng: -122.4194 },
  { lat: 51.5072, lng: -0.1276 },
  { lat: 35.6762, lng: 139.6503 },
];

export function OrbitGlobe() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-violet-500/20 bg-[#050510] min-h-[430px] shadow-[0_0_70px_rgba(124,58,237,0.18)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.25),transparent_45%)]" />

      <div className="absolute left-6 top-6 z-20">
        <p className="text-sm font-bold tracking-[0.12em] text-violet-100">
          AOMI NETWORK VISUALIZATION
        </p>
      </div>

      <div className="relative z-10 h-[430px] w-full">
        <Globe
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor="#a855f7"
          atmosphereAltitude={0.2}
          arcsData={arcsData}
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={2}
          arcDashAnimateTime={1800}
          arcStroke={0.8}
          pointsData={pointsData}
          pointColor={() => "#a855f7"}
          pointAltitude={0.02}
          pointRadius={0.45}
          width={900}
          height={430}
        />
      </div>
    </section>
  );
}
