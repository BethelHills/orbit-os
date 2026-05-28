import {
  StandalonePageHeader,
  StandalonePageShell,
} from "@/components/layout/standalone-page";
import { transactions } from "@/lib/orbitos-data";

export default function TransactionsPage() {
  return (
    <StandalonePageShell maxWidth="5xl">
      <StandalonePageHeader
        title="Blockchain Timeline"
        subtitle="Track every agent action, wallet event, and transaction in one timeline."
      />

      <div className="space-y-4">
        {transactions.map((tx, index) => (
          <article
            key={tx.hash}
            className="min-w-0 rounded-[24px] border border-purple-500/20 bg-white/[0.035] p-4 sm:p-5"
          >
            <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-600/30 text-sm font-medium">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="break-words font-semibold leading-snug">{tx.title}</h2>
                <p className="mt-1 text-sm text-slate-400">{tx.time}</p>
                <p className="mt-1 break-all font-mono text-xs text-purple-300 sm:text-sm">
                  {tx.hash}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </StandalonePageShell>
  );
}
