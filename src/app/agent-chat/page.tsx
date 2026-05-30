import { Suspense } from "react";

import { AgentChatWorkspace } from "@/components/chat/agent-chat-workspace";

export default function AgentChatPage() {
  return (
    <Suspense fallback={null}>
      <AgentChatWorkspace />
    </Suspense>
  );
}
