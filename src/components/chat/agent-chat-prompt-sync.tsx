"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAssistantApi } from "@assistant-ui/react";

import { readAgentChatPromptParam } from "@/lib/agent-chat-url";

/**
 * Prefills the Agent Chat composer when navigated with ?prompt=...
 */
export function AgentChatPromptSync() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const api = useAssistantApi();
  const appliedRef = useRef<string | null>(null);

  useEffect(() => {
    const prompt = readAgentChatPromptParam(searchParams);
    if (!prompt || appliedRef.current === prompt) return;

    try {
      window.setTimeout(() => {
        try {
          api.composer().setText(prompt);
          appliedRef.current = prompt;

          const nextParams = new URLSearchParams(searchParams.toString());
          nextParams.delete("prompt");
          const query = nextParams.toString();
          router.replace(query ? `/agent-chat?${query}` : "/agent-chat", {
            scroll: false,
          });
        } catch (error) {
          console.error("Failed to apply agent chat prompt:", error);
        }
      }, 0);
    } catch (error) {
      console.error("Failed to schedule agent chat prompt:", error);
    }
  }, [api, router, searchParams]);

  return null;
}
