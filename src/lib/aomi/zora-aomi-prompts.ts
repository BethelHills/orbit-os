import type { OrbitActionName } from "./orbit-action-types";
import type {
  GetHolderCountInput,
  GetTopBuyersInput,
  MintCoinInput,
  SetPriceAlertInput,
  ZoraToolName,
} from "@/lib/zora/types";
import { ORBIT_CHAIN_ID } from "./orbit-action-types";

export function buildZoraReadPrompt(
  tool: ZoraToolName,
  input: Record<string, unknown>,
  coinName = "MOONJOY",
  coinAddress?: string
) {
  const addressHint = coinAddress ? ` at ${coinAddress}` : "";

  switch (tool) {
    case "get_holder_count":
      return `Read-only: get the current holder count for Zora creator coin ${coinName}${addressHint} on Base (chain ${ORBIT_CHAIN_ID}).`;
    case "get_24h_volume":
      return `Read-only: get the 24 hour trading volume in ETH for Zora creator coin ${coinName}${addressHint} on Base.`;
    case "get_top_buyers": {
      const limit = (input as GetTopBuyersInput).limit ?? 5;
      return `Read-only: list the top ${limit} recent buyers for Zora creator coin ${coinName}${addressHint} on Base.`;
    }
    default:
      return "";
  }
}

export function buildZoraWritePrompt(
  action: OrbitActionName,
  params: Record<string, unknown>
) {
  switch (action) {
    case "mint_coin": {
      const input = params as MintCoinInput;
      return [
        `Prepare a Zora creator coin mint on Base for OrbitOS.`,
        `Name: ${input.name}`,
        `Symbol: ${input.symbol}`,
        input.creatorAddress ? `Creator: ${input.creatorAddress}` : "",
        "Queue wallet requests only. Do not sign or broadcast.",
      ]
        .filter(Boolean)
        .join(" ");
    }
    case "set_price_alert": {
      const input = params as SetPriceAlertInput;
      return [
        `Prepare a Zora price alert on Base at ${input.targetPriceEth} ETH`,
        input.coinAddress ? `for coin ${input.coinAddress}` : "for the active creator coin",
        "Queue wallet requests only. Do not sign or broadcast.",
      ].join(" ");
    }
    default:
      return "";
  }
}

export function buildZoraChatPrompt(message: string) {
  return [
    message,
    "Protocol: Zora.",
    `Network: Base (chain ${ORBIT_CHAIN_ID}).`,
    "This is a read-only OrbitOS assistant request unless the user explicitly asked to execute a transaction.",
  ].join(" ");
}

export function buildZoraToolPrompt(
  tool: ZoraToolName,
  input: Record<string, unknown>,
  coin?: { name?: string; address?: string }
) {
  const readPrompt = buildZoraReadPrompt(
    tool,
    input,
    coin?.name,
    coin?.address ?? (input as GetHolderCountInput).coinAddress
  );

  if (readPrompt) return readPrompt;

  switch (tool) {
    case "set_pricing":
      return `Prepare Zora creator coin pricing on Base at ${(input as { priceEth: number }).priceEth} ETH. Read-only estimate unless user confirms execution.`;
    case "set_metadata":
      return `Prepare Zora creator coin metadata update on Base for ${(input as { name: string }).name}.`;
    case "fund_initial_pool":
      return `Prepare Zora initial pool funding on Base with ${(input as { amountEth: number }).amountEth} ETH.`;
    case "message_recent_buyer":
      return `Prepare a message to the most recent Zora coin buyer on Base: "${(input as { message: string }).message}".`;
    case "set_price_alert":
      return buildZoraWritePrompt("set_price_alert", input);
    case "mint_coin":
      return buildZoraWritePrompt("mint_coin", input);
    default:
      return buildZoraChatPrompt(`Execute Zora tool ${tool} on Base.`);
  }
}
