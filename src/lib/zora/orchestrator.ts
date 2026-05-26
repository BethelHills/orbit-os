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
  priorLogs: AgentLogEntry[] = []
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
      state
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
  if (userMessage.toLowerCase().includes("launch") || userMessage.toLowerCase().includes("mint")) {
    return [
      `Done — ${summary} on Zora (Base).`,
      coin.name
        ? `"${coin.name}" (${coin.symbol}) is ready${coin.initialPriceEth ? ` at ${coin.initialPriceEth} ETH` : ""}.`
        : "",
      coin.holderCount ? `Monitoring ${coin.holderCount} holders.` : "",
      "Use the dashboard to track volume, top buyers, and alerts.",
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (toolMessages.length === 1) return toolMessages[0];
  return `${summary}. ${toolMessages.join(" ")}`;
}
