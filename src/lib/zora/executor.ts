import { runZoraToolViaAomi } from "@/lib/aomi/aomi-zora-service";
import { runZoraToolMock } from "./mock-executor";
import type { CreatorCoin, ToolResult, ZoraToolName } from "./types";

export function createInitialCoin(): CreatorCoin {
  return {
    holderCount: 0,
    volume24hEth: 0,
    topBuyers: [],
    status: "idle",
  };
}

export async function runZoraTool(
  tool: ZoraToolName,
  input: unknown,
  coin: CreatorCoin,
  options?: { flowId?: string; walletAddress?: string }
): Promise<{ result: ToolResult; coin: CreatorCoin }> {
  if (process.env.AOMI_USE_MOCK === "1") {
    return runZoraToolMock(tool, input, coin);
  }

  return runZoraToolViaAomi(tool, input, coin, options);
}

export function aomiTransactHint(tool: ZoraToolName): string | null {
  const writeTools: ZoraToolName[] = [
    "mint_coin",
    "set_pricing",
    "fund_initial_pool",
    "set_metadata",
    "message_recent_buyer",
    "set_price_alert",
  ];
  if (!writeTools.includes(tool)) return null;
  return `aomi chat "Execute Zora ${tool} on Base for OrbitOS" --chain 8453 --new-session`;
}
