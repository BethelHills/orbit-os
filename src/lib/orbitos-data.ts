export type OrbitFeatureItem = {
  title: string;
  description: string;
  status: string;
  network: string;
};

export type TransactionTimelineRow = {
  hash: string;
  title: string;
  time: string;
};

export type PortfolioAssetRow = {
  asset: string;
  protocol: string;
  price: string;
  change: string;
  value: string;
};

export const transactions: TransactionTimelineRow[] = [
  {
    title: "MOONJOY coin launched on Zora",
    time: "2 minutes ago",
    hash: "0x8f3c…a91e",
  },
  {
    title: "Pool funded with 0.05 ETH liquidity",
    time: "18 minutes ago",
    hash: "0x2b7d…4c02",
  },
  {
    title: "Price alert set at +15% threshold",
    time: "1 hour ago",
    hash: "0x9e41…7f88",
  },
  {
    title: "Holder analytics snapshot pulled",
    time: "3 hours ago",
    hash: "0x1a6f…d3b5",
  },
  {
    title: "Metadata updated — cover image refreshed",
    time: "Yesterday",
    hash: "0x5c92…e610",
  },
  {
    title: "Wallet connected to OrbitOS on Base",
    time: "2 days ago",
    hash: "0x0d44…82aa",
  },
];

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

export const analyticsSignals = [
  "MOONJOY holder growth accelerated 17.3% in the last 24 hours on Base.",
  "Aomi detected increased buy pressure from repeat wallets after the latest launch.",
  "24h volume is trending above the 7-day average with stronger late-session activity.",
  "Top buyers are concentrating around sub-0.01 ETH entries — watch for breakout volume.",
];

export const protocols: OrbitFeatureItem[] = [
  {
    title: "Zora",
    description: "Creator coins on Base — launch, monitor holders, and track buyers.",
    status: "Active",
    network: "Base",
  },
  {
    title: "Aerodrome",
    description: "Liquidity and veAERO — track pools, rewards, and rebalancing.",
    status: "Ready",
    network: "Base",
  },
  {
    title: "Avantis",
    description: "Perpetuals on Base — monitor risk, positions, and margin health.",
    status: "Ready",
    network: "Base",
  },
  {
    title: "Limitless",
    description: "Prediction markets — surface odds and agent-detected momentum shifts.",
    status: "Ready",
    network: "Base",
  },
  {
    title: "Monad",
    description: "Early EVM ecosystem — test agent workflows on upcoming chain.",
    status: "Bonus",
    network: "Monad",
  },
];

export const alerts: OrbitFeatureItem[] = [
  {
    title: "Holder Growth",
    description: "Notify when unique holders cross a threshold or spike within a time window.",
    status: "Active",
    network: "Base",
  },
  {
    title: "Price Move",
    description: "Alert on percentage moves above or below your target for a creator coin.",
    status: "Ready",
    network: "Base",
  },
  {
    title: "Whale Activity",
    description: "Detect large buys or sells from tracked wallets and repeat buyers.",
    status: "Ready",
    network: "Base",
  },
  {
    title: "Volume Spike",
    description: "Trigger when 24h volume exceeds rolling averages or session baselines.",
    status: "Ready",
    network: "Base",
  },
  {
    title: "Protocol Change",
    description: "Surface pool updates, reward shifts, and integration status on connected protocols.",
    status: "Simulate",
    network: "Base",
  },
  {
    title: "Launch Monitor",
    description: "Watch new Zora coin launches and flag early momentum from agent signals.",
    status: "Ready",
    network: "Base",
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

export const integrations: OrbitFeatureItem[] = [
  {
    title: "aomi-transact",
    description: "Natural-language CLI for simulate → sign flows across Base protocols.",
    status: "Connected",
    network: "Aomi",
  },
  {
    title: "aomi-build",
    description: "Scaffold new Aomi apps and agent-callable tools from API specs.",
    status: "Connected",
    network: "Aomi",
  },
  {
    title: "Zora Toolkit",
    description: "Launch coins, update metadata, and pull holder analytics on Base.",
    status: "Active",
    network: "Base",
  },
  {
    title: "RainbowKit + WalletConnect",
    description: "Wallet connection, signing, and staged transaction submission.",
    status: "Connected",
    network: "Web3",
  },
  {
    title: "Base RPC",
    description: "On-chain reads, fork simulation, and calldata execution on chain 8453.",
    status: "Active",
    network: "Base",
  },
  {
    title: "Protocol Skills Pack",
    description: "Aerodrome, Avantis, and Limitless agent skills for expanded workflows.",
    status: "Coming soon",
    network: "Base",
  },
];

export const settingsItems: OrbitFeatureItem[] = [
  {
    title: "Transaction Safety",
    description: "Require simulate → review → confirm before any protected on-chain action.",
    status: "Enabled",
    network: "Safety",
  },
  {
    title: "Wallet Behavior",
    description: "Control default signing prompts, address display, and connection persistence.",
    status: "Configured",
    network: "Web3",
  },
  {
    title: "Agent Mode",
    description: "Choose read-only analytics vs. full write access for Aomi agent workflows.",
    status: "Write",
    network: "Aomi",
  },
  {
    title: "Network",
    description: "Base mainnet (8453) for production; fork simulation before execution.",
    status: "Base",
    network: "Chain",
  },
  {
    title: "UI Preferences",
    description: "Theme, compact layout, and dashboard metric refresh behavior.",
    status: "Default",
    network: "UI",
  },
  {
    title: "Notifications",
    description: "Alert delivery for price moves, holder spikes, and transaction outcomes.",
    status: "Ready",
    network: "Alerts",
  },
];

export type OrbitNotification = {
  id: string;
  title: string;
  message: string;
  time: string;
  kind: "alert" | "tx" | "agent" | "system";
  read: boolean;
  href?: string;
};

export const notifications: OrbitNotification[] = [
  {
    id: "n1",
    title: "Holder spike detected",
    message: "MOONJOY holders grew 17.3% in the last 24 hours on Base.",
    time: "2m ago",
    kind: "alert",
    read: false,
    href: "/alerts",
  },
  {
    id: "n2",
    title: "Transaction confirmed",
    message: "Pool funded with 0.05 ETH liquidity on Zora.",
    time: "18m ago",
    kind: "tx",
    read: false,
    href: "/transactions",
  },
  {
    id: "n3",
    title: "Aomi simulation passed",
    message: "Price alert setup is ready for wallet review and signing.",
    time: "1h ago",
    kind: "agent",
    read: false,
    href: "/agent-chat",
  },
  {
    id: "n4",
    title: "Volume above average",
    message: "24h volume is trending above the 7-day baseline.",
    time: "3h ago",
    kind: "alert",
    read: true,
    href: "/analytics",
  },
  {
    id: "n5",
    title: "Wallet connected",
    message: "OrbitOS linked to your Base wallet successfully.",
    time: "Yesterday",
    kind: "system",
    read: true,
  },
];
