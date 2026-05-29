"use client";

import { useMemo } from "react";

import { AomiFrame } from "@/components/aomi-frame";
import { createAomiClientFetch } from "@/lib/aomi-auth-adapter/aomi-client-fetch";
import { AomiWagmiAuthProvider } from "@/lib/aomi-auth-adapter/providers/wagmi-rainbowkit";

type AomiFramePanelProps = {
  className?: string;
  backendUrl?: string;
};

export function AomiFramePanel({ className, backendUrl }: AomiFramePanelProps) {
  const clientOptions = useMemo(
    () => ({
      fetch: createAomiClientFetch(),
    }),
    [],
  );

  return (
    <div className={className}>
      <AomiFrame
        authWrapper={AomiWagmiAuthProvider}
        backendUrl={backendUrl}
        clientOptions={clientOptions}
        height="100%"
        walletPosition="footer"
        showSidebar
      />
    </div>
  );
}
