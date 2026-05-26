import type { ZoraToolName } from "./types";

export interface ParsedIntent {
  tools: { name: ZoraToolName; input: Record<string, unknown> }[];
  summary: string;
}

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

export function parseCreatorIntent(message: string): ParsedIntent {
  const lower = message.toLowerCase();

  if (
    lower.includes("launch") ||
    lower.includes("mint") ||
    lower.includes("create coin") ||
    lower.includes("new zora")
  ) {
    const name =
      extractQuotedName(message) ??
      (lower.match(/called\s+([a-z0-9]+)/i)?.[1] ?? "MOONJOY");
    const priceEth = extractEthAmount(message) ?? 0.2;
    return {
      summary: `Launch Zora creator coin ${name}`,
      tools: [
        { name: "mint_coin", input: { name, symbol: extractSymbol(name) } },
        { name: "set_pricing", input: { priceEth } },
        { name: "set_metadata", input: {
          name,
          description: `Creator coin ${name} launched via OrbitOS on Zora/Base.`,
        }},
        { name: "fund_initial_pool", input: { amountEth: Math.max(priceEth, 0.1) } },
        { name: "get_holder_count", input: {} },
      ],
    };
  }

  if (lower.includes("holder")) {
    return {
      summary: "Check holder count",
      tools: [{ name: "get_holder_count", input: {} }],
    };
  }

  if (lower.includes("volume") || lower.includes("analytics")) {
    return {
      summary: "Fetch 24h volume",
      tools: [
        { name: "get_24h_volume", input: {} },
        { name: "get_holder_count", input: {} },
      ],
    };
  }

  if (lower.includes("top buyer") || lower.includes("buyers")) {
    return {
      summary: "List top buyers",
      tools: [{ name: "get_top_buyers", input: { limit: 5 } }],
    };
  }

  if (lower.includes("alert") || lower.includes("notify")) {
    const targetPriceEth = extractEthAmount(message) ?? 0.5;
    return {
      summary: "Set price alert",
      tools: [{ name: "set_price_alert", input: { targetPriceEth } }],
    };
  }

  if (lower.includes("message") || lower.includes("thank")) {
    return {
      summary: "Message recent buyer",
      tools: [
        { name: "get_top_buyers", input: { limit: 1 } },
        {
          name: "message_recent_buyer",
          input: { message: "Thanks for supporting my creator coin! — Bethel" },
        },
      ],
    };
  }

  if (lower.includes("metadata") || lower.includes("description")) {
    const name = extractQuotedName(message) ?? "MOONJOY";
    return {
      summary: "Update metadata",
      tools: [
        {
          name: "set_metadata",
          input: {
            name,
            description: message,
          },
        },
      ],
    };
  }

  if (lower.includes("price") && extractEthAmount(message)) {
    return {
      summary: "Update pricing",
      tools: [{ name: "set_pricing", input: { priceEth: extractEthAmount(message)! } }],
    };
  }

  if (lower.includes("fund") || lower.includes("liquidity") || lower.includes("pool")) {
    const amountEth = extractEthAmount(message) ?? 0.5;
    return {
      summary: "Fund initial pool",
      tools: [{ name: "fund_initial_pool", input: { amountEth } }],
    };
  }

  return {
    summary: "Creator assistant help",
    tools: [{ name: "get_holder_count", input: {} }],
  };
}
