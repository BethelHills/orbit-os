"use client";

import { motion } from "framer-motion";

export function OrbitGlobe() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-[#080818] p-6 min-h-[430px]">
      <div className="relative z-10">
        <p className="text-sm text-purple-300">Aomi Network Visualization</p>
        <h2 className="text-2xl font-bold mt-2">Orbit Protocol Matrix</h2>
        <p className="text-slate-400 text-sm mt-2 max-w-md">
          Visual control layer for Aomi agents operating across Base protocols.
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="h-72 w-72 rounded-full border border-purple-500/50 shadow-[0_0_80px_rgba(168,85,247,0.45)]"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute h-96 w-96 rounded-full border border-blue-500/30"
        />

        <div className="absolute h-52 w-52 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="absolute h-40 w-40 rounded-full border border-white/20 bg-gradient-to-br from-purple-600/40 to-blue-600/20 shadow-[0_0_120px_rgba(59,130,246,0.5)]" />
      </div>

      <div className="absolute bottom-6 left-6 grid grid-cols-3 gap-3 z-10">
        {["Zora", "Aerodrome", "Avantis"].map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3"
          >
            <p className="text-xs text-slate-400">{item}</p>
            <p className="text-sm text-green-300 mt-1">Connected</p>
          </div>
        ))}
      </div>
    </section>
  );
}
