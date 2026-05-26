"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageCircle,
  Layers,
  Activity,
  BarChart3,
  Bell,
  FileText,
  Settings,
} from "lucide-react";

const links = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Aomi Chat", icon: MessageCircle },
  { name: "Protocols", icon: Layers },
  { name: "Agent Actions", icon: Activity },
  { name: "Analytics", icon: BarChart3 },
  { name: "Alerts", icon: Bell },
  { name: "Docs", icon: FileText },
  { name: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="glass-strong hidden h-screen w-[18rem] shrink-0 flex-col border-r border-purple-500/10 p-4 lg:flex">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8 px-2"
      >
        <div className="neon-text text-2xl font-bold tracking-tight">OrbitOS</div>
        <p className="mt-1 text-xs text-purple-300/90">
          Zora Creator Assistant · Base
        </p>
      </motion.div>

      <nav className="flex-1 space-y-1 overflow-y-auto">
        {links.map((item, index) => {
          const Icon = item.icon;
          const active = index === 0;

          return (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-gradient-to-r from-purple-600/30 to-blue-600/20 text-white neon-border"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={17} className={active ? "text-purple-300" : ""} />
              {item.name}
            </motion.button>
          );
        })}
      </nav>

      <div className="mt-4 rounded-xl border border-purple-500/25 bg-purple-500/10 p-4">
        <p className="text-xs text-purple-200">Early Forge</p>
        <h3 className="mt-1 text-sm font-semibold">Build. Ship. Earn.</h3>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
          Submit GitHub, demo video, live app, and README.
        </p>
      </div>
    </aside>
  );
}
