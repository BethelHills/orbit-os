import Link from "next/link";
import { ArrowUpRight, Receipt } from "lucide-react";

import { buildAgentChatUrl } from "@/lib/agent-chat-url";
import { TRANSACTIONS_DEFAULT_PROMPT } from "@/lib/transactions-data";

export function TransactionsEmptyState() {
  return (
    <div className="rounded-[28px] border border-dashed border-orbit-border bg-orbit-surface/60 px-5 py-14 text-center sm:px-8">
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-orbit-border bg-orbit-surface-strong">
        <Receipt className="size-6 text-orbit-muted" />
      </div>
      <p className="mt-4 text-lg font-medium text-orbit-foreground">
        No transactions yet
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-orbit-muted">
        Staged Aomi actions, wallet signatures, and on-chain confirmations will
        appear here as a blockchain timeline. Start by asking Agent Chat to review
        your pending queue.
      </p>
      <Link
        href={buildAgentChatUrl(TRANSACTIONS_DEFAULT_PROMPT)}
        className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500"
      >
        Show pending transactions in Agent Chat
        <ArrowUpRight className="size-4 opacity-80" />
      </Link>
    </div>
  );
}
