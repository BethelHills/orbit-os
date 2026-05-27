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
import type { ProtectedOrbitAction } from "@/lib/aomi/orbit-action-types";
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
    action: ProtectedOrbitAction;
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
    set((s) => {
      const coin = mergeCoinState(s.coin, data.coin);
      const incomingIds = new Set(data.logs.map((log) => log.id));
      const mergedLogs = [
        ...data.logs,
        ...s.logs.filter((log) => !incomingIds.has(log.id)),
      ].slice(0, 12);

      return {
        coin,
        analytics: data.analytics.length ? data.analytics : s.analytics,
        portfolio: computePortfolio(coin, "mint_coin"),
        assets: buildAssets(coin),
        logs: mergedLogs,
      };
    });
  },

  appendActivityLog: (log) => {
    set((s) => ({ logs: [log, ...s.logs] }));
  },

  applyTransactionResult: ({ action, coin: incomingCoin, txHash, log }) => {
    const current = get();
    const coin = mergeCoinState(current.coin, incomingCoin);
    const portfolioAction = action === "mint_coin" ? "mint_coin" : "set_price_alert";
    const analytics = bumpAnalytics(current.analytics, coin, portfolioAction);
    const portfolio = computePortfolio(coin, portfolioAction);
    const assets = buildAssets(coin);

    const dashboardLog: AgentLogEntry = {
      id: crypto.randomUUID(),
      kind:
        action === "mint_coin"
          ? "launch"
          : action === "message_recent_buyer"
            ? "message"
            : "alert",
      tool: action,
      status: "success",
      timestamp: "Just now",
      message:
        action === "mint_coin"
          ? `Dashboard synced — ${coin.name ?? "Coin"} live on Zora/Base · ${txHash.slice(0, 10)}…`
          : action === "message_recent_buyer"
            ? `Dashboard synced — buyer message sent · ${txHash.slice(0, 10)}…`
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
