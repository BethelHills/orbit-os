export type IntegrationsDataSource = "mock" | "live";

export type IntegrationStatus = "installed" | "active" | "optional" | "pending";

export type InstalledSkill = {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: IntegrationStatus;
  version?: string;
};

export type IntegrationCard = {
  id: string;
  slug: string;
  name: string;
  description: string;
  status: IntegrationStatus;
  category: string;
  repositoryUrl?: string;
};

export type WalletStackStatus = {
  walletConnect: {
    configured: boolean;
    projectIdLabel: string;
    status: IntegrationStatus;
  };
  rainbowKit: {
    status: IntegrationStatus;
    theme: string;
  };
  wagmi: {
    status: IntegrationStatus;
    chainId: number;
    chainName: string;
    connected: boolean;
    addressLabel: string | null;
  };
};

export type BackendServiceStatus = "online" | "offline" | "degraded" | "unknown";

export type BackendStatus = {
  url: string;
  status: BackendServiceStatus;
  integrationStatus: IntegrationStatus;
  latencyMs: number | null;
  lastCheckedLabel: string;
  message: string;
};

export type OpenRouterByokStatus = {
  configured: boolean;
  status: IntegrationStatus;
  provider: string;
  message: string;
  modelHint: string | null;
};

/** Replace `getIntegrationsHubData` with live skill registry / service probes later. */
export type IntegrationsHubData = {
  meta: {
    source: IntegrationsDataSource;
    generatedAt: string;
  };
  installedSkills: InstalledSkill[];
  integrationCards: IntegrationCard[];
  walletStack: WalletStackStatus;
  backend: BackendStatus;
  openRouter: OpenRouterByokStatus;
  error: string | null;
};

export const INTEGRATIONS_DEFAULT_PROMPT =
  "What apps and tools are installed?";

export const INTEGRATION_STATUS_LABELS: Record<IntegrationStatus, string> = {
  installed: "Installed",
  active: "Active",
  optional: "Optional",
  pending: "Pending",
};

export const AOMI_BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://api.aomi.dev";

const MOCK_INSTALLED_SKILLS: InstalledSkill[] = [
  {
    id: "skill-aomi-transact",
    name: "aomi-transact",
    slug: "aomi-transact",
    description:
      "Natural-language CLI for simulate → sign flows across Base protocols.",
    status: "active",
    version: "0.10.0",
  },
  {
    id: "skill-aomi-build",
    name: "aomi-build",
    slug: "aomi-build",
    description:
      "Scaffold Aomi apps and agent-callable tools from OpenAPI and SDK specs.",
    status: "installed",
    version: "0.1.0",
  },
  {
    id: "skill-manage-aomi",
    name: "manage-aomi-skill",
    slug: "manage-aomi-skill",
    description: "Install, update, and validate Aomi skills in the workspace.",
    status: "installed",
  },
  {
    id: "skill-crypto-creator",
    name: "crypto-skill-creator",
    slug: "crypto-skill-creator",
    description: "Author new crypto agent skills with OWASP-safe manifests.",
    status: "optional",
  },
];

const MOCK_INTEGRATION_CARDS: IntegrationCard[] = [
  {
    id: "card-aomi-build",
    slug: "aomi-build",
    name: "aomi-build",
    description:
      "Scaffold new Aomi apps and plugins from API docs, OpenAPI specs, and SDK references.",
    status: "installed",
    category: "Aomi Builder",
    repositoryUrl: "https://github.com/aomi-labs/skills/tree/main/aomi-build",
  },
  {
    id: "card-aomi-transact",
    slug: "aomi-transact",
    name: "aomi-transact",
    description:
      "Build crypto agents that read and write EVM chain state with fork simulation and AA-first signing.",
    status: "active",
    category: "Aomi Runtime",
    repositoryUrl: "https://github.com/aomi-labs/skills/tree/main/aomi-transact",
  },
  {
    id: "card-coinbase-agentkit",
    slug: "coinbase-agentkit",
    name: "coinbase-agentkit",
    description:
      "Coinbase AgentKit — wallets, swaps, contract deployment, NFT minting, and LangChain adapters.",
    status: "optional",
    category: "Agent Framework",
    repositoryUrl: "https://github.com/coinbase/agentkit",
  },
  {
    id: "card-goat",
    slug: "goat",
    name: "goat",
    description:
      "GOAT toolkit — 200+ protocol integrations across 30+ chains with modular plugin architecture.",
    status: "optional",
    category: "Agent Framework",
    repositoryUrl: "https://github.com/goat-sdk/goat",
  },
  {
    id: "card-brian-api",
    slug: "brian-api",
    name: "brian-api",
    description:
      "Brian API — natural language to executable Web3 transactions across EVM chains.",
    status: "pending",
    category: "Intent API",
    repositoryUrl: "https://docs.brianknows.org/",
  },
  {
    id: "card-x402",
    slug: "x402",
    name: "x402",
    description:
      "HTTP 402 payment protocol for AI agent commerce with ERC-3009 USDC settlement.",
    status: "optional",
    category: "Payments",
    repositoryUrl: "https://github.com/coinbase/x402",
  },
  {
    id: "card-eliza",
    slug: "eliza",
    name: "eliza",
    description:
      "elizaOS multi-agent framework — character files, plugins, RAG knowledge, and onchain actions.",
    status: "pending",
    category: "Agent Framework",
    repositoryUrl: "https://github.com/elizaOS/eliza",
  },
];

export type IntegrationsHubOverrides = {
  walletStack?: Partial<WalletStackStatus>;
  backend?: Partial<BackendStatus>;
  error?: string | null;
};

function truncateAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function buildWalletStackStatus(options: {
  chainId: number;
  chainName: string;
  walletConnectProjectId: string;
  connected: boolean;
  address?: string;
}): WalletStackStatus {
  const wcConfigured = options.walletConnectProjectId.length > 8;

  return {
    walletConnect: {
      configured: wcConfigured,
      projectIdLabel: wcConfigured
        ? `${options.walletConnectProjectId.slice(0, 8)}…`
        : "Not configured",
      status: wcConfigured ? "active" : "pending",
    },
    rainbowKit: {
      status: "active",
      theme: "OrbitOS dark / light",
    },
    wagmi: {
      status: options.connected ? "active" : "installed",
      chainId: options.chainId,
      chainName: options.chainName,
      connected: options.connected,
      addressLabel: options.address
        ? truncateAddress(options.address)
        : null,
    },
  };
}

export function buildMockBackendStatus(
  overrides?: Partial<BackendStatus>,
): BackendStatus {
  return {
    url: AOMI_BACKEND_URL,
    status: "online",
    integrationStatus: "active",
    latencyMs: 142,
    lastCheckedLabel: "Just now",
    message: "Aomi runtime API reachable for Agent Chat sessions.",
    ...overrides,
  };
}

export function buildOpenRouterByokStatus(): OpenRouterByokStatus {
  return {
    configured: false,
    status: "optional",
    provider: "OpenRouter",
    message:
      "Bring your own API key to route model calls through OpenRouter. Not configured in this environment.",
    modelHint: null,
  };
}

export function getIntegrationsHubData(
  overrides: IntegrationsHubOverrides = {},
): IntegrationsHubData {
  const defaultWalletStack = buildWalletStackStatus({
    chainId: 8453,
    chainName: "Base",
    walletConnectProjectId: "b3fc880a",
    connected: false,
  });

  const walletStack: WalletStackStatus = overrides.walletStack
    ? {
        walletConnect: {
          ...defaultWalletStack.walletConnect,
          ...overrides.walletStack.walletConnect,
        },
        rainbowKit: {
          ...defaultWalletStack.rainbowKit,
          ...overrides.walletStack.rainbowKit,
        },
        wagmi: {
          ...defaultWalletStack.wagmi,
          ...overrides.walletStack.wagmi,
        },
      }
    : defaultWalletStack;

  return {
    meta: {
      source: overrides.walletStack ? "live" : "mock",
      generatedAt: new Date().toISOString(),
    },
    installedSkills: MOCK_INSTALLED_SKILLS,
    integrationCards: MOCK_INTEGRATION_CARDS,
    walletStack,
    backend: buildMockBackendStatus(overrides.backend),
    openRouter: buildOpenRouterByokStatus(),
    error: overrides.error ?? null,
  };
}
