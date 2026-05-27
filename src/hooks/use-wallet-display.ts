"use client";

import { useAccount } from "wagmi";
import { useMounted } from "@/hooks/use-mounted";

function truncateAddress(address: string) {
  return `${address.slice(0, 8)}…${address.slice(-4)}`;
}

export function useWalletDisplayName(fallback = "0xBethel…A7f3") {
  const mounted = useMounted();
  const { address, isConnected } = useAccount();

  if (!mounted || !isConnected || !address) {
    return fallback;
  }

  return truncateAddress(address);
}

export function useWalletInitials(fallback = "BH") {
  const mounted = useMounted();
  const { address, isConnected } = useAccount();

  if (!mounted || !isConnected || !address) {
    return fallback;
  }

  return address.slice(2, 4).toUpperCase();
}
