"use client";

import { Wallet2 } from "lucide-react";
import { useAccount } from "wagmi";

import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function WalletSettingsPanel() {
  const mounted = useMounted();
  const { address, isConnected, chainId } = useAccount();

  return (
    <article className="rounded-[28px] border border-orbit-border bg-orbit-surface p-5 sm:p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
        Web3
      </p>
      <h2 className="mt-1 text-lg font-semibold">Wallet</h2>
      <p className="mt-2 text-sm text-orbit-muted">
        RainbowKit + WalletConnect connection for Agent Chat signing.
      </p>

      <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-orbit-border bg-orbit-surface-strong p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl border",
              mounted && isConnected
                ? "border-emerald-500/30 bg-emerald-500/10"
                : "border-orbit-border bg-orbit-surface",
            )}
          >
            <Wallet2
              className={cn(
                "size-4",
                mounted && isConnected ? "text-emerald-300" : "text-orbit-muted",
              )}
            />
          </span>
          <div className="min-w-0">
            <p className="font-medium text-orbit-foreground">
              {mounted && isConnected ? "Wallet connected" : "Not connected"}
            </p>
            <p className="mt-0.5 break-all font-mono text-sm text-orbit-accent">
              {mounted && address ? truncateAddress(address) : "Connect to sign txs"}
            </p>
            {mounted && chainId ? (
              <p className="mt-1 text-xs text-orbit-muted">Chain {chainId}</p>
            ) : null}
          </div>
        </div>
        <ConnectWalletButton className="shrink-0" />
      </div>

      <p className="mt-4 text-xs text-orbit-muted">
        OrbitOS never stores private keys. Signing happens in your wallet extension
        or mobile app.
      </p>
    </article>
  );
}
