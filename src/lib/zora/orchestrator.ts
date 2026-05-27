import { createInitialCoin, runZoraTool } from "./executor";
import { parseCreatorIntent } from "./intents";
import type {
  AgentLogEntry,
  AnalyticsPoint,
  CreatorCoin,
} from "./types";
import { SEED_ANALYTICS } from "./seed";

export interface ChatResponse {
  reply: string;
  logs: AgentLogEntry[];
  coin: CreatorCoin;
  analytics: AnalyticsPoint[];
}

export async function processCreatorMessage(
  message: string,
  coin: CreatorCoin = createInitialCoin(),
  priorLogs: AgentLogEntry[] = [],
  options?: { walletAddress?: string; flowId?: string }
): Promise<ChatResponse> {
  const intent = parseCreatorIntent(message);
  const logs: AgentLogEntry[] = [...priorLogs];
  let state = { ...coin, topBuyers: [...coin.topBuyers] };
  const toolMessages: string[] = [];

  logs.push({
    id: crypto.randomUUID(),
    message: `Parsed intent: ${intent.summary}`,
    status: "success",
    timestamp: new Date().toISOString(),
  });

  for (const step of intent.tools) {
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

  const reply = buildAgentReply(message, intent.summary, toolMessages, state);

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
  coin: CreatorCoin
): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes("launch") || lower.includes("mint") || lower.includes("create coin")) {
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
    return `MOONJOY currently has ${coin.holderCount} holders on Base. Monitoring is active — I'll notify you when new buyers join.`;
  }

  if (lower.includes("volume") || lower.includes("analytics")) {
    return [
      `📊 24h analytics for ${coin.name ?? "MOONJOY"}`,
      `• 24h Volume: ${coin.volume24hEth} ETH`,
      `• Holders: ${coin.holderCount}`,
      `• Price alert: ${coin.priceAlertEth ?? "not set"} ETH`,
    ].join("\n");
  }

  if (lower.includes("alert")) {
    return `✅ Price alert set at ${coin.priceAlertEth} ETH for ${coin.name ?? "MOONJOY"}. I'll ping you when it triggers.`;
  }

  if (toolMessages.length === 1) return toolMessages[0];
  if (toolMessages.length > 1) return `${summary}\n\n${toolMessages.join("\n")}`;
  return `${summary}. Ask me to launch a coin, check holders, set alerts, or view analytics.`;
}
