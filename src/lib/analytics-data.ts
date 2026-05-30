export type AnalyticsDataSource = "mock" | "live";

export type AnalyticsTimeSeriesPoint = {
  label: string;
  value: number;
};

export type ZoraTrendingCoinPoint = {
  id: string;
  name: string;
  symbol: string;
  volumeUsd: number;
  marketCapUsd: number;
  change24hPct: number;
};

export type ProtocolActivityPoint = {
  id: string;
  protocol: string;
  sessions: number;
  actions: number;
};

export type WalletActivityMetric = {
  id: string;
  label: string;
  value: string;
  changeLabel: string;
  positive: boolean;
};

export type AnalyticsAiSignal = {
  id: string;
  title: string;
  body: string;
  severity: "info" | "bullish" | "caution";
};

export type MarketIntelligenceItem = {
  id: string;
  headline: string;
  summary: string;
  tags: string[];
};

/** Replace `getAnalyticsDashboardData` body with Aomi/Zora fetches later. */
export type AnalyticsDashboardData = {
  meta: {
    source: AnalyticsDataSource;
    generatedAt: string;
    network: string;
  };
  agentUsage: AnalyticsTimeSeriesPoint[];
  zoraTrending: ZoraTrendingCoinPoint[];
  protocolActivity: ProtocolActivityPoint[];
  walletActivity: WalletActivityMetric[];
  aiSignals: AnalyticsAiSignal[];
  marketIntelligence: MarketIntelligenceItem[];
};

const MOCK_AGENT_USAGE: AnalyticsTimeSeriesPoint[] = [
  { label: "Mon", value: 12 },
  { label: "Tue", value: 18 },
  { label: "Wed", value: 15 },
  { label: "Thu", value: 24 },
  { label: "Fri", value: 31 },
  { label: "Sat", value: 28 },
  { label: "Sun", value: 36 },
];

const MOCK_ZORA_TRENDING: ZoraTrendingCoinPoint[] = [
  {
    id: "earlylifecrisis",
    name: "earlylifecrisis",
    symbol: "earlylifecrisis",
    volumeUsd: 3335,
    marketCapUsd: 8254,
    change24hPct: 42.1,
  },
  {
    id: "tpulse",
    name: "tpulse",
    symbol: "TPULSE",
    volumeUsd: 890,
    marketCapUsd: 2379,
    change24hPct: 18.4,
  },
  {
    id: "olives",
    name: "olives",
    symbol: "olives",
    volumeUsd: 620,
    marketCapUsd: 1982,
    change24hPct: 11.2,
  },
  {
    id: "vacuum",
    name: "vacuum",
    symbol: "vacuum",
    volumeUsd: 410,
    marketCapUsd: 2244,
    change24hPct: -4.8,
  },
  {
    id: "moonjoy",
    name: "MOONJOY",
    symbol: "MOONJOY",
    volumeUsd: 2180,
    marketCapUsd: 6100,
    change24hPct: 28.7,
  },
];

const MOCK_PROTOCOL_ACTIVITY: ProtocolActivityPoint[] = [
  { id: "zora", protocol: "Zora", sessions: 48, actions: 112 },
  { id: "aerodrome", protocol: "Aerodrome", sessions: 22, actions: 41 },
  { id: "avantis", protocol: "Avantis", sessions: 14, actions: 27 },
  { id: "across", protocol: "Across", sessions: 9, actions: 18 },
  { id: "stargate", protocol: "Stargate", sessions: 7, actions: 12 },
];

const MOCK_WALLET_ACTIVITY: WalletActivityMetric[] = [
  {
    id: "tx-count",
    label: "Staged transactions",
    value: "14",
    changeLabel: "+3 this week",
    positive: true,
  },
  {
    id: "sign-rate",
    label: "Sign completion",
    value: "86%",
    changeLabel: "+6% vs last week",
    positive: true,
  },
  {
    id: "gas-spend",
    label: "Est. gas spent",
    value: "0.042 ETH",
    changeLabel: "-12% vs last week",
    positive: true,
  },
  {
    id: "alerts",
    label: "Active alerts",
    value: "3",
    changeLabel: "1 triggered today",
    positive: false,
  },
];

const MOCK_AI_SIGNALS: AnalyticsAiSignal[] = [
  {
    id: "holder-growth",
    title: "Holder acceleration",
    body: "MOONJOY holder growth accelerated 17.3% in the last 24 hours on Base.",
    severity: "bullish",
  },
  {
    id: "buy-pressure",
    title: "Repeat buyer pressure",
    body: "Aomi detected increased buy pressure from repeat wallets after the latest launch.",
    severity: "bullish",
  },
  {
    id: "volume-trend",
    title: "Volume above baseline",
    body: "24h volume is trending above the 7-day average with stronger late-session activity.",
    severity: "info",
  },
  {
    id: "concentration",
    title: "Entry concentration",
    body: "Top buyers are concentrating around sub-0.01 ETH entries — watch for breakout volume.",
    severity: "caution",
  },
];

const MOCK_MARKET_INTEL: MarketIntelligenceItem[] = [
  {
    id: "zora-momentum",
    headline: "Zora creator coins lead Base social volume",
    summary:
      "Fresh launches are clustering around sub-$10K market caps with sharp early volume spikes in the first 6 hours.",
    tags: ["Zora", "Base", "Creator coins"],
  },
  {
    id: "aerodrome-yield",
    headline: "Aerodrome emissions favor stable LP pairs",
    summary:
      "Agent scans show elevated reward APR on ETH/USDC and WETH/USDC pools relative to volatile pairs.",
    tags: ["Aerodrome", "Liquidity", "Yield"],
  },
  {
    id: "bridge-flow",
    headline: "Bridge inflows tilt toward Base on weekdays",
    summary:
      "Across and Stargate routes show consistent USDC inflows before afternoon launch windows.",
    tags: ["Across", "Stargate", "Bridges"],
  },
];

export function getAnalyticsDashboardData(): AnalyticsDashboardData {
  return {
    meta: {
      source: "mock",
      generatedAt: new Date().toISOString(),
      network: "Base (8453)",
    },
    agentUsage: MOCK_AGENT_USAGE,
    zoraTrending: MOCK_ZORA_TRENDING,
    protocolActivity: MOCK_PROTOCOL_ACTIVITY,
    walletActivity: MOCK_WALLET_ACTIVITY,
    aiSignals: MOCK_AI_SIGNALS,
    marketIntelligence: MOCK_MARKET_INTEL,
  };
}

export const ANALYTICS_CHART_TOOLTIP_STYLE = {
  background: "#0a0a1f",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  color: "#f8fafc",
} as const;

export const ANALYTICS_AXIS_TICK = { fontSize: 10, fill: "#64748b" } as const;

export const ANALYTICS_TRENDING_PROMPT =
  "Show trending creator coins on Zora";
