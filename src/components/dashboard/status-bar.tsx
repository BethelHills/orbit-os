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

interface StatusBarProps {
  hasAssistantPanel?: boolean;
}

export function StatusBar({ hasAssistantPanel = false }: StatusBarProps) {
  return (
    <footer
      className={`pointer-events-none fixed inset-x-0 bottom-2 z-50 flex justify-center px-3 sm:bottom-3 sm:px-4 lg:pl-[calc(17.5rem+1rem)] ${
        hasAssistantPanel ? "xl:pr-8" : ""
      }`}
    >
      <div className="glass-strong pointer-events-auto flex w-full max-w-4xl items-center justify-between gap-1 overflow-x-auto rounded-xl px-3 py-2 text-[10px] neon-border sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-2.5 sm:text-[11px]">
        {segments.map((seg) => {
          const Icon = seg.icon;
          return (
            <div
              key={seg.label}
              className="flex shrink-0 items-center gap-1.5 border-r border-white/5 px-2 last:border-r-0 sm:gap-2 sm:px-3"
            >
              <Icon size={14} className={`shrink-0 ${seg.color}`} />
              <div className="min-w-0">
                <p className="hidden text-slate-500 sm:block">{seg.label}</p>
                <p className={`flex items-center gap-1 font-medium ${seg.color}`}>
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
