const logs = [
  "User selected Zora creator persona",
  "Aomi selected Zora protocol",
  "Coin launch workflow prepared",
  "Transaction simulation completed",
  "Holder monitoring enabled",
  "Price alert created",
];

export function AgentLogs() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-sm text-purple-300">Agent Actions</p>
      <h2 className="text-2xl font-bold mt-1">Live Execution Log</h2>

      <div className="mt-6 space-y-4">
        {logs.map((log, index) => (
          <div key={log} className="flex gap-3">
            <div className="h-7 w-7 rounded-full bg-green-500/20 text-green-300 flex items-center justify-center text-xs">
              ✓
            </div>

            <div>
              <p className="text-sm text-slate-200">{log}</p>
              <p className="text-xs text-slate-500">Step {index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
