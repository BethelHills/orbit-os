const PROMPT_PARAM = "prompt";

export function buildAgentChatUrl(prompt: string): string {
  const params = new URLSearchParams();
  params.set(PROMPT_PARAM, prompt);
  return `/agent-chat?${params.toString()}`;
}

export function readAgentChatPromptParam(
  searchParams: Pick<URLSearchParams, "get">,
): string | undefined {
  const prompt = searchParams.get(PROMPT_PARAM)?.trim();
  return prompt || undefined;
}
