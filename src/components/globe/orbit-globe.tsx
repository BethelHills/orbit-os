"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { useActivityLogs, useCoin } from "@/store/orbit-store";

const GlobeScene = dynamic(
  () => import("@/components/globe/globe-scene").then((m) => m.GlobeScene),
  { ssr: false }
);

const nodes = [
  {
    name: "AERODROME",
    count: "2,341 agents",
    side: "left" as const,
    top: "12%",
    left: "30%",
    mobileTop: "10%",
    mobileLeft: "0%",
  },
  {
    name: "ZORA",
    count: "3,214 agents",
    side: "left" as const,
    top: "38%",
    left: "28%",
    mobileTop: "32%",
    mobileLeft: "0%",
  },
  {
    name: "LIMITLESS",
    count: "2,018 agents",
    side: "left" as const,
    top: "68%",
    left: "32%",
    mobileTop: "66%",
    mobileLeft: "0%",
  },
  {
    name: "AVANTIS",
    count: "2,945 agents",
    side: "right" as const,
    top: "12%",
    right: "4%",
    mobileTop: "14%",
    mobileRight: "0%",
  },
  {
    name: "MONAD",
    count: "1,940 agents",
    side: "right" as const,
    top: "58%",
    right: "4%",
    mobileTop: "52%",
    mobileRight: "0%",
  },
];

const pulseDots = [
  "left-[47%] top-[27%]",
  "left-[58%] top-[38%]",
  "left-[53%] top-[58%]",
  "left-[42%] top-[67%]",
  "left-[61%] top-[69%]",
];

export function OrbitGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const mounted = useMounted();
  const isDesktopQuery = useMediaQuery("(min-width: 1024px)");
  const isDesktop = mounted && isDesktopQuery;
  const globeOffset: [number, number] = isDesktop ? [80, 0] : [20, 0];
  const coin = useCoin();

  const liveNodes = nodes.map((node) =>
    node.name === "ZORA" && coin.holderCount > 0
      ? { ...node, count: `${coin.holderCount.toLocaleString()} holders` }
      : node
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setDims({ w: Math.round(width), h: Math.round(height) });
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="relative min-h-[560px] overflow-hidden rounded-2xl border border-violet-500/20 bg-[#050510] shadow-[0_0_70px_rgba(124,58,237,0.18)] sm:min-h-[640px] sm:rounded-[28px] lg:min-h-[430px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.22),transparent_35%),radial-gradient(circle_at_45%_70%,rgba(37,99,235,0.16),transparent_30%)] lg:bg-[radial-gradient(circle_at_60%_50%,rgba(124,58,237,0.22),transparent_35%),radial-gradient(circle_at_45%_70%,rgba(37,99,235,0.16),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.25),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(168,85,247,0.8)_1px,transparent_1px)] opacity-60 [background-size:34px_34px]" />

      <div className="relative z-20 flex items-center gap-2 px-4 pt-4 sm:px-6 sm:pt-6">
        <h2 className="text-xs font-bold tracking-[0.1em] text-violet-100 sm:text-sm sm:tracking-[0.12em] md:text-base">
          AOMI NETWORK VISUALIZATION
        </h2>
        <Info size={14} className="shrink-0 text-blue-400 sm:size-4" />
      </div>

      <StatsPanel className="relative z-20 mx-4 mt-3 sm:mx-6 lg:absolute lg:left-6 lg:top-20 lg:mx-0 lg:mt-0 lg:w-[250px]" compact />

      <div
        ref={containerRef}
        className="relative z-10 mx-auto mt-2 h-[440px] w-full max-w-full touch-none sm:mt-3 sm:h-[500px] lg:mt-0 lg:h-[430px]"
      >
        {dims ? (
          <GlobeScene
            width={dims.w}
            height={dims.h}
            globeOffset={globeOffset}
          />
        ) : null}

        <div className="hidden lg:contents">
          <Lightning className="left-[44%] top-[30%] rotate-[18deg]" />
          <Lightning className="left-[56%] top-[43%] rotate-[-35deg]" />
          <Lightning className="left-[49%] top-[61%] rotate-[55deg]" />
        </div>

        <div className="lg:hidden">
          <Lightning className="left-[50%] top-[30%] w-20 rotate-[18deg]" />
          <Lightning className="left-[58%] top-[43%] w-20 rotate-[-35deg]" />
          <Lightning className="left-[54%] top-[61%] w-20 rotate-[55deg]" />
        </div>

        {pulseDots.map((pos) => (
          <motion.span
            key={pos}
            initial={false}
            animate={{ scale: [1, 1.8, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`pointer-events-none absolute ${pos} z-20 h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,1)] sm:h-3 sm:w-3`}
          />
        ))}

        <motion.div
          initial={false}
          animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-3xl sm:h-48 sm:w-48 lg:h-64 lg:w-64"
        />

        {liveNodes.map((node) => (
          <Node key={node.name} {...node} isDesktop={isDesktop} />
        ))}
      </div>
    </section>
  );
}

function StatsPanel({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const coin = useCoin();
  const logs = useActivityLogs();

  const agents = (12000 + coin.holderCount * 285).toLocaleString();
  const actions = (45000 + logs.length * 892).toLocaleString();
  const dataVolume = `${(2.1 + coin.volume24hEth * 0.02).toFixed(2)}TB`;

  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl sm:p-4 lg:rounded-2xl lg:p-5",
        className
      )}
    >
      <Stat label="ACTIVE AGENTS" value={agents} growth="+ 24h +8.2%" compact={compact} />
      <Divider compact={compact} />
      <Stat label="ACTIONS EXECUTED" value={actions} growth="+ 24h +18.6%" compact={compact} />
      <Divider compact={compact} />
      <Stat label="DATA POINTS PROCESSED" value={dataVolume} growth="+ 24h +32.4%" compact={compact} />
      <button
        type="button"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-violet-500/50 bg-violet-600/15 px-3 py-2 text-[11px] font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.28)] transition hover:bg-violet-600/25 sm:mt-4 sm:gap-3 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm lg:mt-6"
      >
        View Network Map
        <ArrowRight size={16} className="sm:size-[18px]" />
      </button>
    </div>
  );
}

function Stat({
  label,
  value,
  growth,
  compact = false,
}: {
  label: string;
  value: string;
  growth: string;
  compact?: boolean;
}) {
  return (
    <div>
      <p
        className={cn(
          "font-semibold tracking-widest text-slate-400",
          compact ? "text-[9px] sm:text-[10px] lg:text-xs" : "text-xs"
        )}
      >
        {label}
      </p>
      <div className={cn("mt-1 flex items-end gap-1.5 sm:mt-2 sm:gap-2", compact && "flex-wrap")}>
        <h3
          className={cn(
            "font-semibold text-white",
            compact ? "text-lg sm:text-xl lg:text-3xl" : "text-3xl"
          )}
        >
          {value}
        </h3>
        <span
          className={cn(
            "font-semibold text-emerald-400",
            compact ? "pb-0.5 text-[10px] sm:text-xs lg:pb-1 lg:text-sm" : "pb-1 text-sm"
          )}
        >
          {growth}
        </span>
      </div>
    </div>
  );
}

function Divider({ compact = false }: { compact?: boolean }) {
  return <div className={cn("h-px w-full bg-white/10", compact ? "my-2.5 sm:my-3 lg:my-5" : "my-5")} />;
}

function Node({
  name,
  count,
  side,
  top,
  left,
  right,
  mobileTop,
  mobileLeft,
  mobileRight,
  isDesktop,
}: {
  name: string;
  count: string;
  side: "left" | "right";
  top: string;
  left?: string;
  right?: string;
  mobileTop: string;
  mobileLeft?: string;
  mobileRight?: string;
  isDesktop: boolean;
}) {
  const style = isDesktop
    ? { top, left, right }
    : { top: mobileTop, left: mobileLeft, right: mobileRight };

  return (
    <div className="absolute z-30" style={style}>
      <div className="relative">
        <motion.div
          initial={false}
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className={cn(
            "absolute top-1/2 h-px bg-gradient-to-r",
            side === "left"
              ? "right-full from-transparent to-fuchsia-500"
              : "left-full from-fuchsia-500 to-transparent",
            isDesktop ? "w-28" : "w-8 sm:w-12"
          )}
        />
        <span
          className={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_18px_rgba(217,70,239,1)]",
            isDesktop ? "h-2.5 w-2.5" : "h-2 w-2 sm:h-2.5 sm:w-2.5",
            side === "left" ? "-right-0.5 sm:-right-1" : "-left-0.5 sm:-left-1"
          )}
        />
        <div className="rounded-lg border border-violet-500/25 bg-black/50 px-2 py-1.5 backdrop-blur-xl shadow-[0_0_35px_rgba(124,58,237,0.18)] sm:rounded-xl sm:px-3 sm:py-2 lg:rounded-2xl lg:px-5 lg:py-4">
          <h4 className="text-[9px] font-bold text-white sm:text-[10px] lg:text-sm">{name}</h4>
          <p className="mt-0.5 text-[8px] text-violet-300 sm:text-[9px] lg:mt-2 lg:text-sm">
            {count}
          </p>
        </div>
      </div>
    </div>
  );
}

function Lightning({ className }: { className?: string }) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: [0, 1, 0.2, 1, 0],
        scaleX: [0.4, 1.15, 0.8, 1, 0.5],
      }}
      transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.1 }}
      className={`pointer-events-none absolute z-10 h-px w-40 bg-gradient-to-r from-transparent via-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(34,211,238,0.9)] ${className}`}
    />
  );
}
