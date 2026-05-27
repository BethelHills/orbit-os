"use client";

import { useAccount, useBalance, useGasPrice } from "wagmi";
import {
  deriveLiveMetrics,
  zoraSparkline,
  formatVolumeUsd,
} from "@/lib/dashboard/live-metrics";
import {
  useActivityLogs,
  useAnalytics,
  useCoin,
  useLastTxHash,
} from "@/store/orbit-store";

export function useLiveMetrics() {
  const coin = useCoin();
  const logs = useActivityLogs();
  const analytics = useAnalytics();
  const lastTxHash = useLastTxHash();
  const { address, isConnected, chainId } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: gasPrice } = useGasPrice();

  const metrics = deriveLiveMetrics({
    coin,
    logs,
    analytics,
    lastTxHash,
    wallet: {
      connected: isConnected,
      chainId,
      address,
      balanceWei: balance?.value,
      gasPriceWei: gasPrice,
    },
  });

  return {
    ...metrics,
    zoraSpark: zoraSparkline(analytics),
    zoraVolumeDisplay: formatVolumeUsd(metrics.zora.volume24hUsd),
  };
}
