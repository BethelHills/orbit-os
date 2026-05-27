import type { AnalyticsPoint, CreatorCoin } from "@/lib/zora/types";
import type { AgentLogEntry } from "@/lib/zora/types";
import { ZORA_CHAIN_ID } from "@/lib/zora/types";

const ETH_USD = 3200;

export interface WalletMetricsInput {
  connected: boolean;
  chainId?: number;
  address?: string;
  balanceWei?: bigint;
  gasPriceWei?: bigint;
}

export interface LiveMetrics {
  zora: {
    holderCount: number;
    volume24hEth: number;
    volume24hUsd: number;
    status: CreatorCoin["status"];
    coinName: string;
    volumeLabel: string;
  };
  aomi: {
    total: number;
    successful: number;
    pending: number;
    failed: number;
  };
  wallet: {
    connected: boolean;
    onBase: boolean;
    addressShort: string | null;
    balanceEth: number | null;
    balanceLabel: string;
    lastTxHash: string | null;
    lastTxShort: string | null;
  };
  base: {
    chainId: number;
    chainName: string;
    gasPriceGwei: number | null;
    gasPriceLabel: string;
    healthy: boolean;
  };
  analyticsDeltaPct: number | null;
}

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function truncateHash(hash: string) {
  return `${hash.slice(0, 10)}…${hash.slice(-6)}`;
}

function weiToEth(wei?: bigint) {
  if (wei === undefined) return null;
  return Number(wei) / 1e18;
}

function weiToGwei(wei?: bigint) {
  if (wei === undefined) return null;
  return Number(wei) / 1e9;
}

function analyticsChangePct(analytics: AnalyticsPoint[]) {
  if (analytics.length < 2) return null;
  const latest = analytics[analytics.length - 1]?.value ?? 0;
  const previous = analytics[analytics.length - 2]?.value ?? 0;
  if (previous <= 0) return null;
  return ((latest - previous) / previous) * 100;
}

export function deriveLiveMetrics(input: {
  coin: CreatorCoin;
  logs: AgentLogEntry[];
  analytics: AnalyticsPoint[];
  lastTxHash: string | null;
  wallet: WalletMetricsInput;
}): LiveMetrics {
  const { coin, logs, analytics, lastTxHash, wallet } = input;

  const successful = logs.filter((log) => log.status === "success").length;
  const pending = logs.filter((log) => log.status === "pending").length;
  const failed = logs.filter((log) => log.status === "error").length;

  const balanceEth = weiToEth(wallet.balanceWei);
  const gasPriceGwei = weiToGwei(wallet.gasPriceWei);
  const onBase =
    wallet.connected && wallet.chainId === ZORA_CHAIN_ID;
  const volume24hUsd = coin.volume24hEth * ETH_USD;

  return {
    zora: {
      holderCount: coin.holderCount,
      volume24hEth: coin.volume24hEth,
      volume24hUsd,
      status: coin.status,
      coinName: coin.name ?? "MOONJOY",
      volumeLabel:
        coin.volume24hEth > 0
          ? `${coin.volume24hEth.toFixed(2)} ETH`
          : "0 ETH",
    },
    aomi: {
      total: logs.length,
      successful,
      pending,
      failed,
    },
    wallet: {
      connected: wallet.connected && Boolean(wallet.address),
      onBase,
      addressShort: wallet.address ? truncateAddress(wallet.address) : null,
      balanceEth,
      balanceLabel:
        balanceEth !== null ? `${balanceEth.toFixed(4)} ETH` : "—",
      lastTxHash,
      lastTxShort: lastTxHash ? truncateHash(lastTxHash) : null,
    },
    base: {
      chainId: wallet.chainId ?? ZORA_CHAIN_ID,
      chainName: !wallet.connected
        ? "Base"
        : onBase
          ? "Base"
          : "Wrong network",
      gasPriceGwei,
      gasPriceLabel:
        gasPriceGwei !== null ? `${gasPriceGwei.toFixed(4)} gwei` : "—",
      healthy: !wallet.connected || onBase,
    },
    analyticsDeltaPct: analyticsChangePct(analytics),
  };
}

export function zoraSparkline(analytics: AnalyticsPoint[]) {
  if (!analytics.length) return [0];
  return analytics.map((point) => point.value);
}

export function formatVolumeUsd(value: number) {
  if (value <= 0) return "0 ETH vol";
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
}
