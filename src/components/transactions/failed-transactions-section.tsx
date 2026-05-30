import { AlertTriangle } from "lucide-react";

import { TransactionStatusBadge } from "@/components/transactions/transaction-status-badge";
import type { OrbitTransaction } from "@/lib/transactions-data";

function truncateHash(hash: string | null): string {
  if (!hash) return "—";
  if (hash.length <= 14) return hash;
  return `${hash.slice(0, 8)}…${hash.slice(-6)}`;
}

type FailedTransactionsSectionProps = {
  transactions: OrbitTransaction[];
};

export function FailedTransactionsSection({
  transactions,
}: FailedTransactionsSectionProps) {
  if (transactions.length === 0) {
    return (
      <p className="rounded-[24px] border border-dashed border-orbit-border px-4 py-8 text-center text-sm text-orbit-muted">
        No failed or reverted transactions.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <article
          key={tx.id}
          className="relative overflow-hidden rounded-[24px] border border-red-500/25 bg-red-500/[0.04] p-4 sm:p-5"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-red-500/10 blur-3xl"
          />

          <div className="relative flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10">
                <AlertTriangle className="size-4 text-red-300" />
              </span>
              <div className="min-w-0">
                <h3 className="break-words text-base font-semibold text-orbit-foreground">
                  {tx.action}
                </h3>
                <p className="mt-1 text-sm text-orbit-muted">
                  {tx.protocol} · {tx.network}
                </p>
              </div>
            </div>
            <TransactionStatusBadge status={tx.status} />
          </div>

          {tx.errorMessage ? (
            <p className="relative mt-4 rounded-2xl border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5 text-sm leading-relaxed text-red-200/90">
              {tx.errorMessage}
            </p>
          ) : null}

          <dl className="relative mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-orbit-muted">
                Hash
              </dt>
              <dd className="mt-1 break-all font-mono text-xs text-orbit-accent">
                {truncateHash(tx.hash)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-orbit-muted">
                Timestamp
              </dt>
              <dd className="mt-1">{tx.timestampLabel}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-orbit-muted">
                Gas
              </dt>
              <dd className="mt-1 font-mono text-xs">{tx.gasLabel ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-orbit-muted">
                Status
              </dt>
              <dd className="mt-1 capitalize text-red-300">{tx.status}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}
