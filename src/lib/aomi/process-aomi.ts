import { detectWriteAction } from "./detect-write-action";
import { processAomiMessage } from "./execute-orbit-action-core";
import { createInitialCoin } from "@/lib/zora/executor";
import { processCreatorMessage } from "@/lib/zora/orchestrator";
import type { CreatorCoin } from "@/lib/zora/types";

export async function processAomi(
  message: string,
  options?: { walletAddress?: string; coin?: CreatorCoin }
) {
  const writeAction = detectWriteAction(String(message ?? ""));

  if (writeAction) {
    return {
      reply: [
        "Preparing Zora transaction on Base…",
        "",
        "I'll run an Aomi fork simulation first, then ask you to confirm before opening your wallet.",
      ].join("\n"),
      requiresConfirmation: true,
    };
  }

  const orchestrated = await processCreatorMessage(
    String(message ?? ""),
    options?.coin ?? createInitialCoin(),
    [],
    { walletAddress: options?.walletAddress }
  );

  if (orchestrated.logs.some((log) => log.status === "error")) {
    const aomi = await processAomiMessage(String(message ?? ""), options?.walletAddress);
    return { reply: aomi.reply };
  }

  return {
    reply: orchestrated.reply,
    coin: orchestrated.coin,
    logs: orchestrated.logs,
    analytics: orchestrated.analytics,
  };
}
