"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import type { ReactNode } from "react";
import { WagmiProvider } from "wagmi";

import { useTheme } from "@/components/providers/theme-provider";
import { config } from "@/lib/wallet";
import { SITE_URL } from "@/lib/env";

const queryClient = new QueryClient();

const orbitDarkTheme = darkTheme({
  accentColor: "#8b5cf6",
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "system",
  overlayBlur: "small",
});

const orbitLightTheme = lightTheme({
  accentColor: "#7c3aed",
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "system",
  overlayBlur: "small",
});

interface Web3ProviderProps {
  children: ReactNode;
}

function RainbowKitThemeProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <RainbowKitProvider
      theme={resolvedTheme === "light" ? orbitLightTheme : orbitDarkTheme}
      modalSize="compact"
      appInfo={{
        appName: "OrbitOS",
        learnMoreUrl: SITE_URL,
      }}
    >
      {children}
    </RainbowKitProvider>
  );
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <RainbowKitThemeProvider>{children}</RainbowKitThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
