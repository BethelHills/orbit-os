"use client";

import { SidebarContent } from "@/components/sidebar/sidebar-content";

export function Sidebar() {
  return (
    <aside className="glass-strong hidden h-screen w-[17.5rem] shrink-0 flex-col border-r border-purple-500/10 lg:flex">
      <SidebarContent />
    </aside>
  );
}
