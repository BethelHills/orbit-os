import type { PendingWriteAction } from "./detect-write-action";
import type { AgentLogEntry, AnalyticsPoint, CreatorCoin } from "@/lib/zora/types";

export type OrbitChatPlanStatus = "simulated" | "requires_confirmation" | "error";

export type OrbitChatActionDescriptor = {
  name: string;
  requiresWallet: boolean;
  requiresConfirmation: boolean;
};

export type OrbitChatResponse = {
  reply: string;
  intent: string;
  protocol: string;
  network: "Base";
  status: OrbitChatPlanStatus;
  steps: string[];
  action?: OrbitChatActionDescriptor;
  coin?: CreatorCoin;
  logs?: AgentLogEntry[];
  analytics?: AnalyticsPoint[];
  requiresConfirmation?: boolean;
  pendingAction?: PendingWriteAction;
};
