export type OrbitFeatureItem = {
  title: string;
  description: string;
  status: string;
  network: string;
};

export type PortfolioAssetRow = {
  asset: string;
  protocol: string;
  price: string;
  change: string;
  value: string;
};

export const portfolioAssets: PortfolioAssetRow[] = [
  {
    asset: "MOONJOY",
    protocol: "Zora",
    price: "$640",
    change: "+28.7%",
    value: "$2,100",
  },
  {
    asset: "VITALIK",
    protocol: "Base",
    price: "$0.042",
    change: "+12.4%",
    value: "$1,029",
  },
  {
    asset: "BASECAT",
    protocol: "Base",
    price: "$0.018",
    change: "+8.7%",
    value: "$936",
  },
  {
    asset: "AVNT",
    protocol: "Avantis",
    price: "$1.24",
    change: "-2.1%",
    value: "$397",
  },
];

export const actions: OrbitFeatureItem[] = [
  {
    title: "Launch Coin",
    description: "Deploy a Zora creator coin on Base with Aomi-guided setup.",
    status: "Ready",
    network: "Base",
  },
  {
    title: "Set Pricing",
    description: "Configure initial coin price and liquidity parameters.",
    status: "Simulate",
    network: "Base",
  },
  {
    title: "Fund Pool",
    description: "Seed the creator coin pool with initial ETH liquidity.",
    status: "Review",
    network: "Base",
  },
  {
    title: "Update Metadata",
    description: "Refresh coin name, description, and cover image.",
    status: "Ready",
    network: "Base",
  },
  {
    title: "Holder Analytics",
    description: "Pull holder count, volume, and top buyer activity.",
    status: "Read-only",
    network: "Base",
  },
  {
    title: "Price Alert",
    description: "Set threshold alerts for coin price movement.",
    status: "Ready",
    network: "Base",
  },
];
