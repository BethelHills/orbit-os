"use client";

import { AomiChat } from "@/components/chat/aomi-chat";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { DashboardErrorBoundary } from "@/components/dashboard/dashboard-error-boundary";

export function AssistantPanel() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex min-h-[240px] flex-1 flex-col sm:min-h-[52%] lg:shrink-0">
        <DashboardErrorBoundary name="Aomi chat" compact>
          <AomiChat compact />
        </DashboardErrorBoundary>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <DashboardErrorBoundary name="Activity feed" compact>
          <ActivityFeed />
        </DashboardErrorBoundary>
      </div>
    </div>
  );
}
