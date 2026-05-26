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
  { id: "1", message: "User selected Zora creator persona", status: "success", timestamp: "" },
  { id: "2", message: "Aomi selected Zora protocol on Base", status: "success", timestamp: "" },
  { id: "3", message: "mint_coin simulated on Zora/Base", tool: "mint_coin", status: "success", timestamp: "" },
  { id: "4", message: "Initial price set to 0.2 ETH", tool: "set_pricing", status: "success", timestamp: "" },
  { id: "5", message: "Holder monitoring enabled", tool: "get_holder_count", status: "success", timestamp: "" },
  { id: "6", message: "Price alert set at 0.5 ETH", tool: "set_price_alert", status: "success", timestamp: "" },
];

export const SEED_MESSAGES = [
  {
    role: "user" as const,
    text: 'Launch a new Zora creator coin called "MOONJOY" with initial price 0.2 ETH.',
  },
  {
    role: "agent" as const,
    text: 'Done — Launch Zora creator coin MOONJOY on Zora (Base). "MOONJOY" (MOONJO) is ready at 0.2 ETH. Monitoring 42 holders. Use the dashboard to track volume, top buyers, and alerts.',
  },
];
