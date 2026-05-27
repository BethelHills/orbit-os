import type { AnalyticsPoint, CreatorCoin } from "@/lib/zora/types";
import type { AssetHolding, PortfolioState } from "./types";

const ETH_USD = 3200;
const OTHER_HOLDINGS_USD = 17_810.75;

export const SEED_PORTFOLIO: PortfolioState = {
  totalValueUsd: 18_450.75,
  volume24hUsd: 7892.34,
  portfolioChangePct: 16.2,
  volumeChangePct: 22.4,
  history: [
    { t: "Mon", v: 14_200 },
    { t: "Tue", v: 15_100 },
    { t: "Wed", v: 15_800 },
    { t: "Thu", v: 16_200 },
    { t: "Fri", v: 17_100 },
    { t: "Sat", v: 17_800 },
    { t: "Sun", v: 18_450.75 },
  ],
  volumeHistory: [
    { t: "Mon", v: 4200 },
    { t: "Tue", v: 5100 },
    { t: "Wed", v: 6800 },
    { t: "Thu", v: 5900 },
    { t: "Fri", v: 7200 },
    { t: "Sat", v: 8100 },
    { t: "Sun", v: 7892.34 },
  ],
};

export const STATIC_ASSETS: AssetHolding[] = [
  {
    name: "VITALIK",
    symbol: "VITALIK",
    network: "Base",
    priceLabel: "$0.042",
    changeLabel: "+12.4%",
    positive: true,
    holdings: "24,500",
    valueLabel: "$1,029",
    spark: [4, 6, 5, 8, 7, 9, 10],
    accent: "#6366f1",
    icon: "V",
    iconBg: "from-indigo-500 to-purple-600",
    isPrimary: false,
  },
  {
    name: "BASECAT",
    symbol: "BASECAT",
    network: "Base",
    priceLabel: "$0.018",
    changeLabel: "+8.7%",
    positive: true,
    holdings: "52,000",
    valueLabel: "$936",
    spark: [3, 4, 5, 4, 6, 5, 7],
    accent: "#3b82f6",
    icon: "B",
    iconBg: "from-blue-500 to-cyan-600",
    isPrimary: false,
  },
  {
    name: "AVNT",
    symbol: "AVNT",
    network: "Avantis",
    priceLabel: "$1.24",
    changeLabel: "-2.1%",
    positive: false,
    holdings: "320",
    valueLabel: "$397",
    spark: [8, 7, 6, 7, 5, 6, 5],
    accent: "#22d3ee",
    icon: "A",
    iconBg: "from-cyan-500 to-teal-600",
    isPrimary: false,
  },
];

function formatUsd(value: number) {
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function primaryCoinSpark(coin: CreatorCoin) {
  const base = Math.max(coin.holderCount, 1);
  return [
    base * 0.4,
    base * 0.55,
    base * 0.7,
    base * 0.85,
    base * 0.95,
    base * 1.05,
    base * 1.15,
  ].map((value) => Math.round(value));
}

export function buildPrimaryAsset(coin: CreatorCoin): AssetHolding {
  const priceEth = coin.initialPriceEth ?? 0.2;
  const priceUsd = priceEth * ETH_USD;
  const holdings = Math.max(coin.holderCount / 128, 0.25);
  const valueUsd = priceUsd * holdings * 10;
  const changePct =
    coin.status === "launched" || coin.status === "monitoring" ? 28.7 : 12.4;

  return {
    name: coin.name ?? "MOONJOY",
    symbol: coin.symbol ?? "MOONJO",
    network: "Zora · Base",
    priceLabel: formatUsd(priceUsd),
    changeLabel: `${changePct >= 0 ? "+" : ""}${changePct.toFixed(1)}%`,
    positive: changePct >= 0,
    holdings: holdings.toFixed(2),
    valueLabel: formatUsd(valueUsd),
    spark: primaryCoinSpark(coin),
    accent: "#a855f7",
    icon: (coin.symbol ?? "M").slice(0, 1),
    iconBg: "from-purple-500 to-violet-600",
    isPrimary: true,
  };
}

export function buildAssets(coin: CreatorCoin): AssetHolding[] {
  const primary = buildPrimaryAsset(coin);
  const staticAssets = STATIC_ASSETS.filter((asset) => !asset.isPrimary);

  if (!coin.name) {
    return [
      ...staticAssets.slice(0, 2),
      {
        ...primary,
        name: "MOONJOY",
        symbol: "MOONJO",
        priceLabel: "$0.20",
        valueLabel: "$640",
        holdings: "1.00",
        spark: [6, 8, 10, 12, 14, 13, 16],
      },
      staticAssets[2],
    ];
  }

  return [primary, ...staticAssets];
}

export function computePortfolio(coin: CreatorCoin, action: "mint_coin" | "set_price_alert") {
  const primaryAsset = buildPrimaryAsset(coin);
  const primaryValue = parseFloat(primaryAsset.valueLabel.replace(/[$,]/g, "")) || 0;
  const totalValueUsd = OTHER_HOLDINGS_USD + primaryValue;
  const volume24hUsd = coin.volume24hEth * ETH_USD;

  const portfolioChangePct =
    coin.holderCount > 0
      ? Math.min(Math.max((coin.holderCount / 42) * 8, 0), 32)
      : 0;

  const volumeChangePct =
    coin.volume24hEth > 0
      ? Math.min(Math.max(coin.volume24hEth * 2.5, 0), 48)
      : 0;

  const history = SEED_PORTFOLIO.history.map((point, index, arr) =>
    index === arr.length - 1 ? { ...point, v: totalValueUsd } : point
  );

  const volumeHistory = SEED_PORTFOLIO.volumeHistory.map((point, index, arr) =>
    index === arr.length - 1 ? { ...point, v: Math.max(volume24hUsd, 0) } : point
  );

  return {
    totalValueUsd,
    volume24hUsd,
    portfolioChangePct: action === "mint_coin" ? portfolioChangePct + 4 : portfolioChangePct,
    volumeChangePct: action === "mint_coin" ? volumeChangePct + 2 : volumeChangePct,
    history,
    volumeHistory,
  } satisfies PortfolioState;
}

export function bumpAnalytics(
  analytics: AnalyticsPoint[],
  coin: CreatorCoin,
  action: "mint_coin" | "set_price_alert"
): AnalyticsPoint[] {
  const nextValue =
    action === "mint_coin"
      ? Math.max(
          Math.round(coin.volume24hEth * 1000),
          Math.round(coin.holderCount * 48),
          6100
        )
      : Math.max(analytics[analytics.length - 1]?.value ?? 6100, 6200);

  const trimmed = analytics.filter((point) => point.time !== "Now");

  return [...trimmed, { time: "Now", value: nextValue }];
}

export function mergeCoinState(current: CreatorCoin, incoming: CreatorCoin): CreatorCoin {
  return {
    ...current,
    ...incoming,
    topBuyers: incoming.topBuyers.length ? incoming.topBuyers : current.topBuyers,
    metadata: incoming.metadata ?? current.metadata,
  };
}
