"use client";

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
import { ORBIT_CHAIN, ORBIT_PROTOCOL } from "@/lib/aomi/orbit-action-types";

interface OrbitActionConfirmDialogProps {
  open: boolean;
  pendingAction: PendingWriteAction | null;
  approving?: boolean;
  onApprove: () => void;
  onCancel: () => void;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
      <span className="text-xs uppercase tracking-wider text-slate-400">{label}</span>
      <span className="font-mono text-sm text-white">{value}</span>
    </div>
  );
}

export function OrbitActionConfirmDialog({
  open,
  pendingAction,
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
          <DialogTitle className="font-serif text-xl text-white">Confirm action</DialogTitle>
          <DialogDescription className="text-slate-400">
            Review this Zora transaction on Base before approving.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-white/10 bg-black/40 px-4">
          <DetailRow label="Action" value={pendingAction.action} />
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

        <p className="text-center text-sm text-purple-200">Confirm?</p>

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
            {approving ? "Approving…" : "Approve"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
