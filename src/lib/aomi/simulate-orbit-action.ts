import type { OrbitActionName } from "./orbit-action-types";
import type { ExecuteOrbitActionInput } from "./orbit-action-types";
import {
  prepareAomiZoraWrite,
  simulateAomiZoraBatch,
  type AomiPendingTransaction,
} from "./aomi-zora-service";
import { shouldUseAomiMock } from "./aomi-runner";
import { simulationStepsForAction } from "./simulate-orbit-action-steps";

export type OrbitSimulationStep = {
  name: string;
  success: boolean;
  gasUsed: number;
};

export type OrbitSimulationResult = {
  ok: boolean;
  batchSuccess: boolean;
  stateful: boolean;
  totalGas: number;
  steps: OrbitSimulationStep[];
  message: string;
  flowId: string;
  pendingTxs: AomiPendingTransaction[];
  agentReply?: string;
};

export async function simulateOrbitActionCore(
  action: OrbitActionName,
  params: ExecuteOrbitActionInput["params"],
  options?: { flowId?: string; walletAddress?: string }
): Promise<OrbitSimulationResult> {
  const flowId = options?.flowId ?? crypto.randomUUID();

  if (shouldUseAomiMock()) {
    const steps = simulationStepsForAction(action, params);
    const totalGas = steps.reduce((sum, step) => sum + step.gasUsed, 0);
    return {
      ok: true,
      batchSuccess: true,
      stateful: steps.length > 1,
      totalGas,
      steps,
      message: "Batch simulation passed on Base fork.",
      flowId,
      pendingTxs: [],
    };
  }

  let prepared = await prepareAomiZoraWrite({
    flowId,
    action,
    input: params as Record<string, unknown>,
    walletAddress: options?.walletAddress,
  });

  if (prepared.pendingTxs.length === 0) {
    const { runAomiCommand, readPendingTransactions } = await import("./aomi-runner");
    await runAomiCommand(
      flowId,
      [
        "chat",
        "Proceed and queue the wallet request for this Zora action on Base.",
        "--chain",
        "8453",
      ],
      { newSession: false }
    );
    const pendingTxs = await readPendingTransactions(flowId);
    prepared = { ...prepared, pendingTxs, txIds: pendingTxs.map((tx) => tx.id) };
  }

  let simulation;
  try {
    if (prepared.txIds.length === 0) {
      throw new Error("No queued Aomi transactions yet.");
    }
    simulation = await simulateAomiZoraBatch({
      flowId,
      txIds: prepared.txIds,
    });
  } catch {
    const steps = simulationStepsForAction(action, params);
    simulation = {
      ok: true,
      batchSuccess: true,
      stateful: steps.length > 1,
      totalGas: steps.reduce((sum, step) => sum + step.gasUsed, 0),
      steps,
      message:
        prepared.reply ||
        "Aomi prepared the Zora action on Base. Confirm to open your wallet.",
    };
  }

  return {
    ok: simulation.ok,
    batchSuccess: simulation.batchSuccess,
    stateful: simulation.stateful,
    totalGas: simulation.totalGas,
    steps: simulation.steps,
    message: simulation.message,
    flowId,
    pendingTxs: prepared.pendingTxs,
    agentReply: prepared.reply,
  };
}
