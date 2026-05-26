import type { ZoraToolName } from "./types";

/** aomi-build style tool registry for Zora on Base */
export interface ZoraToolDefinition {
  name: ZoraToolName;
  description: string;
  protocol: "zora";
  chain: "base";
  parameters: Record<string, { type: string; description: string; required?: boolean }>;
}

export const ZORA_TOOLS: ZoraToolDefinition[] = [
  {
    name: "mint_coin",
    description: "Deploy a new Zora creator coin on Base",
    protocol: "zora",
    chain: "base",
    parameters: {
      name: { type: "string", description: "Coin display name", required: true },
      symbol: { type: "string", description: "Ticker symbol", required: true },
      creatorAddress: { type: "string", description: "Creator wallet on Base" },
    },
  },
  {
    name: "set_pricing",
    description: "Set initial coin price in ETH",
    protocol: "zora",
    chain: "base",
    parameters: {
      priceEth: { type: "number", description: "Price in ETH", required: true },
    },
  },
  {
    name: "fund_initial_pool",
    description: "Seed liquidity for the creator coin pool",
    protocol: "zora",
    chain: "base",
    parameters: {
      amountEth: { type: "number", description: "ETH to add", required: true },
    },
  },
  {
    name: "set_metadata",
    description: "Update coin metadata (name, description, image)",
    protocol: "zora",
    chain: "base",
    parameters: {
      name: { type: "string", description: "Display name", required: true },
      description: { type: "string", description: "Creator story", required: true },
      image: { type: "string", description: "Cover image URL" },
    },
  },
  {
    name: "get_holder_count",
    description: "Fetch current holder count for the creator coin",
    protocol: "zora",
    chain: "base",
    parameters: {
      coinAddress: { type: "string", description: "Coin contract address" },
    },
  },
  {
    name: "get_24h_volume",
    description: "Fetch 24h trading volume in ETH",
    protocol: "zora",
    chain: "base",
    parameters: {
      coinAddress: { type: "string", description: "Coin contract address" },
    },
  },
  {
    name: "get_top_buyers",
    description: "List top recent buyers",
    protocol: "zora",
    chain: "base",
    parameters: {
      coinAddress: { type: "string", description: "Coin contract address" },
      limit: { type: "number", description: "Max buyers to return" },
    },
  },
  {
    name: "message_recent_buyer",
    description: "Send a thank-you or promo message to the most recent buyer",
    protocol: "zora",
    chain: "base",
    parameters: {
      coinAddress: { type: "string", description: "Coin contract address" },
      message: { type: "string", description: "Message body", required: true },
    },
  },
  {
    name: "set_price_alert",
    description: "Create a price alert threshold in ETH",
    protocol: "zora",
    chain: "base",
    parameters: {
      coinAddress: { type: "string", description: "Coin contract address" },
      targetPriceEth: { type: "number", description: "Alert when price crosses", required: true },
    },
  },
];

export const ZORA_TOOL_MAP = Object.fromEntries(
  ZORA_TOOLS.map((t) => [t.name, t])
) as Record<ZoraToolName, ZoraToolDefinition>;
