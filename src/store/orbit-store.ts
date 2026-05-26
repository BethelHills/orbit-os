"use client";

import { create } from "zustand";
import type {
  AgentLogEntry,
  AnalyticsPoint,
  CreatorCoin,
} from "@/lib/zora/types";
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
  applyChatResponse: (data: ChatApiResponse) => void;
  appendActivityLog: (log: AgentLogEntry) => void;
}

export const useOrbitStore = create<OrbitState>((set) => ({
  logs: SEED_LOGS,
  coin: SEED_COIN,
  analytics: SEED_ANALYTICS,

  applyChatResponse: (data) => {
    set({
      logs: data.logs,
      coin: data.coin,
      analytics: data.analytics,
    });
  },

  appendActivityLog: (log) => {
    set((s) => ({ logs: [...s.logs, log] }));
  },
}));
