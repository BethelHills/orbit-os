import { Link2, Palette, Wallet2 } from "lucide-react";

import { IntegrationStatusBadge } from "@/components/integrations/integration-status-badge";
import type { WalletStackStatus } from "@/lib/integrations-data";

type WalletStackStatusPanelProps = {
  stack: WalletStackStatus;
};

export function WalletStackStatusPanel({ stack }: WalletStackStatusPanelProps) {
  const rows = [
    {
      key: "walletconnect",
      icon: Link2,
      label: "WalletConnect",
      detail: stack.walletConnect.configured
        ? `Project ${stack.walletConnect.projectIdLabel}`
        : "Project ID missing",
      status: stack.walletConnect.status,
    },
    {
      key: "rainbowkit",
      icon: Palette,
      label: "RainbowKit",
      detail: stack.rainbowKit.theme,
      status: stack.rainbowKit.status,
    },
    {
      key: "wagmi",
      icon: Wallet2,
      label: "wagmi",
      detail: stack.wagmi.connected
        ? `${stack.wagmi.addressLabel} · ${stack.wagmi.chainName}`
        : `${stack.wagmi.chainName} (chain ${stack.wagmi.chainId}) · not connected`,
      status: stack.wagmi.status,
    },
  ] as const;

  return (
    <article className="relative overflow-hidden rounded-[28px] border border-orbit-border bg-orbit-surface p-5 sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl"
      />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
          Web3 stack
        </p>
        <h2 className="mt-1 text-lg font-semibold">WalletConnect · RainbowKit · wagmi</h2>
        <p className="mt-2 text-sm text-orbit-muted">
          Connection layer for Agent Chat signing and OrbitOS wallet reads.
        </p>
      </div>

      <ul className="relative mt-5 space-y-3">
        {rows.map((row) => (
          <li
            key={row.key}
            className="flex min-w-0 items-start justify-between gap-3 rounded-2xl border border-orbit-border bg-orbit-surface-strong px-4 py-3"
          >
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-orbit-border bg-orbit-surface">
                <row.icon className="size-4 text-orbit-accent" />
              </span>
              <div className="min-w-0">
                <p className="font-medium text-orbit-foreground">{row.label}</p>
                <p className="mt-0.5 break-words text-sm text-orbit-muted">
                  {row.detail}
                </p>
              </div>
            </div>
            <IntegrationStatusBadge status={row.status} />
          </li>
        ))}
      </ul>
    </article>
  );
}
