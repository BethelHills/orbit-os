import type { AgentLogEntry, AnalyticsPoint, CreatorCoin } from "./types";

export const SEED_ANALYTICS: AnalyticsPoint[] = [
  { time: "12AM", value: 1200 },
  { time: "4AM", value: 1800 },
  { time: "8AM", value: 2400 },
  { time: "12PM", value: 3900 },
  { time: "4PM", value: 3200 },
  { time: "8PM", value: 5200 },
  { time: "Now", value: 6100 },
];

export const SEED_COIN: CreatorCoin = {
  name: "MOONJOY",
  symbol: "MOONJO",
  address: "0x7ora000000000000000000000000000000000001",
  initialPriceEth: 0.2,
  poolFundingEth: 0.2,
  metadata: {
    name: "MOONJOY",
    description: "Creator coin MOONJOY launched via OrbitOS on Zora/Base.",
  },
  holderCount: 42,
  volume24hEth: 6.1,
  topBuyers: [],
  priceAlertEth: 0.5,
  status: "monitoring",
};

export const SEED_LOGS: AgentLogEntry[] = [
  {
    id: "1",
    message: "New holder detected — 0x4a2f…8c91 bought 0.5 ETH of MOONJOY",
    kind: "holder",
    status: "success",
    timestamp: "2m ago",
  },
  {
    id: "2",
    message: "Price alert triggered at 0.5 ETH threshold for MOONJOY",
    kind: "alert",
    status: "success",
    timestamp: "5m ago",
  },
  {
    id: "3",
    message: "Coin MOONJOY launched on Zora (Base) at 0.2 ETH",
    kind: "launch",
    tool: "mint_coin",
    status: "success",
    timestamp: "12m ago",
  },
  {
    id: "4",
    message: "24h volume reached 6.1 ETH — trending on Base",
    kind: "volume",
    tool: "get_24h_volume",
    status: "success",
    timestamp: "18m ago",
  },
  {
    id: "5",
    message: "Message sent to recent buyer 0x9b3c…1f22",
    kind: "message",
    tool: "message_recent_buyer",
    status: "success",
    timestamp: "24m ago",
  },
  {
    id: "6",
    message: "Holder count updated — 42 active holders",
    kind: "holder",
    tool: "get_holder_count",
    status: "success",
    timestamp: "32m ago",
  },
];

export const SEED_MESSAGES = [
  {
    role: "user" as const,
    text: "Launch a new coin called 'MOONJOY' on Zora with initial price 0.2 ETH",
  },
  {
    role: "agent" as const,
    text: "🚀 Coin 'MOONJOY' has been successfully launched on Zora!\n\n• Initial Price: 0.2 ETH\n• Network: Base\n• Contract: 0x7ora…0001\n• Status: Live & monitoring",
  },
];
