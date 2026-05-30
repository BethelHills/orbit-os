import { cn } from "@/lib/utils";

type SettingsToggleProps = {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
};

export function SettingsToggle({
  id,
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
}: SettingsToggleProps) {
  return (
    <div className="flex min-w-0 items-start justify-between gap-4">
      <div className="min-w-0">
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium text-orbit-foreground",
            disabled && "text-orbit-muted",
          )}
        >
          {label}
        </label>
        {description ? (
          <p className="mt-1 text-sm text-orbit-muted">{description}</p>
        ) : null}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 touch-manipulation rounded-full border transition",
          checked
            ? "border-purple-500/50 bg-purple-600"
            : "border-orbit-border bg-orbit-surface-strong",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <span
          className={cn(
            "pointer-events-none absolute top-0.5 size-6 rounded-full bg-white shadow transition",
            checked ? "left-[calc(100%-1.625rem)]" : "left-0.5",
          )}
        />
      </button>
    </div>
  );
}
