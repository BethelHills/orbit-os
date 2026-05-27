import type { OrbitActionName } from "./orbit-action-types";
import { ORBIT_CHAIN_ID } from "./orbit-action-types";
import {
  extractAgentReply,
  extractQueuedTxIds,
  parseSimulationOutput,
  readPendingTransactions,
  runAomiCommand,
  shouldUseAomiMock,
  type AomiPendingTransaction,
} from "./aomi-runner";
import {
  isProtectedZoraTool,
  TRANSACTION_CONFIRMATION_COPY,
} from "./protected-transactions";
import {
  buildZoraChatPrompt,
  buildZoraToolPrompt,
  buildZoraWritePrompt,
} from "./zora-aomi-prompts";
import { runZoraToolMock } from "@/lib/zora/mock-executor";
import type {
  CreatorCoin,
  ToolResult,
  TopBuyer,
  ZoraToolName,
} from "@/lib/zora/types";

const WRITE_TOOLS = new Set<ZoraToolName>([
  "mint_coin",
  "set_pricing",
  "fund_initial_pool",
  "set_metadata",
  "message_recent_buyer",
  "set_price_alert",
]);

function parseHolderCount(text: string) {
  const match = text.match(/(\d[\d,]*)\s+holders?/i) ?? text.match(/holder count[:\s]+(\d[\d,]*)/i);
  return match ? Number(match[1].replace(/,/g, "")) : undefined;
}

function parseVolumeEth(text: string) {
  const match = text.match(/(\d+(?:\.\d+)?)\s*ETH/i);
  return match ? Number(match[1]) : undefined;
}

function parseAddress(text: string) {
  const match = text.match(/0x[a-fA-F0-9]{40}/);
  return match?.[0];
}

function applyReadParsing(
  tool: ZoraToolName,
  message: string,
  coin: CreatorCoin
): CreatorCoin {
  const next = { ...coin, topBuyers: [...coin.topBuyers] };

  if (tool === "get_holder_count") {
    const holderCount = parseHolderCount(message);
    if (holderCount !== undefined) next.holderCount = holderCount;
    next.status = "monitoring";
  }

  if (tool === "get_24h_volume") {
    const volume24hEth = parseVolumeEth(message);
    if (volume24hEth !== undefined) next.volume24hEth = volume24hEth;
  }

  if (tool === "get_top_buyers") {
    const addresses = [...message.matchAll(/0x[a-fA-F0-9]{4,}/g)].slice(0, 5);
    if (addresses.length > 0) {
      next.topBuyers = addresses.map(
        (match, index): TopBuyer => ({
          address: match[0],
          amountEth: 0.1 + index * 0.05,
          boughtAt: `${index + 1}m ago`,
        })
      );
    }
  }

  const address = parseAddress(message);
  if (address) next.address = address;

  return next;
}

async function runAomiChat(
  flowId: string,
  prompt: string,
  walletAddress?: string,
  newSession = true
) {
  const args = ["chat", prompt, "--chain", String(ORBIT_CHAIN_ID)];
  if (walletAddress) args.push("--public-key", walletAddress);

  return runAomiCommand(flowId, args, { newSession });
}

export async function runZoraToolViaAomi(
  tool: ZoraToolName,
  input: unknown,
  coin: CreatorCoin,
  options?: { flowId?: string; walletAddress?: string; confirmed?: boolean }
): Promise<{ result: ToolResult; coin: CreatorCoin }> {
  if (isProtectedZoraTool(tool) && !options?.confirmed) {
    return {
      result: {
        ok: false,
        tool,
        message: TRANSACTION_CONFIRMATION_COPY.blocked,
      },
      coin,
    };
  }

  if (shouldUseAomiMock()) {
    return runZoraToolMock(tool, input, coin);
  }

  const flowId = options?.flowId ?? `read-${tool}-${Date.now()}`;
  const prompt = buildZoraToolPrompt(tool, input as Record<string, unknown>, coin);

  try {
    const { output } = await runAomiChat(flowId, prompt, options?.walletAddress, true);
    const message = extractAgentReply(output);
    const updatedCoin = applyReadParsing(tool, message, coin);

    return {
      result: {
        ok: true,
        tool,
        message: message || `Aomi completed ${tool} on Zora/Base.`,
        data: output.includes("error") ? undefined : undefined,
      },
      coin: updatedCoin,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Aomi request failed";
    return {
      result: {
        ok: false,
        tool,
        message,
      },
      coin,
    };
  }
}

export async function chatWithAomiZora(
  message: string,
  walletAddress?: string
): Promise<{ reply: string }> {
  if (shouldUseAomiMock()) {
    return { reply: "Aomi mock mode is enabled (AOMI_USE_MOCK=1)." };
  }

  const flowId = `chat-${Date.now()}`;
  const prompt = buildZoraChatPrompt(message);

  try {
    const { output } = await runAomiChat(flowId, prompt, walletAddress, true);
    return { reply: extractAgentReply(output) || output };
  } catch (error) {
    const reply =
      error instanceof Error ? error.message : "Aomi could not complete that request.";
    return { reply };
  }
}

export async function prepareAomiZoraWrite(params: {
  flowId: string;
  action: OrbitActionName;
  input: Record<string, unknown>;
  walletAddress?: string;
}) {
  if (shouldUseAomiMock()) {
    return {
      reply: "Prepared Zora action (mock mode).",
      pendingTxs: [] as AomiPendingTransaction[],
      staged: false,
      txIds: [] as string[],
    };
  }

  const prompt = buildZoraWritePrompt(params.action, params.input);
  const { output } = await runAomiChat(
    params.flowId,
    prompt,
    params.walletAddress,
    true
  );

  const pendingTxs = await readPendingTransactions(params.flowId);
  const txIds =
    pendingTxs.length > 0
      ? pendingTxs.map((tx) => tx.id)
      : extractQueuedTxIds(output);

  return {
    reply: extractAgentReply(output),
    pendingTxs,
    staged: pendingTxs.length > 0 || txIds.length > 0,
    txIds,
    rawOutput: output,
  };
}

export async function simulateAomiZoraBatch(params: {
  flowId: string;
  txIds?: string[];
}) {
  if (shouldUseAomiMock()) {
    return parseSimulationOutput("Batch success: true\ngas_used: 482000");
  }

  const pendingTxs = await readPendingTransactions(params.flowId);
  const txIds =
    params.txIds && params.txIds.length > 0
      ? params.txIds
      : pendingTxs.map((tx) => tx.id);

  if (txIds.length === 0) {
    throw new Error("No pending Aomi transactions to simulate.");
  }

  const { output } = await runAomiCommand(params.flowId, [
    "tx",
    "simulate",
    ...txIds,
  ]);

  return parseSimulationOutput(output);
}

export function isWriteZoraTool(tool: ZoraToolName) {
  return WRITE_TOOLS.has(tool);
}

export { type AomiPendingTransaction };
