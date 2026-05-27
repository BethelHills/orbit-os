export type PortfolioPoint = {
  t: string;
  v: number;
};

export type PortfolioState = {
  totalValueUsd: number;
  volume24hUsd: number;
  portfolioChangePct: number;
  volumeChangePct: number;
  history: PortfolioPoint[];
  volumeHistory: PortfolioPoint[];
};

export type AssetHolding = {
  name: string;
  symbol: string;
  network: string;
  priceLabel: string;
  changeLabel: string;
  positive: boolean;
  holdings: string;
  valueLabel: string;
  spark: number[];
  accent: string;
  icon: string;
  iconBg: string;
  isPrimary: boolean;
};

export type TransactionUpdate = {
  action: "mint_coin" | "set_price_alert";
  coin: import("@/lib/zora/types").CreatorCoin;
  txHash: string;
  log: import("@/lib/zora/types").AgentLogEntry;
};
