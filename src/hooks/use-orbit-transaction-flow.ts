"use client";

import { useCallback, useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { parseEther } from "viem";
import { useAccount, useSendTransaction } from "wagmi";
import { executeOrbitAction } from "@/app/actions/execute-orbit-action";
import { simulateOrbitAction } from "@/app/actions/simulate-orbit-action";
import { captureOrbitError } from "@/lib/monitoring";
import type { AomiPendingTransaction } from "@/lib/aomi/aomi-runner";
import type { PendingWriteAction } from "@/lib/aomi/detect-write-action";
import type { OrbitActionResult, ProtectedOrbitAction } from "@/lib/aomi/orbit-action-types";
import { TRANSACTION_CONFIRMATION_COPY } from "@/lib/aomi/protected-transactions";
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
    action: ProtectedOrbitAction;
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

  if (action.action === "message_recent_buyer") {
    const params = action.params as { message: string };
    return {
      ...base,
      kind: "message",
      message: `Buyer message confirmed on Base · ${shortHash(txHash)}`,
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

  if (
    result.action === "message_recent_buyer" &&
    result.data &&
    "message" in result.data
  ) {
    return [
      "Message sent to the most recent buyer on Zora.",
      "",
      `• Message: "${result.data.message}"`,
      result.data.buyerAddress ? `• Buyer: ${result.data.buyerAddress}` : "",
      `• Tx hash: ${txHash}`,
      "• Network: Base",
    ]
      .filter(Boolean)
      .join("\n");
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
  const [flowId, setFlowId] = useState<string | null>(null);
  const [pendingTxs, setPendingTxs] = useState<AomiPendingTransaction[]>([]);
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
    async (
      userLabel: string,
      writeAction: PendingWriteAction,
      options?: { skipUserMessage?: boolean }
    ) => {
      if (busy) return;

      setBusy(true);
      setPendingAction(writeAction);
      setSimulation(null);
      setFlowId(null);
      setPendingTxs([]);
      if (!options?.skipUserMessage) {
        callbacks.onUserMessage(userLabel);
      }

      try {
        setFlowPhase("simulating");

        const sim = await simulateOrbitAction({
          action: writeAction.action,
          params: writeAction.params,
          walletAddress: address,
        });

        setSimulation(sim);
        setFlowId(sim.flowId);
        setPendingTxs(sim.pendingTxs);

        callbacks.onAgentMessage(
          [
            "Simulation passed — review before confirming.",
            "",
            TRANSACTION_CONFIRMATION_COPY.review,
            "",
            ...sim.steps.map(
              (step, index) =>
                `• Step ${index + 1}: ${step.name} — ${step.gasUsed.toLocaleString()} gas`
            ),
            "",
            `• Total gas: ${sim.totalGas.toLocaleString()}`,
            "",
            TRANSACTION_CONFIRMATION_COPY.confirm,
          ].join("\n")
        );

        setFlowPhase("confirm");
        setConfirmOpen(true);
      } catch (error) {
        captureOrbitError(error, { phase: "prepare", action: writeAction.action });
        callbacks.onAgentMessage(
          "Simulation failed. No transaction was prepared."
        );
        setPendingAction(null);
        setFlowPhase("idle");
      } finally {
        setBusy(false);
      }
    },
    [busy, callbacks, setFlowPhase, address]
  );

  const cancelFlow = useCallback(() => {
    if (busy) return;

    setConfirmOpen(false);
    setPendingAction(null);
    setSimulation(null);
    setFlowId(null);
    setPendingTxs([]);
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
        openConnectModal?.();
        setConfirmOpen(true);
        return;
      }

      setFlowPhase("wallet");

      const stagedTx = pendingTxs.find((tx) => tx.to);
      let txHash: `0x${string}`;

      if (stagedTx?.to) {
        txHash = await sendTransactionAsync({
          to: stagedTx.to,
          data: stagedTx.data,
          value: BigInt(stagedTx.value ?? "0"),
          chainId: stagedTx.chainId,
        });
      } else {
        const value =
          pendingAction.action === "mint_coin"
            ? parseEther("0.002")
            : BigInt(0);

        txHash = await sendTransactionAsync({
          to: address,
          value,
        });
      }

      setFlowPhase("executing");

      const result = await executeOrbitAction({
        action: pendingAction.action,
        params: pendingAction.params,
        confirmed: true,
        walletAddress: address,
        txHash,
        flowId: flowId ?? undefined,
      });

      if (!result.ok || !result.coin) {
        throw new Error(result.message);
      }

      const log = buildActivityLog(pendingAction, txHash);

      callbacks.onTransactionComplete({
        action: pendingAction.action as ProtectedOrbitAction,
        result,
        log,
        coin: result.coin,
        txHash,
      });

      callbacks.onAgentMessage(formatSuccessMessage(result, txHash));
      setFlowPhase("idle");
    } catch (error) {
      captureOrbitError(error, {
        phase: "execute",
        action: pendingAction.action,
        walletAddress: address,
      });
      callbacks.onAgentMessage(
        "Transaction failed or was rejected. No changes were applied."
      );
      setFlowPhase("idle");
    } finally {
      setBusy(false);
      setPendingAction(null);
      setSimulation(null);
      setFlowId(null);
      setPendingTxs([]);
    }
  }, [
    address,
    busy,
    callbacks,
    flowId,
    isConnected,
    openConnectModal,
    pendingAction,
    pendingTxs,
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
