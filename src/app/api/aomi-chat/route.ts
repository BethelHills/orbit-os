import { NextResponse } from "next/server";

import { processAomi } from "@/lib/aomi/process-aomi";

export async function POST(request: Request) {
  const body = await request.json();

  const message = body.message;

  const reply = await processAomi(message);

  return NextResponse.json(reply);
}
