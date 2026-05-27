"use client";

import { useAccount, useBalance, useGasPrice } from "wagmi";
import {
  deriveLiveMetrics,
  zoraSparkline,
  formatVolumeUsd,
} from "@/lib/dashboard/live-metrics";
import { useMounted } from "@/hooks/use-mounted";
import {
  useActivityLogs,
  useAnalytics,
  useCoin,
  useLastTxHash,
} from "@/store/orbit-store";

export function useLiveMetrics() {
  const mounted = useMounted();
  const coin = useCoin();
  const logs = useActivityLogs();
  const analytics = useAnalytics();
  const lastTxHash = useLastTxHash();
  const { address, isConnected, chainId } = useAccount();
  const { data: balance } = useBalance({
    address,
    query: { enabled: mounted && Boolean(address) },
  });
  const { data: gasPrice } = useGasPrice({
    query: { enabled: mounted },
  });

  const metrics = deriveLiveMetrics({
    coin,
    logs,
    analytics,
    lastTxHash,
    wallet: mounted
      ? {
          connected: isConnected,
          chainId,
          address,
          balanceWei: balance?.value,
          gasPriceWei: gasPrice,
        }
      : {
          connected: false,
        },
  });

  return {
    ...metrics,
    mounted,
    zoraSpark: zoraSparkline(analytics),
    zoraVolumeDisplay: formatVolumeUsd(metrics.zora.volume24hUsd),
  };
}
