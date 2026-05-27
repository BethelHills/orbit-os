"use client";

import { useMounted } from "@/hooks/use-mounted";

/** Visible in SSR HTML — required for Vercel preview screenshots and OG crawlers. */
export const SSR_SAFE_INITIAL = false;

const SSR_MOTION_ANIMATE = { opacity: 1, y: 0 } as const;

/** Framer Motion props that match SSR HTML until the client has mounted. */
export function useSsrMotionProps(delay = 0) {
  const mounted = useMounted();

  if (!mounted) {
    return {
      initial: false as const,
      animate: SSR_MOTION_ANIMATE,
      transition: { duration: 0 },
    };
  }

  return {
    initial: SSR_SAFE_INITIAL,
    animate: SSR_MOTION_ANIMATE,
    transition: { delay, duration: 0.4 },
  };
}
