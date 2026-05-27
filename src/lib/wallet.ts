"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  base as baseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { base } from "wagmi/chains";

import { CHAIN_ID, WALLETCONNECT_PROJECT_ID } from "@/lib/env";

export { CHAIN_ID };

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://orbit-os-rho.vercel.app";

export const config = getDefaultConfig({
  appName: "OrbitOS",
  appDescription: "AI Operating System for On-chain Actions",
  appUrl: siteUrl,
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [base],
  ssr: false,
  multiInjectedProviderDiscovery: true,
  wallets: [
    {
      groupName: "Popular",
      wallets: [rainbowWallet, baseWallet, metaMaskWallet, walletConnectWallet],
    },
  ],
});
