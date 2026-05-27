import { detectWriteAction } from "./detect-write-action";
import { processCreatorMessage } from "@/lib/zora/orchestrator";

export async function processAomi(message: string) {
  const writeAction = detectWriteAction(String(message ?? ""));

  if (writeAction) {
    return {
      reply: [
        "Preparing Zora transaction on Base…",
        "",
        "I'll run a fork simulation first, then ask you to confirm before opening your wallet.",
      ].join("\n"),
      requiresConfirmation: true,
    };
  }

  const result = await processCreatorMessage(String(message ?? ""));

  return {
    reply: result.reply,
  };
}
