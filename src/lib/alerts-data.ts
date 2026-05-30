export type AlertsDataSource = "mock" | "live";

export type AlertType =
  | "price_movement"
  | "holder_count"
  | "whale_buyer"
  | "volume_spike"
  | "wallet_balance";

export type AlertSeverity = "low" | "medium" | "high";

export type AlertStatus = "active" | "paused" | "triggered";

export type WatchtowerAlert = {
  id: string;
  name: string;
  type: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  target: string;
  condition: string;
  network: string;
  lastCheckedLabel: string;
  agentChatPrompt: string;
};

export type AlertHistoryEvent = {
  id: string;
  alertId: string;
  title: string;
  description: string;
  timestampLabel: string;
  severity: AlertSeverity;
  status: AlertStatus;
};

/** Replace `getAlertsWatchtowerData` with Aomi/Zora alert feeds later. */
export type AlertsWatchtowerData = {
  meta: {
    source: AlertsDataSource;
    network: string;
    generatedAt: string;
  };
  alerts: WatchtowerAlert[];
  history: AlertHistoryEvent[];
};

export const ALERT_TYPE_LABELS: Record<AlertType, string> = {
  price_movement: "Price movement",
  holder_count: "Holder count",
  whale_buyer: "Whale buyer",
  volume_spike: "Volume spike",
  wallet_balance: "Wallet balance",
};

export const ALERT_TYPE_OPTIONS: AlertType[] = [
  "price_movement",
  "holder_count",
  "whale_buyer",
  "volume_spike",
  "wallet_balance",
];

const MOCK_ALERTS: WatchtowerAlert[] = [
  {
    id: "alert-moonjoy-price",
    name: "MOONJOY price breakout",
    type: "price_movement",
    severity: "high",
    status: "active",
    target: "MOONJOY",
    condition: "Price crosses ≥ 0.5 ETH on Base",
    network: "Base",
    lastCheckedLabel: "2 min ago",
    agentChatPrompt:
      "Set a price alert for MOONJOY creator coin at 0.5 ETH on Base.",
  },
  {
    id: "alert-holder-growth",
    name: "Holder growth spike",
    type: "holder_count",
    severity: "medium",
    status: "triggered",
    target: "MOONJOY",
    condition: "+15% holders within 24h",
    network: "Base",
    lastCheckedLabel: "18 min ago",
    agentChatPrompt:
      "Alert me when MOONJOY holder count increases 15% within 24 hours on Base.",
  },
  {
    id: "alert-whale-buy",
    name: "Whale buyer entry",
    type: "whale_buyer",
    severity: "high",
    status: "active",
    target: "earlylifecrisis",
    condition: "Single buy ≥ 0.25 ETH",
    network: "Base",
    lastCheckedLabel: "5 min ago",
    agentChatPrompt:
      "Notify me when a whale buys at least 0.25 ETH of earlylifecrisis on Zora Base.",
  },
  {
    id: "alert-volume-spike",
    name: "24h volume spike",
    type: "volume_spike",
    severity: "medium",
    status: "paused",
    target: "Zora trending",
    condition: "Volume > 2× 7-day average",
    network: "Base",
    lastCheckedLabel: "Paused",
    agentChatPrompt:
      "Set a volume spike alert when any Zora creator coin 24h volume exceeds 2x its 7-day average on Base.",
  },
  {
    id: "alert-wallet-eth",
    name: "Wallet ETH buffer",
    type: "wallet_balance",
    severity: "low",
    status: "active",
    target: "Connected wallet",
    condition: "ETH balance falls below 0.02",
    network: "Base",
    lastCheckedLabel: "1 hr ago",
    agentChatPrompt:
      "Alert me when my Base wallet ETH balance drops below 0.02 ETH.",
  },
];

const MOCK_HISTORY: AlertHistoryEvent[] = [
  {
    id: "hist-1",
    alertId: "alert-holder-growth",
    title: "Holder growth threshold hit",
    description: "MOONJOY holders increased 17.3% in the last 24 hours.",
    timestampLabel: "Today · 2:14 PM",
    severity: "medium",
    status: "triggered",
  },
  {
    id: "hist-2",
    alertId: "alert-whale-buy",
    title: "Large buy detected",
    description: "0.31 ETH buy routed through Zora pool for earlylifecrisis.",
    timestampLabel: "Today · 11:02 AM",
    severity: "high",
    status: "triggered",
  },
  {
    id: "hist-3",
    alertId: "alert-moonjoy-price",
    title: "Price alert armed",
    description: "MOONJOY price watch set at 0.5 ETH — monitoring via Aomi.",
    timestampLabel: "Yesterday · 6:40 PM",
    severity: "high",
    status: "active",
  },
  {
    id: "hist-4",
    alertId: "alert-volume-spike",
    title: "Volume alert paused",
    description: "Operator paused Zora volume spike rule during low-liquidity window.",
    timestampLabel: "Yesterday · 9:15 AM",
    severity: "medium",
    status: "paused",
  },
  {
    id: "hist-5",
    alertId: "alert-wallet-eth",
    title: "Wallet buffer check passed",
    description: "Connected wallet remains above 0.02 ETH gas buffer on Base.",
    timestampLabel: "2 days ago",
    severity: "low",
    status: "active",
  },
];

export function getAlertsWatchtowerData(): AlertsWatchtowerData {
  return {
    meta: {
      source: "mock",
      network: "Base (8453)",
      generatedAt: new Date().toISOString(),
    },
    alerts: MOCK_ALERTS,
    history: MOCK_HISTORY,
  };
}

export function buildCreateAlertPrompt(input: {
  type: AlertType;
  target: string;
  condition: string;
}): string {
  const target = input.target.trim() || "my Zora creator coin";
  switch (input.type) {
    case "price_movement":
      return `Set a price alert for ${target} when ${input.condition || "price crosses my threshold"} on Base.`;
    case "holder_count":
      return `Alert me when ${target} holder count ${input.condition || "increases significantly"} on Base.`;
    case "whale_buyer":
      return `Notify me when a whale buyer ${input.condition || "makes a large purchase"} for ${target} on Zora Base.`;
    case "volume_spike":
      return `Set a volume spike alert for ${target} when ${input.condition || "24h volume exceeds baseline"} on Base.`;
    case "wallet_balance":
      return `Alert me when my Base wallet ${input.condition || "balance crosses my threshold"}.`;
    default:
      return `Create an alert for ${target} on Base: ${input.condition}.`;
  }
}

export const WATCHTOWER_DEFAULT_PROMPT =
  "Show my active price alerts and holder watch rules for Zora on Base.";
