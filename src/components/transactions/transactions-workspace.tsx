"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  StandalonePageHeader,
  StandalonePageShell,
} from "@/components/layout/standalone-page";
import { CompletedTransactionsTable } from "@/components/transactions/completed-transactions-table";
import { FailedTransactionsSection } from "@/components/transactions/failed-transactions-section";
import { StagedTransactionQueue } from "@/components/transactions/staged-transaction-queue";
import { TransactionSummaryCards } from "@/components/transactions/transaction-summary-cards";
import { TransactionsEmptyState } from "@/components/transactions/transactions-empty-state";
import { useTransactionsTimeline } from "@/hooks/use-transactions-timeline";
import { buildAgentChatUrl } from "@/lib/agent-chat-url";
import {
  hasAnyTransactions,
  TRANSACTIONS_DEFAULT_PROMPT,
} from "@/lib/transactions-data";

export function TransactionsWorkspace() {
  const data = useTransactionsTimeline();
  const isEmpty = !hasAnyTransactions(data);

  return (
    <StandalonePageShell>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-purple-600/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-32 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <StandalonePageHeader
          title="Blockchain Timeline"
          subtitle="Track staged Aomi actions, wallet signatures, and on-chain confirmations across Base protocols — with a live queue and transaction history."
        />

        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-200">
              {data.meta.source} data
            </span>
            <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-200">
              {data.staged.length} in queue
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              {data.summary.confirmed} confirmed
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-orbit-muted">
              {data.meta.network}
            </span>
          </div>
          <Link
            href={buildAgentChatUrl(TRANSACTIONS_DEFAULT_PROMPT)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500"
          >
            Show pending transactions in Agent Chat
            <ArrowUpRight className="size-4 opacity-80" />
          </Link>
        </div>

        {isEmpty ? (
          <TransactionsEmptyState />
        ) : (
          <div className="relative space-y-8 sm:space-y-10">
            <section className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
                  Overview
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  Transaction summary
                </h2>
              </div>
              <TransactionSummaryCards summary={data.summary} />
            </section>

            <section className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
                  Queue
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  Staged transaction queue
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-orbit-muted">
                  Actions prepared by Aomi awaiting simulation, signature, or
                  broadcast.
                </p>
              </div>
              <StagedTransactionQueue transactions={data.staged} />
            </section>

            <section className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
                  History
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  Completed transactions
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-orbit-muted">
                  Confirmed on-chain actions with hash, gas, and protocol details.
                </p>
              </div>
              <CompletedTransactionsTable transactions={data.completed} />
            </section>

            <section className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
                  Errors
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  Failed / reverted
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-orbit-muted">
                  Reverted or failed transactions with revert reasons for quick
                  debugging.
                </p>
              </div>
              <FailedTransactionsSection transactions={data.failed} />
            </section>
          </div>
        )}
      </div>
    </StandalonePageShell>
  );
}
