import { processCreatorMessage } from "@/lib/zora/orchestrator";
import type { AgentLogEntry, CreatorCoin, ZoraToolName } from "@/lib/zora/types";
import { SEED_COIN, SEED_LOGS } from "@/lib/zora/seed";

function enrichLog(log: AgentLogEntry): AgentLogEntry {
  const kindByTool: Partial<Record<ZoraToolName, AgentLogEntry["kind"]>> = {
    mint_coin: "launch",
    set_price_alert: "alert",
    get_holder_count: "holder",
    get_24h_volume: "volume",
    message_recent_buyer: "message",
  };

  return {
    ...log,
    kind: log.kind ?? (log.tool ? kindByTool[log.tool] : undefined),
    timestamp: log.timestamp.includes("T") ? "Just now" : log.timestamp,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body.message ?? "").trim();

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const coin = (body.coin as CreatorCoin | undefined) ?? SEED_COIN;
    const logs = (body.logs as AgentLogEntry[] | undefined) ?? SEED_LOGS;

    const result = await processCreatorMessage(message, coin, logs);

    return Response.json({
      reply: result.reply,
      logs: result.logs.map(enrichLog),
      coin: result.coin,
      analytics: result.analytics,
    });
  } catch {
    return Response.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
