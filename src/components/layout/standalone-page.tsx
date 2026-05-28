"use client";

import type { ReactNode } from "react";
import { MobileNavBar } from "@/components/navigation/mobile-nav-bar";
import { MobileSidebarProvider } from "@/components/navigation/mobile-sidebar-context";
import { PageBackButton } from "@/components/navigation/page-back-button";
import { cn } from "@/lib/utils";

interface StandalonePageShellProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  maxWidth?: "5xl" | "7xl";
}

export function StandalonePageShell({
  children,
  className,
  contentClassName,
  maxWidth = "7xl",
}: StandalonePageShellProps) {
  return (
    <MobileSidebarProvider>
      <div className="flex min-h-dvh flex-col overflow-x-hidden bg-[#050510] text-white">
        <MobileNavBar />

        <main
          className={cn(
            "flex-1 p-4 pb-10 md:p-6 md:pb-12 lg:p-8",
            className
          )}
        >
          <PageBackButton />
          <section
            className={cn(
              "mx-auto w-full min-w-0",
              maxWidth === "5xl" ? "max-w-5xl" : "max-w-7xl",
              contentClassName
            )}
          >
            {children}
          </section>
        </main>
      </div>
    </MobileSidebarProvider>
  );
}

interface StandalonePageHeaderProps {
  title: string;
  subtitle: string;
}

export function StandalonePageHeader({ title, subtitle }: StandalonePageHeaderProps) {
  return (
    <header className="mb-8 md:mb-10">
      <p className="text-xs uppercase tracking-[0.25em] text-purple-300 sm:text-sm">
        OrbitOS
      </p>
      <h1 className="mt-2 text-3xl font-bold leading-tight sm:mt-3 sm:text-4xl md:text-5xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:mt-4 sm:text-base">
        {subtitle}
      </p>
    </header>
  );
}
