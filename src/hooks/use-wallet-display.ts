"use client";

import { useAccount } from "wagmi";

function truncateAddress(address: string) {
  return `${address.slice(0, 8)}…${address.slice(-4)}`;
}

export function useWalletDisplayName(fallback = "0xBethel…A7f3") {
  const { address, isConnected } = useAccount();

  if (isConnected && address) {
    return truncateAddress(address);
  }

  return fallback;
}

export function useWalletInitials(fallback = "BH") {
  const { address, isConnected } = useAccount();

  if (isConnected && address) {
    return address.slice(2, 4).toUpperCase();
  }

  return fallback;
}
