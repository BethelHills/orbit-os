export type SettingsDataSource = "local";

export type SafetyMode = "strict" | "standard" | "permissive";

export type AgentBehaviorPreset = "safe" | "balanced" | "autonomous";

export type NotificationPreferenceKey =
  | "price_alerts"
  | "transaction_outcomes"
  | "holder_spikes"
  | "agent_summaries";

export type SettingsControlCenterState = {
  safetyMode: SafetyMode;
  manualConfirmation: boolean;
  simulateBeforeSign: boolean;
  agentPreset: AgentBehaviorPreset;
  notifications: Record<NotificationPreferenceKey, boolean>;
};

export type SettingsMeta = {
  source: SettingsDataSource;
  networkName: string;
  chainId: number;
  backendUrl: string;
  openRouterConfigured: boolean;
};

export const SETTINGS_DEFAULT_PROMPT =
  "Explain my current OrbitOS settings";

export const SAFETY_MODE_OPTIONS: {
  value: SafetyMode;
  label: string;
  description: string;
}[] = [
  {
    value: "strict",
    label: "Strict",
    description: "Simulate every write, require explicit confirm, no batch auto-sign.",
  },
  {
    value: "standard",
    label: "Standard",
    description: "Simulate protected actions and confirm before wallet broadcast.",
  },
  {
    value: "permissive",
    label: "Permissive",
    description: "Fewer prompts for reads; writes still require confirmation.",
  },
];

export const AGENT_PRESET_OPTIONS: {
  value: AgentBehaviorPreset;
  label: string;
  description: string;
  traits: string[];
}[] = [
  {
    value: "safe",
    label: "Safe",
    description: "Read-only analytics and staged prompts — no unsolicited writes.",
    traits: ["Read-first", "Simulate always", "Manual confirm"],
  },
  {
    value: "balanced",
    label: "Balanced",
    description: "Mix of research, alerts, and user-approved on-chain actions.",
    traits: ["Guided writes", "Alert aware", "Base default"],
  },
  {
    value: "autonomous",
    label: "Autonomous",
    description: "Broader agent autonomy — still wallet-signed, never custodial.",
    traits: ["Multi-step flows", "Queue aware", "High context"],
  },
];

export const NOTIFICATION_OPTIONS: {
  key: NotificationPreferenceKey;
  label: string;
  description: string;
}[] = [
  {
    key: "price_alerts",
    label: "Price alerts",
    description: "Creator coin and token threshold notifications.",
  },
  {
    key: "transaction_outcomes",
    label: "Transaction outcomes",
    description: "Confirmed, failed, and reverted on-chain actions.",
  },
  {
    key: "holder_spikes",
    label: "Holder spikes",
    description: "Unusual holder growth or whale entry signals.",
  },
  {
    key: "agent_summaries",
    label: "Agent summaries",
    description: "End-of-session recaps from Aomi agent workflows.",
  },
];

export const DEFAULT_SETTINGS_STATE: SettingsControlCenterState = {
  safetyMode: "standard",
  manualConfirmation: true,
  simulateBeforeSign: true,
  agentPreset: "balanced",
  notifications: {
    price_alerts: true,
    transaction_outcomes: true,
    holder_spikes: true,
    agent_summaries: false,
  },
};

export function buildSettingsMeta(options: {
  chainId: number;
  backendUrl: string;
}): SettingsMeta {
  return {
    source: "local",
    networkName: options.chainId === 8453 ? "Base" : `Chain ${options.chainId}`,
    chainId: options.chainId,
    backendUrl: options.backendUrl,
    openRouterConfigured: false,
  };
}

export function summarizeSettingsForDisplay(
  state: SettingsControlCenterState,
): string {
  const preset = AGENT_PRESET_OPTIONS.find((p) => p.value === state.agentPreset);
  const safety = SAFETY_MODE_OPTIONS.find((s) => s.value === state.safetyMode);

  return [
    `Safety: ${safety?.label ?? state.safetyMode}`,
    `Manual confirm: ${state.manualConfirmation ? "on" : "off"}`,
    `Simulate before sign: ${state.simulateBeforeSign ? "on" : "off"}`,
    `Agent preset: ${preset?.label ?? state.agentPreset}`,
  ].join(" · ");
}
