"use client";

import { AomiChat } from "@/components/chat/aomi-chat";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

export function AssistantPanel() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-[52%] shrink-0">
        <AomiChat compact />
      </div>
      <ActivityFeed />
    </div>
  );
}
