import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { ORBIT_CHAIN_ID } from "@/lib/aomi/orbit-action-types";

const execFileAsync = promisify(execFile);

export type AomiPendingTransaction = {
  id: string;
  to?: `0x${string}`;
  data?: `0x${string}`;
  value: string;
  chainId: number;
  label?: string;
};

export type AomiCommandResult = {
  stdout: string;
  stderr: string;
  output: string;
};

function aomiBin() {
  return path.join(process.cwd(), "node_modules", ".bin", "aomi");
}

export function getAomiStateDir(flowId: string) {
  const root = process.env.AOMI_STATE_DIR ?? path.join(os.tmpdir(), "orbit-aomi");
  return path.join(root, flowId);
}

export async function runAomiCommand(
  flowId: string,
  args: string[],
  options?: { newSession?: boolean }
): Promise<AomiCommandResult> {
  const stateDir = getAomiStateDir(flowId);
  await fs.mkdir(path.join(stateDir, "sessions"), { recursive: true });

  const commandArgs = [...args];
  if (options?.newSession && !commandArgs.includes("--new-session")) {
    commandArgs.push("--new-session");
  }

  try {
    const { stdout, stderr } = await execFileAsync(aomiBin(), commandArgs, {
      timeout: 90_000,
      env: {
        ...process.env,
        AOMI_STATE_DIR: stateDir,
      },
    });

    const output = [stdout, stderr].filter(Boolean).join("\n").trim();
    return { stdout: stdout.trim(), stderr: stderr.trim(), output };
  } catch (error) {
    const execError = error as NodeJS.ErrnoException & {
      stdout?: string;
      stderr?: string;
    };

    const stdout = execError.stdout?.toString() ?? "";
    const stderr = execError.stderr?.toString() ?? "";
    const message = execError.message ?? "Aomi command failed";
    const output = [stdout, stderr, message].filter(Boolean).join("\n").trim();

    throw new Error(output || message);
  }
}

export async function readActiveSession(flowId: string) {
  const stateDir = getAomiStateDir(flowId);

  try {
    const activeId = (await fs.readFile(path.join(stateDir, "active-session.txt"), "utf8")).trim();
    const sessionPath = path.join(stateDir, "sessions", `session-${activeId}.json`);
    const raw = await fs.readFile(sessionPath, "utf8");
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function readPendingTransactions(
  flowId: string
): Promise<AomiPendingTransaction[]> {
  const session = await readActiveSession(flowId);
  if (!session) return [];

  const pending = (session.pendingTxs as Array<Record<string, unknown>> | undefined) ?? [];

  return pending.map((tx, index) => ({
    id: String(tx.id ?? tx.txId ?? `tx-${index + 1}`),
    to: tx.to ? (String(tx.to) as `0x${string}`) : undefined,
    data: tx.data ? (String(tx.data) as `0x${string}`) : undefined,
    value: String(tx.value ?? tx.valueWei ?? "0"),
    chainId: Number(tx.chainId ?? ORBIT_CHAIN_ID),
    label: tx.label ? String(tx.label) : undefined,
  }));
}

export function extractAgentReply(output: string) {
  const lines = output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter(
      (line) =>
        !line.startsWith("Run `aomi tx") &&
        !/^tx-\d+/i.test(line) &&
        !/^Wallet request queued/i.test(line)
    );

  return lines.join("\n").trim() || output.trim();
}

export function extractQueuedTxIds(output: string) {
  return [...output.matchAll(/tx-(\d+)/gi)].map((match) => `tx-${match[1]}`);
}

export function parseSimulationOutput(output: string) {
  const batchSuccess = /Batch success:\s*true/i.test(output);
  const steps: Array<{ name: string; success: boolean; gasUsed: number }> = [];
  const stepBlocks = output.split(/Step \d+/i).slice(1);

  if (stepBlocks.length > 0) {
    for (const block of stepBlocks) {
      const nameMatch = block.match(/[—-]\s*(.+?)(?:\n|$)/);
      const success = /success:\s*true/i.test(block);
      const gasMatch = block.match(/gas_used:\s*(\d+)/i);
      steps.push({
        name: nameMatch?.[1]?.trim() ?? "Simulation step",
        success,
        gasUsed: gasMatch ? Number(gasMatch[1]) : 0,
      });
    }
  } else {
    const gasMatches = [...output.matchAll(/gas_used:\s*(\d+)/gi)];
    gasMatches.forEach((match, index) => {
      steps.push({
        name: `Step ${index + 1}`,
        success: batchSuccess || /success:\s*true/i.test(output),
        gasUsed: Number(match[1]),
      });
    });
  }

  const totalGas = steps.reduce((sum, step) => sum + step.gasUsed, 0);

  return {
    ok: batchSuccess || steps.every((step) => step.success),
    batchSuccess: batchSuccess || steps.every((step) => step.success),
    stateful: steps.length > 1,
    totalGas: totalGas || Number(output.match(/Total gas:\s*(\d+)/i)?.[1] ?? 0),
    steps,
    message: batchSuccess
      ? "Batch simulation passed on Base fork."
      : "Aomi simulation completed.",
  };
}

export function shouldUseAomiMock() {
  return process.env.AOMI_USE_MOCK === "1";
}
