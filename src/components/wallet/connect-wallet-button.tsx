"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

interface ConnectWalletButtonProps {
  className?: string;
  compact?: boolean;
}

function ConnectWalletPlaceholder({
  className,
  compact = false,
}: ConnectWalletButtonProps) {
  return (
    <div
      className={cn(
        "h-9 w-24 animate-pulse rounded-xl bg-white/10",
        compact && "h-8 w-20",
        className
      )}
    />
  );
}

export function ConnectWalletButton({
  className,
  compact = false,
}: ConnectWalletButtonProps) {
  const mounted = useMounted();

  if (!mounted) {
    return <ConnectWalletPlaceholder className={className} compact={compact} />;
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted: walletReady,
      }) => {
        const connected = walletReady && account && chain;

        if (!walletReady) {
          return <ConnectWalletPlaceholder className={className} compact={compact} />;
        }

        if (!connected) {
          return (
            <button
              type="button"
              onClick={openConnectModal}
              className={cn(
                "rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.45)] transition hover:brightness-110",
                compact
                  ? "px-3 py-2 text-[11px]"
                  : "px-4 py-2.5 text-xs sm:text-sm",
                className
              )}
            >
              {compact ? "Connect" : "Connect Wallet"}
            </button>
          );
        }

        if (chain.unsupported) {
          return (
            <button
              type="button"
              onClick={openChainModal}
              className={cn(
                "rounded-xl bg-red-500/20 px-3 py-2 text-xs font-semibold text-red-300 ring-1 ring-red-500/40",
                className
              )}
            >
              Wrong network
            </button>
          );
        }

        return (
          <div className={cn("flex items-center gap-1.5", className)}>
            <button
              type="button"
              onClick={openChainModal}
              className="glass flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs text-white sm:gap-2 sm:px-3"
            >
              {chain.hasIcon && chain.iconUrl && (
                <img
                  alt={chain.name ?? "Chain"}
                  src={chain.iconUrl}
                  className="h-4 w-4 rounded-full"
                />
              )}
              <span className="hidden sm:inline">{chain.name}</span>
            </button>

            <button
              type="button"
              onClick={openAccountModal}
              className={cn(
                "rounded-xl bg-gradient-to-r from-purple-600/90 to-blue-600/90 font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition hover:brightness-110",
                compact ? "px-3 py-2 text-[11px]" : "px-4 py-2.5 text-xs"
              )}
            >
              {account.displayName}
              {account.displayBalance ? ` · ${account.displayBalance}` : ""}
            </button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
