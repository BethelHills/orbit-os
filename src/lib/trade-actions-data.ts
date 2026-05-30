export type TradeActionRisk = "Low" | "Medium" | "High";

export type TradeActionCard = {
  id: string;
  title: string;
  description: string;
  protocol: string;
  risk: TradeActionRisk;
  prompt: string;
  ctaLabel?: string;
};

export const TRADE_ACTION_CARDS: TradeActionCard[] = [
  {
    id: "zora-trending",
    title: "Show trending Zora coins",
    description:
      "Discover recently created creator coins on Zora with volume, market cap, and creator handles.",
    protocol: "Zora",
    risk: "Low",
    prompt: "Show trending creator coins on Zora on Base.",
    ctaLabel: "Explore trending",
  },
  {
    id: "wallet-balance",
    title: "Check wallet balance",
    description:
      "Review ETH and token balances, positions, and spendable funds on Base before taking action.",
    protocol: "Wallet",
    risk: "Low",
    prompt: "Show my wallet balances and positions on Base.",
    ctaLabel: "Check balance",
  },
  {
    id: "zora-launch-prep",
    title: "Prepare Zora coin launch",
    description:
      "Stage a creator coin launch plan with factory calls, ticker checks, and transaction steps — no execution.",
    protocol: "Zora",
    risk: "High",
    prompt:
      "Prepare but do not execute a Zora creator coin launch called ORBITTEST with ticker ORBT on Base. Show required transaction steps only.",
    ctaLabel: "Prepare launch",
  },
  {
    id: "base-protocols",
    title: "Show protocols on Base",
    description:
      "List Aomi-enabled apps and DeFi protocols available for agent-driven actions on Base.",
    protocol: "Base",
    risk: "Low",
    prompt: "Show protocols and apps available on Base for on-chain actions.",
    ctaLabel: "Browse protocols",
  },
  {
    id: "price-alert",
    title: "Set price alert",
    description:
      "Configure a threshold alert for a Zora creator coin price move on Base.",
    protocol: "Zora",
    risk: "Medium",
    prompt:
      "Set a price alert for my Zora creator coin at 0.5 ETH on Base.",
    ctaLabel: "Set alert",
  },
  {
    id: "top-buyers",
    title: "Show top buyers",
    description:
      "Inspect recent buyers, holder distribution, and trading activity for a Zora creator coin.",
    protocol: "Zora",
    risk: "Low",
    prompt:
      "Show top buyers and holder activity for my Zora creator coin on Base.",
    ctaLabel: "View buyers",
  },
];
