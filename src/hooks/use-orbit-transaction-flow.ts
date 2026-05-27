"use client";

import { useCallback, useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { parseEther } from "viem";
import { useAccount, useSendTransaction } from "wagmi";
import { executeOrbitAction } from "@/app/actions/execute-orbit-action";
import { simulateOrbitAction } from "@/app/actions/simulate-orbit-action";
import type { PendingWriteAction } from "@/lib/aomi/detect-write-action";
import type { OrbitActionResult } from "@/lib/aomi/orbit-action-types";
import type { OrbitSimulationResult } from "@/lib/aomi/simulate-orbit-action";
import type { AgentLogEntry, CreatorCoin } from "@/lib/zora/types";

export type TransactionFlowPhase =
  | "idle"
  | "preparing"
  | "simulating"
  | "confirm"
  | "wallet"
  | "executing"
  | "complete";

type FlowCallbacks = {
  onAgentMessage: (text: string) => void;
  onUserMessage: (text: string) => void;
  onPhaseChange?: (phase: TransactionFlowPhase) => void;
  onTransactionComplete: (payload: {
    result: OrbitActionResult;
    log: AgentLogEntry;
    coin: CreatorCoin;
    txHash: string;
  }) => void;
};

function shortHash(hash: string) {
  return `${hash.slice(0, 10)}…${hash.slice(-6)}`;
}

function buildActivityLog(
  action: PendingWriteAction,
  txHash: string
): AgentLogEntry {
  const base = {
    id: crypto.randomUUID(),
    status: "success" as const,
    timestamp: "Just now",
    tool: action.action,
  };

  if (action.action === "mint_coin") {
    const params = action.params as { name: string; symbol: string };
    return {
      ...base,
      kind: "launch",
      message: `${params.name} mint confirmed on Zora/Base · ${shortHash(txHash)}`,
    };
  }

  return {
    ...base,
    kind: "alert",
    message: `Price alert confirmed on Base · ${shortHash(txHash)}`,
  };
}

function formatSuccessMessage(result: OrbitActionResult, txHash: string): string {
  if (result.action === "mint_coin" && result.data && "name" in result.data) {
    const data = result.data;
    return [
      `Coin '${data.name}' (${data.symbol}) launched on Zora!`,
      "",
      `• Tx hash: ${txHash}`,
      data.address ? `• Contract: ${data.address}` : "",
      "• Network: Base",
      "• Status: Live & monitoring",
    ]
      .filter(Boolean)
      .join("\n");
  }

  if (
    result.action === "set_price_alert" &&
    result.data &&
    "targetPriceEth" in result.data
  ) {
    return [
      `Price alert set at ${result.data.targetPriceEth} ETH.`,
      "",
      `• Tx hash: ${txHash}`,
      "• Network: Base",
      "• Status: Monitoring enabled",
    ].join("\n");
  }

  return `${result.message}\n\n• Tx hash: ${txHash}`;
}

export function useOrbitTransactionFlow(callbacks: FlowCallbacks) {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { sendTransactionAsync } = useSendTransaction();

  const [phase, setPhase] = useState<TransactionFlowPhase>("idle");
  const [pendingAction, setPendingAction] = useState<PendingWriteAction | null>(
    null
  );
  const [simulation, setSimulation] = useState<OrbitSimulationResult | null>(
    null
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const setFlowPhase = useCallback(
    (next: TransactionFlowPhase) => {
      setPhase(next);
      callbacks.onPhaseChange?.(next);
    },
    [callbacks]
  );

  const startWriteFlow = useCallback(
    async (userLabel: string, writeAction: PendingWriteAction) => {
      if (busy) return;

      setBusy(true);
      setPendingAction(writeAction);
      setSimulation(null);
      callbacks.onUserMessage(userLabel);

      try {
        setFlowPhase("preparing");
        callbacks.onAgentMessage("Preparing transaction…");

        await new Promise((resolve) => setTimeout(resolve, 450));

        setFlowPhase("simulating");
        callbacks.onAgentMessage("Running fork simulation on Base…");

        const sim = await simulateOrbitAction({
          action: writeAction.action,
          params: writeAction.params,
        });

        setSimulation(sim);

        callbacks.onAgentMessage(
          [
            "Simulation passed.",
            "",
            ...sim.steps.map(
              (step, index) =>
                `• Step ${index + 1}: ${step.name} — ${step.gasUsed.toLocaleString()} gas`
            ),
            "",
            `• Total gas: ${sim.totalGas.toLocaleString()}`,
            "",
            "Review the confirmation dialog to continue.",
          ].join("\n")
        );

        setFlowPhase("confirm");
        setConfirmOpen(true);
      } catch {
        callbacks.onAgentMessage(
          "Simulation failed. No transaction was prepared."
        );
        setPendingAction(null);
        setFlowPhase("idle");
      } finally {
        setBusy(false);
      }
    },
    [busy, callbacks, setFlowPhase]
  );

  const cancelFlow = useCallback(() => {
    if (busy) return;

    setConfirmOpen(false);
    setPendingAction(null);
    setSimulation(null);
    setFlowPhase("idle");
    callbacks.onAgentMessage(
      "Action cancelled. No transaction was submitted."
    );
  }, [busy, callbacks, setFlowPhase]);

  const approveFlow = useCallback(async () => {
    if (!pendingAction || busy) return;

    setBusy(true);
    setConfirmOpen(false);

    try {
      if (!isConnected || !address) {
        setFlowPhase("wallet");
        callbacks.onAgentMessage(
          "Connect your wallet to sign this Zora transaction on Base."
        );
        openConnectModal?.();
        setConfirmOpen(true);
        return;
      }

      setFlowPhase("wallet");
      callbacks.onAgentMessage("Opening wallet for signature…");

      const value =
        pendingAction.action === "mint_coin"
          ? parseEther("0.002")
          : BigInt(0);

      const txHash = await sendTransactionAsync({
        to: address,
        value,
      });

      setFlowPhase("executing");
      callbacks.onAgentMessage("Executing on Base…");

      const result = await executeOrbitAction({
        action: pendingAction.action,
        params: pendingAction.params,
        confirmed: true,
        walletAddress: address,
        txHash,
      });

      if (!result.ok || !result.coin) {
        throw new Error(result.message);
      }

      const log = buildActivityLog(pendingAction, txHash);

      callbacks.onTransactionComplete({
        result,
        log,
        coin: result.coin,
        txHash,
      });

      callbacks.onAgentMessage(formatSuccessMessage(result, txHash));
      setFlowPhase("complete");
    } catch {
      callbacks.onAgentMessage(
        "Transaction failed or was rejected. No changes were applied."
      );
      setFlowPhase("idle");
    } finally {
      setBusy(false);
      setPendingAction(null);
      setSimulation(null);
    }
  }, [
    address,
    busy,
    callbacks,
    isConnected,
    openConnectModal,
    pendingAction,
    sendTransactionAsync,
    setFlowPhase,
  ]);

  return {
    phase,
    pendingAction,
    simulation,
    confirmOpen,
    busy,
    startWriteFlow,
    cancelFlow,
    approveFlow,
  };
}
