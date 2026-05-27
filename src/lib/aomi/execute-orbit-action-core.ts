import {
  buildAomiTransactHint,
} from "./aomi-transact-client";
import { buildCoinStateAfterAction } from "./build-coin-state";
import type {
  ExecuteOrbitActionInput,
  OrbitActionName,
  OrbitActionResult,
} from "./orbit-action-types";
import {
  ORBIT_CHAIN,
  ORBIT_CHAIN_ID,
  ORBIT_PROTOCOL,
  WRITE_ORBIT_ACTIONS,
} from "./orbit-action-types";
import { TRANSACTION_CONFIRMATION_COPY } from "./protected-transactions";
import { chatWithAomiZora, runZoraToolViaAomi } from "./aomi-zora-service";
import { createInitialCoin, aomiTransactHint } from "@/lib/zora/executor";

function baseResult<A extends OrbitActionName>(
  action: A,
  partial: Pick<OrbitActionResult<A>, "ok" | "status" | "message"> &
    Partial<OrbitActionResult<A>>
): OrbitActionResult<A> {
  return {
    action,
    protocol: ORBIT_PROTOCOL,
    chain: ORBIT_CHAIN,
    chainId: ORBIT_CHAIN_ID,
    ...partial,
  };
}

function buildPreview(
  action: OrbitActionName,
  params: ExecuteOrbitActionInput["params"]
): OrbitActionResult["preview"] {
  if (action === "mint_coin") {
    const input = params as ExecuteOrbitActionInput<"mint_coin">["params"];
    return {
      name: input.name,
      symbol: input.symbol.toUpperCase(),
      creatorAddress: input.creatorAddress,
      network: "Base",
      protocol: "Zora",
    };
  }

  if (action === "set_price_alert") {
    const input = params as ExecuteOrbitActionInput<"set_price_alert">["params"];
    return {
      targetPriceEth: input.targetPriceEth,
      coinAddress: input.coinAddress,
      network: "Base",
      protocol: "Zora",
    };
  }

  if (action === "message_recent_buyer") {
    const input = params as ExecuteOrbitActionInput<"message_recent_buyer">["params"];
    return {
      message: input.message,
      coinAddress: input.coinAddress,
      network: "Base",
      protocol: "Zora",
    };
  }

  return undefined;
}

export async function executeOrbitActionCore<A extends OrbitActionName>(
  input: ExecuteOrbitActionInput<A> & { flowId?: string }
): Promise<OrbitActionResult<A>> {
  const {
    action,
    params,
    confirmed = false,
    walletAddress,
    txHash,
    flowId,
  } = input;

  if (WRITE_ORBIT_ACTIONS.has(action) && !confirmed) {
    const preview = buildPreview(action, params);
    const aomiHint =
      buildAomiTransactHint(action, params as Record<string, unknown>) ??
      aomiTransactHint(action);

    return baseResult(action, {
      ok: true,
      status: "confirmation_required",
      message: TRANSACTION_CONFIRMATION_COPY.blocked,
      preview: preview as OrbitActionResult<A>["preview"],
      requiresConfirmation: true,
      aomiHint,
    });
  }

  const coin = createInitialCoin();
  const { result } = await runZoraToolViaAomi(action, params, coin, {
    flowId,
    walletAddress,
    confirmed: WRITE_ORBIT_ACTIONS.has(action) ? confirmed : true,
  });

  if (!result.ok) {
    return baseResult(action, {
      ok: false,
      status: "error",
      message: result.message,
    });
  }

  if (WRITE_ORBIT_ACTIONS.has(action) && confirmed) {
    const coinState = await buildCoinStateAfterAction(action, params);
    const enrichedData = {
      ...(result.data as Record<string, unknown>),
      ...(txHash ? { txHash } : {}),
    };

    return baseResult(action, {
      ok: true,
      status: txHash ? "success" : "staged",
      message: txHash
        ? "Transaction confirmed on Base via Aomi."
        : result.message,
      data: enrichedData as OrbitActionResult<A>["data"],
      txHash,
      coin: coinState,
      aomiHint: buildAomiTransactHint(action, params as Record<string, unknown>),
    });
  }

  return baseResult(action, {
    ok: true,
    status: "success",
    message: result.message,
    data: result.data as OrbitActionResult<A>["data"],
  });
}

export async function processAomiMessage(
  message: string,
  walletAddress?: string
) {
  const { reply } = await chatWithAomiZora(message, walletAddress);
  return { reply };
}
