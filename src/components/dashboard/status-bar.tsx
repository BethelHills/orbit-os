"use client";

import { Activity, Bot, Fuel, ShieldCheck } from "lucide-react";

const segments = [
  {
    icon: ShieldCheck,
    label: "Base Network",
    value: "Healthy",
    color: "text-blue-300",
    dot: "bg-blue-400",
  },
  {
    icon: Fuel,
    label: "Gas Price",
    value: "0.00021 ETH",
    sub: "Low",
    color: "text-purple-300",
  },
  {
    icon: Activity,
    label: "Aomi Status",
    value: "All systems operational",
    color: "text-green-300",
    dot: "bg-green-400",
  },
  {
    icon: Bot,
    label: "Agent Mode",
    value: "Autonomous",
    color: "text-purple-300",
  },
];

export function StatusBar() {
  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-3 z-50 flex justify-center px-4 lg:pl-[calc(17.5rem+1rem)] xl:pr-[calc(380px+1rem)]">
      <div className="glass-strong pointer-events-auto flex w-full max-w-4xl items-center justify-between gap-2 overflow-x-auto rounded-2xl px-4 py-2.5 text-[11px] neon-border">
        {segments.map((seg) => {
          const Icon = seg.icon;
          return (
            <div
              key={seg.label}
              className="flex shrink-0 items-center gap-2 border-r border-white/5 px-3 last:border-r-0"
            >
              <Icon size={14} className={seg.color} />
              <div>
                <p className="text-slate-500">{seg.label}</p>
                <p className={`flex items-center gap-1.5 font-medium ${seg.color}`}>
                  {seg.dot && (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${seg.dot} shadow-[0_0_6px_currentColor]`}
                    />
                  )}
                  {seg.value}
                  {seg.sub && (
                    <span className="text-slate-500">· {seg.sub}</span>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </footer>
  );
}
