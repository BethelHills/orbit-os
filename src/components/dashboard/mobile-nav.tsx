"use client";

import { MobileNavBar } from "@/components/navigation/mobile-nav-bar";

interface MobileNavProps {
  onOpenAssistant?: () => void;
}

export function MobileNav({ onOpenAssistant }: MobileNavProps) {
  return <MobileNavBar onOpenAssistant={onOpenAssistant} />;
}
