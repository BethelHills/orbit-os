"use client";

import { useEffect } from "react";

const GLOBE_TEXTURE = "/globe/earth-night.jpg";
const BUMP_TEXTURE = "/globe/earth-topology.png";

export function GlobePrefetch() {
  useEffect(() => {
    void import("@/components/globe/globe-scene");
    const img = new Image();
    img.src = GLOBE_TEXTURE;
    const bump = new Image();
    bump.src = BUMP_TEXTURE;
  }, []);

  return null;
}
