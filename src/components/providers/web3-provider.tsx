"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import type { ReactNode } from "react";
import { WagmiProvider } from "wagmi";

import { config } from "@/lib/wallet";
import { SITE_URL } from "@/lib/env";

const queryClient = new QueryClient();

const orbitTheme = darkTheme({
  accentColor: "#8b5cf6",
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "system",
  overlayBlur: "small",
});

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={orbitTheme}
          modalSize="compact"
          appInfo={{
            appName: "OrbitOS",
            learnMoreUrl: SITE_URL,
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
