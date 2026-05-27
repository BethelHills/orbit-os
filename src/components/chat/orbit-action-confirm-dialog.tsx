"use client";

import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { PendingWriteAction } from "@/lib/aomi/detect-write-action";
import type { OrbitSimulationResult } from "@/lib/aomi/simulate-orbit-action";
import { ORBIT_CHAIN, ORBIT_PROTOCOL } from "@/lib/aomi/orbit-action-types";
import { TRANSACTION_CONFIRMATION_COPY } from "@/lib/aomi/protected-transactions";
import { cn } from "@/lib/utils";

interface OrbitActionConfirmDialogProps {
  open: boolean;
  pendingAction: PendingWriteAction | null;
  simulation?: OrbitSimulationResult | null;
  approving?: boolean;
  onApprove: () => void;
  onCancel: () => void;
}

const FLOW_STEPS = [
  { id: "review", label: "Review" },
  { id: "confirm", label: "Confirm" },
  { id: "execute", label: "Execute" },
] as const;

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
      <span className="text-xs uppercase tracking-wider text-slate-400">{label}</span>
      <span className="max-w-[60%] text-right font-mono text-sm text-white">{value}</span>
    </div>
  );
}

function actionDetailRows(action: PendingWriteAction) {
  switch (action.action) {
    case "mint_coin": {
      const params = action.params as { name: string; symbol: string };
      return (
        <>
          <DetailRow label="Coin" value={params.name} />
          <DetailRow label="Symbol" value={params.symbol} />
        </>
      );
    }
    case "set_price_alert": {
      const params = action.params as { targetPriceEth: number };
      return (
        <DetailRow label="Alert at" value={`${params.targetPriceEth} ETH`} />
      );
    }
    case "message_recent_buyer": {
      const params = action.params as { message: string };
      const preview =
        params.message.length > 72
          ? `${params.message.slice(0, 72)}…`
          : params.message;
      return <DetailRow label="Message" value={preview} />;
    }
    default:
      return null;
  }
}

function FlowSteps({ approving }: { approving: boolean }) {
  const activeStep = approving ? "confirm" : "review";

  return (
    <ol className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2">
      {FLOW_STEPS.map((step, index) => {
        const isActive = step.id === activeStep;
        const isComplete =
          (step.id === "review" && approving) ||
          step.id === "review" && !approving && index === 0;

        return (
          <li key={step.id} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                isActive
                  ? "bg-purple-600 text-white"
                  : isComplete
                    ? "bg-green-500/20 text-green-300"
                    : "bg-white/10 text-slate-400"
              )}
            >
              {index + 1}
            </span>
            <span
              className={cn(
                "text-[11px] font-medium uppercase tracking-wide",
                isActive ? "text-purple-200" : "text-slate-500"
              )}
            >
              {step.label}
            </span>
            {index < FLOW_STEPS.length - 1 && (
              <span className="mx-1 hidden h-px flex-1 bg-white/10 sm:block" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function OrbitActionConfirmDialog({
  open,
  pendingAction,
  simulation,
  approving = false,
  onApprove,
  onCancel,
}: OrbitActionConfirmDialogProps) {
  if (!pendingAction) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !approving) onCancel();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="border border-purple-500/30 bg-[#070711] text-white sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-white">
            Protected transaction
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {TRANSACTION_CONFIRMATION_COPY.review} Nothing executes until you confirm
            and sign.
          </DialogDescription>
        </DialogHeader>

        <FlowSteps approving={approving} />

        <div className="rounded-xl border border-white/10 bg-black/40 px-4">
          <DetailRow label="Action" value={pendingAction.action} />
          {actionDetailRows(pendingAction)}
          <DetailRow
            label="Protocol"
            value={ORBIT_PROTOCOL.charAt(0).toUpperCase() + ORBIT_PROTOCOL.slice(1)}
          />
          <DetailRow
            label="Network"
            value={ORBIT_CHAIN.charAt(0).toUpperCase() + ORBIT_CHAIN.slice(1)}
          />
          <DetailRow label="Cost" value={pendingAction.costEth} />
        </div>

        {simulation?.batchSuccess && (
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3 text-xs text-green-200">
            <p className="font-medium">Simulation passed</p>
            <p className="mt-1 text-green-300/80">
              {simulation.steps.length} step{simulation.steps.length === 1 ? "" : "s"} ·{" "}
              {simulation.totalGas.toLocaleString()} gas on Base fork
            </p>
          </div>
        )}

        <p className="text-center text-xs text-slate-400">
          {approving
            ? TRANSACTION_CONFIRMATION_COPY.execute
            : TRANSACTION_CONFIRMATION_COPY.confirm}
        </p>

        <DialogFooter className="border-t-white/10 bg-transparent sm:justify-between">
          <Button
            type="button"
            variant="outline"
            disabled={approving}
            onClick={onCancel}
            className="border-white/15 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={approving}
            onClick={onApprove}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:brightness-110"
          >
            {approving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Confirming…
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
