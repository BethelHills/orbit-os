"use client";

import { Check, Laptop, Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/providers/theme-provider";
import type { ThemeSetting } from "@/lib/theme";
import { cn } from "@/lib/utils";

const THEME_OPTIONS: {
  value: ThemeSetting;
  label: string;
  description: string;
  icon: typeof Sun;
}[] = [
  {
    value: "dark",
    label: "Dark",
    description: "OrbitOS neon command center",
    icon: Moon,
  },
  {
    value: "light",
    label: "Light",
    description: "Bright surfaces for daytime use",
    icon: Sun,
  },
  {
    value: "system",
    label: "System",
    description: "Match your device appearance",
    icon: Laptop,
  },
];

export function ThemeSettingsPanel() {
  const { theme, setTheme } = useTheme();

  return (
    <article className="rounded-[28px] border border-orbit-border bg-orbit-surface p-5 sm:p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
        Appearance
      </p>
      <h2 className="mt-1 text-lg font-semibold">Theme</h2>
      <p className="mt-2 text-sm text-orbit-muted">
        OrbitOS cyberpunk dark mode or light/system alternatives.
      </p>

      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        {THEME_OPTIONS.map((option) => {
          const Icon = option.icon;
          const selected = theme === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setTheme(option.value)}
              className={cn(
                "flex min-h-[88px] touch-manipulation flex-col rounded-2xl border px-3 py-3 text-left transition",
                selected
                  ? "border-purple-500/40 bg-purple-500/10"
                  : "border-orbit-border bg-orbit-surface-strong hover:border-purple-500/25",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <Icon
                  className={cn(
                    "size-4",
                    selected ? "text-purple-200" : "text-orbit-muted",
                  )}
                />
                {selected ? (
                  <Check className="size-4 text-purple-300" />
                ) : null}
              </div>
              <span className="mt-2 font-medium text-orbit-foreground">
                {option.label}
              </span>
              <span className="mt-1 text-xs text-orbit-muted">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
    </article>
  );
}
