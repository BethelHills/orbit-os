"use client";

import { create } from "zustand";
import type {
  AgentLogEntry,
  AnalyticsPoint,
  ChatMessage,
  CreatorCoin,
} from "@/lib/zora/types";
import {
  SEED_ANALYTICS,
  SEED_COIN,
  SEED_LOGS,
  SEED_MESSAGES,
} from "@/lib/zora/seed";

interface OrbitState {
  messages: ChatMessage[];
  logs: AgentLogEntry[];
  coin: CreatorCoin;
  analytics: AnalyticsPoint[];
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
  runQuickAction: (action: string) => Promise<void>;
}

export const useOrbitStore = create<OrbitState>((set, get) => ({
  messages: SEED_MESSAGES,
  logs: SEED_LOGS,
  coin: SEED_COIN,
  analytics: SEED_ANALYTICS,
  isLoading: false,

  sendMessage: async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    set((s) => ({
      messages: [...s.messages, { role: "user", text: trimmed }],
      isLoading: true,
    }));

    try {
      const { coin, logs } = get();
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, coin, logs }),
      });

      if (!res.ok) throw new Error("Chat request failed");

      const data = await res.json();
      set({
        messages: [...get().messages, { role: "agent", text: data.reply }],
        logs: data.logs,
        coin: data.coin,
        analytics: data.analytics,
        isLoading: false,
      });
    } catch {
      set((s) => ({
        messages: [
          ...s.messages,
          {
            role: "agent",
            text: "Something went wrong. Try again or use a quick action below.",
          },
        ],
        isLoading: false,
      }));
    }
  },

  runQuickAction: async (action: string) => {
    const prompts: Record<string, string> = {
      "Show holders": "How many holders does my coin have?",
      "Set price alert": "Set a price alert at 0.5 ETH",
      "Set alert": "Set a price alert at 0.5 ETH",
      "View analytics": "Show 24h volume and analytics",
      "Launch coin": 'Launch a new Zora creator coin called "MOONJOY" with initial price 0.2 ETH',
    };
    await get().sendMessage(prompts[action] ?? action);
  },
}));
