import {
  SAFETY_MODE_OPTIONS,
  type SafetyMode,
  type SettingsControlCenterState,
} from "@/lib/settings-data";
import { SettingsToggle } from "@/components/settings/settings-toggle";
import { cn } from "@/lib/utils";

type SafetySettingsPanelProps = {
  state: Pick<
    SettingsControlCenterState,
    "safetyMode" | "manualConfirmation" | "simulateBeforeSign"
  >;
  onSafetyModeChange: (mode: SafetyMode) => void;
  onManualConfirmationChange: (enabled: boolean) => void;
  onSimulateBeforeSignChange: (enabled: boolean) => void;
};

export function SafetySettingsPanel({
  state,
  onSafetyModeChange,
  onManualConfirmationChange,
  onSimulateBeforeSignChange,
}: SafetySettingsPanelProps) {
  return (
    <article className="rounded-[28px] border border-orbit-border bg-orbit-surface p-5 sm:p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
        Safety
      </p>
      <h2 className="mt-1 text-lg font-semibold">Safety mode</h2>
      <p className="mt-2 text-sm text-orbit-muted">
        Control how aggressively OrbitOS gates on-chain writes and wallet prompts.
      </p>

      <div className="mt-5 space-y-2">
        {SAFETY_MODE_OPTIONS.map((option) => {
          const selected = state.safetyMode === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSafetyModeChange(option.value)}
              className={cn(
                "flex w-full touch-manipulation flex-col rounded-2xl border px-4 py-3 text-left transition",
                selected
                  ? "border-purple-500/40 bg-purple-500/10"
                  : "border-orbit-border bg-orbit-surface-strong hover:border-purple-500/25",
              )}
            >
              <span className="font-medium text-orbit-foreground">
                {option.label}
              </span>
              <span className="mt-1 text-sm text-orbit-muted">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-5 border-t border-orbit-border pt-6">
        <SettingsToggle
          id="manual-confirmation"
          label="Manual confirmation"
          description="Require an explicit review step before any protected wallet signature."
          checked={state.manualConfirmation}
          onCheckedChange={onManualConfirmationChange}
        />
        <SettingsToggle
          id="simulate-before-sign"
          label="Simulate before sign"
          description="Run fork simulation on staged Aomi batches when available."
          checked={state.simulateBeforeSign}
          onCheckedChange={onSimulateBeforeSignChange}
        />
      </div>
    </article>
  );
}
