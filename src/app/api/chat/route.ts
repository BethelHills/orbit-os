import { processCreatorMessage } from "@/lib/zora/orchestrator";
import type { AgentLogEntry, CreatorCoin } from "@/lib/zora/types";

export async function POST(req: Request) {
  const body = await req.json();
  const message = body.message as string;
  const coin = body.coin as CreatorCoin | undefined;
  const logs = (body.logs as AgentLogEntry[] | undefined) ?? [];

  const result = await processCreatorMessage(message, coin, logs);

  return Response.json(result);
}
