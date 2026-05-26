import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const message = String(body.message || "").toLowerCase();

  let reply = "";

  if (message.includes("holder")) {
    reply =
      "I found 42 holders for MOONJOY.\n\n• Top buyer: 0x9f2...b8c9\n• 24h holder growth: +18%\n• Status: Healthy growth\n\nI can keep monitoring this and alert you when holders pass 50.";
  } else if (message.includes("alert")) {
    reply =
      "Price alert created.\n\n• Coin: MOONJOY\n• Trigger: price moves above 15%\n• Network: Base\n• Protocol: Zora\n• Status: Monitoring enabled";
  } else if (message.includes("analytics")) {
    reply =
      "Here is the current analytics summary.\n\n• Holders: 42\n• 24h volume: 2.4 ETH\n• Top buyer activity: Active\n• Coin status: Live\n• Agent recommendation: Continue monitoring buyer growth.";
  } else if (message.includes("launch") || message.includes("coin")) {
    reply =
      "I prepared a Zora coin launch workflow.\n\n• Protocol selected: Zora\n• Network: Base\n• Action: mint_coin\n• Metadata: Ready\n• Pricing: Ready\n• Simulation: Passed\n\nNext step: connect wallet to execute.";
  } else {
    reply =
      "I understand. OrbitOS can help you launch creator coins, monitor holders, set alerts, and analyze Zora activity through Aomi agent workflows.\n\nTry asking: 'Show holders', 'Set price alert', or 'Launch a coin'.";
  }

  await new Promise((resolve) => setTimeout(resolve, 900));

  return NextResponse.json({ reply });
}
