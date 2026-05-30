"use client";

import React from "react";
import { motion } from "framer-motion";
import { OrbitBrand } from "@/components/brand/orbit-brand";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Bot,
  BarChart3,
  Bell,
  Wallet,
  Zap,
  Layers,
  Activity,
  Lock,
  Globe2,
  Sparkles,
  CheckCircle2,
  Cpu,
  Network,
  Rocket,
} from "lucide-react";

const protocols = [
  {
    name: "Zora",
    label: "Creator Economy",
    description: "Discover, analyze, and trade creator coins on Base.",
    accent: "from-blue-500 to-violet-500",
  },
  {
    name: "Aerodrome",
    label: "DEX & Liquidity",
    description: "Swap, provide liquidity, and explore liquidity routes.",
    accent: "from-red-500 to-blue-500",
  },
  {
    name: "Avantis",
    label: "Perpetuals",
    description: "Track perp markets, risk, and trading opportunities.",
    accent: "from-purple-500 to-fuchsia-500",
  },
  {
    name: "Across",
    label: "Cross-Chain Bridge",
    description: "Bridge assets across chains with speed and security.",
    accent: "from-emerald-400 to-cyan-500",
  },
  {
    name: "Stargate",
    label: "Omnichain Liquidity",
    description: "Move assets across chains through unified liquidity.",
    accent: "from-slate-400 to-blue-500",
  },
  {
    name: "Monad",
    label: "Ecosystem",
    description: "Explore next-generation high-performance chain workflows.",
    accent: "from-violet-500 to-indigo-500",
  },
];

const features = [
  {
    icon: Bot,
    title: "Agent Chat",
    description: "Ask OrbitOS to discover protocols, analyze wallets, prepare actions, and explain results.",
    cta: "Ask OrbitOS",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "AI-driven market intelligence, protocol activity, and opportunity signals.",
    cta: "Explore Analytics",
  },
  {
    icon: Bell,
    title: "AI Watchtower",
    description: "Track price moves, holder spikes, wallet activity, and transaction outcomes.",
    cta: "Create Alerts",
  },
  {
    icon: Zap,
    title: "Action Engine",
    description: "Prepare swaps, bridge flows, wallet queries, and on-chain workflows through Aomi.",
    cta: "Take Action",
  },
];

const steps = [
  { icon: Wallet, title: "Connect Wallet", text: "Securely connect your wallet on Base." },
  { icon: Bot, title: "Ask OrbitOS", text: "Tell the agent what you want to do." },
  { icon: Cpu, title: "Analyze & Plan", text: "AI analyzes protocols and builds the best plan." },
  { icon: ShieldCheck, title: "Review & Confirm", text: "Review actions and confirm with confidence." },
  { icon: Rocket, title: "Execute On-Chain", text: "OrbitOS executes and monitors the action." },
];

const navItems = ["Features", "Protocols", "Use Cases", "Security", "Docs", "Integrations"];

function GlowOrb({ className }: { className?: string }) {
  return <div className={`absolute rounded-full blur-3xl opacity-50 ${className}`} />;
}

function ProtocolCard({ protocol }: { protocol: (typeof protocols)[number] }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_0_60px_rgba(124,58,237,0.08)] backdrop-blur-xl"
    >
      <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${protocol.accent} opacity-20 blur-2xl transition group-hover:opacity-40`} />
      <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${protocol.accent} shadow-[0_0_30px_rgba(124,58,237,0.35)]`}>
        <Network size={24} />
      </div>
      <h3 className="text-xl font-semibold text-white">{protocol.name}</h3>
      <p className="mt-1 text-sm text-violet-300">{protocol.label}</p>
      <p className="mt-4 text-sm leading-6 text-slate-400">{protocol.description}</p>
    </motion.div>
  );
}

function FeatureCard({ feature }: { feature: (typeof features)[number] }) {
  const Icon = feature.icon;
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-3xl border border-violet-500/20 bg-white/[0.035] p-6 backdrop-blur-xl transition hover:border-violet-400/50"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-200 shadow-[0_0_35px_rgba(124,58,237,0.25)]">
        <Icon size={25} />
      </div>
      <h3 className="text-xl font-bold text-white">{feature.title}</h3>
      <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">{feature.description}</p>
      <button className="mt-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-600/15 px-4 py-2 text-sm text-violet-100 transition hover:bg-violet-600/25">
        {feature.cta}
        <ArrowRight size={15} />
      </button>
    </motion.div>
  );
}

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.2 }}
      className="relative mx-auto w-full max-w-3xl rounded-[2rem] border border-violet-400/30 bg-[#080814]/90 p-4 shadow-[0_0_90px_rgba(124,58,237,0.35)] backdrop-blur-2xl lg:rotate-[-2deg]"
    >
      <div className="absolute -inset-8 -z-10 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500" />
          <div>
            <p className="text-sm font-semibold text-white">OrbitOS</p>
            <p className="text-xs text-slate-500">Aomi Command Center</p>
          </div>
        </div>
        <div className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">Base · 0x8f...3a29</div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[180px_1fr]">
        <div className="hidden rounded-2xl border border-white/10 bg-black/20 p-4 lg:block">
          {["Overview", "Agent Chat", "Trade Actions", "Portfolio", "Protocols", "Analytics", "Alerts", "Transactions", "Settings"].map((item, index) => (
            <div
              key={item}
              className={`mb-2 rounded-xl px-3 py-2 text-xs ${index === 0 ? "bg-violet-600/30 text-white" : "text-slate-500"}`}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xl font-bold text-white">Welcome back, Operator 👋</p>
            <p className="text-sm text-slate-500">Ready to orchestrate on-chain actions with AI.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["Portfolio", "$24,780.42", "+2.4%"],
              ["24h PnL", "+$1,250.75", "+8.3%"],
              ["Active Alerts", "7", "2 new"],
              ["Transactions", "156", "+10%"],
            ].map(([label, value, change]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-2 text-lg font-bold text-white">{value}</p>
                <p className="text-xs text-emerald-400">{change}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_230px]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Portfolio Overview</p>
                  <p className="mt-1 text-2xl font-bold text-white">$24,780.42</p>
                </div>
                <span className="rounded-full bg-violet-600/20 px-3 py-1 text-xs text-violet-200">7D</span>
              </div>
              <svg viewBox="0 0 520 180" className="h-40 w-full overflow-visible">
                <defs>
                  <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 130 C40 115 60 140 100 104 C145 62 165 96 210 82 C245 70 260 56 300 82 C340 110 370 48 410 62 C455 78 470 22 520 38 L520 180 L0 180 Z" fill="url(#area)" />
                <path d="M0 130 C40 115 60 140 100 104 C145 62 165 96 210 82 C245 70 260 56 300 82 C340 110 370 48 410 62 C455 78 470 22 520 38" fill="none" stroke="#a855f7" strokeWidth="3" />
              </svg>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <p className="mb-4 text-sm font-semibold text-white">Top Holdings</p>
              {[
                ["ETH", "$8,742.31", "+5.6%"],
                ["USDC", "$6,231.18", "+0.1%"],
                ["AERO", "$3,421.57", "+12.3%"],
                ["ZORA", "$2,231.36", "+8.7%"],
              ].map(([asset, value, change]) => (
                <div key={asset} className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-slate-300">{asset}</span>
                  <div className="text-right">
                    <p className="text-white">{value}</p>
                    <p className="text-xs text-emerald-400">{change}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-violet-500/20 bg-black/25 px-4 py-3">
            <span className="flex-1 text-sm text-slate-500">Ask OrbitOS anything...</span>
            <button className="rounded-xl bg-violet-600 p-2 text-white">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function OrbitOSLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#02030a] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.28),transparent_32%),radial-gradient(circle_at_top_right,rgba(37,99,235,0.2),transparent_35%),linear-gradient(180deg,#03040c_0%,#050510_45%,#02030a_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:80px_80px]" />

      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
        <a href="/" className="flex shrink-0 items-center">
          <OrbitBrand showTagline={false} />
        </a>
        <div className="hidden items-center gap-8 text-sm text-slate-300 lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="transition hover:text-white">
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-100 sm:inline-flex">Built on Base</span>
          <a href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.35)] transition hover:scale-[1.02]">
            Launch App
            <ArrowRight size={16} />
          </a>
        </div>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-28 lg:pt-20">
        <GlowOrb className="left-20 top-32 h-72 w-72 bg-violet-700" />
        <GlowOrb className="right-32 top-24 h-96 w-96 bg-blue-700" />

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-600/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-violet-200">
            <Sparkles size={14} />
            AI Operating System for Web3
          </div>
          <h1 className="max-w-2xl text-6xl font-black tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
            Orbit<span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">OS</span>
          </h1>
          <h2 className="mt-5 max-w-xl text-4xl font-extrabold leading-tight tracking-[-0.04em] md:text-5xl">
            AI Operating System for On-Chain Actions
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            Your intelligent command center for DeFi, creator economy, analytics, alerts, and on-chain execution. Ask. Analyze. Act. All through natural language.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="/dashboard" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-4 font-semibold shadow-[0_0_40px_rgba(124,58,237,0.45)] transition hover:translate-y-[-2px]">
              Launch OrbitOS
              <ArrowRight size={19} />
            </a>
            <a href="/agent-chat" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-7 py-4 font-semibold text-slate-200 backdrop-blur-xl transition hover:border-violet-400/50 hover:text-white">
              View Demo
              <Play size={18} />
            </a>
          </div>

          <div className="mt-14">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Trusted by the ecosystem</p>
            <div className="flex flex-wrap items-center gap-6 text-xl font-bold text-slate-300">
              <span>aomi</span>
              <span>BASE</span>
              <span>ZORA</span>
              <span>AERODROME</span>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-1/2 -z-10 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/25 shadow-[0_0_90px_rgba(124,58,237,0.25)]" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20"
          />
          <DashboardPreview />
        </div>
      </section>

      <section id="protocols" className="relative z-10 mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">Powered by leading protocols</p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {protocols.map((protocol) => (
            <ProtocolCard key={protocol.name} protocol={protocol} />
          ))}
        </div>
      </section>

      <section id="features" className="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[0.65fr_1fr] lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">AI-powered features</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.04em] md:text-5xl">Everything you need to operate on-chain</h2>
          <p className="mt-5 max-w-lg text-slate-400">
            OrbitOS combines AI agents, real-time data, wallet context, and on-chain execution to give you one unified advantage.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div className="rounded-3xl border border-blue-500/20 bg-white/[0.035] p-6 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">Market Intelligence</p>
          <h3 className="mt-3 text-3xl font-bold">AI Analytics</h3>
          <p className="mt-3 text-slate-400">Track market trends, protocol activity, and opportunity signals before they happen.</p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Market Overview</p>
                <p className="mt-1 text-2xl font-bold">$1.82B</p>
              </div>
              <span className="text-emerald-400">+18.6%</span>
            </div>
            <svg viewBox="0 0 600 210" className="h-48 w-full">
              <path d="M0 160 C60 135 75 180 135 122 C190 70 210 130 270 96 C320 68 340 130 390 92 C440 52 465 112 520 74 C550 54 570 40 600 50" fill="none" stroke="#a855f7" strokeWidth="4" />
              <path d="M0 160 C60 135 75 180 135 122 C190 70 210 130 270 96 C320 68 340 130 390 92 C440 52 465 112 520 74 C550 54 570 40 600 50 L600 210 L0 210 Z" fill="rgba(168,85,247,0.18)" />
            </svg>
          </div>
        </div>

        <div className="rounded-3xl border border-violet-500/20 bg-white/[0.035] p-6 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">Portfolio Intelligence</p>
          <h3 className="mt-3 text-3xl font-bold">Smart Portfolio</h3>
          <p className="mt-3 text-slate-400">Real-time wallet tracking, risk analysis, and AI-powered recommendations.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-[220px_1fr]">
            <div className="relative flex h-56 items-center justify-center rounded-full bg-[conic-gradient(from_90deg,#8b5cf6_0deg,#22d3ee_95deg,#2563eb_190deg,#f472b6_280deg,#8b5cf6_360deg)] p-5 shadow-[0_0_45px_rgba(37,99,235,0.25)]">
              <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#050510] text-center">
                <p className="text-sm text-slate-500">Total Value</p>
                <p className="text-2xl font-bold">$24,780</p>
                <p className="text-emerald-400">+12.4%</p>
              </div>
            </div>
            <div className="space-y-4 self-center">
              {["ETH 35.3%", "USDC 26.1%", "AERO 13.8%", "ZORA 9.0%", "Others 16.8%"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-300">
                  <span className="h-3 w-3 rounded-full bg-violet-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="relative z-10 mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-10 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">How it works</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.04em]">Operate on-chain in 5 simple steps</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/40 bg-violet-600/15 text-violet-200">
                  <Icon size={24} />
                </div>
                <span className="absolute right-5 top-5 text-sm text-violet-300">0{index + 1}</span>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{step.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="security" className="relative z-10 mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">Built for security. Designed for control.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              [Lock, "Non-Custodial", "You always own your keys."],
              [Activity, "On-Chain Transparency", "Every action is verifiable on-chain."],
              [ShieldCheck, "AI Safety Guardrails", "Built-in checks and simulations."],
              [Globe2, "Base Network", "Fast, secure, and low cost."],
            ].map(([Icon, title, text]) => {
              const SafeIcon = Icon as typeof Lock;
              return (
                <div key={title as string} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <SafeIcon className="text-violet-300" size={28} />
                  <h3 className="mt-4 font-bold">{title as string}</h3>
                  <p className="mt-2 text-sm text-slate-400">{text as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-10 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-violet-400/40 bg-gradient-to-r from-violet-600/25 via-fuchsia-600/15 to-blue-600/25 p-8 shadow-[0_0_80px_rgba(124,58,237,0.25)] md:p-12">
          <GlowOrb className="right-10 top-8 h-56 w-56 bg-blue-600" />
          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">Ready to take control of your on-chain universe?</h2>
              <p className="mt-3 text-slate-300">Launch OrbitOS and experience the future of DeFi with AI.</p>
            </div>
            <a href="/dashboard" className="inline-flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-4 font-semibold shadow-[0_0_40px_rgba(124,58,237,0.45)]">
              Enter OrbitOS
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-slate-500 md:flex-row md:items-center">
          <OrbitBrand />
          <div className="flex flex-wrap gap-5">
            <a href="/agent-chat" className="hover:text-white">Agent Chat</a>
            <a href="/trade-actions" className="hover:text-white">Trade Actions</a>
            <a href="/analytics" className="hover:text-white">Analytics</a>
            <a href="/settings" className="hover:text-white">Settings</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
