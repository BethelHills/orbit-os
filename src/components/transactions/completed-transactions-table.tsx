import Image from "next/image";

import { TransactionStatusBadge } from "@/components/transactions/transaction-status-badge";
import type { OrbitTransaction } from "@/lib/transactions-data";
import { PROTOCOL_LOGOS, type ProtocolName } from "@/lib/protocol-logos";

function truncateHash(hash: string | null): string {
  if (!hash) return "—";
  if (hash.length <= 14) return hash;
  return `${hash.slice(0, 8)}…${hash.slice(-6)}`;
}

function ProtocolCell({ protocol }: { protocol: string }) {
  const logoPath = PROTOCOL_LOGOS[protocol as ProtocolName];

  return (
    <div className="flex items-center gap-2">
      {logoPath ? (
        <span className="relative size-6 shrink-0 overflow-hidden rounded-md border border-orbit-border bg-orbit-surface">
          <Image
            src={logoPath}
            alt=""
            fill
            className="object-cover"
            sizes="24px"
          />
        </span>
      ) : null}
      <span>{protocol}</span>
    </div>
  );
}

type CompletedTransactionsTableProps = {
  transactions: OrbitTransaction[];
};

export function CompletedTransactionsTable({
  transactions,
}: CompletedTransactionsTableProps) {
  if (transactions.length === 0) {
    return (
      <p className="rounded-[24px] border border-dashed border-orbit-border px-4 py-8 text-center text-sm text-orbit-muted">
        No confirmed transactions yet.
      </p>
    );
  }

  return (
    <>
      <div className="space-y-3 md:hidden">
        {transactions.map((tx) => (
          <article
            key={tx.id}
            className="rounded-[24px] border border-orbit-border bg-orbit-surface-strong p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="break-words text-base font-semibold">{tx.action}</h3>
                <p className="mt-1 text-sm text-orbit-muted">{tx.network}</p>
              </div>
              <TransactionStatusBadge status={tx.status} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-orbit-muted">Protocol</dt>
                <dd className="mt-0.5">
                  <ProtocolCell protocol={tx.protocol} />
                </dd>
              </div>
              <div>
                <dt className="text-orbit-muted">Timestamp</dt>
                <dd className="mt-0.5">{tx.timestampLabel}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-orbit-muted">Hash</dt>
                <dd className="mt-0.5 break-all font-mono text-xs text-orbit-accent">
                  {truncateHash(tx.hash)}
                </dd>
              </div>
              <div>
                <dt className="text-orbit-muted">Gas</dt>
                <dd className="mt-0.5 font-mono text-xs">{tx.gasLabel ?? "—"}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-[28px] border border-orbit-border bg-orbit-surface-strong md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-sm">
            <thead>
              <tr className="border-b border-orbit-subtle text-left text-orbit-muted">
                <th className="p-4 font-normal">Action</th>
                <th className="p-4 font-normal">Protocol</th>
                <th className="p-4 font-normal">Network</th>
                <th className="p-4 font-normal">Hash</th>
                <th className="p-4 font-normal">Timestamp</th>
                <th className="p-4 font-normal">Gas</th>
                <th className="p-4 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-orbit-subtle last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="max-w-[220px] p-4">
                    <div className="break-words font-medium">{tx.action}</div>
                  </td>
                  <td className="p-4">
                    <ProtocolCell protocol={tx.protocol} />
                  </td>
                  <td className="p-4 text-orbit-muted">{tx.network}</td>
                  <td className="p-4">
                    <span className="font-mono text-xs text-orbit-accent">
                      {truncateHash(tx.hash)}
                    </span>
                  </td>
                  <td className="p-4 text-orbit-muted">{tx.timestampLabel}</td>
                  <td className="p-4 font-mono text-xs">{tx.gasLabel ?? "—"}</td>
                  <td className="p-4">
                    <TransactionStatusBadge status={tx.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
