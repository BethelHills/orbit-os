import { Globe } from "lucide-react";

import type { SettingsMeta } from "@/lib/settings-data";

type NetworkSettingsPanelProps = {
  meta: SettingsMeta;
};

export function NetworkSettingsPanel({ meta }: NetworkSettingsPanelProps) {
  return (
    <article className="rounded-[28px] border border-orbit-border bg-orbit-surface p-5 sm:p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
        Chain
      </p>
      <h2 className="mt-1 text-lg font-semibold">Network</h2>
      <p className="mt-2 text-sm text-orbit-muted">
        Production network for OrbitOS agent workflows and wallet reads.
      </p>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-cyan-500/25 bg-cyan-500/[0.06] px-4 py-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10">
          <Globe className="size-4 text-cyan-200" />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-orbit-foreground">{meta.networkName}</p>
          <p className="mt-0.5 font-mono text-sm text-cyan-200">
            Chain ID {meta.chainId}
          </p>
          <p className="mt-2 text-sm text-orbit-muted">
            Base mainnet — Zora, Aerodrome, and Aomi runtime default.
          </p>
        </div>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-2xl border border-orbit-border bg-orbit-surface-strong px-3 py-2.5">
          <dt className="text-xs text-orbit-muted">Env var</dt>
          <dd className="mt-0.5 font-mono text-xs">NEXT_PUBLIC_CHAIN_ID</dd>
        </div>
        <div className="rounded-2xl border border-orbit-border bg-orbit-surface-strong px-3 py-2.5">
          <dt className="text-xs text-orbit-muted">Fork simulation</dt>
          <dd className="mt-0.5 font-medium">Enabled via Aomi CLI</dd>
        </div>
      </dl>
    </article>
  );
}
