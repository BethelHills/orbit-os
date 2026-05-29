"use client";

import { AomiFrame } from "@/components/aomi-frame";
import { AomiWagmiAuthProvider } from "@/lib/aomi-auth-adapter/providers/wagmi-rainbowkit";

type AomiFramePanelProps = {
  className?: string;
  backendUrl?: string;
};

export function AomiFramePanel({ className, backendUrl }: AomiFramePanelProps) {
  return (
    <div className={className}>
      <AomiFrame
        authWrapper={AomiWagmiAuthProvider}
        backendUrl={backendUrl}
        height="100%"
        walletPosition="footer"
        showSidebar
      />
    </div>
  );
}
