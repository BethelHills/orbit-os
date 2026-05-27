import { getOrbitActionCost } from "./action-costs";
import type { ExecuteOrbitActionInput, OrbitActionName } from "./orbit-action-types";
import { WRITE_ORBIT_ACTIONS } from "./orbit-action-types";

export type PendingWriteAction<A extends OrbitActionName = OrbitActionName> = {
  action: A;
  params: ExecuteOrbitActionInput<A>["params"];
  costEth: string;
};

function extractQuotedName(text: string): string | undefined {
  const match = text.match(/"([^"]+)"/) ?? text.match(/'([^']+)'/);
  return match?.[1];
}

function extractEthAmount(text: string): number | undefined {
  const match = text.match(/(\d+(?:\.\d+)?)\s*eth/i);
  return match ? parseFloat(match[1]) : undefined;
}

function extractSymbol(name: string): string {
  return name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toUpperCase() || "COIN";
}

export function detectWriteAction(message: string): PendingWriteAction | null {
  const lower = message.toLowerCase().trim();

  if (
    lower.includes("launch") ||
    lower.includes("mint") ||
    lower.includes("create coin") ||
    lower.includes("new zora")
  ) {
    const name =
      extractQuotedName(message) ??
      lower.match(/called\s+([a-z0-9]+)/i)?.[1] ??
      "MOONJOY";

    const action = "mint_coin" as const;

    return {
      action,
      params: { name, symbol: extractSymbol(name) },
      costEth: getOrbitActionCost(action) ?? "0.002 ETH",
    };
  }

  if (lower.includes("alert") || lower.includes("notify")) {
    const action = "set_price_alert" as const;

    return {
      action,
      params: { targetPriceEth: extractEthAmount(message) ?? 0.5 },
      costEth: getOrbitActionCost(action) ?? "0 ETH",
    };
  }

  return null;
}

export function isWriteOrbitAction(action: OrbitActionName) {
  return WRITE_ORBIT_ACTIONS.has(action);
}
