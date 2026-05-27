import { createInitialCoin, runZoraTool } from "./executor";
import { parseCreatorIntent } from "./intents";
import { isProtectedZoraTool, TRANSACTION_CONFIRMATION_COPY } from "@/lib/aomi/protected-transactions";
import { isWriteZoraTool } from "@/lib/aomi/aomi-zora-service";
import type {
  AgentLogEntry,
  AnalyticsPoint,
  CreatorCoin,
  ZoraToolName,
} from "./types";
import { SEED_ANALYTICS } from "./seed";

export interface ChatResponse {
  reply: string;
  logs: AgentLogEntry[];
  coin: CreatorCoin;
  analytics: AnalyticsPoint[];
}

function toolsForAutoRun(tools: { name: ZoraToolName; input: Record<string, unknown> }[]) {
  const hasProtected = tools.some((step) => isProtectedZoraTool(step.name));

  return tools.filter((step) => {
    if (isProtectedZoraTool(step.name)) return false;
    if (hasProtected && isWriteZoraTool(step.name)) return false;
    return true;
  });
}

export async function processCreatorMessage(
  message: string,
  coin: CreatorCoin = createInitialCoin(),
  priorLogs: AgentLogEntry[] = [],
  options?: { walletAddress?: string; flowId?: string }
): Promise<ChatResponse> {
  const intent = parseCreatorIntent(message);
  const blockedTools = intent.tools.filter((step) => isProtectedZoraTool(step.name));
  const runnableTools = toolsForAutoRun(intent.tools);
  const logs: AgentLogEntry[] = [...priorLogs];
  let state = { ...coin, topBuyers: [...coin.topBuyers] };
  const toolMessages: string[] = [];

  logs.push({
    id: crypto.randomUUID(),
    message: `Parsed intent: ${intent.summary}`,
    status: "success",
    timestamp: new Date().toISOString(),
  });

  for (const step of blockedTools) {
    logs.push({
      id: crypto.randomUUID(),
      message: `${step.name} blocked — ${TRANSACTION_CONFIRMATION_COPY.blocked}`,
      tool: step.name,
      status: "error",
      timestamp: new Date().toISOString(),
    });
  }

  for (const step of runnableTools) {
    const pendingId = crypto.randomUUID();
    logs.push({
      id: pendingId,
      message: `Running ${step.name} on Zora/Base…`,
      tool: step.name,
      status: "pending",
      timestamp: new Date().toISOString(),
    });

    const { result, coin: updated } = await runZoraTool(
      step.name,
      step.input,
      state,
      {
        flowId: options?.flowId,
        walletAddress: options?.walletAddress,
      }
    );
    state = updated;
    toolMessages.push(result.message);

    const idx = logs.findIndex((l) => l.id === pendingId);
    if (idx >= 0) {
      logs[idx] = {
        ...logs[idx],
        message: result.message,
        status: result.ok ? "success" : "error",
      };
    }
  }

  const reply = buildAgentReply(
    message,
    intent.summary,
    toolMessages,
    state,
    blockedTools.map((step) => step.name)
  );

  const analytics = SEED_ANALYTICS.map((point, i, arr) =>
    i === arr.length - 1
      ? { ...point, value: Math.round(state.volume24hEth * 1000) || point.value }
      : point
  );

  return { reply, logs, coin: state, analytics };
}

function buildAgentReply(
  userMessage: string,
  summary: string,
  toolMessages: string[],
  coin: CreatorCoin,
  blockedTools: ZoraToolName[] = []
): string {
  const lower = userMessage.toLowerCase();
  const blockedNote =
    blockedTools.length > 0
      ? [
          "",
          "Protected actions require Review → Confirm → Execute in the assistant:",
          ...blockedTools.map((tool) => `• ${tool}`),
          "",
          TRANSACTION_CONFIRMATION_COPY.review,
        ].join("\n")
      : "";

  if (
    blockedTools.some((tool) => tool === "mint_coin") ||
    (lower.includes("launch") || lower.includes("mint") || lower.includes("create coin"))
  ) {
    if (blockedTools.includes("mint_coin")) {
      return [
        "Launching a coin requires your explicit approval.",
        "",
        "Review → Confirm → Execute before any mint runs on Base.",
        blockedNote,
      ]
        .filter(Boolean)
        .join("\n");
    }

    const contract = coin.address
      ? `${coin.address.slice(0, 6)}…${coin.address.slice(-4)}`
      : "pending";
    return [
      `🚀 Coin '${coin.name ?? "MOONJOY"}' has been successfully launched on Zora!`,
      "",
      `• Initial Price: ${coin.initialPriceEth ?? 0.2} ETH`,
      "• Network: Base",
      `• Contract: ${contract}`,
      "• Status: Live & monitoring",
    ].join("\n");
  }

  if (lower.includes("holder")) {
    return `MOONJOY currently has ${coin.holderCount} holders on Base. Monitoring is active — I'll notify you when new buyers join.${blockedNote}`;
  }

  if (lower.includes("volume") || lower.includes("analytics")) {
    return [
      `📊 24h analytics for ${coin.name ?? "MOONJOY"}`,
      `• 24h Volume: ${coin.volume24hEth} ETH`,
      `• Holders: ${coin.holderCount}`,
      `• Price alert: ${coin.priceAlertEth ?? "not set"} ETH`,
      blockedNote,
    ]
      .filter(Boolean)
      .join("\n");
  }

  if (lower.includes("alert")) {
    if (blockedTools.includes("set_price_alert")) {
      return [
        "Price alerts require Review → Confirm → Execute before they run.",
        blockedNote,
      ]
        .filter(Boolean)
        .join("\n");
    }
    return `✅ Price alert set at ${coin.priceAlertEth} ETH for ${coin.name ?? "MOONJOY"}. I'll ping you when it triggers.`;
  }

  if (lower.includes("message") || lower.includes("thank")) {
    if (blockedTools.includes("message_recent_buyer")) {
      return [
        "Messaging a recent buyer requires Review → Confirm → Execute.",
        blockedNote,
      ]
        .filter(Boolean)
        .join("\n");
    }
  }

  if (toolMessages.length === 1) return `${toolMessages[0]}${blockedNote}`;
  if (toolMessages.length > 1) {
    return `${summary}\n\n${toolMessages.join("\n")}${blockedNote}`;
  }
  return `${summary}. Ask me to launch a coin, check holders, set alerts, or view analytics.${blockedNote}`;
}
