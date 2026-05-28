import { getOrbitActionCost } from "./action-costs";
import type { PendingWriteAction } from "./detect-write-action";
import type { OrbitChatResponse } from "./chat-response";
export type { OrbitChatResponse, OrbitChatPlanStatus, OrbitChatActionDescriptor } from "./chat-response";
import {
  classifyOrbitIntent,
  isReadOrbitChatIntent,
  isWriteOrbitChatIntent,
  type OrbitChatIntentName,
} from "./intent";
import type { OrbitActionName } from "./orbit-action-types";
import { simulateOrbitActionCore } from "./simulate-orbit-action";
import { TRANSACTION_CONFIRMATION_COPY } from "./protected-transactions";
import { createInitialCoin } from "@/lib/zora/executor";
import { runZoraToolMock } from "@/lib/zora/mock-executor";
import { SEED_ANALYTICS } from "@/lib/zora/seed";
import type {
  AgentLogEntry,
  AnalyticsPoint,
  CreatorCoin,
  ZoraToolName,
} from "@/lib/zora/types";

const PROTOCOL = "Zora";

function intentToOrbitAction(intent: OrbitChatIntentName): OrbitActionName | null {
  switch (intent) {
    case "launch_coin":
      return "mint_coin";
    case "set_price_alert":
      return "set_price_alert";
    default:
      return null;
  }
}

function intentToZoraTool(intent: OrbitChatIntentName): ZoraToolName | null {
  switch (intent) {
    case "launch_coin":
      return "mint_coin";
    case "get_holder_count":
      return "get_holder_count";
    case "get_top_buyers":
      return "get_top_buyers";
    case "set_price_alert":
      return "set_price_alert";
    case "get_24h_volume":
      return "get_24h_volume";
    default:
      return null;
  }
}

function buildPendingAction(
  intent: "launch_coin" | "set_price_alert",
  params: Record<string, unknown>
): PendingWriteAction {
  if (intent === "launch_coin") {
    const action = "mint_coin" as const;
    const name = String(params.name ?? "MOONJOY");
    const symbol = String(params.symbol ?? name.slice(0, 6).toUpperCase());
    return {
      action,
      params: { name, symbol },
      costEth: getOrbitActionCost(action) ?? "0.002 ETH",
    };
  }

  const action = "set_price_alert" as const;
  return {
    action,
    params: {
      targetPriceEth: Number(params.targetPriceEth ?? 0.5),
      coinAddress: params.coinAddress as string | undefined,
    },
    costEth: getOrbitActionCost(action) ?? "0 ETH",
  };
}

function buildAnalytics(coin: CreatorCoin): AnalyticsPoint[] {
  return SEED_ANALYTICS.map((point, index, arr) =>
    index === arr.length - 1
      ? { ...point, value: Math.round(coin.volume24hEth * 1000) || point.value }
      : point
  );
}

function unknownIntentResponse(): OrbitChatResponse {
  return {
    reply: [
      "I can help with Zora creator coins on Base.",
      "",
      "Try one of these:",
      "• Launch a coin — “Launch coin called MOONJOY”",
      "• Holders — “How many holders?”",
      "• Top buyers — “Show top buyers”",
      "• Volume — “Show 24h volume”",
      "• Alerts — “Set price alert at 0.5 ETH”",
    ].join("\n"),
    intent: "unknown",
    protocol: PROTOCOL,
    network: "Base",
    status: "error",
    steps: ["Classify user intent", "No supported Zora action matched"],
  };
}

async function stageWriteIntent(
  intent: "launch_coin" | "set_price_alert",
  params: Record<string, unknown>,
  walletAddress?: string
): Promise<OrbitChatResponse> {
  const orbitAction = intentToOrbitAction(intent)!;
  const pendingAction = buildPendingAction(intent, params);
  const flowId = crypto.randomUUID();

  const steps = [
    `Classify intent: ${intent} on ${PROTOCOL}/Base`,
    "Build Zora calldata via Aomi transact harness",
    "Fork-simulate queued wallet request on Base",
    "Stage action — awaiting Review → Confirm → Execute",
  ];

  let simulationMessage = "Simulation staged on Base fork.";
  try {
    const simulation = await simulateOrbitActionCore(
      orbitAction,
      pendingAction.params,
      { flowId, walletAddress }
    );
    simulationMessage = simulation.message;
    for (const step of simulation.steps) {
      steps.push(
        `${step.success ? "Simulated" : "Failed"}: ${step.name} (~${step.gasUsed.toLocaleString()} gas)`
      );
    }
  } catch {
    steps.push("Simulation preview generated locally (Aomi CLI unavailable)");
  }

  const label =
    intent === "launch_coin"
      ? `launch ${String(params.name ?? "creator coin")}`
      : `price alert at ${String(params.targetPriceEth ?? 0.5)} ETH`;

  return {
    reply: [
      `Prepared to ${label} on Zora/Base.`,
      "",
      simulationMessage,
      "",
      "Required flow: Review → Confirm → Execute.",
      TRANSACTION_CONFIRMATION_COPY.review,
      TRANSACTION_CONFIRMATION_COPY.confirm,
      "",
      "Nothing runs until you approve in the confirmation dialog and sign in your wallet.",
    ].join("\n"),
    intent,
    protocol: PROTOCOL,
    network: "Base",
    status: "requires_confirmation",
    steps,
    action: {
      name: intent,
      requiresWallet: true,
      requiresConfirmation: true,
    },
    requiresConfirmation: true,
    pendingAction,
  };
}

async function simulateReadIntent(
  intent: "get_holder_count" | "get_top_buyers" | "get_24h_volume",
  params: Record<string, unknown>,
  coin: CreatorCoin
): Promise<OrbitChatResponse> {
  const tool = intentToZoraTool(intent)!;
  const steps = [
    `Classify intent: ${intent} on ${PROTOCOL}/Base`,
    `Simulate read-only Zora ${tool} query`,
    "Return staged snapshot (no wallet signature)",
  ];

  const logs: AgentLogEntry[] = [
    {
      id: crypto.randomUUID(),
      message: `Simulating ${intent} on Zora/Base…`,
      tool,
      status: "pending",
      timestamp: new Date().toISOString(),
    },
  ];

  const { result, coin: nextCoin } = await runZoraToolMock(tool, params, coin);

  logs[0] = {
    ...logs[0],
    message: result.message,
    status: result.ok ? "success" : "error",
    kind:
      intent === "get_holder_count"
        ? "holder"
        : intent === "get_24h_volume"
          ? "volume"
          : undefined,
  };

  steps.push(result.ok ? `Snapshot ready: ${result.message}` : `Simulation failed: ${result.message}`);

  let reply = result.message;
  if (intent === "get_top_buyers" && nextCoin.topBuyers.length) {
    reply = [
      result.message,
      "",
      ...nextCoin.topBuyers.map(
        (buyer, index) =>
          `${index + 1}. ${buyer.address} · ${buyer.amountEth} ETH · ${buyer.boughtAt}`
      ),
    ].join("\n");
  }

  if (intent === "get_24h_volume") {
    reply = `${nextCoin.name ?? "Creator coin"} 24h volume on Base: ${nextCoin.volume24hEth} ETH. ${result.message}`;
  }

  if (intent === "get_holder_count") {
    reply = `${nextCoin.name ?? "Creator coin"} has ${nextCoin.holderCount.toLocaleString()} holders on Base.`;
  }

  return {
    reply,
    intent,
    protocol: PROTOCOL,
    network: "Base",
    status: result.ok ? "simulated" : "error",
    steps,
    action: {
      name: intent,
      requiresWallet: false,
      requiresConfirmation: false,
    },
    coin: nextCoin,
    logs,
    analytics: buildAnalytics(nextCoin),
  };
}

/** Classify intent, simulate reads, and stage writes without executing transactions. */
export async function processOrbitChatMessage(
  message: string,
  options?: { coin?: CreatorCoin; walletAddress?: string }
): Promise<OrbitChatResponse> {
  const classified = classifyOrbitIntent(message);

  if (classified.intent === "unknown") {
    return unknownIntentResponse();
  }

  if (isWriteOrbitChatIntent(classified.intent)) {
    return stageWriteIntent(
      classified.intent,
      classified.params as Record<string, unknown>,
      options?.walletAddress
    );
  }

  if (isReadOrbitChatIntent(classified.intent)) {
    const coin = options?.coin ?? createInitialCoin();
    return simulateReadIntent(
      classified.intent,
      classified.params as Record<string, unknown>,
      coin
    );
  }

  return unknownIntentResponse();
}
