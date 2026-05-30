import {
  AGENT_PRESET_OPTIONS,
  type AgentBehaviorPreset,
} from "@/lib/settings-data";
import { cn } from "@/lib/utils";

type AgentBehaviorPresetsProps = {
  value: AgentBehaviorPreset;
  onChange: (preset: AgentBehaviorPreset) => void;
};

export function AgentBehaviorPresets({
  value,
  onChange,
}: AgentBehaviorPresetsProps) {
  return (
    <article className="rounded-[28px] border border-orbit-border bg-orbit-surface p-5 sm:p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
        Agent
      </p>
      <h2 className="mt-1 text-lg font-semibold">Behavior presets</h2>
      <p className="mt-2 text-sm text-orbit-muted">
        Tune how proactively Aomi suggests and stages on-chain actions.
      </p>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {AGENT_PRESET_OPTIONS.map((preset) => {
          const selected = value === preset.value;
          return (
            <button
              key={preset.value}
              type="button"
              onClick={() => onChange(preset.value)}
              className={cn(
                "flex min-h-full touch-manipulation flex-col rounded-[24px] border p-4 text-left transition",
                selected
                  ? "border-purple-500/40 bg-purple-500/10 shadow-[0_0_32px_rgba(139,92,246,0.12)]"
                  : "border-orbit-border bg-orbit-surface-strong hover:border-purple-500/25",
              )}
            >
              <span className="text-base font-semibold text-orbit-foreground">
                {preset.label}
              </span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-orbit-muted">
                {preset.description}
              </span>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {preset.traits.map((trait) => (
                  <li
                    key={trait}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-orbit-muted"
                  >
                    {trait}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </article>
  );
}
