"use client";

import { useMemo } from "react";
import { useAccount } from "wagmi";
import { base } from "wagmi/chains";

import { useMounted } from "@/hooks/use-mounted";
import {
  buildMockBackendStatus,
  buildWalletStackStatus,
  getIntegrationsHubData,
  type IntegrationsHubData,
} from "@/lib/integrations-data";
import { CHAIN_ID, WALLETCONNECT_PROJECT_ID } from "@/lib/env";

/** Swap skill registry for live manifests; wallet reads stay client-side. */
export function useIntegrationsHub(): IntegrationsHubData & { loading: boolean } {
  const mounted = useMounted();
  const { address, isConnected, chainId } = useAccount();

  const chainName =
    chainId === base.id ? "Base" : chainId ? `Chain ${chainId}` : "Base";

  const data = useMemo(() => {
    const walletStack = buildWalletStackStatus({
      chainId: chainId ?? CHAIN_ID,
      chainName,
      walletConnectProjectId: WALLETCONNECT_PROJECT_ID,
      connected: mounted && isConnected,
      address,
    });

    return getIntegrationsHubData({
      walletStack,
      backend: buildMockBackendStatus(),
    });
  }, [address, chainId, chainName, isConnected, mounted]);

  return {
    ...data,
    loading: !mounted,
  };
}
