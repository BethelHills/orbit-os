"use client";

import { MotionConfig } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.35 }}>
      {children}
    </MotionConfig>
  );
}
