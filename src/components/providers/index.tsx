"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.35 }}>
      {children}
    </MotionConfig>
  );
}
