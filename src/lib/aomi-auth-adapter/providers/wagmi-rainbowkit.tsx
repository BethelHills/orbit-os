"use client";

import { useMemo, type ReactNode } from "react";
import {
  useAccountModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import type { WalletEip712Payload, WalletTxPayload } from "@aomi-labs/react";
import { toViemSignTypedDataArgs, useControl, useThreadContext } from "@aomi-labs/react";
import { getAddress } from "viem";

import { CHAIN_ID } from "@/lib/env";
import { AomiAuthAdapterProvider } from "../context";
import { AOMI_AUTH_DISCONNECTED_IDENTITY } from "../identity";
import { resolveRuntimeControlSessionId } from "../runtime-session";
import type { AomiAuthAdapter, AomiAuthIdentity } from "../types";
import {
  useSafeCapabilities,
  useSafeDisconnect,
  useSafeSendCallsSync,
  useSafeSendTransaction,
  useSafeSignTypedData,
  useSafeSwitchChain,
  useSafeWagmiAccount,
  useSafeWagmiConfig,
} from "../safe-wagmi-hooks";
import { executeAdapterTransaction, getPreferredRpcUrl } from "../wallet-execution";

function normalizeWalletAddress(
  address?: `0x${string}`,
): `0x${string}` | undefined {
  if (!address) return undefined;
  try {
    return getAddress(address);
  } catch {
    return address;
  }
}

export function AomiWagmiAuthProvider({ children }: { children: ReactNode }) {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { getControlState } = useControl();
  const { currentThreadId } = useThreadContext();
  const { address, chainId, isConnected } = useSafeWagmiAccount();
  const { switchChainAsync, isPending } = useSafeSwitchChain();
  const { sendTransactionAsync } = useSafeSendTransaction();
  const { sendCallsSyncAsync } = useSafeSendCallsSync();
  const { capabilities } = useSafeCapabilities();
  const { signTypedDataAsync } = useSafeSignTypedData();
  const { disconnectAsync } = useSafeDisconnect();
  const wagmiConfig = useSafeWagmiConfig();

  const supportedChains = wagmiConfig.chains;
  const chainsById = useMemo(
    () => Object.fromEntries(supportedChains.map((chain) => [chain.id, chain])),
    [supportedChains],
  );

  const normalizedAddress = normalizeWalletAddress(address);
  const effectiveChainId = chainId ?? CHAIN_ID;
  const runtimeSessionId = resolveRuntimeControlSessionId(
    getControlState().clientId,
    currentThreadId,
  );
  const canPublishConnectedIdentity = Boolean(
    isConnected &&
      normalizedAddress &&
      effectiveChainId &&
      runtimeSessionId,
  );

  const adapter = useMemo<AomiAuthAdapter>(() => {
    const identity: AomiAuthIdentity = canPublishConnectedIdentity
        ? {
            status: "connected",
            isConnected: true,
            address: normalizedAddress,
            walletKind: "eoa",
            aaMode: "none",
            chainId: effectiveChainId,
            authMethod: "wagmi",
          }
        : {
            ...AOMI_AUTH_DISCONNECTED_IDENTITY,
            chainId: effectiveChainId,
          };

    return {
      identity,
      isReady: true,
      isSwitchingChain: isPending,
      canConnect: Boolean(openConnectModal) && !isConnected,
      canOpenAccountUI: Boolean(openAccountModal) && isConnected,
      canDisconnect: Boolean(disconnectAsync) && isConnected,
      supportedChains,
      connect: async () => {
        openConnectModal?.();
      },
      openAccountUI: async () => {
        openAccountModal?.();
      },
      disconnect: disconnectAsync
        ? async () => {
            await disconnectAsync();
          }
        : undefined,
      switchChain: switchChainAsync
        ? async (nextChainId: number) => {
            await switchChainAsync({ chainId: nextChainId });
          }
        : undefined,
      sendTransaction: sendTransactionAsync
        ? async (payload: WalletTxPayload) =>
            executeAdapterTransaction({
              payload,
              state: {
                currentChainId: effectiveChainId,
                capabilities,
                sendCallsSyncAsync,
                sendTransactionAsync,
                switchChainAsync,
                chainsById,
                getPreferredRpcUrl,
              },
            })
        : undefined,
      signTypedData: signTypedDataAsync
        ? async (payload: WalletEip712Payload) => {
            const signArgs = toViemSignTypedDataArgs(payload);
            if (!signArgs) {
              throw new Error("Missing typed_data payload");
            }
            const signature = await signTypedDataAsync(signArgs as never);
            return { signature };
          }
        : undefined,
    };
  }, [
    canPublishConnectedIdentity,
    capabilities,
    chainId,
    chainsById,
    disconnectAsync,
    effectiveChainId,
    isConnected,
    isPending,
    normalizedAddress,
    openAccountModal,
    openConnectModal,
    sendCallsSyncAsync,
    sendTransactionAsync,
    signTypedDataAsync,
    supportedChains,
    switchChainAsync,
  ]);

  return (
    <AomiAuthAdapterProvider value={adapter}>{children}</AomiAuthAdapterProvider>
  );
}
