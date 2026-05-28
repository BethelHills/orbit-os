import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

import type { OrbitActionName } from "./orbit-action-types";
import { ORBIT_CHAIN_ID } from "./orbit-action-types";

const execFileAsync = promisify(execFile);

function aomiBin() {
  return path.join(process.cwd(), "node_modules", ".bin", "aomi");
}

function buildZoraPrompt(action: OrbitActionName, params: Record<string, unknown>) {
  switch (action) {
    case "mint_coin":
      return `Prepare Zora creator coin mint on Base: name "${params.name}", symbol "${params.symbol}"${params.creatorAddress ? `, creator ${params.creatorAddress}` : ""}. Do not sign — queue wallet request only.`;
    case "set_price_alert":
      return `Set Zora price alert on Base at ${params.targetPriceEth} ETH${params.coinAddress ? ` for ${params.coinAddress}` : ""}. Do not sign — queue wallet request only.`;
    case "message_recent_buyer":
      return `Message the most recent Zora coin buyer on Base with: "${params.message}". Do not sign — queue wallet request only.`;
    default:
      return "";
  }
}

export function buildAomiTransactHint(
  action: OrbitActionName,
  params: Record<string, unknown>
): string | null {
  const prompt = buildZoraPrompt(action, params);
  if (!prompt) return null;

  return `aomi chat "${prompt.replace(/"/g, '\\"')}" --chain ${ORBIT_CHAIN_ID} --new-session`;
}

/** Stage a wallet request via aomi-transact CLI. Never signs or broadcasts. */
export async function stageAomiTransactRequest(
  action: OrbitActionName,
  params: Record<string, unknown>,
  walletAddress?: string
): Promise<{ staged: boolean; output: string; hint: string | null }> {
  const prompt = buildZoraPrompt(action, params);
  if (!prompt) {
    return { staged: false, output: "", hint: null };
  }

  const args = [
    "chat",
    prompt,
    "--chain",
    String(ORBIT_CHAIN_ID),
    "--new-session",
  ];

  if (walletAddress) {
    args.push("--public-key", walletAddress);
  }

  try {
    const { stdout, stderr } = await execFileAsync(aomiBin(), args, {
      timeout: 60_000,
      env: process.env,
    });

    const output = [stdout, stderr].filter(Boolean).join("\n").trim();
    const staged = /wallet request queued|tx-\d+/i.test(output);

    return {
      staged,
      output,
      hint: buildAomiTransactHint(action, params),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to reach aomi CLI";

    return {
      staged: false,
      output: message,
      hint: buildAomiTransactHint(action, params),
    };
  }
}

export function isAomiTransactEnabled() {
  return process.env.AOMI_ENABLED === "1";
}
