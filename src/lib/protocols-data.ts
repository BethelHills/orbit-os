export type ProtocolStatus = "Active" | "Ready" | "Bridge" | "Preview";

export type ProtocolUniverseCard = {
  id: string;
  name: string;
  category: string;
  network: string;
  status: ProtocolStatus;
  description: string;
  actions: string[];
  agentChatPrompt: string;
  logoPath?: string;
  accent: "purple" | "cyan" | "blue" | "green" | "amber" | "violet";
};

export const PROTOCOL_UNIVERSE: ProtocolUniverseCard[] = [
  {
    id: "zora",
    name: "Zora",
    category: "Creator Economy",
    network: "Base",
    status: "Active",
    description:
      "Launch creator coins, monitor holder growth, and track buyer momentum with Aomi-guided Zora workflows.",
    actions: [
      "Launch creator coin",
      "Show trending coins",
      "Top buyers & holders",
      "Set price alert",
    ],
    agentChatPrompt:
      "What can I do with Zora on Base? Show trending creator coins and available launch actions.",
    logoPath: "/images/protocols/zora.jpg",
    accent: "purple",
  },
  {
    id: "aerodrome",
    name: "Aerodrome",
    category: "DEX / Liquidity",
    network: "Base",
    status: "Ready",
    description:
      "Track veAERO pools, emissions, and liquidity positions — ideal for LP monitoring and reward optimization.",
    actions: [
      "Pool overview",
      "Reward tracking",
      "LP rebalance hints",
      "Volume signals",
    ],
    agentChatPrompt:
      "Show Aerodrome liquidity pools and rewards I should monitor on Base.",
    logoPath: "/images/protocols/aerodrome.png",
    accent: "cyan",
  },
  {
    id: "avantis",
    name: "Avantis",
    category: "Perpetuals",
    network: "Base",
    status: "Ready",
    description:
      "Monitor perp exposure, margin health, and position risk with agent-readable summaries on Base.",
    actions: [
      "Position health",
      "Risk dashboard",
      "Funding context",
      "Liquidation buffer",
    ],
    agentChatPrompt:
      "Summarize Avantis perp positions and risk metrics I should watch on Base.",
    logoPath: "/images/protocols/avantis.png",
    accent: "blue",
  },
  {
    id: "across",
    name: "Across",
    category: "Bridge",
    network: "Ethereum ↔ Base",
    status: "Bridge",
    description:
      "Route assets between Ethereum and Base via Across with staged approve + bridge batches from Aomi.",
    actions: [
      "Bridge quote",
      "Route preview",
      "Approve + bridge batch",
      "ETA & fees",
    ],
    agentChatPrompt:
      "Bridge 1 USDC from Ethereum mainnet to Base via Across. Show required transaction steps only.",
    logoPath: "/images/protocols/across.webp",
    accent: "green",
  },
  {
    id: "stargate",
    name: "Stargate",
    category: "Bridge / Liquidity",
    network: "Multi-chain",
    status: "Bridge",
    description:
      "Cross-chain stablecoin transfers and liquidity routes — useful for treasury moves and chain arbitrage prep.",
    actions: [
      "Transfer quote",
      "Pool liquidity",
      "Cross-chain route",
      "Fee estimate",
    ],
    agentChatPrompt:
      "Show Stargate bridge routes and fees for moving USDC to Base.",
    logoPath: "/images/protocols/stargate.webp",
    accent: "amber",
  },
  {
    id: "monad",
    name: "Monad",
    category: "L1 Ecosystem",
    network: "Monad",
    status: "Preview",
    description:
      "Early EVM ecosystem for testing agent workflows, new app integrations, and high-throughput DeFi experiments.",
    actions: [
      "Ecosystem scan",
      "Testnet flows",
      "App discovery",
      "Agent dry-runs",
    ],
    agentChatPrompt:
      "What Monad ecosystem apps and test workflows can Aomi help me explore?",
    logoPath: "/images/protocols/monad.webp",
    accent: "violet",
  },
];

export const PROTOCOL_STATUS_COUNTS = PROTOCOL_UNIVERSE.reduce(
  (acc, protocol) => {
    acc[protocol.status] = (acc[protocol.status] ?? 0) + 1;
    return acc;
  },
  {} as Record<ProtocolStatus, number>,
);

export const PROTOCOL_CATEGORIES = [
  ...new Set(PROTOCOL_UNIVERSE.map((p) => p.category)),
];
