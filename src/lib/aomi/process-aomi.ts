import { processCreatorMessage } from "@/lib/zora/orchestrator";

export async function processAomi(message: string) {
  const result = await processCreatorMessage(String(message ?? ""));

  return {
    reply: result.reply,
  };
}
