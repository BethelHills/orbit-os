import type {
  CreatorCoin,
  FundInitialPoolInput,
  Get24hVolumeInput,
  GetHolderCountInput,
  GetTopBuyersInput,
  MessageRecentBuyerInput,
  MintCoinInput,
  SetMetadataInput,
  SetPriceAlertInput,
  SetPricingInput,
  ToolResult,
  TopBuyer,
  ZoraToolName,
} from "./types";

function mockAddress(seed: string) {
  return `0x${seed.padEnd(40, "0").slice(0, 40)}`;
}

const MOCK_BUYERS: TopBuyer[] = [
  { address: "0x71C...9a2F", amountEth: 0.42, boughtAt: "2m ago" },
  { address: "0x3bE...1104", amountEth: 0.28, boughtAt: "18m ago" },
  { address: "0x9f2...c881", amountEth: 0.15, boughtAt: "1h ago" },
];

export function createInitialCoin(): CreatorCoin {
  return {
    holderCount: 0,
    volume24hEth: 0,
    topBuyers: [],
    status: "idle",
  };
}

export async function runZoraTool(
  tool: ZoraToolName,
  input: unknown,
  coin: CreatorCoin
): Promise<{ result: ToolResult; coin: CreatorCoin }> {
  const next = { ...coin, topBuyers: [...coin.topBuyers] };

  switch (tool) {
    case "mint_coin": {
      const { name, symbol } = input as MintCoinInput;
      next.name = name;
      next.symbol = symbol.toUpperCase();
      next.address = mockAddress("zora" + name.toLowerCase());
      next.status = "draft";
      return {
        result: {
          ok: true,
          tool,
          message: `Mint prepared for ${name} (${next.symbol}) on Zora/Base. Simulated deploy address: ${next.address}`,
          data: { address: next.address },
        },
        coin: next,
      };
    }
    case "set_pricing": {
      const { priceEth } = input as SetPricingInput;
      next.initialPriceEth = priceEth;
      return {
        result: {
          ok: true,
          tool,
          message: `Initial price set to ${priceEth} ETH.`,
          data: { priceEth },
        },
        coin: next,
      };
    }
    case "fund_initial_pool": {
      const { amountEth } = input as FundInitialPoolInput;
      next.poolFundingEth = amountEth;
      if (next.name) next.status = "launched";
      return {
        result: {
          ok: true,
          tool,
          message: `Initial pool funded with ${amountEth} ETH on Base.`,
          data: { amountEth },
        },
        coin: next,
      };
    }
    case "set_metadata": {
      const meta = input as SetMetadataInput;
      next.metadata = meta;
      return {
        result: {
          ok: true,
          tool,
          message: `Metadata updated for ${meta.name}.`,
          data: meta,
        },
        coin: next,
      };
    }
    case "get_holder_count": {
      const { coinAddress } = input as GetHolderCountInput;
      if (next.holderCount === 0 && next.status === "launched") {
        next.holderCount = 128;
      } else if (next.holderCount === 0) {
        next.holderCount = 42;
      }
      next.status = "monitoring";
      return {
        result: {
          ok: true,
          tool,
          message: `${next.holderCount} holders${coinAddress || next.address ? ` for ${coinAddress ?? next.address}` : ""}.`,
          data: { holderCount: next.holderCount },
        },
        coin: next,
      };
    }
    case "get_24h_volume": {
      const { coinAddress } = input as Get24hVolumeInput;
      if (next.volume24hEth === 0) next.volume24hEth = 6.1;
      return {
        result: {
          ok: true,
          tool,
          message: `24h volume: ${next.volume24hEth} ETH${coinAddress || next.address ? ` (${coinAddress ?? next.address})` : ""}.`,
          data: { volume24hEth: next.volume24hEth },
        },
        coin: next,
      };
    }
    case "get_top_buyers": {
      const { limit = 3 } = input as GetTopBuyersInput;
      next.topBuyers = MOCK_BUYERS.slice(0, limit);
      return {
        result: {
          ok: true,
          tool,
          message: `Top ${next.topBuyers.length} buyers loaded.`,
          data: { buyers: next.topBuyers },
        },
        coin: next,
      };
    }
    case "message_recent_buyer": {
      const { message } = input as MessageRecentBuyerInput;
      const buyer = next.topBuyers[0] ?? MOCK_BUYERS[0];
      return {
        result: {
          ok: true,
          tool,
          message: `Message queued to ${buyer.address}: "${message}"`,
          data: { buyer: buyer.address, message },
        },
        coin: next,
      };
    }
    case "set_price_alert": {
      const { targetPriceEth } = input as SetPriceAlertInput;
      next.priceAlertEth = targetPriceEth;
      return {
        result: {
          ok: true,
          tool,
          message: `Price alert set at ${targetPriceEth} ETH.`,
          data: { targetPriceEth },
        },
        coin: next,
      };
    }
    default:
      return {
        result: {
          ok: false,
          tool,
          message: "Unknown tool",
        },
        coin: next,
      };
  }
}

/** Hook for aomi-transact CLI — set AOMI_ENABLED=1 to delegate signing flows */
export function aomiTransactHint(tool: ZoraToolName): string | null {
  const writeTools: ZoraToolName[] = [
    "mint_coin",
    "set_pricing",
    "fund_initial_pool",
    "set_metadata",
    "message_recent_buyer",
    "set_price_alert",
  ];
  if (!writeTools.includes(tool)) return null;
  return `aomi chat "Execute Zora ${tool} on Base for OrbitOS" --chain 8453 --new-session`;
}
