"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";

import { WalletProvider } from "@/components/providers/wallet-provider";

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WalletProvider>
      <MotionConfig
        reducedMotion={mounted ? "user" : "never"}
        transition={{ duration: 0.35 }}
      >
        {children}
      </MotionConfig>
    </WalletProvider>
  );
}
