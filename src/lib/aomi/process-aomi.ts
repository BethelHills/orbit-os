import { detectWriteAction } from "./detect-write-action";
import { processAomiMessage } from "./execute-orbit-action-core";
import { processCreatorMessage } from "@/lib/zora/orchestrator";

export async function processAomi(message: string, walletAddress?: string) {
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

  const orchestrated = await processCreatorMessage(String(message ?? ""), undefined, [], {
    walletAddress,
  });

  if (orchestrated.logs.some((log) => log.status === "error")) {
    const aomi = await processAomiMessage(String(message ?? ""), walletAddress);
    return { reply: aomi.reply };
  }

  return {
    reply: orchestrated.reply,
  };
}
