import type {
  GetHolderCountInput,
  GetTopBuyersInput,
  MessageRecentBuyerInput,
  MintCoinInput,
  SetPriceAlertInput,
  TopBuyer,
  CreatorCoin,
} from "@/lib/zora/types";
import { ZORA_CHAIN, ZORA_CHAIN_ID } from "@/lib/zora/types";
import { PROTECTED_ORBIT_ACTIONS } from "./protected-transactions";

export const ORBIT_PROTOCOL = "zora" as const;
export const ORBIT_CHAIN = ZORA_CHAIN;
export const ORBIT_CHAIN_ID = ZORA_CHAIN_ID;

export type OrbitActionName =
  | "mint_coin"
  | "get_holder_count"
  | "get_top_buyers"
  | "set_price_alert"
  | "message_recent_buyer";

export type ProtectedOrbitAction = (typeof PROTECTED_ORBIT_ACTIONS)[number];

export const WRITE_ORBIT_ACTIONS = new Set<OrbitActionName>(PROTECTED_ORBIT_ACTIONS);

export type OrbitActionParams = {
  mint_coin: MintCoinInput;
  get_holder_count: GetHolderCountInput;
  get_top_buyers: GetTopBuyersInput;
  set_price_alert: SetPriceAlertInput;
  message_recent_buyer: MessageRecentBuyerInput;
};

export type ExecuteOrbitActionInput<A extends OrbitActionName = OrbitActionName> =
  {
    action: A;
    params: OrbitActionParams[A];
    confirmed?: boolean;
    walletAddress?: string;
    txHash?: string;
    flowId?: string;
  };

export type OrbitActionStatus =
  | "success"
  | "confirmation_required"
  | "staged"
  | "simulated"
  | "error";

export type OrbitActionResult<A extends OrbitActionName = OrbitActionName> = {
  ok: boolean;
  action: A;
  protocol: typeof ORBIT_PROTOCOL;
  chain: typeof ORBIT_CHAIN;
  chainId: typeof ORBIT_CHAIN_ID;
  status: OrbitActionStatus;
  message: string;
  data?: OrbitActionData[A];
  preview?: OrbitActionPreview[A];
  requiresConfirmation?: boolean;
  aomiHint?: string | null;
  txHash?: string;
  coin?: CreatorCoin;
};

export type OrbitActionData = {
  mint_coin: { address?: string; name: string; symbol: string; txHash?: string };
  get_holder_count: { holderCount: number; coinAddress?: string };
  get_top_buyers: { buyers: TopBuyer[]; limit: number };
  set_price_alert: { targetPriceEth: number; coinAddress?: string; txHash?: string };
  message_recent_buyer: { message: string; buyerAddress?: string; txHash?: string };
};

export type OrbitActionPreview = {
  mint_coin: {
    name: string;
    symbol: string;
    creatorAddress?: string;
    network: "Base";
    protocol: "Zora";
  };
  get_holder_count: never;
  get_top_buyers: never;
  set_price_alert: {
    targetPriceEth: number;
    coinAddress?: string;
    network: "Base";
    protocol: "Zora";
  };
  message_recent_buyer: {
    message: string;
    coinAddress?: string;
    network: "Base";
    protocol: "Zora";
  };
};
