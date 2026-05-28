import { transactions } from "@/lib/orbitos-data";

export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-[#050510] text-white p-4 md:p-6 lg:p-8">
      <section className="max-w-5xl mx-auto">
        <p className="text-sm text-purple-300 tracking-[0.25em] uppercase">
          OrbitOS
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mt-2">
          Blockchain Timeline
        </h1>
        <p className="text-slate-400 mt-3 mb-8">
          Track every agent action, wallet event, and transaction in one timeline.
        </p>

        <div className="space-y-4">
          {transactions.map((tx, index) => (
            <div
              key={tx.hash}
              className="rounded-[24px] border border-purple-500/20 bg-white/[0.035] p-5"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-purple-600/30 flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <h2 className="font-semibold">{tx.title}</h2>
                  <p className="text-sm text-slate-400">{tx.time}</p>
                  <p className="text-sm text-purple-300 mt-1">{tx.hash}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
