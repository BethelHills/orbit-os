import {
  buildAomiTransactHint,
  isAomiTransactEnabled,
  stageAomiTransactRequest,
} from "./aomi-transact-client";
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
import { createInitialCoin, runZoraTool } from "@/lib/zora/executor";
import { aomiTransactHint } from "@/lib/zora/executor";

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

  return undefined;
}

export async function executeOrbitActionCore<A extends OrbitActionName>(
  input: ExecuteOrbitActionInput<A>
): Promise<OrbitActionResult<A>> {
  const { action, params, confirmed = false, walletAddress } = input;

  if (WRITE_ORBIT_ACTIONS.has(action) && !confirmed) {
    const preview = buildPreview(action, params);
    const aomiHint =
      buildAomiTransactHint(action, params as Record<string, unknown>) ??
      aomiTransactHint(action);

    return baseResult(action, {
      ok: true,
      status: "confirmation_required",
      message:
        "Review this Zora action on Base. Re-submit with confirmed: true to stage execution.",
      preview: preview as OrbitActionResult<A>["preview"],
      requiresConfirmation: true,
      aomiHint,
    });
  }

  const coin = createInitialCoin();
  const { result } = await runZoraTool(
    action,
    params,
    coin
  );

  if (!result.ok) {
    return baseResult(action, {
      ok: false,
      status: "error",
      message: result.message,
    });
  }

  if (WRITE_ORBIT_ACTIONS.has(action) && confirmed) {
    if (isAomiTransactEnabled()) {
      const staged = await stageAomiTransactRequest(
        action,
        params as Record<string, unknown>,
        walletAddress
      );

      return baseResult(action, {
        ok: true,
        status: staged.staged ? "staged" : "success",
        message: staged.staged
          ? "Wallet request staged via aomi-transact. Simulate and sign with aomi tx simulate / aomi tx sign."
          : result.message,
        data: result.data as OrbitActionResult<A>["data"],
        aomiHint: staged.hint ?? aomiTransactHint(action),
      });
    }

    return baseResult(action, {
      ok: true,
      status: "success",
      message: `${result.message} Set AOMI_ENABLED=1 to stage wallet requests via aomi-transact.`,
      data: result.data as OrbitActionResult<A>["data"],
      aomiHint: aomiTransactHint(action),
    });
  }

  return baseResult(action, {
    ok: true,
    status: "success",
    message: result.message,
    data: result.data as OrbitActionResult<A>["data"],
  });
}
