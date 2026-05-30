import { portfolioAssets } from "@/lib/orbitos-data";

export type PortfolioRiskLevel = "Low" | "Medium" | "High";

export type PortfolioHoldingRow = {
  id: string;
  symbol: string;
  name: string;
  protocol: string;
  balance: string;
  priceLabel: string;
  changeLabel: string;
  valueLabel: string;
  changePositive: boolean;
};

export type PortfolioSnapshot = {
  source: "live" | "mock";
  isConnected: boolean;
  onBase: boolean;
  address: string | null;
  addressShort: string | null;
  network: string;
  totalValueUsd: number;
  totalValueLabel: string;
  ethBalance: number;
  ethBalanceLabel: string;
  ethValueUsd: number;
  usdcBalance: number;
  usdcBalanceLabel: string;
  usdcValueUsd: number;
  holdings: PortfolioHoldingRow[];
  hasAssets: boolean;
  riskLevel: PortfolioRiskLevel;
  riskScore: number;
  riskNotes: string[];
  recommendations: string[];
};

const ETH_USD = 3200;
export const BASE_USDC_ADDRESS =
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const;

const MOCK_WALLET = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value);
}

function formatEth(value: number) {
  if (value === 0) return "0 ETH";
  if (value < 0.0001) return "<0.0001 ETH";
  return `${value.toFixed(value >= 1 ? 4 : 6)} ETH`;
}

function formatUsdc(value: number) {
  if (value === 0) return "0 USDC";
  return `${value.toLocaleString("en-US", { maximumFractionDigits: 2 })} USDC`;
}

function parseChange(change: string) {
  const positive = !change.startsWith("-");
  return { changeLabel: change, changePositive: positive };
}

function mockHoldingsFromOrbitData(): PortfolioHoldingRow[] {
  return portfolioAssets.map((asset, index) => {
    const { changeLabel, changePositive } = parseChange(asset.change);
    return {
      id: `mock-${index}`,
      symbol: asset.asset,
      name: asset.asset,
      protocol: asset.protocol,
      balance: "—",
      priceLabel: asset.price,
      changeLabel,
      valueLabel: asset.value,
      changePositive,
    };
  });
}

function deriveRisk(holdings: PortfolioHoldingRow[], totalUsd: number): {
  riskLevel: PortfolioRiskLevel;
  riskScore: number;
  riskNotes: string[];
} {
  if (totalUsd <= 0 || holdings.length === 0) {
    return {
      riskLevel: "Low",
      riskScore: 18,
      riskNotes: [
        "No on-chain positions detected — capital deployment risk is minimal.",
        "Connect a wallet or fund Base to begin protocol exposure tracking.",
      ],
    };
  }

  const zoraWeight =
    holdings.filter((h) => h.protocol === "Zora").length / holdings.length;
  const negativeCount = holdings.filter((h) => !h.changePositive).length;

  let riskScore = 42;
  if (zoraWeight >= 0.5) riskScore += 18;
  if (negativeCount >= 2) riskScore += 12;
  if (holdings.length >= 4) riskScore += 8;

  riskScore = Math.min(92, Math.max(20, riskScore));

  const riskLevel: PortfolioRiskLevel =
    riskScore >= 70 ? "High" : riskScore >= 45 ? "Medium" : "Low";

  return {
    riskLevel,
    riskScore,
    riskNotes: [
      zoraWeight >= 0.5
        ? "Creator coin exposure is concentrated in Zora — monitor holder churn and liquidity."
        : "Holdings are diversified across Base protocols with moderate concentration.",
      negativeCount > 0
        ? `${negativeCount} position(s) are down 24h — review exit liquidity before adding size.`
        : "Recent 24h momentum is positive across tracked holdings.",
      "Keep gas buffer on Base for Aomi-staged transactions and alert automations.",
    ],
  };
}

function buildRecommendations(
  snapshot: Pick<
    PortfolioSnapshot,
    "isConnected" | "hasAssets" | "holdings" | "ethBalance" | "usdcBalance"
  >,
): string[] {
  if (!snapshot.isConnected) {
    return [
      "Connect your Base wallet to sync live ETH and USDC balances.",
      "Use Agent Chat to pull a full wallet breakdown across Zora and DeFi positions.",
      "Start with read-only actions on Trade / Actions before staging any launch.",
    ];
  }

  if (!snapshot.hasAssets) {
    return [
      "Fund your wallet with a small ETH buffer on Base for gas and Aomi transaction staging.",
      "Ask Agent Chat to scan trending Zora creator coins before your first launch.",
      "Set a price alert after deploying a creator coin to track early buyer momentum.",
    ];
  }

  const zoraHoldings = snapshot.holdings.filter((h) => h.protocol === "Zora");
  return [
    zoraHoldings.length > 0
      ? `Review top buyers for ${zoraHoldings[0]?.symbol ?? "your Zora coin"} to spot concentrated wallets.`
      : "Consider a small Zora creator coin allocation aligned with your Base thesis.",
    snapshot.usdcBalance < 50
      ? "USDC balance is light — keep stablecoin liquidity for fees and alert automations."
      : "Stablecoin buffer looks healthy for staged writes and protocol fees.",
    "Run a wallet balance check in Agent Chat before preparing any new launch.",
  ];
}

function buildSnapshot(
  partial: Omit<
    PortfolioSnapshot,
    "riskLevel" | "riskScore" | "riskNotes" | "recommendations"
  >,
): PortfolioSnapshot {
  const { riskLevel, riskScore, riskNotes } = deriveRisk(
    partial.holdings,
    partial.totalValueUsd,
  );
  return {
    ...partial,
    riskLevel,
    riskScore,
    riskNotes,
    recommendations: buildRecommendations(partial),
  };
}

export function buildMockPortfolioSnapshot(
  connected = false,
): PortfolioSnapshot {
  const holdings = mockHoldingsFromOrbitData();
  const ethBalance = 1.284;
  const usdcBalance = 420.5;
  const ethValueUsd = ethBalance * ETH_USD;
  const usdcValueUsd = usdcBalance;
  const holdingsValueUsd = 4462;
  const totalValueUsd = ethValueUsd + usdcValueUsd + holdingsValueUsd;

  return buildSnapshot({
    source: "mock",
    isConnected: connected,
    onBase: true,
    address: connected ? MOCK_WALLET : null,
    addressShort: connected ? truncateAddress(MOCK_WALLET) : null,
    network: "Base",
    totalValueUsd,
    totalValueLabel: formatUsd(totalValueUsd),
    ethBalance,
    ethBalanceLabel: formatEth(ethBalance),
    ethValueUsd,
    usdcBalance,
    usdcBalanceLabel: formatUsdc(usdcBalance),
    usdcValueUsd,
    holdings,
    hasAssets: true,
  });
}

export function computePortfolioFromLive(input: {
  address: string;
  onBase: boolean;
  ethBalanceWei?: bigint;
  usdcBalanceRaw?: bigint;
  usdcDecimals?: number;
}): PortfolioSnapshot {
  const ethBalance =
    input.ethBalanceWei !== undefined
      ? Number(input.ethBalanceWei) / 1e18
      : 0;
  const usdcDecimals = input.usdcDecimals ?? 6;
  const usdcBalance =
    input.usdcBalanceRaw !== undefined
      ? Number(input.usdcBalanceRaw) / 10 ** usdcDecimals
      : 0;

  const ethValueUsd = ethBalance * ETH_USD;
  const usdcValueUsd = usdcBalance;
  const totalValueUsd = ethValueUsd + usdcValueUsd;
  const hasAssets = ethBalance >= 0.000_01 || usdcBalance >= 0.01;

  return buildSnapshot({
    source: "live",
    isConnected: true,
    onBase: input.onBase,
    address: input.address,
    addressShort: truncateAddress(input.address),
    network: input.onBase ? "Base" : "Wrong network",
    totalValueUsd,
    totalValueLabel: formatUsd(totalValueUsd),
    ethBalance,
    ethBalanceLabel: formatEth(ethBalance),
    ethValueUsd,
    usdcBalance,
    usdcBalanceLabel: formatUsdc(usdcBalance),
    usdcValueUsd,
    holdings: [],
    hasAssets,
  });
}

export { formatUsd, truncateAddress };
