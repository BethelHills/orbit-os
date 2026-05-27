import { detectWriteAction } from "./detect-write-action";
import { processCreatorMessage } from "@/lib/zora/orchestrator";

export async function processAomi(message: string) {
  const writeAction = detectWriteAction(String(message ?? ""));

  if (writeAction) {
    return {
      reply: [
        `Prepared ${writeAction.action} on Zora/Base.`,
        "",
        `• Estimated cost: ${writeAction.costEth}`,
        "• Status: Awaiting your approval",
        "",
        "Open the confirmation dialog and tap Approve to execute. Nothing runs until you confirm.",
      ].join("\n"),
      requiresConfirmation: true,
    };
  }

  const result = await processCreatorMessage(String(message ?? ""));

  return {
    reply: result.reply,
  };
}
