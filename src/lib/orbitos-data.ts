export type OrbitFeatureItem = {
  title: string;
  description: string;
  status: string;
  network: string;
};

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
