"use client";

import { useOrbitStore } from "@/store/orbit-store";

export function AgentLogs() {
  const logs = useOrbitStore((s) => s.logs);

  return (
    <section className="glass rounded-3xl p-6">
      <p className="text-sm text-purple-300">Agent Actions</p>
      <h2 className="text-2xl font-bold mt-1">Live Execution Log</h2>

      <div className="mt-6 space-y-4 max-h-[360px] overflow-y-auto">
        {logs.map((log, index) => (
          <div key={log.id} className="flex gap-3">
            <div
              className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-xs ${
                log.status === "error"
                  ? "bg-red-500/20 text-red-300"
                  : log.status === "pending"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-green-500/20 text-green-300"
              }`}
            >
              {log.status === "pending" ? "…" : log.status === "error" ? "!" : "✓"}
            </div>

            <div>
              <p className="text-sm text-slate-200">{log.message}</p>
              <p className="text-xs text-slate-500">
                {log.tool ? `${log.tool} · ` : ""}Step {index + 1}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
