import type { CreatorCoin } from "@/lib/zora/types";
import { createInitialCoin, runZoraTool } from "@/lib/zora/executor";
import type { ExecuteOrbitActionInput, OrbitActionName } from "./orbit-action-types";

export async function buildCoinStateAfterAction(
  action: OrbitActionName,
  params: ExecuteOrbitActionInput["params"]
): Promise<CreatorCoin> {
  let state = createInitialCoin();

  if (action === "mint_coin") {
    const mint = await runZoraTool("mint_coin", params, state);
    state = mint.coin;

    const pricing = await runZoraTool(
      "set_pricing",
      { priceEth: 0.2 },
      state
    );
    state = pricing.coin;

    const metadata = await runZoraTool(
      "set_metadata",
      {
        name: (params as ExecuteOrbitActionInput<"mint_coin">["params"]).name,
        description: `Creator coin launched via OrbitOS on Zora/Base.`,
      },
      state
    );
    state = metadata.coin;

    const pool = await runZoraTool(
      "fund_initial_pool",
      { amountEth: 0.2 },
      state
    );
    state = pool.coin;

    const holders = await runZoraTool("get_holder_count", {}, state);
    state = holders.coin;

    const volume = await runZoraTool("get_24h_volume", {}, state);
    return volume.coin;
  }

  if (action === "set_price_alert") {
    const alert = await runZoraTool("set_price_alert", params, state);
    return {
      ...alert.coin,
      name: "MOONJOY",
      symbol: "MOONJO",
      status: "monitoring",
    };
  }

  const { coin } = await runZoraTool(action, params, state);
  return coin;
}
