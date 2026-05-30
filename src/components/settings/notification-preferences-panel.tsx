import {
  NOTIFICATION_OPTIONS,
  type NotificationPreferenceKey,
  type SettingsControlCenterState,
} from "@/lib/settings-data";
import { SettingsToggle } from "@/components/settings/settings-toggle";

type NotificationPreferencesPanelProps = {
  notifications: SettingsControlCenterState["notifications"];
  onNotificationChange: (
    key: NotificationPreferenceKey,
    enabled: boolean,
  ) => void;
};

export function NotificationPreferencesPanel({
  notifications,
  onNotificationChange,
}: NotificationPreferencesPanelProps) {
  return (
    <article className="rounded-[28px] border border-orbit-border bg-orbit-surface p-5 sm:p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
        Alerts
      </p>
      <h2 className="mt-1 text-lg font-semibold">Notifications</h2>
      <p className="mt-2 text-sm text-orbit-muted">
        Local UI preferences for watchtower and transaction alerts (mock — not
        synced to push yet).
      </p>

      <div className="mt-5 space-y-5">
        {NOTIFICATION_OPTIONS.map((option) => (
          <SettingsToggle
            key={option.key}
            id={`notification-${option.key}`}
            label={option.label}
            description={option.description}
            checked={notifications[option.key]}
            onCheckedChange={(enabled) =>
              onNotificationChange(option.key, enabled)
            }
          />
        ))}
      </div>
    </article>
  );
}
