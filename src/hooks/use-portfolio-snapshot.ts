"use client";

import { useAccount, useBalance } from "wagmi";

import { useMounted } from "@/hooks/use-mounted";
import { CHAIN_ID } from "@/lib/env";
import {
  BASE_USDC_ADDRESS,
  buildMockPortfolioSnapshot,
  computePortfolioFromLive,
  type PortfolioSnapshot,
} from "@/lib/portfolio-data";

type PortfolioSnapshotState = {
  loading: boolean;
  snapshot: PortfolioSnapshot;
};

export function usePortfolioSnapshot(): PortfolioSnapshotState {
  const mounted = useMounted();
  const { address, isConnected, chainId } = useAccount();
  const onBase = chainId === undefined || chainId === CHAIN_ID;

  const ethQuery = useBalance({
    address,
    chainId: CHAIN_ID,
    query: { enabled: mounted && Boolean(address) && isConnected },
  });

  const usdcQuery = useBalance({
    address,
    chainId: CHAIN_ID,
    token: BASE_USDC_ADDRESS,
    query: { enabled: mounted && Boolean(address) && isConnected },
  });

  if (!mounted) {
    return { loading: true, snapshot: buildMockPortfolioSnapshot(false) };
  }

  if (!isConnected || !address) {
    return { loading: false, snapshot: buildMockPortfolioSnapshot(false) };
  }

  if (ethQuery.isLoading || usdcQuery.isLoading) {
    return { loading: true, snapshot: buildMockPortfolioSnapshot(true) };
  }

  if (ethQuery.isError && usdcQuery.isError) {
    return { loading: false, snapshot: buildMockPortfolioSnapshot(true) };
  }

  return {
    loading: false,
    snapshot: computePortfolioFromLive({
      address,
      onBase,
      ethBalanceWei: ethQuery.data?.value,
      usdcBalanceRaw: usdcQuery.data?.value,
      usdcDecimals: usdcQuery.data?.decimals,
    }),
  };
}
