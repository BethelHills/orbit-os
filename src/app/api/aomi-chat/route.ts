import { NextResponse } from "next/server";

import { processAomi } from "@/lib/aomi/process-aomi";
import type { CreatorCoin } from "@/lib/zora/types";

export async function POST(request: Request) {
  const body = await request.json();

  const message = body.message as string;
  const coin = body.coin as CreatorCoin | undefined;
  const walletAddress = body.walletAddress as string | undefined;

  const reply = await processAomi(message, { coin, walletAddress });

  return NextResponse.json(reply);
}
