import { NextResponse } from "next/server";

import { processOrbitChatMessage } from "@/lib/aomi/actions";
import type { CreatorCoin } from "@/lib/zora/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message = String(body.message ?? "");
    const coin = body.coin as CreatorCoin | undefined;
    const walletAddress = body.walletAddress as string | undefined;

    const plan = await processOrbitChatMessage(message, { coin, walletAddress });

    return NextResponse.json(plan);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unexpected error";

    return NextResponse.json(
      {
        reply: "I could not process that request right now. Please try again.",
        intent: "unknown",
        protocol: "Zora",
        network: "Base",
        status: "error",
        steps: ["Handle chat request", `Error: ${detail}`],
      },
      { status: 500 }
    );
  }
}
