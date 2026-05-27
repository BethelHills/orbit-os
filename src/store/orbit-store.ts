"use client";

import { create } from "zustand";
import type {
  AgentLogEntry,
  AnalyticsPoint,
  CreatorCoin,
} from "@/lib/zora/types";
import {
  bumpAnalytics,
  buildAssets,
  computePortfolio,
  mergeCoinState,
  SEED_PORTFOLIO,
} from "@/lib/dashboard/derive-dashboard";
import type { AssetHolding, PortfolioState } from "@/lib/dashboard/types";
import {
  SEED_ANALYTICS,
  SEED_COIN,
  SEED_LOGS,
} from "@/lib/zora/seed";

interface ChatApiResponse {
  logs: AgentLogEntry[];
  coin: CreatorCoin;
  analytics: AnalyticsPoint[];
}

interface OrbitState {
  logs: AgentLogEntry[];
  coin: CreatorCoin;
  analytics: AnalyticsPoint[];
  portfolio: PortfolioState;
  assets: AssetHolding[];
  lastTxHash: string | null;
  applyChatResponse: (data: ChatApiResponse) => void;
  appendActivityLog: (log: AgentLogEntry) => void;
  applyTransactionResult: (data: {
    action: "mint_coin" | "set_price_alert";
    coin: CreatorCoin;
    txHash: string;
    log: AgentLogEntry;
  }) => void;
}

export const useOrbitStore = create<OrbitState>((set, get) => ({
  logs: SEED_LOGS,
  coin: SEED_COIN,
  analytics: SEED_ANALYTICS,
  portfolio: SEED_PORTFOLIO,
  assets: buildAssets(SEED_COIN),
  lastTxHash: null,

  applyChatResponse: (data) => {
    set({
      logs: data.logs,
      coin: data.coin,
      analytics: data.analytics,
      assets: buildAssets(data.coin),
      portfolio: computePortfolio(data.coin, "mint_coin"),
    });
  },

  appendActivityLog: (log) => {
    set((s) => ({ logs: [log, ...s.logs] }));
  },

  applyTransactionResult: ({ action, coin: incomingCoin, txHash, log }) => {
    const current = get();
    const coin = mergeCoinState(current.coin, incomingCoin);
    const analytics = bumpAnalytics(current.analytics, coin, action);
    const portfolio = computePortfolio(coin, action);
    const assets = buildAssets(coin);

    const dashboardLog: AgentLogEntry = {
      id: crypto.randomUUID(),
      kind: action === "mint_coin" ? "launch" : "alert",
      tool: action,
      status: "success",
      timestamp: "Just now",
      message:
        action === "mint_coin"
          ? `Dashboard synced — ${coin.name ?? "Coin"} live on Zora/Base · ${txHash.slice(0, 10)}…`
          : `Dashboard synced — price alert active at ${coin.priceAlertEth} ETH`,
    };

    set({
      coin,
      analytics,
      portfolio,
      assets,
      lastTxHash: txHash,
      logs: [dashboardLog, log, ...current.logs],
    });
  },
}));

export const usePortfolio = () => useOrbitStore((s) => s.portfolio);
export const useAssets = () => useOrbitStore((s) => s.assets);
export const useCoin = () => useOrbitStore((s) => s.coin);
export const useAnalytics = () => useOrbitStore((s) => s.analytics);
export const useActivityLogs = () => useOrbitStore((s) => s.logs);
export const useLastTxHash = () => useOrbitStore((s) => s.lastTxHash);
