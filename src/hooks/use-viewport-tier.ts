"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";

export type ViewportTier = "mobile" | "tablet" | "desktop";

export function useViewportTier(): ViewportTier {
  const mounted = useMounted();
  const isTabletUp = useMediaQuery("(min-width: 768px)");
  const isDesktopUp = useMediaQuery("(min-width: 1024px)");

  if (!mounted) return "mobile";

  if (isDesktopUp) return "desktop";
  if (isTabletUp) return "tablet";
  return "mobile";
}
