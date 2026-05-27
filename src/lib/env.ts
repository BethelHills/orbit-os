import { base } from "wagmi/chains";

const DEFAULT_WALLETCONNECT_PROJECT_ID = "b3fc880a46f7ab1208f5298a06b6c8f6";

function readNonEmpty(...values: Array<string | undefined>) {
  for (const value of values) {
    if (value && value.trim().length > 0) return value.trim();
  }
  return undefined;
}

function readChainId() {
  const raw = readNonEmpty(
    process.env.NEXT_PUBLIC_CHAIN,
    process.env.NEXT_PUBLIC_CHAIN_ID,
    String(base.id)
  );

  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : base.id;
}

const DEFAULT_SITE_URL = "https://orbit-os-rho.vercel.app";

function readSiteUrl() {
  const vercelUrl = readNonEmpty(process.env.VERCEL_URL);
  return (
    readNonEmpty(process.env.NEXT_PUBLIC_SITE_URL) ??
    (vercelUrl ? `https://${vercelUrl}` : undefined) ??
    DEFAULT_SITE_URL
  );
}

function readWalletConnectProjectId() {
  return (
    readNonEmpty(
      process.env.NEXT_PUBLIC_WALLETCONNECT_ID,
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
    ) ?? DEFAULT_WALLETCONNECT_PROJECT_ID
  );
}

export const publicEnv = {
  siteUrl: readSiteUrl(),
  walletConnectProjectId: readWalletConnectProjectId(),
  chainId: readChainId(),
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction: process.env.NODE_ENV === "production",
} as const;

export const CHAIN_ID = publicEnv.chainId;
export const SITE_URL = publicEnv.siteUrl;
export const WALLETCONNECT_PROJECT_ID = publicEnv.walletConnectProjectId;
