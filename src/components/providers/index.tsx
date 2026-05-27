"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <MotionConfig
      reducedMotion={mounted ? "user" : "never"}
      transition={{ duration: 0.35 }}
    >
      {children}
    </MotionConfig>
  );
}
