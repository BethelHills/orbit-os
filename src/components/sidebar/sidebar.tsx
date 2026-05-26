"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageCircle,
  ArrowLeftRight,
  Wallet,
  BarChart3,
  Layers,
  Bell,
  Receipt,
  Plug,
  Settings,
  ChevronDown,
  Gem,
} from "lucide-react";

const links = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Agent Chat", icon: MessageCircle },
  { name: "Trade / Actions", icon: ArrowLeftRight },
  { name: "Portfolio", icon: Wallet },
  { name: "Analytics", icon: BarChart3 },
  { name: "Protocols", icon: Layers },
  { name: "Alerts", icon: Bell },
  { name: "Transactions", icon: Receipt },
  { name: "Integrations", icon: Plug },
  { name: "Settings", icon: Settings },
];

function useCountdown(target: Date) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return time;
}

export function Sidebar() {
  const countdown = useCountdown(new Date("2026-06-01T00:00:00Z"));

  return (
    <aside className="glass-strong hidden h-screen w-[17.5rem] shrink-0 flex-col border-r border-purple-500/10 lg:flex">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 border-b border-white/5 px-5 py-5"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 text-lg font-bold shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          A
        </div>
        <div>
          <div className="text-sm font-bold tracking-wide text-white">AOMI</div>
          <div className="text-[10px] uppercase tracking-[0.15em] text-purple-300/80">
            AI Agent OS
          </div>
        </div>
      </motion.div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {links.map((item, index) => {
          const Icon = item.icon;
          const active = index === 0;

          return (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[13px] transition ${
                active
                  ? "bg-gradient-to-r from-purple-600/40 to-blue-600/20 font-medium text-white shadow-[0_0_24px_rgba(139,92,246,0.25)]"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={16} className={active ? "text-purple-300" : ""} />
              {item.name}
            </motion.button>
          );
        })}
      </nav>

      <div className="mx-3 mb-3 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-blue-900/20 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/20">
            <Gem className="size-5 text-purple-300" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-purple-300/80">
              Early Forge
            </p>
            <p className="mt-0.5 text-xs font-semibold text-white">Bounty Season</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1 text-center">
          {[
            { label: "Days", val: countdown.d },
            { label: "Hrs", val: countdown.h },
            { label: "Mins", val: countdown.m },
            { label: "Secs", val: countdown.s },
          ].map((u) => (
            <div key={u.label} className="rounded-lg bg-black/30 px-1 py-1.5">
              <p className="text-sm font-bold text-white">{String(u.val).padStart(2, "0")}</p>
              <p className="text-[9px] text-slate-500">{u.label}</p>
            </div>
          ))}
        </div>
        <button className="mt-3 w-full rounded-xl bg-gradient-to-r from-purple-600/80 to-blue-600/80 py-2 text-[11px] font-medium text-white transition hover:brightness-110">
          View Bounty Guide
        </button>
      </div>

      <div className="border-t border-white/5 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-xs font-bold">
            BH
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">0xBethel…A7f3</p>
            <p className="flex items-center gap-1.5 text-[11px] text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
              Connected
            </p>
          </div>
          <ChevronDown size={14} className="text-slate-500" />
        </div>
      </div>
    </aside>
  );
}
