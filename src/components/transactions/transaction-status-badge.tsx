import {
  TRANSACTION_STATUS_LABELS,
  type TransactionStatus,
} from "@/lib/transactions-data";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<TransactionStatus, string> = {
  staged: "border-amber-500/35 bg-amber-500/10 text-amber-300",
  simulated: "border-cyan-500/35 bg-cyan-500/10 text-cyan-300",
  signed: "border-purple-500/35 bg-purple-500/10 text-purple-200",
  confirmed: "border-emerald-500/35 bg-emerald-500/10 text-emerald-300",
  failed: "border-red-500/35 bg-red-500/10 text-red-300",
};

type TransactionStatusBadgeProps = {
  status: TransactionStatus;
  className?: string;
};

export function TransactionStatusBadge({
  status,
  className,
}: TransactionStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        STATUS_STYLES[status],
        className,
      )}
    >
      {TRANSACTION_STATUS_LABELS[status]}
    </span>
  );
}
