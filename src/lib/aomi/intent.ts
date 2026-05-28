export const ORBIT_CHAT_INTENTS = [
  "launch_coin",
  "get_holder_count",
  "get_top_buyers",
  "set_price_alert",
  "get_24h_volume",
] as const;

export type OrbitChatIntentName = (typeof ORBIT_CHAT_INTENTS)[number];

export type OrbitChatIntentParams = {
  launch_coin: { name: string; symbol: string; priceEth?: number };
  get_holder_count: { coinAddress?: string };
  get_top_buyers: { limit: number; coinAddress?: string };
  set_price_alert: { targetPriceEth: number; coinAddress?: string };
  get_24h_volume: { coinAddress?: string };
};

export type ClassifiedOrbitIntent =
  | { intent: OrbitChatIntentName; params: OrbitChatIntentParams[OrbitChatIntentName] }
  | { intent: "unknown"; params: Record<string, never> };

function extractQuotedText(text: string): string | undefined {
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

function extractCoinName(message: string, lower: string): string {
  return (
    extractQuotedText(message) ??
    lower.match(/called\s+([a-z0-9]+)/i)?.[1] ??
    lower.match(/(?:coin|token)\s+([a-z0-9]+)/i)?.[1] ??
    "MOONJOY"
  );
}

/** Classify a natural-language prompt into a supported OrbitOS Zora intent. */
export function classifyOrbitIntent(message: string): ClassifiedOrbitIntent {
  const text = String(message ?? "").trim();
  const lower = text.toLowerCase();

  if (!text) {
    return { intent: "unknown", params: {} };
  }

  if (
    lower.includes("launch") ||
    lower.includes("mint") ||
    lower.includes("create coin") ||
    lower.includes("new zora") ||
    lower.includes("deploy coin")
  ) {
    const name = extractCoinName(text, lower);
    return {
      intent: "launch_coin",
      params: {
        name,
        symbol: extractSymbol(name),
        priceEth: extractEthAmount(text),
      },
    };
  }

  if (
    lower.includes("top buyer") ||
    lower.includes("top buyers") ||
    lower.includes("buyers") ||
    lower.includes("monitor buyers")
  ) {
    const limitMatch = lower.match(/top\s+(\d+)/);
    return {
      intent: "get_top_buyers",
      params: {
        limit: limitMatch ? Math.min(parseInt(limitMatch[1], 10), 10) : 5,
      },
    };
  }

  if (lower.includes("alert") || lower.includes("notify") || lower.includes("price alert")) {
    return {
      intent: "set_price_alert",
      params: {
        targetPriceEth: extractEthAmount(text) ?? 0.5,
      },
    };
  }

  if (
    lower.includes("volume") ||
    lower.includes("24h") ||
    lower.includes("analytics") ||
    lower.includes("24 hour")
  ) {
    return {
      intent: "get_24h_volume",
      params: {},
    };
  }

  if (lower.includes("holder") || lower.includes("holders")) {
    return {
      intent: "get_holder_count",
      params: {},
    };
  }

  return { intent: "unknown", params: {} };
}

export function isWriteOrbitChatIntent(
  intent: ClassifiedOrbitIntent["intent"]
): intent is "launch_coin" | "set_price_alert" {
  return intent === "launch_coin" || intent === "set_price_alert";
}

export function isReadOrbitChatIntent(
  intent: ClassifiedOrbitIntent["intent"]
): intent is "get_holder_count" | "get_top_buyers" | "get_24h_volume" {
  return (
    intent === "get_holder_count" ||
    intent === "get_top_buyers" ||
    intent === "get_24h_volume"
  );
}
