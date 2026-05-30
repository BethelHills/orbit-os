export type TransactionsDataSource = "mock" | "live";

export type TransactionStatus =
  | "staged"
  | "simulated"
  | "signed"
  | "confirmed"
  | "failed";

export type OrbitTransaction = {
  id: string;
  action: string;
  protocol: string;
  network: string;
  hash: string | null;
  timestampLabel: string;
  gasLabel: string | null;
  status: TransactionStatus;
  errorMessage?: string;
  queueOrder?: number;
};

export type TransactionsSummary = {
  staged: number;
  simulated: number;
  signed: number;
  confirmed: number;
  failed: number;
  totalGasSpentLabel: string;
};

/** Replace `getTransactionsTimelineData` with Aomi tx list / wallet history later. */
export type TransactionsTimelineData = {
  meta: {
    source: TransactionsDataSource;
    network: string;
    generatedAt: string;
  };
  summary: TransactionsSummary;
  staged: OrbitTransaction[];
  completed: OrbitTransaction[];
  failed: OrbitTransaction[];
};

export const TRANSACTION_STATUS_LABELS: Record<TransactionStatus, string> = {
  staged: "Staged",
  simulated: "Simulated",
  signed: "Signed",
  confirmed: "Confirmed",
  failed: "Failed",
};

export const TRANSACTIONS_DEFAULT_PROMPT =
  "Show my pending Aomi transactions";

const MOCK_STAGED: OrbitTransaction[] = [
  {
    id: "tx-staged-zora-launch",
    action: "Launch MOONJOY creator coin",
    protocol: "Zora",
    network: "Base",
    hash: null,
    timestampLabel: "Queued 3 min ago",
    gasLabel: "Est. 0.00042 ETH",
    status: "staged",
    queueOrder: 1,
  },
  {
    id: "tx-staged-aero-swap",
    action: "Swap 50 USDC → AERO",
    protocol: "Aerodrome",
    network: "Base",
    hash: null,
    timestampLabel: "Queued 8 min ago",
    gasLabel: "Est. 0.00018 ETH",
    status: "simulated",
    queueOrder: 2,
  },
  {
    id: "tx-staged-bridge",
    action: "Bridge 120 USDC to Base",
    protocol: "Stargate",
    network: "Ethereum → Base",
    hash: null,
    timestampLabel: "Queued 14 min ago",
    gasLabel: "Est. 0.0011 ETH",
    status: "signed",
    queueOrder: 3,
  },
];

const MOCK_COMPLETED: OrbitTransaction[] = [
  {
    id: "tx-confirmed-zora-buy",
    action: "Buy 0.05 ETH of VITALIK",
    protocol: "Zora",
    network: "Base",
    hash: "0x8f3c91e2b4d7a6c1f0e9d8c7b6a5948372615049382716059483726150493a",
    timestampLabel: "22 min ago",
    gasLabel: "0.00031 ETH",
    status: "confirmed",
  },
  {
    id: "tx-confirmed-liquidity",
    action: "Add liquidity — MOONJOY / ETH",
    protocol: "Aerodrome",
    network: "Base",
    hash: "0x2b7d4c0219f8e7d6c5b4a3928170615049382716059483726150493827160504",
    timestampLabel: "1 hr ago",
    gasLabel: "0.00054 ETH",
    status: "confirmed",
  },
  {
    id: "tx-confirmed-across",
    action: "Bridge 80 USDC from Arbitrum",
    protocol: "Across",
    network: "Arbitrum → Base",
    hash: "0x9e417f8833a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5049382716059483726150",
    timestampLabel: "3 hr ago",
    gasLabel: "0.00089 ETH",
    status: "confirmed",
  },
  {
    id: "tx-confirmed-alert",
    action: "Register holder count alert",
    protocol: "Zora",
    network: "Base",
    hash: "0x1a6fd3b5c7e9a1b2c3d4e5f6071829304152637485960718293041526374859607",
    timestampLabel: "Yesterday",
    gasLabel: "0.00012 ETH",
    status: "confirmed",
  },
  {
    id: "tx-confirmed-avantis",
    action: "Open 2× long on ETH-USD",
    protocol: "Avantis",
    network: "Base",
    hash: "0x5c92e6104433221100aabbccddeeff0011223344556677889900aabbccddeeff00",
    timestampLabel: "2 days ago",
    gasLabel: "0.00067 ETH",
    status: "confirmed",
  },
];

const MOCK_FAILED: OrbitTransaction[] = [
  {
    id: "tx-failed-slippage",
    action: "Swap 200 USDC → MOONJOY",
    protocol: "Zora",
    network: "Base",
    hash: "0x0d4482aa9911223344556677889900aabbccddeeff11223344556677889900aabb",
    timestampLabel: "45 min ago",
    gasLabel: "0.00021 ETH",
    status: "failed",
    errorMessage: "Execution reverted: slippage tolerance exceeded",
  },
  {
    id: "tx-failed-gas",
    action: "Mint creator coin metadata update",
    protocol: "Zora",
    network: "Base",
    hash: "0x7f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a",
    timestampLabel: "6 hr ago",
    gasLabel: "0.00009 ETH",
    status: "failed",
    errorMessage: "Transaction reverted: insufficient funds for gas",
  },
];

function buildSummary(
  staged: OrbitTransaction[],
  completed: OrbitTransaction[],
  failed: OrbitTransaction[],
): TransactionsSummary {
  const all = [...staged, ...completed, ...failed];

  return {
    staged: all.filter((tx) => tx.status === "staged").length,
    simulated: all.filter((tx) => tx.status === "simulated").length,
    signed: all.filter((tx) => tx.status === "signed").length,
    confirmed: all.filter((tx) => tx.status === "confirmed").length,
    failed: all.filter((tx) => tx.status === "failed").length,
    totalGasSpentLabel: "0.00284 ETH",
  };
}

export function getTransactionsTimelineData(): TransactionsTimelineData {
  const staged = [...MOCK_STAGED].sort(
    (a, b) => (a.queueOrder ?? 0) - (b.queueOrder ?? 0),
  );
  const completed = [...MOCK_COMPLETED];
  const failed = [...MOCK_FAILED];

  return {
    meta: {
      source: "mock",
      network: "Base",
      generatedAt: new Date().toISOString(),
    },
    summary: buildSummary(staged, completed, failed),
    staged,
    completed,
    failed,
  };
}

export function hasAnyTransactions(data: TransactionsTimelineData): boolean {
  return (
    data.staged.length > 0 ||
    data.completed.length > 0 ||
    data.failed.length > 0
  );
}
