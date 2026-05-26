"use client";

import { useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";
import { BUMP_TEXTURE, GLOBE_TEXTURE } from "@/components/globe/globe-textures";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

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

interface GlobeSceneProps {
  width: number;
  height: number;
  globeOffset?: [number, number];
}

export function GlobeScene({ width, height, globeOffset = [0, 0] }: GlobeSceneProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const enableAutoRotate = useCallback(() => {
    const controls = globeRef.current?.controls();
    if (!controls) return;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.85;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
  }, []);

  useEffect(() => {
    enableAutoRotate();
  }, [enableAutoRotate, width, height]);

  return (
    <Globe
      ref={globeRef}
      width={width}
      height={height}
      animateIn={false}
      waitForGlobeReady={false}
      globeOffset={globeOffset}
      globeImageUrl={GLOBE_TEXTURE}
      bumpImageUrl={BUMP_TEXTURE}
      backgroundColor="rgba(0,0,0,0)"
      atmosphereColor="#a855f7"
      atmosphereAltitude={0.22}
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
      onGlobeReady={enableAutoRotate}
    />
  );
}
