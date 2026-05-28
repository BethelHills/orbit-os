"use client";

import { useState } from "react";
import {
  Check,
  Laptop,
  Moon,
  Sun,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/providers/theme-provider";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";
import type { ThemeSetting } from "@/lib/theme";
import { cn } from "@/lib/utils";

const OPTIONS: {
  value: ThemeSetting;
  label: string;
  description: string;
  icon: typeof Sun;
}[] = [
  {
    value: "light",
    label: "Light",
    description: "Bright surfaces for daytime use",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    description: "OrbitOS neon command center",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    description: "Match your device appearance",
    icon: Laptop,
  },
];

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export function ThemeToggle({ compact = false, className }: ThemeToggleProps) {
  const mounted = useMounted();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [sheetOpen, setSheetOpen] = useState(false);

  const ActiveIcon =
    theme === "system" ? Laptop : resolvedTheme === "light" ? Sun : Moon;

  const triggerLabel =
    theme === "system"
      ? "Theme: system"
      : theme === "light"
        ? "Theme: light"
        : "Theme: dark";

  const trigger = (
    <button
      type="button"
      onClick={() => {
        if (mounted && isMobile) setSheetOpen(true);
      }}
      className={cn(
        compact
          ? "min-h-10 min-w-10 touch-manipulation rounded-lg p-2 text-slate-300 transition hover:text-white active:scale-[0.98]"
          : "glass inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-xl p-2.5 text-slate-300 transition hover:text-white active:scale-[0.98]",
        className
      )}
      aria-label={triggerLabel}
      suppressHydrationWarning
    >
      {mounted ? (
        <ActiveIcon size={compact ? 18 : 16} />
      ) : (
        <Moon size={compact ? 18 : 16} />
      )}
    </button>
  );

  function selectTheme(value: ThemeSetting) {
    setTheme(value);
    setSheetOpen(false);
  }

  if (mounted && isMobile) {
    return (
      <>
        {trigger}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent
            side="bottom"
            className="max-h-[min(70dvh,420px)] rounded-t-[28px] border-orbit-border bg-orbit-shell p-0 text-orbit-foreground backdrop-blur-xl"
          >
            <SheetHeader className="border-b border-orbit-border px-4 pb-4 pt-5">
              <SheetTitle className="text-left text-lg font-semibold text-orbit-foreground">
                Appearance
              </SheetTitle>
              <SheetDescription className="text-left text-sm text-orbit-muted">
                Choose light, dark, or match your device
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-2 p-4">
              {OPTIONS.map((option) => {
                const Icon = option.icon;
                const selected = theme === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => selectTheme(option.value)}
                    className={cn(
                      "flex min-h-14 w-full touch-manipulation items-center gap-3 rounded-2xl border px-4 py-3 text-left transition active:scale-[0.99]",
                      selected
                        ? "border-purple-500/40 bg-purple-500/10"
                        : "border-orbit-border bg-orbit-surface hover:border-purple-500/25"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                        selected
                          ? "bg-purple-500/20 text-purple-200"
                          : "bg-orbit-surface text-orbit-muted"
                      )}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-orbit-foreground">
                        {option.label}
                      </p>
                      <p className="text-xs text-orbit-muted">
                        {option.description}
                      </p>
                    </div>
                    {selected && (
                      <Check className="h-4 w-4 shrink-0 text-purple-300" />
                    )}
                  </button>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-44 border-orbit-border bg-orbit-shell text-orbit-foreground"
      >
        {OPTIONS.map((option) => {
          const Icon = option.icon;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className="min-h-10 touch-manipulation gap-2"
            >
              <Icon size={16} />
              <span className="flex-1">{option.label}</span>
              {theme === option.value && <Check size={14} />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
