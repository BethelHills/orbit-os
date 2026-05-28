"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";
import { useMobileSidebar } from "@/components/navigation/mobile-sidebar-context";
import { cn } from "@/lib/utils";

interface PageBackButtonProps {
  fallbackHref?: string;
  label?: string;
  className?: string;
}

export function PageBackButton({
  fallbackHref = "/",
  label = "Back",
  className,
}: PageBackButtonProps) {
  const router = useRouter();
  const mounted = useMounted();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const sidebar = useMobileSidebar();

  function handleBack() {
    if (mounted && isMobile && sidebar) {
      sidebar.openSidebar();
      return;
    }

    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  return (
    <div
      className={cn(
        sidebar
          ? "mb-6 md:mb-8"
          : "sticky top-0 z-30 mb-6 border-b border-purple-500/10 bg-[#050510]/95 py-3 backdrop-blur-md sm:static sm:mb-8 sm:border-0 sm:bg-transparent sm:py-0 sm:backdrop-blur-none",
        className
      )}
    >
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex min-h-11 touch-manipulation items-center gap-2 rounded-full border border-purple-500/25 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-purple-500/45 hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
        aria-label={mounted && isMobile ? `${label} to navigation menu` : `${label} to overview`}
      >
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
        <span>{label}</span>
      </button>
    </div>
  );
}
