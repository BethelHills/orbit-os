import Image from "next/image";
import { Clock3, Layers3 } from "lucide-react";

import { TransactionStatusBadge } from "@/components/transactions/transaction-status-badge";
import type { OrbitTransaction } from "@/lib/transactions-data";
import { PROTOCOL_LOGOS, type ProtocolName } from "@/lib/protocol-logos";
import { cn } from "@/lib/utils";

function truncateHash(hash: string | null): string {
  if (!hash) return "Pending";
  if (hash.length <= 14) return hash;
  return `${hash.slice(0, 8)}…${hash.slice(-6)}`;
}

function ProtocolBadge({ protocol }: { protocol: string }) {
  const logoPath = PROTOCOL_LOGOS[protocol as ProtocolName];

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-orbit-foreground">
      {logoPath ? (
        <span className="relative size-5 shrink-0 overflow-hidden rounded-md border border-orbit-border bg-orbit-surface">
          <Image
            src={logoPath}
            alt=""
            fill
            className="object-cover"
            sizes="20px"
          />
        </span>
      ) : (
        <span className="flex size-5 shrink-0 items-center justify-center rounded-md border border-orbit-border bg-orbit-surface text-[10px] font-semibold uppercase text-orbit-muted">
          {protocol.slice(0, 1)}
        </span>
      )}
      {protocol}
    </span>
  );
}

type StagedTransactionQueueProps = {
  transactions: OrbitTransaction[];
};

export function StagedTransactionQueue({
  transactions,
}: StagedTransactionQueueProps) {
  if (transactions.length === 0) {
    return (
      <p className="rounded-[24px] border border-dashed border-orbit-border px-4 py-8 text-center text-sm text-orbit-muted">
        No staged transactions in the Aomi queue.
      </p>
    );
  }

  return (
    <ol className="relative space-y-0">
      {transactions.map((tx, index) => (
        <li key={tx.id} className="relative flex gap-4 pb-6 last:pb-0">
          {index < transactions.length - 1 ? (
            <span
              aria-hidden
              className="absolute left-[15px] top-10 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-purple-500/40 to-orbit-border"
            />
          ) : null}

          <div
            className={cn(
              "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-xl border text-xs font-semibold tabular-nums",
              tx.status === "signed"
                ? "border-purple-500/40 bg-purple-500/15 text-purple-200"
                : tx.status === "simulated"
                  ? "border-cyan-500/40 bg-cyan-500/15 text-cyan-200"
                  : "border-amber-500/40 bg-amber-500/15 text-amber-200",
            )}
          >
            {tx.queueOrder ?? index + 1}
          </div>

          <article className="min-w-0 flex-1 overflow-hidden rounded-[24px] border border-orbit-border bg-orbit-surface p-4 transition hover:border-purple-500/35 hover:bg-orbit-surface-strong sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Layers3 className="size-4 shrink-0 text-orbit-accent" />
                  <h3 className="break-words text-base font-semibold text-orbit-foreground">
                    {tx.action}
                  </h3>
                </div>
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-orbit-muted">
                  <ProtocolBadge protocol={tx.protocol} />
                  <span>{tx.network}</span>
                </p>
              </div>
              <TransactionStatusBadge status={tx.status} />
            </div>

            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
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
                <dd className="mt-1 flex items-center gap-1.5">
                  <Clock3 className="size-3.5 text-orbit-muted" />
                  {tx.timestampLabel}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-orbit-muted">
                  Gas
                </dt>
                <dd className="mt-1 font-mono text-xs">
                  {tx.gasLabel ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-orbit-muted">
                  Status
                </dt>
                <dd className="mt-1 capitalize">{tx.status}</dd>
              </div>
            </dl>
          </article>
        </li>
      ))}
    </ol>
  );
}
