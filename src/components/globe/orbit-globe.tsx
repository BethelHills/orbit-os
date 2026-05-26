"use client";

import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";

const nodes = [
  { name: "AERODROME", count: "2,341 agents", side: "left" as const, top: "18%", left: "34%" },
  { name: "ZORA", count: "3,214 agents", side: "left" as const, top: "42%", left: "31%" },
  { name: "LIMITLESS", count: "2,018 agents", side: "left" as const, top: "70%", left: "36%" },
  { name: "AVANTIS", count: "2,945 agents", side: "right" as const, top: "18%", right: "7%" },
  { name: "MONAD", count: "1,940 agents", side: "right" as const, top: "60%", right: "7%" },
];

export function OrbitGlobe() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-violet-500/20 bg-[#050510] p-6 min-h-[430px] shadow-[0_0_70px_rgba(124,58,237,0.18)]">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(124,58,237,0.22),transparent_35%),radial-gradient(circle_at_45%_70%,rgba(37,99,235,0.16),transparent_30%)]" />

      {/* Stars */}
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle,rgba(168,85,247,0.8)_1px,transparent_1px)] [background-size:34px_34px]" />

      <div className="relative z-20 flex items-center gap-2">
        <h2 className="text-sm md:text-base font-bold tracking-[0.12em] text-violet-100">
          AOMI NETWORK VISUALIZATION
        </h2>
        <Info size={16} className="text-blue-400" />
      </div>

      {/* Left stats */}
      <div className="absolute left-6 top-20 z-20 w-[250px] rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
        <Stat label="ACTIVE AGENTS" value="12,458" growth="+ 24h +8.2%" />
        <Divider />
        <Stat label="ACTIONS EXECUTED" value="47,892" growth="+ 24h +18.6%" />
        <Divider />
        <Stat label="DATA POINTS PROCESSED" value="2.14TB" growth="+ 24h +32.4%" />

        <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-violet-500/50 bg-violet-600/15 px-4 py-3 font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.28)] transition hover:bg-violet-600/25">
          View Network Map
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Globe */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          className="relative h-[330px] w-[330px] rounded-full"
        >
          <div className="absolute inset-0 rounded-full border border-violet-300/50 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.35),rgba(139,92,246,0.22)_22%,rgba(30,41,59,0.2)_48%,rgba(2,6,23,0.75)_74%)] shadow-[0_0_80px_rgba(168,85,247,0.75),inset_0_0_55px_rgba(168,85,247,0.45)]" />

          {/* Globe grid */}
          <div className="absolute inset-5 rounded-full border border-violet-400/25" />
          <div className="absolute inset-12 rounded-full border border-violet-400/20" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-violet-400/20" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-violet-400/20" />

          {/* Fake continents */}
          <div className="absolute left-[25%] top-[18%] h-24 w-20 rounded-full bg-violet-300/20 blur-[1px]" />
          <div className="absolute right-[20%] top-[25%] h-28 w-24 rounded-full bg-violet-300/20 blur-[1px]" />
          <div className="absolute left-[42%] bottom-[18%] h-28 w-16 rounded-full bg-violet-300/20 blur-[1px]" />
        </motion.div>

        {/* Orbit rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute h-[210px] w-[560px] rounded-full border border-blue-500/70 shadow-[0_0_35px_rgba(59,130,246,0.45)]"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute h-[280px] w-[620px] rotate-12 rounded-full border border-violet-500/45 shadow-[0_0_45px_rgba(168,85,247,0.35)]"
        />

        {/* Lightning strikes */}
        <Lightning className="left-[44%] top-[30%] rotate-[18deg]" />
        <Lightning className="left-[56%] top-[43%] rotate-[-35deg]" />
        <Lightning className="left-[49%] top-[61%] rotate-[55deg]" />

        {/* Pulse dots */}
        {[
          "left-[47%] top-[27%]",
          "left-[58%] top-[38%]",
          "left-[53%] top-[58%]",
          "left-[42%] top-[67%]",
          "left-[61%] top-[69%]",
        ].map((pos) => (
          <motion.span
            key={pos}
            animate={{ scale: [1, 1.8, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute ${pos} z-20 h-3 w-3 rounded-full bg-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,1)]`}
          />
        ))}
      </div>

      {/* Protocol nodes */}
      {nodes.map((node) => (
        <Node key={node.name} {...node} />
      ))}
    </section>
  );
}

function Stat({
  label,
  value,
  growth,
}: {
  label: string;
  value: string;
  growth: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest text-slate-400">{label}</p>
      <div className="mt-2 flex items-end gap-2">
        <h3 className="text-3xl font-semibold text-white">{value}</h3>
        <span className="pb-1 text-sm font-semibold text-emerald-400">{growth}</span>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="my-5 h-px w-full bg-white/10" />;
}

function Node({
  name,
  count,
  side,
  top,
  left,
  right,
}: {
  name: string;
  count: string;
  side: "left" | "right";
  top: string;
  left?: string;
  right?: string;
}) {
  return (
    <div
      className="absolute z-30"
      style={{ top, left, right }}
    >
      <div className="relative">
        <motion.div
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className={`absolute top-1/2 h-px w-28 bg-gradient-to-r ${
            side === "left"
              ? "right-full from-transparent to-fuchsia-500"
              : "left-full from-fuchsia-500 to-transparent"
          }`}
        />

        <span
          className={`absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_18px_rgba(217,70,239,1)] ${
            side === "left" ? "-right-1" : "-left-1"
          }`}
        />

        <div className="rounded-2xl border border-violet-500/25 bg-black/40 px-5 py-4 backdrop-blur-xl shadow-[0_0_35px_rgba(124,58,237,0.18)]">
          <h4 className="text-sm font-bold text-white">{name}</h4>
          <p className="mt-2 text-sm text-violet-300">{count}</p>
        </div>
      </div>
    </div>
  );
}

function Lightning({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{
        opacity: [0, 1, 0.2, 1, 0],
        scaleX: [0.4, 1.15, 0.8, 1, 0.5],
      }}
      transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.1 }}
      className={`absolute z-10 h-px w-40 bg-gradient-to-r from-transparent via-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(34,211,238,0.9)] ${className}`}
    />
  );
}
