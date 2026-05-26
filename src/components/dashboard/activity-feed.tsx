"use client";

import { motion } from "framer-motion";
import { useOrbitStore } from "@/store/orbit-store";

export function ActivityFeed() {
  const logs = useOrbitStore((s) => s.logs);

  return (
    <section className="glass mt-4 flex min-h-0 flex-1 flex-col rounded-2xl p-4">
      <div className="shrink-0">
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Activity
        </p>
        <h2 className="text-sm font-semibold text-white">Recent Feed</h2>
      </div>

      <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto">
        {[...logs].reverse().slice(0, 8).map((log, i) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex gap-2 rounded-xl border border-white/5 bg-black/30 p-3"
          >
            <span
              className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                log.status === "error"
                  ? "bg-red-400"
                  : log.status === "pending"
                    ? "bg-yellow-400 animate-pulse"
                    : "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
              }`}
            />
            <div className="min-w-0">
              <p className="text-xs leading-relaxed text-slate-300">
                {log.message}
              </p>
              {log.tool && (
                <p className="mt-1 text-[10px] text-purple-400/80">
                  {log.tool}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
