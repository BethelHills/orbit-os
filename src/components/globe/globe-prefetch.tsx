"use client";

import { useEffect } from "react";
import { BUMP_TEXTURE, GLOBE_TEXTURE } from "@/components/globe/globe-textures";

export function GlobePrefetch() {
  useEffect(() => {
    void import("@/components/globe/globe-scene");
    void import("react-globe.gl");
    const img = new Image();
    img.src = GLOBE_TEXTURE;
    const bump = new Image();
    bump.src = BUMP_TEXTURE;
  }, []);

  return null;
}
