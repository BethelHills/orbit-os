"use client";

import { ProtocolCard } from "@/components/protocols/protocol-card";
import {
  StandalonePageHeader,
  StandalonePageShell,
} from "@/components/layout/standalone-page";
import {
  PROTOCOL_CATEGORIES,
  PROTOCOL_STATUS_COUNTS,
  PROTOCOL_UNIVERSE,
} from "@/lib/protocols-data";

export function ProtocolsWorkspace() {
  return (
    <StandalonePageShell>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-28 top-0 h-72 w-72 rounded-full bg-purple-600/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl"
        />

        <StandalonePageHeader
          title="Protocol Universe"
          subtitle="Explore Base-native and cross-chain protocols wired into OrbitOS and Aomi — launch coins, provide liquidity, bridge assets, and monitor risk from one command surface."
        />

        <div className="relative mb-8 flex flex-wrap gap-2 sm:mb-10">
          {Object.entries(PROTOCOL_STATUS_COUNTS).map(([status, count]) => (
            <span
              key={status}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-orbit-muted"
            >
              {count} {status.toLowerCase()}
            </span>
          ))}
          <span className="rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1 text-xs text-purple-200">
            {PROTOCOL_CATEGORIES.length} categories
          </span>
        </div>

        <div className="relative grid min-w-0 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
          {PROTOCOL_UNIVERSE.map((protocol) => (
            <ProtocolCard key={protocol.id} protocol={protocol} />
          ))}
        </div>
      </div>
    </StandalonePageShell>
  );
}
