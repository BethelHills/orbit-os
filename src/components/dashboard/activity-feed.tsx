"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Rocket,
  UserPlus,
  TrendingUp,
  MessageSquare,
  Shield,
} from "lucide-react";
import { useOrbitStore } from "@/store/orbit-store";

const iconMap: Record<string, typeof Bell> = {
  holder: UserPlus,
  alert: Bell,
  launch: Rocket,
  volume: TrendingUp,
  message: MessageSquare,
  default: Shield,
};

function getIcon(kind?: string) {
  if (!kind) return iconMap.default;
  return iconMap[kind] ?? iconMap.default;
}

export function ActivityFeed() {
  const logs = useOrbitStore((s) => s.logs);

  return (
    <section className="glass mt-3 flex min-h-0 flex-1 flex-col rounded-2xl p-4">
      <div className="flex shrink-0 items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
            Recent Activity
          </p>
          <h2 className="text-sm font-semibold text-white">Live Feed</h2>
        </div>
        <button className="text-[11px] text-purple-300 transition hover:text-purple-200">
          View all
        </button>
      </div>

      <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto">
        {[...logs].reverse().slice(0, 8).map((log, i) => {
          const Icon = getIcon(log.kind);
          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-3 rounded-xl border border-white/5 bg-black/30 p-3"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  log.status === "error"
                    ? "bg-red-500/15 text-red-300"
                    : "bg-purple-500/15 text-purple-300"
                }`}
              >
                <Icon size={14} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs leading-relaxed text-slate-300">
                  {log.message}
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  {log.timestamp || "Just now"}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
