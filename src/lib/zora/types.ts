export const ZORA_CHAIN = "base" as const;
export const ZORA_CHAIN_ID = 8453;

export type ZoraToolName =
  | "mint_coin"
  | "set_pricing"
  | "fund_initial_pool"
  | "set_metadata"
  | "get_holder_count"
  | "get_24h_volume"
  | "get_top_buyers"
  | "message_recent_buyer"
  | "set_price_alert";

export type CoinStatus = "idle" | "draft" | "launched" | "monitoring";

export interface CoinMetadata {
  name: string;
  description: string;
  image?: string;
}

export interface TopBuyer {
  address: string;
  amountEth: number;
  boughtAt: string;
}

export interface CreatorCoin {
  address?: string;
  name?: string;
  symbol?: string;
  initialPriceEth?: number;
  poolFundingEth?: number;
  metadata?: CoinMetadata;
  holderCount: number;
  volume24hEth: number;
  topBuyers: TopBuyer[];
  priceAlertEth?: number;
  status: CoinStatus;
}

export interface AnalyticsPoint {
  time: string;
  value: number;
}

export interface AgentLogEntry {
  id: string;
  message: string;
  tool?: ZoraToolName;
  kind?: "holder" | "alert" | "launch" | "volume" | "message";
  status: "pending" | "success" | "error";
  timestamp: string;
}

export interface ChatMessage {
  role: "user" | "agent";
  text: string;
}

export interface ToolResult<T = unknown> {
  ok: boolean;
  tool: ZoraToolName;
  message: string;
  data?: T;
}

export type MintCoinInput = {
  name: string;
  symbol: string;
  creatorAddress?: string;
};

export type SetPricingInput = { priceEth: number };
export type FundInitialPoolInput = { amountEth: number };
export type SetMetadataInput = CoinMetadata;
export type GetHolderCountInput = { coinAddress?: string };
export type Get24hVolumeInput = { coinAddress?: string };
export type GetTopBuyersInput = { coinAddress?: string; limit?: number };
export type MessageRecentBuyerInput = {
  coinAddress?: string;
  message: string;
};
export type SetPriceAlertInput = {
  coinAddress?: string;
  targetPriceEth: number;
};

export type ZoraToolInput =
  | MintCoinInput
  | SetPricingInput
  | FundInitialPoolInput
  | SetMetadataInput
  | GetHolderCountInput
  | Get24hVolumeInput
  | GetTopBuyersInput
  | MessageRecentBuyerInput
  | SetPriceAlertInput;
